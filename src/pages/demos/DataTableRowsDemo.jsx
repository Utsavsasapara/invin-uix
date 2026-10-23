import { useState, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { Badge } from 'invin-uix/ui/badge';
import { PencilSimple, Trash, PushPin, CaretRight } from 'invin-uix/ui/icons';
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

const EXPANDABLE_ROWS_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', department: 'SOC', affectedAssets: 3, riskScore: 92, assignee: 'Aditi Rao' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', department: 'SOC', affectedAssets: 1, riskScore: 78, assignee: 'Marcus Webb' },
];

// expandedRowRender receives (row, index) — index is the row's position in data[]
// defaultExpandedKeys opens rows on first render without state management

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  expandable
  defaultExpandedKeys={['INC-1001']}   // uncontrolled — no useState needed
  // expandMultiple                    // default: false (one open at a time)
  expandedRowRender={(row) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-caption">
      <div>
        <p className="text-[var(--muted-foreground)] mb-1">Department</p>
        <p className="font-medium">{row.department}</p>
      </div>
      <div>
        <p className="text-[var(--muted-foreground)] mb-1">Affected Assets</p>
        <p className="font-medium">{row.affectedAssets}</p>
      </div>
      <div>
        <p className="text-[var(--muted-foreground)] mb-1">Risk Score</p>
        <p className="font-medium">{row.riskScore}</p>
      </div>
      <div>
        <p className="text-[var(--muted-foreground)] mb-1">Assignee</p>
        <p className="font-medium">{row.assignee}</p>
      </div>
    </div>
  )}
  paginated={false}
/>`;

function ExpandableRowsExample() {
  const [expandedKeys, setExpandedKeys] = useState(['INC-1001']);
  const [multi, setMulti] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={!multi ? 'secondary' : 'ghost'}
          onClick={() => { setMulti(false); setExpandedKeys((k) => k.slice(0, 1)); }}
        >
          Single expand (default)
        </Button>
        <Button size="sm" variant={multi ? 'secondary' : 'ghost'} onClick={() => setMulti(true)}>
          expandMultiple
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {multi
          ? 'Multiple rows can be open simultaneously.'
          : 'Expanding a row collapses the previously open one (expandMultiple defaults to false).'}
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        expandable
        expandMultiple={multi}
        expandedKeys={expandedKeys}
        onExpandedKeysChange={setExpandedKeys}
        expandedRowRender={(row) => (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-caption">
            <div>
              <p className="text-[var(--muted-foreground)] mb-1">Department</p>
              <p className="font-medium">{row.department}</p>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] mb-1">Affected Assets</p>
              <p className="font-medium">{row.affectedAssets}</p>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] mb-1">Risk Score</p>
              <p className="font-medium">{row.riskScore}</p>
            </div>
            <div>
              <p className="text-[var(--muted-foreground)] mb-1">Assignee</p>
              <p className="font-medium">{row.assignee}</p>
            </div>
          </div>
        )}
        paginated={false}
      />
    </div>
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
  groupBy="department"          // or ['department', 'severity'] for multi-level grouping
  defaultGroupExpanded          // true by default — all groups start expanded
  // defaultGroupExpanded={false}  // start collapsed
  showGroupCount                // shows (8 items) in the group header
  paginated={false}
/>`;

