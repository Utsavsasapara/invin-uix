import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Button } from 'invin-uix/ui/button';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { incidents, incidentColumns, SEVERITIES } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

const EXPORT_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id', header: 'ID', accessor: 'id' },
  { id: 'title', header: 'Title', accessor: 'title' },
  { id: 'severity', header: 'Severity', accessor: 'severity' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high' },
];

// exportFormats defaults to all formats: ['csv', 'json', 'xlsx', 'print']
// Pass a subset to restrict: exportFormats={['csv', 'json']}

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  exportable
  exportFilename="incidents-export"
  exportScope="visible"
  csvOptions={{ includeHeaders: true, includeBOM: true }}
  onExportStart={(format, count) => toast({ title: \`Exporting \${count} rows as \${format}...\` })}
  onExportComplete={(format, count, success) => toast({ title: success ? 'Export complete' : 'Export failed', variant: success ? 'success' : 'destructive' })}
  printTitle="Security Incident Report"
  printShowDate
  paginated={false}
/>`;

function ExportExample() {
  const [scope, setScope] = useState('visible');
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-caption text-[var(--muted-foreground)]">Export scope:</span>
        {['visible', 'selected', 'all'].map((s) => (
          <Button key={s} size="sm" variant={scope === s ? 'secondary' : 'ghost'} onClick={() => setScope(s)}>
            {s}
          </Button>
        ))}
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        {scope === 'visible' && 'Exports filtered/sorted rows only. Apply a filter to see the difference.'}
        {scope === 'selected' && 'Exports only checked rows. Select some rows below, then export.'}
        {scope === 'all' && 'Exports all rows ignoring active filters and sorting.'}
      </p>
      <DataTable
        columns={incidentColumns({
          severity: {
            filterable: true,
            filterConfig: { type: 'select', options: SEVERITIES },
          },
        })}
        data={incidents}
        rowKey="id"
        exportable
        exportFilename="incidents-export"
        exportScope={scope}
        selectable={scope === 'selected'}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        columnFilterable={scope === 'visible'}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        csvOptions={{ includeHeaders: true, includeBOM: true }}
        onExportStart={(format, count) => toast({ title: `Exporting ${count} rows as ${format}...` })}
        onExportComplete={(format, count, success) =>
          toast({
            title: success ? `Exported ${count} rows as ${format}` : 'Export failed',
            variant: success ? 'success' : 'destructive',
          })
        }
        printTitle="Security Incident Report"
        printShowDate
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT — COLUMN CONTROL
// ═══════════════════════════════════════════════════════════════════════════════

const EXPORT_COLUMNS_CODE = `import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'id',       header: 'ID',             accessor: 'id' },
  { id: 'title',    header: 'Title',           accessor: 'title' },
  { id: 'severity', header: 'Severity',        accessor: 'severity', hideable: true },
  { id: 'dept',     header: 'Dept (internal)', accessor: 'department',
    disableExport: true  // never exported, even when exportAllColumns is true
  },
];

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  columnVisibility
  exportable
  exportAllColumns={false}  // false = only visible columns (default)
  // exportAllColumns       // true = include hidden columns (except disableExport)
  paginated={false}
/>`;

function ExportColumnsExample() {
  const [exportAllColumns, setExportAllColumns] = useState(false);

  const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'title', header: 'Title', accessor: 'title' },
    { id: 'severity', header: 'Severity', accessor: 'severity', hideable: true },
    { id: 'assignee', header: 'Assignee', accessor: 'assignee', hideable: true },
    { id: 'department', header: 'Dept (no export)', accessor: 'department', disableExport: true },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center">
        <Button size="sm" variant={exportAllColumns ? 'secondary' : 'ghost'} onClick={() => setExportAllColumns((v) => !v)}>
          exportAllColumns: {exportAllColumns ? 'true' : 'false'}
        </Button>
      </div>
      <p className="text-caption text-[var(--muted-foreground)]">
        The "Dept (no export)" column has disableExport=true — it never appears in exports. Hide "Severity" via the Columns menu, then toggle exportAllColumns to control whether hidden columns are included.
      </p>
      <DataTable
        columns={columns}
        data={incidents}
        rowKey="id"
        columnVisibility
        exportable
        exportAllColumns={exportAllColumns}
        paginated={false}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableExportDemo() {
  return (
    <ComponentPage
      name="DataTable — Export"
      description="CSV, JSON, XLSX, and print export, with scope control and export lifecycle callbacks."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      <PlaygroundSection title="Export" description="CSV, JSON, XLSX, and print export, with lifecycle callbacks." code={EXPORT_CODE}>
        <ExportExample />
      </PlaygroundSection>

      <PlaygroundSection
        title="Export — Column Control"
        description="Use ColumnDef.disableExport to permanently exclude sensitive columns from all exports. exportAllColumns includes currently-hidden columns in exports — useful for 'hide from view but include in download' patterns."
        code={EXPORT_COLUMNS_CODE}
      >
        <ExportColumnsExample />
      </PlaygroundSection>

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

        <PropsTable
          title="Export"
          props={[
            { name: 'exportable', type: 'boolean', default: 'false', description: 'Enable export menu' },
            { name: 'exportFormats', type: "('csv'|'json'|'xlsx'|'print')[]", default: "all formats", description: "Export formats to show in the menu. Default: all formats ['csv', 'json', 'xlsx', 'print']. Pass a subset to restrict options." },
            { name: 'exportFilename', type: 'string', default: "'export'", description: 'Base filename for exports' },
            { name: 'onExport', type: "(format, data) => void", default: '—', description: 'Export callback' },
            { name: 'exportScope', type: "'visible' | 'selected' | 'all'", default: "'visible'", description: "'visible' — exports filtered/sorted rows (default). 'selected' — only checked rows (shows warning if nothing selected). 'all' — all rows, ignoring active filters and sorting." },
            { name: 'exportAllColumns', type: 'boolean', default: 'false', description: 'Include hidden columns in the export (default: false). Columns with ColumnDef.disableExport=true are always excluded regardless of this setting.' },
            { name: 'csvOptions', type: 'CsvExportOptions', default: '—', description: 'delimiter / includeBOM / escapeFormulas / includeHeaders' },
            { name: 'onExportStart', type: '(format, rowCount) => void', default: '—', description: 'Fires when export begins' },
            { name: 'onExportComplete', type: '(format, rowCount, success, error?) => void', default: '—', description: 'Fires when export finishes' },
            { name: 'printTitle', type: 'string', default: '—', description: 'Title on the printed page' },
            { name: 'printShowDate', type: 'boolean', default: 'true', description: 'Show date/time when printing' },
            { name: 'onPrint', type: '() => void', default: '—', description: 'Fires before the print dialog opens' },
          ]}
        />

        <PropsTable
          title="ColumnDef export props"
          props={[
            { name: 'disableExport', type: 'boolean', default: 'false', description: 'Permanently exclude this column from all exports (CSV, JSON, Excel, print). Not affected by exportAllColumns.' },
          ]}
        />

        <PropsTable
          title="CsvExportOptions object"
          props={[
            { name: 'delimiter', type: 'string', default: "','", description: 'Field separator character. Use "\\t" for TSV.' },
            { name: 'includeBOM', type: 'boolean', default: 'false', description: 'Prepend UTF-8 BOM (\\uFEFF) for Excel compatibility on non-Windows systems.' },
            { name: 'escapeFormulas', type: 'boolean', default: 'true', description: "Prefix formula cells (=, +, -, @) with a single quote to prevent Excel injection attacks." },
            { name: 'includeHeaders', type: 'boolean', default: 'true', description: 'Write column headers as the first row.' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
