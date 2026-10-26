import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { NotificationPanel } from 'invin-uix/ui/notification-panel';
import { Button } from 'invin-uix/ui/button';

/**
 * DemoFrame — wraps each demo so the floating panel renders visibly
 * inside the PlaygroundSection preview area.
 */
function DemoFrame({ children, height = 480 }) {
  return (
    <div
      className="relative w-full rounded-[var(--radius-lg)] border border-[var(--border)] overflow-visible bg-[var(--secondary)]/10"
      style={{ minHeight: height }}
    >
      {/* Mock app topbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--background)]">
        <span className="text-caption text-[var(--muted-foreground)]">
          Application
        </span>
        <div>{children}</div>
      </div>
      {/* Mock content hint */}
      <div className="flex items-center justify-center h-32 text-caption text-[var(--muted-foreground)]/50 select-none">
        ↑ notification panel
      </div>
    </div>
  );
}

/* ─── Shared timestamps ──────────────────────────────────────────────────── */

const NOW = Date.now();
const mins = (n) => new Date(NOW - n * 60 * 1000).toISOString();
const hours = (n) => new Date(NOW - n * 3600 * 1000).toISOString();
const days = (n) => new Date(NOW - n * 86400 * 1000).toISOString();

/* ─── Base cybersecurity items ───────────────────────────────────────────── */

const BASIC_ITEMS = [
  {
    id: 'b1',
    title: 'Critical: Ransomware Activity',
    body: 'File encryption pattern detected on endpoint DESKTOP-22. Immediate isolation recommended.',
    timestamp: mins(3),
    read: false,
    type: 'error',
    priority: 'high',
  },
  {
    id: 'b2',
    title: 'Detection Rule Triggered',
    body: 'SIGMA rule "Lateral Movement via WMI" matched 4 events in the last 15 minutes.',
    timestamp: mins(15),
    read: false,
    type: 'warning',
  },
  {
    id: 'b3',
    title: 'Threat Intelligence Updated',
    body: 'IOC feed refreshed with 1,240 new indicators from MISP threat sharing platform.',
    timestamp: hours(1),
    read: false,
    type: 'info',
  },
  {
    id: 'b4',
    title: 'Weekly Scan Completed',
    body: 'Vulnerability scan finished — 0 critical, 3 medium severity findings.',
    timestamp: hours(2),
    read: true,
    type: 'success',
  },
  {
    id: 'b5',
    title: 'System Health Report',
    body: 'All 42 sensors are operating within normal parameters.',
    timestamp: days(1),
    read: true,
    type: 'default',
  },
  {
    id: 'b6',
    title: 'Brute-force Attempt Blocked',
    body: 'SSH brute-force from 198.51.100.14 blocked after 200 failed attempts.',
    timestamp: days(2),
    read: true,
    type: 'warning',
  },
];

/* ─── All five notification types ───────────────────────────────────────── */

const TYPE_ITEMS = [
  { id: 't1', title: 'System Message (default)', timestamp: mins(1), read: false, type: 'default' },
  { id: 't2', title: 'User logged in from new device (info)', timestamp: mins(2), read: false, type: 'info' },
  { id: 't3', title: 'Incident IR-00842 resolved (success)', timestamp: mins(3), read: false, type: 'success' },
  { id: 't4', title: 'License expires in 14 days (warning)', timestamp: mins(4), read: false, type: 'warning' },
  { id: 't5', title: 'Zero-day exploit in OpenSSL detected (error)', timestamp: mins(5), read: false, type: 'error' },
];

/* ─── Mixed read/unread for filter demo ─────────────────────────────────── */

