import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { api, type BlogPostDTO, type PricingPlanDTO, type ServiceDTO, type TestimonialDTO } from '../lib/api';
import { ASSETS } from '../lib/images';
import { BookingModal } from '../components/BookingModal';
import { PageHeroBanner } from '../components/PageHeroBanner';
import {
  EasyStepsSection,
  LatestNewsSection,
  PricingCardsSection,
  ReachOutSection,
  RecommendDestinationsSection,
  SectionHeading,
  StatsStripSection,
  TestimonialSliderSection,
} from '../components/SharedSections';
import { BlogDestSidebar } from '../components/Sidebars';

export function AboutPage() {
  const [testimonials, setTestimonials] = useState<TestimonialDTO[]>([]);
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [destOffset, setDestOffset] = useState(0);

  useEffect(() => {
    api.getTestimonials().then((r) => setTestimonials(r.testimonials)).catch(() => {});
    api.getServices().then((r) => setServices(r.services)).catch(() => {});
  }, []);

  const popularDestinations = [
    { name: 'Paris', image: ASSETS.parisEiffel, active: false, slug: 'paris' },
    { name: 'Maldives', image: ASSETS.maldivesVillas, active: true, slug: 'maldives' },
    { name: 'Kashmir', image: ASSETS.kashmirBalloon, active: false, slug: 'kashmir' },
    { name: 'Thailand', image: ASSETS.thailandCliff, active: false, slug: 'thailand' },
  ];

  const orderedDestinations = popularDestinations.map(
    (_, idx) => popularDestinations[(destOffset + idx) % popularDestinations.length],
  );

  return (
    <div>
      <PageHeroBanner title="ABOUT US" breadcrumb="About Us" />

      <RecommendDestinationsSection />

      {/* Popular Destination Arch Grid */}
      <section className="relative py-16 px-4 bg-[#E6F4F6] overflow-hidden">
        <div className="max-w-[1060px] mx-auto relative z-10">
          <SectionHeading prefix="Popular" highlight="Destination" />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {orderedDestinations.map((d) => (
              <Link
                key={d.name}
                to={`/destinations/${d.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div
                  className={`py-3 text-center font-display font-bold text-sm ${
                    d.active ? 'bg-[#094B53] text-white' : 'bg-white text-[#094B53]'
                  }`}
                >
                  {d.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setDestOffset((v) => (v - 1 + popularDestinations.length) % popularDestinations.length)}
              aria-label="Previous destination"
              className="w-9 h-9 rounded-full bg-[#F5A623] hover:bg-[#e09314] text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDestOffset((v) => (v + 1) % popularDestinations.length)}
              aria-label="Next destination"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#eef7f8] text-[#094B53] flex items-center justify-center border border-[#d7ebee] cursor-pointer transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Amazing Services Dark Teal Grid */}
      <ServicesShowcaseSection services={services} />

      {/* Testimonials Slider */}
      <TestimonialSliderSection testimonials={testimonials} />
    </div>
  );
}

function ServicesShowcaseSection({ services }: { services: ServiceDTO[] }) {
  return (
    <section className="bg-[#094B53] py-16 md:py-20 px-4">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeading prefix="Our Amazing" highlight="Services" dark />

        <div className="mt-10 bg-[#E6F4F6] rounded-[36px] p-6 md:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 8).map((svc) => (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className="group bg-white rounded-2xl p-2.5 shadow-sm hover:shadow-lg transition-all text-center"
            >
              <div className="h-36 rounded-xl overflow-hidden">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-2.5 pb-1 font-display font-bold text-xs text-[#094B53] group-hover:text-[#F5A623]">
                {svc.title}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-right">
          <div className="text-xs font-semibold text-white">Wonderful Services For You</div>
          <div className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5A623] uppercase tracking-tight">
            SERVICES WE OFFER
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesPage() {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [blogs, setBlogs] = useState<BlogPostDTO[]>([]);

  useEffect(() => {
    api.getServices().then((r) => setServices(r.services)).catch(() => {});
    api.getBlogs().then((r) => setBlogs(r.blogs)).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeroBanner title="SERVICES" breadcrumb="Services" />
      <ServicesShowcaseSection services={services} />
      <RecommendDestinationsSection />
      <StatsStripSection dark />
      <LatestNewsSection blogs={blogs} />
    </div>
  );
}

export function ServiceDetailPage() {
  const { slug = 'tour-guide' } = useParams();
  const [service, setService] = useState<ServiceDTO | null>(null);
  const [allServices, setAllServices] = useState<Array<{ slug: string; title: string }>>([]);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setService(null);
    api
      .getService(slug)
      .then((res) => {
        setService(res.service);
        setAllServices(res.allServices);
        setOpenFaq(0);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <PageHeroBanner title="SERVICE DETAIL" breadcrumb="Service Detail" />
        <div className="py-20 px-4 text-center space-y-4">
          <p className="text-sm text-[#5d7a7f]">Requested service was not found.</p>
          <Link
            to="/services"
            className="inline-block bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full"
          >
            Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div>
        <PageHeroBanner title="SERVICE DETAIL" breadcrumb="Service Detail" />
        <div className="py-20 text-center text-sm text-[#5d7a7f]">Loading service details...</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeroBanner title="SERVICE DETAIL" breadcrumb="Service Detail" />

      <section className="py-14 px-4 bg-[#F6FCFC]">
        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-7">
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img src={service.image} alt={service.title} className="w-full h-[320px] md:h-[380px] object-cover" />
            </div>

            <div className="flex justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
              <span className="w-2 h-2 rounded-full bg-[#c9dfe2]" />
              <span className="w-2 h-2 rounded-full bg-[#c9dfe2]" />
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-[#094B53]">{service.headline}</h2>
              <p className="mt-3 text-xs md:text-[13.5px] leading-relaxed text-[#4a656a]">{service.intro}</p>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53]">{service.whatIsTitle}</h3>
              <ul className="mt-3 space-y-2.5">
                {service.whatIsBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-xs text-[#436065]">
                    <CheckCircle2 className="w-4 h-4 text-[#84C400] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Types of Service Table */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">
                Types of {service.title} Services
              </h3>
              <div className="bg-white rounded-2xl border border-[#d7ebee] overflow-hidden">
                {service.serviceTypes.map((st, idx) => (
                  <div
                    key={st.name}
                    className={`grid grid-cols-1 sm:grid-cols-12 gap-2 px-5 py-3 text-xs ${
                      idx !== service.serviceTypes.length - 1 ? 'border-b border-[#eaf4f5]' : ''
                    }`}
                  >
                    <div className="sm:col-span-4 font-bold text-[#094B53]">{st.name}</div>
                    <div className="sm:col-span-8 text-[#5d7a7f]">{st.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">
                Key Features of Professional {service.title}
              </h3>
              <ul className="space-y-2.5">
                {service.keyFeatures.map((kf) => (
                  <li key={kf.label} className="flex items-start gap-2.5 text-xs text-[#436065]">
                    <CheckCircle2 className="w-4 h-4 text-[#84C400] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#094B53]">{kf.label}</strong> {kf.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frequently Ask Questions Accordion */}
            <div>
              <h3 className="font-display font-bold text-lg text-[#094B53] mb-3">Frequently Ask Questions</h3>
              <div className="bg-white rounded-2xl border border-[#d7ebee] overflow-hidden">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.number} className="border-b last:border-none border-[#eaf4f5]">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs font-bold text-[#094B53] cursor-pointer"
                      >
                        <span>
                          {faq.number} - {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#F5A623] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-xs leading-relaxed text-[#5d7a7f]">{faq.answer}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scheduled Amenities */}
            <div className="space-y-5">
              <h3 className="font-display font-bold text-lg text-[#094B53]">Our Scheduled Amenities</h3>

              <div className="bg-[#FAF2E2] rounded-2xl p-5 border border-[#efe2c6]">
                <h4 className="font-display font-bold text-sm text-[#094B53] mb-3">For Travel</h4>
                <div className="space-y-2.5">
                  {service.amenitiesTravel.map((row) => (
                    <div key={row.category} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                      <div className="sm:col-span-4 font-bold text-[#094B53]">{row.category}</div>
                      <div className="sm:col-span-8 text-[#5d7a7f]">{row.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF2E2] rounded-2xl p-5 border border-[#efe2c6]">
                <h4 className="font-display font-bold text-sm text-[#094B53] mb-3">For Food</h4>
                <div className="space-y-2.5">
                  {service.amenitiesFood.map((row) => (
                    <div key={row.category} className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                      <div className="sm:col-span-4 font-bold text-[#094B53]">{row.category}</div>
                      <div className="sm:col-span-8 text-[#5d7a7f]">{row.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <BlogDestSidebar showOtherServices servicesList={allServices} />
          </div>
        </div>
      </section>
    </div>
  );
}

export function PricingPlanPage() {
  const [plans, setPlans] = useState<PricingPlanDTO[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanDTO | null>(null);

  useEffect(() => {
    api.getPricing().then((r) => setPlans(r.plans)).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeroBanner title="PRICING PLAN" breadcrumb="Pricing Plan" />
      <PricingCardsSection plans={plans} onSelectPlan={setSelectedPlan} />
      <EasyStepsSection />
      <ReachOutSection sourcePage="pricing" />

      <BookingModal
        open={Boolean(selectedPlan)}
        onClose={() => setSelectedPlan(null)}
        defaultTour={
          selectedPlan
            ? {
                slug: 'bali-indonesia',
                title: `${selectedPlan.name} Plan`,
                location: 'Worldwide Choice',
                activityType: selectedPlan.name,
                pricePerDay: selectedPlan.pricePerDay,
              }
            : undefined
        }
      />
    </div>
  );
}
