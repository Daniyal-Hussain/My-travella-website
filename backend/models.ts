import mongoose, { Schema, type Document } from 'mongoose';

export interface IDestination extends Document {
  slug: string;
  name: string;
  country: string;
  continent: string;
  listingCount: number;
  rating: number;
  image: string;
  bannerImages: string[];
  summary: string;
  paragraphs: string[];
  features: string[];
  reviews: Array<{
    author: string;
    date: string;
    avatar: string;
    comment: string;
    replies: Array<{ author: string; date: string; comment: string }>;
  }>;
}

const DestinationSchema = new Schema<IDestination>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true, index: true },
  listingCount: { type: Number, default: 20 },
  rating: { type: Number, default: 4.8 },
  image: { type: String, required: true },
  bannerImages: [{ type: String }],
  summary: { type: String, required: true },
  paragraphs: [{ type: String }],
  features: [{ type: String }],
  reviews: [
    {
      author: String,
      date: String,
      avatar: String,
      comment: String,
      replies: [{ author: String, date: String, comment: String }],
    },
  ],
});

export interface ITour extends Document {
  slug: string;
  title: string;
  location: string;
  city: string;
  activityType: string;
  theme: string;
  durationDays: number;
  durationNights: number;
  hotelRating: number;
  amenities: string[];
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  shortDesc: string;
  overview: string;
  geography: string;
  highlights: Array<{ title: string; text: string }>;
  quote: string;
  quoteAuthor: string;
  includes: string[];
  excludes: string[];
  itinerary: Array<{ day: string; title: string; description: string }>;
  coordinates: { lat: number; lng: number; address: string; label: string };
  featured: boolean;
  travelDate: string;
}

const TourSchema = new Schema<ITour>({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true, index: true },
  activityType: { type: String, required: true, index: true },
  theme: { type: String, required: true, index: true },
  durationDays: { type: Number, default: 8 },
  durationNights: { type: Number, default: 3 },
  hotelRating: { type: Number, default: 5 },
  amenities: [{ type: String }],
  pricePerDay: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 120 },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  shortDesc: { type: String, required: true },
  overview: { type: String, required: true },
  geography: { type: String, required: true },
  highlights: [{ title: String, text: String }],
  quote: { type: String, default: '' },
  quoteAuthor: { type: String, default: '' },
  includes: [{ type: String }],
  excludes: [{ type: String }],
  itinerary: [{ day: String, title: String, description: String }],
  coordinates: {
    lat: Number,
    lng: Number,
    address: String,
    label: String,
  },
  featured: { type: Boolean, default: true },
  travelDate: { type: String, default: '5 Sep 2025' },
});

export interface IService extends Document {
  slug: string;
  title: string;
  image: string;
  headline: string;
  intro: string;
  whatIsTitle: string;
  whatIsBullets: string[];
  serviceTypes: Array<{ name: string; description: string }>;
  keyFeatures: Array<{ label: string; description: string }>;
  faqs: Array<{ number: string; question: string; answer: string }>;
  amenitiesTravel: Array<{ category: string; detail: string }>;
  amenitiesFood: Array<{ category: string; detail: string }>;
}

const ServiceSchema = new Schema<IService>({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  headline: { type: String, required: true },
  intro: { type: String, required: true },
  whatIsTitle: { type: String, required: true },
  whatIsBullets: [{ type: String }],
  serviceTypes: [{ name: String, description: String }],
  keyFeatures: [{ label: String, description: String }],
  faqs: [{ number: String, question: String, answer: String }],
  amenitiesTravel: [{ category: String, detail: String }],
  amenitiesFood: [{ category: String, detail: String }],
});

export interface ITourGuide extends Document {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  age: number;
  education: string;
  jobTitle: string;
  location: string;
  experiences: string;
  contact: string;
  email: string;
  bio: string;
  skills: string[];
  certifications: Array<{ region: string; detail: string }>;
}

