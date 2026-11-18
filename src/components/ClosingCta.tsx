import React from 'react';
import { useCms } from '../cms/CmsContext';
import { ScrollReveal } from './MotionPrimitives';
import { ThresButton, TwoToneHeading } from './Primitives';

/** Closing CTA banner used at the end of inner pages, matching Thres /classes /coaches /studio /membership */
export function ClosingCta() {
  const { cms } = useCms();

  return (
    <section className="mt-container mt-section-gap">
      <ScrollReveal>
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] text-white rounded-[28px] md:rounded-[36px] p-7 sm:p-10 md:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-[620px]">
            <span className="type-small text-[#A1A1AA]">Visit The Muscle Town</span>
            <TwoToneHeading
              as="h2"
              line1="Your fitness journey"
              line2="starts here."
              night
            />
            <p className="type-lead text-[#A1A1AA] max-w-[500px]">
              Visit us at Plot C-24, 3rd &amp; 4th Floor, Near 5 Star Chowrangi, Block I, North
              Nazimabad. Tour the floors and meet a coach Monday to Saturday, 7:00 AM – 12:00 AM.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ThresButton variant="zone" to="/#book">
              Request a Visit
            </ThresButton>
            <ThresButton
              variant="night-outline"
              href={`https://wa.me/${cms.site.whatsappNumber}?text=${encodeURIComponent(
                'Hello The Muscle Town, I would like to book a club visit.'
              )}`}
            >
              WhatsApp Club
            </ThresButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
