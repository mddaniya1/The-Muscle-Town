import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { HeroAppear, ScrollReveal } from './MotionPrimitives';

export const OFFICIAL_LOGO_SRC = '/assets/aistudio/the-muscle-town-logo_14e179f3.png';

/** Official The Muscle Town emblem mark (replaces the placeholder bar mark) */
export function BrandMark({
  size = 'sm',
  className = '',
}: {
  dark?: boolean;
  accentLast?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const sizeClasses =
    size === 'md'
      ? 'w-[42px] h-[42px] p-[4px]'
      : 'w-[36px] h-[36px] md:w-[38px] md:h-[38px] p-[3px]';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white border border-[rgba(255,255,255,0.16)] overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${sizeClasses} ${className}`}
    >
      <img
        src={OFFICIAL_LOGO_SRC}
        alt="The Muscle Town official logo"
        className="w-full h-full object-contain block select-none"
        draggable={false}
      />
    </span>
  );
}

/** Two-tone heading matching Thres signature style */
export function TwoToneHeading({
  as = 'h2',
  line1,
  line2,
  night = false,
  className = '',
}: {
  as?: 'h1' | 'h2' | 'h3';
  line1: string;
  line2: string;
  night?: boolean;
  className?: string;
}) {
  const Tag = as;
  const sizeClass =
    as === 'h1' ? 'type-display' : as === 'h2' ? 'type-heading' : 'type-title';

  return (
    <Tag className={`${sizeClass} text-balance ${className}`}>
      <span className="text-white block">{line1}</span>
      <span
        className="block"
        style={{
          color: night ? 'rgba(255,255,255,0.44)' : '#A1A1AA',
        }}
      >
        {line2}
      </span>
    </Tag>
  );
}

/** Five Thres button variants: primary, zone, outline, light, night-outline */
export type ButtonVariant =
  | 'primary'
  | 'zone'
  | 'outline'
  | 'light'
  | 'night-outline';

interface ThresButtonProps {
  variant?: ButtonVariant;
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  accentColor?: string;
}

export function ThresButton({
  variant = 'primary',
  to,
  href,
  onClick,
  children,
  className = '',
  withArrow = false,
  type = 'button',
  disabled = false,
  accentColor,
}: ThresButtonProps) {
  const base =
    'group/btn inline-flex items-center justify-center gap-2.5 rounded-full type-label px-5 py-3 min-h-[44px] whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]';

  let variantClasses = '';
  let inlineStyle: React.CSSProperties = {};

  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-[#E11D2E] text-white hover:bg-[#8B0000] border border-transparent';
      break;
    case 'zone':
      variantClasses = 'text-white hover:bg-[#8B0000] transition-colors';
      inlineStyle = { backgroundColor: accentColor || '#E11D2E' };
      break;
    case 'outline':
      variantClasses =
        'bg-transparent text-white border border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]';
      break;
    case 'light':
      variantClasses = 'bg-white text-[#0B0B0C] hover:bg-[#E4E4E7]';
      break;
    case 'night-outline':
      variantClasses =
        'bg-transparent text-white border border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]';
      break;
  }

  const content = (
    <>
      <span className="transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover/btn:translate-x-[1px]">
        {children}
      </span>
      {withArrow && (
        <ArrowUpRight
          className="w-4 h-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover/btn:translate-x-[1.5px] group-hover/btn:-translate-y-[1.5px]"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${base} ${variantClasses} ${className}`} style={inlineStyle}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${base} ${variantClasses} ${className}`}
        style={inlineStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClasses} ${className}`}
      style={inlineStyle}
    >
      {content}
    </button>
  );
}

/** ZonePhoto: monochrome by default, drifts subtly on scroll (CSS view-timeline), reveals warm color + accent wash on hover */
export function ZonePhoto({
  src,
  alt,
  className = '',
  imgClassName = '',
  accentColor,
  alwaysColor = false,
  drift = true,
  objectPosition = 'center center',
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  accentColor?: string;
  alwaysColor?: boolean;
  drift?: boolean;
  objectPosition?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`zone-photo-wrap relative overflow-hidden bg-[#161618] ${
        drift ? 'zone-photo-drift' : ''
      } ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectPosition }}
          className={`w-full h-full object-cover zone-photo-img ${
            alwaysColor ? 'zone-photo-always-color' : ''
          } ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#161618] to-[#0B0B0C] text-[#A1A1AA]">
          <span className="type-small text-center">{alt}</span>
        </div>
      )}
      {!alwaysColor && (
        <div
          className="zone-photo-tint pointer-events-none absolute inset-0 opacity-0"
          style={{ backgroundColor: accentColor || 'var(--mt-live)' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/** CountUp: animates integer or decimal figure once on entering viewport */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 950,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value.toFixed(decimals));
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value.toFixed(decimals));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = value * eased;
              setDisplay(current.toFixed(decimals));
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(value.toFixed(decimals));
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** PageHead: signature Thres inner page header with exact staggered appear entrance */
export function PageHead({
  label,
  line1,
  line2,
  lead,
  rightSlot,
}: {
  label: string;
  line1: string;
  line2: string;
  lead: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <section className="mt-container pt-[108px] md:pt-[124px] pb-10 md:pb-12">
      <div className="flex flex-col gap-5">
        <HeroAppear step={0}>
          <span className="type-small text-[#A1A1AA]">{label}</span>
        </HeroAppear>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <HeroAppear step={1} keepVisibleOpacity className="max-w-[760px]">
            <TwoToneHeading as="h1" line1={line1} line2={line2} />
          </HeroAppear>
          <HeroAppear step={2} className="flex flex-col items-start gap-5 max-w-[460px]">
            <p className="type-lead text-[#A1A1AA]">{lead}</p>
            {rightSlot}
          </HeroAppear>
        </div>
      </div>
    </section>
  );
}

/** SectionHeader: standard section header with Threshold scroll-triggered entrance */
export function SectionHeader({
  label,
  line1,
  line2,
  lead,
  night = false,
  action,
}: {
  label: string;
  line1: string;
  line2: string;
  lead?: string;
  night?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-10">
      <div className="flex flex-col gap-3 max-w-[740px]">
        <span className="type-small text-[#A1A1AA]">{label}</span>
        <TwoToneHeading as="h2" line1={line1} line2={line2} night={night} />
      </div>
      {(lead || action) && (
        <div className="flex flex-col items-start gap-4 max-w-[440px]">
          {lead && <p className="type-lead text-[#A1A1AA]">{lead}</p>}
          {action}
        </div>
      )}
    </ScrollReveal>
  );
}
