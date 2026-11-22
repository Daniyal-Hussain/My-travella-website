import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { connectMongoDB, disconnectMongoDB } from './backend/db.ts';
import { apiRouter } from './backend/routes.ts';
import { seedDatabase } from './backend/seed.ts';

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const ROOT = path.dirname(fileURLToPath(import.meta.url));

let dbInitPromise: Promise<{ uri: string; mode: 'external' | 'embedded' }> | null = null;

function ensureDatabaseReady() {
  if (!dbInitPromise) {
    dbInitPromise = (async () => {
      const conn = await connectMongoDB();
      await seedDatabase();
      console.log(`TourNaure MongoDB connected (${conn.mode}) & seeded`);
      return conn;
    })().catch((err) => {
      dbInitPromise = null;
      throw err;
    });
  }
  return dbInitPromise;
}

async function startServer() {
  // Begin MongoDB connection & seed immediately in parallel with HTTP/Vite setup
  const bootDb = ensureDatabaseReady();
  bootDb.catch((err) => {
    console.error('MongoDB startup error:', err);
  });

  const app = express();
  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health/live', (_req, res) => {
    res.status(200).json({ ok: true, status: 'live' });
  });

  app.use('/api', async (_req, _res, next) => {
    try {
      await ensureDatabaseReady();
      next();
    } catch (err) {
      next(err);
    }
  });

  app.use('/api', apiRouter);

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'custom',
    });
    // When HMR/WS is disabled, prevent Vite's @vite/client from opening a failing WebSocket
    // while keeping updateStyle, removeStyle, createHotContext, ErrorOverlay, and injectQuery intact.
    app.get('/@vite/client', async (req, res, next) => {
      try {
        const result = await vite.transformRequest(req.originalUrl || '/@vite/client');
        if (!result) return next();
        const patched = result.code.replace(
          /createWebSocketModuleRunnerTransport\(\{[\s\S]*?pingInterval:\s*hmrTimeout\s*\}\)/g,
          '({ async connect() {}, async disconnect() {}, send() {} })',
        );
        res
          .status(200)
          .set({
            'Content-Type': 'application/javascript; charset=utf-8',
            'Cache-Control': 'no-cache',
          })
          .end(patched);
      } catch (err) {
        next(err);
      }
    });
    app.use(vite.middlewares);
    app.use(async (req, res, next) => {
      if ((req.method !== 'GET' && req.method !== 'HEAD') || path.extname(req.path)) return next();
      try {
        const rawHtml = fs.readFileSync(path.resolve(ROOT, 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(ROOT, 'dist');
    const distHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    app.use(express.static(distDir, { index: false, maxAge: '1h' }));
    app.use((req, res, next) => {
      if ((req.method !== 'GET' && req.method !== 'HEAD') || path.extname(req.path)) return next();
      res.status(200).set({ 'Content-Type': 'text/html' }).end(distHtml);
    });
  }

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  });

  const server = app.listen(PORT, HOST, () => {
    console.log(`TourNaure MERN server listening on http://${HOST}:${PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await disconnectMongoDB().catch(() => {});
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startServer().catch((err) => {
  console.error('Failed to start TourNaure server:', err);
  process.exit(1);
});
