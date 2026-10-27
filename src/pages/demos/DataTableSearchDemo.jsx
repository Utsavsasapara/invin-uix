import { useState, useMemo, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable, highlightText } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { ShieldWarning, WarningCircle, Bug, CheckCircle, MagnifyingGlass } from 'invin-uix/ui/icons';
import { incidents, incidentColumns, SEVERITIES } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SEARCH — 3a: Basic search
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_BASIC_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id' },
  { id: 'title',    header: 'Title',    accessor: 'title' },
  { id: 'assignee', header: 'Assignee', accessor: 'assignee' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', assignee: 'Aditi Rao',    severity: 'critical' },
  { id: 'INC-1002', title: 'Malware signature detected',     assignee: 'Marcus Webb',  severity: 'high' },
  { id: 'INC-1003', title: 'Unusual outbound traffic',       assignee: 'Sara Okafor',  severity: 'medium' },
];

// searchable adds a search input to the toolbar.
// Matching is case-insensitive and searches all VISIBLE columns.
// Matched text is highlighted automatically (default: accent soft background).
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  searchable
  searchPlaceholder="Search incidents..."
  paginated={false}
/>`;

function SearchBasicExample() {
  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      searchable
      searchPlaceholder="Search incidents..."
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SEARCH — 3b: Debounced search
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_DEBOUNCE_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// searchDebounce delays the filter until the user stops typing.
// Without it: every keystroke re-filters the entire dataset (fine for <100 rows).
// With it: only filters after N ms of silence — better for large datasets.
function SearchWithDebounce() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <p>Current query: "{search}"</p>
      <DataTable
        columns={columns}
        data={data}
        rowKey="id"
        searchable
        searchDebounce={400}   // fires 400ms after the last keystroke
        searchValue={search}
        onSearchChange={setSearch}
        paginated={false}
      />
    </div>
  );
}`;

function SearchDebounceExample() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Query fires 400 ms after last keystroke — current value: <code className="text-[var(--foreground)]">"{search}"</code>
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        searchable
        searchDebounce={400}
        searchValue={search}
        onSearchChange={setSearch}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SEARCH — 3c: Highlight variants
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_HIGHLIGHT_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// Default highlight — accent soft bg, rounded corners (no extra config needed)
<DataTable columns={columns} data={data} rowKey="id"
  searchable highlightSearch paginated={false} />

// Custom highlight class — e.g. amber underline style
<DataTable columns={columns} data={data} rowKey="id"
  searchable
  highlightSearch
  highlightClassName="bg-transparent underline decoration-[var(--warning)] decoration-2 underline-offset-2"
  paginated={false} />

// No highlight — rows filter but matches are not marked
<DataTable columns={columns} data={data} rowKey="id"
  searchable highlightSearch={false} paginated={false} />`;

function SearchHighlightExample() {
  const [variant, setVariant] = useState('default');

  const props = {
    default:  { highlightSearch: true },
    custom:   { highlightSearch: true,  highlightClassName: 'bg-transparent underline decoration-[var(--warning)] decoration-2 underline-offset-2' },
    disabled: { highlightSearch: false },
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {['default', 'custom', 'disabled'].map((v) => (
          <Button key={v} size="sm" variant={variant === v ? 'secondary' : 'ghost'} onClick={() => setVariant(v)}>
            {v === 'default' ? 'Default highlight' : v === 'custom' ? 'Custom style' : 'No highlight'}
          </Button>
        ))}
      </div>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        searchable
        searchPlaceholder='Try "SSH" or "critical"...'
        paginated={false}
        {...props[variant]}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SEARCH — 3d: getCellProps — cell-level highlighting
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_CUSTOM_CELL_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// getCellProps lets you style the <td> element itself based on match.
// The 4th argument is the current search term — check if the cell value matches
// and add a background, border, or any attribute to the cell container.
const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id' },
  { id: 'title',    header: 'Title',    accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
  { id: 'assignee', header: 'Assignee', accessor: 'assignee' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', assignee: 'Aditi Rao' },
  { id: 'INC-1002', title: 'Malware signature detected',     severity: 'high',     assignee: 'Marcus Webb' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  searchable
  paginated={false}
  getCellProps={(_row, _columnId, value, searchTerm) => {
    if (!searchTerm) return {};
    const matches = String(value ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    return matches
      ? { className: 'bg-[var(--accent)]/15 outline outline-1 outline-[var(--accent)]/40' }
      : {};
  }}
/>`;

