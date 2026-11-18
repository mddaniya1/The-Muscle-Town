import React from 'react';
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { Link } from '../router';
import { ScrollReveal, WordmarkReveal } from './MotionPrimitives';
import { BrandMark } from './Primitives';

/**
 * Pixel-faithful recreation of the Threshold (thres) footer:
 * - Outer wrapper: max-width 1560px, padding 10px (mobile) / 18px (tablet/desktop)
 * - White rounded Footer card: #FFFFFF, border-radius 28px / 36px,
 *   padding 30px 22px 24px (mobile) / 40px 34px 30px (tablet) / 48px 48px 36px (desktop),
 *   vertical gap 40px / 52px / 64px
 * - Top: flex-col gap 40px (<1200px), flex-row justify-between (>=1200px)
 *   - Brand column: width 340px (desktop), max-w 380px (tablet/mobile), gap 18px
 *   - Links: 2-col grid gap-y 34px gap-x 24px (mobile), flex gap 64px (tablet), flex gap 60px (desktop)
 * - Full-width giant Wordmark SVG between Top and Bottom (y: 36 -> 0 scroll reveal)
 * - Bottom bar: 1px top border rgba(13,13,14,0.09), padding-top 20px, flex-col gap 8px (mobile) / flex-row justify-between (tablet/desktop)
 */
