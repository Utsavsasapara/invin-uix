import { useState, useMemo, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Keyboard } from 'invin-uix/ui/icons';
import { incidents, incidentColumns, bigLogData, SEVERITIES, SeverityBadge, StatusBadge } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// SUMMARY / AGGREGATE ROW
// ═══════════════════════════════════════════════════════════════════════════════

const SUMMARY_ROW_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'affectedAssets', header: 'Assets', accessor: 'affectedAssets', align: 'right', aggregate: 'sum' },
  { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', align: 'right', aggregate: 'avg',
    summaryCell: ({ aggregate }) => <span>{Math.round(aggregate)} avg</span> },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', affectedAssets: 3, riskScore: 92 },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', affectedAssets: 1, riskScore: 78 },
];

// summaryPosition: 'top' | 'bottom' (default) | 'both'

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  showSummary
  summaryPosition="bottom"
  summaryLabel="Totals"
  summaryClassName="bg-[var(--accent)]/10 font-semibold"
  aggregateFromAllData
  paginated={false}
/>`;

function SummaryRowExample() {
  const [summaryPosition, setSummaryPosition] = useState('bottom');
  const [highlighted, setHighlighted] = useState(false);

  const columns = useMemo(() => [
    { id: 'id', header: 'ID', accessor: 'id', width: '110px' },
    { id: 'title', header: 'Title', accessor: 'title' },
    { id: 'severity', header: 'Severity', accessor: 'severity', cell: ({ value }) => <SeverityBadge value={value} /> },
    { id: 'affectedAssets', header: 'Assets', accessor: 'affectedAssets', align: 'right', aggregate: 'sum' },
    {
      id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', align: 'right', aggregate: 'avg',
      summaryCell: ({ aggregate }) => <span className="font-semibold text-[var(--accent)]">{Math.round(aggregate)} avg</span>,
    },
  ], []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-caption text-[var(--muted-foreground)]">summaryPosition:</span>
        {['top', 'bottom', 'both'].map((pos) => (
          <Button key={pos} size="sm" variant={summaryPosition === pos ? 'secondary' : 'ghost'} onClick={() => setSummaryPosition(pos)}>
            {pos}
          </Button>
        ))}
        <Button size="sm" variant={highlighted ? 'secondary' : 'ghost'} onClick={() => setHighlighted((v) => !v)}>
          summaryClassName: {highlighted ? 'on' : 'off'}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        showSummary
        summaryPosition={summaryPosition}
        summaryLabel="Totals"
        summaryClassName={highlighted ? 'bg-[var(--accent)]/10 font-semibold' : undefined}
        aggregateFromAllData
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVER-SIDE MODE
// ═══════════════════════════════════════════════════════════════════════════════

const serverDataset = Array.from({ length: 47 }, (_, i) => ({
  id: `SRV-${i + 1}`,
  title: `Synthetic incident #${i + 1}`,
  severity: SEVERITIES[i % SEVERITIES.length],
  status: ['open', 'investigating', 'resolved'][i % 3],
}));

const SERVER_SIDE_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

function ServerSideTable({ fetchPage, totalCount }) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handlePageChange = useCallback(async (p) => {
    setPage(p);
    setIsFetching(true);
    setRows(await fetchPage(p));
    setIsFetching(false);
  }, [fetchPage]);

  return (
    // data is only ever the CURRENT page — the server owns pagination/sorting/filtering
    <DataTable
      columns={columns}
      data={rows}
      rowKey="id"
      paginated
      page={page}
      pageSize={5}
      manualPagination
      manualSorting
      manualFiltering
      totalCount={totalCount}
      isFetching={isFetching}
      onPageChange={handlePageChange}
      // state: { pagination: { page, pageSize }, sorting, search, selectedKeys, columnFilters }
      onStateChange={(state) => console.log('table state changed', state)}
    />
  );
}`;

function ServerSideExample() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [isFetching, setIsFetching] = useState(false);
  const [rows, setRows] = useState(serverDataset.slice(0, 5));

  const fetchPage = useCallback((nextPage) => {
    setIsFetching(true);
    setTimeout(() => {
      const start = (nextPage - 1) * pageSize;
      setRows(serverDataset.slice(start, start + pageSize));
      setIsFetching(false);
    }, 450);
  }, [pageSize]);

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    fetchPage(nextPage);
  };

  return (
    <div className="space-y-3">
      <DataTable
        columns={[
          { id: 'id', header: 'ID', accessor: 'id' },
          { id: 'title', header: 'Title', accessor: 'title' },
          { id: 'severity', header: 'Severity', accessor: 'severity', cell: ({ value }) => <SeverityBadge value={value} /> },
          { id: 'status', header: 'Status', accessor: 'status', cell: ({ value }) => <StatusBadge value={value} /> },
        ]}
        data={rows}
        rowKey="id"
        paginated
        page={page}
        pageSize={pageSize}
        manualPagination
        manualSorting
        manualFiltering
        totalCount={serverDataset.length}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        onStateChange={(state) => { /* wire to your data-fetching layer */ }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIRTUALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

const VIRTUALIZATION_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'Log ID', accessor: 'id' },
  { id: 'event', header: 'Event', accessor: 'event' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

// logs has 1000+ rows — only the visible slice gets mounted to the DOM
<DataTable
  columns={columns}
  data={logs}
  rowKey="id"
  virtualized
  estimatedRowHeight={40}
  overscan={8}
  maxHeight="360px"
  paginated={false}
/>`;