function SearchCustomCellExample() {
  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Cells whose value contains the search term get a highlighted background — the whole cell, not just the text. Try <code>"critical"</code> or <code>"SSH"</code>.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        searchable
        searchPlaceholder='Try "critical" or "SSH"...'
        paginated={false}
        getCellProps={(_row, _columnId, value, searchTerm) => {
          if (!searchTerm) return {};
          const matches = String(value ?? '').toLowerCase().includes(searchTerm.toLowerCase());
          return matches
            ? { className: 'bg-[var(--accent)]/15 outline outline-1 outline-[var(--accent)]/40' }
            : {};
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL SEARCH — 3e: isFetching loading state
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_FETCHING_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// isFetching={true} shows a loading spinner inside the search input.
// Use this to signal that a server-side search is in-flight.
function SearchWithLoadingState() {
  const [search, setSearch] = useState('');
  const [rows, setRows]     = useState(data);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    if (!value) { setRows(data); return; }

    setLoading(true);
    // Simulate server round-trip
    setTimeout(() => {
      setRows(data.filter(r => r.title.toLowerCase().includes(value.toLowerCase())));
      setLoading(false);
    }, 600);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={rows}
      rowKey="id"
      searchable
      searchDebounce={300}
      searchValue={search}
      onSearchChange={handleSearch}
      isFetching={loading}    // spinner appears inside the search input
      manualFiltering         // skip client-side filter — server owns it
      paginated={false}
    />
  );
}`;

function SearchFetchingExample() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(incidents);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    if (!value) { setRows(incidents); return; }
    setLoading(true);
    setTimeout(() => {
      setRows(incidents.filter(r =>
        Object.values(r).some(v => String(v).toLowerCase().includes(value.toLowerCase()))
      ));
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Type to trigger a 600 ms simulated fetch — spinner appears inside the input while loading.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={rows}
        rowKey="id"
        searchable
        searchDebounce={300}
        searchValue={search}
        onSearchChange={handleSearch}
        isFetching={loading}
        manualFiltering
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANUAL SEARCH TRIGGER
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_MANUAL_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id' },
  { id: 'title',    header: 'Title',    accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical' },
  { id: 'INC-1002', title: 'Malware signature detected',     severity: 'high' },
  { id: 'INC-1003', title: 'Unusual outbound traffic',       severity: 'medium' },
];

// searchTrigger="manual": the user types freely, filter only applies on Enter.
// No debounce needed — the filter waits for explicit submission.
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  searchable
  searchPlaceholder="Type then press Enter to search..."
  searchTrigger="manual"
  paginated={false}
/>`;

function SearchManualExample() {
  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Type anything and notice rows stay unchanged — press <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--secondary)] text-xs font-mono">Enter</kbd> to apply the filter.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        searchable
        searchPlaceholder="Type then press Enter to search..."
        searchTrigger="manual"
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN FILTERS
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_FILTERS_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity',
    filterable: true, filterConfig: { type: 'select', options: ['critical', 'high', 'medium', 'low'] } },
  { id: 'status', header: 'Status', accessor: 'status',
    filterable: true, filterConfig: { type: 'select', options: ['open', 'investigating', 'resolved', 'closed'] } },
  { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', align: 'right',
    filterable: true, filterConfig: { type: 'number' } },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', status: 'open', riskScore: 92 },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', severity: 'medium', status: 'investigating', riskScore: 61 },
];

