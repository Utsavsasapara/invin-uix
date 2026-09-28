import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner } from 'invin-uix/ui/spinner';
import AppLayout from './layouts/AppLayout.jsx';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const UIGuidePage = lazy(() => import('./pages/demos/UIGuideV2.jsx'));
const ValidateButton = lazy(() => import('./pages/ValidateButton.jsx'));
const DemoLayout = lazy(() => import('./pages/DemoLayout.jsx'));
const SoarApp = lazy(() => import('./pages/apps/SoarApp.jsx'));
const SoarWorkflows = lazy(() => import('./pages/apps/SoarWorkflows.jsx'));
const GsosApp = lazy(() => import('./pages/apps/gsos/GsosApp.jsx'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner size="md" tip="Loading..." />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main layout with sidebar */}
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="ui-guide" element={<UIGuidePage />} />
        </Route>

        {/* Components page has its own full layout (sidebar + component nav) */}
        <Route path="components" element={<DemoLayout />} />

        {/* Isolated component validation — no app layout / no unmigrated components */}
        <Route path="validate" element={<ValidateButton />} />

        {/* Demo apps — each has its own full-page layout */}
        <Route path="apps/soar-dashboard/*" element={<SoarApp />} />
        <Route path="apps/gsos-demo/*" element={<GsosApp />} />

        {/* Catch-all — redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
