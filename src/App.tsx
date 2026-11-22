import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import {
  AboutPage,
  PricingPlanPage,
  ServiceDetailPage,
  ServicesPage,
} from './pages/AboutAndServicesPages';
import {
  BlogDetailPage,
  BlogGridPage,
  ContactPage,
  FaqPage,
  GalleryPage,
  NotFoundPage,
  TestimonialsPage,
  TourGuideDetailPage,
} from './pages/CommunityAndUtilityPages';
import {
  DestinationDetailPage,
  DestinationsPage,
  TourDetailPage,
  ToursListPage,
} from './pages/DestinationsAndToursPages';
import { HomePage } from './pages/HomePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#183135]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/destination-detail" element={<DestinationDetailPage />} />
          <Route path="/tours" element={<ToursListPage />} />
          <Route path="/tours/:slug" element={<TourDetailPage />} />
          <Route path="/tour-detail" element={<TourDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/service-detail" element={<ServiceDetailPage />} />
          <Route path="/pricing" element={<PricingPlanPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BlogGridPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/blog-detail" element={<BlogDetailPage />} />
          <Route path="/guides/:slug" element={<TourGuideDetailPage />} />
          <Route path="/tour-guide" element={<TourGuideDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />

      {/* Floating WhatsApp Quick Chat Button */}
      <a
        href="https://wa.me/923554588258"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp 0355-4588258"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white px-3.5 py-2.5 shadow-xl border border-white/40 transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-tight">0355-4588258</span>
      </a>
    </div>
  );
}
