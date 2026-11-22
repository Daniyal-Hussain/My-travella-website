import { Link } from 'react-router-dom';
import { ASSETS } from '../lib/images';

interface PageHeroBannerProps {
  title: string;
  breadcrumb: string;
}

export function PageHeroBanner({ title, breadcrumb }: PageHeroBannerProps) {
  return (
    <section className="relative w-full h-[250px] md:h-[295px] overflow-hidden bg-[#d8eef2]">
      <img
        src={ASSETS.bannerAlpine}
        alt={title}
        className="w-full h-full object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d8eff2]/65 via-[#d8eff2]/30 to-transparent" />

      {/* Decorative Airplane Ascending Right */}
      <svg
        viewBox="0 0 260 110"
        className="hidden sm:block absolute right-16 md:right-24 top-10 w-[190px] md:w-[250px] opacity-90 pointer-events-none"
        fill="none"
      >
        <path
          d="M15 86L108 62L142 18L160 22L138 56L205 40L224 22L236 25L222 44L242 48L238 56L212 58L135 80L104 98L90 94L108 78L38 92L15 86Z"
          fill="#FFFFFF"
          stroke="#094B53"
          strokeWidth="1.5"
        />
        <path d="M120 62L210 42" stroke="#F5A623" strokeWidth="3.5" strokeLinecap="round" />
      </svg>

      {/* Decorative Hot Air Balloons */}
      <svg
        viewBox="0 0 60 85"
        className="hidden md:block absolute right-3 top-2 w-12 h-16 pointer-events-none opacity-90"
        fill="none"
      >
        <ellipse cx="30" cy="28" rx="22" ry="26" fill="#5BB5D5" />
        <path d="M16 10C22 25 22 40 24 53" stroke="#3688A8" strokeWidth="2" />
        <path d="M44 10C38 25 38 40 36 53" stroke="#3688A8" strokeWidth="2" />
        <rect x="24" y="58" width="12" height="10" rx="2" fill="#8B5A2B" />
      </svg>
      <svg
        viewBox="0 0 40 56"
        className="hidden md:block absolute right-6 bottom-8 w-8 h-12 pointer-events-none opacity-85"
        fill="none"
      >
        <ellipse cx="20" cy="18" rx="14" ry="17" fill="#E36D70" />
        <rect x="16" y="39" width="8" height="7" rx="1.5" fill="#8B5A2B" />
      </svg>

      {/* Centered Heading & Breadcrumb */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-10">
        <h1 className="font-display text-3xl md:text-[42px] font-extrabold tracking-tight text-[#094B53] uppercase">
          {title}
        </h1>
        <p className="mt-2 text-xs md:text-sm font-medium text-[#094B53]/85">
          <Link to="/" className="hover:text-[#F5A623] transition-colors">
            Home
          </Link>
          <span className="mx-2">-</span>
          <span>{breadcrumb}</span>
        </p>
      </div>
    </section>
  );
}
