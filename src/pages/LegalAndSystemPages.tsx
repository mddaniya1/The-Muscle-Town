import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { PageHead, ThresButton } from '../components/Primitives';

export function PrivacyPage() {
  const { cms } = useCms();
  return (
    <main className="mt-container pt-[112px] md:pt-[128px] pb-16">
      <div className="max-w-[820px] flex flex-col gap-6">
        <span className="type-small text-[#A1A1AA]">Small print · Updated November 2026</span>
        <h1 className="type-article-title text-white">Privacy policy</h1>
        <p className="type-lead text-[#A1A1AA]">
          How {cms.site.brandName} handles visit bookings and inquiry details submitted on this website.
        </p>

        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-10 flex flex-col gap-6">
          <div>
            <h2 className="type-article-heading text-white">What we collect</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              When you request a club visit or send an inquiry, we collect the name, phone number, email address, and preferred training program or timing you provide.
            </p>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.08)]" />
          <div>
            <h2 className="type-article-heading text-white">How we use it</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              We use your contact details solely to schedule your club tour, confirm membership availability or ladies/mixed timings, and respond to your inquiry. We do not sell or rent member contact details to third parties.
            </p>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.08)]" />
          <div>
            <h2 className="type-article-heading text-white">Your requests</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              You may request correction or deletion of your inquiry details at any time by emailing{' '}
              <a href={`mailto:${cms.site.email}`} className="underline text-white hover:text-[#E11D2E] transition-colors">
                {cms.site.email}
              </a>{' '}
              or calling {cms.site.phoneDisplay}.
            </p>
          </div>
        </div>

        <div>
          <ThresButton variant="outline" to="/">
            Back to the home page
          </ThresButton>
        </div>
      </div>
    </main>
  );
}

export function TermsPage() {
  const { cms } = useCms();
  return (
    <main className="mt-container pt-[112px] md:pt-[128px] pb-16">
      <div className="max-w-[820px] flex flex-col gap-6">
        <span className="type-small text-[#A1A1AA]">Small print · Updated November 2026</span>
        <h1 className="type-article-title text-white">Terms of membership &amp; club visits</h1>
        <p className="type-lead text-[#A1A1AA]">
          General guidelines for visiting and training at {cms.site.brandName}, North Nazimabad, Karachi.
        </p>

        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-10 flex flex-col gap-6">
          <div>
            <h2 className="type-article-heading text-white">Club hours &amp; access</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              Standard operating hours are {cms.site.weekdayHours} ({cms.site.sundayHours}). Members are expected to use clean indoor athletic footwear, wipe down benches after use, and re-rack dumbbells and Olympic plates.
            </p>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.08)]" />
          <div>
            <h2 className="type-article-heading text-white">Promotional packages &amp; offers</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              Promotional membership rates (including PKR 8,000 and PKR 16,200 offers) and specialty offerings (such as rooftop cafe hours or HYROX sessions) are subject to current availability and terms confirmed at the front desk.
            </p>
          </div>
          <div className="h-px bg-[rgba(255,255,255,0.08)]" />
          <div>
            <h2 className="type-article-heading text-white">Health &amp; safety</h2>
            <p className="type-article-body text-[#A1A1AA] mt-2">
              Please inform a floor trainer of any prior injuries or medical conditions before beginning heavy strength training, HIIT, or sauna use.
            </p>
          </div>
        </div>

        <div>
          <ThresButton variant="outline" to="/">
            Back to the home page
          </ThresButton>
        </div>
      </div>
    </main>
  );
}

