import { useState, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { PencilSimple, Trash, PushPin } from 'invin-uix/ui/icons';
import { incidents, incidentColumns, assets, orgTree, StatusBadge } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// ROW ACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const ROW_ACTIONS_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'status', header: 'Status', accessor: 'status' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', status: 'open' },
  { id: 'INC-1009', title: 'Port scan from external IP', status: 'closed' },
];

// Static form — same actions for every row
const rowActions = [
  { id: 'view', label: 'View details', shortcut: '↵', onClick: (r) => openDetails(r) },
];

// Function form — actions can depend on the row (e.g. disable "Close" if already closed)
const rowActions = (row) => [
  { id: 'view', label: 'View details', shortcut: '↵', onClick: (r) => openDetails(r) },
  { id: 'assign', label: 'Reassign', onClick: (r) => openAssignDialog(r) },
  { id: 'divider', divider: true }, // separator — no label or onClick needed
  { id: 'close', label: 'Close incident', destructive: true, disabled: row.status === 'closed', onClick: (r) => closeIncident(r) },
];

<DataTable columns={columns} data={data} rowKey="id" rowActions={rowActions} paginated={false} />`;

function RowActionsExample() {
  const rowActions = useCallback((row) => [
    { id: 'view', label: 'View details', shortcut: '↵', onClick: (r) => toast({ title: `Viewing ${r.id}` }) },
    { id: 'assign', label: 'Reassign', icon: <PencilSimple size={14} weight="bold" />, onClick: (r) => toast({ title: `Reassigning ${r.id}` }) },
    { id: 'divider', divider: true },
    { id: 'close', label: 'Close incident', destructive: true, disabled: row.status === 'closed', icon: <Trash size={14} weight="bold" />, onClick: (r) => toast({ title: `Closed ${r.id}`, variant: 'destructive' }) },
  ], []);

  return <DataTable columns={incidentColumns()} data={incidents} rowKey="id" rowActions={rowActions} paginated={false} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPANDABLE ROWS
// ═══════════════════════════════════════════════════════════════════════════════

const EXPANDABLE_ROWS_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', affectedAssets: 3, riskScore: 92 },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', affectedAssets: 1, riskScore: 78 },
];

function ExpandableTable() {
  const [expandedKeys, setExpandedKeys] = useState(['INC-1001']);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      expandable
      expandedKeys={expandedKeys}
      onExpandedKeysChange={setExpandedKeys}
      expandMultiple
      expandedRowRender={(row) => (
        <div className="p-4 text-caption text-[var(--muted-foreground)]">
          Affected assets: {row.affectedAssets} · Risk score: {row.riskScore}
        </div>
      )}
    />
  );
}`;

