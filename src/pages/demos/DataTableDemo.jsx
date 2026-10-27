import { useState, useMemo } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { Plus, ArrowClockwise, MagnifyingGlass } from 'invin-uix/ui/icons';
import { incidents, incidentColumns } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — BASIC USAGE
// ═══════════════════════════════════════════════════════════════════════════════

const BASIC_USAGE_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id', width: '110px' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', status: 'open' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high', status: 'investigating' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', severity: 'medium', status: 'investigating' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  striped       // optional — alternating row backgrounds
  dense         // optional — compact row height
  bordered      // optional — cell borders
  stickyHeader  // optional — pair with maxHeight to enable scroll
  maxHeight="260px"
  paginated     // default: true — shows page controls below the table
/>`;

function BasicUsageExample() {
  const [variant, setVariant] = useState('default');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {['default', 'striped', 'dense', 'bordered', 'sticky'].map((v) => (
          <Button key={v} size="sm" variant={variant === v ? 'secondary' : 'ghost'} onClick={() => setVariant(v)}>{v}</Button>
        ))}
      </div>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        striped={variant === 'striped'}
        dense={variant === 'dense'}
        bordered={variant === 'bordered'}
        stickyHeader={variant === 'sticky'}
        maxHeight={variant === 'sticky' ? '260px' : undefined}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — TOOLBAR SLOT
// ═══════════════════════════════════════════════════════════════════════════════

const TOOLBAR_CODE = `import { useState, useMemo } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint' },
];

function CustomToolbar({ query, onQueryChange }) {
  return <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Filter by title..." />;
}

