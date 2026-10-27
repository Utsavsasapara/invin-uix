import { useState, useMemo } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { CheckCircle, PencilSimple, Trash, Archive, UserCircle } from 'invin-uix/ui/icons';
import { incidents, incidentColumns } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — MULTI-SELECT + BULK ACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const MULTI_SELECT_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

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

const bulkActions = [
  { id: 'resolve', label: 'Mark resolved', icon: <CheckCircle size={14} />,
    onClick: (rows) => console.log('Resolving', rows.length, 'incidents') },
  { id: 'assign',  label: 'Reassign',      icon: <UserCircle size={14} />,
    onClick: (rows) => console.log('Reassigning', rows) },
  { id: 'delete',  label: 'Delete',        icon: <Trash size={14} />,
    variant: 'destructive',
    onClick: (rows) => console.log('Deleting', rows) },
];

function MultiSelectTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      selectable
      selectionMode="multiple"   // default — checkboxes, select-all header
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      showSelectionColumn         // default: true — show checkbox column
      bulkActions={bulkActions}  // appears when at least one row is selected
      paginated={false}
    />
  );
}`;

function MultiSelectExample() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const bulkActions = useMemo(() => [
    { id: 'resolve', label: 'Mark resolved', icon: <CheckCircle size={14} weight="bold" />,
      onClick: (rows) => { toast({ title: `Resolved ${rows.length} incident(s)`, variant: 'success' }); setSelectedKeys([]); } },
    { id: 'assign', label: 'Reassign', icon: <PencilSimple size={14} weight="bold" />,
      onClick: (rows) => toast({ title: `Reassigning ${rows.length} incident(s)`, variant: 'info' }) },
    { id: 'delete', label: 'Delete', icon: <Trash size={14} weight="bold" />, variant: 'destructive',
      onClick: (rows) => { toast({ title: `Deleted ${rows.length} incident(s)`, variant: 'destructive' }); setSelectedKeys([]); } },
  ], []);

  return (
    <DataTable
      columns={incidentColumns()}
      data={incidents}
      rowKey="id"
      selectable
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      showSelectionColumn
      bulkActions={bulkActions}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — SINGLE SELECTION
// ═══════════════════════════════════════════════════════════════════════════════

const SINGLE_SELECT_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// Single selection — radio button style, only one row active at a time.
// No select-all header. selectedKeys is an array with at most 1 element.
function SingleSelectTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <>
      <p>Selected: {selectedKeys[0] ?? 'none'}</p>
      <DataTable
        columns={columns}
        data={data}
        rowKey="id"
        selectable
        selectionMode="single"     // ← radio behavior
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        paginated={false}
      />
    </>
  );
}`;

function SingleSelectExample() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Selected: <code className="text-[var(--foreground)]">{selectedKeys[0] ?? 'none'}</code>
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        selectable
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — CLICK-TO-SELECT (no checkbox column)
// ═══════════════════════════════════════════════════════════════════════════════

const CLICK_SELECT_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

// showSelectionColumn={false} hides the checkbox/radio column.
// Users select rows by clicking anywhere on the row.
// Combine with onRowClick for additional row-level actions.
function ClickToSelectTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      selectable
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      showSelectionColumn={false}   // ← no checkbox column, click row to select
      paginated={false}
    />
  );
}`;

function ClickSelectExample() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        Click any row to select it. Selected: <code className="text-[var(--foreground)]">{selectedKeys.length} rows</code>
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        selectable
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        showSelectionColumn={false}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — UNCONTROLLED + defaultSelectedKeys
// ═══════════════════════════════════════════════════════════════════════════════

const UNCONTROLLED_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// Uncontrolled — no selectedKeys/onSelectionChange needed.
// DataTable manages selection state internally.
// Use defaultSelectedKeys to pre-select rows on mount.
<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  selectable
  defaultSelectedKeys={['INC-1001', 'INC-1003']}   // pre-selected on mount
  paginated={false}
/>`;

