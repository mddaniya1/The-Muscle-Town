import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCms } from '../cms/CmsContext';
import { ClosingCta } from '../components/ClosingCta';
import { HeroAppear, ScrollReveal } from '../components/MotionPrimitives';
import {
  PageHead,
  SectionHeader,
  ThresButton,
  ZonePhoto,
} from '../components/Primitives';
import { Link } from '../router';

export function JournalPage() {
  const { cms } = useCms();
  const featured =
    cms.journal.find((a) => a.featured) || cms.journal[0];

  return (
    <main>
      <PageHead
        label="Journal"
        line1="Training notes"
        line2="from the floor."
        lead="Practical guidance on progressive strength training, cardio and HIIT balance, recovery habits, and making the most of your first club visit."
      />

      {/* Featured Article Card */}
      {featured && (
        <section className="mt-container">
          <HeroAppear step={3}>
            <Link
              to={`/journal/${featured.slug}`}
              className="group bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[30px] p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-0.5"
            >
              <ZonePhoto
                src={featured.image}
                alt={featured.title}
                className="lg:col-span-6 h-[260px] lg:h-[400px] rounded-[22px]"
                accentColor={cms.site.accentColor}
              />
              <div className="lg:col-span-6 p-4 md:p-6 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
                    <span>{featured.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="type-title text-white">{featured.title}</h2>
                  <p className="type-lead text-[#A1A1AA]">{featured.excerpt}</p>
                </div>
                <div>
                  <span className="inline-flex items-center justify-center rounded-full bg-[#E11D2E] text-white px-5 py-3 type-label group-hover:bg-[#8B0000] transition-colors duration-200">
                    Read the article
                  </span>
                </div>
              </div>
            </Link>
          </HeroAppear>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="All articles"
          line1="Everything"
          line2="we have published."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cms.journal.map((article, idx) => (
            <ScrollReveal key={article.id} index={idx} className="h-full">
              <Link
                to={`/journal/${article.slug}`}
                className="group h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[30px] p-[10px] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
              >
                <ZonePhoto
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[240px] rounded-[22px]"
                  accentColor={cms.site.accentColor}
                />
                <div className="px-4 pt-5 pb-5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="type-subtitle text-white">{article.title}</h3>
                  <p className="type-body text-[#A1A1AA]">{article.excerpt}</p>
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

export function ArticleDetailPage({ slug }: { slug: string }) {
  const { cms } = useCms();
  const article = cms.journal.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="mt-container pt-[130px] pb-20">
        <div className="bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[30px] p-8 md:p-12 max-w-[680px]">
          <span className="type-small text-[#A1A1AA]">Article not found</span>
          <h1 className="type-title text-white mt-2">
            We could not find that journal guide.
          </h1>
          <div className="mt-6">
            <ThresButton variant="primary" to="/journal">
              Back to journal
            </ThresButton>
          </div>
        </div>
      </main>
    );
  }

  const others = cms.journal.filter((a) => a.slug !== article.slug);

  return (
    <main>
      <article className="mt-container pt-[104px] md:pt-[120px]">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 type-small text-[#A1A1AA] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>All articles</span>
        </Link>

        <div className="max-w-[820px] flex flex-col gap-4">
          <HeroAppear step={0}>
            <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
          </HeroAppear>
          <HeroAppear step={1} keepVisibleOpacity>
            <h1 className="type-article-title text-white">{article.title}</h1>
          </HeroAppear>
          <HeroAppear step={2}>
            <p className="type-lead text-[#A1A1AA]">{article.excerpt}</p>
          </HeroAppear>
        </div>

        <HeroAppear step={3} className="group mt-8 h-[280px] sm:h-[420px] md:h-[480px] rounded-[28px] md:rounded-[30px] overflow-hidden">
          <ZonePhoto
            src={article.image}
            alt={article.title}
            className="w-full h-full rounded-[28px] md:rounded-[30px]"
            alwaysColor
          />
        </HeroAppear>

        <div className="mt-8 bg-[#161618] border border-[rgba(255,255,255,0.08)] rounded-[28px] md:rounded-[30px] p-7 sm:p-10 md:p-12 max-w-[820px] mx-auto flex flex-col gap-6">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              {sec.heading && (
                <h2 className="type-article-heading text-white mt-2">
                  {sec.heading}
                </h2>
              )}
              {sec.subheading && (
                <h3 className="type-article-sub text-white mt-1">
                  {sec.subheading}
                </h3>
              )}
              {sec.paragraphs?.map((p, i) => (
                <p key={i} className="type-article-body text-[#A1A1AA]">
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="list-disc pl-6 flex flex-col gap-2 type-article-body text-[#A1A1AA]">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Keep reading */}
      <section className="mt-container mt-section-gap">
        <SectionHeader
          label="Keep reading"
          line1="More from"
          line2="the training floor."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {others.map((other, idx) => (
            <ScrollReveal key={other.id} index={idx} className="h-full">
              <Link
                to={`/journal/${other.slug}`}
                className="group h-full bg-[#161618] border border-[rgba(255,255,255,0.08)] hover:border-[#E11D2E]/50 rounded-[30px] p-[10px] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1"
              >
                <ZonePhoto
                  src={other.image}
                  alt={other.title}
                  className="w-full h-[200px] rounded-[22px]"
                  accentColor={cms.site.accentColor}
                />
                <div className="px-4 pt-4 pb-5">
                  <div className="flex items-center gap-2 type-small text-[#A1A1AA]">
                    <span>{other.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{other.readTime}</span>
                  </div>
                  <h3 className="type-card-title text-white mt-1.5">
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
