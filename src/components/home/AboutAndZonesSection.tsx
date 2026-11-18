import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DayItem, SiteSettings, TrainingZone } from '../../cms/types';
import { Link } from '../../router';
import { ScrollReveal, THRES_EASE } from '../MotionPrimitives';
import {
  CountUp,
  SectionHeader,
  ThresButton,
  ZonePhoto,
} from '../Primitives';

export function AboutSection({
  site,
  activeDay,
  accentColor,
}: {
  site: SiteSettings;
  activeDay: DayItem;
  accentColor: string;
}) {
  return (
    <section id="about" className="mt-container mt-section-gap">
      <SectionHeader
        label="About the studio"
        line1="Built for serious training,"
        line2="open six days a week."
      />

      {/* Exact Thres 4-col x 2-row 236px Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[236px_236px] gap-2 md:gap-3">
        {/* Card 1: 2x2 Story Card */}
        <ScrollReveal index={0} className="md:col-span-2 lg:row-span-2 h-full">
          <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 lg:p-[36px] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <span className="type-small text-[#A1A1AA]">North Nazimabad · Plot C-24</span>
              <p className="type-title text-white max-w-[540px]">
                Two dedicated training floors near 5 Star Chowrangi, equipped for
                cardio, free weights, group workouts, and recovery.
              </p>
              <p className="type-body text-[#A1A1AA] max-w-[520px]">
                Whether you train early at 7:00 AM or finish your workout near
                midnight, The Muscle Town pairs modern strength equipment, a
                dedicated group workout studio, and post-session sauna access in a
                clean, focused training environment.
              </p>
            </div>
            <div>
              <ThresButton variant="outline" to="/studio" withArrow>
                Explore the studio
              </ThresButton>
            </div>
          </div>
        </ScrollReveal>

        {/* Card 2: Stat 1 — Verified Google Rating */}
        <ScrollReveal index={1} className="h-full">
          <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 lg:p-[24px] flex flex-col justify-between min-h-[196px] lg:min-h-0">
            <div className="flex items-baseline gap-1.5">
              <span className="type-heading text-white">
                <CountUp value={parseFloat(site.googleRating) || 4.6} decimals={1} />
              </span>
              <span className="type-subtitle text-[#A1A1AA]">/ 5</span>
            </div>
            <p className="type-body text-[#A1A1AA]">
              Google rating across {site.googleReviewCount} verified club reviews in Karachi
            </p>
          </div>
        </ScrollReveal>

        {/* Card 3: Stat 2 — Daily Hours */}
        <ScrollReveal index={2} className="h-full">
          <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 lg:p-[24px] flex flex-col justify-between min-h-[196px] lg:min-h-0">
            <div className="flex items-baseline gap-1.5">
              <span className="type-heading text-white">
                <CountUp value={17} />
              </span>
              <span className="type-subtitle text-[#A1A1AA]">hrs</span>
            </div>
            <p className="type-body text-[#A1A1AA]">
              Open Monday to Saturday from 7:00 AM until 12:00 AM
            </p>
          </div>
        </ScrollReveal>

        {/* Card 4: Live Accent Card (2 cols x 1 row) */}
        <ScrollReveal index={3} className="md:col-span-2 h-full">
          <Link
            to="/timetable"
            className="h-full rounded-[28px] md:rounded-[30px] p-6 lg:p-[26px] flex flex-col justify-between min-h-[196px] lg:min-h-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.99] group text-white"
            style={{ backgroundColor: accentColor }}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="type-small text-white/85 font-medium">
                Selected day focus
              </span>
              <span className="w-9 h-9 rounded-full bg-black/25 text-white flex items-center justify-center group-hover:bg-[#0B0B0C] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <p key={activeDay.id} className="tzm-win type-subtitle text-white">
                {activeDay.dayFull}: {activeDay.focusTitle}
              </p>
              <span className="type-small text-white/85 whitespace-nowrap">
                {activeDay.hours}
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function TrainingZonesSection({
  zones,
  accentColor,
}: {
  zones: TrainingZone[];
  accentColor: string;
}) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[1]?.id || zones[0].id);
  const current = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const reduced = useReducedMotion();

  return (
    <section id="zones" className="mt-container mt-section-gap">
      <ScrollReveal>
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] text-white rounded-[28px] md:rounded-[36px] p-6 sm:p-8 lg:p-12">
          <SectionHeader
            label="Training zones"
            line1="Five dedicated zones,"
            line2="built for every goal."
            lead="Select a zone to inspect floor location, equipment highlights, and training focus across our 3rd and 4th floors."
            night
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left: Active Zone Showcase Card + Photo */}
            <div className="lg:col-span-6 flex flex-col gap-5 justify-between bg-[#0B0B0C] border border-[rgba(255,255,255,0.1)] rounded-[24px] p-5 sm:p-7 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={reduced ? undefined : { opacity: 0.001, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0.001, y: -6 }}
                  transition={{ duration: 0.26, ease: THRES_EASE }}
                  className="flex flex-col gap-5 justify-between h-full"
                >
                  <div className="group relative h-[240px] sm:h-[300px] rounded-[20px] overflow-hidden">
                    <ZonePhoto
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full rounded-[20px]"
                      accentColor={accentColor}
                      drift={false}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="type-small text-white">
                        {current.floorLocation}
                      </span>
                      <span
                        className="type-small px-3 py-1 rounded-full text-white font-medium transition-colors duration-300"
                        style={{ backgroundColor: accentColor }}
                      >
                        Zone 0{current.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="type-subtitle text-white">{current.name}</h3>
                    <p className="type-body text-[#A1A1AA]">{current.description}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2 border-t border-[rgba(255,255,255,0.1)] type-small text-[#A1A1AA]">
                      {current.equipmentHighlights.map((item, i) => (
                        <React.Fragment key={item}>
                          <span>{item}</span>
                          {i < current.equipmentHighlights.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Interactive 5-Zone Selector List */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-2.5">
              {zones.map((zone) => {
                const isSelected = zone.id === current.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`w-full text-left rounded-[22px] p-5 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] border cursor-pointer flex items-start justify-between gap-4 active:scale-[0.99] ${
                      isSelected
                        ? 'bg-[#E11D2E] text-white border-[#E11D2E]'
                        : 'bg-[#0B0B0C] text-white border-[rgba(255,255,255,0.1)] hover:border-[#E11D2E]/50 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`type-label tabular-nums pt-0.5 transition-colors duration-300 ${
                          isSelected ? 'text-white' : 'text-[#A1A1AA]'
                        }`}
                      >
                        0{zone.number}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="type-card-title transition-colors duration-300 text-white">
                          {zone.name}
                        </span>
                        <span
                          className={`type-small transition-colors duration-300 ${
                            isSelected ? 'text-white/85' : 'text-[#A1A1AA]'
                          }`}
                        >
                          {zone.tagline}
                        </span>
                      </div>
                    </div>
                    <span
                      className="w-3 h-3 rounded-full shrink-0 mt-1.5 transition-all duration-300"
                      style={{
                        backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      }}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
