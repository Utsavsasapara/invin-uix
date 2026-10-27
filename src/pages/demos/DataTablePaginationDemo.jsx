import { useState, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { incidents, incidentColumns, bigLogData, SeverityBadge } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// PAGINATION
// ═══════════════════════════════════════════════════════════════════════════════

const PAGINATION_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', status: 'open' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', status: 'investigating' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', status: 'investigating' },
  // ...more rows
];

// IMPORTANT: page is 0-indexed — 0 = first page, 1 = second page, etc.
// onPageChange also receives a 0-indexed number.
function PaginatedTable() {
  const [page, setPage] = useState(0);    // ← 0 = first page
  const [pageSize, setPageSize] = useState(3);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      paginated
      page={page}
      pageSize={pageSize}
      pageSizeOptions={[3, 5, 10]}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}`;

function PaginationExample() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      paginated
      page={page}
      pageSize={pageSize}
      pageSizeOptions={[3, 5, 10]}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}

// ── Uncontrolled pagination ───────────────────────────────────────────────────

const PAGINATION_UNCONTROLLED_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// Uncontrolled — no page/onPageChange needed.
// DataTable manages the page state internally.
// pageSize and pageSizeOptions still work as expected.
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  paginated
  pageSize={5}
  pageSizeOptions={[5, 10, 25]}
/>`;

function PaginationUncontrolledExample() {
  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      paginated
      pageSize={5}
      pageSizeOptions={[5, 10, 25]}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INFINITE SCROLL
// ═══════════════════════════════════════════════════════════════════════════════

const INFINITE_SCROLL_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'Log ID', accessor: 'id' },
  { id: 'event', header: 'Event', accessor: 'event' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

function InfiniteLogTable({ fetchNextBatch }) {
  const [rows, setRows] = useState(() => fetchNextBatch(0));
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const next = fetchNextBatch(rows.length);
      setRows((prev) => [...prev, ...next]);
      if (next.length === 0) setHasMore(false);
      setLoadingMore(false);
    }, 500);
  }, [rows.length, loadingMore, hasMore, fetchNextBatch]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      rowKey="id"
      infiniteScroll
      onLoadMore={handleLoadMore}
      hasMoreRows={hasMore}
      loadingMoreRows={loadingMore}
      scrollThreshold={150}
      maxHeight="320px"
    />
  );
}`;

function InfiniteScrollExample() {
  const [rows, setRows] = useState(bigLogData.slice(0, 20));
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setRows((prev) => {
        const next = bigLogData.slice(prev.length, prev.length + 20);
        if (prev.length + next.length >= 120) setHasMore(false);
        return [...prev, ...next];
      });
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, hasMore]);

  return (
    <DataTable
      columns={[
        { id: 'id', header: 'Log ID', accessor: 'id', width: '110px' },
        { id: 'event', header: 'Event', accessor: 'event' },
        { id: 'source', header: 'Source', accessor: 'source' },
        { id: 'severity', header: 'Severity', accessor: 'severity', cell: ({ value }) => <SeverityBadge value={value} /> },
        { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp' },
      ]}
      data={rows}
      rowKey="id"
      infiniteScroll
      onLoadMore={handleLoadMore}
      hasMoreRows={hasMore}
      loadingMoreRows={loadingMore}
      scrollThreshold={150}
      maxHeight="320px"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGINATION CUSTOMIZATION
// ═══════════════════════════════════════════════════════════════════════════════

const PAGINATION_CUSTOM_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// ── Show/hide controls ────────────────────────────────────────────────────────
// showRowsPerPage — hide the rows-per-page dropdown, keep nav
<DataTable paginated showRowsPerPage={false} ... />

// showPaginationNav — hide all nav (count + buttons), keep rows-per-page only
<DataTable paginated showPaginationNav={false} ... />

// showFirstLastButtons — hide the ‹‹ / ›› first/last page buttons
<DataTable paginated showFirstLastButtons={false} ... />

// showPageNumbers — hide numbered buttons, leave only prev/next
<DataTable paginated showPageNumbers={false} ... />

// ── Label & count ─────────────────────────────────────────────────────────────
// Rename "Rows per page" for non-English UIs
<DataTable paginated rowsPerPageLabel="Items / page" ... />

// Limit to 3 page number buttons (useful for narrow layouts)
<DataTable paginated maxPageButtons={3} ... />

// ── Alignment & order ─────────────────────────────────────────────────────────
// paginationAlign — where content sits: 'between' (default) | 'left' | 'center' | 'right'
<DataTable paginated paginationAlign="center" ... />

// paginationOrder — 'default' = rows-per-page first · 'reverse' = nav first
<DataTable paginated paginationAlign="right" paginationOrder="reverse" ... />

// ── Styling ───────────────────────────────────────────────────────────────────
// footerClassName — the outer footer container (background, border, spacing)
// paginationClassName — the inner <nav> element (layout overrides)
<DataTable paginated
  footerClassName="bg-[var(--card)] border-t-0 rounded-b-lg"
  paginationClassName="px-6 py-4"
  ... />

// rowsPerPageClassName — left section (label + dropdown)
// pageButtonsClassName — right section (row count + nav buttons)
<DataTable paginated
  rowsPerPageClassName="opacity-60 text-xs"
  pageButtonsClassName="gap-x-6"
  ... />

// activePageClassName — override the active/current page button
<DataTable paginated
  activePageClassName="bg-[var(--foreground)] text-[var(--background)] font-bold !rounded-full"
  ... />`;

