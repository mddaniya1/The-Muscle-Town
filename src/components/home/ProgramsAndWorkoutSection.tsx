import React, { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { ProgramItem, WorkoutPhase } from '../../cms/types';
import { Link } from '../../router';
import { ScrollReveal } from '../MotionPrimitives';
import {
  SectionHeader,
  ThresButton,
  ZonePhoto,
} from '../Primitives';

export function ProgramsSection({
  programs,
  getAccentColor,
}: {
  programs: ProgramItem[];
  getAccentColor: (zone?: number) => string;
}) {
  return (
    <section className="mt-container mt-section-gap">
      <SectionHeader
        label="Programs"
        line1="Six programs."
        line2="Built for real progress."
        lead="Strength, endurance, interval conditioning, and 1-on-1 coaching structured for beginners and experienced lifters alike."
      />

      {/* Exact 3-column class card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {programs.map((program, idx) => (
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
                  <h3 className="type-subtitle text-white">{program.title}</h3>
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

      <ScrollReveal index={1} className="mt-8 flex flex-wrap items-center gap-3">
        <ThresButton variant="primary" to="/timetable">
          See this week's timetable
        </ThresButton>
        <ThresButton variant="outline" to="/classes">
          All classes
        </ThresButton>
      </ScrollReveal>
    </section>
  );
}

/** Interactive 5-phase circular workout clock matching Thres's "Inside a class" section */
export function InsideWorkoutSection({
  phases,
  accentColor,
}: {
  phases: WorkoutPhase[];
  accentColor: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentPhase = phases[activeIndex] || phases[0];

  // Remaining seconds within current phase
  const [secondsLeft, setSecondsLeft] = useState<number>(currentPhase.minutes * 60);

  useEffect(() => {
    setSecondsLeft(currentPhase.minutes * 60);
  }, [activeIndex, currentPhase.minutes]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setActiveIndex((idx) => (idx + 1) % phases.length);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isPlaying, phases.length]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const totalMinutes = phases.reduce((acc, p) => acc + p.minutes, 0);
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const phaseFraction = 1 - secondsLeft / (currentPhase.minutes * 60);
  const overallProgress =
    (activeIndex + phaseFraction) / phases.length;

  return (
    <section className="mt-container mt-section-gap">
      <SectionHeader
        label="Inside a workout"
        line1="Sixty minutes,"
        line2="five workout phases."
        lead="Follow how a guided 60-minute session moves from warm up to recovery. Click any phase card or start the timer to step through."
      />

      {/* Exact 4-column x 2-row 300px Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[300px_300px] gap-2.5 md:gap-3">
        {/* Left column spanning 2 rows: Dark PhaseRing Interactive Clock */}
        <ScrollReveal
          index={0}
          className="md:col-span-2 lg:col-span-1 lg:row-span-2 h-full"
        >
          <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] text-white rounded-[28px] md:rounded-[30px] p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between gap-2">
              <span key={currentPhase.id} className="tzm-win type-small text-white">
                On now · {currentPhase.title}
              </span>
              <span className="type-small tabular-nums text-[#A1A1AA]">
                {currentPhase.step} / 0{phases.length}
              </span>
            </div>

            {/* Circular Phase Ring SVG */}
            <div className="relative mx-auto w-[210px] h-[210px] flex items-center justify-center">
              <svg
                viewBox="0 0 210 210"
                className="w-full h-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="105"
                  cy="105"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                />
                <circle
                  cx="105"
                  cy="105"
                  r={radius}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference * (1 - Math.max(0.08, overallProgress))
                  }
                  className="transition-[stroke-dashoffset,stroke] duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <span className="text-[40px] font-medium tracking-[-0.035em] tabular-nums text-white leading-none">
                  {mins}:{secs}
                </span>
                <span key={`${currentPhase.id}-min`} className="tzm-win type-small text-[#A1A1AA] mt-2">
                  {currentPhase.minutes} min block
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p key={`${currentPhase.id}-detail`} className="tzm-win type-small text-[#A1A1AA]">
                {currentPhase.detail}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 type-label text-white transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:brightness-90 active:scale-[0.98] cursor-pointer flex-1"
                  style={{ backgroundColor: accentColor }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" aria-hidden="true" />
                      <span>Run timer</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Reset workout phase timer"
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(0);
                    setSecondsLeft(phases[0].minutes * 60);
                  }}
                  className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-white hover:bg-white/10 active:scale-[0.95] transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5 Interactive Phase Cards */}
        {phases.map((phase, idx) => {
          const isActive = idx === activeIndex;
          return (
            <ScrollReveal key={phase.id} index={idx + 1} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setSecondsLeft(phase.minutes * 60);
                }}
                className={`h-full w-full text-left bg-[#161618] rounded-[28px] md:rounded-[30px] p-6 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] cursor-pointer min-h-[210px] lg:min-h-0 border active:scale-[0.99] ${
                  isActive
                    ? 'border-[#E11D2E] shadow-[0_0_0_1px_rgba(225,29,46,0.4)]'
                    : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.22)] hover:-translate-y-0.5'
                }`}
              >
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="type-small tabular-nums text-[#A1A1AA]">
                    {phase.step}
                  </span>
                  <span
                    className="type-small px-2.5 py-0.5 rounded-full tabular-nums font-medium transition-colors duration-300"
                    style={{
                      backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.08)',
                      color: isActive ? '#FFFFFF' : '#A1A1AA',
                    }}
                  >
                    {phase.minutes} min
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="type-subtitle text-white">{phase.title}</h3>
                  <p className="type-body text-[#A1A1AA]">{phase.summary}</p>
                </div>
              </button>
            </ScrollReveal>
          );
        })}

        {/* Summary Card (6th cell in remaining 2x3 space) */}
        <ScrollReveal index={5} className="h-full">
          <div className="h-full bg-[#161618] border border-[#8B0000] text-white rounded-[28px] md:rounded-[30px] p-6 flex flex-col justify-between min-h-[210px] lg:min-h-0">
            <span className="type-small text-[#A1A1AA]">Sample workout flow</span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="type-heading text-white tabular-nums">
                  {totalMinutes}
                </span>
                <span className="type-subtitle text-[#A1A1AA]">minutes</span>
              </div>
              <p className="type-small text-[#A1A1AA] mt-1">
                Official class timings confirmed at club reception.
              </p>
            </div>
            <ThresButton variant="zone" to="/#book" accentColor={accentColor}>
              Book a club visit
            </ThresButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