function ExpandableRowsExample() {
  const [expandedKeys, setExpandedKeys] = useState(['INC-1001']);

  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      expandable
      expandedKeys={expandedKeys}
      onExpandedKeysChange={setExpandedKeys}
      expandMultiple
      expandedRowRender={(row) => (
        <div className="p-4 text-caption text-[var(--muted-foreground)]">
          Affected assets: {row.affectedAssets} · Risk score: {row.riskScore}
        </div>
      )}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW GROUPING
// ═══════════════════════════════════════════════════════════════════════════════

const ROW_GROUPING_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'department', header: 'Department', accessor: 'department' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', department: 'SOC', severity: 'critical' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', department: 'NetOps', severity: 'medium' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  groupBy="department" // or ['department', 'severity'] for multi-level grouping
  defaultGroupExpanded
  showGroupCount
  paginated={false}
/>`;

function RowGroupingExample() {
  const [multiLevel, setMultiLevel] = useState(false);

  return (
    <div className="space-y-3">
      <Button size="sm" variant={multiLevel ? 'secondary' : 'ghost'} onClick={() => setMultiLevel((v) => !v)}>
        {multiLevel ? 'Multi-level grouping (department → severity)' : 'Single-level grouping (department)'}
      </Button>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        groupBy={multiLevel ? ['department', 'severity'] : 'department'}
        defaultGroupExpanded
        showGroupCount
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TREE DATA
// ═══════════════════════════════════════════════════════════════════════════════

const TREE_DATA_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'name', header: 'Team', accessor: 'name' },
  { id: 'role', header: 'Role', accessor: 'role' },
  { id: 'headcount', header: 'Headcount', accessor: 'headcount', align: 'right' },
];

const data = [
  {
    id: 'dept-soc', name: 'Security Operations', role: 'Department', headcount: 12,
    children: [
      { id: 'team-triage', name: 'Triage Team', role: 'Team', headcount: 5 },
    ],
  },
];

function TreeDataTable() {
  const [treeExpandedKeys, setTreeExpandedKeys] = useState(['dept-soc']);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      treeData
      getSubRows={(row) => row.children}
      treeExpandedKeys={treeExpandedKeys}
      onTreeExpandedChange={setTreeExpandedKeys}
      treeIndent={20}
      showTreeLines
    />
  );
}`;

function TreeDataExample() {
  const [treeExpandedKeys, setTreeExpandedKeys] = useState(['dept-soc']);

  return (
    <DataTable
      columns={[
        { id: 'name', header: 'Team', accessor: 'name' },
        { id: 'role', header: 'Role', accessor: 'role' },
        { id: 'headcount', header: 'Headcount', accessor: 'headcount', align: 'right' },
      ]}
      data={orgTree}
      rowKey="id"
      treeData
      getSubRows={(row) => row.children}
      treeExpandedKeys={treeExpandedKeys}
      onTreeExpandedChange={setTreeExpandedKeys}
      treeIndent={20}
      showTreeLines
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW PINNING
// ═══════════════════════════════════════════════════════════════════════════════

const ROW_PINNING_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1006', title: 'Privilege escalation on DB host', severity: 'critical' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high' },
];

function RowPinningTable() {
  const [pinnedRows, setPinnedRows] = useState({ top: [data[0]], bottom: [] });

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      pinnedRows={pinnedRows}
      onPinnedRowsChange={setPinnedRows}
      isRowPinnable={(row) => row.severity === 'critical'}
      showPinRowAction
      rowActions={() => [{ id: 'info', label: 'Pin / unpin from the row menu', onClick: () => {} }]}
    />
  );
}`;

function RowPinningExample() {
  const [pinnedRows, setPinnedRows] = useState({ top: [incidents[5]], bottom: [] });

  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">The most critical incident is pinned to the top regardless of sort/filter.</p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        pinnedRows={pinnedRows}
        onPinnedRowsChange={setPinnedRows}
        isRowPinnable={(row) => row.severity === 'critical'}
        showPinRowAction
        rowActions={() => [{ id: 'info', label: 'Pin / unpin from the ⋮ menu', icon: <PushPin size={14} weight="bold" />, onClick: () => {} }]}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW DRAG & DROP
// ═══════════════════════════════════════════════════════════════════════════════

const ROW_DRAG_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'name', header: 'Asset', accessor: 'name' },
  { id: 'type', header: 'Type', accessor: 'type' },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
];

function DraggableTable({ initialData }) {
  const [rows, setRows] = useState(initialData);

  const handleDragEnd = useCallback((from, to) => {
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  return (
    <DataTable
      columns={columns}
      data={rows}
      rowKey="id"
      rowDraggable
      dragHandleColumn
      onRowDragEnd={handleDragEnd}
    />
  );
}`;

