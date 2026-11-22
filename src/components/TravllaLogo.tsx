import { ASSETS } from '../lib/images';

interface TravllaLogoProps {
  variant?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

export function TravllaLogo({ variant = 'light', compact = false, className = '' }: TravllaLogoProps) {
  const src = variant === 'dark' ? ASSETS.brandLogoDark : ASSETS.brandLogoLight;

  return (
    <span className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={src}
        alt="N Tour Nature"
        className={`w-auto object-contain shrink-0 ${
          compact ? 'h-12 sm:h-[54px]' : 'h-20 sm:h-24'
        }`}
      />
    </span>
  );
}
