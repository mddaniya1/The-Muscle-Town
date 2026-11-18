import React, { useState } from 'react';
import { Check, MessageCircle, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { IMAGES } from '../../cms/defaultData';
import { FaqItem, ProgramItem, SiteSettings } from '../../cms/types';
import { ScrollReveal, THRES_EASE } from '../MotionPrimitives';
import { ThresButton, TwoToneHeading, ZonePhoto } from '../Primitives';

export function FaqSection({
  faqs,
  site,
}: {
  faqs: FaqItem[];
  site: SiteSettings;
}) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section id="faq" className="mt-container mt-section-gap">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left column: Heading + Find us / Open / Write card */}
        <ScrollReveal index={0} className="lg:col-span-5 flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <span className="type-small text-[#A1A1AA]">Questions</span>
            <TwoToneHeading
              as="h2"
              line1="Asked often,"
              line2="answered straight."
            />
            <p className="type-lead text-[#A1A1AA] max-w-[400px] mt-1">
              Have a question about timings, ladies hours, or promotional packages? Reach our front desk directly.
            </p>
          </div>

          <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="type-small text-[#A1A1AA]">Find us</span>
              <span className="type-body text-white">{site.address}</span>
            </div>
            <div className="h-px bg-[rgba(255,255,255,0.08)]" />
            <div className="flex flex-col gap-1">
              <span className="type-small text-[#A1A1AA]">Open</span>
              <span className="type-body text-white">
                {site.weekdayHours}. {site.sundayHours}.
              </span>
            </div>
            <div className="h-px bg-[rgba(255,255,255,0.08)]" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="type-small text-[#A1A1AA]">Phone / WhatsApp</span>
                <a
                  href={site.phoneHref}
                  className="type-label text-white hover:text-[#E11D2E] transition-colors"
                >
                  {site.phoneDisplay}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="type-small text-[#A1A1AA]">Write</span>
                <a
                  href={`mailto:${site.email}`}
                  className="type-label text-white hover:text-[#E11D2E] transition-colors"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right column: Interactive FAQ Accordion list */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <ScrollReveal key={faq.id} index={idx}>
                <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[26px] md:rounded-[30px] px-6 sm:px-[30px] py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 py-2 text-left cursor-pointer group/faq"
                  >
                    <span className="type-card-title text-white transition-colors duration-200 group-hover/faq:text-[#E11D2E]">
                      {faq.question}
                    </span>
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                        isOpen
                          ? 'rotate-45 bg-[#E11D2E] text-white'
                          : 'bg-[rgba(255,255,255,0.06)] text-white'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: THRES_EASE }}
                        className="overflow-hidden"
                      >
                        <p className="type-body text-[#A1A1AA] pt-2 pb-3 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BookingSection({
  site,
  programs,
  accentColor,
}: {
  site: SiteSettings;
  programs: ProgramItem[];
  accentColor: string;
}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState(programs[0]?.title || 'Strength Training');
  const [visitDay, setVisitDay] = useState('Monday');
  const [visitTime, setVisitTime] = useState('Evening (5:00 PM – 9:00 PM)');
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (fullName.trim().length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (phone.trim().length < 7) {
      setStatus('error');
      setErrorMessage('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('pending');
    try {
      const res = await fetch('/api/book-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          program,
          visitDay,
          visitTime,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(
          data.error || 'Could not submit booking request. Please try WhatsApp below.'
        );
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error while sending request. Please try again or reach us directly on WhatsApp.'
      );
    }
  };

  const whatsappPrefillUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hello The Muscle Town, I would like to book a club visit.\nName: ${fullName || 'Guest'}\nProgram: ${program}\nPreferred Day: ${visitDay}\nPreferred Time: ${visitTime}`
  )}`;

  return (
    <section id="book" className="mt-container mt-section-gap">
      <ScrollReveal>
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] text-white rounded-[28px] md:rounded-[36px] p-5 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Info & Checklist + Photo */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="type-small text-[#A1A1AA]">Visit booking</span>
              <TwoToneHeading
                as="h2"
                line1="Your fitness journey"
                line2="starts here."
                night
              />
              <p className="type-lead text-[#A1A1AA] max-w-[480px]">
                Book your visit to The Muscle Town at Plot C-24, 3rd/4th Floor,
                Near 5 Star Chowrangi. Tour both floors and speak directly with
                our team.
              </p>

              <ul className="flex flex-col gap-3 mt-3">
                {[
                  'Guided tour of cardio, free weights & group workout studio',
                  'Check sauna, locker & restroom amenities in person',
                  'Confirm current membership packages & ladies/mixed timings',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white"
                      style={{ backgroundColor: accentColor }}
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="type-body text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group h-[200px] sm:h-[240px] rounded-[22px] overflow-hidden">
              <ZonePhoto
                src={IMAGES.zoneFloor}
                alt="The Muscle Town training floor in North Nazimabad"
                className="w-full h-full rounded-[22px]"
                accentColor={accentColor}
              />
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6 bg-[#0B0B0C] border border-[rgba(255,255,255,0.1)] text-white rounded-[24px] md:rounded-[30px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
            <div>
              <h3 className="type-subtitle text-white">
                Book your visit to The Muscle Town
              </h3>
              <p className="type-body text-[#A1A1AA] mt-1.5">
                Fill in your details and preferred time slot, or message us directly on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="visit-fullname" className="type-small text-white font-medium">
                    Full name
                  </label>
                  <input
                    id="visit-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Hamza Siddiqui"
                    className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="visit-phone" className="type-small text-white font-medium">
                      Phone number
                    </label>
                    <input
                      id="visit-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 3XX XXXXXXX"
                      className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="visit-email" className="type-small text-white font-medium">
                      Email address
                    </label>
                    <input
                      id="visit-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="visit-program" className="type-small text-white font-medium">
                    Preferred training program
                  </label>
                  <select
                    id="visit-program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.title} className="bg-[#161618] text-white">
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="visit-day" className="type-small text-white font-medium">
                      Preferred visit day
                    </label>
                    <select
                      id="visit-day"
                      value={visitDay}
                      onChange={(e) => setVisitDay(e.target.value)}
                      className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                        (day) => (
                          <option key={day} value={day} className="bg-[#161618] text-white">
                            {day}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="visit-time" className="type-small text-white font-medium">
                      Preferred time
                    </label>
                    <select
                      id="visit-time"
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-4 py-3 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                    >
                      <option value="Morning (7:00 AM – 12:00 PM)" className="bg-[#161618] text-white">
                        Morning (7:00 AM – 12:00 PM)
                      </option>
                      <option value="Afternoon (12:00 PM – 5:00 PM)" className="bg-[#161618] text-white">
                        Afternoon (12:00 PM – 5:00 PM)
                      </option>
                      <option value="Evening (5:00 PM – 9:00 PM)" className="bg-[#161618] text-white">
                        Evening (5:00 PM – 9:00 PM)
                      </option>
                      <option value="Night (9:00 PM – 12:00 AM)" className="bg-[#161618] text-white">
                        Night (9:00 PM – 12:00 AM)
                      </option>
                    </select>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div
                      key="booking-error"
                      role="alert"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: THRES_EASE }}
                      className="rounded-[14px] bg-[#8B0000]/35 border border-[#E11D2E] text-white px-4 py-3 type-small"
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      key="booking-success"
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: THRES_EASE }}
                      className="rounded-[14px] bg-[#161618] border border-[#E11D2E]/60 text-white px-4 py-3 type-small"
                    >
                      Visit request received for {visitDay} ({visitTime}). Our team will confirm via phone or email, or you can message us on WhatsApp immediately below.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <ThresButton
                    type="submit"
                    variant="primary"
                    disabled={status === 'pending'}
                    className="flex-1"
                  >
                    {status === 'pending' ? 'Sending...' : 'Request a Visit'}
                  </ThresButton>
                  <a
                    href={whatsappPrefillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.22)] px-5 py-3 min-h-[44px] type-label text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[#E11D2E] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.98] whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
