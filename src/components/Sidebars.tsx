import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Minus, Plus, Search, Star } from 'lucide-react';
import { ASSETS } from '../lib/images';

export function BlogDestSidebar({
  searchValue = '',
  onSearch,
  selectedTag = '',
  onTagSelect,
  showOtherServices = false,
  servicesList = [],
}: {
  searchValue?: string;
  onSearch?: (q: string) => void;
  selectedTag?: string;
  onTagSelect?: (tag: string) => void;
  showOtherServices?: boolean;
  servicesList?: Array<{ slug: string; title: string }>;
}) {
  const [localQ, setLocalQ] = useState(searchValue);
  const navigate = useNavigate();

  const recentPosts = [
    {
      day: '14',
      month: 'June',
      author: 'Aidan Butler',
      title: 'Resources for your first trip to overseas vacation',
      slug: 'resources-overseas-vacation',
    },
    {
      day: '20',
      month: 'June',
      author: 'Ricardo Bell',
      title: 'How to get acquainted with natives in a strange land',
      slug: 'acquainted-with-natives',
    },
    {
      day: '24',
      month: 'June',
      author: 'Martin Hicks',
      title: 'Step by step guide to planning your ideal holiday',
      slug: 'thailand-global-tourism-routes',
    },
  ];

  const topDestinations = [
    { name: 'Thailand', count: '05 listing', slug: 'thailand' },
    { name: 'Maldives', count: '07 listing', slug: 'maldives' },
    { name: 'Bangkok', count: '08 listing', slug: 'thailand' },
    { name: 'Paris', count: '09 listing', slug: 'paris' },
    { name: 'Spain', count: '02 listing', slug: 'switzerland' },
  ];

  const popularTags = [
    'Food',
    'Tour',
    'Pool',
    'Safari',
    'Sky View',
    'Hotel',
    'Adventure',
    'Travel',
    'Luxury',
    'Wildlife',
  ];

  const galleryThumbs = [
    ASSETS.machuHike,
    ASSETS.galleryCamera,
    ASSETS.sloveniaBled,
    ASSETS.kashmirBalloon,
    ASSETS.baliNusa,
    ASSETS.thailandCliff,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(localQ);
    else navigate(`/blog?q=${encodeURIComponent(localQ)}`);
  };

  return (
    <aside className="space-y-6">
      {/* Search Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-full border border-[#d7ebee] px-4 py-2.5 flex items-center gap-2 shadow-sm"
      >
        <input
          type="text"
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          placeholder="Search..."
          className="flex-1 text-xs text-[#183135] focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="text-[#094B53] hover:text-[#F5A623] cursor-pointer">
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Other Services Widget (Service Detail Page) */}
      {showOtherServices && (
        <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
          <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
            Other Services
          </div>
          <ul className="mt-4 space-y-2.5">
            {servicesList.map((svc) => (
              <li key={svc.slug}>
                <Link
                  to={`/services/${svc.slug}`}
                  className="flex items-center justify-between text-xs font-medium text-[#183135] hover:text-[#F5A623] py-1 border-b border-[#f0f7f8]"
                >
                  <span>{svc.title}</span>
                  <span>›</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Post */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Recent Post
        </div>
        <div className="mt-4 space-y-4">
          {recentPosts.map((rp) => (
            <Link key={rp.title} to={`/blog/${rp.slug}`} className="flex items-start gap-3 group">
              <div className="w-11 h-11 rounded-lg bg-[#094B53] text-white flex flex-col items-center justify-center shrink-0 leading-tight">
                <span className="font-display font-bold text-xs">{rp.day}</span>
                <span className="text-[9px] opacity-80">{rp.month}</span>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#F5A623]">{rp.author}</div>
                <div className="text-xs font-bold text-[#094B53] group-hover:text-[#F5A623] leading-snug line-clamp-2">
                  {rp.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Destination */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Top Destination
        </div>
        <ul className="mt-4 space-y-2.5 text-xs">
          {topDestinations.map((td) => (
            <li key={td.name} className="flex items-center justify-between border-b border-[#f0f7f8] pb-2">
              <Link to={`/destinations/${td.slug}`} className="font-semibold text-[#094B53] hover:text-[#F5A623]">
                {td.name}
              </Link>
              <span className="text-[11px] text-[#7c9498]">( {td.count} )</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Popular Tags
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularTags.map((tag) => {
            const active = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (onTagSelect) onTagSelect(active ? '' : tag);
                  else navigate(`/blog?tag=${encodeURIComponent(tag)}`);
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#094B53] text-white'
                    : 'bg-[#E6F4F6] text-[#094B53] hover:bg-[#094B53] hover:text-white'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Gallery */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Gallery
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {galleryThumbs.map((src, i) => (
            <Link key={i} to="/gallery" className="aspect-square rounded-lg overflow-hidden">
              <img src={src} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export interface TourFiltersState {
  location: string;
  activityType: string;
  date: string;
  travelers: number;
  cities: string[];
  maxNights: number;
  themes: string[];
  ratings: number[];
  amenities: string[];
}

export function TourFilterSidebar({
  filters,
  onChange,
  onSearchSubmit,
  showPromoCard = false,
  onPromoClick,
}: {
  filters: TourFiltersState;
  onChange: (next: TourFiltersState) => void;
  onSearchSubmit: () => void;
  showPromoCard?: boolean;
  onPromoClick?: () => void;
}) {
  const [cityQuery, setCityQuery] = useState('');
  const allCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const visibleCities = allCities.filter((c) => c.toLowerCase().includes(cityQuery.toLowerCase()));
  const themes = ['Wild life', 'Adventure', 'Desert', 'Culture'];
  const amenitiesList = ['Reservations', 'Free Coupons', 'Wireless Internet', 'Smoking Not Allowed'];

  const toggleArr = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  return (
    <aside className="space-y-5">
      {/* Top Framed Booking Filter Box */}
      <div className="bg-white rounded-2xl border-2 border-[#094B53] p-5 shadow-sm space-y-3">
        <div>
          <label className="text-[11px] font-bold text-[#094B53]">Location</label>
          <div className="relative mt-1">
            <select
              value={filters.location}
              onChange={(e) => onChange({ ...filters, location: e.target.value })}
              className="w-full appearance-none border border-[#d7ebee] rounded-full px-4 py-2 text-xs text-[#183135] bg-white focus:outline-none"
            >
              <option value="All">All Locations</option>
              <option value="Bali">Bali, Indonesia</option>
              <option value="South Korea">South Korea</option>
              <option value="Slovenia">Plateau in Slovenia</option>
              <option value="Tokyo">Tokyo City Japan</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Kashmir">Kashmir Valley</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5d7a7f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-[#094B53]">Activity type</label>
          <div className="relative mt-1">
            <select
              value={filters.activityType}
              onChange={(e) => onChange({ ...filters, activityType: e.target.value })}
              className="w-full appearance-none border border-[#d7ebee] rounded-full px-4 py-2 text-xs text-[#183135] bg-white focus:outline-none"
            >
              <option value="All">All Activities</option>
              <option value="Adventure">Adventure</option>
              <option value="Ski & Culture">Ski & Culture</option>
              <option value="Hiking">Hiking</option>
              <option value="Cultural">Cultural</option>
              <option value="Scenic">Scenic</option>
              <option value="Safari">Safari</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5d7a7f] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-[#094B53]">Date</label>
          <input
            type="text"
            value={filters.date}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
            placeholder="5 Sep 2025"
            className="w-full mt-1 border border-[#d7ebee] rounded-full px-4 py-2 text-xs text-[#183135] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-[#094B53]">Traveler</label>
          <div className="mt-1 border border-[#d7ebee] rounded-full px-4 py-2 flex items-center justify-between text-xs">
            <span className="text-[#5d7a7f]">{filters.travelers} Traveler(s)</span>
            <div className="flex items-center gap-2 font-bold text-[#094B53]">
              <button
                type="button"
                onClick={() => onChange({ ...filters, travelers: Math.max(1, filters.travelers - 1) })}
                className="p-0.5 hover:text-[#F5A623] cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...filters, travelers: filters.travelers + 1 })}
                className="p-0.5 hover:text-[#F5A623] cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSearchSubmit}
          className="w-full bg-[#094B53] hover:bg-[#073b42] text-white rounded-full py-2.5 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Apply filters"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Cities */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#FAF2E2] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Cities
        </div>
        <div className="mt-3 relative">
          <input
            type="text"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
            placeholder="Type Cities..."
            className="w-full border border-[#d7ebee] rounded-full pl-4 pr-9 py-2 text-xs focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#094B53] absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <div className="mt-3 space-y-2 text-xs text-[#436065]">
          {visibleCities.map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.cities.includes(c)}
                onChange={() => onChange({ ...filters, cities: toggleArr(filters.cities, c) })}
                className="accent-[#094B53] rounded"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration (in Nights) */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#FAF2E2] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Duration (in Nights)
        </div>
        <div className="mt-4">
          <input
            type="range"
            min={1}
            max={10}
            value={filters.maxNights}
            onChange={(e) => onChange({ ...filters, maxNights: Number(e.target.value) })}
            className="w-full accent-[#F5A623]"
          />
          <div className="flex justify-between text-[11px] font-semibold text-[#5d7a7f] mt-1">
            <span>1 Night</span>
            <span>Up to {filters.maxNights} Nights</span>
          </div>
        </div>
      </div>

      {/* Type of Theme */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#FAF2E2] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Type of Theme
        </div>
        <div className="mt-3 space-y-2 text-xs text-[#436065]">
          {themes.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.themes.includes(t)}
                onChange={() => onChange({ ...filters, themes: toggleArr(filters.themes, t) })}
                className="accent-[#094B53] rounded"
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Hotel Rating */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#FAF2E2] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Hotel Rating
        </div>
        <div className="mt-3 space-y-2 text-xs text-[#436065]">
          {[
            { stars: 3, count: '150' },
            { stars: 4, count: '2650' },
            { stars: 5, count: '5350' },
          ].map((r) => (
            <label key={r.stars} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ratings.includes(r.stars)}
                onChange={() => onChange({ ...filters, ratings: toggleArr(filters.ratings, r.stars) })}
                className="accent-[#094B53] rounded"
              />
              <span>{r.stars}</span>
              <span className="flex text-[#F5A623]">
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 fill-current" />
                ))}
              </span>
              <span className="text-[10px] text-[#7c9498]">({r.count}) Review</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-2xl border border-[#d7ebee] p-5 shadow-sm">
        <div className="inline-block bg-[#FAF2E2] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded">
          Amenities
        </div>
        <div className="mt-3 space-y-2 text-xs text-[#436065]">
          {amenitiesList.map((am) => (
            <label key={am} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities.includes(am)}
                onChange={() => onChange({ ...filters, amenities: toggleArr(filters.amenities, am) })}
                className="accent-[#094B53] rounded"
              />
              <span>{am}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Promo Ticket Card on Tour Detail */}
      {showPromoCard && (
        <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#98D4E4] to-[#E2F2F5] p-5 text-center border border-[#cbe5eb] shadow-sm">
          <div className="font-display font-extrabold text-xl text-[#094B53] leading-tight">
            Let’s Book <br />
            <span className="text-[#F5A623]">Your Ticket</span> <br />
            Right Now!
          </div>
          <div className="mt-3 text-[11px] font-semibold text-[#094B53]">Booking Period</div>
          <div className="inline-block bg-[#094B53] text-white text-xs font-bold px-3 py-1 rounded-full mt-1">
            24-30 August 2025
          </div>
          <div className="mt-4 bg-white rounded-2xl p-3 shadow inline-block">
            <div className="text-[10px] font-bold uppercase text-[#5d7a7f]">ONLY</div>
            <div className="font-display font-extrabold text-2xl text-[#094B53]">$899</div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onPromoClick}
              className="w-full bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Super Discount — Book Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