function PaginationCustomExample() {
  const [mode, setMode] = useState('default');

  const configs = {
    default:      { label: 'Default' },
    navOnly:      { label: 'Nav only',            showRowsPerPage: false },
    rppOnly:      { label: 'Rows-per-page only',  showPaginationNav: false },
    centered:     { label: 'Centered',            paginationAlign: 'center' },
    rightReverse: { label: 'Right + reverse',     paginationAlign: 'right', paginationOrder: 'reverse' },
    styledActive: { label: 'Custom active btn',   activePageClassName: 'bg-[var(--foreground)] text-[var(--background)] font-bold !rounded-full' },
    footer:       { label: 'Custom footer',       footerClassName: 'bg-[var(--card)] border-t-0 rounded-b-lg', paginationClassName: 'px-6 py-4' },
    max3:         { label: 'Max 3 buttons',        maxPageButtons: 3 },
  };

  const { label: _label, ...props } = configs[mode];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.entries(configs).map(([key, { label }]) => (
          <Button key={key} size="sm" variant={mode === key ? 'secondary' : 'ghost'} onClick={() => setMode(key)}>
            {label}
          </Button>
        ))}
      </div>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        paginated
        pageSize={3}
        pageSizeOptions={[3, 5, 10]}
        {...props}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVER-SIDE PAGINATION
// ═══════════════════════════════════════════════════════════════════════════════

// 47 synthetic rows — simulates a large server dataset
const serverDataset = Array.from({ length: 47 }, (_, i) => ({
  id: `SRV-${String(i + 1).padStart(3, '0')}`,
  title: [
    'Unauthorized SSH login attempt',
    'Malware signature detected on endpoint',
    'Unusual outbound traffic volume',
    'Failed MFA brute-force attempt',
    'Expired TLS certificate on gateway',
    'Privilege escalation on DB host',
    'Phishing email reported by employee',
    'Ransomware behavior flagged by EDR',
    'Port scan from external IP',
    'Anomalous data exfiltration pattern',
  ][i % 10],
  severity: ['critical', 'high', 'medium', 'low'][i % 4],
  status:   ['open', 'investigating', 'resolved'][i % 3],
  assignee: ['Aditi Rao', 'Marcus Webb', 'Priya Nair', 'Sara Okafor'][i % 4],
  department: ['SOC', 'NetOps', 'CloudSec'][i % 3],
  riskScore: [92, 78, 61, 84, 22, 95, 48, 97, 18, 88][i % 10],
}));

const SERVER_PAGINATION_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// Server owns the data — DataTable receives only the current page's rows.
// manualPagination disables client-side slicing.
// totalCount tells the pagination UI the full dataset size.
// isFetching shows a subtle loading overlay without hiding the current rows.

