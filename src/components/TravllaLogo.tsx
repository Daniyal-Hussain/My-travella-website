interface TravllaLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

export function TravllaLogo({ variant = 'light', compact = false, className = '' }: TravllaLogoProps) {
  const iconColor = variant === 'dark' ? '#FFFFFF' : '#094B53';
  const textColor = variant === 'dark' ? '#8DD41E' : '#7EC816';

  return (
    <span className={`inline-flex items-center gap-1 select-none ${className}`}>
      <span
        className={`font-script leading-none font-bold tracking-tight ${
          compact ? 'text-[26px]' : 'text-[30px]'
        }`}
        style={{ color: textColor }}
      >
        Travlla
      </span>
      <svg
        width={compact ? '28' : '32'}
        height={compact ? '24' : '28'}
        viewBox="0 0 36 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="-ml-1 -mt-1 shrink-0"
      >
        {/* Palm trunk */}
        <path
          d="M15 24C14.8 18 16 13.5 18.5 9.5"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Palm fronds */}
        <path
          d="M18.5 9.5C16.5 6.5 13 6 10.5 7.8M18.5 9.5C17 5.5 20.5 3.5 24 5.2M18.5 9.5C21.5 7 25 8.5 26 11.2M18.5 9.5C15 10 12.8 12.2 12 14.5"
          stroke={iconColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Sun */}
        <circle cx="26.5" cy="18" r="3.8" stroke={iconColor} strokeWidth="1.6" />
        {/* Horizon lines */}
        <path d="M9 24.5H31" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 27.5H27" stroke={iconColor} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      </svg>
    </span>
  );
}
