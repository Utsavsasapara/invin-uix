import { useState, useMemo, useCallback } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { incidents, incidentColumns, StatusBadge } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// CONDITIONAL ROW STYLING
// ═══════════════════════════════════════════════════════════════════════════════

const CONDITIONAL_STYLING_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', severity: 'medium' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  rowClassName={(row) => row.severity === 'critical' ? 'bg-[var(--error)]/5' : undefined}
  getRowProps={(row) => ({
    'data-severity': row.severity,
    'aria-label': \`Incident \${row.id}, \${row.severity} severity\`,
  })}
  getCellProps={(row, columnId, value) => {
    if (columnId === 'severity' && value === 'critical') {
      return {
        className: 'font-semibold text-[var(--error)]',
      };
    }
    return {};
  }}
  paginated={false}
/>`;

function ConditionalStylingExample() {
  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">
        rowClassName and getRowProps for row-level styling. getCellProps for cell-level styling based on column ID, value, or current search term.
      </p>
      <DataTable
        columns={incidentColumns()}
        data={incidents}
        rowKey="id"
        rowClassName={(row) => (row.severity === 'critical' ? 'bg-[var(--error)]/5' : undefined)}
        getRowProps={(row) => ({ 'data-severity': row.severity, 'aria-label': `Incident ${row.id}, ${row.severity} severity` })}
        getCellProps={(row, columnId, value) => {
          if (columnId === 'severity' && value === 'critical') {
            return { className: 'font-semibold text-[var(--error)]' };
          }
          return {};
        }}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INLINE CELL EDITING
// ═══════════════════════════════════════════════════════════════════════════════

const INLINE_EDITING_CODE = `import { useState, useCallback } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'title', header: 'Title', accessor: 'title', editable: true, editType: 'text',
    validator: (v) => (!v ? 'Title is required' : null) },
  { id: 'status', header: 'Status', accessor: 'status', editable: true, editType: 'select',
    editOptions: [{ value: 'open', label: 'Open' }, { value: 'resolved', label: 'Resolved' }] },
];

function EditableTable({ initialData }) {
  const [data, setData] = useState(initialData);

  const handleCellEdit = useCallback(async (rowKey, columnId, newValue) => {
    await saveCell(rowKey, columnId, newValue);
    setData((prev) => prev.map((row) => (row.id === rowKey ? { ...row, [columnId]: newValue } : row)));
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      editable
      editMode="doubleClick"
      onCellEdit={handleCellEdit}
    />
  );
}`;

function InlineEditingExample() {
  const [data, setData] = useState(() => incidents.slice(0, 6).map((r) => ({ ...r })));
  const [mode, setMode] = useState('doubleClick');

  const handleCellEdit = useCallback(async (rowKey, columnId, newValue) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setData((prev) => prev.map((row) => (row.id === rowKey ? { ...row, [columnId]: newValue } : row)));
    toast({ title: `Saved ${columnId} for ${rowKey}`, variant: 'success' });
  }, []);

  const columns = useMemo(() => [
    { id: 'id', header: 'ID', accessor: 'id', width: '110px' },
    { id: 'title', header: 'Title', accessor: 'title', editable: true, editType: 'text', validator: (v) => (!v ? 'Title is required' : null) },
    {
      id: 'status', header: 'Status', accessor: 'status', editable: true, editType: 'select',
      editOptions: [{ value: 'open', label: 'Open' }, { value: 'investigating', label: 'Investigating' }, { value: 'resolved', label: 'Resolved' }, { value: 'closed', label: 'Closed' }],
      cell: ({ value }) => <StatusBadge value={value} />,
    },
    { id: 'assignee', header: 'Assignee', accessor: 'assignee', editable: true, editType: 'text' },
  ], []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" variant={mode === 'doubleClick' ? 'secondary' : 'ghost'} onClick={() => setMode('doubleClick')}>
          Double-click (default)
        </Button>
        <Button size="sm" variant={mode === 'click' ? 'secondary' : 'ghost'} onClick={() => setMode('click')}>
          Single-click
        </Button>
        <Button size="sm" variant={mode === 'button' ? 'secondary' : 'ghost'} onClick={() => setMode('button')}>
          Button (✏ icon)
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {mode === 'doubleClick' && 'Double-click a cell in the Title, Status, or Assignee column to edit it.'}
        {mode === 'click' && 'Single-click any editable cell to start editing immediately.'}
        {mode === 'button' && 'Hover a cell to reveal the ✏ edit icon. Click it to start editing.'}
      </p>
      <DataTable columns={columns} data={data} rowKey="id" editable editMode={mode} onCellEdit={handleCellEdit} paginated={false} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INLINE EDITING — MORE TYPES
// ═══════════════════════════════════════════════════════════════════════════════

const EDITING_TYPES_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title',
    editable: true, editType: 'text',
    validator: (v) => !v ? 'Required' : null },
  { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore',
    editable: true, editType: 'number',
    validator: (v) => (v < 0 || v > 100) ? 'Must be 0–100' : null },
  { id: 'severity', header: 'Severity', accessor: 'severity',
    editable: true, editType: 'select',
    editOptions: [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ] },
  { id: 'resolved', header: 'Resolved', accessor: 'resolved',
    editable: true, editType: 'boolean' },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  editable
  editMode="doubleClick"
  onCellEdit={handleCellEdit}
  paginated={false}
/>`;

function EditingTypesExample() {
  const [data, setData] = useState(() =>
    incidents.slice(0, 4).map((r) => ({ ...r, resolved: r.status === 'resolved' || r.status === 'closed' }))
  );

  const handleCellEdit = useCallback(async (rowKey, columnId, newValue) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setData((prev) => prev.map((row) => (row.id === rowKey ? { ...row, [columnId]: newValue } : row)));
    toast({ title: `Saved ${columnId} for ${rowKey}`, variant: 'success' });
  }, []);

  const columns = useMemo(() => [
    { id: 'id', header: 'ID', accessor: 'id', width: '110px' },
    { id: 'title', header: 'Title', accessor: 'title', editable: true, editType: 'text', validator: (v) => (!v ? 'Required' : null) },
    {
      id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', editable: true, editType: 'number',
      validator: (v) => (v < 0 || v > 100 ? 'Must be 0–100' : null),
    },
    {
      id: 'severity', header: 'Severity', accessor: 'severity', editable: true, editType: 'select',
      editOptions: [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
      ],
    },
    { id: 'resolved', header: 'Resolved', accessor: 'resolved', editable: true, editType: 'boolean' },
  ], []);

  return (
    <div className="space-y-3">
      <p className="text-caption text-[var(--muted-foreground)]">
        editType controls the input rendered: 'text' (default), 'number', 'boolean' (checkbox), or 'select'. Pair with validator for inline validation — returning a string shows the error, returning null allows save.
      </p>
      <DataTable columns={columns} data={data} rowKey="id" editable editMode="doubleClick" onCellEdit={handleCellEdit} paginated={false} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableEditingDemo() {
  return (
    <ComponentPage
      name="DataTable — Editing"
      description="Data-driven row styling/attributes, and double-click inline cell editing with validation and async save."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      <PlaygroundSection title="Conditional Row Styling" description="rowClassName and getRowProps for row-level styling. getCellProps for cell-level styling based on column ID, value, or current search term." code={CONDITIONAL_STYLING_CODE}>
        <ConditionalStylingExample />
      </PlaygroundSection>

      <PlaygroundSection title="Inline Cell Editing" description="Double-click a cell to edit, with validation and async save." code={INLINE_EDITING_CODE}>
        <InlineEditingExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Inline Editing — More Types"
        description="editType controls the input rendered: 'text' (default), 'number', 'boolean' (checkbox), or 'select'. Pair with validator for inline validation — returning a string shows the error, returning null allows save."
        code={EDITING_TYPES_CODE}
      >
        <EditingTypesExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Row Styling"
          props={[
            { name: 'rowClassName', type: 'string | (row, index) => string', default: '—', description: 'Per-row class name' },
            { name: 'getRowProps', type: '(row, index) => HTMLAttributes', default: '—', description: 'Extra props/attributes per row' },
            { name: 'getCellProps', type: '(row, columnId, value, searchTerm) => HTMLAttributes', default: '—', description: 'Per-cell HTML attributes (className, style, data-*) based on row data, column ID, cell value, or current search term. Use for cell-level conditional styling.' },
          ]}
        />

        <PropsTable
          title="Inline Editing"
          props={[
            { name: 'editable', type: 'boolean', default: 'false', description: 'Enable inline cell editing' },
            { name: 'onCellEdit', type: '(rowKey, columnId, newValue, oldValue, row) => void | Promise<void>', default: '—', description: 'Fires on edit save' },
            { name: 'editMode', type: "'click' | 'doubleClick' | 'button'", default: "'doubleClick'", description: "'click' — single click starts editing. 'doubleClick' — double click (default, avoids accidental edits). 'button' — shows a ✏ icon on hover, click it to start editing." },
            { name: 'editingCell', type: '{ rowKey, columnId } | null', default: '—', description: 'Controlled editing cell' },
            { name: 'onEditingCellChange', type: '(cell) => void', default: '—', description: 'Editing cell change callback' },
            { name: 'ColumnDef.editable', type: 'boolean', default: 'false', description: 'Enable editing for this column. Requires table-level editable=true.' },
            { name: 'ColumnDef.editType', type: "'text'|'number'|'boolean'|'select'", default: 'auto-detected', description: 'Input type for this column. Auto-detected from cell value if omitted.' },
            { name: 'ColumnDef.editOptions', type: '{ value, label }[]', default: '—', description: "Options for editType='select' columns." },
            { name: 'ColumnDef.validator', type: '(value, row) => string | null', default: '—', description: 'Validate the new value before saving. Return an error string to block save, null to allow.' },
            { name: 'ColumnDef.editCell', type: '(props: EditCellProps) => ReactNode', default: '—', description: 'Custom edit cell renderer — use for date pickers, color pickers, etc. Receives EditCellProps with value, onChange, onSave, onCancel, error, isSaving.' },
          ]}
        />

        <PropsTable
          title="EditCellProps"
          props={[
            { name: 'row', type: 'T', description: 'The row data object' },
            { name: 'value', type: 'unknown', description: 'Current cell value' },
            { name: 'columnId', type: 'string', description: 'The column being edited' },
            { name: 'onChange', type: '(value) => void', description: 'Update value without saving' },
            { name: 'onSave', type: '(newValue?) => void', description: 'Save and close edit mode' },
            { name: 'onCancel', type: '() => void', description: 'Cancel and discard changes' },
            { name: 'error', type: 'string | undefined', description: 'Validation error message from validator' },
            { name: 'isSaving', type: 'boolean', description: 'True while async onCellEdit is in progress' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