function ColumnFilterableTable() {
  const [columnFilters, setColumnFilters] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      columnFilterable
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
    />
  );
}`;

function ColumnFiltersExample() {
  const [columnFilters, setColumnFilters] = useState([]);

  const columns = useMemo(() => [
    ...incidentColumns({
      severity: { filterable: true, filterConfig: { type: 'select', options: SEVERITIES } },
      status: { filterable: true, filterConfig: { type: 'select', options: ['open', 'investigating', 'resolved', 'closed'] } },
    }),
    { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', align: 'right', filterable: true, filterConfig: { type: 'number' } },
  ], []);

  return (
    <DataTable
      columns={columns}
      data={incidents}
      rowKey="id"
      columnFilterable
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUICK FILTERS
// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH CLASSNAME
// ═══════════════════════════════════════════════════════════════════════════════

const SEARCH_CLASSNAME_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// searchClassName appends to the search input's wrapper div.
// Mix and match Tailwind classes to change width, border, background, and shape.

// ── Width ────────────────────────────────────────────────────────────────────
// Default is max-w-[280px]. Full-width for a search-focused layout:
<DataTable columns={columns} data={data} rowKey="id"
  searchable searchClassName="w-full" paginated={false} />

// ── Border color (accent) ────────────────────────────────────────────────────
// Always-visible accent border — draws the eye to the search bar
<DataTable columns={columns} data={data} rowKey="id"
  searchable
  searchClassName="max-w-xs border-[var(--accent)] focus-within:ring-[var(--accent)]/40"
  paginated={false} />

// ── Pill shape ────────────────────────────────────────────────────────────────
// Override the default rounded-[var(--radius-sm)] with rounded-full
<DataTable columns={columns} data={data} rowKey="id"
  searchable searchClassName="max-w-xs !rounded-full" paginated={false} />

// ── Custom background ─────────────────────────────────────────────────────────
// Secondary / card background — blends into the table area
<DataTable columns={columns} data={data} rowKey="id"
  searchable
  searchClassName="max-w-xs bg-[var(--card)] border-[var(--border)]/60"
  paginated={false} />

// ── Replace entirely — use the toolbar slot ───────────────────────────────────
// For total control, put your own search UI in the toolbar
// and wire it via searchValue + onSearchChange
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  searchValue={search}
  onSearchChange={setSearch}
  toolbar={
    <div className="relative flex-1 max-w-sm">
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={16} />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Custom styled search…"
        className="w-full h-9 pl-9 pr-3 text-sm rounded-[var(--radius-lg)]
                   bg-[var(--accent)]/10 border border-[var(--accent)]/30
                   text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
    </div>
  }
  paginated={false}
/>`;

