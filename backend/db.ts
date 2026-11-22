import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer: MongoMemoryServer | null = null;
let connectionPromise: Promise<{ uri: string; mode: 'external' | 'embedded' }> | null = null;

export async function connectMongoDB(): Promise<{ uri: string; mode: 'external' | 'embedded' }> {
  if (connectionPromise) return connectionPromise;

  connectionPromise = (async () => {
    const externalUri = process.env.MONGODB_URI?.trim();

    if (externalUri) {
      try {
        await mongoose.connect(externalUri, { serverSelectionTimeoutMS: 2500 });
        return { uri: externalUri, mode: 'external' as const };
      } catch (err) {
        console.warn(
          `External MONGODB_URI unreachable (${err instanceof Error ? err.message : String(err)}); falling back to embedded MongoDB server.`,
        );
        try {
          await mongoose.disconnect();
        } catch {
          // ignore cleanup error
        }
      }
    }

    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri('tournaure');
    await mongoose.connect(uri);
    return { uri, mode: 'embedded' as const };
  })().catch((err) => {
    connectionPromise = null;
    throw err;
  });

  return connectionPromise;
}

export async function disconnectMongoDB(): Promise<void> {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
  connectionPromise = null;
}
