/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { MotionConfig } from 'motion/react';
import { CmsProvider } from './cms/CmsContext';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ClassesPage, ProgramDetailPage } from './pages/ClassesPages';
import { CoachDetailPage, CoachesPage } from './pages/CoachesPages';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage, JournalPage } from './pages/JournalPages';
import {
  NotFoundPage,
  PrivacyPage,
  StyleGuideCmsPage,
  TermsPage,
} from './pages/LegalAndSystemPages';
import { MembershipPage } from './pages/MembershipPage';
import { StudioPage, VisitPage } from './pages/StudioVisitPages';
import { TimetablePage } from './pages/TimetablePage';
import { RouterProvider, useRouter } from './router';

function AppRoutes() {
  const { path } = useRouter();
  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/') return <HomePage />;
  if (normalized === '/timetable') return <TimetablePage />;
  if (normalized === '/classes') return <ClassesPage />;
  if (normalized.startsWith('/classes/')) {
    return <ProgramDetailPage slug={normalized.slice('/classes/'.length)} />;
  }
  if (normalized === '/coaches') return <CoachesPage />;
  if (normalized.startsWith('/coaches/')) {
    return <CoachDetailPage slug={normalized.slice('/coaches/'.length)} />;
  }
  if (normalized === '/membership') return <MembershipPage />;
  if (normalized === '/journal') return <JournalPage />;
  if (normalized.startsWith('/journal/')) {
    return <ArticleDetailPage slug={normalized.slice('/journal/'.length)} />;
  }
  if (normalized === '/studio') return <StudioPage />;
  if (normalized === '/visit') return <VisitPage />;
  if (normalized === '/privacy' || normalized === '/legal/privacy') {
    return <PrivacyPage />;
  }
  if (normalized === '/terms' || normalized === '/legal/terms') {
    return <TermsPage />;
  }
  if (normalized === '/style-guide') return <StyleGuideCmsPage />;

  return <NotFoundPage />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CmsProvider>
        <RouterProvider>
          <div className="min-h-screen flex flex-col bg-[#0B0B0C] text-white">
            <Navbar />
            <div className="flex-1">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </RouterProvider>
      </CmsProvider>
    </MotionConfig>
  );
}
