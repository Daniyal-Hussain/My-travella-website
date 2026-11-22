import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  Search,
  Star,
} from 'lucide-react';
import { api, type HomePayload, type PricingPlanDTO, type TourDTO } from '../lib/api';
import { ASSETS } from '../lib/images';
import { BookingModal } from '../components/BookingModal';
import {
  EasyStepsSection,
  GalleryBentoGrid,
  LatestNewsSection,
  PricingCardsSection,
  ReachOutSection,
  SectionHeading,
  StatsStripSection,
} from '../components/SharedSections';

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'Australia', 'UAE'] as const;

const TRENDING_SLIDES: Record<string, Array<{ name: string; image: string; slug: string }>> = {
  Africa: [
    { name: 'Atlas Ridges', image: ASSETS.machuHike, slug: 'kashmir' },
    { name: 'Highland Peaks', image: ASSETS.guide2, slug: 'switzerland' },
    { name: 'Emerald Lakes', image: ASSETS.heroMountains, slug: 'paris' },
  ],
  Asia: [
    { name: 'Bali Cove', image: ASSETS.baliNusa, slug: 'indonesia' },
    { name: 'Kashmir Valley', image: ASSETS.kashmirBalloon, slug: 'kashmir' },
    { name: 'Thailand Bay', image: ASSETS.thailandCliff, slug: 'thailand' },
  ],
  Europe: [
    { name: 'Paris Gardens', image: ASSETS.parisEiffel, slug: 'paris' },
    { name: 'Swiss Alps', image: ASSETS.switzerlandLake, slug: 'switzerland' },
    { name: 'Slovenia Plateau', image: ASSETS.sloveniaBled, slug: 'switzerland' },
  ],
  Australia: [
    { name: 'Coastal Reefs', image: ASSETS.maldivesVillas, slug: 'maldives' },
    { name: 'Great Ocean Cliffs', image: ASSETS.baliNusa, slug: 'indonesia' },
    { name: 'Blue Mountains', image: ASSETS.bannerAlpine, slug: 'switzerland' },
  ],
  UAE: [
    { name: 'Twilight Villas', image: ASSETS.promoNightBungalows, slug: 'maldives' },
    { name: 'Skyline Waterfront', image: ASSETS.tokyoNight, slug: 'tokyo-city-japan' },
    { name: 'Bay Horizon', image: ASSETS.tokyoBridge, slug: 'tokyo-city-japan' },
  ],
};

function TrendingFeatureIcon({ kind }: { kind: 'safety' | 'exclusive' | 'guide' | 'dining' }) {
  if (kind === 'safety') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 text-[#2D757D] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 22c3-2 7-2 10 0v5c-3 2-7 2-10 0v-5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13c0-2.5 2-4.5 4.5-4.5S27 10.5 27 13c0 3.5-4.5 6.5-4.5 6.5S18 16.5 18 13Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5 11.5v3M21 13h3" strokeLinecap="round" />
        <path d="M6 17c1.5-2 4-2.5 6-1" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'exclusive') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 text-[#2D757D] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M6 25l8-11 5 6 4-5 7 10H6Z" strokeLinejoin="round" />
        <path d="M7 12c4-3 10-3 15 0" strokeDasharray="2 2" strokeLinecap="round" />
        <path d="M21 9l6-1-3 4-3-3Z" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'guide') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 text-[#2D757D] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="15" cy="12" r="4" />
        <path d="M9 10h12l-1-3H10l-1 3Z" strokeLinejoin="round" />
        <path d="M8 27c0-4 3-7 7-7s7 3 7 7" strokeLinecap="round" />
        <path d="M25 11v16M25 11l5 2.5-5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9 text-[#2D757D] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 21a9 9 0 0 1 18 0H9Z" strokeLinejoin="round" />
      <path d="M18 12v-2M16 10h4" strokeLinecap="round" />
      <path d="M6 24h20l2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 27h16" strokeLinecap="round" />
    </svg>
  );
}