function RowGroupingExample() {
  const [multiLevel, setMultiLevel] = useState(false);
  const [startCollapsed, setStartCollapsed] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant={!multiLevel ? 'secondary' : 'ghost'} onClick={() => setMultiLevel(false)}>
          Single-level (department)
        </Button>
        <Button size="sm" variant={multiLevel ? 'secondary' : 'ghost'} onClick={() => setMultiLevel(true)}>
          Multi-level (department → severity)
        </Button>
        <Button size="sm" variant={startCollapsed ? 'secondary' : 'ghost'} onClick={() => setStartCollapsed((v) => !v)}>
          {startCollapsed ? 'defaultGroupExpanded={false}' : 'defaultGroupExpanded (true)'}
        </Button>
      </div>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        groupBy={multiLevel ? ['department', 'severity'] : 'department'}
        defaultGroupExpanded={!startCollapsed}
        showGroupCount
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROW GROUPING — CUSTOM HEADER
// ═══════════════════════════════════════════════════════════════════════════════

const ROW_GROUPING_CUSTOM_CODE = `import { DataTable } from 'invin-uix/ui/data-table';
import { Badge } from 'invin-uix/ui/badge';
import { CaretRight } from 'invin-uix/ui/icons';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'department', header: 'Department', accessor: 'department' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', department: 'SOC' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', department: 'NetOps' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  groupBy="department"
  groupRowRender={(props) => (
    <div
      className="flex items-center gap-3 cursor-pointer"
      style={{ paddingLeft: \`\${props.level * 24}px\` }}
      onClick={props.onToggle}
    >
      <CaretRight
        size={14}
        className={\`text-[var(--muted-foreground)] transition-transform \${props.isExpanded ? 'rotate-90' : ''}\`}
      />
      <span className="text-[var(--muted-foreground)] text-sm">Department:</span>
      <Badge variant="outline">{props.groupLabel}</Badge>
      <span className="text-xs text-[var(--muted-foreground)] ml-auto">
        {props.count} incident{props.count !== 1 ? 's' : ''}
      </span>
    </div>
  )}
  paginated={false}
/>`;

function RowGroupingCustomExample() {
  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      groupBy="department"
      groupRowRender={(props) => (
        <div
          className="flex items-center gap-3 cursor-pointer"
          style={{ paddingLeft: `${props.level * 24}px` }}
          onClick={props.onToggle}
        >
          <CaretRight
            size={14}
            className={`text-[var(--muted-foreground)] transition-transform ${props.isExpanded ? 'rotate-90' : ''}`}
          />
          <span className="text-[var(--muted-foreground)] text-sm">Department:</span>
          <Badge variant="outline">{props.groupLabel}</Badge>
          <span className="text-xs text-[var(--muted-foreground)] ml-auto">
            {props.count} incident{props.count !== 1 ? 's' : ''}
          </span>
        </div>
      )}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TREE DATA
// ═══════════════════════════════════════════════════════════════════════════════

const TREE_DATA_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

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

// defaultTreeExpanded={false} — all nodes start collapsed (the default)
// defaultTreeExpanded         — all nodes start expanded

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  treeData
  getSubRows={(row) => row.children}   // returning undefined = leaf node
  defaultTreeExpanded                   // start all expanded
  treeIndent={20}                       // px per level (default: 24)
  showTreeLines                         // draw connecting lines
  paginated={false}
/>`;

function TreeDataExample() {
  const [treeExpandedKeys, setTreeExpandedKeys] = useState(['dept-soc']);
  const [showLines, setShowLines] = useState(true);

  return (
    <div className="space-y-3">
      <Button size="sm" variant={showLines ? 'secondary' : 'ghost'} onClick={() => setShowLines((v) => !v)}>
        {showLines ? 'showTreeLines' : 'showTreeLines={false}'}
      </Button>
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
        showTreeLines={showLines}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TREE DATA — CUSTOM ROW RENDER
// ═══════════════════════════════════════════════════════════════════════════════

const TREE_DATA_CUSTOM_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'name', header: 'Team', accessor: 'name' },
  { id: 'role', header: 'Role', accessor: 'role' },
];

const data = [
  {
    id: 'dept-soc', name: 'Security Operations', role: 'Department',
    children: [
      { id: 'team-triage', name: 'Triage Team', role: 'Team' },
      { id: 'team-ir', name: 'Incident Response', role: 'Team' },
    ],
  },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  treeData
  getSubRows={(row) => row.children}
  defaultTreeExpanded
  treeRowRender={(props, defaultContent) => (
    <div className="flex items-center gap-2 flex-1">
      {defaultContent}
      {props.hasChildren && (
        <span className="ml-auto text-xs text-[var(--muted-foreground)]">
          {props.childCount} {props.childCount === 1 ? 'team' : 'teams'}
        </span>
      )}
    </div>
  )}
  paginated={false}
/>`;

function TreeDataCustomExample() {
  return (
    <DataTable
      columns={[
        { id: 'name', header: 'Team', accessor: 'name' },
        { id: 'role', header: 'Role', accessor: 'role' },
      ]}
      data={orgTree}
      rowKey="id"
      treeData
      getSubRows={(row) => row.children}
      defaultTreeExpanded
      treeRowRender={(props, defaultContent) => (
        <div className="flex items-center gap-2 flex-1">
          {defaultContent}
          {props.hasChildren && (
            <span className="ml-auto text-xs text-[var(--muted-foreground)]">
              {props.childCount} {props.depth === 0
                ? (props.childCount === 1 ? 'team' : 'teams')
                : (props.childCount === 1 ? 'member' : 'members')}
            </span>
          )}
        </div>
      )}
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

      <PlaygroundSection
        title="Row Grouping — Custom Header"
        description="Use groupRowRender to replace the default group header entirely. Receives GroupRowProps with groupLabel, count, isExpanded, onToggle, level, and more. You own the layout — call props.onToggle to handle expand/collapse."
        code={ROW_GROUPING_CUSTOM_CODE}
      >
        <RowGroupingCustomExample />
      </PlaygroundSection>

      <PlaygroundSection title="Tree Data" description="Hierarchical rows via getSubRows — useful for org charts or nested assets." code={TREE_DATA_CODE}>
        <TreeDataExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Tree Data — Custom Row"
        description="Use treeRowRender to augment the first cell of tree rows. Receives (props, defaultContent) — defaultContent is the pre-built chevron + value layout, so you can wrap it rather than rebuild it. Use props.hasChildren, props.depth, props.childCount, and props.isExpanded for conditional rendering."
        code={TREE_DATA_CUSTOM_CODE}
      >
        <TreeDataCustomExample />
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
            { name: 'expandedRowRender', type: '(row, index) => ReactNode', default: '—', description: "Renders below the row when expanded. index is the row's 0-based position in the data array." },
            { name: 'expandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded row keys' },
            { name: 'onExpandedKeysChange', type: '(keys) => void', default: '—', description: 'Expansion change callback' },
            { name: 'defaultExpandedKeys', type: 'string[]', default: '—', description: 'Uncontrolled initial expanded row keys — no useState needed. Use expandedKeys + onExpandedKeysChange for controlled mode.' },
            { name: 'expandMultiple', type: 'boolean', default: 'false', description: 'Allow multiple rows to be open simultaneously. Default false — expanding a new row collapses the previous one.' },
          ]}
        />

        <PropsTable
          title="Row Grouping"
          props={[
            { name: 'groupBy', type: 'string | string[]', default: '—', description: "Column id to group rows by. Pass an array for multi-level grouping (e.g. ['department', 'severity']). Groups appear in the order their values are first encountered in the data array." },
            { name: 'groupExpanded', type: 'Record<string, boolean>', default: '—', description: 'Controlled expanded groups' },
            { name: 'onGroupExpandedChange', type: '(state) => void', default: '—', description: 'Group expansion change callback' },
            { name: 'defaultGroupExpanded', type: 'boolean', default: 'true', description: 'Initial expanded state for all groups' },
            { name: 'groupRowRender', type: '(props: GroupRowProps<T>) => ReactNode', default: '—', description: 'Replace the default group header with custom content. Receives GroupRowProps: groupKey, groupValue, groupLabel, rows, count, isExpanded, onToggle, level, column. You must call props.onToggle to handle expand/collapse.' },
            { name: 'showGroupCount', type: 'boolean', default: 'true', description: 'Show row count in group headers' },
          ]}
        />

        <PropsTable
          title="GroupRowProps object"
          props={[
            { name: 'groupKey', type: 'string', description: 'The column ID being grouped by' },
            { name: 'groupValue', type: 'unknown', description: 'The raw value this group represents' },
            { name: 'groupLabel', type: 'string', description: 'Display string for the group value' },
            { name: 'rows', type: 'T[]', description: 'All data rows belonging to this group' },
            { name: 'count', type: 'number', description: 'Total row count in this group (same as rows.length)' },
            { name: 'isExpanded', type: 'boolean', description: 'Whether this group is currently expanded' },
            { name: 'onToggle', type: '() => void', description: 'Call this to expand/collapse the group' },
            { name: 'level', type: 'number', description: 'Nesting depth (0 = top level, 1 = second level, etc.)' },
            { name: 'column', type: 'ColumnDef', description: 'The full column definition for the grouped column' },
          ]}
        />

        <PropsTable
          title="Tree Data"
          props={[
            { name: 'treeData', type: 'boolean', default: 'false', description: 'Enable hierarchical tree rows' },
            { name: 'getSubRows', type: '(row) => T[] | undefined', default: '—', description: 'Returns child rows for a row. Return undefined or an empty array for leaf nodes — they get an alignment spacer instead of a toggle button.' },
            { name: 'treeExpandedKeys', type: 'string[]', default: '—', description: 'Controlled expanded tree node keys' },
            { name: 'onTreeExpandedChange', type: '(keys) => void', default: '—', description: 'Tree expansion change callback' },
            { name: 'defaultTreeExpanded', type: 'boolean', default: 'false', description: 'Start all nodes expanded on first render. Default false (all collapsed). Use treeExpandedKeys + onTreeExpandedChange for controlled mode.' },
            { name: 'treeIndent', type: 'number', default: '24', description: 'Indentation per tree level, in px' },
            { name: 'showTreeLines', type: 'boolean', default: 'false', description: 'Draw connecting lines between tree rows' },
            { name: 'treeRowRender', type: '(props: TreeRowProps, defaultContent: ReactNode) => ReactNode', default: '—', description: "Customize the first cell of tree rows. Receives the row's tree state (depth, hasChildren, isExpanded, childCount, onToggle) plus the pre-built default content to wrap or replace." },
          ]}
        />

        <PropsTable
          title="TreeRowProps object"
          props={[
            { name: 'row', type: 'T', description: 'The row data object' },
            { name: 'depth', type: 'number', description: 'Nesting depth — 0 for root nodes, 1 for first level children, etc.' },
            { name: 'hasChildren', type: 'boolean', description: 'True if this row has child rows via getSubRows' },
            { name: 'isExpanded', type: 'boolean', description: 'Whether this node is currently expanded' },
            { name: 'onToggle', type: '() => void', description: 'Call to expand or collapse this node' },
            { name: 'childCount', type: 'number', description: 'Number of direct children (0 for leaf nodes)' },
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
