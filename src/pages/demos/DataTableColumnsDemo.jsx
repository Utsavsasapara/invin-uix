import { useState, useMemo } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { DropdownMenuItem } from 'invin-uix/ui/dropdown-menu';
import { Button } from 'invin-uix/ui/button';
import { Star, Copy, ArrowsOutCardinal } from '@phosphor-icons/react';
import { incidents, incidentColumns, SeverityBadge, StatusBadge, SEVERITIES } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN VISIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_VISIBILITY_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// IMPORTANT: columns that can be hidden must have hideable: true on their ColumnDef.
// Columns WITHOUT hideable (or with hideable: false) are always visible — they won't
// appear in the visibility toggle dropdown.

const columns = [
  { id: 'id',         header: 'ID',         accessor: 'id' },          // always visible
  { id: 'title',      header: 'Title',       accessor: 'title' },       // always visible
  { id: 'department', header: 'Department',  accessor: 'department', hideable: true },  // toggleable
  { id: 'assignee',   header: 'Assignee',    accessor: 'assignee',   hideable: true },  // toggleable
  { id: 'riskScore',  header: 'Risk Score',  accessor: 'riskScore',  hideable: true },  // toggleable
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', department: 'SOC', assignee: 'Aditi Rao', riskScore: 92 },
];

// Controlled mode — you manage which columns are hidden
function ColumnVisibilityTable() {
  const [hiddenColumns, setHiddenColumns] = useState([]);   // [] = all visible

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      columnVisibility               // shows the "Columns" toggle button in the toolbar
      hiddenColumns={hiddenColumns}  // controlled: which columns are currently hidden
      onHiddenColumnsChange={setHiddenColumns}
      paginated={false}
    />
  );
}

// Uncontrolled mode — hide columns on mount without managing state
function ColumnVisibilityUncontrolledTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      columnVisibility
      defaultHiddenColumns={['riskScore']}  // riskScore hidden on mount; user can toggle it back
      paginated={false}
    />
  );
}`;

function ColumnVisibilityExample() {
  const [mode, setMode] = useState('controlled');
  const columns = useMemo(() => incidentColumns({
    department: { hideable: true },
    assignee:   { hideable: true },
    riskScore:  { hideable: true },
  }), []);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant={mode === 'controlled' ? 'secondary' : 'ghost'} onClick={() => setMode('controlled')}>Controlled</Button>
        <Button size="sm" variant={mode === 'uncontrolled' ? 'secondary' : 'ghost'} onClick={() => setMode('uncontrolled')}>Uncontrolled (defaultHiddenColumns)</Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {mode === 'controlled'
          ? 'Click "Columns" in the toolbar to toggle Department, Assignee, and Risk Score.'
          : 'Risk Score is hidden by default via defaultHiddenColumns. No state needed.'}
      </p>
      {mode === 'controlled' ? (
        <DataTable columns={columns} data={incidents} rowKey="id"
          columnVisibility hiddenColumns={hiddenColumns} onHiddenColumnsChange={setHiddenColumns} paginated={false} />
      ) : (
        <DataTable columns={columns} data={incidents} rowKey="id"
          columnVisibility defaultHiddenColumns={['riskScore']} paginated={false} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN RESIZING
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_RESIZING_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// FEATURES:
// • Drag the right edge of any column header to resize it (mouse + touch)
// • Double-click the resize handle to auto-fit the column to its natural width
// • minWidth / maxWidth on ColumnDef sets resize bounds
// • ColumnDef.resizable: false locks a specific column (cannot be resized)
// • columnResizeMode: 'onChange' (DEFAULT, live) | 'onEnd' (fires on mouse release)
// • onColumnWidthReset fires when the user double-clicks or uses "Reset width"

const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id',       width: '100px',
    resizable: false },                   // ← LOCKED — this column cannot be resized
  { id: 'title',    header: 'Title',    accessor: 'title',
    minWidth: 160, maxWidth: 480 },       // ← bounded — cannot go narrower or wider
  { id: 'severity', header: 'Severity', accessor: 'severity' },
  { id: 'assignee', header: 'Assignee', accessor: 'assignee' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', assignee: 'Aditi Rao' },
];

// Controlled — you manage the widths
function ResizableTable() {
  const [columnWidths, setColumnWidths] = useState({});

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      resizable                     // ← enables drag-to-resize on all columns
      columnWidths={columnWidths}
      onColumnWidthChange={(id, width) =>
        setColumnWidths(w => ({ ...w, [id]: width }))
      }
      onColumnWidthReset={(id) =>        // ← fires on double-click or "Reset width"
        setColumnWidths(w => {
          const next = { ...w };
          delete next[id];               // remove stored width → column snaps back
          return next;
        })
      }
      // columnResizeMode="onChange"   ← this is the DEFAULT, no need to set it
      paginated={false}
    />
  );
}

// Uncontrolled — pre-set widths, no state needed
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  resizable
  defaultColumnWidths={{ title: 300 }}  // Title starts at 300px
  paginated={false}
/>`;

