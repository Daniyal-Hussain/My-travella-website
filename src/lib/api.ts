export interface DestinationDTO {
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

export interface TourDTO {
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

export interface ServiceDTO {
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

export interface TourGuideDTO {
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

export interface BlogPostDTO {
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

export interface TestimonialDTO {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  featured: boolean;
}

export interface PricingPlanDTO {
  name: string;
  pricePerDay: number;
  image: string;
  features: string[];
  highlighted: boolean;
}

export interface FaqItemDTO {
  number: string;
  question: string;
  answer: string;
}

export interface GalleryItemDTO {
  title: string;
  location: string;
  category: string;
  image: string;
  bentoGroup: 'top' | 'carousel';
}

export interface HomePayload {
  destinations: DestinationDTO[];
  tours: TourDTO[];
  pricing: PricingPlanDTO[];
  guides: TourGuideDTO[];
  blogs: BlogPostDTO[];
  gallery: GalleryItemDTO[];
  testimonials: TestimonialDTO[];
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'Request failed');
  }
  return data as T;
}

export const api = {
  getHome: () => request<HomePayload>('/api/home'),
  getDestinations: (params?: { q?: string; tag?: string; continent?: string }) => {
    const sp = new URLSearchParams();
    if (params?.q) sp.set('q', params.q);
    if (params?.tag) sp.set('tag', params.tag);
    if (params?.continent) sp.set('continent', params.continent);
    return request<{ destinations: DestinationDTO[] }>(`/api/destinations?${sp.toString()}`);
  },
  getDestination: (slug: string) =>
    request<{ destination: DestinationDTO; relatedTours: TourDTO[]; pricing: PricingPlanDTO[] }>(
      `/api/destinations/${slug}`,
    ),
  postDestinationReview: (slug: string, payload: { name: string; email?: string; subject?: string; comment: string }) =>
    request<{ reviews: DestinationDTO['reviews'] }>(`/api/destinations/${slug}/reviews`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getTours: (params?: Record<string, string>) => {
    const sp = new URLSearchParams(params || {});
    return request<{ tours: TourDTO[]; total: number }>(`/api/tours?${sp.toString()}`);
  },
  getTour: (slug: string) => request<{ tour: TourDTO }>(`/api/tours/${slug}`),
  createBooking: (payload: {
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
  }) =>
    request<{ booking: { bookingRef: string; totalEstimate: number; tourTitle: string } }>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getServices: () => request<{ services: ServiceDTO[] }>('/api/services'),
  getService: (slug: string) =>
    request<{ service: ServiceDTO; allServices: Array<{ slug: string; title: string }> }>(`/api/services/${slug}`),
  getGuides: () => request<{ guides: TourGuideDTO[] }>('/api/guides'),
  getGuide: (slug: string) =>
    request<{ guide: TourGuideDTO; allGuides: TourGuideDTO[] }>(`/api/guides/${slug}`),
  getBlogs: (params?: { q?: string; tag?: string }) => {
    const sp = new URLSearchParams();
    if (params?.q) sp.set('q', params.q);
    if (params?.tag) sp.set('tag', params.tag);
    return request<{ blogs: BlogPostDTO[] }>(`/api/blogs?${sp.toString()}`);
  },
  getBlog: (slug: string) =>
    request<{
      post: BlogPostDTO;
      relatedPosts: Array<{ slug: string; title: string; author: string; dateDay: string; dateMonth: string; excerpt: string }>;
    }>(`/api/blogs/${slug}`),
  postBlogComment: (slug: string, payload: { name: string; comment: string }) =>
    request<{ comments: BlogPostDTO['comments'] }>(`/api/blogs/${slug}/comments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getTestimonials: () => request<{ testimonials: TestimonialDTO[] }>('/api/testimonials'),
  getPricing: () => request<{ plans: PricingPlanDTO[] }>('/api/pricing'),
  getFaqs: () => request<{ faqs: FaqItemDTO[] }>('/api/faqs'),
  getGallery: () => request<{ items: GalleryItemDTO[] }>('/api/gallery'),
  submitContact: (payload: { name: string; email: string; subject: string; message: string; sourcePage: string }) =>
    request<{ ok: boolean }>('/api/contact', { method: 'POST', body: JSON.stringify(payload) }),
  subscribeNewsletter: (email: string) =>
    request<{ ok: boolean; alreadySubscribed: boolean }>('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};