function SearchClassNameExample() {
  const [style, setStyle] = useState('default');
  const [search, setSearch] = useState('');

  const styles = {
    default:    { label: 'Default',          className: undefined },
    wide:       { label: 'Full width',        className: 'w-full' },
    narrow:     { label: 'Compact (w-40)',    className: 'w-40' },
    accent:     { label: 'Accent border',     className: 'max-w-xs border-[var(--accent)] focus-within:ring-[var(--accent)]/40' },
    pill:       { label: 'Pill shape',        className: 'max-w-xs !rounded-full' },
    card:       { label: 'Card background',   className: 'max-w-xs bg-[var(--card)] border-[var(--border)]/60' },
    custom:     { label: 'Custom toolbar',    className: null },   // null = use toolbar slot
  };

  const current = styles[style];

  return (
    <div className="space-y-4">
      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(styles).map(([key, s]) => (
          <Button key={key} size="sm" variant={style === key ? 'secondary' : 'ghost'} onClick={() => setStyle(key)}>
            {s.label}
          </Button>
        ))}
      </div>

      {/* Description */}
      <p className="text-caption text-[var(--muted-foreground)]">
        {style === 'default'    && <><code>searchClassName</code> not set — default <code>max-w-[280px]</code></>}
        {style === 'wide'       && <><code>searchClassName="w-full"</code> — stretches to fill the toolbar</>}
        {style === 'narrow'     && <><code>searchClassName="w-40"</code> — compact, leaves room for other toolbar controls</>}
        {style === 'accent'     && <><code>searchClassName="max-w-xs border-[var(--accent)]…"</code> — always-visible accent border</>}
        {style === 'pill'       && <><code>searchClassName="max-w-xs !rounded-full"</code> — overrides the default border-radius</>}
        {style === 'card'       && <><code>searchClassName="max-w-xs bg-[var(--card)]…"</code> — custom background color</>}
        {style === 'custom'     && <>Custom <code>toolbar</code> slot — replaces the built-in search completely with your own JSX</>}
      </p>

      {/* Table */}
      {style === 'custom' ? (
        <DataTable
          columns={incidentColumns()}
          data={incidents}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          toolbar={
            <div className="relative flex-1 max-w-sm">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={16} weight="bold" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Custom styled search…"
                className="w-full h-9 pl-9 pr-3 text-sm rounded-[var(--radius-lg)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            </div>
          }
          paginated={false}
        />
      ) : (
        <DataTable
          columns={incidentColumns()}
          data={incidents}
          rowKey="id"
          searchable
          searchPlaceholder="Search incidents…"
          searchClassName={current.className}
          paginated={false}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUICK FILTERS
// ═══════════════════════════════════════════════════════════════════════════════

const QUICK_FILTERS_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';
import { ShieldWarning, WarningCircle, CheckCircle, Bug } from 'invin-uix/ui/icons';

const columns = [
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', status: 'open', category: 'Intrusion' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high', status: 'investigating', category: 'Malware' },
];

const quickFilters = [
  // icon — any ReactNode shown before the label
  // variant — controls the active-state color: 'danger' | 'warning' | 'success' | 'default'
  // showCount — badge showing how many rows match
  // description — tooltip text on hover
  { id: 'critical', label: 'Critical',  icon: <ShieldWarning size={14} weight="bold" />,
    predicate: (row) => row.severity === 'critical', showCount: true, variant: 'danger',
    description: 'Show only critical-severity incidents' },
  { id: 'open',     label: 'Open',      icon: <WarningCircle size={14} weight="bold" />,
    predicate: (row) => row.status === 'open', showCount: true, variant: 'warning' },
  { id: 'malware',  label: 'Malware',   icon: <Bug size={14} weight="bold" />,
    predicate: (row) => row.category === 'Malware', showCount: true },
  { id: 'resolved', label: 'Resolved',  icon: <CheckCircle size={14} weight="bold" />,
    predicate: (row) => ['resolved', 'closed'].includes(row.status), showCount: true, variant: 'success' },
];

function QuickFilterableTable() {
  const [active, setActive] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      quickFilters={quickFilters}
      activeQuickFilters={active}
      onQuickFilterChange={setActive}
      multipleQuickFilters   // allow combining filters (AND logic)
      paginated={false}
    />
  );
}`;

function QuickFiltersExample() {
  const [active, setActive] = useState([]);

  const quickFilters = useMemo(() => [
    { id: 'critical', label: 'Critical', icon: <ShieldWarning size={14} weight="bold" />, predicate: (row) => row.severity === 'critical', showCount: true, variant: 'danger', description: 'Show only critical-severity incidents' },
    { id: 'open', label: 'Open', icon: <WarningCircle size={14} weight="bold" />, predicate: (row) => row.status === 'open', showCount: true, variant: 'warning', description: 'Show only open incidents' },
    { id: 'malware', label: 'Malware', icon: <Bug size={14} weight="bold" />, predicate: (row) => row.category === 'Malware', showCount: true, description: 'Show only malware-category incidents' },
    { id: 'resolved', label: 'Resolved', icon: <CheckCircle size={14} weight="bold" />, predicate: (row) => row.status === 'resolved' || row.status === 'closed', showCount: true, variant: 'success' },
  ], []);

  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      quickFilters={quickFilters}
      activeQuickFilters={active}
      onQuickFilterChange={setActive}
      multipleQuickFilters
      paginated={false}
    />
  );
}

// ── Quick Filters — custom className ──────────────────────────────────────────

const QUICK_FILTERS_CLASSNAME_CODE = `// className on each QuickFilter overrides or extends the variant style.
// Useful when the built-in variants don't match your design system exactly.
const quickFilters = [
  {
    id: 'critical',
    label: 'Critical',
    icon: <ShieldWarning size={14} weight="bold" />,
    predicate: (row) => row.severity === 'critical',
    showCount: true,
    // Custom class: thicker border + slightly different active shade
    className: 'border-2',
  },
  {
    id: 'locked',
    label: 'Coming Soon',
    predicate: () => false,
    disabled: true,   // shown but not clickable
    description: 'This filter is not yet available',
  },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  quickFilters={quickFilters}
  multipleQuickFilters
  paginated={false}
/>`;

function QuickFiltersClassNameExample() {
  const [active, setActive] = useState([]);

  const quickFilters = useMemo(() => [
    { id: 'critical', label: 'Critical', icon: <ShieldWarning size={14} weight="bold" />, predicate: (row) => row.severity === 'critical', showCount: true, variant: 'danger', className: 'border-2', description: 'Active: thicker border via className' },
    { id: 'high', label: 'High', icon: <WarningCircle size={14} weight="bold" />, predicate: (row) => row.severity === 'high', showCount: true, variant: 'warning' },
    { id: 'resolved', label: 'Resolved', icon: <CheckCircle size={14} weight="bold" />, predicate: (row) => row.status === 'resolved', showCount: true, variant: 'success' },
    { id: 'locked', label: 'Coming Soon', predicate: () => false, disabled: true, description: 'This filter is not yet available — hover to see tooltip' },
  ], []);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        "Critical" has <code>className="border-2"</code> (thicker border). "Coming Soon" has <code>disabled=&#123;true&#125;</code>.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        quickFilters={quickFilters}
        activeQuickFilters={active}
        onQuickFilterChange={setActive}
        multipleQuickFilters
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableSearchDemo() {
  return (
    <ComponentPage
      name="DataTable — Search & Filtering"
      description="Global search (with debounce, highlight styles, and custom-cell highlighting), per-column filters, and predefined quick-filter buttons."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <PlaygroundSection title="Global Search — Basic" description="searchable adds a search input to the toolbar. Searches all visible columns, case-insensitive. Matches are highlighted with accent background by default." code={SEARCH_BASIC_CODE}>
        <SearchBasicExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Debounce" description="searchDebounce delays filtering until the user stops typing. Avoids re-rendering on every keystroke — recommended for large datasets." code={SEARCH_DEBOUNCE_CODE}>
        <SearchDebounceExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Highlight Styles" description="highlightSearch controls match highlighting. Use highlightClassName to override the default style, or set highlightSearch={false} to disable entirely." code={SEARCH_HIGHLIGHT_CODE}>
        <SearchHighlightExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Cell Highlighting" description="getCellProps lets you highlight the entire cell container (background, border) when its value matches the search term — not just the text inside it." code={SEARCH_CUSTOM_CELL_CODE}>
        <SearchCustomCellExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Loading State" description="isFetching shows a spinner inside the search input while a server request is in flight. Combine with manualFiltering to skip client-side filtering and let the server handle it." code={SEARCH_FETCHING_CODE}>
        <SearchFetchingExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Manual Trigger" description="searchTrigger='manual' filters only when the user presses Enter — not on every keystroke. Type freely, then press Enter to apply. Useful when each search triggers a server request." code={SEARCH_MANUAL_CODE}>
        <SearchManualExample />
      </PlaygroundSection>

      <PlaygroundSection title="Global Search — Search Input Style" description="searchClassName overrides the search input's appearance — width, border, background, border-radius. Use it to match the search bar to your product's visual identity, or replace it entirely via the toolbar slot." code={SEARCH_CLASSNAME_CODE}>
        <SearchClassNameExample />
      </PlaygroundSection>

      <PlaygroundSection title="Column Filters" description="Per-column filter UI driven by filterConfig — text, number, and select types." code={COLUMN_FILTERS_CODE}>
        <ColumnFiltersExample />
      </PlaygroundSection>

      <PlaygroundSection title="Quick Filters" description="Predefined one-click filter buttons with icon, variant color, count badge, tooltip, and multi-select support. Combine multiple active filters with AND logic." code={QUICK_FILTERS_CODE}>
        <QuickFiltersExample />
      </PlaygroundSection>

      <PlaygroundSection title="Quick Filters — Custom Style & Disabled" description="Add className to override a specific button's style, or set disabled={true} to show the filter as unavailable (with tooltip)." code={QUICK_FILTERS_CLASSNAME_CODE}>
        <QuickFiltersClassNameExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Global Search"
          props={[
            { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable the global search box' },
            { name: 'searchPlaceholder', type: 'string', default: '—', description: 'Search input placeholder' },
            { name: 'searchValue', type: 'string', default: '—', description: 'Controlled search value' },
            { name: 'onSearchChange', type: '(value) => void', default: '—', description: 'Search change callback' },
            { name: 'searchDebounce', type: 'number', default: '0', description: 'Debounce delay in ms' },
            { name: 'searchTrigger', type: "'auto' | 'manual'", default: "'auto'", description: "auto = filter on keystroke · manual = filter on Enter" },
            { name: 'searchClassName', type: 'string', default: '—', description: 'Custom class for the search input — use to override width or appearance' },
            { name: 'highlightSearch', type: 'boolean', default: 'true when searchable', description: 'Highlight matches in cells' },
            { name: 'highlightClassName', type: 'string', default: '—', description: 'Class for highlighted match spans' },
            { name: 'getCellProps', type: '(row, columnId, value, searchTerm) => HTMLAttributes', default: '—', description: 'Custom props for individual cells — use for cell-level background highlight on match' },
          ]}
        />

        <PropsTable
          title="Column Filters"
          props={[
            { name: 'columnFilterable', type: 'boolean', default: 'false', description: 'Enable per-column filter UI' },
            { name: 'columnFilters', type: 'ColumnFilter[]', default: '—', description: 'Controlled column filters' },
            { name: 'onColumnFiltersChange', type: '(filters) => void', default: '—', description: 'Column filters change callback' },
            { name: 'defaultColumnFilters', type: 'ColumnFilter[]', default: '—', description: 'Uncontrolled initial filters' },
          ]}
        />

        <PropsTable
          title="Quick Filters"
          props={[
            { name: 'quickFilters', type: 'QuickFilter<T>[]', default: '—', description: 'Predefined one-click filter buttons' },
            { name: 'activeQuickFilters', type: 'string[]', default: '—', description: 'Controlled active quick filter ids' },
            { name: 'onQuickFilterChange', type: '(ids) => void', default: '—', description: 'Quick filter change callback' },
            { name: 'showQuickFilters', type: 'boolean', default: 'true when quickFilters set', description: 'Show the quick filter bar' },
            { name: 'multipleQuickFilters', type: 'boolean', default: 'false', description: 'Allow more than one quick filter active at once' },
          ]}
        />

        <PropsTable
          title="QuickFilter object"
          props={[
            { name: 'id', type: 'string', default: '—', required: true, description: 'Unique identifier' },
            { name: 'label', type: 'string', default: '—', required: true, description: 'Button label text' },
            { name: 'predicate', type: '(row, index) => boolean', default: '—', required: true, description: 'Filter function — return true for rows to keep' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon shown before the label' },
            { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger'", default: "'default'", description: 'Active-state color scheme' },
            { name: 'showCount', type: 'boolean', default: 'false', description: 'Show count badge with number of matching rows' },
            { name: 'description', type: 'string', default: '—', description: 'Tooltip text on hover' },
            { name: 'className', type: 'string', default: '—', description: 'Custom class appended to the button — overrides or extends variant styling' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button — shown but not clickable, cursor not-allowed' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
