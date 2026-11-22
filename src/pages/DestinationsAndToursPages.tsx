import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Minus, Play, Plus, Quote, Star, X, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { api, type DestinationDTO, type PricingPlanDTO, type TourDTO } from '../lib/api';
import { ASSETS } from '../lib/images';
import { BookingModal } from '../components/BookingModal';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { BrandsTrustStrip, InteractiveLocationMap, SectionHeading } from '../components/SharedSections';
import { BlogDestSidebar, TourFilterSidebar, type TourFiltersState } from '../components/Sidebars';

export function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationDTO[]>([]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const [catOffset, setCatOffset] = useState(0);

  const categories = [
    { title: 'Wild Life', image: ASSETS.wildlifeTiger, desc: 'Observing wildlife in protected sanctuaries and mountain corridors with certified eco-guides.' },
    { title: 'Hiking', image: ASSETS.machuHike, desc: 'Guided scenic ridge treks across alpine meadows, limestone peaks, and historic trails.' },
    { title: 'Island Cove', image: ASSETS.thailandCliff, desc: 'Explore emerald limestone lagoons and secluded turquoise bays across coastal Asia.' },
    { title: 'Snow Peaks', image: ASSETS.southKorea, desc: 'Powder ski retreats paired with traditional warm mountain village stays.' },
  ];

  useEffect(() => {
    api
      .getDestinations({ q: query || undefined, tag: tag || undefined })
      .then((res) => setDestinations(res.destinations))
      .catch(() => {});
  }, [query, tag]);

  const perPage = 6;
  const pageCount = Math.max(1, Math.ceil(destinations.length / perPage));
  const paged = destinations.slice((page - 1) * perPage, page * perPage);
  const visibleCats = [0, 1].map((i) => categories[(catOffset + i) % categories.length]);

  return (
    <div>
      <PageHeroBanner title="DESTINATIONS" breadcrumb="Destinations" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {paged.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#d7ebee] p-10 text-center space-y-3">
                <p className="text-sm text-[#4a656a]">No destinations match your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setTag('');
                    setPage(1);
                  }}
                  className="bg-[#094B53] text-white text-xs font-semibold px-5 py-2 rounded-full cursor-pointer"
                >
                  Show All Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paged.map((dest) => (
                  <Link
                    key={dest.slug}
                    to={`/destinations/${dest.slug}`}
                    className="group rounded-3xl overflow-hidden bg-[#094B53] border-4 border-[#094B53] shadow-md hover:-translate-y-1 transition-all"
                  >
                    <div className="h-56 overflow-hidden rounded-t-[20px]">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="py-3 text-center text-white">
                      <div className="font-display font-bold text-base">{dest.name}</div>
                      <div className="text-[11px] text-[#cce1e3]">{dest.listingCount} Listing</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg bg-[#094B53] text-white flex items-center justify-center cursor-pointer"
              >
                ‹
              </button>
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer ${
                    page === idx + 1 ? 'bg-[#F5A623] text-white' : 'bg-white text-[#094B53] border border-[#d7ebee]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#094B53] border border-[#d7ebee] flex items-center justify-center cursor-pointer"
              >
                ›
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <BlogDestSidebar
              searchValue={query}
              onSearch={(q) => {
                setPage(1);
                setQuery(q);
              }}
              selectedTag={tag}
              onTagSelect={(t) => {
                setPage(1);
                setTag(t);
              }}
            />
          </div>
        </div>
      </section>

      {/* Tour Categories Atmospheric Scenic Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#1e535d]">
        <img
          src={ASSETS.heroMountains}
          alt="Tour Categories backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-white">
            <h2 className="font-display font-extrabold text-3xl">
              {visibleCats[0].title.split(' ')[0]}{' '}
              <span className="text-[#F5A623]">{visibleCats[0].title.split(' ')[1] || 'Tourism'}</span>
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#e0f0f2]">{visibleCats[0].desc}</p>
            <Link
              to="/tours"
              className="inline-block mt-5 bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full"
            >
              View More
            </Link>
          </div>

          <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-6 justify-end relative">
            <button
              type="button"
              onClick={() => setCatOffset((v) => (v - 1 + categories.length) % categories.length)}
              className="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Previous category"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {visibleCats.map((cat, idx) => (
              <Link
                key={cat.title}
                to="/tours"
                className={`bg-white rounded-3xl p-2.5 shadow-2xl w-64 text-center transition-transform hover:scale-105 ${
                  idx === 1 ? 'sm:rotate-3' : ''
                }`}
              >
                <div className="h-52 rounded-2xl overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                </div>
                <div className="py-3 font-display font-bold text-sm text-[#094B53]">{cat.title}</div>
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setCatOffset((v) => (v + 1) % categories.length)}
              className="w-9 h-9 rounded-full bg-white text-[#094B53] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="Next category"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative max-w-[1140px] mx-auto mt-10 text-right">
          <div className="text-xs font-semibold text-white">Wonderful Place For You</div>
          <div className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5A623] uppercase">
            TOUR CATEGORIES
          </div>
        </div>
      </section>
    </div>
  );
}

export function DestinationDetailPage() {
  const { slug = 'tokyo-city-japan' } = useParams();
  const [dest, setDest] = useState<DestinationDTO | null>(null);
  const [relatedTours, setRelatedTours] = useState<TourDTO[]>([]);
  const [pricing, setPricing] = useState<PricingPlanDTO[]>([]);
  const [slideIdx, setSlideIdx] = useState(0);
  const [bookingTour, setBookingTour] = useState<TourDTO | null>(null);

  const [revName, setRevName] = useState('');
  const [revEmail, setRevEmail] = useState('');
  const [revSubject, setRevSubject] = useState('');
  const [revComment, setRevComment] = useState('');
  const [submittingRev, setSubmittingRev] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setDest(null);
    api
      .getDestination(slug)
      .then((res) => {
        setDest(res.destination);
        setRelatedTours(res.relatedTours);
        setPricing(res.pricing);
        setSlideIdx(0);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dest) return;
    setSubmittingRev(true);
    try {
      const res = await api.postDestinationReview(dest.slug, {
        name: revName,
        email: revEmail,
        subject: revSubject,
        comment: revComment,
      });
      setDest({ ...dest, reviews: res.reviews });
      setRevName('');
      setRevEmail('');
      setRevSubject('');
      setRevComment('');
      toast.success('Review posted to destination page!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to post review');
    } finally {
      setSubmittingRev(false);
    }
  };

  if (notFound) {
    return (
      <div>
        <PageHeroBanner title="DESTINATION DETAIL" breadcrumb="Destination Detail" />
        <div className="py-20 px-4 text-center space-y-4">
          <p className="text-sm text-[#5d7a7f]">Destination not found.</p>
          <Link
            to="/destinations"
            className="inline-block bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full"
          >
            Explore All Destinations
          </Link>
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div>
        <PageHeroBanner title="DESTINATION DETAIL" breadcrumb="Destination Detail" />
        <div className="py-20 text-center text-sm text-[#5d7a7f]">Loading destination...</div>
      </div>
    );
  }

  const slides = dest.bannerImages?.length ? dest.bannerImages : [dest.image];

  return (
    <div>
      <PageHeroBanner title="DESTINATION DETAIL" breadcrumb="Destination Detail" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[920px] mx-auto space-y-8">
          {/* Top Feature Slider */}
          <div>
            <div className="h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
              <img
                src={slides[slideIdx % slides.length]}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                    slideIdx === idx ? 'bg-[#F5A623]' : 'bg-[#c9dfe2]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Overview */}
          <div>
            <h2 className="font-display font-bold text-2xl text-[#094B53]">{dest.name} Overview</h2>
            <div className="mt-3 space-y-3 text-xs md:text-[13.5px] leading-relaxed text-[#4a656a]">
              {dest.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Destinations Features */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Destinations Features</h3>
            <ul className="space-y-2.5">
              {dest.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-xs text-[#436065]">
                  <CheckCircle2 className="w-4 h-4 text-[#84C400] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Pricing Plan (2 cards) */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#094B53] mb-4">Our Pricing Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricing.map((plan, idx) => {
                const dark = idx === 0;
                return (
                  <div
                    key={plan.name}
                    className={`rounded-3xl p-4 shadow-md border ${
                      dark
                        ? 'bg-[#094B53] text-white border-[#094B53]'
                        : 'bg-[#E6F4F6] text-[#094B53] border-[#d7ebee]'
                    }`}
                  >
                    <div className="h-36 rounded-2xl overflow-hidden">
                      <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-2 pt-4 pb-2">
                      <div className="flex items-center justify-between pb-3 border-b border-current/15">
                        <h4 className="font-display font-bold text-base">{plan.name}</h4>
                        <div className="text-right">
                          <span className="font-display font-extrabold text-xl">${plan.pricePerDay}</span>
                          <span className="block text-[10px] opacity-75">Per day</span>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-2 text-xs">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/pricing"
                        className="inline-block mt-5 bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2 rounded-full"
                      >
                        Discover More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Our Top Destinations 6-card grid */}
          <div>
            <h3 className="font-display font-bold text-lg text-[#094B53] mb-4">Our Top Destinations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedTours.map((t) => (
                <div key={t.slug} className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#d7ebee]">
                  <Link to={`/tours/${t.slug}`} className="block h-36 rounded-xl overflow-hidden">
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  </Link>
                  <div className="pt-2.5 px-1">
                    <Link to={`/tours/${t.slug}`} className="font-display font-bold text-xs text-[#094B53]">
                      {t.title}
                    </Link>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#5d7a7f]">
                      <span className="text-[#F5A623]">({t.rating}) ★★★★★</span>
                      <span>{t.durationDays} days</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setBookingTour(t)}
                        className="border border-[#094B53] text-[#094B53] hover:bg-[#094B53] hover:text-white text-[10px] font-bold px-3.5 py-1 rounded-full cursor-pointer"
                      >
                        Book Now
                      </button>
                      <div>
                        <span className="font-display font-extrabold text-sm text-[#F5A623]">${t.pricePerDay}</span>
                        <span className="text-[9px] text-[#5d7a7f] ml-1">Per day</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Review */}
          <div>
            <div className="inline-block bg-[#d7ebee] text-[#094B53] font-display font-bold text-xs px-3 py-1 rounded mb-4">
              Customer Review
            </div>
            <div className="space-y-3.5">
              {dest.reviews.map((r, i) => (
                <div key={i} className="bg-[#FAF2E2] rounded-2xl p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xs text-[#094B53]">{r.author}</span>
                        <span className="text-[10px] text-[#7c9498]">{r.date}</span>
                      </div>
                      <p className="text-xs text-[#4a656a] mt-1">{r.comment}</p>
                    </div>
                  </div>
                  <span className="bg-[#84C400] text-white text-[10px] font-bold px-3 py-1 rounded-full shrink-0">
                    Reply
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-[#FAF2E2] rounded-3xl p-6 md:p-8 border border-[#efe2c6]">
            <h3 className="font-display font-bold text-2xl text-[#094B53]">
              <span className="text-[#F5A623]">Comment</span> Section
            </h3>
            <p className="text-xs text-[#5d7a7f] mt-1">We love to hear from you. Our friendly team is always here to chat.</p>
            <form onSubmit={handleReviewSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <input
                  required
                  type="text"
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="bg-white rounded-full px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
                />
                <input
                  type="email"
                  value={revEmail}
                  onChange={(e) => setRevEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="bg-white rounded-full px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
                />
              </div>
              <input
                type="text"
                value={revSubject}
                onChange={(e) => setRevSubject(e.target.value)}
                placeholder="Select Your Subject"
                className="w-full bg-white rounded-full px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
              />
              <textarea
                required
                rows={4}
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                placeholder="Message"
                className="w-full bg-white rounded-2xl px-5 py-3 text-xs border border-[#eee3cf] focus:outline-none"
              />
              <button
                type="submit"
                disabled={submittingRev}
                className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-2.5 rounded-full cursor-pointer"
              >
                {submittingRev ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <BookingModal
        open={Boolean(bookingTour)}
        onClose={() => setBookingTour(null)}
        defaultTour={bookingTour || undefined}
      />
    </div>
  );
}

export function ToursListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState<TourDTO[]>([]);
  const [popularTours, setPopularTours] = useState<TourDTO[]>([]);
  const [sort, setSort] = useState('default');
  const [bookingTour, setBookingTour] = useState<TourDTO | null>(null);
  const [filters, setFilters] = useState<TourFiltersState>(() => ({
    location: searchParams.get('location') || 'All',
    activityType: searchParams.get('activityType') || 'All',
    date: searchParams.get('date') || '5 Sep 2025',
    travelers: Number(searchParams.get('travelers')) || 2,
    cities: searchParams.get('city')?.split(',').filter(Boolean) || [],
    maxNights: Number(searchParams.get('maxNights')) || 10,
    themes: searchParams.get('theme')?.split(',').filter(Boolean) || [],
    ratings: searchParams.get('hotelRating')?.split(',').map(Number).filter((n) => !Number.isNaN(n)) || [],
    amenities: searchParams.get('amenities')?.split(',').filter(Boolean) || [],
  }));

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      location: searchParams.get('location') || 'All',
      activityType: searchParams.get('activityType') || 'All',
      date: searchParams.get('date') || prev.date || '5 Sep 2025',
      travelers: Number(searchParams.get('travelers')) || prev.travelers || 2,
      cities: searchParams.get('city')?.split(',').filter(Boolean) || [],
      maxNights: Number(searchParams.get('maxNights')) || 10,
      themes: searchParams.get('theme')?.split(',').filter(Boolean) || [],
      ratings: searchParams.get('hotelRating')?.split(',').map(Number).filter((n) => !Number.isNaN(n)) || [],
      amenities: searchParams.get('amenities')?.split(',').filter(Boolean) || [],
    }));
  }, [searchParams]);

  const fetchFilteredTours = useCallback(() => {
    const params: Record<string, string> = {};
    if (filters.location && filters.location !== 'All') params.location = filters.location;
    if (filters.activityType && filters.activityType !== 'All') params.activityType = filters.activityType;
    if (filters.cities.length) params.city = filters.cities.join(',');
    if (filters.maxNights < 10) params.maxNights = String(filters.maxNights);
    if (filters.themes.length) params.theme = filters.themes.join(',');
    if (filters.ratings.length) params.hotelRating = filters.ratings.join(',');
    if (filters.amenities.length) params.amenities = filters.amenities.join(',');
    if (sort !== 'default') params.sort = sort;
    const sq = searchParams.get('search');
    if (sq) params.search = sq;

    api.getTours(params).then((r) => setTours(r.tours)).catch(() => {});
  }, [filters, sort, searchParams]);

  useEffect(() => {
    fetchFilteredTours();
  }, [fetchFilteredTours]);

  useEffect(() => {
    api.getTours().then((r) => setPopularTours(r.tours.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeroBanner title="TOUR LIST STYLE" breadcrumb="Tour List Style" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <TourFilterSidebar
              filters={filters}
              onChange={setFilters}
              onSearchSubmit={fetchFilteredTours}
            />
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="text-xs font-semibold text-[#5d7a7f]">
                Showing 1–{tours.length} of {tours.length} results
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-[#d7ebee] bg-white rounded-full px-4 py-2 text-xs text-[#094B53] focus:outline-none"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="space-y-5">
              {tours.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#d7ebee] p-10 text-center space-y-3">
                  <p className="text-sm text-[#4a656a]">No tours match your current filters.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchParams({});
                      setFilters({
                        location: 'All',
                        activityType: 'All',
                        date: '5 Sep 2025',
                        travelers: 2,
                        cities: [],
                        maxNights: 10,
                        themes: [],
                        ratings: [],
                        amenities: [],
                      });
                    }}
                    className="bg-[#094B53] text-white text-xs font-semibold px-5 py-2 rounded-full cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                tours.map((tour) => (
                  <div
                    key={tour.slug}
                    className="bg-white rounded-3xl p-3.5 border border-[#d7ebee] shadow-sm hover:shadow-lg transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <Link to={`/tours/${tour.slug}`} className="md:col-span-5 h-48 rounded-2xl overflow-hidden block">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="md:col-span-7 flex flex-col justify-between h-full py-1 px-1">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="bg-[#094B53] text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                            {tour.durationDays} days , {tour.durationNights} Nights
                          </span>
                          <div className="text-right">
                            <span className="font-display font-extrabold text-xl text-[#F5A623]">
                              ${tour.pricePerDay}
                            </span>
                            <span className="block text-[10px] text-[#5d7a7f]">Per day</span>
                          </div>
                        </div>

                        <Link
                          to={`/tours/${tour.slug}`}
                          className="font-display font-bold text-lg text-[#094B53] hover:text-[#F5A623] block mt-2"
                        >
                          {tour.title}
                        </Link>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#5d7a7f]">{tour.shortDesc}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setBookingTour(tour)}
                          className="border border-[#094B53] text-[#094B53] hover:bg-[#094B53] hover:text-white text-xs font-bold px-5 py-1.5 rounded-full transition-colors cursor-pointer"
                        >
                          Book Now
                        </button>
                        <div className="text-right">
                          <div className="text-[10px] text-[#5d7a7f]">({tour.rating} Review)</div>
                          <div className="text-xs text-[#F5A623]">★★★★★</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Popular Tours Strip */}
      <section className="relative pt-14 pb-20 px-4 bg-[#EEF7F8]">
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[#094B53] travel-doodle-pattern pointer-events-none" />
        <div className="relative max-w-[1140px] mx-auto">
          <SectionHeading prefix="Explore Popular" highlight="Tours !" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTours.map((t) => (
              <div key={t.slug} className="bg-white rounded-3xl p-3 shadow-lg border-4 border-[#d7ebee]">
                <Link to={`/tours/${t.slug}`} className="block h-40 rounded-2xl overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                </Link>
                <div className="p-2">
                  <Link to={`/tours/${t.slug}`} className="font-display font-bold text-sm text-[#094B53]">
                    {t.title}
                  </Link>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setBookingTour(t)}
                      className="border border-[#094B53] text-[#094B53] text-[10px] font-bold px-3.5 py-1 rounded-full cursor-pointer"
                    >
                      Book Now
                    </button>
                    <span className="font-display font-extrabold text-base text-[#F5A623]">${t.pricePerDay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandsTrustStrip />

      <BookingModal
        open={Boolean(bookingTour)}
        onClose={() => setBookingTour(null)}
        defaultTour={
          bookingTour
            ? {
                ...bookingTour,
                travelDate: filters.date || bookingTour.travelDate,
                travelers: filters.travelers,
              }
            : undefined
        }
      />
    </div>
  );
}

export function TourDetailPage() {
  const { slug = 'bali-indonesia' } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourDTO | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [filters, setFilters] = useState<TourFiltersState>({
    location: 'All',
    activityType: 'All',
    date: '5 Sep 2025',
    travelers: 2,
    cities: [],
    maxNights: 10,
    themes: [],
    ratings: [],
    amenities: [],
  });

  useEffect(() => {
    setNotFound(false);
    setTour(null);
    api
      .getTour(slug)
      .then((r) => {
        setTour(r.tour);
        setSlideIdx(0);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <PageHeroBanner title="TOUR DETAIL" breadcrumb="Tour Detail" />
        <div className="py-20 px-4 text-center space-y-4">
          <p className="text-sm text-[#5d7a7f]">Tour package not found.</p>
          <Link
            to="/tours"
            className="inline-block bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full"
          >
            Browse All Tours
          </Link>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div>
        <PageHeroBanner title="TOUR DETAIL" breadcrumb="Tour Detail" />
        <div className="py-20 text-center text-sm text-[#5d7a7f]">Loading tour details...</div>
      </div>
    );
  }

  const slides = tour.gallery?.length ? tour.gallery : [tour.image];

  const handleSidebarSearch = () => {
    const sp = new URLSearchParams();
    if (filters.location && filters.location !== 'All') sp.set('location', filters.location);
    if (filters.activityType && filters.activityType !== 'All') sp.set('activityType', filters.activityType);
    if (filters.date) sp.set('date', filters.date);
    if (filters.travelers) sp.set('travelers', String(filters.travelers));
    if (filters.cities.length) sp.set('city', filters.cities.join(','));
    if (filters.maxNights < 10) sp.set('maxNights', String(filters.maxNights));
    if (filters.themes.length) sp.set('theme', filters.themes.join(','));
    if (filters.ratings.length) sp.set('hotelRating', filters.ratings.join(','));
    if (filters.amenities.length) sp.set('amenities', filters.amenities.join(','));
    navigate(`/tours?${sp.toString()}`);
  };

  return (
    <div>
      <PageHeroBanner title="TOUR DETAIL" breadcrumb="Tour Detail" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <TourFilterSidebar
              filters={filters}
              onChange={setFilters}
              onSearchSubmit={handleSidebarSearch}
              showPromoCard
              onPromoClick={() => setBookingOpen(true)}
            />
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#d7ebee] shadow-sm space-y-7">
            {/* Top Summary Strip */}
            <div className="rounded-2xl border border-[#d7ebee] bg-[#F8FCFC] p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold text-[#094B53]">Location</div>
                <div className="text-xs text-[#5d7a7f]">{tour.location}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#094B53]">Activity type</div>
                <div className="text-xs text-[#5d7a7f]">{tour.activityType}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#094B53]">Date</div>
                <div className="text-xs text-[#5d7a7f]">{tour.travelDate}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#094B53]">Traveler</div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#094B53]">
                  <button
                    type="button"
                    onClick={() => setTravelers((v) => Math.max(1, v - 1))}
                    className="cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span>{String(travelers).padStart(2, '0')}</span>
                  <button type="button" onClick={() => setTravelers((v) => v + 1)} className="cursor-pointer">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-xl text-[#F5A623]">${tour.pricePerDay}</div>
                <div className="text-[10px] text-[#5d7a7f]">Per day</div>
              </div>
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full cursor-pointer"
              >
                Book Now
              </button>
            </div>

            <div>
              <div className="text-xs text-[#5d7a7f] mb-1">
                ({tour.rating} Review) <span className="text-[#F5A623]">★★★★★</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-[26px] text-[#094B53]">
                The Most Beautiful Destination , {tour.title}
              </h2>
              <p className="mt-2.5 text-xs md:text-[13px] leading-relaxed text-[#4a656a]">{tour.overview}</p>
            </div>

            {/* Hero Gallery Image */}
            <div>
              <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-md">
                <img src={slides[slideIdx % slides.length]} alt={tour.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {['𝕏', 'f', '◎', 'P'].map((s, idx) => (
                    <span
                      key={idx}
                      className="w-7 h-7 rounded-full bg-[#094B53]/85 text-[#84C400] text-xs font-bold flex items-center justify-center border border-[#84C400]/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                      slideIdx === idx ? 'bg-[#F5A623]' : 'bg-[#c9dfe2]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53]">Geography & Climate</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#4a656a]">{tour.geography}</p>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Highlights & Attractions</h3>
              <div className="bg-[#FAF2E2] rounded-2xl p-5 space-y-3 text-xs leading-relaxed text-[#4a656a]">
                {tour.highlights.map((h) => (
                  <div key={h.title}>
                    <div className="font-bold text-[#094B53]">{h.title}</div>
                    <p>{h.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {tour.quote && (
              <blockquote className="pl-4 border-l-4 border-[#F5A623] py-1">
                <Quote className="w-6 h-6 text-[#F5A623] mb-1" />
                <p className="italic text-xs md:text-sm font-semibold text-[#094B53] leading-relaxed">{tour.quote}</p>
                <footer className="mt-2 text-xs font-bold text-[#094B53]">— {tour.quoteAuthor}</footer>
              </blockquote>
            )}

            {/* Includes & Not Includes */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Includes & Not Includes</h3>
              <div className="bg-[#FAF2E2] rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <ul className="space-y-2.5">
                  {tour.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[#094B53] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#84C400] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {tour.excludes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[#5d7a7f]">
                      <XCircle className="w-4 h-4 text-[#9fb3b7] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scheduled Travel Plan */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Scheduled Travel Plan</h3>
              <div className="space-y-3">
                {tour.itinerary.map((step) => (
                  <div key={step.day} className="bg-[#FAF2E2] rounded-2xl p-4 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#d7ebee] flex flex-col items-center justify-center shrink-0">
                      <span className="font-display font-extrabold text-sm text-[#094B53] leading-none">
                        {step.day}
                      </span>
                      <span className="text-[9px] font-bold text-[#F5A623]">DAY</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#094B53]">{step.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#5d7a7f]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Preview */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Video</h3>
              <div className="relative h-64 rounded-3xl overflow-hidden group">
                <img src={ASSETS.thailandCliff} alt="Tour film preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-label="Play destination showcase"
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-[#094B53] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </button>
              </div>
            </div>

            {/* Tour Gallery Strip */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {slides.slice(0, 4).map((src, i) => (
                  <div key={i} className="h-24 rounded-xl overflow-hidden">
                    <img src={src} alt="Tour view" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Location</h3>
              <InteractiveLocationMap address={tour.coordinates?.address} label={tour.coordinates?.label || tour.title} />
            </div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#094B53] text-white rounded-3xl max-w-xl w-full p-6 relative border border-white/20"
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-display font-bold text-lg">{tour.title} — Destination Highlight</h4>
            <div className="mt-4 rounded-2xl overflow-hidden relative h-64">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center p-4">
                <Star className="w-8 h-8 text-[#F5A623] mb-2" />
                <p className="text-xs max-w-sm">
                  {tour.durationDays}-Day guided expedition starting from ${tour.pricePerDay}/day with certified local guides.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultTour={{
          slug: tour.slug,
          title: tour.title,
          location: tour.location,
          activityType: tour.activityType,
          pricePerDay: tour.pricePerDay,
          travelDate: tour.travelDate,
          travelers,
        }}
      />
    </div>
  );
}