/** Live CMS Editor & Thres Design System Reference (/style-guide) */
export function StyleGuideCmsPage() {
  const { cms, updateCms, resetCms } = useCms();
  const [savedBanner, setSavedBanner] = useState(false);

  const flashSaved = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 1800);
  };

  return (
    <main>
      <PageHead
        label="CMS & Design System"
        line1="Club content manager"
        line2="& design tokens."
        lead="Edit membership prices, promotional offers, club hours, and accent behavior directly here. Changes persist locally across every page."
        rightSlot={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                resetCms();
                flashSaved();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.22)] px-5 py-3 min-h-[44px] type-label text-white hover:bg-[rgba(255,255,255,0.08)] hover:border-[#E11D2E] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset defaults</span>
            </button>
          </div>
        }
      />

      <section className="mt-container pb-16">
        {savedBanner && (
          <div className="mb-4 rounded-[18px] bg-[#161618] border border-[#E11D2E]/60 text-white px-5 py-3 type-small">
            CMS settings updated across all pages.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Membership Pricing CMS Editor */}
          <div className="lg:col-span-7 bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-9 flex flex-col gap-6">
            <div>
              <span className="type-small text-[#A1A1AA]">Collection · Memberships</span>
              <h2 className="type-subtitle text-white mt-1">
                Editable PKR Packages &amp; Offers
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {cms.memberships.map((plan, idx) => (
                <div
                  key={plan.id}
                  className="rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[#0B0B0C] p-5 flex flex-col gap-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="type-small text-[#A1A1AA]">Plan name</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCms((prev) => {
                            const next = [...prev.memberships];
                            next[idx] = { ...next[idx], name: val };
                            return { ...prev, memberships: next };
                          });
                          flashSaved();
                        }}
                        className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-3 py-2 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="type-small text-[#A1A1AA]">Price (PKR)</label>
                      <input
                        type="text"
                        value={plan.priceText}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCms((prev) => {
                            const next = [...prev.memberships];
                            next[idx] = { ...next[idx], priceText: val };
                            return { ...prev, memberships: next };
                          });
                          flashSaved();
                        }}
                        className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-3 py-2 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="type-small text-[#A1A1AA]">Billing / Offer label</label>
                      <input
                        type="text"
                        value={plan.periodText}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCms((prev) => {
                            const next = [...prev.memberships];
                            next[idx] = { ...next[idx], periodText: val };
                            return { ...prev, memberships: next };
                          });
                          flashSaved();
                        }}
                        className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#161618] px-3 py-2 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Site Info & Brand Theme Tokens */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col gap-4">
              <span className="type-small text-[#A1A1AA]">Site Settings</span>
              <h2 className="type-subtitle text-white">Club Details</h2>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="type-small text-[#A1A1AA]">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={cms.site.phoneDisplay}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCms((prev) => ({
                        ...prev,
                        site: { ...prev.site, phoneDisplay: val },
                      }));
                      flashSaved();
                    }}
                    className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-3 py-2 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="type-small text-[#A1A1AA]">Weekday Hours</label>
                  <input
                    type="text"
                    value={cms.site.weekdayHours}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCms((prev) => ({
                        ...prev,
                        site: { ...prev.site, weekdayHours: val },
                      }));
                      flashSaved();
                    }}
                    className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-3 py-2 type-body text-white focus:border-[#E11D2E] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="type-small text-[#A1A1AA]">Verified Instagram URL</label>
                  <input
                    type="url"
                    placeholder="https://www.instagram.com/..."
                    value={cms.site.instagramUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCms((prev) => ({
                        ...prev,
                        site: { ...prev.site, instagramUrl: val },
                      }));
                      flashSaved();
                    }}
                    className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-3 py-2 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="type-small text-[#A1A1AA]">Verified Facebook URL</label>
                  <input
                    type="url"
                    placeholder="https://www.facebook.com/..."
                    value={cms.site.facebookUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateCms((prev) => ({
                        ...prev,
                        site: { ...prev.site, facebookUrl: val },
                      }));
                      flashSaved();
                    }}
                    className="rounded-[12px] border border-[rgba(255,255,255,0.14)] bg-[#0B0B0C] px-3 py-2 type-body text-white placeholder:text-[#A1A1AA] focus:border-[#E11D2E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 flex flex-col gap-4">
              <span className="type-small text-[#A1A1AA]">Design System</span>
              <h2 className="type-subtitle text-white">Official Brand Palette</h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: 'Matte Black', hex: '#0B0B0C' },
                  { name: 'Charcoal', hex: '#161618' },
                  { name: 'Crimson Red', hex: '#E11D2E' },
                  { name: 'Dark Maroon', hex: '#8B0000' },
                  { name: 'Pure White', hex: '#FFFFFF' },
                  { name: 'Light Grey', hex: '#A1A1AA' },
                ].map((swatch) => (
                  <div
                    key={swatch.name}
                    className="rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-[#0B0B0C] p-2.5 flex flex-col gap-1.5"
                  >
                    <div
                      className="h-8 rounded-[8px] border border-[rgba(255,255,255,0.14)]"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="type-small text-white font-medium">
                      {swatch.name}
                    </span>
                    <span className="text-[12px] text-[#A1A1AA] tabular-nums">
                      {swatch.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="mt-container pt-[130px] pb-24">
      <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[30px] p-8 sm:p-12 max-w-[680px] flex flex-col gap-4">
        <span className="type-small text-[#E11D2E]">404 · Page not found</span>
        <h1 className="type-heading text-white">
          That page is not on the floor.
        </h1>
        <p className="type-lead text-[#A1A1AA]">
          The link you followed may have moved. Head back to the main club page, view our weekly schedule, or book a visit.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <ThresButton variant="primary" to="/">
            Back to home
          </ThresButton>
          <ThresButton variant="outline" to="/timetable">
            View timetable
          </ThresButton>
        </div>
      </div>
    </main>
  );
}