function RowDragExample() {
  const [rows, setRows] = useState(assets.slice(0, 6));

  const handleDragEnd = useCallback((from, to) => {
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    toast({ title: 'Asset priority order updated', variant: 'success' });
  }, []);

  return (
    <DataTable
      columns={[
        { id: 'name', header: 'Asset', accessor: 'name' },
        { id: 'type', header: 'Type', accessor: 'type' },
        { id: 'owner', header: 'Owner', accessor: 'owner' },
        { id: 'status', header: 'Status', accessor: 'status', cell: ({ value }) => <StatusBadge value={value} /> },
      ]}
      data={rows}
      rowKey="id"
      rowDraggable
      dragHandleColumn
      onRowDragEnd={handleDragEnd}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableRowsDemo() {
  return (
    <ComponentPage
      name="DataTable — Rows"
      description="Per-row action menus, expandable detail rows, grouping, hierarchical tree data, row pinning, and drag-and-drop reordering."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      <PlaygroundSection title="Row Actions" description="Per-row action menu — static array or a function of (row, index)." code={ROW_ACTIONS_CODE}>
        <RowActionsExample />
      </PlaygroundSection>

      <PlaygroundSection title="Expandable Rows" description="Expand a row to reveal custom detail content inline." code={EXPANDABLE_ROWS_CODE}>
        <ExpandableRowsExample />
      </PlaygroundSection>

      <PlaygroundSection title="Row Grouping" description="Group rows by one or more columns, with collapsible group headers." code={ROW_GROUPING_CODE}>
        <RowGroupingExample />
      </PlaygroundSection>

      <PlaygroundSection title="Tree Data" description="Hierarchical rows via getSubRows — useful for org charts or nested assets." code={TREE_DATA_CODE}>
        <TreeDataExample />
      </PlaygroundSection>

      <PlaygroundSection title="Row Pinning" description="Pin specific rows to the top or bottom, independent of sort/filter." code={ROW_PINNING_CODE}>
        <RowPinningExample />
      </PlaygroundSection>

      <PlaygroundSection title="Row Drag & Drop" description="Reorder rows by dragging a dedicated handle." code={ROW_DRAG_CODE}>
        <RowDragExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Row Actions"
          props={[
            { name: 'rowActions', type: 'RowAction<T>[] | (row, index) => RowAction<T>[]', default: '—', description: 'Per-row action menu' },
          ]}
        />

        <PropsTable
          title="RowAction object"
          props={[
            { name: 'id', type: 'string', required: true, description: 'Unique identifier' },
            { name: 'label', type: 'ReactNode', required: true, description: 'Display text — shown in the menu item' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon shown to the left of the label' },
            { name: 'onClick', type: '(row, index) => void', default: '—', description: 'Called when the item is clicked. Optional for divider items.' },
            { name: 'disabled', type: 'boolean | (row) => boolean', default: 'false', description: 'Disable the item. Function form receives the row for per-row logic.' },
            { name: 'destructive', type: 'boolean', default: 'false', description: 'Renders the item in error/destructive color' },
            { name: 'shortcut', type: 'string', default: '—', description: 'Keyboard shortcut label shown on the right (display only, not wired)' },
            { name: 'divider', type: 'boolean', default: 'false', description: 'Render a separator line instead of a menu item. id is still required.' },
          ]}
        />

        <PropsTable
          title="Expandable Rows"
          props={[
            { name: 'expandable', type: 'boolean', default: 'false', description: 'Enable row expansion' },
            { name: 'expandedRowRender', type: '(row, index) => ReactNode', default: '—', description: 'Expanded content renderer' },
            { name: 'expandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded row keys' },
            { name: 'onExpandedKeysChange', type: '(keys) => void', default: '—', description: 'Expansion change callback' },
            { name: 'expandMultiple', type: 'boolean', default: 'false', description: 'Allow more than one expanded row' },
          ]}
        />

        <PropsTable
          title="Row Grouping"
          props={[
            { name: 'groupBy', type: 'string | string[]', default: '—', description: 'Column id(s) to group rows by' },
            { name: 'groupExpanded', type: 'Record<string, boolean>', default: '—', description: 'Controlled expanded groups' },
            { name: 'onGroupExpandedChange', type: '(state) => void', default: '—', description: 'Group expansion change callback' },
            { name: 'defaultGroupExpanded', type: 'boolean', default: 'true', description: 'Initial expanded state for all groups' },
            { name: 'groupRowRender', type: '(props: GroupRowProps<T>) => ReactNode', default: '—', description: 'Custom group header renderer' },
            { name: 'showGroupCount', type: 'boolean', default: 'true', description: 'Show row count in group headers' },
          ]}
        />

        <PropsTable
          title="Tree Data"
          props={[
            { name: 'treeData', type: 'boolean', default: 'false', description: 'Enable hierarchical tree rows' },
            { name: 'getSubRows', type: '(row) => T[] | undefined', default: '—', description: 'Returns child rows for a parent row' },
            { name: 'treeExpandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded tree node keys' },
            { name: 'onTreeExpandedChange', type: '(keys) => void', default: '—', description: 'Tree expansion change callback' },
            { name: 'defaultTreeExpanded', type: 'boolean', default: 'false', description: 'Initial expanded state for all nodes' },
            { name: 'treeIndent', type: 'number', default: '24', description: 'Indentation per tree level, in px' },
            { name: 'showTreeLines', type: 'boolean', default: 'false', description: 'Draw connecting lines between tree rows' },
          ]}
        />

        <PropsTable
          title="Row Pinning"
          props={[
            { name: 'pinnedRows', type: 'PinnedRows<T>', default: '—', description: 'Controlled { top, bottom } pinned rows' },
            { name: 'onPinnedRowsChange', type: '(pinned) => void', default: '—', description: 'Pinned rows change callback' },
            { name: 'isRowPinnable', type: '(row, index) => boolean', default: '—', description: 'Conditionally allow pinning a row' },
            { name: 'showPinRowAction', type: 'boolean', default: 'false', description: 'Show pin/unpin in the row actions menu' },
            { name: 'defaultPinnedRows', type: 'PinnedRows<T>', default: '—', description: 'Uncontrolled initial pinned rows' },
          ]}
        />

        <PropsTable
          title="Row Drag & Drop"
          props={[
            { name: 'rowDraggable', type: 'boolean', default: 'false', description: 'Enable row drag-and-drop' },
            { name: 'onRowDragEnd', type: '(from, to, row) => void', default: '—', description: 'Fires after a row is dropped' },
            { name: 'dragHandleColumn', type: 'boolean', default: 'false', description: 'Use a dedicated drag handle instead of the whole row' },
            { name: 'isRowDraggable', type: '(row, index) => boolean', default: '—', description: 'Conditionally allow dragging a row' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