function ToolbarTable() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => data.filter((row) => row.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <DataTable
      columns={columns}
      data={filtered}
      rowKey="id"
      toolbar={<CustomToolbar query={query} onQueryChange={setQuery} />}
      toolbarPosition="top"
      paginated={false}
    />
  );
}`;

function ToolbarExample() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => incidents.filter((row) => row.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const customToolbar = (
    <div className="flex items-center gap-2 p-2">
      <div className="relative flex-1 max-w-xs">
        <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title..."
          className="w-full h-8 pl-8 pr-3 text-[13px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)]"
        />
      </div>
      <Button size="sm" variant="outline" leftIcon={<ArrowClockwise size={14} weight="bold" />} onClick={() => setQuery('')}>Reset</Button>
      <Button size="sm" variant="secondary" leftIcon={<Plus size={14} weight="bold" />} onClick={() => toast({ title: 'New incident form would open here' })}>New Incident</Button>
    </div>
  );

  return <DataTable columns={incidentColumns()} data={filtered} rowKey="id" toolbar={customToolbar} toolbarPosition="top" paginated={false} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableDemo() {
  return (
    <ComponentPage
      name="DataTable"
      description="Feature-rich data grid for security and monitoring dashboards: sorting, filtering, pagination, selection, grouping, tree data, inline editing, export, virtualization, and more. Twelve lower-usage features (cell comments, find & replace, undo/redo, cell spanning, cell selection, master-detail, data bars, clipboard copy, saved views, status bar, full-screen mode, and global keyboard shortcuts) were disabled upstream and are intentionally absent from this demo. The full feature set is split across the sub-pages in the sidebar — this page covers the basics and the complete API reference."
      badges={[{ label: '25 Features', variant: 'secondary' }, { label: 'Server-Side Ready', variant: 'outline' }]}
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Toggle common table-level props and see the result live."
        controls={[
          { name: 'striped', label: 'Striped', type: 'boolean', default: true },
          { name: 'dense', label: 'Dense', type: 'boolean', default: false },
          { name: 'bordered', label: 'Bordered', type: 'boolean', default: false },
          { name: 'sortable', label: 'Sortable', type: 'boolean', default: true },
          { name: 'searchable', label: 'Searchable', type: 'boolean', default: true },
          { name: 'paginated', label: 'Paginated', type: 'boolean', default: true },
          { name: 'selectable', label: 'Selectable', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="w-full">
            <DataTable
              columns={incidentColumns()}
              data={incidents}
              rowKey="id"
              striped={props.striped}
              dense={props.dense}
              bordered={props.bordered}
              sortable={props.sortable}
              searchable={props.searchable}
              paginated={props.paginated}
              pageSize={5}
              selectable={props.selectable}
              showSelectionColumn={props.selectable}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator />

      <PlaygroundSection title="Basic Usage" description="Columns, data, rowKey, and the core appearance props." code={BASIC_USAGE_CODE}>
        <BasicUsageExample />
      </PlaygroundSection>

      <PlaygroundSection title="Toolbar Slot" description="Replace the built-in toolbar area with fully custom content." code={TOOLBAR_CODE}>
        <ToolbarExample />
      </PlaygroundSection>

      <Separator />

      {/* ─── API Reference ──────────────────────────────────────── */}
      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Core"
          props={[
            { name: 'columns', type: 'ColumnDef<T>[]', default: '—', description: 'Column definitions', required: true },
            { name: 'data', type: 'T[]', default: '—', description: 'Row data', required: true },
            { name: 'rowKey', type: 'string | (row, index) => string', default: '—', description: 'Unique key per row' },
            { name: 'onRowClick', type: '(row, index) => void', default: '—', description: 'Row click callback' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Shows the loading state' },
            { name: 'isFetching', type: 'boolean', default: 'false', description: "Subtle refetch indicator that keeps data visible" },
            { name: 'emptyState', type: 'ReactNode', default: '—', description: 'Custom empty-state content' },
            { name: 'loadingState', type: 'ReactNode', default: '—', description: 'Custom loading content' },
          ]}
        />

        <PropsTable
          title="Appearance"
          props={[
            { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row background' },
            { name: 'dense', type: 'boolean', default: 'false', description: 'Compact row height' },
            { name: 'bordered', type: 'boolean', default: 'false', description: 'Borders on all cells' },
            { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Stick header on scroll' },
            { name: 'maxHeight', type: 'string', default: '—', description: 'Scrollable container max height' },
            { name: 'toolbar', type: 'ReactNode', default: '—', description: 'Custom toolbar content' },
            { name: 'toolbarPosition', type: "'top' | 'bottom' | 'both'", default: "'top'", description: 'Toolbar placement' },
            { name: 'rowClassName', type: 'string | (row, index) => string', default: '—', description: 'Per-row class name' },
            { name: 'getRowProps', type: '(row, index) => HTMLAttributes', default: '—', description: 'Extra props/attributes per row element' },
            { name: 'getCellProps', type: '(row, columnId, value, searchTerm) => HTMLAttributes', default: '—', description: 'Extra props per cell — use for cell-level background highlight on search match' },
          ]}
        />

        <PropsTable
          title="Sorting"
          props={[
            { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable single-column sort' },
            { name: 'sortColumn', type: 'string | null', default: '—', description: 'Controlled sort column' },
            { name: 'sortDirection', type: "'asc' | 'desc' | false", default: '—', description: 'Controlled sort direction' },
            { name: 'onSortChange', type: '(column, direction) => void', default: '—', description: 'Sort change callback' },
            { name: 'multiSort', type: 'boolean', default: 'false', description: 'Enable multi-column sort via Shift+click' },
            { name: 'maxSortColumns', type: 'number', default: '3', description: 'Max columns kept in the sort stack' },
            { name: 'sortState', type: 'SortState[]', default: '—', description: 'Controlled multi-sort state' },
            { name: 'onMultiSortChange', type: '(state: SortState[]) => void', default: '—', description: 'Called when the sort stack changes' },
          ]}
        />

        <PropsTable
          title="Global Search"
          props={[
            { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable the global search box' },
            { name: 'searchPlaceholder', type: 'string', default: '—', description: 'Search input placeholder' },
            { name: 'searchValue', type: 'string', default: '—', description: 'Controlled search value' },
            { name: 'onSearchChange', type: '(value) => void', default: '—', description: 'Search change callback' },
            { name: 'searchDebounce', type: 'number', default: '0', description: 'Debounce delay in ms' },
            { name: 'searchTrigger', type: "'auto' | 'manual'", default: "'auto'", description: "auto = filter on keystroke · manual = filter only on Enter" },
            { name: 'searchClassName', type: 'string', default: '—', description: 'Custom class for the search input — overrides width and appearance' },
            { name: 'highlightSearch', type: 'boolean', default: 'true when searchable', description: 'Highlight matches in cells' },
            { name: 'highlightClassName', type: 'string', default: '—', description: 'Class for highlighted match spans' },
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
          title="Pagination"
          props={[
            { name: 'paginated', type: 'boolean', default: 'false', description: 'Enable pagination' },
            { name: 'pageSize', type: 'number', default: '—', description: 'Rows per page' },
            { name: 'pageSizeOptions', type: 'number[]', default: '—', description: 'Page-size choices' },
            { name: 'page', type: 'number', default: '—', description: 'Controlled current page' },
            { name: 'onPageChange', type: '(page) => void', default: '—', description: 'Page change callback' },
            { name: 'onPageSizeChange', type: '(size) => void', default: '—', description: 'Page size change callback' },
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

        <PropsTable
          title="Row Selection"
          props={[
            { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
            { name: 'selectionMode', type: "'single' | 'multiple'", default: "'multiple'", description: 'Selection mode' },
            { name: 'selectedKeys', type: 'string[]', default: '—', description: 'Controlled selected row keys' },
            { name: 'onSelectionChange', type: '(keys) => void', default: '—', description: 'Selection change callback' },
            { name: 'showSelectionColumn', type: 'boolean', default: 'true when selectable', description: 'Show the checkbox column' },
            { name: 'bulkActions', type: 'BulkAction<T>[]', default: '—', description: 'Actions for the selected rows' },
          ]}
        />

        <PropsTable
          title="Column Management"
          props={[
            { name: 'columnVisibility', type: 'boolean', default: 'false', description: 'Enable the column-visibility menu' },
            { name: 'hiddenColumns', type: 'string[]', default: '—', description: 'Controlled hidden column ids' },
            { name: 'onHiddenColumnsChange', type: '(ids) => void', default: '—', description: 'Hidden columns change callback' },
            { name: 'resizable', type: 'boolean', default: 'false', description: 'Enable column resizing' },
            { name: 'columnWidths', type: 'Record<string, number>', default: '—', description: 'Controlled column widths' },
            { name: 'onColumnWidthChange', type: '(columnId, width) => void', default: '—', description: 'Width change callback' },
            { name: 'columnResizeMode', type: "'onChange' | 'onEnd'", default: "'onChange'", description: 'When width changes are reported' },
            { name: 'columnResizeDirection', type: "'ltr' | 'rtl'", default: "'ltr'", description: 'Resize direction' },
            { name: 'reorderable', type: 'boolean', default: 'false', description: 'Enable drag-to-reorder columns' },
            { name: 'columnOrder', type: 'string[]', default: '—', description: 'Controlled column order' },
            { name: 'onColumnOrderChange', type: '(order) => void', default: '—', description: 'Order change callback' },
            { name: 'pinnableColumns', type: 'boolean', default: 'false', description: 'Enable column pinning' },
            { name: 'pinnedColumns', type: '{ left?: string[]; right?: string[] }', default: '—', description: 'Controlled pinned columns' },
            { name: 'onPinnedColumnsChange', type: '(pinned) => void', default: '—', description: 'Pinned columns change callback' },
            { name: 'defaultPinnedColumns', type: '{ left?: string[]; right?: string[] }', default: '—', description: 'Uncontrolled initial pins' },
            { name: 'columnGroups', type: 'ColumnGroup[]', default: '—', description: 'Group related columns under shared headers' },
            { name: 'showColumnGroupHeaders', type: 'boolean', default: 'true when columnGroups set', description: 'Show the group header row' },
            { name: 'columnHeaderMenu', type: 'boolean', default: 'false', description: 'Enable the per-column header menu' },
          ]}
        />

        <PropsTable
          title="Row Features"
          props={[
            { name: 'expandable', type: 'boolean', default: 'false', description: 'Enable row expansion' },
            { name: 'expandedRowRender', type: '(row, index) => ReactNode', default: '—', description: 'Expanded content renderer' },
            { name: 'expandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded row keys' },
            { name: 'onExpandedKeysChange', type: '(keys) => void', default: '—', description: 'Expansion change callback' },
            { name: 'expandMultiple', type: 'boolean', default: 'false', description: 'Allow more than one expanded row' },
            { name: 'rowActions', type: 'RowAction<T>[] | (row, index) => RowAction<T>[]', default: '—', description: 'Per-row action menu' },
            { name: 'rowDraggable', type: 'boolean', default: 'false', description: 'Enable row drag-and-drop' },
            { name: 'onRowDragEnd', type: '(from, to, row) => void', default: '—', description: 'Fires after a row is dropped' },
            { name: 'dragHandleColumn', type: 'boolean', default: 'false', description: 'Use a dedicated drag handle instead of the whole row' },
            { name: 'isRowDraggable', type: '(row, index) => boolean', default: '—', description: 'Conditionally allow dragging a row' },
            { name: 'groupBy', type: 'string | string[]', default: '—', description: 'Column id(s) to group rows by' },
            { name: 'groupExpanded', type: 'Record<string, boolean>', default: '—', description: 'Controlled expanded groups' },
            { name: 'onGroupExpandedChange', type: '(state) => void', default: '—', description: 'Group expansion change callback' },
            { name: 'defaultGroupExpanded', type: 'boolean', default: 'true', description: 'Initial expanded state for all groups' },
            { name: 'groupRowRender', type: '(props: GroupRowProps<T>) => ReactNode', default: '—', description: 'Custom group header renderer' },
            { name: 'showGroupCount', type: 'boolean', default: 'true', description: 'Show row count in group headers' },
            { name: 'treeData', type: 'boolean', default: 'false', description: 'Enable hierarchical tree rows' },
            { name: 'getSubRows', type: '(row) => T[] | undefined', default: '—', description: 'Returns child rows for a parent row' },
            { name: 'treeExpandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded tree node keys' },
            { name: 'onTreeExpandedChange', type: '(keys) => void', default: '—', description: 'Tree expansion change callback' },
            { name: 'defaultTreeExpanded', type: 'boolean', default: 'false', description: 'Initial expanded state for all nodes' },
            { name: 'treeIndent', type: 'number', default: '24', description: 'Indentation per tree level, in px' },
            { name: 'showTreeLines', type: 'boolean', default: 'false', description: 'Draw connecting lines between tree rows' },
            { name: 'pinnedRows', type: 'PinnedRows<T>', default: '—', description: 'Controlled { top, bottom } pinned rows' },
            { name: 'onPinnedRowsChange', type: '(pinned) => void', default: '—', description: 'Pinned rows change callback' },
            { name: 'isRowPinnable', type: '(row, index) => boolean', default: '—', description: 'Conditionally allow pinning a row' },
            { name: 'showPinRowAction', type: 'boolean', default: 'false', description: 'Show pin/unpin in the row actions menu' },
            { name: 'defaultPinnedRows', type: 'PinnedRows<T>', default: '—', description: 'Uncontrolled initial pinned rows' },
          ]}
        />

        <PropsTable
          title="Inline Editing"
          props={[
            { name: 'editable', type: 'boolean', default: 'false', description: 'Enable inline cell editing' },
            { name: 'onCellEdit', type: '(rowKey, columnId, newValue, oldValue, row) => void | Promise<void>', default: '—', description: 'Fires on edit save' },
            { name: 'editMode', type: "'click' | 'doubleClick' | 'button'", default: "'doubleClick'", description: 'What triggers edit mode' },
            { name: 'editingCell', type: '{ rowKey, columnId } | null', default: '—', description: 'Controlled editing cell' },
            { name: 'onEditingCellChange', type: '(cell) => void', default: '—', description: 'Editing cell change callback' },
          ]}
        />

        <PropsTable
          title="Export"
          props={[
            { name: 'exportable', type: 'boolean', default: 'false', description: 'Enable export menu' },
            { name: 'exportFormats', type: "('csv'|'json'|'xlsx'|'print')[]", default: "all formats", description: 'Which export formats to show' },
            { name: 'exportFilename', type: 'string', default: "'export'", description: 'Base filename for exports' },
            { name: 'onExport', type: "(format, data) => void", default: '—', description: 'Export callback' },
            { name: 'exportScope', type: "'visible' | 'selected' | 'all'", default: "'visible'", description: 'Which rows to export' },
            { name: 'exportAllColumns', type: 'boolean', default: 'false', description: 'Include hidden columns in export' },
            { name: 'csvOptions', type: 'CsvExportOptions', default: '—', description: 'delimiter / includeBOM / escapeFormulas / includeHeaders' },
            { name: 'onExportStart', type: '(format, rowCount) => void', default: '—', description: 'Fires when export begins' },
            { name: 'onExportComplete', type: '(format, rowCount, success, error?) => void', default: '—', description: 'Fires when export finishes' },
            { name: 'printTitle', type: 'string', default: '—', description: 'Title on the printed page' },
            { name: 'printShowDate', type: 'boolean', default: 'true', description: 'Show date/time when printing' },
            { name: 'onPrint', type: '() => void', default: '—', description: 'Fires before the print dialog opens' },
          ]}
        />

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
            { name: 'onStateChange', type: '(state: TableState) => void', default: '—', description: 'Fires on any state change — convenient for server fetches' },
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
            { name: 'showInfoBar', type: "boolean | 'auto'", default: "'auto'", description: "Shows only when there's active context when 'auto'" },
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

        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">Column definition object passed to the <code>columns</code> prop.</p>
          <PropsTable
            title="ColumnDef<T>"
            props={[
              { name: 'id', type: 'string', default: '—', description: 'Unique column id', required: true },
              { name: 'header', type: 'ReactNode | (props) => ReactNode', default: '—', description: 'Header content', required: true },
              { name: 'cell', type: '(props) => ReactNode', default: '—', description: 'Custom cell renderer' },
              { name: 'accessor', type: 'string | (row) => unknown', default: '—', description: 'How to read the cell value from a row' },
              { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable sorting for this column' },
              { name: 'sortFn', type: '(a, b, dir) => number', default: '—', description: 'Custom comparator' },
              { name: 'filterable', type: 'boolean', default: 'false', description: 'Enable filtering for this column' },
              { name: 'filterConfig', type: 'ColumnFilterConfig', default: '—', description: 'Filter type, operators, and options' },
              { name: 'width / minWidth / maxWidth', type: 'string | number', default: '—', description: 'Column sizing' },
              { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Cell text alignment' },
              { name: 'pin', type: "'left' | 'right'", default: '—', description: 'Default pin position' },
              { name: 'hidden / hideable', type: 'boolean', default: 'false', description: 'Default visibility / whether it can be hidden' },
              { name: 'resizable / reorderable', type: 'boolean', default: 'false', description: 'Per-column overrides for the table-level setting' },
              { name: 'disableExport', type: 'boolean', default: 'false', description: 'Exclude this column from exports' },
              { name: 'aggregate', type: "AggregateFunction | (values) => unknown", default: '—', description: "'sum' | 'avg' | 'min' | 'max' | 'count' | 'countDistinct', or a custom function" },
              { name: 'summaryCell', type: '(props: SummaryCellProps<T>) => ReactNode', default: '—', description: 'Custom summary cell renderer' },
              { name: 'editable', type: 'boolean', default: 'false', description: 'Allow inline editing for this column' },
              { name: 'editCell', type: '(props: EditCellProps<T>) => ReactNode', default: '—', description: 'Custom edit input renderer' },
              { name: 'validator', type: '(value, row) => string | null', default: '—', description: 'Returns an error message, or null if valid' },
              { name: 'editType', type: "'text' | 'number' | 'boolean' | 'select'", default: '—', description: 'Input type hint for the auto-generated editor' },
              { name: 'editOptions', type: '{ value, label }[]', default: '—', description: "Options for editType: 'select'" },
            ]}
          />
        </div>
      </div>
    </ComponentPage>
  );
}
