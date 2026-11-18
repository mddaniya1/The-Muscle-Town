import React from 'react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { ClosingCta } from '../components/ClosingCta';
import { HeroAppear, ScrollReveal } from '../components/MotionPrimitives';
import {
  PageHead,
  SectionHeader,
  ThresButton,
  ZonePhoto,
} from '../components/Primitives';
import { Link } from '../router';

export function CoachesPage() {
  const { cms, getAccentColor } = useCms();

  return (
    <main>
      <PageHead
        label="Coaches & Specialists"
        line1="Coached by people,"
        line2="not guesswork."
        lead="Our coaching desks cover strength, cardio, body transformation, and functional training. Specific trainer names and schedules are confirmed directly at the North Nazimabad reception desk."
      />

      {/* 4 Coaching Desk Cards */}
      <section className="mt-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {cms.coaches.map((coach, idx) => (
            <ScrollReveal key={coach.id} index={idx}>
              <Link
                to={`/coaches/${coach.slug}`}
                className="group relative h-[360px] xl:h-[400px] rounded-[30px] overflow-hidden bg-[#161618] border border-[rgba(255,255,255,0.08)] flex flex-col justify-between p-5 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
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
                  <span className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center group-hover:bg-[#E11D2E] group-hover:text-white transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative z-10 flex flex-col gap-1.5">
                  <h2 className="type-subtitle text-white">{coach.deskName}</h2>
                  <p className="type-small text-white/85">{coach.roleTitle}</p>
                  <p className="type-small text-[#A1A1AA] mt-1">{coach.shortBio}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Three rules we do not bend (matching Thres /coaches section) */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="How we coach"
          line1="Three principles"
          line2="on the floor."
          lead="Built to keep beginners welcome and experienced lifters progressing safely."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              num: '01',
              title: 'Technique before ego',
              body: 'Every new member learns safe movement patterns on free weights, machines, and turf equipment before pushing heavier working sets.',
            },
            {
              num: '02',
              title: 'Structured consistency',
              body: 'Sustainable weight loss and muscle building come from realistic weekly habits across Monday to Saturday, not random exhaustion.',
            },
            {
              num: '03',
              title: 'Verified in person',
              body: 'Meet our floor trainers directly at Plot C-24 to align your 1-on-1 personal training schedule, timings, and specific transformation goals.',
            },
          ].map((rule, idx) => (
            <ScrollReveal key={rule.num} index={idx} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col justify-between gap-8">
                <span className="type-small tabular-nums text-[#A1A1AA]">
                  {rule.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="type-subtitle text-white">{rule.title}</h3>
                  <p className="type-body text-[#A1A1AA]">{rule.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}

export function CoachDetailPage({ slug }: { slug: string }) {
  const { cms, getAccentColor } = useCms();
  const coach = cms.coaches.find((c) => c.slug === slug);

  if (!coach) {
    return (
      <main className="mt-container pt-[130px] pb-20">
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[30px] p-8 md:p-12 max-w-[680px]">
          <span className="type-small text-[#A1A1AA]">Coaching desk not found</span>
          <h1 className="type-title text-white mt-2">
            We could not find that coaching profile.
          </h1>
          <div className="mt-6">
            <ThresButton variant="primary" to="/coaches">
              Back to coaches
            </ThresButton>
          </div>
        </div>
      </main>
    );
  }

  const sessions = cms.timetable.filter(
    (s) => s.coachingDesk === coach.deskName
  );
  const others = cms.coaches.filter((c) => c.slug !== coach.slug);

  return (
    <main>
      <section className="mt-container pt-[104px] md:pt-[120px] pb-8">
        <Link
          to="/coaches"
          className="inline-flex items-center gap-2 type-small text-[#A1A1AA] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>All coaching desks</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <HeroAppear step={0}>
              <span className="type-small text-[#A1A1AA]">
                {coach.homeZoneName} focus · {coach.roleTitle}
              </span>
            </HeroAppear>
            <HeroAppear step={1} keepVisibleOpacity>
              <h1 className="type-display text-white">{coach.deskName}</h1>
            </HeroAppear>
            <HeroAppear step={2}>
              <p className="type-lead text-[#A1A1AA] max-w-[540px]">
                {coach.shortBio}
              </p>
            </HeroAppear>
            <HeroAppear step={3} className="flex flex-wrap items-center gap-3 pt-2">
              <ThresButton variant="primary" to="/#book">
                Book a 1-on-1 consultation
              </ThresButton>
              <ThresButton variant="outline" to="/visit">
                Visit North Nazimabad
              </ThresButton>
            </HeroAppear>
          </div>

          <HeroAppear step={3} className="lg:col-span-5 group h-[320px] sm:h-[400px] rounded-[28px] overflow-hidden">
            <ZonePhoto
              src={coach.image}
              alt={coach.deskName}
              className="w-full h-full rounded-[28px]"
              accentColor={getAccentColor(coach.homeZone)}
              objectPosition="center top"
            />
          </HeroAppear>
        </div>
      </section>

      <section className="mt-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-9 flex flex-col gap-6">
              <div>
                <h2 className="type-subtitle text-white">Overview</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {coach.fullBio.map((p, i) => (
                    <p key={i} className="type-body text-[#A1A1AA]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.08)]" />

              <div>
                <h2 className="type-subtitle text-white">Ask on the floor about</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {coach.askAbout.map((q) => (
                    <li key={q} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#E11D2E]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#E11D2E]" aria-hidden="true" />
                      </span>
                      <span className="type-body text-[#A1A1AA]">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {sessions.length > 0 && (
              <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-9">
                <h2 className="type-subtitle text-white mb-4">
                  Sample weekly floor slots
                </h2>
                <div className="divide-y divide-[rgba(255,255,255,0.08)]">
                  {sessions.map((s) => (
                    <div
                      key={s.id}
                      className="py-3.5 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-4">
                        <span className="type-label text-white w-24">
                          {s.dayName}
                        </span>
                        <span className="type-body tabular-nums text-[#A1A1AA]">
                          {s.time}
                        </span>
                      </div>
                      <Link
                        to={`/classes/${s.programSlug}`}
                        className="type-label text-white hover:text-[#E11D2E] transition-colors"
                      >
                        {s.programTitle}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col gap-4 sticky top-24">
              <div className="flex flex-col gap-1">
                <span className="type-small text-[#A1A1AA]">Verification</span>
                <span className="type-body text-white">
                  {coach.experienceLabel}
                </span>
              </div>
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <div className="flex flex-col gap-1">
                <span className="type-small text-[#A1A1AA]">Availability</span>
                <span className="type-body text-white">
                  {coach.availabilityNote}
                </span>
              </div>
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <div className="flex flex-col gap-2">
                <span className="type-small text-[#A1A1AA]">Focus areas</span>
                <ul className="flex flex-col gap-1.5 type-body text-white">
                  {coach.focusAreas.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other coaching desks */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="The team"
          line1="Other coaching"
          line2="desks."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {others.map((other, idx) => (
            <ScrollReveal key={other.id} index={idx} className="h-full">
              <Link
                to={`/coaches/${other.slug}`}
                className="group h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[28px] p-6 flex items-center justify-between gap-4 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5"
              >
                <div>
                  <span className="type-small text-[#A1A1AA]">
                    {other.homeZoneName} focus
                  </span>
                  <h3 className="type-card-title text-white mt-1">
                    {other.deskName}
                  </h3>
                  <p className="type-small text-[#A1A1AA] mt-0.5">
                    {other.roleTitle}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#A1A1AA] group-hover:text-[#E11D2E] shrink-0 transition-all duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" aria-hidden="true" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
