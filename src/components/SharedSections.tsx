import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Compass,
  CreditCard,
  MapPin,
  Minus,
  Navigation,
  Plane,
  Plus,
  Quote,
  ShieldCheck,
  Smile,
  Star,
  Target,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { api, type BlogPostDTO, type GalleryItemDTO, type PricingPlanDTO, type TestimonialDTO } from '../lib/api';
import { ASSETS } from '../lib/images';

export function SectionHeading({
  prefix,
  highlight,
  suffix = '',
  subtitle = 'Destinations worth exploring! Here are a few popular spots',
  align = 'center',
  dark = false,
}: {
  prefix: string;
  highlight: string;
  suffix?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <div className={align === 'center' ? 'text-center max-w-xl mx-auto' : 'text-left'}>
      <h2
        className={`font-display text-2xl md:text-[32px] font-extrabold leading-tight ${
          dark ? 'text-white' : 'text-[#094B53]'
        }`}
      >
        {prefix} <span className="text-[#F5A623]">{highlight}</span>
        {suffix ? ` ${suffix}` : ''}
      </h2>
      <p className={`mt-1.5 text-xs md:text-[13px] ${dark ? 'text-[#cce1e3]' : 'text-[#5d7a7f]'}`}>{subtitle}</p>
      {align === 'center' && (
        <div className="mt-2 flex items-center justify-center gap-2 opacity-60">
          <span className={`h-px w-12 border-t border-dashed ${dark ? 'border-white/50' : 'border-[#7c9ea3]'}`} />
          <Plane className={`w-3.5 h-3.5 ${dark ? 'text-white' : 'text-[#094B53]'}`} />
          <span className={`h-px w-12 border-t border-dashed ${dark ? 'border-white/50' : 'border-[#7c9ea3]'}`} />
        </div>
      )}
    </div>
  );
}

