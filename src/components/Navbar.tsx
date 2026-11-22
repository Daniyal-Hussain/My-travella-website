import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Compass,
  Facebook,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  PanelLeftClose,
  Phone,
  Search,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
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

const SIDEBAR_GROUPS = [
  {
    id: 'explore',
    label: 'Explore',
    icon: Compass,
    items: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Testimonials', to: '/testimonials' },
    ],
  },
  {
    id: 'destinations',
    label: 'Destinations',
    icon: Globe,
    items: [
      { label: 'All Destinations', to: '/destinations' },
      { label: 'Tokyo City, Japan', to: '/destinations/tokyo-city-japan' },
    ],
  },
  {
    id: 'tours',
    label: 'Tours',
    icon: MapPin,
    items: [
      { label: 'Tour List Style', to: '/tours' },
      { label: 'Bali Island Tour', to: '/tours/bali-indonesia' },
    ],
  },
  {
    id: 'services',
    label: 'Services & Plans',
    icon: Briefcase,
    items: [
      { label: 'All Services', to: '/services' },
      { label: 'Tour Guide Service', to: '/services/tour-guide' },
      { label: 'Pricing Plan', to: '/pricing' },
    ],
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>('explore');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen && !searchOpen) return;
    const scrollY = window.scrollY;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [drawerOpen, searchOpen]);

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
      <header
        className={`fixed inset-x-0 z-40 px-3 sm:px-5 pointer-events-none transition-all duration-300 ease-out ${
          scrolled ? 'top-2' : 'top-3'
        }`}
      >
        <div
          className={`pointer-events-auto nav-glass-pill mx-auto rounded-full flex items-center justify-between relative transition-all duration-300 ease-out ${
            scrolled
              ? 'max-w-[920px] px-2.5 lg:px-3.5 h-[46px]'
              : 'max-w-[1080px] px-3 lg:px-4 h-[60px]'
          }`}
        >
          {/* Left Navigation Buttons inside Transparent Glass Pill */}
          <nav
            className={`hidden lg:flex items-center gap-0.5 font-medium text-white/85 transition-all duration-300 ${
              scrolled ? 'text-[10.5px]' : 'text-[11px]'
            }`}
          >
            <Link
              to="/"
              className={`group relative px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 rounded-full border transition-all duration-200 ${
                  scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                } ${
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
              className={`group relative px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 rounded-full border transition-all duration-200 ${
                  scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                } ${
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
              className={`group relative px-0.5 flex items-center transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
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
                  className={`inline-flex items-center gap-0.5 rounded-full border transition-all duration-200 ${
                    scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                  } ${
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
              className={`group relative px-0.5 flex items-center transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
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
                  className={`inline-flex items-center gap-0.5 rounded-full border transition-all duration-200 ${
                    scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                  } ${
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
              className={`group relative px-0.5 flex items-center transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
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
                  className={`inline-flex items-center gap-0.5 rounded-full border transition-all duration-200 ${
                    scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                  } ${
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
              className={`group relative px-0.5 flex items-center transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
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
                  className={`inline-flex items-center gap-0.5 rounded-full border transition-all duration-200 ${
                    scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                  } ${
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
              className={`group relative px-0.5 inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer select-none active:scale-95 transition-all duration-300 ${
                scrolled ? 'h-[46px]' : 'h-[60px]'
              }`}
            >
              <span className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="nav-spotlight-bar absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-b-full" />
                <span className="nav-spotlight-beam absolute inset-0" />
              </span>
              <span
                className={`relative z-10 rounded-full border transition-all duration-200 ${
                  scrolled ? 'px-1.5 py-0.5' : 'px-2 py-1'
                } ${
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
            className={`lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center z-20 px-2 transition-transform duration-300 ease-out ${
              scrolled ? 'scale-[0.82]' : 'scale-100'
            }`}
          >
            <TravllaLogo variant="dark" compact />
          </Link>

          {/* Right Socials + Utility Glass Buttons */}
          <div className="flex items-center gap-1.5 text-white/85">
            <div className="hidden md:flex items-center gap-1 text-[11px]">
              <a
                href="#social-facebook"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/gallery');
                }}
                aria-label="Facebook"
                className={`rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all duration-300 ${
                  scrolled ? 'w-6 h-6' : 'w-7 h-7'
                }`}
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
                className={`rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all duration-300 ${
                  scrolled ? 'w-6 h-6' : 'w-7 h-7'
                }`}
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
                className={`rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all duration-300 ${
                  scrolled ? 'w-6 h-6' : 'w-7 h-7'
                }`}
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
                className={`rounded-full flex items-center justify-center hover:bg-white/15 hover:text-[#7fffe8] transition-all duration-300 font-bold text-[11px] ${
                  scrolled ? 'w-6 h-6' : 'w-7 h-7'
                }`}
              >
                𝕏
              </a>
            </div>
            <span className="hidden md:inline-block h-4 w-px bg-white/20" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tours"
              className={`rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-300 cursor-pointer ${
                scrolled ? 'w-7 h-7' : 'w-8 h-8'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
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

      {/* Mobile & Tablet Transparent Frosted Glass Sidebar */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden overscroll-none bg-[#041f24]/40 backdrop-blur-[4px] flex justify-start p-2.5 sm:p-4"
          onClick={() => setDrawerOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="glass-sidebar-panel w-[290px] sm:w-[310px] max-w-[calc(100vw-20px)] h-full max-h-full rounded-[24px] sm:rounded-[28px] text-white flex flex-col overflow-hidden"
          >
            {/* Fixed Top Header + Concierge Identity */}
            <div className="shrink-0 px-3.5 pt-3.5 pb-3 border-b border-white/15">
              <div className="flex items-center justify-between pb-2.5">
                <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center">
                  <TravllaLogo variant="dark" compact />
                </Link>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close sidebar"
                  className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <div className="relative w-10 h-10 rounded-full bg-white/15 border border-white/35 flex items-center justify-center shrink-0 shadow-inner">
                  <Compass className="w-4 h-4 text-[#7fffe8]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#0c4148]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-[12.5px] text-white truncate">
                      N Tour Nature
                    </span>
                    <span className="bg-white/90 text-[#094B53] text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md tracking-wide uppercase">
                      Pro
                    </span>
                  </div>
                  <div className="text-[10px] text-white/65 truncate">
                    Alpine &amp; Island Concierge
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Scrollable Menu Area (never scrolls underlying page) */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y glass-scrollbar px-3.5 py-2.5">
              {/* MENU Section Divider */}
              <div className="mb-2 flex items-center gap-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Menu
                </span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              {/* Expandable Tree Menu Groups */}
              <div className="space-y-1">
                {SIDEBAR_GROUPS.map((group) => {
                  const Icon = group.icon;
                  const isOpen = expandedGroup === group.id;
                  const hasActiveChild = group.items.some((i) => pathname === i.to);

                  return (
                    <div key={group.id}>
                      <button
                        type="button"
                        onClick={() => setExpandedGroup(isOpen ? null : group.id)}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-xl transition-all cursor-pointer ${
                          isOpen || hasActiveChild
                            ? 'text-white'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                              isOpen || hasActiveChild
                                ? 'bg-white text-[#094B53] shadow-md'
                                : 'bg-white/15 border border-white/20 text-white'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[12px] font-semibold">{group.label}</span>
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${
                            isOpen ? 'rotate-90 text-white' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="ml-5 mt-1 mb-1.5 pl-3.5 border-l border-white/25 space-y-1">
                          {group.items.map((item) => {
                            const active = pathname === item.to;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setDrawerOpen(false)}
                                className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11.5px] transition-all ${
                                  active
                                    ? 'glass-sidebar-pill text-white font-semibold'
                                    : 'text-white/75 hover:glass-sidebar-pill hover:text-white'
                                }`}
                              >
                                <span
                                  className={`-ml-[19px] w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                                    active ? 'bg-[#7fffe8] shadow-[0_0_6px_#5eead4]' : 'bg-white/50'
                                  }`}
                                />
                                <span>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Direct Glass Icon Rows */}
                {[
                  { label: 'Gallery', to: '/gallery', icon: ImageIcon },
                  { label: 'Blog Grid', to: '/blog', icon: BookOpen },
                  { label: 'Blog Detail', to: '/blog/thailand-global-tourism-routes', icon: BookOpen },
                  { label: 'Tour Guide', to: '/guides/ricardo-murphy', icon: Users },
                  { label: 'FAQ', to: '/faq', icon: HelpCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-xl transition-all ${
                        active
                          ? 'glass-sidebar-pill text-white font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white">
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[12px] font-medium">{item.label}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                    </Link>
                  );
                })}
              </div>

              {/* Split Frosted Seasonal Offer / Notice Card */}
              <Link
                to="/pricing"
                onClick={() => setDrawerOpen(false)}
                className="mt-3.5 mb-1 block rounded-2xl overflow-hidden border border-white/30 shadow-lg grid grid-cols-12 group"
              >
                <div className="col-span-7 bg-white/92 text-[#094B53] p-2.5 flex flex-col justify-between">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-[#436065]">
                    Seasonal · Offer
                  </div>
                  <div className="mt-0.5 font-display font-extrabold text-[14px] leading-tight text-[#094B53]">
                    20% OFF
                  </div>
                  <div className="mt-0.5 text-[9px] text-[#5d7a7f]">
                    Swiss &amp; Bali Escapes
                  </div>
                </div>
                <div className="col-span-5 bg-[#062f35]/85 backdrop-blur-md p-2 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <Sparkles className="w-5 h-5 text-[#7fffe8] drop-shadow-[0_0_10px_rgba(94,234,212,0.8)] group-hover:scale-110 transition-transform" />
                  <span className="mt-1 text-[8.5px] font-bold tracking-wider text-white/85 uppercase">
                    Explore &gt;
                  </span>
                </div>
              </Link>
            </div>

            {/* Pinned Bottom Contact & Utility Rows */}
            <div className="shrink-0 px-3.5 py-2.5 border-t border-white/15 bg-black/10 space-y-1">
              <Link
                to="/contact"
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center justify-between px-2 py-1.5 rounded-xl transition-all ${
                  pathname === '/contact'
                    ? 'glass-sidebar-pill text-white font-semibold'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-[#7fffe8]" />
                  </span>
                  <span className="text-[12px] font-medium">Contact Us</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/55" />
              </Link>

              <div className="px-2 py-0.5 flex items-center justify-between text-[10.5px] text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#7fffe8]" />
                  123 654 0214
                </span>
                <Link
                  to="/404"
                  onClick={() => setDrawerOpen(false)}
                  className="text-white/60 hover:text-white underline-offset-2 hover:underline"
                >
                  404 Page
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
