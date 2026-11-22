import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Facebook, Instagram, Linkedin, Menu, Search, X, Phone, Mail, MapPin } from 'lucide-react';
import { TravllaLogo } from './TravllaLogo';

const DROPDOWN_MENUS = {
  pages: [
    { label: 'Services', to: '/services' },
    { label: 'Service Detail', to: '/services/tour-guide' },
    { label: 'Pricing Plan', to: '/pricing' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Tour Guide Detail', to: '/guides/ricardo-murphy' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'Error 404', to: '/404' },
  ],
  destination: [
    { label: 'Destinations Grid', to: '/destinations' },
    { label: 'Destination Detail', to: '/destinations/tokyo-city-japan' },
  ],
  tour: [
    { label: 'Tour List Style', to: '/tours' },
    { label: 'Tour Detail', to: '/tours/bali-indonesia' },
  ],
  blog: [
    { label: 'Blog Grid', to: '/blog' },
    { label: 'Blog Detail', to: '/blog/thailand-global-tourism-routes' },
  ],
};

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (prefix: string) =>
    prefix === '/' ? pathname === '/' : pathname.startsWith(prefix);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    navigate(q ? `/tours?search=${encodeURIComponent(q)}` : '/tours');
  };

  return (
    <>
      <header className="fixed top-3 inset-x-0 z-40 px-3 sm:px-5 pointer-events-none">
        <div className="pointer-events-auto nav-glass-pill max-w-[1080px] mx-auto px-3 lg:px-4 h-[60px] rounded-full flex items-center justify-between relative">
          {/* Left Navigation Buttons inside Transparent Glass Pill */}
          <nav className="hidden lg:flex items-center gap-0.5 text-[11px] font-medium text-white/85">
            <Link
              to="/"
              className="group relative h-[60px] px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 px-2 py-1 rounded-full border transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                    : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                }`}
              >
                Home
              </span>
            </Link>

            <Link
              to="/about"
              className="group relative h-[60px] px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 px-2 py-1 rounded-full border transition-all duration-200 ${
                  isActive('/about')
                    ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                    : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                }`}
              >
                About
              </span>
            </Link>

            {/* Pages Dropdown Button */}
            <div
              className="group relative h-[60px] px-0.5 flex items-center"
              onMouseEnter={() => setOpenMenu('pages')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'pages' ? null : 'pages')}
                className="relative z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 h-full cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full border transition-all duration-200 ${
                    ['/services', '/pricing', '/faq', '/gallery', '/guides', '/testimonials'].some((p) =>
                      pathname.startsWith(p),
                    )
                      ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                      : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                  }`}
                >
                  Pages <ChevronDown className="w-3 h-3" />
                </span>
              </button>
              {openMenu === 'pages' && (
                <div className="absolute left-0 top-[calc(100%+6px)] w-48 bg-[#073d44]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50">
                  {DROPDOWN_MENUS.pages.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpenMenu(null)}
                      className="block px-3.5 py-1.5 text-[12px] text-white/85 hover:bg-white/10 hover:text-[#7fffe8] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Dropdown Button */}
            <div
              className="group relative h-[60px] px-0.5 flex items-center"
              onMouseEnter={() => setOpenMenu('destination')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'destination' ? null : 'destination')}
                className="relative z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 h-full cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full border transition-all duration-200 ${
                    isActive('/destinations')
                      ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                      : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                  }`}
                >
                  Destination <ChevronDown className="w-3 h-3" />
                </span>
              </button>
              {openMenu === 'destination' && (
                <div className="absolute left-0 top-[calc(100%+6px)] w-44 bg-[#073d44]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50">
                  {DROPDOWN_MENUS.destination.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpenMenu(null)}
                      className="block px-3.5 py-1.5 text-[12px] text-white/85 hover:bg-white/10 hover:text-[#7fffe8] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tour Dropdown Button */}
            <div
              className="group relative h-[60px] px-0.5 flex items-center"
              onMouseEnter={() => setOpenMenu('tour')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'tour' ? null : 'tour')}
                className="relative z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 h-full cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full border transition-all duration-200 ${
                    isActive('/tours')
                      ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                      : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                  }`}
                >
                  Tour <ChevronDown className="w-3 h-3" />
                </span>
              </button>
              {openMenu === 'tour' && (
                <div className="absolute left-0 top-[calc(100%+6px)] w-40 bg-[#073d44]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50">
                  {DROPDOWN_MENUS.tour.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpenMenu(null)}
                      className="block px-3.5 py-1.5 text-[12px] text-white/85 hover:bg-white/10 hover:text-[#7fffe8] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Dropdown Button */}
            <div
              className="group relative h-[60px] px-0.5 flex items-center"
              onMouseEnter={() => setOpenMenu('blog')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'blog' ? null : 'blog')}
                className="relative z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 h-full cursor-pointer select-none active:scale-95 transition-transform"
              >
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-full border transition-all duration-200 ${
                    isActive('/blog')
                      ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                      : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                  }`}
                >
                  Blog <ChevronDown className="w-3 h-3" />
                </span>
              </button>
              {openMenu === 'blog' && (
                <div className="absolute left-0 top-[calc(100%+6px)] w-40 bg-[#073d44]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50">
                  {DROPDOWN_MENUS.blog.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpenMenu(null)}
                      className="block px-3.5 py-1.5 text-[12px] text-white/85 hover:bg-white/10 hover:text-[#7fffe8] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="group relative h-[60px] px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 px-2 py-1 rounded-full border transition-all duration-200 ${
                  isActive('/contact')
                    ? 'bg-[#2dd4bf]/20 border-[#5eead4]/60 text-[#7fffe8] font-semibold shadow-[0_0_12px_rgba(45,212,191,0.3)]'
                    : 'bg-white/[0.06] border-white/15 text-white/85 group-hover:bg-[#5eead4]/15 group-hover:border-[#7fffe8]/55 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(94,234,212,0.35)]'
                }`}
              >
                Contact
              </span>
            </Link>
          </nav>

          {/* Mobile Hamburger Left Placeholder */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-full text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Center Brand Crest inside Glass Pill */}
          <Link
            to="/"
            className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center z-20 px-2"
          >
            <TravllaLogo variant="dark" compact />
          </Link>

          {/* Right Socials + Utility Glass Buttons */}
          <div className="flex items-center gap-2 text-white/85">
            <div className="hidden md:flex items-center gap-1.5 text-[11px]">
              <a
                href="#social-facebook"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/gallery');
                }}
                aria-label="Facebook"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#social-instagram"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/gallery');
                }}
                aria-label="Instagram"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#social-linkedin"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#social-x"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/blog');
                }}
                aria-label="X"
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all font-bold text-[11px]"
              >
                𝕏
              </a>
            </div>
            <span className="hidden md:inline-block h-4 w-px bg-white/20" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tours"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation drawer"
              className="hidden lg:inline-flex w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 items-center justify-center text-white transition-all cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#094B53]/70 backdrop-blur-sm flex items-start justify-center pt-28 px-4">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl border border-[#d7ebee]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-[#094B53]">Search Tours & Destinations</h3>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-full hover:bg-[#eef7f8]"
              >
                <X className="w-5 h-5 text-[#094B53]" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try Bali, South Korea, Tokyo, Switzerland..."
                className="flex-1 rounded-full border border-[#cbe2e6] px-5 py-3 text-sm focus:outline-none focus:border-[#094B53]"
              />
              <button
                type="submit"
                className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation & Quick Concierge Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e5f1f2]">
                <TravllaLogo />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-[#eef7f8]"
                >
                  <X className="w-5 h-5 text-[#094B53]" />
                </button>
              </div>
              <div className="mt-5 space-y-1.5">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Destinations', to: '/destinations' },
                  { label: 'Destination Detail', to: '/destinations/tokyo-city-japan' },
                  { label: 'Tour List Style', to: '/tours' },
                  { label: 'Tour Detail', to: '/tours/bali-indonesia' },
                  { label: 'Services', to: '/services' },
                  { label: 'Service Detail', to: '/services/tour-guide' },
                  { label: 'Pricing Plan', to: '/pricing' },
                  { label: 'Frequently Asked Questions', to: '/faq' },
                  { label: 'Gallery', to: '/gallery' },
                  { label: 'Blog Grid', to: '/blog' },
                  { label: 'Blog Detail', to: '/blog/thailand-global-tourism-routes' },
                  { label: 'Tour Guide Detail', to: '/guides/ricardo-murphy' },
                  { label: 'Testimonials', to: '/testimonials' },
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Error 404 Page', to: '/404' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setDrawerOpen(false)}
                    className={`block px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.to
                        ? 'bg-[#094B53] text-white'
                        : 'text-[#183135] hover:bg-[#eef7f8]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[#e5f1f2] space-y-3 text-sm text-[#436065]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A623]" />
                <span>123 654 0214</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A623]" />
                <span>travllainfo@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A623]" />
                <span>55/11 ronin tower New York</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