function ColumnResizingExample() {
  const [mode, setMode] = useState('onChange');
  const [columnWidths, setColumnWidths] = useState({});
  const [lockedDemo, setLockedDemo] = useState(false);

  const columns = useMemo(() => incidentColumns({
    id:    { resizable: lockedDemo ? false : undefined },
    title: { minWidth: 160, maxWidth: 480 },
  }), [lockedDemo]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-2">
          <Button size="sm" variant={mode === 'onChange' ? 'secondary' : 'ghost'} onClick={() => setMode('onChange')}>
            onChange (live)
          </Button>
          <Button size="sm" variant={mode === 'onEnd' ? 'secondary' : 'ghost'} onClick={() => setMode('onEnd')}>
            onEnd (on release)
          </Button>
        </div>
        <Button size="sm" variant={lockedDemo ? 'secondary' : 'ghost'} onClick={() => setLockedDemo(v => !v)}>
          {lockedDemo ? 'ID column: LOCKED' : 'ID column: resizable'}
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        Drag column edges to resize. "Title" is bounded (min 160, max 480).
        <strong> Double-click</strong> a resize handle to auto-fit. Works on touch too.
        {lockedDemo && <> ID column is <code>resizable: false</code> — cannot be dragged.</>}
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        resizable
        columnWidths={columnWidths}
        onColumnWidthChange={(id, width) => setColumnWidths(w => ({ ...w, [id]: width }))}
        onColumnWidthReset={(id) => setColumnWidths(w => { const n = { ...w }; delete n[id]; return n; })}
        columnResizeMode={mode}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN REORDERING
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_REORDERING_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// FEATURES:
// • Drag column headers left/right to reorder
// • IMPORTANT: columnOrder must list ALL column IDs — columns not in the array
//   fall back to their definition order (can cause confusing behavior)
// • ColumnDef.reorderable: false — lock a specific column in place
// • IMPORTANT: Pinned columns are automatically excluded from drag-to-reorder
// • Works with controlled (columnOrder) and uncontrolled (defaultColumnOrder)

const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id',
    reorderable: false },               // ← LOCKED — cannot be dragged
  { id: 'title',    header: 'Title',    accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
  { id: 'status',   header: 'Status',   accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', status: 'open' },
];

// Controlled — you manage the column order
function ReorderableTable() {
  const [columnOrder, setColumnOrder] = useState(['id', 'title', 'severity', 'status']);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      reorderable                         // enables drag-to-reorder on column headers
      columnOrder={columnOrder}           // controlled: current display order (array of IDs)
      onColumnOrderChange={setColumnOrder}
      paginated={false}
    />
  );
}

// Uncontrolled — custom initial order, no state needed
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  reorderable
  defaultColumnOrder={['status', 'severity', 'id', 'title']}  // status first
  paginated={false}
/>`;

function ColumnReorderingExample() {
  const [mode, setMode] = useState('controlled');
  const [lockedDemo, setLockedDemo] = useState(false);
  const [columnOrder, setColumnOrder] = useState(['id', 'title', 'severity', 'status', 'assignee', 'department']);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={mode === 'controlled' ? 'secondary' : 'ghost'} onClick={() => setMode('controlled')}>Controlled</Button>
        <Button size="sm" variant={mode === 'uncontrolled' ? 'secondary' : 'ghost'} onClick={() => setMode('uncontrolled')}>Uncontrolled (defaultColumnOrder)</Button>
        <Button size="sm" variant={lockedDemo ? 'secondary' : 'ghost'} onClick={() => setLockedDemo(v => !v)}>
          {lockedDemo ? 'ID: LOCKED' : 'ID: reorderable'}
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        Drag any column header to reorder.
        {lockedDemo && <> ID is <code>reorderable: false</code> — it cannot be dragged.</>}
        {' '}Pinned columns are automatically excluded from reordering.
      </p>
      {mode === 'controlled' ? (
        <DataTable columns={incidentColumns({ id: lockedDemo ? { reorderable: false } : {} })} data={incidents} rowKey="id"
          reorderable columnOrder={columnOrder} onColumnOrderChange={setColumnOrder} paginated={false} />
      ) : (
        <DataTable columns={incidentColumns()} data={incidents} rowKey="id"
          reorderable defaultColumnOrder={['status', 'severity', 'id', 'title', 'assignee', 'department']} paginated={false} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN PINNING
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_PINNING_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// IMPORTANT: Pinning only has a visible effect when the table overflows horizontally
// (total column width > container width). For best results, use many wide columns
// or constrain the container width.
//
// BEHAVIOR: Pinned columns PHYSICALLY MOVE to the correct edge:
//   • Left-pinned → rendered as the leftmost columns (sticky at left)
//   • Right-pinned → rendered as the rightmost columns (sticky at right)
//   • Unpinned → scroll in the middle
//
// TWO ways to pin a column:
//   1. ColumnDef.pin — STATIC: the column starts pinned on mount; user can unpin via header menu
//   2. pinnedColumns prop — DYNAMIC: controlled state, can change at runtime
//
// NOTE: pinned columns are automatically excluded from drag-to-reorder
// NOTE: row hover / selected / striped states ARE reflected in pinned columns

const columns = [
  { id: 'id',         header: 'ID',         accessor: 'id',         width: '90px',
    pin: 'left' },                    // ← static default: starts pinned left
  { id: 'title',      header: 'Title',       accessor: 'title',      width: '240px' },
  { id: 'severity',   header: 'Severity',    accessor: 'severity',   width: '120px' },
  { id: 'status',     header: 'Status',      accessor: 'status',     width: '140px' },
  { id: 'assignee',   header: 'Assignee',    accessor: 'assignee',   width: '150px' },
  { id: 'department', header: 'Department',  accessor: 'department', width: '140px' },
  { id: 'riskScore',  header: 'Risk Score',  accessor: 'riskScore',  width: '110px',
    pin: 'right' },                   // ← static default: starts pinned right
];

const data = [/* ...rows */];

// Controlled — user can pin/unpin via column header menu
function PinnableTable() {
  const [pinnedColumns, setPinnedColumns] = useState({ left: ['id'], right: ['riskScore'] });

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      pinnableColumns             // shows pin/unpin in the column header menu
      columnHeaderMenu            // enables the header menu
      pinnedColumns={pinnedColumns}
      onPinnedColumnsChange={setPinnedColumns}
      paginated={false}
    />
  );
}

// Uncontrolled — initial pins, no state needed
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  pinnableColumns
  columnHeaderMenu
  defaultPinnedColumns={{ left: ['id'], right: [] }}
  paginated={false}
/>`;

function ColumnPinningExample() {
  const [side, setSide] = useState('left');
  const [pinnedColumns, setPinnedColumns] = useState({ left: ['id'], right: [] });

  // Wide explicit widths so columns overflow the container → pinning becomes visible
  const columns = useMemo(() => [
    { id: 'id',         header: 'ID',         accessor: 'id',         width: '90px' },
    { id: 'title',      header: 'Title',       accessor: 'title',      width: '240px' },
    { id: 'severity',   header: 'Severity',    accessor: 'severity',   width: '120px', cell: ({ value }) => <SeverityBadge value={value} /> },
    { id: 'status',     header: 'Status',      accessor: 'status',     width: '130px', cell: ({ value }) => <StatusBadge value={value} /> },
    { id: 'assignee',   header: 'Assignee',    accessor: 'assignee',   width: '150px' },
    { id: 'department', header: 'Department',  accessor: 'department', width: '140px' },
    { id: 'riskScore',  header: 'Risk Score',  accessor: 'riskScore',  width: '110px', align: 'right' },
  ], []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <span className="text-caption text-[var(--muted-foreground)]">Pin ID to:</span>
        <Button size="sm" variant={side === 'left' ? 'secondary' : 'ghost'}
          onClick={() => { setSide('left'); setPinnedColumns({ left: ['id'], right: [] }); }}>Left</Button>
        <Button size="sm" variant={side === 'right' ? 'secondary' : 'ghost'}
          onClick={() => { setSide('right'); setPinnedColumns({ left: [], right: ['id'] }); }}>Right</Button>
        <Button size="sm" variant={side === 'none' ? 'secondary' : 'ghost'}
          onClick={() => { setSide('none'); setPinnedColumns({ left: [], right: [] }); }}>Unpinned</Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        Scroll the table horizontally — the pinned column moves to the edge AND stays fixed.
        "Left" → ID appears as first column + sticks left. "Right" → ID moves to last column + sticks right.
        Use the ⋮ header menu to pin/unpin any column.
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        pinnableColumns
        columnHeaderMenu
        sortable
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={setPinnedColumns}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN GROUPS
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_GROUPS_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// columnGroups adds a shared header row above related columns.
// Each group spans its member columns - members must be adjacent in display order.
// Columns NOT in any group show an empty cell above them (the most common pattern -
// here 'id' and 'title' are left ungrouped).

const columns = [
  { id: 'id',         header: 'ID',         accessor: 'id' },
  { id: 'title',      header: 'Title',       accessor: 'title' },
  { id: 'severity',   header: 'Severity',    accessor: 'severity' },
  { id: 'status',     header: 'Status',      accessor: 'status' },
  { id: 'assignee',   header: 'Assignee',    accessor: 'assignee' },
  { id: 'department', header: 'Department',  accessor: 'department' },
];

// 'id' and 'title' are left out here - to group every column instead, add
// { id: 'identity', label: 'Identity', columnIds: ['id', 'title'] }
const columnGroups = [
  { id: 'triage',    label: 'Triage',     columnIds: ['severity', 'status'] },
  { id: 'ownership', label: 'Ownership',  columnIds: ['assignee', 'department'] },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt',
    severity: 'critical', status: 'open', assignee: 'Aditi Rao', department: 'SOC' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  columnGroups={columnGroups}
  showColumnGroupHeaders                                  // default: true when columnGroups is set
  columnGroupsClassName="border-b-2 border-[var(--accent)]/40"
  paginated={false}
/>`;

function ColumnGroupsExample() {
  const [partial, setPartial] = useState(false);

  const columns = useMemo(() => [
    { id: 'id',         header: 'ID',         accessor: 'id',         width: '100px' },
    { id: 'title',      header: 'Title',       accessor: 'title' },
    { id: 'severity',   header: 'Severity',    accessor: 'severity',   cell: ({ value }) => <SeverityBadge value={value} /> },
    { id: 'status',     header: 'Status',      accessor: 'status',     cell: ({ value }) => <StatusBadge value={value} /> },
    { id: 'assignee',   header: 'Assignee',    accessor: 'assignee' },
    { id: 'department', header: 'Department',  accessor: 'department' },
  ], []);

  const fullGroups = useMemo(() => [
    { id: 'identity',  label: 'Identity',  columnIds: ['id', 'title'] },
    { id: 'triage',    label: 'Triage',    columnIds: ['severity', 'status'] },
    { id: 'ownership', label: 'Ownership', columnIds: ['assignee', 'department'] },
  ], []);

  const partialGroups = useMemo(() => [
    { id: 'triage',    label: 'Triage',    columnIds: ['severity', 'status'] },
    { id: 'ownership', label: 'Ownership', columnIds: ['assignee', 'department'] },
  ], []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant={!partial ? 'secondary' : 'ghost'} onClick={() => setPartial(false)}>
          Full groups
        </Button>
        <Button size="sm" variant={partial ? 'secondary' : 'ghost'} onClick={() => setPartial(true)}>
          Partial groups
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {partial
          ? <>'id' and 'title' aren't in any group here — their cells render empty above them. This is the most common real-world pattern.</>
          : <>Every column belongs to a group. The groups row also demonstrates <code>columnGroupsClassName</code> with an accent border.</>}
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        columnGroups={partial ? partialGroups : fullGroups}
        showColumnGroupHeaders
        columnGroupsClassName="border-b-2 border-[var(--accent)]/40"
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN HEADER MENU
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_HEADER_MENU_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// columnHeaderMenu adds a ⋮ menu (or right-click) to each column header.
// Menu actions appear based on which features are enabled on the table:
//   Sort options      → requires sortable
//   Filter option     → requires columnFilterable + column.filterable
//   Pin options       → requires pinnableColumns
//   Hide option       → requires columnVisibility + column.hideable
//   Reset width       → requires resizable + column.resizable

const columns = [
  { id: 'id',       header: 'ID',       accessor: 'id' },
  { id: 'severity', header: 'Severity', accessor: 'severity',
    sortable: true,
    filterable: true,
    filterConfig: { type: 'select', options: ['critical', 'high', 'medium', 'low'] },
    hideable: true },
  { id: 'status',   header: 'Status',   accessor: 'status',
    sortable: true,
    hideable: true },
];

function ColumnHeaderMenuTable() {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pinnedColumns, setPinnedColumns] = useState({ left: [], right: [] });

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      // ← each enabled feature adds actions to the header menu
      sortable
      columnFilterable
      columnHeaderMenu         // the ⋮ menu trigger on each header
      columnVisibility
      pinnableColumns
      resizable                // adds "Reset width" once a column has been resized
      hiddenColumns={hiddenColumns}
      onHiddenColumnsChange={setHiddenColumns}
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      pinnedColumns={pinnedColumns}
      onPinnedColumnsChange={setPinnedColumns}
      paginated={false}
    />
  );
}`;

function ColumnHeaderMenuExample() {
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pinnedColumns, setPinnedColumns] = useState({ left: [], right: [] });
  const columns = useMemo(() => incidentColumns({
    severity: { filterable: true, filterConfig: { type: 'select', options: SEVERITIES }, hideable: true },
    status:   { filterable: true, filterConfig: { type: 'select', options: ['open', 'investigating', 'resolved', 'closed'] }, hideable: true },
    department: { hideable: true },
  }), []);

  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">
        Hover over a column header to reveal the ⋮ menu. Right-clicking also opens it. Available actions depend on which features are enabled.
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        sortable
        columnFilterable
        columnHeaderMenu
        columnVisibility
        pinnableColumns
        resizable
        hiddenColumns={hiddenColumns}
        onHiddenColumnsChange={setHiddenColumns}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        pinnedColumns={pinnedColumns}
        onPinnedColumnsChange={setPinnedColumns}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN HEADER MENU — CUSTOM ITEMS
// ═══════════════════════════════════════════════════════════════════════════════

const COLUMN_HEADER_MENU_CUSTOM_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';
import { DropdownMenuItem } from 'invin-uix/ui/dropdown-menu';
import { Star, Copy } from '@phosphor-icons/react';

// renderColumnHeaderMenuItems injects extra items into every column's header menu.
//
// Arguments:
//   column  — the ColumnDef for this column (id, header, accessor, …)
//   ctx     — live context with current state + action handlers:
//             { sortDirection, hasActiveFilter, pinnedPosition,
//               onSort, onOpenFilter, onPin, onHide, onResetWidth }
//
// Returns: ReactNode (one or more <DropdownMenuItem>) — or null for no extras.
// A separator is automatically inserted before your items when defaults are present.

function CustomMenuTable() {
  const [starred, setStarred] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      sortable
      columnHeaderMenu
      renderColumnHeaderMenuItems={(col, ctx) => (
        <>
          <DropdownMenuItem
            icon={<Star weight={starred.includes(col.id) ? 'fill' : 'regular'} />}
            onClick={() =>
              setStarred(prev =>
                prev.includes(col.id)
                  ? prev.filter(id => id !== col.id)
                  : [...prev, col.id]
              )
            }
          >
            {starred.includes(col.id) ? 'Unstar Column' : 'Star Column'}
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={<Copy />}
            onClick={() => navigator.clipboard.writeText(col.id)}
          >
            Copy Column ID
          </DropdownMenuItem>
        </>
      )}
      paginated={false}
    />
  );
}`;

function ColumnHeaderMenuCustomExample() {
  const [starred, setStarred] = useState([]);
  const [headerBadges, setHeaderBadges] = useState({});

  const columns = useMemo(() => incidentColumns({
    severity: { sortable: true },
    status:   { sortable: true },
    assignee: { sortable: true },
  }), []);

  // Augment column headers to show a ⭐ badge when starred
  const columnsWithBadges = useMemo(() =>
    columns.map(col => ({
      ...col,
      header: starred.includes(col.id)
        ? <span className="flex items-center gap-1">{col.header}<Star size={12} weight="fill" className="text-[var(--accent)]" /></span>
        : col.header,
    })),
  [columns, starred]);

  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">
        Hover a column header to see the ⋮ menu. A custom "Star Column" and "Copy Column ID" action appears below the defaults — added via <code>renderColumnHeaderMenuItems</code>.
        Starred columns get a ⭐ in their header.
      </p>
      <DataTable
        columns={columnsWithBadges}
        data={incidents}
        rowKey="id"
        sortable
        columnHeaderMenu
        renderColumnHeaderMenuItems={(col) => (
          <>
            <DropdownMenuItem
              icon={<Star size={16} weight={starred.includes(col.id) ? 'fill' : 'regular'} className={starred.includes(col.id) ? 'text-[var(--accent)]' : ''} />}
              onClick={() =>
                setStarred(prev =>
                  prev.includes(col.id)
                    ? prev.filter(id => id !== col.id)
                    : [...prev, col.id]
                )
              }
            >
              {starred.includes(col.id) ? 'Unstar Column' : 'Star Column'}
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<Copy size={16} />}
              onClick={() => navigator.clipboard?.writeText(col.id)}
            >
              Copy Column ID
            </DropdownMenuItem>
          </>
        )}
        paginated={false}
      />
      {starred.length > 0 && (
        <p className="text-caption text-[var(--accent)]">
          Starred: {starred.join(', ')}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableColumnsDemo() {
  return (
    <ComponentPage
      name="DataTable — Columns"
      description="Column visibility, resizing, reordering, pinning, grouped headers, and a unified column header menu. Each feature works independently or together."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <PlaygroundSection
        title="Column Visibility"
        description="Shows a 'Columns' toggle button in the toolbar. Only columns with hideable: true on their ColumnDef appear in the dropdown — others are always visible. Supports controlled and uncontrolled modes."
        code={COLUMN_VISIBILITY_CODE}
      >
        <ColumnVisibilityExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Resizing"
        description="Drag column header edges to resize (mouse + touch). Double-click a resize handle to auto-fit. Set ColumnDef.resizable: false to lock a column. onColumnWidthReset fires on auto-fit or 'Reset width' from the header menu."
        code={COLUMN_RESIZING_CODE}
      >
        <ColumnResizingExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Reordering"
        description="Drag column headers left/right to reorder. Pinned columns are automatically excluded. Set ColumnDef.reorderable: false to lock a specific column. columnOrder should list ALL column IDs."
        code={COLUMN_REORDERING_CODE}
      >
        <ColumnReorderingExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Pinning"
        description="Pin columns to the left or right edge. When pinned, columns PHYSICALLY MOVE to the correct edge (left-pinned columns first, right-pinned last) and become sticky while the rest scroll. Only visible when the table overflows horizontally. Pinned columns are excluded from drag-to-reorder."
        code={COLUMN_PINNING_CODE}
      >
        <ColumnPinningExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Groups"
        description="Add a shared header row above related columns. Each group spans its member columns — members must be adjacent in display order. Columns not in any group show an empty cell above them."
        code={COLUMN_GROUPS_CODE}
      >
        <ColumnGroupsExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Header Menu"
        description="A ⋮ menu (or right-click) on each column header. Menu actions are populated from enabled table features — sort, filter, pin, hide, reset width. Each action also requires the matching ColumnDef prop: filterable, hideable, or resizable."
        code={COLUMN_HEADER_MENU_CODE}
      >
        <ColumnHeaderMenuExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Column Header Menu — Custom Items"
        description="Use renderColumnHeaderMenuItems to inject your own items after the defaults. Receives the column definition and the current action context (sort state, filter state, pin state, and all action handlers). Return one or more DropdownMenuItem elements — a separator is inserted automatically."
        code={COLUMN_HEADER_MENU_CUSTOM_CODE}
      >
        <ColumnHeaderMenuCustomExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Column Visibility"
          props={[
            { name: 'columnVisibility', type: 'boolean', default: 'false', description: 'Show the "Columns" toggle button in the toolbar' },
            { name: 'hiddenColumns', type: 'string[]', default: '—', description: 'Controlled: array of hidden column IDs' },
            { name: 'onHiddenColumnsChange', type: '(ids) => void', default: '—', description: 'Called when user toggles a column' },
            { name: 'defaultHiddenColumns', type: 'string[]', default: '—', description: 'Uncontrolled initial hidden columns — no state needed' },
            { name: 'columnVisibilityClassName', type: 'string', default: '—', description: 'Custom class on the visibility toggle button' },
            { name: 'ColumnDef.hideable', type: 'boolean', default: 'true', description: 'false = column never appears in the toggle dropdown (always visible)' },
          ]}
        />

        <PropsTable
          title="Column Resizing"
          props={[
            { name: 'resizable', type: 'boolean', default: 'false', description: 'Enable drag-to-resize on all columns' },
            { name: 'columnWidths', type: 'Record<string, number>', default: '—', description: 'Controlled: current widths in pixels keyed by column ID' },
            { name: 'onColumnWidthChange', type: '(columnId, width) => void', default: '—', description: 'Called as user drags (or on release if onEnd mode)' },
            { name: 'onColumnWidthReset', type: '(columnId) => void', default: '—', description: 'Called when the user double-clicks a resize handle (auto-fit) or clicks "Reset width" in the header menu. Use this to delete the stored width from your state.' },
            { name: 'defaultColumnWidths', type: 'Record<string, number>', default: '—', description: 'Uncontrolled initial widths — no state needed' },
            { name: 'columnResizeMode', type: "'onChange' | 'onEnd'", default: "'onChange'", description: "Default 'onChange' = live updates while dragging — no need to set it explicitly. 'onEnd' = only fires on mouse release." },
            { name: 'columnResizeDirection', type: "'ltr' | 'rtl'", default: "'ltr'", description: 'Set to rtl for right-to-left layouts' },
            { name: 'ColumnDef.width', type: 'string | number', default: '—', description: 'Initial column width (e.g. "120px" or 120). Sets the starting width before any resize.' },
            { name: 'ColumnDef.minWidth', type: 'number', default: '—', description: 'Minimum resize width in px — user cannot drag narrower than this' },
            { name: 'ColumnDef.maxWidth', type: 'number', default: '—', description: 'Maximum resize width in px — user cannot drag wider than this' },
            { name: 'ColumnDef.resizable', type: 'boolean', default: 'true (when resizable)', description: 'Set false to lock this column — its resize handle is hidden and width is fixed' },
          ]}
        />

        <PropsTable
          title="Column Reordering"
          props={[
            { name: 'reorderable', type: 'boolean', default: 'false', description: 'Enable drag-to-reorder column headers' },
            { name: 'columnOrder', type: 'string[]', default: '—', description: 'Controlled: array of ALL column IDs in display order. Columns not listed fall back to definition order.' },
            { name: 'onColumnOrderChange', type: '(order) => void', default: '—', description: 'Called when user drops a column to a new position' },
            { name: 'defaultColumnOrder', type: 'string[]', default: '—', description: 'Uncontrolled initial order — no state needed' },
            { name: 'ColumnDef.reorderable', type: 'boolean', default: 'true (when reorderable)', description: 'Set false to lock this column — it cannot be dragged. Pinned columns are also excluded automatically.' },
          ]}
        />

        <PropsTable
          title="Column Pinning"
          props={[
            { name: 'pinnableColumns', type: 'boolean', default: 'false', description: 'Enable pin/unpin via column header menu. When columns are pinned, they physically move to the correct edge: left-pinned columns appear first, right-pinned columns appear last.' },
            { name: 'pinnedColumns', type: '{ left?: string[]; right?: string[] }', default: '—', description: 'Controlled: which columns are pinned and to which side. Left-pinned columns are rendered first; right-pinned columns are rendered last. Takes precedence over ColumnDef.pin.' },
            { name: 'onPinnedColumnsChange', type: '(pinned) => void', default: '—', description: 'Called when user pins or unpins a column via the header menu' },
            { name: 'defaultPinnedColumns', type: '{ left?: string[]; right?: string[] }', default: '—', description: 'Uncontrolled initial pins — no state needed' },
            { name: 'ColumnDef.pin', type: "'left' | 'right'", default: '—', description: 'Static starting pin position. The column starts pinned on mount. User can unpin via the header menu (if pinnableColumns is enabled). The column will be rendered at the correct edge automatically.' },
          ]}
        />

        <PropsTable
          title="Column Groups"
          props={[
            { name: 'columnGroups', type: 'ColumnGroup[]', default: '—', description: 'Group related columns under shared header labels. Group members must be adjacent in display order — reordering columns may split a group into multiple header cells.' },
            { name: 'showColumnGroupHeaders', type: 'boolean', default: 'true when columnGroups set', description: 'Show or hide the groups header row' },
            { name: 'columnGroupsClassName', type: 'string', default: '—', description: 'Custom class on the column groups header <tr> element' },
          ]}
        />

        <PropsTable
          title="Column Header Menu"
          props={[
            { name: 'columnHeaderMenu', type: 'boolean', default: 'false', description: 'Show ⋮ menu and right-click menu on column headers. Menu actions are populated from enabled features: sort (sortable), filter (columnFilterable + ColumnDef.filterable), pin (pinnableColumns), hide (columnVisibility + ColumnDef.hideable), reset width (resizable + ColumnDef.resizable). Right-clicking any column header also opens the menu.' },
            { name: 'renderColumnHeaderMenuItems', type: '(column, ctx) => ReactNode', default: '—', description: 'Inject custom items after the default menu actions. A separator is inserted automatically before your items. ctx exposes: sortDirection, hasActiveFilter, pinnedPosition, onSort, onOpenFilter, onClearFilter, onPin, onHide, onResetWidth.' },
          ]}
        />

        <PropsTable
          title="ColumnGroup object"
          props={[
            { name: 'id', type: 'string', default: '—', required: true, description: 'Unique identifier for the group' },
            { name: 'label', type: 'string', default: '—', required: true, description: 'Text shown in the group header cell' },
            { name: 'columnIds', type: 'string[]', default: '—', required: true, description: 'Column IDs belonging to this group. Must be adjacent in display order for a single spanning header cell.' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
