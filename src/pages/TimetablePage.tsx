import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCms } from '../cms/CmsContext';
import { ClosingCta } from '../components/ClosingCta';
import { HeroAppear, ScrollReveal, THRES_EASE } from '../components/MotionPrimitives';
import { PageHead, ThresButton } from '../components/Primitives';
import { Link } from '../router';

const DAYS = ['All days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TimetablePage() {
  const { cms, getAccentColor } = useCms();
  const [selectedDay, setSelectedDay] = useState<string>('All days');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const reduced = useReducedMotion();

  const dayGroups = DAYS.slice(1).filter(
    (d) => selectedDay === 'All days' || selectedDay === d
  );

  return (
    <main>
      <PageHead
        label="Timetable"
        line1="Weekly floor schedule,"
        line2="Monday to Saturday."
        lead="Open training runs daily from 7:00 AM to 12:00 AM. Browse sample guided focus blocks below or confirm exact group studio slots at reception."
        rightSlot={
          <ThresButton variant="primary" to="/#book">
            Book a club visit
          </ThresButton>
        }
      />

      {/* Filter Bar */}
      <section className="mt-container">
        <HeroAppear step={3}>
          <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter by day">
              {DAYS.map((day) => {
                const active = selectedDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-2 rounded-full type-small font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.97] cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#E11D2E] text-white'
                        : 'bg-[rgba(255,255,255,0.06)] text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.12)]'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label htmlFor="timetable-program-filter" className="type-small text-[#A1A1AA] whitespace-nowrap">
                Program:
              </label>
              <select
                id="timetable-program-filter"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="rounded-full border border-[rgba(255,255,255,0.16)] bg-[#0B0B0C] px-4 py-2 type-small text-white focus:border-[#E11D2E] focus:outline-none transition-colors duration-200 hover:border-[rgba(255,255,255,0.3)]"
              >
                <option value="all" className="bg-[#161618] text-white">All programs</option>
                {cms.programs.map((p) => (
                  <option key={p.slug} value={p.slug} className="bg-[#161618] text-white">
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </HeroAppear>
      </section>

      {/* Day Rows */}
      <section className="mt-container mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDay}-${selectedProgram}`}
            initial={reduced ? undefined : { opacity: 0.001, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0.001, y: -6 }}
            transition={{ duration: 0.24, ease: THRES_EASE }}
            className="flex flex-col gap-3"
          >
            {dayGroups.map((dayName) => {
              const sessions = cms.timetable.filter(
                (s) =>
                  s.dayName === dayName &&
                  (selectedProgram === 'all' || s.programSlug === selectedProgram)
              );

              return (
                <div
                  key={dayName}
                  className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 sm:p-8"
                >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                  <h2 className="type-subtitle text-white">{dayName}</h2>
                  <span className="type-small text-[#A1A1AA]">
                    Club open 7:00 AM – 12:00 AM
                  </span>
                </div>

                {sessions.length === 0 ? (
                  <p className="type-body text-[#A1A1AA] pt-5">
                    No scheduled blocks match this program filter on {dayName}. Open-floor training remains available 7:00 AM – 12:00 AM.
                  </p>
                ) : (
                  <div className="divide-y divide-[rgba(255,255,255,0.08)]">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[rgba(255,255,255,0.04)] -mx-3 px-3 rounded-[16px] transition-colors"
                      >
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                          <span className="type-card-title tabular-nums text-white w-[96px]">
                            {session.time}
                          </span>
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: getAccentColor(session.zone) }}
                              aria-hidden="true"
                            />
                            <Link
                              to={`/classes/${session.programSlug}`}
                              className="type-card-title text-white hover:text-[#E11D2E] transition-colors"
                            >
                              {session.programTitle}
                            </Link>
                          </div>
                          {session.note && (
                            <span className="type-small text-[#A1A1AA]">
                              ({session.note})
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-between md:justify-end">
                          <span className="type-small text-[#A1A1AA]">
                            {session.floor} · {session.duration}
                          </span>
                          <span className="type-small text-[#A1A1AA]">
                            {session.coachingDesk}
                          </span>
                          <Link
                            to="/#book"
                            className="inline-flex items-center gap-1 type-label text-white hover:text-[#E11D2E] transition-colors whitespace-nowrap"
                          >
                            <span>Book visit</span>
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Notes cards matching Thres /timetable bottom grid */}
      <section className="mt-container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              kicker: 'Sunday',
              title: 'Closed. Rest.',
              body: 'Weekly maintenance and recovery day. Floors reopen Monday at 7:00 AM.',
            },
            {
              kicker: 'Open floor',
              title: '7:00 AM – 12:00 AM',
              body: 'Cardio deck, free weights, resistance machines, and sauna open all day Mon–Sat.',
            },
            {
              kicker: 'Ladies timings',
              title: 'Confirm at desk',
              body: `Call or WhatsApp ${cms.site.phoneDisplay} for current dedicated ladies & mixed slots.`,
            },
            {
              kicker: 'HYROX & Studio',
              title: 'Confirmed in-club',
              body: 'Sample weekly structure shown above; exact group & HYROX times confirmed at reception.',
            },
          ].map((note, idx) => (
            <ScrollReveal key={note.kicker} index={idx} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[26px] md:rounded-[30px] p-6 flex flex-col justify-between gap-4">
                <span className="type-small text-[#A1A1AA]">{note.kicker}</span>
                <div>
                  <h3 className="type-card-title text-white">{note.title}</h3>
                  <p className="type-body text-[#A1A1AA] mt-1.5">{note.body}</p>
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