const FILTER_ITEMS = [
  { id: 'f1', title: 'New SIEM correlation rule deployed', timestamp: mins(5),  read: false, type: 'info' },
  { id: 'f2', title: 'Alert escalated to Tier 2',          timestamp: mins(20), read: false, type: 'warning' },
  { id: 'f3', title: 'EDR agent updated on all endpoints', timestamp: hours(1), read: true,  type: 'success' },
  { id: 'f4', title: 'Threat hunt completed — no findings', timestamp: hours(3), read: true, type: 'default' },
  { id: 'f5', title: 'Suspicious PowerShell detected',      timestamp: hours(4), read: false, type: 'error' },
];

/* ─── Items with action buttons ─────────────────────────────────────────── */

const ACTION_ITEMS = [
  {
    id: 'a1',
    title: 'New integration approval request',
    body: 'Splunk SIEM integration submitted by analyst@corp.com.',
    timestamp: mins(10),
    read: false,
    type: 'info',
    action: { label: 'Review', onClick: () => alert('Review integration') },
  },
  {
    id: 'a2',
    title: 'Scheduled report ready',
    body: 'Monthly executive threat summary is ready for download.',
    timestamp: hours(2),
    read: false,
    type: 'success',
    action: { label: 'Download', onClick: () => alert('Download report') },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Sections
   ═══════════════════════════════════════════════════════════════════════════ */

const BASIC_CODE = `import { useState } from 'react';
import { NotificationPanel } from 'invin-uix/ui/notification-panel';

const items = [
  { id: '1', title: 'Critical: Ransomware Activity',
    body: 'File encryption detected on endpoint DESKTOP-22.',
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    read: false, type: 'error', priority: 'high' },
  { id: '2', title: 'Threat Intelligence Updated',
    body: 'IOC feed refreshed with 1,240 new indicators.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false, type: 'info' },
  { id: '3', title: 'Weekly Scan Completed',
    body: '0 critical, 3 medium severity findings.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true, type: 'success' },
];

function App() {
  const [notifs, setNotifs] = useState(items);

  return (
    <NotificationPanel
      items={notifs}
      onMarkRead={(id) =>
        setNotifs(prev => prev.map(i => i.id === id ? { ...i, read: true } : i))}
      onMarkAllRead={() =>
        setNotifs(prev => prev.map(i => ({ ...i, read: true })))}
      onDismiss={(id) =>
        setNotifs(prev => prev.filter(i => i.id !== id))}
      onViewAll={() => console.log('navigate to /notifications')}
    />
  );
}`;

function BasicExample() {
  const [items, setItems] = useState(BASIC_ITEMS);
  return (
    <PlaygroundSection
      title="Basic usage"
      description="Mixed read and unread items across multiple date groups. Click an item to mark it read, use the header action to mark all read, or click the × to dismiss."
      code={BASIC_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={items}
          open={true}
          onOpenChange={() => {}}
          onMarkRead={(id) =>
            setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)))
          }
          onMarkAllRead={() =>
            setItems((prev) => prev.map((i) => ({ ...i, read: true })))
          }
          onDismiss={(id) =>
            setItems((prev) => prev.filter((i) => i.id !== id))
          }
          onViewAll={() => alert('Navigate to all notifications')}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const TYPES_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// type controls the icon and accent colour shown on the left
const items = [
  { id: '1', title: 'System message (default)', timestamp: new Date().toISOString(), type: 'default' },
  { id: '2', title: 'User logged in from new device (info)', timestamp: new Date().toISOString(), type: 'info' },
  { id: '3', title: 'Incident resolved (success)', timestamp: new Date().toISOString(), type: 'success' },
  { id: '4', title: 'License expires in 14 days (warning)', timestamp: new Date().toISOString(), type: 'warning' },
  { id: '5', title: 'Zero-day exploit detected (error)', timestamp: new Date().toISOString(), type: 'error' },
];

<NotificationPanel items={items} groupByDate={false} />`;

function TypesExample() {
  return (
    <PlaygroundSection
      title="Notification types"
      description="Each type renders a distinct icon and colour: default (bell/muted), info (blue), success (green), warning (amber), error (red)."
      code={TYPES_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={TYPE_ITEMS}
          groupByDate={false}
          open={true}
          onOpenChange={() => {}}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const LOADING_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// Show 4 skeleton rows while fetching
<NotificationPanel items={[]} loading={true} />`;

function LoadingExample() {
  return (
    <PlaygroundSection
      title="Loading state"
      description="Pass loading={true} to show 4 skeleton rows while notifications are being fetched."
      code={LOADING_CODE}
    >
      <DemoFrame>
        <NotificationPanel items={[]} loading={true} open={true} onOpenChange={() => {}} />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const ERROR_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// error={true} shows an error state with optional Retry button
<NotificationPanel
  items={[]}
  error={true}
  onRetry={() => refetchNotifications()}
/>`;

function ErrorExample() {
  const [error, setError] = useState(true);
  return (
    <PlaygroundSection
      title="Error state"
      description="Pass error={true} to show an error message. Supply onRetry to render a Retry button."
      code={ERROR_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={[]}
          error={error}
          open={true}
          onOpenChange={() => {}}
          onRetry={() => {
            setError(false);
            alert('Retry triggered — error cleared');
          }}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const EMPTY_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// Default empty message — "You're all caught up"
<NotificationPanel items={[]} />

// Custom empty message
<NotificationPanel items={[]} emptyMessage="No active alerts right now" />`;

function EmptyExample() {
  return (
    <PlaygroundSection
      title="Empty state"
      description="When items is empty (and not loading or erroring) the empty state is shown. Override the message with emptyMessage."
      code={EMPTY_CODE}
    >
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <p className="text-caption text-[var(--muted-foreground)] mb-2">Default message</p>
          <DemoFrame height={240}>
            <NotificationPanel items={[]} open={true} onOpenChange={() => {}} />
          </DemoFrame>
        </div>
        <div className="flex-1 min-w-[300px]">
          <p className="text-caption text-[var(--muted-foreground)] mb-2">Custom message</p>
          <DemoFrame height={240}>
            <NotificationPanel
              items={[]}
              emptyMessage="No active alerts right now"
              open={true}
              onOpenChange={() => {}}
            />
          </DemoFrame>
        </div>
      </div>
    </PlaygroundSection>
  );
}

const FILTER_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// All / Unread tabs appear automatically when items exist
// defaultFilter sets the initial active tab

<NotificationPanel
  items={items}    // mix of read: true and read: false
  groupByDate={false}
  defaultFilter="all"   // or "unread" to start on the Unread tab
/>

// Controlled filter:
// <NotificationPanel
//   filter={activeFilter}
//   onFilterChange={setActiveFilter}
//   items={items}
// />`;

function FilterExample() {
  return (
    <PlaygroundSection
      title="Unread filter"
      description="The panel shows All and Unread tabs when items exist. The Unread tab count updates in real time."
      code={FILTER_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={FILTER_ITEMS}
          groupByDate={false}
          defaultFilter="all"
          open={true}
          onOpenChange={() => {}}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const TRIGGER_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';
import { Button } from 'invin-uix/ui/button';

// Replace the default bell button with any element
<NotificationPanel
  items={items}
  trigger={
    <Button variant="outline" size="sm">
      Alerts ({unreadCount} new)
    </Button>
  }
/>`;

function CustomTriggerExample() {
  return (
    <PlaygroundSection
      title="Custom trigger"
      description="Replace the default bell button with any element using the trigger prop."
      code={TRIGGER_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={BASIC_ITEMS.slice(0, 3)}
          trigger={
            <Button variant="outline" size="sm">
              Alerts ({BASIC_ITEMS.slice(0, 3).filter((i) => !i.read).length} new)
            </Button>
          }
          groupByDate={false}
          open={true}
          onOpenChange={() => {}}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const NO_GROUP_CODE = `import { NotificationPanel } from 'invin-uix/ui/notification-panel';

// groupByDate={false} renders a flat list — no Today/Yesterday headers
<NotificationPanel items={items} groupByDate={false} />`;

function NoGroupingExample() {
  return (
    <PlaygroundSection
      title="No date grouping"
      description="Pass groupByDate={false} to render a flat list without Today / Yesterday / This week headers."
      code={NO_GROUP_CODE}
    >
      <DemoFrame>
        <NotificationPanel
          items={BASIC_ITEMS}
          groupByDate={false}
          open={true}
          onOpenChange={() => {}}
        />
      </DemoFrame>
    </PlaygroundSection>
  );
}

const INTERACTIVE_CODE = `import { useState } from 'react';
import { NotificationPanel } from 'invin-uix/ui/notification-panel';

const items = [
  { id: 'a1', title: 'New integration approval request',
    body: 'Splunk SIEM integration submitted by analyst@corp.com.',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    read: false, type: 'info',
    action: { label: 'Review', onClick: () => console.log('review') } },
  { id: 'a2', title: 'Scheduled report ready',
    body: 'Monthly executive threat summary is ready for download.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false, type: 'success',
    action: { label: 'Download', onClick: () => console.log('download') } },
];

function App() {
  const [notifs, setNotifs] = useState(items);

  return (
    <NotificationPanel
      items={notifs}
      onMarkRead={(id) =>
        setNotifs(prev => prev.map(i => i.id === id ? { ...i, read: true } : i))}
      onMarkAllRead={() =>
        setNotifs(prev => prev.map(i => ({ ...i, read: true })))}
      onDismiss={(id) =>
        setNotifs(prev => prev.filter(i => i.id !== id))}
      onViewAll={() => console.log('view all')}
      groupByDate={false}
    />
  );
}`;

function InteractiveExample() {
  const [items, setItems] = useState(ACTION_ITEMS);
  const [log, setLog] = useState([]);

  const addLog = (msg) => setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 4)]);

  return (
    <PlaygroundSection
      title="Mark read & dismiss — interactive"
      description="Click an item to mark it read, click the × to dismiss, or use the Mark all read header action. Events are logged below."
      code={INTERACTIVE_CODE}
    >
      <div className="space-y-4">
        <DemoFrame>
          {/* No open={true} — user clicks to open */}
          <NotificationPanel
            items={items}
            onMarkRead={(id) => {
              addLog(`onMarkRead("${id}")`);
              setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)));
            }}
            onMarkAllRead={() => {
              addLog('onMarkAllRead()');
              setItems((prev) => prev.map((i) => ({ ...i, read: true })));
            }}
            onDismiss={(id) => {
              addLog(`onDismiss("${id}")`);
              setItems((prev) => prev.filter((i) => i.id !== id));
            }}
            onViewAll={() => addLog('onViewAll()')}
            groupByDate={false}
          />
        </DemoFrame>
        <p className="text-caption text-[var(--muted-foreground)]">
          Click the bell icon above → interact with items → events log below.
        </p>
        {log.length > 0 && (
          <div className="space-y-1 rounded-[var(--radius-md)] bg-[var(--muted)] p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Event log</p>
            {log.map((entry, i) => (
              <p key={i} className="font-mono text-xs text-[var(--foreground)]">{entry}</p>
            ))}
          </div>
        )}
        {items.length === 0 && (
          <Button variant="outline" size="sm" onClick={() => { setItems(ACTION_ITEMS); setLog([]); }}>
            Reset
          </Button>
        )}
      </div>
    </PlaygroundSection>
  );
}

/* ─── Props table ────────────────────────────────────────────────────────── */

const PROPS = [
  { name: 'items', type: 'NotificationItem[]', required: true, description: 'Notification items to display.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loading rows.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Show error state.' },
  { name: 'onRetry', type: '() => void', required: false, description: 'Adds a Retry button in the error state.' },
  { name: 'onMarkAllRead', type: '() => void', required: false, description: 'Adds "Mark all read" to header when unread items exist.' },
  { name: 'onMarkRead', type: '(id: string) => void', required: false, description: 'Item row becomes a button; called with item id on click.' },
  { name: 'onDismiss', type: '(id: string) => void', required: false, description: 'Adds a dismiss × button per item; called with item id.' },
  { name: 'onViewAll', type: '() => void', required: false, description: 'Adds a "View all notifications →" footer button.' },
  { name: 'emptyMessage', type: 'string', default: "'You\\'re all caught up'", description: 'Message shown when items is empty.' },
  { name: 'groupByDate', type: 'boolean', default: 'true', description: 'Group items by date (Today / Yesterday / This week / Earlier).' },
  { name: 'defaultFilter', type: "'all' | 'unread'", default: "'all'", description: 'Initial active filter tab.' },
  { name: 'filter', type: "'all' | 'unread'", required: false, description: 'Controlled active filter tab. Use with onFilterChange for controlled mode.' },
  { name: 'onFilterChange', type: "(filter: 'all' | 'unread') => void", required: false, description: 'Called when the user switches filter tabs.' },
  { name: 'maxHeight', type: 'number | string', default: '480', description: "Max height for scrollable content. Number = px (e.g. 480). String = any CSS value (e.g. '50vh', 'calc(100vh - 200px)'). Default: 480." },
  { name: 'side', type: "'bottom' | 'top' | 'left' | 'right'", default: "'bottom'", description: 'Popover side.' },
  { name: 'align', type: "'start' | 'center' | 'end'", default: "'end'", description: 'Popover alignment.' },
  { name: 'open', type: 'boolean', required: false, description: 'Controlled open state.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', required: false, description: 'Called when open state changes.' },
  { name: 'trigger', type: 'React.ReactNode', required: false, description: 'Custom trigger element. Omit to use the default bell button.' },
  { name: 'title', type: 'string', default: "'Notifications'", description: 'Panel header title.' },
  { name: 'className', type: 'string', required: false, description: 'Extra class forwarded to the PopoverContent root.' },
];

const ITEM_PROPS = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier.' },
  { name: 'title', type: 'string', required: true, description: 'Notification title text.' },
  { name: 'body', type: 'string', required: false, description: 'Optional body / description text.' },
  { name: 'timestamp', type: 'string | Date', required: true, description: 'ISO string or Date object — used for relative time display and date grouping.' },
  { name: 'read', type: 'boolean', required: false, description: 'Whether the item has been read. Treated as unread if omitted.' },
  { name: 'type', type: "'default' | 'info' | 'success' | 'warning' | 'error'", required: false, description: 'Controls the icon and accent colour.' },
  { name: 'priority', type: "'normal' | 'high'", required: false, description: 'Controls the unread priority dot style.' },
  { name: 'avatar', type: 'string', required: false, description: 'Avatar image URL. Shown instead of type icon when present.' },
  { name: 'href', type: 'string', required: false, description: 'When set, item row renders as an <a> element.' },
  { name: 'action', type: '{ label: string; onClick: () => void }', required: false, description: 'Optional inline action button rendered below the body text.' },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function NotificationPanelDemo() {
  return (
    <ComponentPage
      name="Notification Panel"
      description="Bell-triggered popover panel for in-app notifications. Supports date grouping, All/Unread filtering, type icons, priority dots, avatars, action buttons, dismiss, mark read, loading skeleton, error state, and controlled open."
      importCode={`import { NotificationPanel } from 'invin-uix/ui/notification-panel';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >
      <BasicExample />
      <TypesExample />
      <FilterExample />
      <LoadingExample />
      <ErrorExample />
      <EmptyExample />
      <CustomTriggerExample />
      <NoGroupingExample />
      <InteractiveExample />

      <PlaygroundSection title="Props">
        <PropsTable props={PROPS} />
      </PlaygroundSection>

      <PlaygroundSection title="NotificationItem">
        <PropsTable props={ITEM_PROPS} />
      </PlaygroundSection>
    </ComponentPage>
  );
}
