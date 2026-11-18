import React from 'react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { ClosingCta } from '../components/ClosingCta';
import { HeroAppear, ScrollReveal } from '../components/MotionPrimitives';
import {
  PageHead,
  SectionHeader,
  ThresButton,
  TwoToneHeading,
  ZonePhoto,
} from '../components/Primitives';
import { Link } from '../router';

export function ClassesPage() {
  const { cms, getAccentColor } = useCms();

  return (
    <main>
      <PageHead
        label="Programs"
        line1="Six programs,"
        line2="one complete club."
        lead="From heavy free-weight strength blocks to high-energy HIIT, personal training, and functional conditioning across both floors."
        rightSlot={
          <ThresButton variant="primary" to="/timetable">
            See weekly schedule
          </ThresButton>
        }
      />

      {/* 6 Class Cards Grid */}
      <section className="mt-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {cms.programs.map((program, idx) => (
            <ScrollReveal key={program.id} index={idx} className="h-full">
              <Link
                to={`/classes/${program.slug}`}
                className="group h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[30px] p-[10px] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
              >
                <ZonePhoto
                  src={program.image}
                  alt={program.title}
                  className="w-full h-[220px] md:h-[260px] rounded-[22px]"
                  accentColor={getAccentColor(program.zone)}
                />
                <div className="px-4 pt-5 pb-5 flex flex-col gap-2.5 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
                      <span>{program.zoneName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.duration}</span>
                    </div>
                    <h2 className="type-subtitle text-white">{program.title}</h2>
                    <p className="type-body text-[#A1A1AA]">
                      {program.shortDescription}
                    </p>
                  </div>
                  {program.note && (
                    <p className="type-small text-[#A1A1AA] pt-1">{program.note}</p>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Five zones, five jobs table matching Thres /classes bottom section */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="Training focus"
          line1="Five zones,"
          line2="clear roles."
          lead="Each zone across our 3rd and 4th floors supports a distinct part of your training week."
        />

        <ScrollReveal>
          <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 sm:p-8 divide-y divide-[rgba(255,255,255,0.08)]">
            {cms.zones.map((zone) => (
              <div
                key={zone.id}
                className="py-5 first:pt-1 last:pb-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                <div className="md:col-span-3 flex items-center gap-3">
                  <span className="type-small tabular-nums text-[#A1A1AA]">
                    0{zone.number}
                  </span>
                  <span className="type-card-title text-white">
                    {zone.name}
                  </span>
                </div>
                <div className="md:col-span-6">
                  <p className="type-body text-[#A1A1AA]">{zone.description}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="type-small text-[#A1A1AA]">
                    {zone.floorLocation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <ClosingCta />
    </main>
  );
}

export function ProgramDetailPage({ slug }: { slug: string }) {
  const { cms, getAccentColor } = useCms();
  const program = cms.programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <main className="mt-container pt-[130px] pb-20">
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[30px] p-8 md:p-12 max-w-[680px]">
          <span className="type-small text-[#A1A1AA]">Program not found</span>
          <h1 className="type-title text-white mt-2">
            This training program could not be found.
          </h1>
          <div className="mt-6">
            <ThresButton variant="primary" to="/classes">
              Back to all programs
            </ThresButton>
          </div>
        </div>
      </main>
    );
  }

  const sessions = cms.timetable.filter((s) => s.programSlug === program.slug);
  const others = cms.programs.filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <main>
      <section className="mt-container pt-[104px] md:pt-[120px] pb-8">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 type-small text-[#A1A1AA] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>All programs</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <HeroAppear step={0}>
              <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
                <span>{program.zoneName}</span>
                <span aria-hidden="true">·</span>
                <span>{program.category}</span>
                <span aria-hidden="true">·</span>
                <span>{program.duration}</span>
              </div>
            </HeroAppear>
            <HeroAppear step={1} keepVisibleOpacity>
              <h1 className="type-display text-white">{program.title}</h1>
            </HeroAppear>
            <HeroAppear step={2}>
              <p className="type-lead text-[#A1A1AA] max-w-[560px]">
                {program.shortDescription}
              </p>
            </HeroAppear>
            <HeroAppear step={3} className="flex flex-wrap items-center gap-3 pt-2">
              <ThresButton variant="primary" to="/#book">
                Book a visit for this program
              </ThresButton>
              <ThresButton variant="outline" to="/timetable">
                See weekly schedule
              </ThresButton>
            </HeroAppear>
          </div>

          <HeroAppear step={3} className="lg:col-span-5 group h-[260px] sm:h-[340px] rounded-[28px] overflow-hidden">
            <ZonePhoto
              src={program.image}
              alt={program.title}
              className="w-full h-full rounded-[28px]"
              accentColor={getAccentColor(program.zone)}
            />
          </HeroAppear>
        </div>
      </section>

      {/* Body + Sidebar */}
      <section className="mt-container mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left main column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-9 flex flex-col gap-6">
              <div>
                <h2 className="type-subtitle text-white">What happens</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {program.fullDescription.map((para, i) => (
                    <p key={i} className="type-body text-[#A1A1AA]">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.08)]" />

              <div>
                <h2 className="type-subtitle text-white">Who it is for</h2>
                <p className="type-body text-[#A1A1AA] mt-2">
                  {program.whoItIsFor}
                </p>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.08)]" />

              <div>
                <h2 className="type-subtitle text-white">What you will notice</h2>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {program.whatYouNotice.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#E11D2E]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#E11D2E]" aria-hidden="true" />
                      </span>
                      <span className="type-body text-[#A1A1AA]">{item}</span>
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
                      <span className="type-small text-[#A1A1AA]">
                        {s.floor} · {s.coachingDesk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right details sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col gap-4 sticky top-24">
              {[
                { k: 'Length', v: program.duration },
                { k: 'Focus', v: `${program.zoneName} · ${program.category}` },
                { k: 'Level', v: program.level },
                { k: 'Good for', v: program.goodFor },
                { k: 'Bring', v: program.bring },
                { k: 'Guidance', v: program.coachingDesk },
              ].map((row, idx, arr) => (
                <React.Fragment key={row.k}>
                  <div className="flex flex-col gap-1">
                    <span className="type-small text-[#A1A1AA]">{row.k}</span>
                    <span className="type-body text-white">{row.v}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="h-px bg-[rgba(255,255,255,0.08)]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keep looking */}
      <section className="mt-container mt-section-gap">
        <div className="flex items-end justify-between gap-4 mb-6">
          <TwoToneHeading as="h2" line1="Keep looking" line2="Other programs." />
          <Link
            to="/classes"
            className="inline-flex items-center gap-1 type-label text-white hover:text-[#E11D2E] transition-colors"
          >
            <span>All programs</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {others.map((other, idx) => (
            <ScrollReveal key={other.id} index={idx} className="h-full">
              <Link
                to={`/classes/${other.slug}`}
                className="group h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[30px] p-[10px] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
              >
                <ZonePhoto
                  src={other.image}
                  alt={other.title}
                  className="w-full h-[200px] rounded-[22px]"
                  accentColor={getAccentColor(other.zone)}
                />
                <div className="px-4 pt-4 pb-5">
                  <span className="type-small text-[#A1A1AA]">
                    {other.zoneName} · {other.duration}
                  </span>
                  <h3 className="type-card-title text-white mt-1">
                    {other.title}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
