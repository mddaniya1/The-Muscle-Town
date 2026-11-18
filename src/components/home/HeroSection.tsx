import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DayItem } from '../../cms/types';
import { Link } from '../../router';
import { HeroAppear, THRES_EASE } from '../MotionPrimitives';
import { ThresButton, TwoToneHeading, ZonePhoto } from '../Primitives';

export function HeroSection({
  days,
  selectedDayId,
  onSelectDay,
  accentColor,
}: {
  days: DayItem[];
  selectedDayId: string;
  onSelectDay: (id: string) => void;
  accentColor: string;
}) {
  const activeDay = days.find((d) => d.id === selectedDayId) || days[0];

  return (
    <section className="mt-container pt-[92px] md:pt-[108px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
        {/* Left Column: Staggered 4-step Threshold entrance (0s, 0.06s, 0.12s, 0.18s) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between gap-8 py-2 lg:py-4">
          <div className="flex flex-col items-start gap-6">
            {/* Step 0: ZoneLabel pill (tzm-win text swap on day change) */}
            <HeroAppear step={0}>
              <div className="inline-flex items-center gap-2.5 bg-[#161618] rounded-full px-3.5 py-2 border border-[rgba(255,255,255,0.1)]">
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: activeDay.isRestDay ? '#A1A1AA' : accentColor,
                  }}
                  aria-hidden="true"
                />
                <span key={activeDay.id} className="tzm-win inline-flex items-center gap-1.5">
                  <span className="type-small text-white font-medium">
                    {activeDay.dayFull}
                  </span>
                  <span className="type-small text-[#A1A1AA]">
                    {activeDay.isRestDay
                      ? '· Closed for weekly rest'
                      : `· ${activeDay.zoneName} · ${activeDay.hours}`}
                  </span>
                </span>
              </div>
            </HeroAppear>

            {/* Step 1: Display Headline (opacity stays 1 for instant LCP while rising 18px) */}
            <HeroAppear step={1} keepVisibleOpacity>
              <TwoToneHeading
                as="h1"
                line1="TRAIN STRONG."
                line2="LIVE STRONGER."
              />
            </HeroAppear>

            {/* Step 2: Supporting copy */}
            <HeroAppear step={2}>
              <p className="type-lead text-[#A1A1AA] max-w-[490px]">
                Take your fitness journey to the next level at The Muscle Town.
                Experience modern training facilities, expert coaching and a
                community built around strength and progress.
              </p>
            </HeroAppear>
          </div>

          {/* Step 3: Primary + Outline Buttons */}
          <HeroAppear step={3} className="flex flex-wrap items-center gap-3">
            <ThresButton variant="primary" to="/membership">
              Explore Membership
            </ThresButton>
            <ThresButton variant="outline" to="/#book">
              Join The Muscle Town
            </ThresButton>
          </HeroAppear>
        </div>

        {/* Right Column: Interactive 7-Day WeekStrip (Step 3 entrance) */}
        <HeroAppear step={3} className="lg:col-span-6 xl:col-span-7 flex flex-col">
          {/* Desktop & Tablet interactive expanding photo slats */}
          <div className="hidden md:flex items-stretch gap-2 h-[480px] xl:h-[540px] w-full">
            {days.map((day) => {
              const isOpen = day.id === activeDay.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => onSelectDay(day.id)}
                  aria-pressed={isOpen}
                  className={`group relative overflow-hidden rounded-[26px] text-left transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer focus-visible:ring-2 border ${
                    isOpen ? 'flex-[3.4] border-[rgba(255,255,255,0.14)]' : 'flex-[0.85] hover:flex-[1.05] border-[rgba(255,255,255,0.06)]'
                  } bg-[#161618]`}
                >
                  {!day.isRestDay ? (
                    <>
                      <img
                        src={day.image}
                        alt={`${day.dayFull} — ${day.focusTitle}`}
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] ${
                          isOpen
                            ? 'grayscale-0 scale-100 opacity-90'
                            : 'grayscale opacity-55 group-hover:opacity-80 scale-105'
                        }`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-[#1A1A1D] to-[#121214]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Top label inside slat */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`type-label transition-colors duration-200 ${
                          day.isRestDay ? 'text-[#A1A1AA]' : 'text-white'
                        }`}
                      >
                        {day.dayShort}
                      </span>
                      {isOpen && !day.isRestDay && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, ease: THRES_EASE }}
                          className="type-small px-2.5 py-0.5 rounded-full text-white font-medium whitespace-nowrap"
                          style={{ backgroundColor: accentColor }}
                        >
                          {day.zoneName}
                        </motion.span>
                      )}
                    </div>

                    {/* Expanded footer inside active slat */}
                    {isOpen ? (
                      <motion.div
                        key={`open-${day.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: THRES_EASE }}
                        className="flex flex-col gap-2"
                      >
                        <p className="type-subtitle text-white">
                          {day.focusTitle}
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`type-small ${
                              day.isRestDay ? 'text-[#A1A1AA]' : 'text-white/80'
                            }`}
                          >
                            {day.hours}
                          </span>
                          {!day.isRestDay && day.programSlug && (
                            <Link
                              to={`/classes/${day.programSlug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 type-small text-white hover:text-[#E11D2E] whitespace-nowrap transition-colors"
                            >
                              <span>View program</span>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center">
                        <span
                          className={`type-small whitespace-nowrap ${
                            day.isRestDay ? 'text-[#A1A1AA]' : 'text-white/75'
                          }`}
                        >
                          {day.isRestDay ? 'Rest' : day.zoneName}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile WeekStrip: Day Tabs over Active Card (< 810px) */}
          <div className="md:hidden flex flex-col gap-3">
            <div
              className="grid grid-cols-7 gap-1 bg-[#161618] p-1 rounded-2xl border border-[rgba(255,255,255,0.08)]"
              role="tablist"
              aria-label="Weekly schedule days"
            >
              {days.map((day) => {
                const isOpen = day.id === activeDay.id;
                return (
                  <button
                    key={day.id}
                    type="button"
                    role="tab"
                    aria-selected={isOpen}
                    onClick={() => onSelectDay(day.id)}
                    className={`py-2.5 rounded-xl type-small font-medium text-center transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? 'bg-[#E11D2E] text-white'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {day.dayShort}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay.id}
                initial={{ opacity: 0.7, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.7, y: -4 }}
                transition={{ duration: 0.24, ease: THRES_EASE }}
                className="group relative rounded-[26px] overflow-hidden h-[320px] bg-[#161618] border border-[rgba(255,255,255,0.08)]"
              >
                {!activeDay.isRestDay ? (
                  <ZonePhoto
                    src={activeDay.image}
                    alt={activeDay.focusTitle}
                    className="w-full h-full"
                    alwaysColor
                    drift={false}
                  />
                ) : (
                  <div className="w-full h-full bg-[#161618]" />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1.5">
                  <span className="type-small text-white/75">
                    {activeDay.dayFull} · {activeDay.hours}
                  </span>
                  <p className="type-subtitle text-white">{activeDay.focusTitle}</p>
                  {!activeDay.isRestDay && activeDay.programSlug && (
                    <Link
                      to={`/classes/${activeDay.programSlug}`}
                      className="inline-flex items-center gap-1 type-label text-white mt-1"
                    >
                      <span>Explore program</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </HeroAppear>
      </div>
    </section>
  );
}
