import React from 'react';
import { useCms } from '../cms/CmsContext';
import { ClosingCta } from '../components/ClosingCta';
import { MembershipSection } from '../components/home/CoachesStoriesMembershipSection';
import { FaqSection } from '../components/home/FaqAndBookingSection';
import { ScrollReveal } from '../components/MotionPrimitives';
import { PageHead, SectionHeader, ThresButton } from '../components/Primitives';

export function MembershipPage() {
  const { cms } = useCms();

  const includedHighlights = [
    {
      num: '01',
      title: 'Cardio & endurance deck',
      body: 'Treadmills, stationary bikes, and conditioning equipment accessible Monday through Saturday.',
    },
    {
      num: '02',
      title: 'Free weights & racks',
      body: 'Calibrated dumbbell progressions, Olympic barbells, squat racks, and benches across the main floor.',
    },
    {
      num: '03',
      title: 'Modern strength machines',
      body: 'Pin-loaded and plate-loaded machines targeting upper body, lower body, and core.',
    },
    {
      num: '04',
      title: 'Group workout studio',
      body: 'Dedicated studio floor for HIIT, functional conditioning, and transformation sessions.',
    },
    {
      num: '05',
      title: 'Sauna & restrooms',
      body: 'Post-workout sauna access and clean restrooms maintained throughout operating hours.',
    },
    {
      num: '06',
      title: 'Extended daily hours',
      body: 'Open 7:00 AM to 12:00 AM Monday to Saturday so morning and late-evening schedules both fit.',
    },
  ];

  return (
    <main>
      <PageHead
        label="Membership"
        line1="Clear plans,"
        line2="real facilities."
        lead="Explore our Standard Membership, Body Transformation Package, and 1-on-1 Personal Training. Current promotional offers (PKR 8,000 and PKR 16,200) are confirmed for availability and terms at reception."
        rightSlot={
          <div className="flex flex-wrap gap-3">
            <ThresButton variant="primary" to="/#book">
              Request a Visit
            </ThresButton>
            <ThresButton
              variant="outline"
              href={`https://wa.me/${cms.site.whatsappNumber}?text=${encodeURIComponent(
                'Hello The Muscle Town, please share current availability and terms for membership packages.'
              )}`}
            >
              Confirm on WhatsApp
            </ThresButton>
          </div>
        }
      />

      {/* Reuse exact 3-card Membership Grid */}
      <div className="-mt-12 md:-mt-16">
        <MembershipSection
          plans={cms.memberships}
          accentColor={cms.site.accentColor}
        />
      </div>

      {/* Included with every membership (01-06 matching Thres /membership) */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="Club amenities"
          line1="What your membership"
          line2="gives you access to."
          lead="Built across the 3rd and 4th floors at Plot C-24, Block I, North Nazimabad."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {includedHighlights.map((item, idx) => (
            <ScrollReveal key={item.num} index={idx} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col justify-between gap-6">
                <span className="type-small tabular-nums text-[#E11D2E]">
                  {item.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="type-card-title text-white">{item.title}</h3>
                  <p className="type-body text-[#A1A1AA]">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <FaqSection faqs={cms.faqs} site={cms.site} />
      <ClosingCta />
    </main>
  );
}