function VirtualizationExample() {
  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">{bigLogData.length.toLocaleString()} rows — only the visible slice is mounted to the DOM.</p>
      <DataTable
        columns={[
          { id: 'id', header: 'Log ID', accessor: 'id', width: '110px' },
          { id: 'event', header: 'Event', accessor: 'event' },
          { id: 'source', header: 'Source', accessor: 'source' },
          { id: 'severity', header: 'Severity', accessor: 'severity', cell: ({ value }) => <SeverityBadge value={value} /> },
          { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp' },
        ]}
        data={bigLogData}
        rowKey="id"
        virtualized
        estimatedRowHeight={40}
        overscan={8}
        maxHeight="360px"
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INFO BAR
// ═══════════════════════════════════════════════════════════════════════════════

const INFO_BAR_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'severity', header: 'Severity', accessor: 'severity',
    filterable: true, filterConfig: { type: 'select', options: ['critical', 'high', 'medium', 'low'] } },
];

const data = [
  { id: 'INC-1001', severity: 'critical' },
  { id: 'INC-1002', severity: 'high' },
];

function InfoBarTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  return (
    // 'auto' (the default) only shows the bar once there's something to report:
    // active filters, an active quick filter, or a non-empty selection.
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      showInfoBar="auto"
      infoBarPosition="top"
      selectable
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      columnFilterable
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      paginated={false}
    />
  );
}`;

function InfoBarExample() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [showInfoBar, setShowInfoBar] = useState('auto');
  const [infoBarPosition, setInfoBarPosition] = useState('top');
  const columns = useMemo(() => incidentColumns({
    severity: { filterable: true, filterConfig: { type: 'select', options: SEVERITIES } },
  }), []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-caption text-[var(--muted-foreground)]">showInfoBar:</span>
        {['auto', true].map((mode) => (
          <Button key={String(mode)} size="sm" variant={showInfoBar === mode ? 'secondary' : 'ghost'} onClick={() => setShowInfoBar(mode)}>
            {String(mode)}
          </Button>
        ))}
        <span className="text-caption text-[var(--muted-foreground)] ml-2">infoBarPosition:</span>
        {['top', 'bottom'].map((pos) => (
          <Button key={pos} size="sm" variant={infoBarPosition === pos ? 'secondary' : 'ghost'} onClick={() => setInfoBarPosition(pos)}>
            {pos}
          </Button>
        ))}
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {showInfoBar === 'auto'
          ? "'auto' — the bar is hidden until there's something to report: select rows or add a column filter below to see it appear."
          : "true — the bar is always shown, regardless of selection or filter state."}
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        showInfoBar={showInfoBar}
        infoBarPosition={infoBarPosition}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        columnFilterable
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

const KEYBOARD_NAV_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', status: 'open' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', status: 'investigating' },
];

function KeyboardNavTable() {
  const [focusedCell, setFocusedCell] = useState(null);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      keyboardNavigation
      focusedCell={focusedCell}
      onFocusedCellChange={setFocusedCell}
      paginated={false}
    />
  );
}`;

const KBD_CLASS = 'px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--secondary)] text-xs font-mono';