const DEFAULT_LOCATIONS = [
  'Bali, Indonesia',
  'Tokyo City, Japan',
  'South Korea',
  'Switzerland',
  'Kashmir Valley',
  'Paris, France',
  'Maldives',
  'Thailand',
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<HomePayload | null>(null);
  const [searchLoc, setSearchLoc] = useState('Bali, Indonesia');
  const [searchDate, setSearchDate] = useState('5 Sep 2025');
  const [travelers, setTravelers] = useState(2);
  const [locDropdownOpen, setLocDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(2025, 8, 1));
  const [selectedDayKey, setSelectedDayKey] = useState('2025-8-5');
  const searchBarRef = useRef<HTMLFormElement>(null);
  const [activeContinent, setActiveContinent] = useState<(typeof CONTINENTS)[number]>('Africa');
  const [tourOffset, setTourOffset] = useState(0);
  const [bookingTour, setBookingTour] = useState<{
    slug: string;
    title: string;
    location: string;
    activityType: string;
    pricePerDay: number;
  } | null>(null);

  useEffect(() => {
    api.getHome().then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        setLocDropdownOpen(false);
        setCalendarOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLocDropdownOpen(false);
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const locationOptions = useMemo(() => {
    const set = new Set<string>(DEFAULT_LOCATIONS);
    (data?.tours || []).forEach((t) => {
      if (t.location) set.add(t.location);
    });
    (data?.destinations || []).forEach((d) => {
      if (d.name) set.add(d.name);
    });
    return Array.from(set);
  }, [data]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<number | null> = [];
    for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
    return cells;
  }, [calendarMonth]);

  const handleSelectDate = (day: number) => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    setSelectedDayKey(`${year}-${month}-${day}`);
    setSearchDate(`${day} ${MONTH_NAMES[month]} ${year}`);
    setCalendarOpen(false);
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLocDropdownOpen(false);
    setCalendarOpen(false);
    navigate(
      `/tours?location=${encodeURIComponent(searchLoc)}&date=${encodeURIComponent(searchDate)}&travelers=${travelers}`,
    );
  };

  const displayTrendingCards = TRENDING_SLIDES[activeContinent] || TRENDING_SLIDES.Africa;

  const cycleContinent = (dir: -1 | 1) => {
    const idx = CONTINENTS.indexOf(activeContinent);
    const next = (idx + dir + CONTINENTS.length) % CONTINENTS.length;
    setActiveContinent(CONTINENTS[next]);
  };

  const tours: TourDTO[] = data?.tours || [];
  const visibleTours =
    tours.length <= 4
      ? tours
      : [0, 1, 2, 3].map((i) => tours[(tourOffset + i) % tours.length]);

  const handleSelectPlan = (plan: PricingPlanDTO) => {
    setBookingTour({
      slug: 'bali-indonesia',
      title: `${plan.name} Package`,
      location: 'Global Curated Circuit',
      activityType: plan.name,
      pricePerDay: plan.pricePerDay,
    });
  };

  return (
    <div>
      {/* HERO: Explore The MOUNTAINS */}
      <section className="relative h-[400px] md:h-[475px] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ASSETS.heroMountains}
            alt="Explore The Mountains"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#094B53]/30 via-transparent to-[#094B53]/45" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-4">
          <span className="font-script text-2xl md:text-4xl font-bold text-[#8FE01E] drop-shadow-md">
            Explore The
          </span>
          <h1 className="font-display font-extrabold text-[40px] sm:text-[66px] md:text-[94px] leading-[0.9] tracking-tight text-white/95 drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)] uppercase select-none">
            MOUNTAINS
          </h1>
        </div>

        {/* Floating Search Pill Bar */}
        <form
          ref={searchBarRef}
          onSubmit={handleHeroSearch}
          className="absolute bottom-0 translate-y-1/2 lg:translate-y-0 lg:bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[640px] bg-white rounded-full p-1.5 pl-3.5 sm:pl-5 shadow-2xl border border-[#e3f1f3] flex flex-nowrap items-center justify-between gap-2 sm:gap-3 z-30"
        >
          {/* Location Dropdown */}
          <div className="relative flex-[1.25] min-w-0 border-r border-[#eef5f6] pr-2 sm:pr-3">
            <div className="text-[9px] sm:text-[10px] font-bold text-[#094B53] uppercase tracking-wider leading-tight">
              Location
            </div>
            <button
              type="button"
              onClick={() => {
                setLocDropdownOpen((prev) => !prev);
                setCalendarOpen(false);
              }}
              aria-expanded={locDropdownOpen}
              className="inline-flex items-center gap-1 max-w-full text-left text-[11px] sm:text-xs text-[#436065] font-medium focus:outline-none cursor-pointer mt-0.5"
            >
              <span className="inline-flex items-center gap-1 min-w-0">
                <MapPin className="w-3 h-3 text-[#F5A623] shrink-0" />
                <span className="truncate">{searchLoc}</span>
              </span>
              <ChevronDown
                className={`w-3 h-3 text-[#094B53]/80 shrink-0 transition-transform duration-200 ${
                  locDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {locDropdownOpen && (
              <div className="absolute bottom-[calc(100%+12px)] left-0 w-56 sm:w-64 bg-white rounded-2xl shadow-2xl border border-[#d7ebee] py-1.5 z-50 max-h-56 overflow-y-auto">
                {locationOptions.map((loc) => {
                  const selected = searchLoc === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSearchLoc(loc);
                        setLocDropdownOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#eef7f8] text-[#094B53] font-semibold'
                          : 'text-[#436065] hover:bg-[#f4fbfb] hover:text-[#094B53]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                        <span className="truncate">{loc}</span>
                      </span>
                      {selected && <Check className="w-3.5 h-3.5 text-[#84C400] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Date Picker with Clickable Calendar */}
          <div className="relative flex-1 min-w-0 border-r border-[#eef5f6] pr-2 sm:pr-3">
            <div className="text-[9px] sm:text-[10px] font-bold text-[#094B53] uppercase tracking-wider leading-tight">
              Date
            </div>
            <button
              type="button"
              onClick={() => {
                setCalendarOpen((prev) => !prev);
                setLocDropdownOpen(false);
              }}
              aria-expanded={calendarOpen}
              className="inline-flex items-center gap-1.5 max-w-full text-left text-[11px] sm:text-xs text-[#436065] font-medium focus:outline-none cursor-pointer mt-0.5"
            >
              <span className="truncate">{searchDate}</span>
              <Calendar className="w-3.5 h-3.5 text-[#094B53] hover:text-[#F5A623] shrink-0 transition-colors" />
            </button>

            {calendarOpen && (
              <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-[#d7ebee] p-3 z-50">
                <div className="flex items-center justify-between mb-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                      )
                    }
                    aria-label="Previous month"
                    className="w-7 h-7 rounded-full hover:bg-[#eef7f8] text-[#094B53] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-display font-bold text-xs text-[#094B53]">
                    {FULL_MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                      )
                    }
                    aria-label="Next month"
                    className="w-7 h-7 rounded-full hover:bg-[#eef7f8] text-[#094B53] flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#7c9498] mb-1">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd) => (
                    <div key={wd}>{wd}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((day, idx) => {
                    if (!day) return <div key={`empty-${idx}`} />;
                    const key = `${calendarMonth.getFullYear()}-${calendarMonth.getMonth()}-${day}`;
                    const active = selectedDayKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectDate(day)}
                        className={`h-7 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#094B53] text-white font-bold shadow-sm'
                            : 'text-[#183135] hover:bg-[#eef7f8] hover:text-[#094B53]'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Traveler Stepper + Search CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#094B53] uppercase tracking-wider leading-tight">
                Traveler
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-[#183135] mt-0.5">
                <button
                  type="button"
                  onClick={() => setTravelers((v) => Math.max(1, v - 1))}
                  aria-label="Decrease travelers"
                  className="hover:text-[#F5A623] cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="min-w-[12px] text-center">{travelers}</span>
                <button
                  type="button"
                  onClick={() => setTravelers((v) => v + 1)}
                  aria-label="Increase travelers"
                  className="hover:text-[#F5A623] cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              aria-label="Search tours"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#84C400] hover:bg-[#73ac00] text-white flex items-center justify-center shadow-md shrink-0 cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* Easy Steps For Booking */}
      <EasyStepsSection />

      {/* 3rd Section: Trending Destination (Exact Cloud Top Divider + Organic Brush Mask) */}
      <section className="relative bg-white pb-14 md:pb-16 overflow-hidden">
        {/* SVG ClipPath Definition for Painterly Brush Cutout */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="trendingBrushClip" clipPathUnits="objectBoundingBox">
              <path d="M0.27,0.03 C0.34,0.01 0.45,0.04 0.56,0.02 C0.67,0.01 0.78,0.04 0.89,0.01 L1,0.02 L1,0.88 C0.97,0.92 0.94,0.96 0.91,0.92 C0.89,0.89 0.92,0.83 0.91,0.79 C0.86,0.86 0.81,0.94 0.74,0.96 C0.68,0.97 0.65,0.92 0.61,0.89 C0.55,0.86 0.45,0.82 0.36,0.78 C0.25,0.74 0.14,0.73 0.08,0.68 C0.03,0.64 0.06,0.56 0.04,0.49 C0.02,0.41 0.07,0.34 0.11,0.26 C0.16,0.17 0.20,0.06 0.27,0.03 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Top Organic Cloud / Torn Paper Shadow Border */}
        <div className="w-full overflow-hidden leading-none mb-5">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            className="w-full h-8 md:h-10"
            aria-hidden="true"
          >
            <defs>
              <filter id="cloudEdgeShadow" x="-5%" y="-20%" width="110%" height="180%">
                <feDropShadow dx="0" dy="5" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.16" />
              </filter>
            </defs>
            <path
              filter="url(#cloudEdgeShadow)"
              fill="#ffffff"
              d="M0,0 L1440,0 L1440,22 C1412,26 1392,16 1365,24 C1335,33 1308,18 1280,22 C1252,26 1228,34 1198,25 C1168,16 1142,27 1112,29 C1082,31 1058,18 1025,22 C992,26 968,36 938,26 C908,16 882,25 852,29 C822,33 796,19 764,23 C732,27 704,35 674,26 C644,17 616,28 586,30 C556,32 530,19 498,24 C466,29 440,36 410,27 C380,18 352,28 322,30 C292,32 266,19 234,23 C202,27 176,35 146,26 C116,17 88,28 58,29 C28,30 12,22 0,24 Z"
            />
          </svg>
        </div>

        <div className="max-w-[1120px] mx-auto px-4 lg:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8">
            {/* Left Content + Overlapping Cards Column */}
            <div className="lg:col-span-7 relative z-20 pt-2">
              <h2 className="font-display text-3xl md:text-[36px] font-extrabold tracking-tight text-[#094B53]">
                <span className="text-[#F5A623]">Trending</span> Destination
              </h2>
              <p className="mt-2.5 text-[12px] leading-relaxed text-[#526c71] max-w-[430px]">
                These destinations are trending because they offer authentic experiences, natural beauty, and often visa-friendly access for travelers. If you&apos;re thinking of building a travel-themed adventure.
              </p>

              {/* 4 Numbered Highlight Badges (01 white pill w/ orange text, 02-04 teal pills w/ white text) */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6 max-w-[430px]">
                {[
                  {
                    num: '01',
                    line1: 'Safety First',
                    line2: 'Always',
                    kind: 'safety' as const,
                    badgeClass: 'bg-white text-[#F5A623] shadow-sm',
                  },
                  {
                    num: '02',
                    line1: 'Exclusive',
                    line2: 'Trip',
                    kind: 'exclusive' as const,
                    badgeClass: 'bg-[#094B53] text-white',
                  },
                  {
                    num: '03',
                    line1: 'Professional',
                    line2: 'Guide',
                    kind: 'guide' as const,
                    badgeClass: 'bg-[#094B53] text-white',
                  },
                  {
                    num: '04',
                    line1: 'World-Class',
                    line2: 'Dining',
                    kind: 'dining' as const,
                    badgeClass: 'bg-[#094B53] text-white',
                  },
                ].map((b) => (
                  <div
                    key={b.num}
                    className="relative bg-gradient-to-br from-white via-[#F7FCFC] to-[#E3F1F3] rounded-2xl px-4 pt-5 pb-3.5 border border-white shadow-[0_10px_25px_rgba(9,75,83,0.08)] flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EAF4F6] flex items-center justify-center absolute -top-5 left-1/2 -translate-x-1/2">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] ${b.badgeClass}`}
                      >
                        {b.num}
                      </span>
                    </div>
                    <TrendingFeatureIcon kind={b.kind} />
                    <div className="text-[12.5px] font-semibold text-[#094B53] leading-snug">
                      <div>{b.line1}</div>
                      <div>{b.line2}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continent Filter Chips */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {CONTINENTS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveContinent(c)}
                    className={`px-4 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                      activeContinent === c
                        ? 'bg-[#094B53] text-white shadow-sm'
                        : 'bg-white text-[#094B53] border border-[#8BB6BC] hover:bg-[#094B53] hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* 3 White-Framed Square Photo Cards */}
              <div className="mt-5 grid grid-cols-3 gap-3.5 sm:gap-4 max-w-[590px]">
                {displayTrendingCards.map((card) => (
                  <Link
                    key={card.name}
                    to={`/destinations/${card.slug}`}
                    className="group bg-white p-1.5 sm:p-2 rounded-[22px] shadow-[0_12px_28px_rgba(9,75,83,0.12)] border border-[#eef5f6] block"
                  >
                    <div className="aspect-square rounded-[16px] overflow-hidden relative">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bottom Centered Navigation Arrows */}
              <div className="mt-6 flex items-center justify-center gap-3 max-w-[590px]">
                <button
                  type="button"
                  onClick={() => cycleContinent(-1)}
                  aria-label="Previous region"
                  className="w-9 h-9 rounded-full bg-[#F5A623] hover:bg-[#e59412] text-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => cycleContinent(1)}
                  aria-label="Next region"
                  className="w-9 h-9 rounded-full bg-white hover:bg-[#eef7f8] text-[#F5A623] border border-[#e3f0f2] flex items-center justify-center shadow-md cursor-pointer transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Organic Brushstroke Masked Landscape */}
            <div className="lg:col-span-5 relative lg:-ml-28 lg:-mr-10 -mt-4">
              <div
                className="w-full h-[380px] sm:h-[460px] lg:h-[520px]"
                style={{ filter: 'drop-shadow(-8px 14px 18px rgba(9,75,83,0.18))' }}
              >
                <div
                  className="w-full h-full overflow-hidden"
                  style={{ clipPath: 'url(#trendingBrushClip)' }}
                >
                  <img
                    src={ASSETS.machuHike}
                    alt="Traveler overlooking terraced mountain valley ruins"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price For Travel The World */}
      <PricingCardsSection plans={data?.pricing || []} onSelectPlan={handleSelectPlan} />

      {/* Best Memorable Gallery */}
      <GalleryBentoGrid items={data?.gallery || []} />

      {/* Explore Popular Tours ! */}
      <section className="relative pt-14 pb-20 px-4 bg-[#EEF7F8]">
        {/* Deep Teal Lower Patterned Half-Backdrop */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#094B53] travel-doodle-pattern pointer-events-none" />

        <div className="relative max-w-[1040px] mx-auto">
          <SectionHeading prefix="Explore Popular" highlight="Tours !" />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleTours.map((tour) => (
              <div
                key={tour.slug}
                className="bg-white rounded-3xl p-3 shadow-lg border-4 border-[#d7ebee] flex flex-col justify-between"
              >
                <div>
                  <Link to={`/tours/${tour.slug}`} className="block h-44 rounded-2xl overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="px-2 pt-3">
                    <Link
                      to={`/tours/${tour.slug}`}
                      className="font-display font-bold text-sm text-[#094B53] hover:text-[#F5A623] transition-colors"
                    >
                      {tour.title}
                    </Link>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#5d7a7f]">
                      <div className="flex items-center gap-1 text-[#F5A623]">
                        <span className="text-[#436065] font-semibold">({tour.rating})</span>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#094B53]" />
                        {tour.durationDays} days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-2 pb-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setBookingTour({
                        slug: tour.slug,
                        title: tour.title,
                        location: tour.location,
                        activityType: tour.activityType,
                        pricePerDay: tour.pricePerDay,
                      })
                    }
                    className="border border-[#094B53] text-[#094B53] hover:bg-[#094B53] hover:text-white text-[11px] font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    Book Now
                  </button>
                  <div className="text-right leading-none">
                    <span className="font-display font-extrabold text-lg text-[#F5A623]">${tour.pricePerDay}</span>
                    <span className="text-[10px] text-[#5d7a7f] ml-1">Per day</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tours.length > 4 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setTourOffset((v) => (v - 1 + tours.length) % tours.length)}
                aria-label="Previous tours"
                className="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setTourOffset((v) => (v + 1) % tours.length)}
                aria-label="Next tours"
                className="w-9 h-9 rounded-full bg-white text-[#094B53] flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Meet With Tour Guide */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-[1060px] mx-auto">
          <SectionHeading prefix="Meet With" highlight="Tour Guide" />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data?.guides || []).map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="group bg-white rounded-2xl border border-[#d7ebee] p-3 shadow-sm hover:shadow-xl transition-all text-center"
              >
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#094B53] -mt-5 mx-6 relative z-10 rounded-full py-1.5 px-3 flex items-center justify-center gap-2 shadow">
                  {['𝕏', 'f', '◎', 'P'].map((s, idx) => (
                    <span
                      key={idx}
                      className="w-5 h-5 rounded-full bg-[#F5A623] text-[#094B53] text-[10px] font-bold flex items-center justify-center"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-3 pb-2">
                  <h3 className="font-display font-bold text-sm text-[#094B53] group-hover:text-[#F5A623]">
                    {guide.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#F5A623]">{guide.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reach & Get in Touch With Us */}
      <ReachOutSection sourcePage="home" />

      {/* Explore Latest News */}
      <LatestNewsSection blogs={data?.blogs || []} />

      {/* Stats Strip */}
      <StatsStripSection />

      <BookingModal
        open={Boolean(bookingTour)}
        onClose={() => setBookingTour(null)}
        defaultTour={bookingTour || undefined}
      />
    </div>
  );
}