const TourGuideSchema = new Schema<ITourGuide>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Tourist Guide' },
  avatar: { type: String, required: true },
  age: { type: Number, default: 36 },
  education: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  experiences: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String }],
  certifications: [{ region: String, detail: String }],
});

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  author: string;
  dateDay: string;
  dateMonth: string;
  fullDate: string;
  category: string;
  image: string;
  secondaryImages: string[];
  excerpt: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor: string;
  subHeading: string;
  subParagraph: string;
  precautionsTitle: string;
  precautions: string[];
  tags: string[];
  comments: Array<{
    author: string;
    date: string;
    avatar: string;
    comment: string;
    replies: Array<{ author: string; date: string; comment: string }>;
  }>;
}

const BlogPostSchema = new Schema<IBlogPost>({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  dateDay: { type: String, required: true },
  dateMonth: { type: String, required: true },
  fullDate: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  secondaryImages: [{ type: String }],
  excerpt: { type: String, required: true },
  paragraphs: [{ type: String }],
  quote: { type: String, required: true },
  quoteAuthor: { type: String, required: true },
  subHeading: { type: String, required: true },
  subParagraph: { type: String, required: true },
  precautionsTitle: { type: String, required: true },
  precautions: [{ type: String }],
  tags: [{ type: String }],
  comments: [
    {
      author: String,
      date: String,
      avatar: String,
      comment: String,
      replies: [{ author: String, date: String, comment: String }],
    },
  ],
});

export interface ITestimonial extends Document {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  featured: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, default: 'Tourist' },
  avatar: { type: String, required: true },
  rating: { type: Number, default: 5 },
  quote: { type: String, required: true },
  featured: { type: Boolean, default: false },
});

export interface IPricingPlan extends Document {
  name: string;
  pricePerDay: number;
  image: string;
  features: string[];
  highlighted: boolean;
}

const PricingPlanSchema = new Schema<IPricingPlan>({
  name: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String, required: true },
  features: [{ type: String }],
  highlighted: { type: Boolean, default: false },
});

export interface IFaqItem extends Document {
  number: string;
  question: string;
  answer: string;
}

const FaqItemSchema = new Schema<IFaqItem>({
  number: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export interface IGalleryItem extends Document {
  title: string;
  location: string;
  category: string;
  image: string;
  bentoGroup: 'top' | 'carousel';
}

const GalleryItemSchema = new Schema<IGalleryItem>({
  title: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  bentoGroup: { type: String, enum: ['top', 'carousel'], default: 'carousel' },
});

export interface IBooking extends Document {
  bookingRef: string;
  tourSlug: string;
  tourTitle: string;
  location: string;
  activityType: string;
  travelDate: string;
  travelers: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  pricePerDay: number;
  totalEstimate: number;
  status: 'Confirmed' | 'Pending';
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  bookingRef: { type: String, required: true, unique: true },
  tourSlug: { type: String, required: true },
  tourTitle: { type: String, required: true },
  location: { type: String, required: true },
  activityType: { type: String, required: true },
  travelDate: { type: String, required: true },
  travelers: { type: Number, required: true, min: 1 },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  specialRequests: { type: String, default: '' },
  pricePerDay: { type: Number, required: true },
  totalEstimate: { type: Number, required: true },
  status: { type: String, enum: ['Confirmed', 'Pending'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now },
});

export interface IEnquiry extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  sourcePage: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sourcePage: { type: String, default: 'contact' },
  createdAt: { type: Date, default: Date.now },
});

export interface INewsletterSubscriber extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const DestinationModel = mongoose.model<IDestination>('Destination', DestinationSchema);
export const TourModel = mongoose.model<ITour>('Tour', TourSchema);
export const ServiceModel = mongoose.model<IService>('Service', ServiceSchema);
export const TourGuideModel = mongoose.model<ITourGuide>('TourGuide', TourGuideSchema);
export const BlogPostModel = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export const TestimonialModel = mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export const PricingPlanModel = mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema);
export const FaqItemModel = mongoose.model<IFaqItem>('FaqItem', FaqItemSchema);
export const GalleryItemModel = mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
export const EnquiryModel = mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export const NewsletterSubscriberModel = mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);
