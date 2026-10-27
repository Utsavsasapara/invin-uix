import { useState, useMemo } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Separator } from 'invin-uix/ui/separator';
import { incidents, incidentColumns } from './dataTableShared.jsx';

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE-COLUMN SORT
// ═══════════════════════════════════════════════════════════════════════════════

const SORTING_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'title', header: 'Title', accessor: 'title', sortable: true },
  { id: 'severity', header: 'Severity', accessor: 'severity', sortable: true },
  { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', sortable: true, align: 'right' },
];

const data = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', riskScore: 92 },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high', riskScore: 78 },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', severity: 'medium', riskScore: 61 },
];

function SortableTable() {
  const [sortColumn, setSortColumn] = useState('riskScore');
  const [sortDirection, setSortDirection] = useState('desc');

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="id"
      sortable
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSortChange={(col, dir) => { setSortColumn(col); setSortDirection(dir); }}
      paginated={false}
    />
  );
}`;

function SortingExample() {
  const [sortColumn, setSortColumn] = useState('riskScore');
  const [sortDirection, setSortDirection] = useState('desc');

  const columns = useMemo(() => [
    ...incidentColumns(),
    { id: 'riskScore', header: 'Risk Score', accessor: 'riskScore', sortable: true, align: 'right' },
  ], []);

  return (
    <DataTable
      columns={columns}
      data={incidents}
      rowKey="id"
      sortable
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSortChange={(col, dir) => { setSortColumn(col); setSortDirection(dir); }}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MULTI-COLUMN SORT
// ═══════════════════════════════════════════════════════════════════════════════

// Data designed for multi-sort: repeated Severity + Status values make the
// secondary/tertiary sort clearly meaningful (e.g. Critical-Open before Critical-Investigating)
const multiSortData = [
  { id: 'A1', analyst: 'Alice Johnson',  severity: 'Critical', status: 'Open',          alerts: 14 },
  { id: 'A2', analyst: 'Bob Smith',      severity: 'Critical', status: 'Investigating', alerts: 9  },
  { id: 'A3', analyst: 'Carol Davis',    severity: 'Critical', status: 'Resolved',      alerts: 21 },
  { id: 'A4', analyst: 'David Lee',      severity: 'High',     status: 'Open',          alerts: 7  },
  { id: 'A5', analyst: 'Emma Wilson',    severity: 'High',     status: 'Open',          alerts: 11 },
  { id: 'A6', analyst: 'Frank Chen',     severity: 'High',     status: 'Investigating', alerts: 5  },
  { id: 'A7', analyst: 'Grace Kim',      severity: 'Medium',   status: 'Open',          alerts: 3  },
  { id: 'A8', analyst: 'Henry Park',     severity: 'Medium',   status: 'Resolved',      alerts: 8  },
  { id: 'A9', analyst: 'Ivy Zhang',      severity: 'Low',      status: 'Resolved',      alerts: 2  },
];

const multiSortColumns = [
  { id: 'analyst',  header: 'Analyst',  accessor: 'analyst',  sortable: true },
  { id: 'severity', header: 'Severity', accessor: 'severity', sortable: true },
  { id: 'status',   header: 'Status',   accessor: 'status',   sortable: true },
  { id: 'alerts',   header: 'Alerts',   accessor: 'alerts',   sortable: true, align: 'right' },
];

const MULTI_SORT_CODE = `import { useState } from 'react';
import { DataTable } from 'invin-uix/ui/data-table';

const columns = [
  { id: 'analyst',  header: 'Analyst',  accessor: 'analyst',  sortable: true },
  { id: 'severity', header: 'Severity', accessor: 'severity', sortable: true },
  { id: 'status',   header: 'Status',   accessor: 'status',   sortable: true },
  { id: 'alerts',   header: 'Alerts',   accessor: 'alerts',   sortable: true, align: 'right' },
];

const data = [
  { id: 'A1', analyst: 'Alice Johnson', severity: 'Critical', status: 'Open',          alerts: 14 },
  { id: 'A2', analyst: 'Bob Smith',     severity: 'Critical', status: 'Investigating', alerts: 9  },
  { id: 'A3', analyst: 'Carol Davis',   severity: 'Critical', status: 'Resolved',      alerts: 21 },
  // ... more rows
];

// Try: Shift+click Severity → then Shift+click Status
// Critical-Open appears before Critical-Investigating before Critical-Resolved
const [sortState, setSortState] = useState([
  { columnId: 'severity', direction: 'asc' },
]);

<DataTable
  columns={columns}
  data={data}
  rowKey="id"
  sortable
  multiSort
  maxSortColumns={3}
  sortState={sortState}
  onMultiSortChange={setSortState}
  paginated={false}
/>`;

function MultiSortExample() {
  const [sortState, setSortState] = useState([{ columnId: 'severity', direction: 'asc' }]);

  return (
    <DataTable
      columns={multiSortColumns}
      data={multiSortData}
      rowKey="id"
      sortable
      multiSort
      maxSortColumns={3}
      sortState={sortState}
      onMultiSortChange={setSortState}
      paginated={false}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function DataTableSortingDemo() {
  return (
    <ComponentPage
      name="DataTable — Sorting"
      description="Single-column sort via sortColumn/sortDirection/onSortChange, and multi-column sort via Shift+click with a stacked priority order."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <PlaygroundSection title="Sorting" description="Single-column sort — click a sortable header, or drive it via sortColumn/sortDirection/onSortChange." code={SORTING_CODE}>
        <SortingExample />

        <Separator />
        <PlaygroundSection
          title="Multi-Column Sort"
          description="Hold Shift and click a column header to add it to the sort stack. Priority badges (1, 2, 3) show the sort order. Plain click resets to single sort."
          code={MULTI_SORT_CODE}
        >
          <MultiSortExample />
        </PlaygroundSection>
      </PlaygroundSection>

      <Separator />

      <div className="space-y-8">
        <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-lg">API Reference</h2>

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
      </div>
    </ComponentPage>
  );
}
