import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { DataTable } from 'invin-uix/ui/data-table';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from 'invin-uix/ui/avatar';
import { Separator } from 'invin-uix/ui/separator';
import { Toaster, toast } from 'invin-uix/ui/toast';
import { Input } from 'invin-uix/ui/input';
import { Trash, DownloadSimple, Eye, Pencil, Copy, Archive, PlusCircle } from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const users = [
  { id: 'USR-001', name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-12', department: 'Engineering', avatar: 'https://i.pravatar.cc/100?u=alice' },
  { id: 'USR-002', name: 'Bob Smith', email: 'bob@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-11', department: 'Marketing', avatar: 'https://i.pravatar.cc/100?u=bob' },
  { id: 'USR-003', name: 'Carol Davis', email: 'carol@company.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-06-28', department: 'Sales', avatar: 'https://i.pravatar.cc/100?u=carol' },
  { id: 'USR-004', name: 'David Lee', email: 'david@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-12', department: 'Engineering', avatar: 'https://i.pravatar.cc/100?u=david' },
  { id: 'USR-005', name: 'Emma Wilson', email: 'emma@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-10', department: 'Design', avatar: 'https://i.pravatar.cc/100?u=emma' },
  { id: 'USR-006', name: 'Frank Chen', email: 'frank@company.com', role: 'Viewer', status: 'Suspended', lastLogin: '2024-05-15', department: 'Support', avatar: 'https://i.pravatar.cc/100?u=frank' },
  { id: 'USR-007', name: 'Grace Kim', email: 'grace@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-11', department: 'Marketing', avatar: 'https://i.pravatar.cc/100?u=grace' },
  { id: 'USR-008', name: 'Henry Park', email: 'henry@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-07-09', department: 'Sales', avatar: 'https://i.pravatar.cc/100?u=henry' },
  { id: 'USR-009', name: 'Irene Lopez', email: 'irene@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-07-12', department: 'Engineering', avatar: 'https://i.pravatar.cc/100?u=irene' },
  { id: 'USR-010', name: 'Jack Turner', email: 'jack@company.com', role: 'Viewer', status: 'Inactive', lastLogin: '2024-06-01', department: 'Support', avatar: 'https://i.pravatar.cc/100?u=jack' },
  { id: 'USR-011', name: 'Karen White', email: 'karen@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-07-08', department: 'Design', avatar: 'https://i.pravatar.cc/100?u=karen' },
  { id: 'USR-012', name: 'Leo Garcia', email: 'leo@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-07-07', department: 'Sales', avatar: 'https://i.pravatar.cc/100?u=leo' },
];

const incidents = [
  { id: 'INC-2847', title: 'Unauthorized access attempt', severity: 'Critical', status: 'Open', assignee: 'SOC Team', created: '2024-07-12 09:00', source: 'Firewall', affectedAssets: 3 },
  { id: 'INC-2846', title: 'Suspicious login from new IP', severity: 'High', status: 'Investigating', assignee: 'Alice J.', created: '2024-07-12 08:30', source: 'SIEM', affectedAssets: 1 },
  { id: 'INC-2845', title: 'Failed certificate validation', severity: 'Medium', status: 'Open', assignee: 'Bob S.', created: '2024-07-11 22:15', source: 'Web Server', affectedAssets: 2 },
  { id: 'INC-2844', title: 'Brute force attempt detected', severity: 'High', status: 'Resolved', assignee: 'SOC Team', created: '2024-07-11 18:00', source: 'IDS', affectedAssets: 5 },
  { id: 'INC-2843', title: 'Anomalous data exfiltration', severity: 'Critical', status: 'Investigating', assignee: 'David L.', created: '2024-07-11 14:30', source: 'NDR', affectedAssets: 8 },
  { id: 'INC-2842', title: 'Outdated TLS version detected', severity: 'Low', status: 'Resolved', assignee: 'Grace K.', created: '2024-07-11 10:00', source: 'Scanner', affectedAssets: 12 },
  { id: 'INC-2841', title: 'Privilege escalation attempt', severity: 'High', status: 'Open', assignee: 'SOC Team', created: '2024-07-10 23:45', source: 'EDR', affectedAssets: 1 },
  { id: 'INC-2840', title: 'Unpatched vulnerability found', severity: 'Medium', status: 'Open', assignee: 'Henry P.', created: '2024-07-10 16:00', source: 'VM', affectedAssets: 15 },
];

// ─── Column Definitions ──────────────────────────────────────────────────────

const userColumns = [
  {
    id: 'name',
    header: 'User',
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar size="xs"><AvatarImage src={row.avatar} /><AvatarFallback>{row.name[0]}</AvatarFallback></Avatar>
        <div>
          <p className="text-label font-[500]">{row.name}</p>
          <p className="text-[11px] text-[var(--muted-foreground)]">{row.email}</p>
        </div>
      </div>
    ),
    sortable: true,
    minWidth: 200,
  },
  {
    id: 'role',
    header: 'Role',
    sortable: true,
    cell: ({ value }) => (
      <Badge variant={value === 'Admin' ? 'default' : value === 'Editor' ? 'secondary' : 'outline'} size="sm">
        {value}
      </Badge>
    ),
  },
  {
    id: 'department',
    header: 'Department',
    sortable: true,
    hideable: true,
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => (
      <Badge
        variant={value === 'Active' ? 'success' : value === 'Inactive' ? 'warning' : 'destructive'}
        size="sm"
      >
        {value}
      </Badge>
    ),
  },
  { id: 'lastLogin', header: 'Last Login', sortable: true, hideable: true },
];