function ServerPaginatedTable({ fetchPage }) {
  const [page, setPage]       = useState(0);
  const [rows, setRows]       = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const PAGE_SIZE = 5;

  // Fetch on mount and on every page change
  useEffect(() => {
    setIsFetching(true);
    fetchPage(page, PAGE_SIZE).then((result) => {
      setRows(result.rows);
      setIsFetching(false);
    });
  }, [page, fetchPage]);

  return (
    <DataTable
      columns={columns}
      data={rows}           // only the current page's rows
      rowKey="id"
      paginated
      page={page}
      pageSize={PAGE_SIZE}
      manualPagination      // skip client-side slicing
      totalCount={47}       // full server-side row count
      isFetching={isFetching}
      onPageChange={setPage}
    />
  );
}`;

function ServerPaginationExample() {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(() => serverDataset.slice(0, PAGE_SIZE));
  const [isFetching, setIsFetching] = useState(false);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setIsFetching(true);
    setTimeout(() => {
      setRows(serverDataset.slice(newPage * PAGE_SIZE, (newPage + 1) * PAGE_SIZE));
      setIsFetching(false);
    }, 400);
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        47 rows total on the "server". Each page change triggers a 400ms simulated fetch — <code>isFetching</code> shows a subtle overlay during the request.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={rows}
        rowKey="id"
        paginated
        page={page}
        pageSize={PAGE_SIZE}
        manualPagination
        totalCount={47}
        isFetching={isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTablePaginationDemo() {
  return (
    <ComponentPage
      name="DataTable — Pagination"
      description="Controlled page/pageSize pagination, and infinite scroll as an alternative for long, continuously-loading lists."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <PlaygroundSection title="Pagination — Controlled" description="page is 0-indexed (0 = first page). onPageChange receives the new page index. Use pageSizeOptions to offer different page sizes." code={PAGINATION_CODE}>
        <PaginationExample />
      </PlaygroundSection>

      <PlaygroundSection title="Pagination — Uncontrolled" description="Without the page prop, DataTable manages state internally. Just enable paginated and optionally set pageSize and pageSizeOptions." code={PAGINATION_UNCONTROLLED_CODE}>
        <PaginationUncontrolledExample />
      </PlaygroundSection>

      <PlaygroundSection title="Pagination — Customization" description="Control which controls appear, how many page buttons show, and override the styling of the container, rows-per-page section, and active page button." code={PAGINATION_CUSTOM_CODE}>
        <PaginationCustomExample />
      </PlaygroundSection>

      <PlaygroundSection title="Pagination — Server-side" description="manualPagination disables client-side slicing so the server controls the data. Pass totalCount so the pagination UI knows the full dataset size. isFetching shows a subtle overlay during the request without hiding the current rows." code={SERVER_PAGINATION_CODE}>
        <ServerPaginationExample />
      </PlaygroundSection>

      <PlaygroundSection title="Infinite Scroll" description="Loads more rows as the user scrolls near the bottom, instead of paginating." code={INFINITE_SCROLL_CODE}>
        <InfiniteScrollExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Pagination"
          props={[
            { name: 'paginated', type: 'boolean', default: 'false', description: 'Enable pagination controls' },
            { name: 'pageSize', type: 'number', default: '10', description: 'Rows per page' },
            { name: 'pageSizeOptions', type: 'number[]', default: '[5,10,20,50]', description: 'Page-size choices shown in the dropdown' },
            { name: 'page', type: 'number', default: '—', description: 'Controlled current page — 0-indexed (0 = first page)' },
            { name: 'onPageChange', type: '(page) => void', default: '—', description: 'Called with the new 0-indexed page number' },
            { name: 'onPageSizeChange', type: '(size) => void', default: '—', description: 'Called when user changes rows-per-page' },
            { name: 'manualPagination', type: 'boolean', default: 'false', description: 'Skip client-side slicing — server owns pagination. Use with totalCount.' },
            { name: 'totalCount', type: 'number', default: '—', description: 'Total rows on the server — used to calculate page count when manualPagination is true' },
            { name: 'pageCount', type: 'number', default: '—', description: 'Total pages (alternative to totalCount for server-side)' },
            { name: 'isFetching', type: 'boolean', default: 'false', description: 'Shows subtle spinner overlay during data refetch (content stays visible)' },
            { name: 'showRowsPerPage', type: 'boolean', default: 'true', description: 'Show or hide the rows-per-page dropdown' },
            { name: 'rowsPerPageLabel', type: 'string', default: "'Rows per page'", description: 'Label for the rows-per-page control' },
            { name: 'showPaginationNav', type: 'boolean', default: 'true', description: 'Show or hide entire page navigation (row count + buttons). false = show only rows-per-page.' },
            { name: 'showFirstLastButtons', type: 'boolean', default: 'true', description: 'Show or hide the first-page ‹‹ and last-page ›› buttons' },
            { name: 'showPageNumbers', type: 'boolean', default: 'true', description: 'Show or hide numbered page buttons between prev/next' },
            { name: 'maxPageButtons', type: 'number', default: '5', description: 'Max numbered page buttons shown at once' },
            { name: 'paginationAlign', type: "'between' | 'left' | 'center' | 'right'", default: "'between'", description: "between = rows-per-page left nav right · left/center/right = both sections together" },
            { name: 'paginationOrder', type: "'default' | 'reverse'", default: "'default'", description: "default = rows-per-page first · reverse = nav first" },
            { name: 'footerClassName', type: 'string', default: '—', description: 'Custom class on the footer container (border, background, outer spacing)' },
            { name: 'paginationClassName', type: 'string', default: '—', description: 'Custom class on the pagination <nav> element — internal layout overrides' },
            { name: 'rowsPerPageClassName', type: 'string', default: '—', description: 'Custom class on the rows-per-page section' },
            { name: 'pageButtonsClassName', type: 'string', default: '—', description: 'Custom class on the page navigation section' },
            { name: 'activePageClassName', type: 'string', default: '—', description: 'Override the active/current page button style' },
          ]}
        />

        <PropsTable
          title="Infinite Scroll"
          props={[
            { name: 'infiniteScroll', type: 'boolean', default: 'false', description: 'Load more on scroll instead of paginating' },
            { name: 'onLoadMore', type: '(params: LoadMoreParams) => Promise<LoadMoreResult<T>> | void', default: '—', description: 'Fires to request the next batch' },
            { name: 'hasMoreRows', type: 'boolean', default: '—', description: 'Whether more rows are available' },
            { name: 'loadingMoreRows', type: 'boolean', default: 'false', description: 'Shows the loading-more indicator' },
            { name: 'scrollThreshold', type: 'number', default: '200', description: 'Pixels from bottom that triggers a load' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
