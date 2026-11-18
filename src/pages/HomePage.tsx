import React, { useState } from 'react';
import { useCms } from '../cms/CmsContext';
import {
  AboutSection,
  TrainingZonesSection,
} from '../components/home/AboutAndZonesSection';
import {
  CoachesSection,
  MembershipSection,
  MemberStoriesSection,
} from '../components/home/CoachesStoriesMembershipSection';
import {
  BookingSection,
  FaqSection,
} from '../components/home/FaqAndBookingSection';
import { HeroSection } from '../components/home/HeroSection';
import {
  InsideWorkoutSection,
  ProgramsSection,
} from '../components/home/ProgramsAndWorkoutSection';

export function HomePage() {
  const { cms, getAccentColor } = useCms();
  const [selectedDayId, setSelectedDayId] = useState<string>(
    cms.days[0]?.id || 'day-mon'
  );

  const activeDay =
    cms.days.find((d) => d.id === selectedDayId) || cms.days[0];
  const heroAccent = getAccentColor(activeDay.zone || 5);

  return (
    <main>
      <HeroSection
        days={cms.days}
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
        accentColor={heroAccent}
      />
      <AboutSection
        site={cms.site}
        activeDay={activeDay}
        accentColor={heroAccent}
      />
      <TrainingZonesSection
        zones={cms.zones}
        accentColor={cms.site.accentColor}
      />
      <ProgramsSection
        programs={cms.programs}
        getAccentColor={getAccentColor}
      />
      <InsideWorkoutSection
        phases={cms.phases}
        accentColor={cms.site.accentColor}
      />
      <CoachesSection
        coaches={cms.coaches}
        getAccentColor={getAccentColor}
      />
      <MemberStoriesSection stories={cms.stories} />
      <MembershipSection
        plans={cms.memberships}
        accentColor={cms.site.accentColor}
      />
      <FaqSection faqs={cms.faqs} site={cms.site} />
      <BookingSection
        site={cms.site}
        programs={cms.programs}
        accentColor={cms.site.accentColor}
      />
    </main>
  );
}
