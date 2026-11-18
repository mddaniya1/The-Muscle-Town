import React from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import {
  CoachDesk,
  MemberHighlight,
  MembershipPlan,
} from '../../cms/types';
import { Link } from '../../router';
import { ScrollReveal } from '../MotionPrimitives';
import {
  SectionHeader,
  ThresButton,
  ZonePhoto,
} from '../Primitives';

export function CoachesSection({
  coaches,
  getAccentColor,
}: {
  coaches: CoachDesk[];
  getAccentColor: (zone?: number) => string;
}) {
  return (
    <section className="mt-container mt-section-gap">
      <SectionHeader
        label="Coaching desks"
        line1="Guided by specialists,"
        line2="on the floor daily."
        lead="Explore our four coaching desks across strength, cardio, body transformation, and functional training. Individual trainer rosters are confirmed in-club."
      />

      {/* Exact 4-column 380px tall Coach Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-3">
        {coaches.map((coach, idx) => (
          <ScrollReveal key={coach.id} index={idx}>
            <Link
              to={`/coaches/${coach.slug}`}
              className="group relative h-[320px] sm:h-[360px] xl:h-[380px] rounded-[28px] md:rounded-[30px] overflow-hidden bg-[#161618] border border-[rgba(255,255,255,0.08)] flex flex-col justify-between p-4 sm:p-5 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
            >
              <div className="absolute inset-0">
                <ZonePhoto
                  src={coach.image}
                  alt={coach.deskName}
                  className="w-full h-full"
                  accentColor={getAccentColor(coach.homeZone)}
                  objectPosition="center top"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/25 pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="type-small text-white bg-black/55 backdrop-blur-sm px-3 py-1 rounded-full border border-[rgba(255,255,255,0.12)]">
                  {coach.homeZoneName} focus
                </span>
                <span className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center group-hover:bg-[#E11D2E] group-hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-1.5">
                <h3 className="type-subtitle text-white">{coach.deskName}</h3>
                <p className="type-small text-white/85">{coach.roleTitle}</p>
                <p className="type-small text-[#A1A1AA] line-clamp-2 mt-1">
                  {coach.shortBio}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function MemberStoriesSection({
  stories,
}: {
  stories: MemberHighlight[];
}) {
  return (
    <section className="mt-container mt-section-gap">
      <SectionHeader
        label="Verified club facts & reviews"
        line1="Proof you"
        line2="can verify."
        lead="Every highlight below reflects verified public details—our Google review rating, operating hours, and multi-floor facilities in North Nazimabad."
      />

      {/* Exact 2x2 Member Story Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
        {stories.map((story, idx) => (
          <ScrollReveal key={story.id} index={idx} className="h-full">
            <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 sm:p-8 flex flex-col justify-between gap-8 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5">
              {/* Top Metric Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="type-small text-[#A1A1AA]">
                  {story.metricLabel}
                </span>

                <div className="flex items-center gap-3 tabular-nums">
                  <span className="type-subtitle text-[#A1A1AA]">
                    {story.beforeValue}
                  </span>
                  <span
                    className="w-[42px] h-[42px] md:w-[46px] md:h-[46px] rounded-full bg-[rgba(225,29,46,0.14)] flex items-center justify-center text-[#E11D2E]"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="type-subtitle text-white">
                    {story.afterValue}
                  </span>
                  <span className="type-small text-[#A1A1AA]">{story.unit}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="type-quote text-white">{story.quote}</p>

              {/* Footer attribution */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex flex-col">
                  <span className="type-label text-white">
                    {story.attribution}
                  </span>
                  <span className="type-small text-[#A1A1AA]">
                    {story.subLabel}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function MembershipSection({
  plans,
  accentColor,
}: {
  plans: MembershipPlan[];
  accentColor: string;
}) {
  return (
    <section id="membership" className="mt-container mt-section-gap">
      <SectionHeader
        label="Membership"
        line1="Three ways in."
        line2="Clear PKR packages."
        lead="Choose open-floor access, a structured transformation package, or 1-on-1 personal training. All current promotional rates are confirmed at reception."
      />

      {/* Exact 3-column 612px tall Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 md:gap-3">
        {plans.map((plan, idx) => (
          <ScrollReveal key={plan.id} index={idx} className="h-full">
            <div
              className={`h-full rounded-[28px] md:rounded-[30px] p-7 sm:p-8 flex flex-col justify-between gap-8 lg:min-h-[612px] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 ${
                plan.isDark
                  ? 'bg-[#0B0B0C] border-2 border-[#E11D2E] text-white'
                  : 'bg-[#161618] border border-[rgba(255,255,255,0.08)] text-white'
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Top row: Plan title + optional Featured pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="type-subtitle text-white">
                      {plan.name}
                    </h3>
                    <p className="type-body text-[#A1A1AA]">
                      {plan.description}
                    </p>
                  </div>

                  {plan.badge && (
                    <span
                      className="rounded-full px-3.5 py-1.5 type-small font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: accentColor }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Price block */}
                <div className="flex flex-wrap items-baseline gap-2.5 pt-2">
                  <span className="type-heading tabular-nums text-white">
                    {plan.priceText}
                  </span>
                  <span className="type-small text-[#A1A1AA]">
                    {plan.periodText}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3.5 pt-6 border-t border-[rgba(255,255,255,0.08)]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#E11D2E]/15 text-[#E11D2E]"
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="type-body text-white/90">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <ThresButton
                  variant={plan.isDark ? 'zone' : 'outline'}
                  to="/#book"
                  accentColor={accentColor}
                  className="w-full"
                >
                  {plan.ctaLabel}
                </ThresButton>
                {plan.disclaimer && (
                  <p className="type-small text-center text-[#A1A1AA]">
                    {plan.disclaimer}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
