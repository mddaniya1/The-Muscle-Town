import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCms } from '../cms/CmsContext';
import { IMAGES } from '../cms/defaultData';
import { ClosingCta } from '../components/ClosingCta';
import { CoachesSection } from '../components/home/CoachesStoriesMembershipSection';
import { HeroAppear, ScrollReveal, THRES_EASE } from '../components/MotionPrimitives';
import {
  CountUp,
  PageHead,
  SectionHeader,
  ThresButton,
  TwoToneHeading,
  ZonePhoto,
} from '../components/Primitives';

export function StudioPage() {
  const { cms, getAccentColor } = useCms();

  return (
    <main>
      <PageHead
        label="The studio"
        line1="Two dedicated floors,"
        line2="one serious club."
        lead="Located at Plot C-24, 3rd & 4th Floor near 5 Star Chowrangi, Block I, North Nazimabad — combining modern cardio, free weights, group studio, and sauna recovery."
      />

      {/* Lead Studio Image */}
      <section className="mt-container">
        <HeroAppear step={3} className="group h-[280px] sm:h-[420px] lg:h-[520px] rounded-[28px] md:rounded-[36px] overflow-hidden">
          <ZonePhoto
            src={IMAGES.zoneFloor}
            alt="The Muscle Town multi-floor interior"
            className="w-full h-full rounded-[28px] md:rounded-[36px]"
            alwaysColor
          />
        </HeroAppear>
      </section>

      {/* Story + 4 CountUp Figures matching Thres /studio */}
      <section className="mt-container mt-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ScrollReveal index={0} className="lg:col-span-6 flex flex-col gap-4">
            <span className="type-small text-[#A1A1AA]">North Nazimabad · Block I</span>
            <TwoToneHeading
              as="h2"
              line1="Built for consistency,"
              line2="from 7 AM to midnight."
            />
            <p className="type-body text-[#A1A1AA] mt-2">
              The Muscle Town separates strength machines and free weights from
              endurance cardio, group studio circuits, and recovery amenities so
              members have focused space throughout peak and off-peak hours.
            </p>
            <p className="type-body text-[#A1A1AA]">
              From morning sessions before work to late-night training until
              12:00 AM Monday through Saturday, every floor is maintained for
              cleanliness, safety, and steady progression.
            </p>
          </ScrollReveal>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <ScrollReveal index={0} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-6 flex flex-col justify-between min-h-[180px]">
                <div className="flex items-baseline gap-1">
                  <span className="type-heading text-white">
                    <CountUp value={4.6} decimals={1} />
                  </span>
                  <span className="type-subtitle text-[#A1A1AA]">/ 5</span>
                </div>
                <span className="type-body text-[#A1A1AA]">
                  Google rating across {cms.site.googleReviewCount} verified reviews
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal index={1} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-6 flex flex-col justify-between min-h-[180px]">
                <div className="flex items-baseline gap-1">
                  <span className="type-heading text-white">
                    <CountUp value={17} />
                  </span>
                  <span className="type-subtitle text-[#A1A1AA]">hrs</span>
                </div>
                <span className="type-body text-[#A1A1AA]">
                  Daily opening hours (7:00 AM – 12:00 AM)
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal index={2} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-6 flex flex-col justify-between min-h-[180px]">
                <div className="flex items-baseline gap-1">
                  <span className="type-heading text-white">
                    <CountUp value={6} />
                  </span>
                  <span className="type-subtitle text-[#A1A1AA]">days</span>
                </div>
                <span className="type-body text-[#A1A1AA]">
                  Open Monday through Saturday (Sunday closed)
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal index={3} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-6 flex flex-col justify-between min-h-[180px]">
                <div className="flex items-baseline gap-1">
                  <span className="type-heading text-white">
                    <CountUp value={2} />
                  </span>
                  <span className="type-subtitle text-[#A1A1AA]">floors</span>
                </div>
                <span className="type-body text-[#A1A1AA]">
                  3rd &amp; 4th floors at Plot C-24, Block I
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Floor-wise Facilities Grid */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="Facilities"
          line1="Inside the club,"
          line2="zone by zone."
          lead="Explore every facility across our 3rd and 4th floors."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cms.facilities.map((fac, idx) => (
            <ScrollReveal key={fac.id} index={idx} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col justify-between gap-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="type-small tabular-nums text-[#E11D2E]">
                    {fac.number}
                  </span>
                  <span className="type-small text-[#A1A1AA]">{fac.floor}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="type-subtitle text-white">{fac.title}</h3>
                  <p className="type-body text-[#A1A1AA]">{fac.description}</p>
                  {fac.statusNote && (
                    <p className="type-small text-[#A1A1AA] pt-1">
                      {fac.statusNote}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Studio Photography Pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <ScrollReveal index={0} className="group h-[260px] sm:h-[340px] rounded-[28px] overflow-hidden">
            <ZonePhoto
              src={IMAGES.weightsBarbell}
              alt="Strength and free weights floor"
              className="w-full h-full rounded-[28px]"
            />
          </ScrollReveal>
          <ScrollReveal index={1} className="group h-[260px] sm:h-[340px] rounded-[28px] overflow-hidden">
            <ZonePhoto
              src={IMAGES.saunaLounge}
              alt="Sauna and post-workout recovery lounge"
              className="w-full h-full rounded-[28px]"
            />
          </ScrollReveal>
        </div>
      </section>

      <CoachesSection coaches={cms.coaches} getAccentColor={getAccentColor} />
      <ClosingCta />
    </main>
  );
}

export function VisitPage() {
  const { cms } = useCms();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const waHref = `https://wa.me/${cms.site.whatsappNumber}?text=${encodeURIComponent(
    'Hello The Muscle Town, I have an inquiry about visiting the club at Plot C-24, North Nazimabad.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    if (name.trim().length < 2) {
      setStatus('error');
      setErrorText('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorText('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 5) {
      setStatus('error');
      setErrorText('Please enter a short message or question.');
      return;
    }

    setStatus('pending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorText(data.error || 'Could not send message. Please try WhatsApp below.');
        return;
      }
      setStatus('success');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorText('Network error while sending message. Please use WhatsApp or call us.');
    }
  };

  return (
    <main>
      <PageHead
        label="Visit & Contact"
        line1="Plot C-24, Block I."
        line2="Near 5 Star Chowrangi."
        lead="Visit The Muscle Town on the 3rd and 4th floors in North Nazimabad, Karachi. Open Monday to Saturday from 7:00 AM until 12:00 AM."
      />

      {/* Info Card + Map */}
      <section className="mt-container">
        <HeroAppear step={3} className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          <div className="lg:col-span-5 bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-9 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <span className="type-small text-[#A1A1AA]">Find us</span>
                <p className="type-card-title text-white mt-1">
                  {cms.site.address}
                </p>
              </div>
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="type-small text-[#A1A1AA]">Mon – Sat</span>
                  <p className="type-body text-white mt-0.5">
                    7:00 AM – 12:00 AM
                  </p>
                </div>
                <div>
                  <span className="type-small text-[#A1A1AA]">Sunday</span>
                  <p className="type-body text-white mt-0.5">
                    Closed. Rest.
                  </p>
                </div>
              </div>
              <div className="h-px bg-[rgba(255,255,255,0.08)]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="type-small text-[#A1A1AA]">Call</span>
                  <a
                    href={cms.site.phoneHref}
                    className="block type-label text-white mt-0.5 hover:text-[#E11D2E] transition-colors"
                  >
                    {cms.site.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="type-small text-[#A1A1AA]">Write</span>
                  <a
                    href={`mailto:${cms.site.email}`}
                    className="block type-label text-white mt-0.5 hover:text-[#E11D2E] transition-colors break-all"
                  >
                    {cms.site.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <ThresButton variant="primary" href={cms.site.mapsUrl} withArrow>
                Open in Google Maps
              </ThresButton>
              <ThresButton variant="outline" href={waHref}>
                WhatsApp Club
              </ThresButton>
            </div>
          </div>

          {/* Interactive Location Map Embed (North Nazimabad Block I, Karachi) */}
          <div className="lg:col-span-7 bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-3 flex flex-col min-h-[340px]">
            <iframe
              title="The Muscle Town North Nazimabad Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=67.030%2C24.935%2C67.055%2C24.955&layer=mapnik&marker=24.9455%2C67.0432"
              className="w-full h-full min-h-[320px] rounded-[22px] border-0"
              loading="lazy"
            />
          </div>
        </HeroAppear>
      </section>

      {/* Three ways to reach / get here */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="Getting here"
          line1="Three ways"
          line2="to connect."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              kicker: 'In person',
              title: '5 Star Chowrangi landmark',
              body: 'Located at Plot C-24, Block I, North Nazimabad—head up to the 3rd & 4th floors for a full tour.',
            },
            {
              kicker: 'WhatsApp & Phone',
              title: cms.site.phoneDisplay,
              body: 'Message or call directly for ladies timings, current promotional fees, and personal training slots.',
            },
            {
              kicker: 'Email',
              title: cms.site.email,
              body: 'Send questions about memberships, transformation packages, or studio sessions anytime.',
            },
          ].map((item, idx) => (
            <ScrollReveal key={item.kicker} index={idx} className="h-full">
              <div className="h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-7 flex flex-col justify-between gap-6">
                <span className="type-small text-[#E11D2E]">{item.kicker}</span>
                <div>
                  <h3 className="type-card-title text-white">{item.title}</h3>
                  <p className="type-body text-[#A1A1AA] mt-1.5">{item.body}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Write to us form */}
      <section className="mt-container mt-section-gap">
        <ScrollReveal>
          <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[36px] p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="type-small text-[#A1A1AA]">Write to us</span>
            <TwoToneHeading
              as="h2"
              line1="Ask our team"
              line2="anything."
            />
            <p className="type-lead text-[#A1A1AA] mt-1">
              Questions about equipment, beginner onboarding, timings, or membership offers? Send a note below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="type-small text-white font-medium">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-phone" className="type-small text-white font-medium">
                  Phone / WhatsApp (optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="type-small text-white font-medium">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-msg" className="type-small text-white font-medium">
                Message
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
              />
            </div>

            <AnimatePresence mode="wait">
              {status === 'error' && (
                <motion.div
                  key="contact-error"
                  role="alert"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: THRES_EASE }}
                  className="rounded-[14px] bg-[#8B0000]/35 border border-[#E11D2E] px-4 py-3 type-small text-white"
                >
                  {errorText}
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div
                  key="contact-success"
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25, ease: THRES_EASE }}
                  className="rounded-[14px] bg-[#0B0B0C] border border-[#E11D2E]/60 px-4 py-3 type-small text-white"
                >
                  Message received. Our front desk team will reply shortly.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <ThresButton type="submit" variant="primary" disabled={status === 'pending'}>
                {status === 'pending' ? 'Sending...' : 'Send message'}
              </ThresButton>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.22)] px-5 py-3 min-h-[44px] type-label text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[#E11D2E] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp directly</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </form>
        </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
