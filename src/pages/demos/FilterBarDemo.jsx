import { useMemo, useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { FilterBar } from 'invin-uix/ui/filter-bar';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

const SAMPLE = [
  { id: '1', label: 'Severity', value: 'Critical', color: 'destructive' },
  { id: '2', label: 'Status', operator: 'is', value: 'Open' },
  { id: '3', label: 'Assignee', value: 'Alice J.' },
];

const MANY = [
  { id: 'm1', label: 'Severity', value: 'Critical', color: 'destructive' },
  { id: 'm2', label: 'Status', operator: 'is', value: 'Open' },
  { id: 'm3', label: 'Assignee', value: 'Alice J.' },
  { id: 'm4', label: 'Source', value: 'EDR', color: 'info' },
  { id: 'm5', label: 'Region', operator: 'is', value: 'EU' },
  { id: 'm6', label: 'Tag', value: 'phishing', color: 'warning' },
  { id: 'm7', label: 'Age', operator: '<', value: '24h' },
];

/** A FilterBar that really removes, adds and clears: the way a consumer wires it */
function LiveBar({ initial, extra, ...props }) {
  const [filters, setFilters] = useState(initial);
  const [log, setLog] = useState('');
  return (
    <div className="w-full space-y-3">
      <FilterBar
        filters={filters}
        onRemove={(id) => {
          setLog(`onRemove("${id}")`);
          setFilters((current) => current.filter((f) => f.id !== id));
        }}
        onClearAll={() => {
          setLog('onClearAll()');
          setFilters([]);
        }}
        onAdd={() => {
          setLog('onAdd()');
          setFilters((current) => {
            const next = (extra ?? [])[current.length % (extra ?? []).length] ?? { label: 'Filter', value: 'New' };
            return [...current, { ...next, id: `added-${Date.now()}-${current.length}` }];
          });
        }}
        {...props}
      />
      <p className="text-caption text-[var(--muted-foreground)]">
        Last call: <span className="font-mono">{log || '—'}</span>
      </p>
    </div>
  );
}

const EXTRA = [
  { label: 'Severity', operator: 'is', value: 'High', color: 'warning' },
  { label: 'Status', operator: 'is not', value: 'Closed', color: 'success' },
  { label: 'Source', value: 'Firewall', color: 'info' },
  { label: 'Owner', value: 'Me', color: 'accent' },
];

const ALERTS = [
  { id: 'a1', title: 'Impossible travel sign-in', severity: 'Critical', status: 'Open' },
  { id: 'a2', title: 'Malware beacon blocked', severity: 'High', status: 'Open' },
  { id: 'a3', title: 'New admin account created', severity: 'High', status: 'Resolved' },
  { id: 'a4', title: 'Port scan from 203.0.113.9', severity: 'Medium', status: 'Open' },
  { id: 'a5', title: 'Failed login burst', severity: 'Medium', status: 'Resolved' },
  { id: 'a6', title: 'Outdated TLS certificate', severity: 'Low', status: 'Open' },
];

const QUICK = [
  { label: 'Severity', operator: 'is', value: 'Critical', field: 'severity', color: 'destructive' },
  { label: 'Severity', operator: 'is', value: 'High', field: 'severity', color: 'warning' },
  { label: 'Status', operator: 'is', value: 'Open', field: 'status' },
  { label: 'Status', operator: 'is', value: 'Resolved', field: 'status', color: 'success' },
];

/** Filters that actually narrow a list; the bar is the only filter UI */
function FilteredList() {
  const [filters, setFilters] = useState([{ id: 'q-status-open', ...QUICK[2] }]);
  // Filters on the same field are OR-ed, different fields are AND-ed
  const rows = useMemo(() => {
    const byField = {};
    for (const f of filters) (byField[f.field] ??= []).push(f.value);
    return ALERTS.filter((a) => Object.entries(byField).every(([field, values]) => values.includes(a[field])));
  }, [filters]);

  const unused = QUICK.filter((q) => !filters.some((f) => f.value === q.value && f.field === q.field));

  return (
    <div className="w-full max-w-2xl space-y-3">
      <FilterBar
        filters={filters}
        onRemove={(id) => setFilters((current) => current.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
        onAdd={() => {
          const next = unused[0];
          if (next) setFilters((current) => [...current, { ...next, id: `q-${next.field}-${next.value}` }]);
        }}
        showAddButton={unused.length > 0}
      />
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y divide-[var(--border)]" aria-label="Alerts">
            {rows.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-4 px-4 py-2.5 text-body">
                <span className="text-[var(--foreground)]">{a.title}</span>
                <span className="text-caption text-[var(--muted-foreground)]">
                  {a.severity} · {a.status}
                </span>
              </li>
            ))}
            {rows.length === 0 && (
              <li className="px-4 py-6 text-center text-body text-[var(--muted-foreground)]">No alerts match these filters.</li>
            )}
          </ul>
        </CardContent>
      </Card>
      <p className="text-caption text-[var(--muted-foreground)]" aria-live="polite">
        {rows.length} of {ALERTS.length} alerts
      </p>
    </div>
  );
}

export default function FilterBarDemo() {
  return (
    <ComponentPage
      name="FilterBar"
      description="The active filters of a list or table as dismissable pills, with an Add filter button, Clear all, per-filter colours, operators and a +N more overflow badge. It only displays state: you own the filters array."
      importCode={`import { FilterBar } from 'invin-uix/ui/filter-bar';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Remove, add and clear pills for real. The pills are live: Add filter appends the next sample, and the focus moves on when you remove one with the keyboard."
        controls={[
          { name: 'addLabel', label: 'Add label', type: 'text', default: 'Add filter' },
          { name: 'showAddButton', label: 'Show add button', type: 'boolean', default: true },
          {
            name: 'showClearAll',
            label: 'Clear all',
            type: 'select',
            default: 'auto',
            options: [
              { value: 'auto', label: 'Auto (more than one filter)' },
              { value: 'show', label: 'Always show' },
              { value: 'hide', label: 'Hide' },
            ],
          },
          { name: 'maxVisible', label: 'Max visible (0 = show all)', type: 'number', default: 0, min: 0, max: 7, step: 1 },
          { name: 'readOnly', label: 'Read-only (no onRemove)', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <LiveBar
            key={`${props.readOnly}`}
            initial={MANY}
            extra={EXTRA}
            addLabel={props.addLabel || undefined}
            showAddButton={props.showAddButton}
            showClearAll={props.showClearAll === 'auto' ? undefined : props.showClearAll === 'show'}
            maxVisible={props.maxVisible > 0 ? props.maxVisible : undefined}
            {...(props.readOnly ? { onRemove: undefined } : {})}
          />
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'filters', type: 'FilterItem[]', default: '—', description: 'Active filters, one pill each. Ids must be unique (required)' },
          { name: 'onRemove', type: '(id: string) => void', default: '—', description: "Called when a pill's × is clicked. Without it the pills are read-only" },
          { name: 'onAdd', type: '() => void', default: '—', description: "Called when 'Add filter' is clicked" },
          { name: 'onClearAll', type: '() => void', default: '—', description: "Called when 'Clear all' is clicked" },
          { name: 'addLabel', type: 'string', default: "'Add filter'", description: 'Text of the add button' },
          { name: 'showClearAll', type: 'boolean', default: 'filters.length > 1', description: "Show or hide 'Clear all'; never shown with no filters" },
          { name: 'maxVisible', type: 'number', default: 'all', description: "Pills shown before the '+N more' badge" },
          { name: 'showAddButton', type: 'boolean', default: 'true', description: "Show the 'Add filter' button" },
          { name: 'filters[].id', type: 'string', default: '—', description: 'Unique identifier; the React key and what onRemove receives' },
          { name: 'filters[].label', type: 'string', default: '—', description: "Field name, e.g. 'Severity'" },
          { name: 'filters[].value', type: 'string', default: '—', description: "Applied value, e.g. 'Critical'" },
          { name: 'filters[].operator', type: 'string', default: '—', description: "Shown between label and value, e.g. 'is'" },
          { name: 'filters[].color', type: "'default' | 'destructive' | 'warning' | 'success' | 'info' | 'accent'", default: "'default'", description: 'Pill colour' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic usage"
        description="Each pill reads label, operator, value. The bar is wired to a real list in this example, so remove, add and clear all work."
        code={`const [filters, setFilters] = React.useState(initialFilters);

<FilterBar
  filters={filters}
  onRemove={(id) => setFilters((current) => current.filter((f) => f.id !== id))}
  onClearAll={() => setFilters([])}
  onAdd={() => setAddFilterOpen(true)}
/>`}
      >
        <LiveBar initial={SAMPLE} extra={EXTRA} />
      </PlaygroundSection>

      {/* ─── Colours ────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Colours"
        description="color tints a pill. Text is the status colour mixed with the foreground, so it stays AA-readable in both themes; try the theme and accent switchers."
        code={`<FilterBar
  filters={[
    { id: '1', label: 'Severity', value: 'Critical', color: 'destructive' },
    { id: '2', label: 'Severity', value: 'High', color: 'warning' },
    { id: '3', label: 'Status', value: 'Resolved', color: 'success' },
    { id: '4', label: 'Source', value: 'EDR', color: 'info' },
    { id: '5', label: 'Owner', value: 'Me', color: 'accent' },
    { id: '6', label: 'Region', value: 'EU' },
  ]}
  showAddButton={false}
/>`}
      >
        <FilterBar
          showAddButton={false}
          showClearAll={false}
          filters={[
            { id: '1', label: 'Severity', value: 'Critical', color: 'destructive' },
            { id: '2', label: 'Severity', value: 'High', color: 'warning' },
            { id: '3', label: 'Status', value: 'Resolved', color: 'success' },
            { id: '4', label: 'Source', value: 'EDR', color: 'info' },
            { id: '5', label: 'Owner', value: 'Me', color: 'accent' },
            { id: '6', label: 'Region', value: 'EU' },
          ]}
        />
      </PlaygroundSection>

      {/* ─── Operators ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Operators"
        description="An optional operator sits between label and value, muted so the label and value stay the focus."
        code={`<FilterBar
  filters={[
    { id: '1', label: 'Status', operator: 'is', value: 'Open' },
    { id: '2', label: 'Status', operator: 'is not', value: 'Closed' },
    { id: '3', label: 'Title', operator: 'contains', value: 'powershell' },
    { id: '4', label: 'Port', operator: '>=', value: '1024' },
  ]}
/>`}
      >
        <FilterBar
          showAddButton={false}
          showClearAll={false}
          filters={[
            { id: '1', label: 'Status', operator: 'is', value: 'Open' },
            { id: '2', label: 'Status', operator: 'is not', value: 'Closed' },
            { id: '3', label: 'Title', operator: 'contains', value: 'powershell' },
            { id: '4', label: 'Port', operator: '>=', value: '1024' },
          ]}
        />
      </PlaygroundSection>

      {/* ─── Overflow ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Overflow"
        description="maxVisible keeps the bar to one tidy row. The +N more badge lists the hidden filters in its tooltip, Clear all removes them too, and removing a visible pill brings the next one in."
        code={`<FilterBar filters={manyFilters} maxVisible={3} onRemove={onRemove} />
// [pill 1] [pill 2] [pill 3] [+4 more]`}
      >
        <LiveBar initial={MANY} extra={EXTRA} maxVisible={3} />
      </PlaygroundSection>

      {/* ─── Read only ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Read-only"
        description="Without onRemove the pills have no × button. Hide Add filter and Clear all as well when nothing handles them. Useful for the filters behind a saved view or a shared link."
        code={`<FilterBar filters={filters} showAddButton={false} showClearAll={false} />`}
      >
        <FilterBar filters={SAMPLE} showAddButton={false} showClearAll={false} />
      </PlaygroundSection>

      {/* ─── Wired to a list ────────────────────────────────────── */}
      <PlaygroundSection
        title="Driving a list"
        description="The bar is the only filter control here. Add filter appends the next unused quick filter (it disappears when none are left); filters on the same field are OR-ed, different fields AND-ed."
        code={`const rows = alerts.filter((a) =>
  Object.entries(valuesByField(filters)).every(([field, values]) => values.includes(a[field]))
);

<FilterBar
  filters={filters}
  onRemove={(id) => setFilters((c) => c.filter((f) => f.id !== id))}
  onClearAll={() => setFilters([])}
  onAdd={addNextQuickFilter}
/>`}
      >
        <FilteredList />
      </PlaygroundSection>

      {/* ─── Long values ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Long values and narrow bars"
        description="A value with no spaces (a hash, an IP) breaks inside its pill, and a pill never grows wider than the bar."
        code={`<FilterBar
  filters={[
    { id: '1', label: 'SHA256', value: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' },
    { id: '2', label: 'Source IP', value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334' },
  ]}
/>`}
      >
        <div className="w-full max-w-xs rounded-[var(--radius-md)] border border-dashed border-[var(--border)] p-3">
          <FilterBar
            showAddButton={false}
            showClearAll={false}
            filters={[
              { id: '1', label: 'SHA256', value: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' },
              { id: '2', label: 'Source IP', value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334' },
            ]}
          />
        </div>
      </PlaygroundSection>

      {/* ─── Custom label ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom add label and a named group"
        description="addLabel renames the add button, and aria-label names the group for screen readers."
        code={`<FilterBar
  aria-label="Alert filters"
  addLabel="Add condition"
  filters={filters}
  onAdd={openBuilder}
/>`}
      >
        <LiveBar initial={SAMPLE.slice(0, 2)} extra={EXTRA} aria-label="Alert filters" addLabel="Add condition" />
      </PlaygroundSection>

    </ComponentPage>
  );
}