function UncontrolledExample() {
  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        INC-1001 and INC-1003 are pre-selected via <code>defaultSelectedKeys</code>. No state needed in the consumer.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        selectable
        defaultSelectedKeys={['INC-1001', 'INC-1003']}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — CUSTOMIZATION
// ═══════════════════════════════════════════════════════════════════════════════

const CUSTOMIZATION_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

// ── Custom selected row style ─────────────────────────────────────────────────
// selectedRowClassName replaces the default accent-tint background.
// Can be a string or a function (row, key) => string for per-row logic.
<DataTable
  selectable
  selectedRowClassName="bg-[var(--ok)]/10 border-l-2 border-l-[var(--ok)]"
  ...
/>

// ── Checkbox column on the right ──────────────────────────────────────────────
<DataTable
  selectable
  selectionColumnPosition="last"   // 'first' (default) | 'last'
  ...
/>

// ── Custom bulk actions bar ───────────────────────────────────────────────────
<DataTable
  selectable
  bulkActionsClassName="bg-[var(--accent)]/10 border-b border-[var(--accent)]/20"
  ...
/>

// ── Select all pages (paginated tables) ──────────────────────────────────────
// When paginated, show "Select all X rows" button after selecting current page.
<DataTable
  selectable
  paginated
  selectAllPages
  ...
/>`;

function CustomizationExample() {
  const [variant, setVariant] = useState('default');
  const [selectedKeys, setSelectedKeys] = useState([]);

  const variants = {
    default:         { label: 'Default selected style' },
    greenRow:        { label: 'Green row style',     selectedRowClassName: 'bg-[var(--ok)]/10 border-l-2 border-l-[var(--ok)]' },
    errorRow:        { label: 'Error row style',     selectedRowClassName: 'bg-[var(--error)]/8 border-l-2 border-l-[var(--error)]' },
    colLast:         { label: 'Checkbox on right',   selectionColumnPosition: 'last' },
    customBar:       { label: 'Custom actions bar',  bulkActionsClassName: 'bg-[var(--accent)]/10 border-b border-[var(--accent)]/20' },
  };

  const { label: _l, ...props } = variants[variant];

  const bulkActions = useMemo(() => [
    { id: 'archive', label: 'Archive', icon: <Archive size={14} weight="bold" />,
      onClick: () => { toast({ title: 'Archived' }); setSelectedKeys([]); } },
  ], []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.entries(variants).map(([key, { label }]) => (
          <Button key={key} size="sm" variant={variant === key ? 'secondary' : 'ghost'}
            onClick={() => { setVariant(key); setSelectedKeys([]); }}>
            {label}
          </Button>
        ))}
      </div>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        bulkActions={bulkActions}
        paginated={false}
        {...props}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — BULK ACTION FEATURES
// ═══════════════════════════════════════════════════════════════════════════════

const BULK_ACTIONS_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const bulkActions = [
  {
    id: 'resolve',
    label: 'Mark resolved',
    icon: <CheckCircle size={14} />,
    onClick: (rows) => markResolved(rows),
  },
  {
    id: 'assign',
    label: 'Reassign',
    icon: <UserCircle size={14} />,
    // disabled — hide action when no rows or use function form:
    disabled: (rows) => rows.length > 5,   // can't bulk-assign more than 5
    onClick: (rows) => openAssignDialog(rows),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash size={14} />,
    variant: 'destructive',              // red destructive style
    className: 'font-bold',              // extra custom class
    onClick: (rows) => deleteRows(rows),
  },
];

<DataTable
  selectable
  bulkActions={bulkActions}
  ...
/>`;

function BulkActionsExample() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const selectedRows = incidents.filter(r => selectedKeys.includes(r.id));

  const bulkActions = useMemo(() => [
    { id: 'resolve', label: 'Mark resolved', icon: <CheckCircle size={14} weight="bold" />,
      onClick: (rows) => { toast({ title: `Resolved ${rows.length}` }); setSelectedKeys([]); } },
    {
      id: 'assign', label: 'Reassign', icon: <UserCircle size={14} weight="bold" />,
      // Disabled when more than 3 rows selected
      disabled: (_rows, keys) => keys.length > 3,
      onClick: (rows) => toast({ title: `Reassigning ${rows.length}` }),
    },
    { id: 'delete', label: 'Delete', icon: <Trash size={14} weight="bold" />,
      variant: 'destructive', className: 'font-bold',
      onClick: (rows) => { toast({ title: `Deleted ${rows.length}`, variant: 'destructive' }); setSelectedKeys([]); } },
  ], []);

  return (
    <div className="space-y-2">
      <p className="text-caption text-[var(--muted-foreground)]">
        "Reassign" is <strong>disabled</strong> when more than 3 rows are selected. "Delete" has a custom <code>className="font-bold"</code>.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        bulkActions={bulkActions}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableSelectionDemo() {
  return (
    <ComponentPage
      name="DataTable — Selection"
      description="Single and multi-row selection, click-to-select, uncontrolled mode with default selection, bulk actions with disabled state, and full customization of the selected row style, checkbox column position, and bulk actions bar."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      <PlaygroundSection title="Multi-select + Bulk Actions" description="Checkbox column with select-all header. bulkActions bar appears automatically when at least one row is selected." code={MULTI_SELECT_CODE}>
        <MultiSelectExample />
      </PlaygroundSection>

      <PlaygroundSection title="Click-to-Select" description="showSelectionColumn={false} removes the checkbox column — users select by clicking the row. Useful for master-detail or selection-driven UI." code={CLICK_SELECT_CODE}>
        <ClickSelectExample />
      </PlaygroundSection>

      <PlaygroundSection title="Uncontrolled + defaultSelectedKeys" description="Without selectedKeys/onSelectionChange, DataTable manages state internally. Pass defaultSelectedKeys to pre-select rows on mount." code={UNCONTROLLED_CODE}>
        <UncontrolledExample />
      </PlaygroundSection>

      <PlaygroundSection title="Customization" description="Override the selected row style, move the checkbox to the last column, or style the bulk actions bar container." code={CUSTOMIZATION_CODE}>
        <CustomizationExample />
      </PlaygroundSection>

      <PlaygroundSection title="Bulk Action Features" description="Each BulkAction can be disabled (boolean or function), styled with className, and set to variant='destructive' for the red error style." code={BULK_ACTIONS_CODE}>
        <BulkActionsExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Row Selection"
          props={[
            { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
            { name: 'selectionMode', type: "'single' | 'multiple'", default: "'multiple'", description: "multiple = checkboxes + select-all · single = radio, one row at a time" },
            { name: 'selectedKeys', type: 'string[]', default: '—', description: 'Controlled selected row keys' },
            { name: 'onSelectionChange', type: '(keys) => void', default: '—', description: 'Called when selection changes' },
            { name: 'defaultSelectedKeys', type: 'string[]', default: '—', description: 'Uncontrolled initial selection — rows pre-selected on mount' },
            { name: 'showSelectionColumn', type: 'boolean', default: 'true', description: 'Show the checkbox/radio column. false = click-to-select.' },
            { name: 'bulkActions', type: 'BulkAction<T>[]', default: '—', description: 'Action buttons shown in the info bar when rows are selected' },
            { name: 'selectedRowClassName', type: 'string | (row, key) => string', default: '—', description: 'Override selected row background — replaces the default accent tint' },
            { name: 'selectionColumnPosition', type: "'first' | 'last'", default: "'first'", description: 'Place the checkbox/radio column at the start or end of each row' },
            { name: 'bulkActionsClassName', type: 'string', default: '—', description: 'Custom class on the bulk actions section in the info bar' },
            { name: 'selectAllPages', type: 'boolean', default: 'false', description: 'When paginated, show "Select all X rows" button to select the full dataset' },
          ]}
        />

        <PropsTable
          title="BulkAction object"
          props={[
            { name: 'id', type: 'string', default: '—', required: true, description: 'Unique identifier' },
            { name: 'label', type: 'ReactNode', default: '—', required: true, description: 'Button label text' },
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon shown before the label' },
            { name: 'onClick', type: '(rows: T[], keys: string[]) => void', default: '—', required: true, description: 'Called with the selected rows and their keys' },
            { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: "destructive = red error style (for delete / remove actions)" },
            { name: 'disabled', type: 'boolean | (rows, keys) => boolean', default: 'false', description: 'Disable the button — static boolean or dynamic function based on selection' },
            { name: 'className', type: 'string', default: '—', description: 'Extra class appended to the action button' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
