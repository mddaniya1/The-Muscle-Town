import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCms } from '../cms/CmsContext';
import { Link, useRouter } from '../router';
import { BrandMark } from './Primitives';

import { THRES_SPRING } from './MotionPrimitives';

const NAV_LINKS = [
  { label: 'Timetable', to: '/timetable' },
  { label: 'Classes', to: '/classes' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Membership', to: '/membership' },
  { label: 'Journal', to: '/journal' },
];

export function Navbar() {
  const { cms } = useCms();
  const { path } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0.001, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={THRES_SPRING}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="mt-container pt-3 md:pt-4">
          <div className="flex items-center justify-between gap-3">
            {/* Pill 1: Brand wordmark pill with official logo (56px height, charcoal grey #161618, rounded-full) */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="pointer-events-auto inline-flex items-center gap-2.5 h-[52px] md:h-[56px] pl-[8px] md:pl-[9px] pr-[20px] bg-[#161618]/95 backdrop-blur-md rounded-full border border-[rgba(255,255,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.45)] hover:border-[#E11D2E]/50 transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <BrandMark size="sm" />
              <span className="type-label text-white tracking-[-0.02em]">
                {cms.site.brandName}
              </span>
            </Link>

            {/* Pill 2: Center navigation links pill (Desktop >= 1200px) */}
            <nav
              aria-label="Primary navigation"
              className="pointer-events-auto hidden xl:flex items-center gap-1 h-[56px] px-2 bg-[#161618]/95 backdrop-blur-md rounded-full border border-[rgba(255,255,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
            >
              {NAV_LINKS.map((item) => {
                const isActive =
                  path === item.to || path.startsWith(item.to + '/');
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-4 py-2 rounded-full type-label transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#E11D2E] text-white'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Pill 3: Right CTA pill (Desktop >= 1200px) & Menu button (Tablet/Mobile < 1200px) */}
            <div className="pointer-events-auto flex items-center gap-2 shrink-0">
              <Link
                to="/#book"
                className="hidden sm:inline-flex items-center gap-3 h-[52px] md:h-[56px] pl-[22px] pr-[7px] bg-[#161618]/95 backdrop-blur-md hover:bg-[#8B0000] text-white border border-[rgba(255,255,255,0.12)] hover:border-[#E11D2E] rounded-full transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.45)] whitespace-nowrap shrink-0 group"
              >
                <span className="type-label text-white transition-transform duration-200 group-hover:translate-x-[1px]">
                  Book a Visit
                </span>
                <span
                  className="w-[40px] h-[40px] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105 bg-[#E11D2E] text-white"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                </span>
              </Link>

              <button
                type="button"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
                className="xl:hidden inline-flex items-center justify-center gap-2 h-[52px] md:h-[56px] px-4 bg-[#161618]/95 backdrop-blur-md rounded-full border border-[rgba(255,255,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.45)] text-white hover:border-[#E11D2E]/50 transition-colors duration-200 cursor-pointer"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
                <span className="type-label hidden md:inline">
                  {mobileOpen ? 'Close' : 'Menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile / Tablet Slide-down Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[76px] z-40 px-3 md:px-[18px] xl:hidden"
          >
            <div className="bg-[#161618] rounded-[28px] p-5 border border-[rgba(255,255,255,0.1)] shadow-2xl max-w-[1524px] mx-auto">
              <nav className="flex flex-col divide-y divide-[rgba(255,255,255,0.08)]">
                {NAV_LINKS.map((item) => {
                  const isActive =
                    path === item.to || path.startsWith(item.to + '/');
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3.5 type-card-title ${
                        isActive ? 'text-[#E11D2E]' : 'text-white hover:text-[#E11D2E]'
                      } transition-colors`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                    </Link>
                  );
                })}
                <Link
                  to="/studio"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 type-card-title text-white hover:text-[#E11D2E] transition-colors"
                >
                  <span>The Studio</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                </Link>
                <Link
                  to="/visit"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 type-card-title text-white hover:text-[#E11D2E] transition-colors"
                >
                  <span>Visit &amp; Contact</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
                </Link>
              </nav>

              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="type-small text-[#A1A1AA]">
                  {cms.site.weekdayHours} · {cms.site.phoneDisplay}
                </div>
                <Link
                  to="/#book"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E11D2E] hover:bg-[#8B0000] text-white px-5 py-3 type-label transition-colors"
                >
                  <span>Book a Visit</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
