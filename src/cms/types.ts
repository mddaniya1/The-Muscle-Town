export type ZoneNumber = 1 | 2 | 3 | 4 | 5;

export interface DayItem {
  id: string;
  order: number;
  dayShort: string;
  dayFull: string;
  zone: ZoneNumber | 0;
  zoneName: string;
  focusTitle: string;
  hours: string;
  isRestDay: boolean;
  image: string;
  programSlug?: string;
}

export interface TrainingZone {
  id: string;
  number: ZoneNumber;
  name: string;
  tagline: string;
  description: string;
  floorLocation: string;
  equipmentHighlights: string[];
  colorHex: string;
  image: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  zone: ZoneNumber;
  zoneName: string;
  duration: string;
  level: string;
  shortDescription: string;
  fullDescription: string[];
  whoItIsFor: string;
  whatYouNotice: string[];
  goodFor: string;
  bring: string;
  coachingDesk: string;
  image: string;
  note?: string;
}

export interface WorkoutPhase {
  id: string;
  step: string;
  zone: ZoneNumber;
  title: string;
  minutes: number;
  summary: string;
  detail: string;
}

export interface CoachDesk {
  id: string;
  slug: string;
  deskName: string;
  roleTitle: string;
  homeZone: ZoneNumber;
  homeZoneName: string;
  shortBio: string;
  availabilityNote: string;
  experienceLabel: string;
  focusAreas: string[];
  fullBio: string[];
  askAbout: string[];
  image: string;
}

export interface TimetableSession {
  id: string;
  dayOrder: number;
  dayName: string;
  time: string;
  programSlug: string;
  programTitle: string;
  zone: ZoneNumber;
  zoneName: string;
  coachingDesk: string;
  duration: string;
  floor: string;
  note?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  priceText: string;
  periodText: string;
  isDark: boolean;
  features: string[];
  ctaLabel: string;
  disclaimer?: string;
}

export interface MemberHighlight {
  id: string;
  metricLabel: string;
  beforeValue: string;
  afterValue: string;
  unit: string;
  quote: string;
  attribution: string;
  subLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  featured: boolean;
  image: string;
  sections: {
    heading?: string;
    subheading?: string;
    paragraphs?: string[];
    bullets?: string[];
  }[];
}

export interface FacilityItem {
  id: string;
  number: string;
  title: string;
  floor: string;
  description: string;
  statusNote?: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  email: string;
  weekdayHours: string;
  sundayHours: string;
  googleRating: string;
  googleReviewCount: string;
  instagramUrl: string;
  facebookUrl: string;
  mapsUrl: string;
  accentColor: string;
  accentTint: string;
  perZoneColorMode: boolean;
}

export interface MuscleTownCMS {
  site: SiteSettings;
  days: DayItem[];
  zones: TrainingZone[];
  programs: ProgramItem[];
  phases: WorkoutPhase[];
  coaches: CoachDesk[];
  timetable: TimetableSession[];
  memberships: MembershipPlan[];
  stories: MemberHighlight[];
  faqs: FaqItem[];
  journal: JournalArticle[];
  facilities: FacilityItem[];
}