export function EasyStepsSection() {
  const steps = [
    {
      num: '01',
      title: 'Choose Destination',
      desc: 'All you have to do is, first select your preferred destination and proceed.',
      bg: 'bg-gradient-to-b from-[#499EB9] to-[#E1F3F7]',
      text: 'text-white',
      descText: 'text-white/90',
      numColor: 'text-white/75',
      icon: Compass,
      rotate: '-rotate-2',
    },
    {
      num: '02',
      title: 'Make Payment',
      desc: 'You are important to us. We pay attention to the quality of every service we provide to you.',
      bg: 'bg-gradient-to-b from-[#F59EA8] to-[#FCEEF1]',
      text: 'text-white',
      descText: 'text-white/95',
      numColor: 'text-white/80',
      icon: CreditCard,
      rotate: 'rotate-1 md:-mt-4',
    },
    {
      num: '03',
      title: 'Ready For Travelling',
      desc: 'We have seen that you have fulfilled all the requirements, now you are ready to travel.',
      bg: 'bg-gradient-to-b from-[#09535B] to-[#C8E4E7]',
      text: 'text-white',
      descText: 'text-white/90',
      numColor: 'text-white/75',
      icon: Plane,
      rotate: 'rotate-2',
    },
  ];

  return (
    <section className="relative py-16 md:py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-12">
          <div className="max-w-lg">
            <h2 className="font-display text-2xl md:text-[32px] font-extrabold text-[#094B53]">
              Easy <span className="text-[#F5A623]">Steps</span> For Booking
            </h2>
            <p className="mt-2 text-xs md:text-[13px] leading-relaxed text-[#5d7a7f]">
              Choosing a destination can be exciting but also a bit overwhelming with so many amazing places out there! Let’s narrow it down—Travlla specializes in crafting effortless curated journeys.
            </p>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center justify-center bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full transition-colors self-start"
          >
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className={`${s.bg} ${s.rotate} rounded-3xl p-7 shadow-lg transition-transform hover:rotate-0 duration-300 min-h-[275px] flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="w-12 h-12 rounded-full bg-white/95 text-[#094B53] flex items-center justify-center mx-auto shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-5">
                  <h3 className={`font-display font-bold text-base ${s.text}`}>{s.title}</h3>
                  <p className={`mt-1.5 text-xs leading-relaxed ${s.descText}`}>{s.desc}</p>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#094B53]" />
                  </div>
                  <span className={`font-display font-extrabold text-4xl leading-none ${s.numColor}`}>{s.num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PricingCardsSection({
  plans,
  onSelectPlan,
}: {
  plans: PricingPlanDTO[];
  onSelectPlan: (plan: PricingPlanDTO) => void;
}) {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-[#dff0f3]">
      {/* Scenic Alpine Backdrop */}
      <img
        src={ASSETS.bannerAlpine}
        alt="Alpine scenic mountains"
        className="absolute inset-0 w-full h-full object-cover object-bottom opacity-70 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef7f8] via-[#e4f2f4]/70 to-transparent pointer-events-none" />

      {/* Decorative Balloon */}
      <svg viewBox="0 0 80 120" className="hidden lg:block absolute left-6 top-28 w-16 h-24 opacity-85 pointer-events-none">
        <ellipse cx="40" cy="40" rx="30" ry="36" fill="#E96D71" />
        <path d="M24 12C32 32 32 54 34 74" stroke="#CC5256" strokeWidth="2.5" />
        <path d="M56 12C48 32 48 54 46 74" stroke="#CC5256" strokeWidth="2.5" />
        <rect x="33" y="82" width="14" height="12" rx="2" fill="#8B5A2B" />
      </svg>

      <div className="relative max-w-[1060px] mx-auto">
        <SectionHeading prefix="Price For" highlight="Travel The World" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/95 backdrop-blur rounded-[32px] p-4 shadow-xl border-4 transition-transform hover:-translate-y-1 ${
                plan.highlighted ? 'border-[#FAE4BE]' : 'border-[#D7EBEE]'
              }`}
            >
              <div className="h-36 rounded-t-[24px] rounded-b-xl overflow-hidden">
                <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
              </div>

              <div className="px-3 pt-5 pb-3">
                <div className="flex items-start justify-between gap-2 pb-4 border-b border-[#e8f2f4]">
                  <h3 className="font-display font-bold text-lg text-[#094B53]">{plan.name}</h3>
                  <div className="text-right">
                    <span className="font-display font-extrabold text-2xl text-[#094B53]">${plan.pricePerDay}</span>
                    <span className="block text-[10px] text-[#5d7a7f]">Per day</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5 text-xs text-[#436065]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full border border-[#F5A623] text-[#F5A623] flex items-center justify-center shrink-0">
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom White Wavy Edge */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-10 md:h-14 text-white fill-current pointer-events-none"
      >
        <path d="M0,35 C120,75 240,5 360,35 C480,65 600,15 720,35 C840,55 960,10 1080,35 C1200,60 1320,15 1440,35 L1440,70 L0,70 Z" />
      </svg>
    </section>
  );
}

export function RecommendDestinationsSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-[1040px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Collage */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-[440px]">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#fdf3e3] mx-auto overflow-hidden border-4 border-white shadow-lg">
              <img
                src={ASSETS.umbrellaTraveler}
                alt="Happy traveler with yellow umbrella"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="hidden sm:block absolute -top-4 right-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img src={ASSETS.machuHike} alt="Mountain trek" className="w-full h-full object-cover" />
            </div>

            <div className="hidden sm:block absolute bottom-2 right-0 w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#eef7f8]">
              <img src={ASSETS.parisEiffel} alt="Paris Eiffel destination" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right Editorial & Stats */}
        <div className="lg:col-span-6 relative">
          <div className="flex gap-5 items-stretch">
            <div className="flex-1">
              <h2 className="font-display text-2xl md:text-[34px] font-extrabold text-[#094B53] leading-tight">
                We <span className="text-[#F5A623]">Recommend</span> Beautiful Destinations Every Month
              </h2>
              <p className="mt-3 text-xs md:text-[13px] leading-relaxed text-[#5d7a7f]">
                Travlla is a multi-award-winning strategy and travel curation agency helping global explorers discover authentic cultures, alpine trails, and beachfront sanctuaries safely.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="rounded-2xl border border-[#d7ebee] p-4 flex items-start gap-4 bg-white hover:bg-[#f7fbfb] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eef7f8] text-[#094B53] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#094B53]">Trusted travel guide</h4>
                    <p className="text-xs text-[#5d7a7f] mt-0.5">
                      Provides reliable information to help travelers plan their trips efficiently and safely.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#d7ebee] p-4 flex items-start gap-4 bg-white hover:bg-[#f7fbfb] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#eef7f8] text-[#094B53] flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#094B53]">Mission & Vision</h4>
                    <p className="text-xs text-[#5d7a7f] mt-0.5">
                      Aims to connect people to positive experience through travel, helping them see the world differently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Link
                  to="/tours"
                  className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-3 rounded-full transition-colors"
                >
                  Discover More
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {[ASSETS.guide1, ASSETS.guide2, ASSETS.guide3].map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Happy customer"
                        className="w-9 h-9 rounded-full object-cover border-2 border-white shadow"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-sm text-[#094B53]">3.5k</div>
                    <div className="text-[10px] font-semibold tracking-wider text-[#5d7a7f] uppercase">
                      HAPPY CUSTOMER
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical 25 Years of Experience Accent */}
            <div className="hidden sm:flex flex-col items-center justify-center select-none pl-2">
              <span className="font-display font-extrabold text-5xl text-[#F5A623] writing-vertical-rl">25</span>
              <span className="font-display font-bold text-xs tracking-wider text-[#094B53] writing-vertical-rl mt-2">
                Years of Experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReachOutSection({ sourcePage = 'home' }: { sourcePage?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.submitContact({
        name,
        email,
        subject: subject || 'Tour Inquiry',
        message,
        sourcePage,
      });
      toast.success('Message sent! Our friendly travel team will reply shortly.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[470px]">
      {/* Left Golden Mountain Photo */}
      <div className="relative min-h-[340px] lg:min-h-full overflow-hidden">
        <img
          src={ASSETS.promoYellowLaptop}
          alt="Traveler enjoying mountain sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 right-6 max-w-md bg-[#094B53]/85 backdrop-blur-md text-white p-6 rounded-2xl border border-white/15">
          <div className="font-script text-2xl font-bold text-[#F5A623]">Hi there!</div>
          <div className="font-script text-3xl md:text-4xl font-bold text-white leading-tight mt-0.5">
            What can I do for you today?
          </div>
        </div>
      </div>

      {/* Right Warm Cream Contact Card */}
      <div className="bg-[#FAF2E2] p-8 md:p-14 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="font-display text-2xl md:text-[30px] font-extrabold text-[#094B53]">
            <span className="text-[#F5A623]">Reach</span> & Get in Touch With Us!
          </h2>
          <p className="text-xs text-[#5d7a7f] mt-1">We love to hear from you. Our friendly team is always here to chat.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="w-full bg-white rounded-full px-5 py-3 text-xs text-[#183135] border border-[#eee3cf] focus:outline-none focus:border-[#094B53]"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full bg-white rounded-full px-5 py-3 text-xs text-[#183135] border border-[#eee3cf] focus:outline-none focus:border-[#094B53]"
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Select Your Subject"
              className="w-full bg-white rounded-full px-5 py-3 text-xs text-[#183135] border border-[#eee3cf] focus:outline-none focus:border-[#094B53]"
            />
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="w-full bg-white rounded-2xl px-5 py-3.5 text-xs text-[#183135] border border-[#eee3cf] focus:outline-none focus:border-[#094B53]"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-7 py-3 rounded-full transition-colors cursor-pointer"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function LatestNewsSection({ blogs }: { blogs: BlogPostDTO[] }) {
  const [offset, setOffset] = useState(0);
  const items = blogs.length > 0 ? blogs : [];
  const visible = items.length <= 3 ? items : [items[offset % items.length], items[(offset + 1) % items.length], items[(offset + 2) % items.length]];

  return (
    <section className="py-16 md:py-20 px-4 bg-[#E6F4F6] travel-doodle-pattern">
      <div className="max-w-[1040px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-[32px] font-extrabold text-[#094B53]">
              Explore <span className="text-[#F5A623]">Latest News</span>
            </h2>
            <p className="mt-1.5 text-xs text-[#5d7a7f] max-w-md">
              Discover curated travel itineraries, local etiquette guides, and seasonal flight tips from our editors.
            </p>
          </div>
          <Link
            to="/blog"
            className="bg-[#84C400] hover:bg-[#73ac00] text-white font-semibold text-xs px-6 py-2.5 rounded-full transition-colors self-start"
          >
            See More Article
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all border border-[#d7ebee]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#094B53] text-white rounded-lg px-2.5 py-1.5 text-center leading-tight shadow">
                  <div className="font-display font-bold text-sm">{post.dateDay}</div>
                  <div className="text-[10px] opacity-85">{post.dateMonth}</div>
                </div>
              </div>
              <div className="p-5 bg-white -mt-5 mx-3 mb-3 relative rounded-xl shadow-sm">
                <div className="text-[11px] font-semibold text-[#F5A623]">{post.author}</div>
                <h3 className="font-display font-bold text-sm text-[#094B53] mt-1 line-clamp-2 group-hover:text-[#F5A623] transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {items.length > 3 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setOffset((v) => (v - 1 + items.length) % items.length)}
              aria-label="Previous articles"
              className="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center hover:bg-[#e09314] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setOffset((v) => (v + 1) % items.length)}
              aria-label="Next articles"
              className="w-9 h-9 rounded-full bg-white text-[#094B53] border border-[#d7ebee] flex items-center justify-center hover:bg-[#eef7f8] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function StatsStripSection({ dark = false }: { dark?: boolean }) {
  const stats = [
    { icon: Award, label: 'Awards Winning', value: '3600+', color: 'bg-[#094B53] text-white' },
    { icon: Smile, label: 'Happy Traveler', value: '7634+', color: 'bg-[#F5A623] text-white' },
    { icon: Compass, label: 'Tours success', value: '2.5k', color: 'bg-[#094B53] text-white' },
    { icon: Briefcase, label: 'Our Experience', value: '25+', color: 'bg-[#F5A623] text-white' },
  ];

  if (dark) {
    return (
      <section className="bg-[#094B53] py-10 px-4 text-white">
        <div className="max-w-[1040px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex items-center gap-4 px-4 py-3 border border-white/10 rounded-xl bg-white/5"
              >
                <Icon className="w-7 h-7 text-[#84C400] shrink-0" />
                <div>
                  <div className="text-[11px] text-[#cce1e3]">{s.label}</div>
                  <div className="font-display font-extrabold text-xl text-[#F5A623]">{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-[960px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="relative pt-4 pl-4">
              <div
                className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center absolute top-0 left-0 shadow-md z-10`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="bg-[#F4FBFB] border border-[#d7ebee] rounded-2xl p-4 pl-8 shadow-sm">
                <div className="text-[11px] text-[#5d7a7f]">{s.label}</div>
                <div className="font-display font-extrabold text-xl text-[#094B53] mt-0.5">{s.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function BrandsTrustStrip() {
  const brands = ['Roadtrip', 'TRAVELLING', 'travelWORLD', 'ADVENTURE', 'BUSINESS'];
  return (
    <section className="bg-[#EEF7F8] border-y border-dashed border-[#bcd9de] py-7 px-4">
      <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="shrink-0">
          <div className="font-display font-extrabold text-xl text-[#F5A623]">1k+</div>
          <div className="font-display font-bold text-lg text-[#094B53] leading-tight">Brands Trust Us</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display font-extrabold tracking-wide text-sm md:text-base text-[#8aa5a9] select-none uppercase"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialSliderSection({ testimonials }: { testimonials: TestimonialDTO[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[activeIdx % testimonials.length];

  return (
    <section className="py-16 md:py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeading prefix="Our Client" highlight="Says !" />

        {/* Architectural Watermark Typography */}
        <div className="relative text-center select-none mt-4 mb-2">
          <div className="font-display font-extrabold text-[44px] sm:text-[74px] md:text-[96px] leading-none tracking-[0.12em] bg-gradient-to-b from-[#094B53]/70 via-[#094B53]/25 to-transparent bg-clip-text text-transparent">
            TESTIMONIAL
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center -mt-4 md:-mt-8 relative z-10">
          {/* Portrait with Cream Halo */}
          <div className="md:col-span-5 flex items-center justify-center gap-4">
            <div className="relative">
              <div className="w-56 h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white relative z-10">
                <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-full bg-[#FAF2E2] border-4 border-[#094B53]/30 absolute -right-5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Side Thumb Selectors */}
            <div className="flex flex-col gap-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeIdx ? 'border-[#F5A623] scale-110 shadow-md' : 'border-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quote Details */}
          <div className="md:col-span-7 relative">
            <Quote className="w-10 h-10 text-[#d0e5e8] absolute right-2 top-0" />
            <h3 className="font-script text-3xl font-bold text-[#094B53]">{current.name}</h3>
            <div className="text-xs font-semibold text-[#F5A623] capitalize">{current.role}</div>
            <p className="mt-4 text-sm leading-relaxed text-[#4a656a] max-w-lg">{current.quote}</p>

            <div className="mt-5 flex items-center justify-between max-w-lg">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveIdx((v) => (v - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full bg-[#F5A623] text-white flex items-center justify-center hover:bg-[#e09314] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIdx((v) => (v + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full bg-white text-[#094B53] border border-[#d7ebee] flex items-center justify-center hover:bg-[#eef7f8] cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-0.5 text-[#F5A623]">
                {Array.from({ length: current.rating || 5 }).map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GalleryBentoGrid({ items }: { items: GalleryItemDTO[] }) {
  const [lightboxImg, setLightboxImg] = useState<GalleryItemDTO | null>(null);
  const top = items.filter((i) => i.bentoGroup === 'top');
  const display = top.length >= 7 ? top.slice(0, 7) : items.slice(0, 7);

  if (display.length < 7) return null;

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading prefix="Best Memorable" highlight="Gallery" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Left column: 2 stacked */}
          <div className="md:col-span-3 flex flex-col gap-3.5">
            {[display[0], display[3]].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxImg(item)}
                className="h-44 rounded-2xl overflow-hidden group relative cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>

          {/* Center column: tall vertical */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => setLightboxImg(display[1])}
              className="w-full h-[366px] rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={display[1].image}
                alt={display[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </div>

          {/* Right column: tall portrait */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => setLightboxImg(display[2])}
              className="w-full h-[366px] rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={display[2].image}
                alt={display[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </div>

          {/* Bottom row */}
          <div className="md:col-span-6">
            <button
              type="button"
              onClick={() => setLightboxImg(display[4])}
              className="w-full h-44 rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={display[4].image}
                alt={display[4].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </div>
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() => setLightboxImg(display[5])}
              className="w-full h-44 rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={display[5].image}
                alt={display[5].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </div>
          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() => setLightboxImg(display[6])}
              className="w-full h-44 rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={display[6].image}
                alt={display[6].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          </div>
        </div>

        {/* Display Accent Banner Text */}
        <div className="mt-8 text-right">
          <div className="text-xs font-bold text-[#094B53]">Explore the Most Beautiful</div>
          <div className="font-display font-extrabold text-3xl sm:text-5xl text-[#F5A623] tracking-tight uppercase">
            PLACE IN THE WORLD
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
          >
            <div className="relative">
              <img src={lightboxImg.image} alt={lightboxImg.title} className="w-full max-h-[70vh] object-cover" />
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white text-[#094B53] flex items-center justify-center shadow"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-[#094B53]">{lightboxImg.title}</h4>
                <p className="text-xs text-[#5d7a7f]">{lightboxImg.location}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#eef7f8] text-[#094B53]">
                {lightboxImg.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function InteractiveLocationMap({
  address = '853 W Blackhawk St, Chicago, IL 60642, USA',
  label = 'Travlla Regional Hub',
  heightClass = 'h-[310px]',
}: {
  address?: string;
  label?: string;
  heightClass?: string;
}) {
  const [zoom, setZoom] = useState(1);
  const navigate = useNavigate();

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#d7ebee] bg-[#eef2ec]`}>
      {/* Stylized Cartographic Map Grid */}
      <svg
        viewBox="0 0 800 380"
        className="w-full h-full object-cover transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="800" height="380" fill="#eef1ec" />
        <path d="M0 120 Q240 160 440 110 T800 130" stroke="#ffffff" strokeWidth="14" fill="none" />
        <path d="M120 0 Q190 190 250 380" stroke="#ffffff" strokeWidth="11" fill="none" />
        <path d="M480 0 Q510 170 590 380" stroke="#ffffff" strokeWidth="9" fill="none" />
        <path d="M0 270 Q340 230 800 280" stroke="#ffffff" strokeWidth="10" fill="none" />
        <path d="M640 40 L760 40 L750 180 L610 150 Z" fill="#dcecd8" />
        <path d="M180 210 C220 190 280 205 310 245 C270 285 200 275 180 210 Z" fill="#cde5f0" />
        <text x="80" y="95" fill="#7c877c" fontSize="11" fontFamily="sans-serif">Trail</text>
        <text x="275" y="90" fill="#7c877c" fontSize="11" fontFamily="sans-serif">Shady Cove</text>
        <text x="415" y="190" fill="#7c877c" fontSize="11" fontFamily="sans-serif">Lake of the Woods</text>
        <text x="580" y="210" fill="#7c877c" fontSize="11" fontFamily="sans-serif">Klamath</text>
        <text x="320" y="295" fill="#7c877c" fontSize="11" fontFamily="sans-serif">Ashland</text>
      </svg>

      {/* Top Left Google-Style Place Card */}
      <div className="absolute top-3 left-3 bg-white rounded-lg shadow-md border border-[#e3ecee] p-3 max-w-[230px]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-display font-bold text-xs text-[#183135]">{label}</div>
            <p className="text-[10px] text-[#5d7a7f] leading-snug mt-0.5">{address}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="flex flex-col items-center text-[#1a73e8] hover:underline shrink-0 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span className="text-[9px] font-medium">Directions</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setZoom((z) => (z === 1 ? 1.25 : 1))}
          className="mt-1.5 text-[10px] text-[#1a73e8] font-medium hover:underline cursor-pointer"
        >
          {zoom > 1 ? 'Reset zoom' : 'View larger map'}
        </button>
      </div>

      {/* Interactive Pin Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
        <div className="w-9 h-9 rounded-full bg-[#094B53] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
          <MapPin className="w-4 h-4 text-[#F5A623]" />
        </div>
      </div>

      {/* Bottom Right Zoom Controls */}
      <div className="absolute bottom-3 right-3 bg-white rounded-lg shadow border border-[#d7ebee] flex flex-col">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.15).toFixed(2))))}
          aria-label="Zoom in"
          className="p-2 hover:bg-[#eef7f8] text-[#094B53] border-b border-[#e5f1f2] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(1, Number((z - 0.15).toFixed(2))))}
          aria-label="Zoom out"
          className="p-2 hover:bg-[#eef7f8] text-[#094B53] cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
