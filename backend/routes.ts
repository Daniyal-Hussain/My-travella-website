import { Router } from 'express';
import mongoose from 'mongoose';
import {
  BlogPostModel,
  BookingModel,
  DestinationModel,
  EnquiryModel,
  FaqItemModel,
  GalleryItemModel,
  NewsletterSubscriberModel,
  PricingPlanModel,
  ServiceModel,
  TestimonialModel,
  TourGuideModel,
  TourModel,
} from './models.ts';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  const readyState = mongoose.connection.readyState;
  res.status(readyState === 1 ? 200 : 503).json({
    ok: readyState === 1,
    database: readyState === 1 ? 'mongodb-connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

apiRouter.get('/home', async (_req, res, next) => {
  try {
    const [destinations, tours, pricing, guides, blogs, gallery, testimonials] = await Promise.all([
      DestinationModel.find().lean(),
      TourModel.find().lean(),
      PricingPlanModel.find().lean(),
      TourGuideModel.find().lean(),
      BlogPostModel.find().lean(),
      GalleryItemModel.find().lean(),
      TestimonialModel.find().lean(),
    ]);
    res.json({ destinations, tours, pricing, guides, blogs, gallery, testimonials });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/destinations', async (req, res, next) => {
  try {
    const { q, tag, continent } = req.query;
    const filter: Record<string, unknown> = {};
    if (typeof continent === 'string' && continent && continent !== 'All') {
      filter.continent = continent;
    }
    if (typeof q === 'string' && q.trim()) {
      filter.$or = [
        { name: { $regex: q.trim(), $options: 'i' } },
        { country: { $regex: q.trim(), $options: 'i' } },
        { summary: { $regex: q.trim(), $options: 'i' } },
      ];
    }
    if (typeof tag === 'string' && tag.trim()) {
      filter.summary = { $regex: tag.trim(), $options: 'i' };
    }
    const items = await DestinationModel.find(filter).lean();
    res.json({ destinations: items });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/destinations/:slug', async (req, res, next) => {
  try {
    const item = await DestinationModel.findOne({ slug: req.params.slug }).lean();
    if (!item) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    const [relatedTours, pricing] = await Promise.all([
      TourModel.find().limit(6).lean(),
      PricingPlanModel.find().limit(2).lean(),
    ]);
    return res.json({ destination: item, relatedTours, pricing });
  } catch (err) {
    return next(err);
  }
});

apiRouter.post('/destinations/:slug/reviews', async (req, res, next) => {
  try {
    const { name, comment } = req.body as { name?: string; comment?: string };
    if (!name?.trim() || !comment?.trim()) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    const dest = await DestinationModel.findOne({ slug: req.params.slug });
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    const today = new Date();
    const formatted = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    dest.reviews.unshift({
      author: name.trim(),
      date: formatted,
      avatar: dest.image,
      comment: comment.trim(),
      replies: [],
    });
    await dest.save();
    return res.status(201).json({ reviews: dest.reviews });
  } catch (err) {
    return next(err);
  }
});

apiRouter.get('/tours', async (req, res, next) => {
  try {
    const {
      location,
      city,
      activityType,
      theme,
      minNights,
      maxNights,
      hotelRating,
      amenities,
      sort,
      search,
    } = req.query;

    const filter: Record<string, unknown> = {};

    if (typeof location === 'string' && location.trim() && location !== 'All') {
      filter.$or = [
        { location: { $regex: location.trim(), $options: 'i' } },
        { city: { $regex: location.trim(), $options: 'i' } },
        { title: { $regex: location.trim(), $options: 'i' } },
      ];
    }
    if (typeof search === 'string' && search.trim()) {
      filter.$or = [
        { location: { $regex: search.trim(), $options: 'i' } },
        { city: { $regex: search.trim(), $options: 'i' } },
        { title: { $regex: search.trim(), $options: 'i' } },
        { shortDesc: { $regex: search.trim(), $options: 'i' } },
      ];
    }
    if (typeof city === 'string' && city.trim()) {
      const cities = city.split(',').map((c) => c.trim()).filter(Boolean);
      if (cities.length > 0) {
        filter.city = { $in: cities };
      }
    }
    if (typeof activityType === 'string' && activityType.trim() && activityType !== 'All') {
      filter.activityType = activityType.trim();
    }
    if (typeof theme === 'string' && theme.trim()) {
      const themes = theme.split(',').map((t) => t.trim()).filter(Boolean);
      if (themes.length > 0) {
        filter.theme = { $in: themes };
      }
    }
    if (minNights || maxNights) {
      filter.durationNights = {
        ...(minNights ? { $gte: Number(minNights) } : {}),
        ...(maxNights ? { $lte: Number(maxNights) } : {}),
      };
    }
    if (typeof hotelRating === 'string' && hotelRating.trim()) {
      const ratings = hotelRating.split(',').map(Number).filter((n) => !Number.isNaN(n));
      if (ratings.length > 0) {
        filter.hotelRating = { $in: ratings };
      }
    }
    if (typeof amenities === 'string' && amenities.trim()) {
      const ams = amenities.split(',').map((a) => a.trim()).filter(Boolean);
      if (ams.length > 0) {
        filter.amenities = { $all: ams };
      }
    }

    let sortSpec: Record<string, 1 | -1> = { featured: -1 };
    if (sort === 'price-asc') sortSpec = { pricePerDay: 1 };
    else if (sort === 'price-desc') sortSpec = { pricePerDay: -1 };
    else if (sort === 'rating') sortSpec = { rating: -1 };

    const tours = await TourModel.find(filter).sort(sortSpec).lean();
    res.json({ tours, total: tours.length });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/tours/:slug', async (req, res, next) => {
  try {
    const tour = await TourModel.findOne({ slug: req.params.slug }).lean();
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    return res.json({ tour });
  } catch (err) {
    return next(err);
  }
});

apiRouter.post('/bookings', async (req, res, next) => {
  try {
    const {
      tourSlug,
      tourTitle,
      location,
      activityType,
      travelDate,
      travelers,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
      pricePerDay,
    } = req.body as Record<string, string | number | undefined>;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'Customer name, email, and phone are required' });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(customerEmail));
    if (!emailOk) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const numTravelers = Math.max(1, Number(travelers) || 1);
    const rate = Math.max(1, Number(pricePerDay) || 59);
    const totalEstimate = rate * numTravelers;
    const bookingRef = `TRV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const booking = await BookingModel.create({
      bookingRef,
      tourSlug: String(tourSlug || 'bali-indonesia'),
      tourTitle: String(tourTitle || 'Bali, Indonesia Adventure'),
      location: String(location || 'Bali, Indonesia'),
      activityType: String(activityType || 'Adventure'),
      travelDate: String(travelDate || '5 Sep 2025'),
      travelers: numTravelers,
      customerName: String(customerName).trim(),
      customerEmail: String(customerEmail).trim(),
      customerPhone: String(customerPhone).trim(),
      specialRequests: String(specialRequests || '').trim(),
      pricePerDay: rate,
      totalEstimate,
      status: 'Confirmed',
    });

    return res.status(201).json({ booking });
  } catch (err) {
    return next(err);
  }
});

apiRouter.get('/services', async (_req, res, next) => {
  try {
    const services = await ServiceModel.find().lean();
    res.json({ services });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/services/:slug', async (req, res, next) => {
  try {
    const service = await ServiceModel.findOne({ slug: req.params.slug }).lean();
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const allServices = await ServiceModel.find({}, 'slug title').lean();
    return res.json({ service, allServices });
  } catch (err) {
    return next(err);
  }
});

apiRouter.get('/guides', async (_req, res, next) => {
  try {
    const guides = await TourGuideModel.find().lean();
    res.json({ guides });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/guides/:slug', async (req, res, next) => {
  try {
    const guide = await TourGuideModel.findOne({ slug: req.params.slug }).lean();
    if (!guide) {
      return res.status(404).json({ error: 'Tour guide not found' });
    }
    const allGuides = await TourGuideModel.find().lean();
    return res.json({ guide, allGuides });
  } catch (err) {
    return next(err);
  }
});

apiRouter.get('/blogs', async (req, res, next) => {
  try {
    const { q, tag } = req.query;
    const filter: Record<string, unknown> = {};
    if (typeof q === 'string' && q.trim()) {
      filter.$or = [
        { title: { $regex: q.trim(), $options: 'i' } },
        { author: { $regex: q.trim(), $options: 'i' } },
        { excerpt: { $regex: q.trim(), $options: 'i' } },
      ];
    }
    if (typeof tag === 'string' && tag.trim()) {
      filter.tags = { $regex: `^${tag.trim()}$`, $options: 'i' };
    }
    const blogs = await BlogPostModel.find(filter).lean();
    res.json({ blogs });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/blogs/:slug', async (req, res, next) => {
  try {
    const post = await BlogPostModel.findOne({ slug: req.params.slug }).lean();
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const all = await BlogPostModel.find({}, 'slug title author dateDay dateMonth excerpt').lean();
    return res.json({ post, relatedPosts: all });
  } catch (err) {
    return next(err);
  }
});

apiRouter.post('/blogs/:slug/comments', async (req, res, next) => {
  try {
    const { name, comment } = req.body as { name?: string; comment?: string };
    if (!name?.trim() || !comment?.trim()) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }
    const post = await BlogPostModel.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    const today = new Date();
    const formatted = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    post.comments.unshift({
      author: name.trim(),
      date: formatted,
      avatar: post.image,
      comment: comment.trim(),
      replies: [],
    });
    await post.save();
    return res.status(201).json({ comments: post.comments });
  } catch (err) {
    return next(err);
  }
});

apiRouter.get('/testimonials', async (_req, res, next) => {
  try {
    const testimonials = await TestimonialModel.find().lean();
    res.json({ testimonials });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/pricing', async (_req, res, next) => {
  try {
    const plans = await PricingPlanModel.find().lean();
    res.json({ plans });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/faqs', async (_req, res, next) => {
  try {
    const faqs = await FaqItemModel.find().lean();
    res.json({ faqs });
  } catch (err) {
    next(err);
  }
});

apiRouter.get('/gallery', async (_req, res, next) => {
  try {
    const items = await GalleryItemModel.find().lean();
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

apiRouter.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message, sourcePage } = req.body as Record<string, string | undefined>;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email address, and message are required' });
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    const enquiry = await EnquiryModel.create({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'General Travel Inquiry').trim(),
      message: message.trim(),
      sourcePage: (sourcePage || 'contact').trim(),
    });
    return res.status(201).json({ ok: true, enquiry });
  } catch (err) {
    return next(err);
  }
});

apiRouter.post('/newsletter', async (req, res, next) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email?.trim()) {
      return res.status(400).json({ error: 'Email address is required' });
    }
    const normalized = email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    if (!emailOk) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    const existing = await NewsletterSubscriberModel.findOne({ email: normalized });
    if (existing) {
      return res.status(200).json({ ok: true, alreadySubscribed: true, email: normalized });
    }
    await NewsletterSubscriberModel.create({ email: normalized });
    return res.status(201).json({ ok: true, alreadySubscribed: false, email: normalized });
  } catch (err) {
    return next(err);
  }
});