export function Footer() {
  const { cms } = useCms();

  const waHref = `https://wa.me/${cms.site.whatsappNumber}?text=${encodeURIComponent(
    'Hello The Muscle Town, I would like to inquire about memberships and visiting the club.'
  )}`;

  const hasVerifiedInstagram =
    Boolean(cms.site.instagramUrl) &&
    cms.site.instagramUrl !== 'https://www.instagram.com/';
  const hasVerifiedFacebook =
    Boolean(cms.site.facebookUrl) &&
    cms.site.facebookUrl !== 'https://www.facebook.com/';

  const linkClass =
    'type-body text-white hover:text-[#E11D2E] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] whitespace-nowrap';
  const iconLinkClass =
    'group/flink type-body text-white hover:text-[#E11D2E] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] inline-flex items-center gap-2 whitespace-nowrap';

  return (
    <footer className="w-full max-w-[1560px] mx-auto p-[10px] min-[810px]:p-[18px] mt-10 md:mt-14">
      <ScrollReveal yOffset={18}>
        <div className="w-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] min-[810px]:rounded-[36px] px-[22px] pt-[30px] pb-[24px] min-[810px]:px-[34px] min-[810px]:pt-[40px] min-[810px]:pb-[30px] min-[1200px]:px-[48px] min-[1200px]:pt-[48px] min-[1200px]:pb-[36px] flex flex-col items-start gap-[40px] min-[810px]:gap-[52px] min-[1200px]:gap-[64px] overflow-hidden">
          {/* Top Row: Brand Block (left) + 4-Column Links (right) */}
          <div className="w-full flex flex-col min-[1200px]:flex-row items-start justify-start min-[1200px]:justify-between gap-[40px]">
            {/* Brand Column (340px desktop, max-w 380px tablet/mobile, gap 18px) */}
            <div className="flex flex-col items-start gap-[18px] w-full max-w-[380px] min-[1200px]:w-[340px] shrink-0">
              <Link
                to="/"
                className="inline-flex items-center gap-[12px] text-white transition-opacity duration-200 hover:opacity-85"
              >
                <BrandMark size="md" />
                <h5 className="type-card-title text-white uppercase tracking-[-0.02em]">
                  {cms.site.brandName}
                </h5>
              </Link>

              <p className="type-body text-[#A1A1AA]">{cms.site.tagline}</p>

              {/* Verified Contact Information */}
              <div className="flex flex-col gap-1.5 type-small text-[#A1A1AA]">
                <p className="text-[#A1A1AA]">
                  Plot C-24, Block I, Near 5 Star Chowrangi, North Nazimabad, Karachi.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
                  <a
                    href={cms.site.phoneHref}
                    className="hover:text-[#E11D2E] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E11D2E]" aria-hidden="true" />
                    <span>{cms.site.phoneDisplay}</span>
                  </a>
                  <span className="text-[#A1A1AA]" aria-hidden="true">
                    ·
                  </span>
                  <a
                    href={`mailto:${cms.site.email}`}
                    className="hover:text-[#E11D2E] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#E11D2E]" aria-hidden="true" />
                    <span>{cms.site.email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 4-Column Links Group */}
            <div className="w-full min-[810px]:w-min grid grid-cols-2 gap-x-[24px] gap-y-[34px] min-[810px]:flex min-[810px]:flex-row min-[810px]:items-start min-[810px]:gap-[64px] min-[1200px]:gap-[60px]">
              {/* Column 1: Train */}
              <div className="flex flex-col items-start gap-[12px]">
                <p className="type-small text-[#A1A1AA]">Train</p>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
                <Link to="/#about" className={linkClass}>
                  About
                </Link>
                <Link to="/timetable" className={linkClass}>
                  Timetable
                </Link>
                <Link to="/classes" className={linkClass}>
                  Training Programs
                </Link>
              </div>

              {/* Column 2: Club */}
              <div className="flex flex-col items-start gap-[12px]">
                <p className="type-small text-[#A1A1AA]">Club</p>
                <Link to="/coaches" className={linkClass}>
                  Coaches
                </Link>
                <Link to="/membership" className={linkClass}>
                  Membership
                </Link>
                <Link to="/journal" className={linkClass}>
                  Journal
                </Link>
                <Link to="/visit" className={linkClass}>
                  Contact
                </Link>
              </div>

              {/* Column 3: Follow / Connect */}
              <div className="flex flex-col items-start gap-[12px]">
                <p className="type-small text-[#A1A1AA]">Connect</p>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <MessageCircle
                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/flink:scale-110"
                    aria-hidden="true"
                  />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={cms.site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <MapPin
                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/flink:scale-110"
                    aria-hidden="true"
                  />
                  <span>Google Maps</span>
                </a>
                {hasVerifiedInstagram && (
                  <a
                    href={cms.site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClass}
                  >
                    <Instagram
                      className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/flink:scale-110"
                      aria-hidden="true"
                    />
                    <span>Instagram</span>
                  </a>
                )}
                {hasVerifiedFacebook && (
                  <a
                    href={cms.site.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconLinkClass}
                  >
                    <Facebook
                      className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/flink:scale-110"
                      aria-hidden="true"
                    />
                    <span>Facebook</span>
                  </a>
                )}
                {!hasVerifiedInstagram && !hasVerifiedFacebook && (
                  <Link to="/studio" className={linkClass}>
                    The Studio
                  </Link>
                )}
              </div>

              {/* Column 4: Small print */}
              <div className="flex flex-col items-start gap-[12px]">
                <p className="type-small text-[#A1A1AA]">Small print</p>
                <Link to="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
                <Link to="/terms" className={linkClass}>
                  Terms &amp; Conditions
                </Link>
                <Link to="/style-guide" className={linkClass}>
                  CMS &amp; Style guide
                </Link>
              </div>
            </div>
          </div>

          {/* Full-Width Giant Wordmark matching Threshold's framer-1p11nsq (y: 36 -> 0 scroll reveal) */}
          <WordmarkReveal className="w-full select-none">
            <svg
              viewBox="0 0 1120 132"
              className="w-full h-auto block overflow-visible"
              role="presentation"
              aria-hidden="true"
            >
              <text
                x="0"
                y="112"
                fill="#FFFFFF"
                style={{
                  fontFamily: '"Switzer", sans-serif',
                  fontWeight: 500,
                  fontSize: '124px',
                  letterSpacing: '-0.055em',
                }}
                textLength="1120"
                lengthAdjust="spacingAndGlyphs"
              >
                THE MUSCLE TOWN
              </text>
            </svg>
          </WordmarkReveal>

          {/* Bottom Divider + Copyright Bar (framer-1octylx) */}
          <div className="w-full border-t border-[rgba(255,255,255,0.08)] pt-[20px] flex flex-col min-[810px]:flex-row items-start min-[810px]:items-center justify-start min-[810px]:justify-between gap-[8px]">
            <p className="type-small text-[#A1A1AA]">
              © 2026 The Muscle Town. All rights reserved.
            </p>
            <p className="type-small text-[#A1A1AA]">
              Plot C-24, Block I · North Nazimabad, Karachi · Mon–Sat 7:00 AM – 12:00 AM
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
