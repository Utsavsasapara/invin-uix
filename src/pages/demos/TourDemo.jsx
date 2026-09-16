import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Tour, TourFAB } from 'invin-uix/ui/tour';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { KpiCard } from 'invin-uix/ui/kpi-card';
import { Users, Pulse, CreditCard, Layout, Gear, ChartBar } from 'invin-uix/ui/icons';

export default function TourDemo() {
  const [singleTour, setSingleTour] = useState(false);
  const [sectionTour, setSectionTour] = useState(false);

  // Basic tour steps with icons (UI Guide v2.0 style)
  const basicSteps = [
    {
      target: '#tour-demo-stats',
      title: 'KPI Overview',
      description: 'These cards show your key metrics at a glance. Click any card to drill down into details.',
      icon: <Layout style={{ width: 18, height: 18 }} />,
      section: 'DASHBOARD',
      placement: 'bottom',
    },
    {
      target: '#tour-demo-table',
      title: 'Recent Activity',
      description: 'Track recent events and actions. Badge colours indicate status — green for success, amber for pending.',
      icon: <Pulse style={{ width: 18, height: 18 }} />,
      section: 'DASHBOARD',
      placement: 'top',
    },
    {
      target: '#tour-demo-actions',
      title: 'Quick Actions',
      description: 'Common actions are always accessible here. Export data, create new items, or open settings.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'DASHBOARD',
      placement: 'left',
    },
  ];

  // Section-based tour with chapter navigation (12+ steps demo)
  const sectionSteps = [
    // Dashboard section (0-3)
    {
      target: '#tour-demo-stats',
      title: 'Dashboard Overview',
      description: 'Start with your key performance indicators. Each card updates in real-time.',
      icon: <Layout style={{ width: 18, height: 18 }} />,
      section: 'dashboard',
    },
    {
      target: '#tour-demo-table',
      title: 'Activity Feed',
      description: 'Monitor recent system events and user actions in this feed.',
      icon: <Pulse style={{ width: 18, height: 18 }} />,
      section: 'dashboard',
    },
    {
      target: '#tour-demo-actions',
      title: 'Dashboard Actions',
      description: 'Quick access to common dashboard operations.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'dashboard',
    },
    // Analytics section (3-6)
    {
      target: '#tour-demo-stats',
      title: 'Metrics Deep Dive',
      description: 'Click any KPI to see detailed analytics and historical trends.',
      icon: <ChartBar style={{ width: 18, height: 18 }} />,
      section: 'analytics',
    },
    {
      target: '#tour-demo-table',
      title: 'Event Analytics',
      description: 'Filter and search through events to find patterns.',
      icon: <ChartBar style={{ width: 18, height: 18 }} />,
      section: 'analytics',
    },
    {
      target: '#tour-demo-actions',
      title: 'Export Reports',
      description: 'Generate and download analytics reports in various formats.',
      icon: <ChartBar style={{ width: 18, height: 18 }} />,
      section: 'analytics',
    },
    // Settings section (6-9)
    {
      target: '#tour-demo-stats',
      title: 'Configure KPIs',
      description: 'Choose which metrics appear on your dashboard.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'settings',
    },
    {
      target: '#tour-demo-table',
      title: 'Notification Settings',
      description: 'Configure alerts for specific event types.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'settings',
    },
    {
      target: '#tour-demo-actions',
      title: 'Action Permissions',
      description: 'Manage who can perform which actions.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'settings',
    },
    // Advanced section (9-12)
    {
      target: '#tour-demo-stats',
      title: 'Custom Widgets',
      description: 'Create custom KPI widgets with formulas and thresholds.',
      icon: <Layout style={{ width: 18, height: 18 }} />,
      section: 'advanced',
    },
    {
      target: '#tour-demo-table',
      title: 'Audit Logs',
      description: 'Review detailed audit trails for compliance.',
      icon: <Pulse style={{ width: 18, height: 18 }} />,
      section: 'advanced',
    },
    {
      target: '#tour-demo-actions',
      title: 'Tour Complete!',
      description: 'You\'ve completed the tour. Use keyboard shortcuts: Escape to close, Arrow keys to navigate.',
      icon: <Gear style={{ width: 18, height: 18 }} />,
      section: 'advanced',
    },
  ];

  // Sections for chapter navigation
  const tourSections = [
    { key: 'dashboard', label: 'Dashboard', icon: <Layout style={{ width: 14, height: 14 }} />, startIndex: 0 },
    { key: 'analytics', label: 'Analytics', icon: <ChartBar style={{ width: 14, height: 14 }} />, startIndex: 3 },
    { key: 'settings', label: 'Settings', icon: <Gear style={{ width: 14, height: 14 }} />, startIndex: 6 },
    { key: 'advanced', label: 'Advanced', icon: <Pulse style={{ width: 14, height: 14 }} />, startIndex: 9 },
  ];

  return (
    <ComponentPage
      name="Tour"
      description="Guided product tour with UI Guide v2.0 standard card design. Features progress rail, icon headers, keyboard navigation, and chapter dropdown for long tours."
      importCode={`import { Tour, TourFAB } from 'invin-uix/ui/tour';`}
    >
      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Tour Playground"
        description="Click to start a tour demonstration. The tour card follows UI Guide v2.0 §16 standard."
        controls={[]}
      >
        {() => (
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSingleTour(true)}>
              Basic Tour (3 steps)
            </Button>
            <Button variant="outline" onClick={() => setSectionTour(true)}>
              Section Tour (12 steps)
            </Button>
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      {/* ─── Props Tables ───────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">Tour</p>
        <PropsTable
          props={[
            { name: 'steps', type: 'TourStep[]', default: '—', description: 'Array of tour steps with target, title, description, icon' },
            { name: 'sections', type: 'TourSection[]', default: '—', description: 'Sections for chapter navigation (auto-enabled at 12+ steps)' },
            { name: 'open', type: 'boolean', default: 'false', description: 'Whether the tour is visible' },
            { name: 'onClose', type: '() => void', default: '—', description: 'Called on X, Skip, or Finish' },
            { name: 'onFinish', type: '() => void', default: '—', description: 'Called specifically when last step completes' },
            { name: 'startAt', type: 'number', default: '0', description: 'Starting step index' },
            { name: 'highlightPadding', type: 'number (px)', default: '8', description: 'Padding around highlighted element' },
            { name: 'showChapterNav', type: 'boolean', default: 'auto', description: 'Show chapter dropdown (auto at 12+ steps with sections)' },
            { name: 'currentPage', type: 'string', default: '—', description: 'Current route path (for cross-page tour)' },
            { name: 'onNavigate', type: '(path: string) => void', default: '—', description: 'Called when tour needs to navigate to a different page' },
            { name: 'navigationDelay', type: 'number (ms)', default: '500', description: 'Wait time after navigation before highlighting' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">TourStep</p>
        <PropsTable
          props={[
            { name: 'target', type: 'string', default: '—', description: 'CSS selector for the element to highlight' },
            { name: 'title', type: 'string', default: '—', description: 'Step title (16px semibold)' },
            { name: 'description', type: 'ReactNode', default: '—', description: 'Step description (14px, max 3 lines)' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon shown beside title (18px recommended)' },
            { name: 'section', type: 'string', default: '—', description: 'Section key for chapter navigation' },
            { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'right'", description: 'Popup position relative to target' },
            { name: 'page', type: 'string', default: '—', description: 'Route path this step belongs to (cross-page)' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">TourSection</p>
        <PropsTable
          props={[
            { name: 'key', type: 'string', default: '—', description: 'Unique section identifier' },
            { name: 'label', type: 'string', default: '—', description: 'Section display name in dropdown' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon for section in dropdown' },
            { name: 'startIndex', type: 'number', default: '—', description: 'Step index where this section begins' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">TourFAB</p>
        <PropsTable
          props={[
            { name: 'label', type: 'string', default: "'Take the tour'", description: 'Button text' },
            { name: 'position', type: "'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: 'FAB position on screen' },
            { name: 'onClick', type: '() => void', default: '—', description: 'Click handler (typically opens the tour)' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Design Specs ───────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">UI Guide v2.0 Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-3 text-center">
              <p className="text-[24px] font-[700] text-[var(--primary)]">380px</p>
              <p className="text-[12px] text-[var(--muted-foreground)]">Card Width</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3 text-center">
              <p className="text-[24px] font-[700] text-[var(--primary)]">14px</p>
              <p className="text-[12px] text-[var(--muted-foreground)]">Border Radius</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3 text-center">
              <p className="text-[24px] font-[700] text-[var(--primary)]">3px</p>
              <p className="text-[12px] text-[var(--muted-foreground)]">Progress Rail</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3 text-center">
              <p className="text-[24px] font-[700] text-[var(--primary)]">30%</p>
              <p className="text-[12px] text-[var(--muted-foreground)]">Border Opacity</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator variant="bold" />

      {/* ─── Keyboard Navigation ────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Keyboard Navigation</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="font-mono">Escape</Badge>
          <span className="text-[var(--muted-foreground)]">Close tour</span>
          <Badge variant="secondary" className="font-mono">→ ↓</Badge>
          <span className="text-[var(--muted-foreground)]">Next step</span>
          <Badge variant="secondary" className="font-mono">← ↑</Badge>
          <span className="text-[var(--muted-foreground)]">Previous step</span>
        </div>
      </div>

      <Separator variant="bold" />

      {/* ─── Demo Content (targets for tour) ────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Live Demo</h3>
        <p className="text-[var(--muted-foreground)]">Click the buttons below to start a tour. The tour will highlight each section.</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setSingleTour(true)}>
          Basic Tour (3 steps)
        </Button>
        <Button variant="outline" onClick={() => setSectionTour(true)}>
          Section Tour (12 steps with chapters)
        </Button>
      </div>

      {/* Target: KPI Stats */}
      <div id="tour-demo-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard 
          label="Total Users" 
          value="2,350" 
          trend={{ value: '+12.5%', direction: 'up' }}
          icon={<Users style={{ width: 14, height: 14 }} />} 
        />
        <KpiCard 
          label="Active Now" 
          value="573" 
          trend={{ value: '+8%', direction: 'up' }}
          icon={<Pulse style={{ width: 14, height: 14 }} />} 
        />
        <KpiCard 
          label="Revenue" 
          value="$45,231" 
          trend={{ value: '+20.1%', direction: 'up' }}
          icon={<CreditCard style={{ width: 14, height: 14 }} />} 
        />
      </div>

      {/* Target: Pulse Table */}
      <Card id="tour-demo-table">
        <CardContent className="py-4">
          <p className="text-[var(--foreground)] font-[600] mb-3">Recent Activity</p>
          <div className="space-y-2">
            {[
              { action: 'User signed up', time: '2 min ago', status: 'success' },
              { action: 'Payment processed', time: '5 min ago', status: 'success' },
              { action: 'Export queued', time: '12 min ago', status: 'warning' },
              { action: 'Report generated', time: '1 hour ago', status: 'success' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                <span className="text-[var(--foreground)]">{item.action}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--muted-foreground)]">{item.time}</span>
                  <Badge variant={item.status === 'success' ? 'success' : 'warning'} size="sm">{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target: Actions */}
      <div id="tour-demo-actions" className="flex gap-3">
        <Button>Export Data</Button>
        <Button variant="outline">Create New</Button>
        <Button variant="ghost">Settings</Button>
      </div>

      {/* Tour instances */}
      <Tour
        steps={basicSteps}
        open={singleTour}
        onClose={() => setSingleTour(false)}
      />

      <Tour
        steps={sectionSteps}
        sections={tourSections}
        open={sectionTour}
        onClose={() => setSectionTour(false)}
        showChapterNav
      />

      <Separator variant="bold" />

      {/* ─── Usage Examples ─────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Usage Examples</h3>
      </div>

      <PlaygroundSection
        title="Basic Tour with Icons"
        description="Simple tour with icon headers (UI Guide v2.0 standard)."
        code={`const [showTour, setShowTour] = useState(false);

const steps = [
  {
    target: '#dashboard',
    title: 'Dashboard Overview',
    description: 'Track your key metrics here.',
    icon: <LayoutDashboard style={{ width: 18, height: 18 }} />,
    section: 'DASHBOARD',
  },
  {
    target: '#analytics',
    title: 'Analytics',
    description: 'Visual trends over time.',
    icon: <BarChart2 style={{ width: 18, height: 18 }} />,
    section: 'ANALYTICS',
    placement: 'right',
  },
];

<Tour steps={steps} open={showTour} onClose={() => setShowTour(false)} />
<TourFAB onClick={() => setShowTour(true)} />`}
      >
        <p className="text-[var(--muted-foreground)]">Click "Basic Tour" above to see this in action.</p>
      </PlaygroundSection>

      <PlaygroundSection
        title="Section-Based Tour with Chapters"
        description="For tours with 12+ steps, enable chapter navigation with sections. Users can jump to any chapter."
        code={`const steps = [
  { target: '#step1', title: 'Step 1', section: 'intro', ... },
  { target: '#step2', title: 'Step 2', section: 'intro', ... },
  { target: '#step3', title: 'Step 3', section: 'features', ... },
  // ... more steps
];

const sections = [
  { key: 'intro', label: 'Introduction', icon: <BookOpen />, startIndex: 0 },
  { key: 'features', label: 'Features', icon: <Sparkles />, startIndex: 2 },
  { key: 'settings', label: 'Settings', icon: <Settings />, startIndex: 6 },
];

<Tour
  steps={steps}
  sections={sections}
  open={showTour}
  onClose={() => setShowTour(false)}
  showChapterNav  // Auto-enabled at 12+ steps with sections
/>`}
      >
        <p className="text-[var(--muted-foreground)]">Click "Section Tour" above. Notice the chapter dropdown in the footer.</p>
      </PlaygroundSection>

      <PlaygroundSection
        title="Cross-page Tour"
        description="Steps can include a `page` property. When the tour reaches a step on a different page, it calls onNavigate() and waits."
        code={`import { useNavigate, useLocation } from 'react-router-dom';

const navigate = useNavigate();
const location = useLocation();

const steps = [
  { target: '#stats', title: 'Metrics', page: '/dashboard', icon: <LayoutDashboard /> },
  { target: '#workflows', title: 'Workflows', page: '/workflows', icon: <Workflow /> },
  { target: '#settings', title: 'Settings', page: '/settings', icon: <Settings /> },
];

<Tour
  steps={steps}
  open={showTour}
  onClose={() => setShowTour(false)}
  currentPage={location.pathname}
  onNavigate={(path) => navigate(path)}
/>`}
      >
        <p className="text-[var(--muted-foreground)]">Cross-page tours navigate automatically between routes.</p>
      </PlaygroundSection>

      <PlaygroundSection
        title="TourFAB Positioning"
        description="The floating action button can be positioned bottom-right or bottom-left."
        code={`<TourFAB position="bottom-right" onClick={() => setShowTour(true)} />
<TourFAB position="bottom-left" label="Need help?" onClick={() => setShowHelp(true)} />`}
      >
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => setSingleTour(true)}>Preview FAB (starts tour)</Button>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