const incidentColumns = [
  { id: 'id', header: 'ID', width: '100px', sortable: true },
  { id: 'title', header: 'Title', sortable: true, minWidth: 200 },
  {
    id: 'severity',
    header: 'Severity',
    sortable: true,
    cell: ({ value }) => (
      <Badge
        variant={value === 'Critical' ? 'destructive' : value === 'High' ? 'warning' : value === 'Medium' ? 'secondary' : 'outline'}
        size="sm"
      >
        {value}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    cell: ({ value }) => (
      <Badge
        variant={value === 'Open' ? 'destructive' : value === 'Investigating' ? 'warning' : 'success'}
        size="sm"
      >
        {value}
      </Badge>
    ),
  },
  { id: 'assignee', header: 'Assignee', sortable: true, hideable: true },
  { id: 'source', header: 'Source', sortable: true, hideable: true },
  { id: 'affectedAssets', header: 'Assets', sortable: true, align: 'center', hideable: true },
  { id: 'created', header: 'Created', sortable: true },
];

// ─── Row Actions Definition ──────────────────────────────────────────────────

const getUserRowActions = (row) => [
  {
    id: 'view',
    label: 'View Profile',
    icon: <Eye style={{ width: 14, height: 14 }} />,
    onClick: (row) => toast({ title: `Viewing ${row.name}`, description: row.email }),
  },
  {
    id: 'edit',
    label: 'Edit User',
    icon: <Pencil style={{ width: 14, height: 14 }} />,
    onClick: (row) => toast({ title: `Editing ${row.name}` }),
  },
  {
    id: 'copy',
    label: 'Copy Email',
    icon: <Copy style={{ width: 14, height: 14 }} />,
    onClick: (row) => {
      navigator.clipboard.writeText(row.email);
      toast({ title: 'Email copied!', variant: 'success' });
    },
    shortcut: '⌘C',
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: <Archive style={{ width: 14, height: 14 }} />,
    onClick: (row) => toast({ title: `Archived ${row.name}` }),
    divider: true,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash style={{ width: 14, height: 14 }} />,
    onClick: (row) => toast({ title: `Deleted ${row.name}`, variant: 'destructive' }),
    destructive: true,
    disabled: row.role === 'Admin',
  },
];

// ─── Bulk Actions Definition ─────────────────────────────────────────────────

const bulkActions = [
  {
    id: 'export',
    label: 'Export',
    icon: <DownloadSimple style={{ width: 14, height: 14 }} />,
    onClick: (rows, keys) => toast({ title: `Exporting ${rows.length} users`, variant: 'success' }),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash style={{ width: 14, height: 14 }} />,
    onClick: (rows, keys) => toast({ title: `Deleted ${rows.length} users`, variant: 'destructive' }),
    variant: 'destructive',
  },
];

// ─── Demo Page ───────────────────────────────────────────────────────────────

export default function DataTableDemo() {
  const [selected, setSelected] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  return (
    <ComponentPage
      name="Data Table"
      description="Feature-rich data table with sorting, searching, pagination, row selection, column visibility, expandable rows, bulk actions, row actions, export, column resizing, and reordering. Built on top of the base Table primitives — zero external dependencies."
      importCode={`import { DataTable } from 'invin-uix/ui/data-table';`}
    >
      <Toaster position="top-right" />

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Data Table Playground"
        description="Experiment with Data Table configurations."
        controls={[
          { name: 'searchable', type: 'boolean', label: 'Searchable', default: true },
          { name: 'paginated', type: 'boolean', label: 'Paginated', default: true },
          { name: 'selectable', type: 'boolean', label: 'Selectable', default: false },
          { name: 'striped', type: 'boolean', label: 'Striped', default: false },
          { name: 'dense', type: 'boolean', label: 'Dense', default: false },
          { name: 'columnVisibility', type: 'boolean', label: 'Column Toggle', default: false },
          { name: 'exportable', type: 'boolean', label: 'Export', default: false },
        ]}
      >
        {(props) => (
          <DataTable
            columns={incidentColumns}
            data={incidents.slice(0, 5)}
            rowKey="id"
            searchable={props.searchable}
            paginated={props.paginated}
            selectable={props.selectable}
            striped={props.striped}
            dense={props.dense}
            columnVisibility={props.columnVisibility}
            exportable={props.exportable}
            pageSize={5}
          />
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'columns', type: 'ColumnDef[]', default: '—', description: 'Column definitions (id, header, cell, sortable, width, align, hideable, resizable, reorderable)' },
          { name: 'data', type: 'T[]', default: '—', description: 'Array of row data' },
          { name: 'rowKey', type: "string | (row, i) => string", default: 'index', description: 'Unique key for each row' },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Show global search input' },
          { name: 'paginated', type: 'boolean', default: 'true', description: 'Enable pagination' },
          { name: 'pageSize', type: 'number', default: '10', description: 'Initial rows per page' },
          { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
          { name: 'selectionMode', type: "'single' | 'multiple'", default: "'multiple'", description: 'Selection mode' },
          { name: 'toolbar', type: 'ReactNode', default: '—', description: 'Custom toolbar content (filters, buttons)' },
          { name: 'columnVisibility', type: 'boolean', default: 'false', description: 'Show column visibility toggle' },
          { name: 'bulkActions', type: 'BulkAction[]', default: '—', description: 'Actions shown when rows are selected' },
          { name: 'expandable', type: 'boolean', default: 'false', description: 'Enable expandable rows' },
          { name: 'expandedRowRender', type: '(row, index) => ReactNode', default: '—', description: 'Render function for expanded content' },
          { name: 'rowActions', type: 'RowAction[] | (row, i) => RowAction[]', default: '—', description: 'Row-level action dropdown' },
          { name: 'exportable', type: 'boolean', default: 'false', description: 'Show export button' },
          { name: 'exportFormats', type: "('csv' | 'json')[]", default: "['csv', 'json']", description: 'Available export formats' },
          { name: 'resizable', type: 'boolean', default: 'false', description: 'Enable column resizing' },
          { name: 'reorderable', type: 'boolean', default: 'false', description: 'Enable column drag reordering' },
          { name: 'striped', type: 'boolean', default: 'false', description: 'Alternating row colors' },
          { name: 'dense', type: 'boolean', default: 'false', description: 'Compact row height' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading skeleton' },
        ]}
      />

      <Separator />

      {/* ─── NEW: Full-featured with all enhancements ───────────── */}
      <PlaygroundSection
        title="✨ Full-featured table (All enhancements)"
        description="Toolbar slot, column visibility, bulk actions, row actions, export, expandable rows — everything enabled."
      >
        <DataTable
          columns={userColumns}
          data={users}
          rowKey="id"
          searchable
          searchPlaceholder="Search users..."
          selectable
          pageSize={5}
          selectedKeys={selected}
          onSelectionChange={setSelected}
          // NEW: Toolbar slot
          toolbar={
            <Button size="sm" variant="outline" onClick={() => toast({ title: 'Add User clicked' })}>
              <PlusCircle style={{ width: 14, height: 14 }} /> Add User
            </Button>
          }
          // NEW: Column visibility toggle
          columnVisibility
          // NEW: Bulk actions
          bulkActions={bulkActions}
          // NEW: Row actions dropdown
          rowActions={getUserRowActions}
          // NEW: Export
          exportable
          exportFilename="users-export"
          // NEW: Expandable rows
          expandable
          expandedKeys={expandedKeys}
          onExpandedKeysChange={setExpandedKeys}
          expandedRowRender={(row) => (
            <div className="grid grid-cols-3 gap-4 p-2">
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Email</p>
                <p className="text-label">{row.email}</p>
              </div>
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Department</p>
                <p className="text-label">{row.department}</p>
              </div>
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Last Login</p>
                <p className="text-label">{row.lastLogin}</p>
              </div>
            </div>
          )}
        />
      </PlaygroundSection>

      {/* ─── NEW: Column Resizing & Reordering ────────────────── */}
      <PlaygroundSection
        title="Column resizing & reordering"
        description="Drag column edges to resize. Drag column headers to reorder."
      >
        <DataTable
          columns={[
            { id: 'id', header: 'ID', width: '100px', sortable: true, minWidth: 80, maxWidth: 150 },
            { id: 'title', header: 'Incident', sortable: true, minWidth: 150, maxWidth: 400 },
            { id: 'severity', header: 'Severity', sortable: true, minWidth: 80, maxWidth: 150 },
            { id: 'status', header: 'Status', sortable: true, minWidth: 100, maxWidth: 150 },
            { id: 'assignee', header: 'Assignee', sortable: true, minWidth: 100, maxWidth: 200 },
          ]}
          data={incidents.slice(0, 5)}
          rowKey="id"
          resizable
          reorderable
          paginated={false}
        />
        <p className="text-caption text-[var(--muted-foreground)] mt-2">
          💡 Drag the edge between column headers to resize. Drag the grip icon to reorder columns.
        </p>
      </PlaygroundSection>

      {/* ─── NEW: Row Actions only ────────────────────────────── */}
      <PlaygroundSection
        title="Row actions dropdown"
        description="Built-in actions dropdown on each row — hover to reveal, click to open menu."
      >
        <DataTable
          columns={[
            { id: 'id', header: 'ID', width: '80px' },
            { id: 'name', header: 'Name', sortable: true },
            { id: 'email', header: 'Email', sortable: true },
            { id: 'role', header: 'Role', sortable: true },
          ]}
          data={users.slice(0, 5)}
          rowKey="id"
          rowActions={getUserRowActions}
          paginated={false}
        />
      </PlaygroundSection>

      {/* ─── NEW: Expandable rows ─────────────────────────────── */}
      <PlaygroundSection
        title="Expandable rows"
        description="Click the chevron to expand a row and see additional details."
      >
        <DataTable
          columns={[
            { id: 'id', header: 'ID', width: '100px' },
            { id: 'title', header: 'Incident', sortable: true },
            { id: 'severity', header: 'Severity', sortable: true, cell: ({ value }) => (
              <Badge variant={value === 'Critical' ? 'destructive' : value === 'High' ? 'warning' : 'secondary'} size="sm">{value}</Badge>
            )},
            { id: 'status', header: 'Status', sortable: true },
          ]}
          data={incidents.slice(0, 5)}
          rowKey="id"
          expandable
          expandMultiple
          expandedRowRender={(row) => (
            <div className="grid grid-cols-4 gap-4 p-2 bg-[var(--secondary)]/20 rounded-md">
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Assignee</p>
                <p className="text-label font-medium">{row.assignee}</p>
              </div>
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Source</p>
                <p className="text-label">{row.source}</p>
              </div>
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Affected Assets</p>
                <p className="text-label">{row.affectedAssets}</p>
              </div>
              <div>
                <p className="text-caption text-[var(--muted-foreground)]">Created</p>
                <p className="text-label">{row.created}</p>
              </div>
            </div>
          )}
          paginated={false}
        />
      </PlaygroundSection>

      {/* ─── NEW: Export functionality ────────────────────────── */}
      <PlaygroundSection
        title="Export to CSV / JSON"
        description="Click the Export button to download table data."
      >
        <DataTable
          columns={incidentColumns.slice(0, 5)}
          data={incidents}
          rowKey="id"
          exportable
          exportFormats={['csv', 'json']}
          exportFilename="incidents-report"
          searchable
          pageSize={5}
        />
      </PlaygroundSection>

      {/* ─── SOC Incidents with column visibility ─────────────── */}
      <PlaygroundSection
        title="Incident table with column toggle"
        description="Toggle columns on/off using the Columns dropdown."
      >
        <DataTable
          columns={incidentColumns}
          data={incidents}
          rowKey="id"
          searchable
          searchPlaceholder="Search incidents..."
          columnVisibility
          pageSize={5}
        />
      </PlaygroundSection>

      {/* ─── Dense + Striped ──────────────────────────────────── */}
      <PlaygroundSection
        title="Dense & striped"
        description="Compact density with alternating row colors for high-density data views."
      >
        <DataTable
          columns={[
            { id: 'id', header: 'ID', width: '80px', sortable: true },
            { id: 'title', header: 'Incident', sortable: true },
            { id: 'severity', header: 'Severity', sortable: true },
            { id: 'status', header: 'Status', sortable: true },
          ]}
          data={incidents}
          rowKey="id"
          dense
          striped
          pageSize={10}
          paginated={false}
        />
      </PlaygroundSection>

      {/* ─── Loading state (skeleton rows) ────────────────────── */}
      <PlaygroundSection
        title="Loading state (skeleton rows)"
        description="Shows animated skeleton rows while data is loading."
      >
        <DataTable
          columns={userColumns.slice(0, 4)}
          data={[]}
          loading
          pageSize={5}
          selectable
          expandable
        />
      </PlaygroundSection>

      {/* ─── Empty state ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Empty state"
        description="When no data matches the filter or the dataset is empty."
      >
        <DataTable
          columns={userColumns.slice(0, 3)}
          data={[]}
          searchable
          pageSize={5}
          emptyState={
            <div className="flex flex-col items-center gap-2 py-4">
              <p className="text-label font-[500]">No users found</p>
              <p className="text-caption text-[var(--muted-foreground)]">Try adjusting your search or add a new user.</p>
              <Button size="sm" className="mt-2">Add User</Button>
            </div>
          }
        />
      </PlaygroundSection>

    </ComponentPage>
  );
}
