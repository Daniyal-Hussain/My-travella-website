import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone, Search } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { ASSETS } from '../lib/images';
import { TravllaLogo } from './TravllaLogo';

const INSTAGRAM_THUMBS = [
  ASSETS.guide1,
  ASSETS.baliNusa,
  ASSETS.tokyoBridge,
  ASSETS.sloveniaBled,
  ASSETS.southKorea,
  ASSETS.thailandCliff,
  ASSETS.galleryCamera,
  ASSETS.testimonialWoman,
  ASSETS.machuHike,
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.subscribeNewsletter(email.trim());
      if (res.alreadySubscribed) {
        toast.success('You are already subscribed to TourNaure weekly updates!');
      } else {
        toast.success('Welcome aboard! You are subscribed to TourNaure updates.');
      }
      setEmail('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Subscription failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer>
      {/* Warm Amber Subscribe Now Banner */}
      <section className="bg-[#F9A405] py-7 px-4">
        <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="font-script text-[40px] md:text-[46px] leading-none font-bold text-white drop-shadow-sm">
              Subscribe <span className="text-[#094B53]">Now!</span>
            </h2>
            <p className="text-xs md:text-[13px] text-[#094B53] font-medium mt-1">
              Sign up to our weekly newsletter to get the latest updates.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-[390px] bg-white rounded-full p-1.5 pl-5 flex items-center shadow-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address..."
              className="flex-1 text-sm text-[#183135] placeholder:text-[#7c9498] focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              aria-label="Subscribe"
              className="w-10 h-10 rounded-full bg-[#094B53] hover:bg-[#073b42] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Deep Teal Jungle Silhouette Footer */}
      <section className="relative bg-[#074B52] text-white pt-14 pb-8 px-4 overflow-hidden">
        {/* Decorative palm foliage backdrop overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 20%, #84C400 0, transparent 22%), radial-gradient(circle at 88% 25%, #84C400 0, transparent 20%)',
          }}
        />

        <div className="relative max-w-[1040px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-9 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div>
              <Link to="/">
                <TravllaLogo variant="dark" />
              </Link>
              <p className="mt-4 text-[12.5px] leading-relaxed text-[#cce1e3]">
                TourNaure is a multi-award-winning strategy and content creation agency that specializes in travel marketing.
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                {[
                  { label: 'X', symbol: '𝕏', to: '/blog' },
                  { label: 'Facebook', symbol: 'f', to: '/about' },
                  { label: 'Instagram', symbol: '◎', to: '/gallery' },
                  { label: 'Pinterest', symbol: 'P', to: '/destinations' },
                ].map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-[#074B52] flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    {s.symbol}
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-display font-bold text-sm text-white mb-4">Explore</h4>
              <ul className="space-y-2.5 text-[12.5px] text-[#cce1e3]">
                <li><Link to="/about" className="hover:text-[#F5A623] transition-colors">About us</Link></li>
                <li><Link to="/faq" className="hover:text-[#F5A623] transition-colors">FAQ’s</Link></li>
                <li><Link to="/services" className="hover:text-[#F5A623] transition-colors">Services</Link></li>
                <li><Link to="/guides/ricardo-murphy" className="hover:text-[#F5A623] transition-colors">Team</Link></li>
                <li><Link to="/blog" className="hover:text-[#F5A623] transition-colors">News & Articles</Link></li>
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-display font-bold text-sm text-white mb-4">Destinations</h4>
              <ul className="space-y-2.5 text-[12.5px] text-[#cce1e3]">
                <li><Link to="/destinations/tokyo-city-japan" className="hover:text-[#F5A623] transition-colors">Tokyo</Link></li>
                <li><Link to="/destinations/paris" className="hover:text-[#F5A623] transition-colors">France</Link></li>
                <li><Link to="/tours/bali-indonesia" className="hover:text-[#F5A623] transition-colors">Bali</Link></li>
                <li><Link to="/tours/kashmir-valley-escape" className="hover:text-[#F5A623] transition-colors">Kashmir</Link></li>
                <li><Link to="/tours/switzerland-tour-package" className="hover:text-[#F5A623] transition-colors">Switzerland</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold text-sm text-white mb-4">Legal</h4>
              <ul className="space-y-2.5 text-[12.5px] text-[#cce1e3]">
                <li><Link to="/faq" className="hover:text-[#F5A623] transition-colors">Terms & Condition</Link></li>
                <li><Link to="/faq" className="hover:text-[#F5A623] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-[#F5A623] transition-colors">Contact</Link></li>
                <li><Link to="/guides/ricardo-murphy" className="hover:text-[#F5A623] transition-colors">Careers</Link></li>
                <li><Link to="/faq" className="hover:text-[#F5A623] transition-colors">Help</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-3.5">
              <a href="tel:03554588258" className="flex items-center gap-3 group">
                <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#F5A623] flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="font-script italic text-2xl text-[#F5A623] font-bold">03554588258</span>
              </a>
              <a
                href="https://wa.me/923554588258"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="w-8 h-8 rounded-full bg-[#25D366]/20 group-hover:bg-[#25D366] flex items-center justify-center shrink-0 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-white" />
                </span>
                <span className="text-[12.5px] text-[#cce1e3] group-hover:text-white transition-colors">
                  WhatsApp: 0355-4588258
                </span>
              </a>
              <a href="mailto:gbtournature@gmail.com" className="flex items-center gap-3 group">
                <span className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-[#F5A623] flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[12.5px] text-[#cce1e3] group-hover:text-white break-all transition-colors">
                  gbtournature@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[12.5px] text-[#cce1e3] leading-snug">
                  New Rangah Chief court Area Skardu
                </span>
              </div>
            </div>
          </div>

          {/* Follow Instagram */}
          <div className="py-7 flex flex-col lg:flex-row items-center gap-5">
            <span className="font-display font-bold text-sm text-white shrink-0">Follow Instagram</span>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 flex-1 w-full">
              {INSTAGRAM_THUMBS.map((src, idx) => (
                <Link
                  key={idx}
                  to="/gallery"
                  className="aspect-square rounded-xl overflow-hidden border border-white/15 hover:scale-105 transition-transform"
                >
                  <img src={src} alt={`TourNaure moment ${idx + 1}`} className="w-full h-full object-cover" />
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-white/10 text-center text-[11.5px] text-[#cce1e3]">
            © 2025 <span className="text-[#F5A623] font-semibold">TourNaure</span> All Rights Reserved.
          </div>
        </div>
      </section>
    </footer>
  );
}