function KeyboardNavExample() {
  const [focusedCell, setFocusedCell] = useState(null);

  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)] flex items-center gap-1.5">
        <Keyboard size={14} weight="bold" /> Click a cell, then use the keyboard to move focus:
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-caption text-[var(--muted-foreground)]">
        <span className="flex items-center gap-1"><kbd className={KBD_CLASS}>↑</kbd><kbd className={KBD_CLASS}>↓</kbd><kbd className={KBD_CLASS}>←</kbd><kbd className={KBD_CLASS}>→</kbd> move one cell</span>
        <span className="flex items-center gap-1"><kbd className={KBD_CLASS}>Tab</kbd> / <kbd className={KBD_CLASS}>Shift+Tab</kbd> next / previous cell</span>
        <span className="flex items-center gap-1"><kbd className={KBD_CLASS}>Home</kbd> / <kbd className={KBD_CLASS}>End</kbd> first / last cell in row</span>
        <span className="flex items-center gap-1"><kbd className={KBD_CLASS}>Page Up</kbd> / <kbd className={KBD_CLASS}>Page Down</kbd> jump a page</span>
        <span className="flex items-center gap-1"><kbd className={KBD_CLASS}>Esc</kbd> clear focus</span>
      </div>
      <DataTable columns={incidentColumns()} data={incidents} rowKey="id" keyboardNavigation focusedCell={focusedCell} onFocusedCellChange={setFocusedCell} paginated={false} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableAdvancedDemo() {
  return (
    <ComponentPage
      name="DataTable — Advanced"
      description="Aggregate summary rows, fully server-driven pagination/sorting/filtering, row virtualization for large datasets, the unified info bar, and arrow-key keyboard navigation."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <PlaygroundSection title="Summary / Aggregate Row" description="Built-in aggregate functions plus fully custom summary cells." code={SUMMARY_ROW_CODE}>
        <SummaryRowExample />
      </PlaygroundSection>

      <PlaygroundSection title="Server-Side Mode" description="Hand pagination, sorting, and filtering to your own backend. isFetching shows a loading overlay while data loads — this demo simulates a 450ms network delay. onStateChange fires on every change with the full table state ({ pagination, sorting, search, selectedKeys, columnFilters }), so you can wire one handler to your fetch layer instead of several." code={SERVER_SIDE_CODE}>
        <ServerSideExample />
      </PlaygroundSection>

      <PlaygroundSection title="Virtualization" description="Render only the visible rows for very large datasets." code={VIRTUALIZATION_CODE}>
        <VirtualizationExample />
      </PlaygroundSection>

      <PlaygroundSection title="Info Bar" description="A unified status bar for filter/selection context — shown automatically by default." code={INFO_BAR_CODE}>
        <InfoBarExample />
      </PlaygroundSection>

      <PlaygroundSection title="Keyboard Navigation" description="Arrow-key cell navigation with Tab, Home, End, and Page Up/Down." code={KEYBOARD_NAV_CODE}>
        <KeyboardNavExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Summary Row"
          props={[
            { name: 'showSummary', type: 'boolean', default: 'false', description: 'Show the summary/aggregate row' },
            { name: 'summaryPosition', type: "'top' | 'bottom' | 'both'", default: "'bottom'", description: 'Summary row placement' },
            { name: 'summaryData', type: 'Record<string, unknown>', default: '—', description: 'Override auto-calculated values' },
            { name: 'summaryLabel', type: 'string', default: "'Summary'", description: "First cell's label" },
            { name: 'summaryClassName', type: 'string', default: '—', description: 'Class for the summary row' },
            { name: 'aggregateFromAllData', type: 'boolean', default: 'false', description: 'Aggregate full data vs. visible/filtered only' },
          ]}
        />

        <PropsTable
          title="Server-Side Mode"
          props={[
            { name: 'manualPagination', type: 'boolean', default: 'false', description: 'Disable client-side pagination' },
            { name: 'manualSorting', type: 'boolean', default: 'false', description: 'Disable client-side sorting' },
            { name: 'manualFiltering', type: 'boolean', default: 'false', description: 'Disable client-side filtering' },
            { name: 'totalCount', type: 'number', default: '—', description: 'Total row count for server pagination' },
            { name: 'pageCount', type: 'number', default: '—', description: 'Total page count (alternative to totalCount)' },
            { name: 'onStateChange', type: '(state: TableState) => void', default: '—', description: 'Fires on any state change with the full table state: { pagination: { page, pageSize }, sorting, search, selectedKeys, columnFilters } — convenient for wiring a single server fetch handler' },
          ]}
        />

        <PropsTable
          title="Virtualization"
          props={[
            { name: 'virtualized', type: 'boolean', default: 'false', description: 'Virtualize row rendering' },
            { name: 'estimatedRowHeight', type: 'number', default: '48 / 40 dense', description: 'Estimated row height in px' },
            { name: 'overscan', type: 'number', default: '5', description: 'Rows rendered outside the viewport' },
          ]}
        />

        <PropsTable
          title="Info Bar"
          props={[
            { name: 'showInfoBar', type: "boolean | 'auto'", default: "'auto'", description: "'auto' shows the bar only when there's active context (selection, quick filter, or column filters); true always shows it; false disables it entirely" },
            { name: 'infoBarPosition', type: "'top' | 'bottom'", default: "'top'", description: 'Info bar placement' },
          ]}
        />

        <PropsTable
          title="Keyboard Navigation"
          props={[
            { name: 'keyboardNavigation', type: 'boolean', default: 'false', description: 'Enable arrow-key cell navigation' },
            { name: 'focusedCell', type: '{ rowIndex, columnId } | null', default: '—', description: 'Controlled focused cell' },
            { name: 'onFocusedCellChange', type: '(cell) => void', default: '—', description: 'Focused cell change callback' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
