import { useState, useCallback } from 'react';
import { ComponentPage, PropsTable, PlaygroundControls, PlaygroundPreview, PlaygroundCodeSection } from '../../components/PlaygroundSection.jsx';
import { 
  Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption,
  TableSortableHead, TableSkeleton, TableEmptyState, TableStickyColumn, TableResponsiveWrapper
} from 'invin-uix/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from 'invin-uix/ui/avatar';
import { Button } from 'invin-uix/ui/button';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Separator } from 'invin-uix/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'invin-uix/ui/tabs';
import { DotsThree, Plus, MagnifyingGlass, Copy, Check, Code } from 'invin-uix/ui/icons';

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════════

const invoices = [
  { id: 'INV001', customer: 'Alice Johnson', email: 'alice@company.com', status: 'Paid', method: 'Credit Card', amount: 250, date: '2024-07-12' },
  { id: 'INV002', customer: 'Bob Smith', email: 'bob@company.com', status: 'Pending', method: 'PayPal', amount: 150, date: '2024-07-11' },
  { id: 'INV003', customer: 'Carol Davis', email: 'carol@company.com', status: 'Paid', method: 'Bank Transfer', amount: 350, date: '2024-07-10' },
  { id: 'INV004', customer: 'David Lee', email: 'david@company.com', status: 'Failed', method: 'Credit Card', amount: 450, date: '2024-07-09' },
  { id: 'INV005', customer: 'Emma Wilson', email: 'emma@company.com', status: 'Paid', method: 'PayPal', amount: 550, date: '2024-07-08' },
  { id: 'INV006', customer: 'Frank Chen', email: 'frank@company.com', status: 'Pending', method: 'Bank Transfer', amount: 275, date: '2024-07-07' },
  { id: 'INV007', customer: 'Grace Kim', email: 'grace@company.com', status: 'Paid', method: 'Credit Card', amount: 890, date: '2024-07-06' },
];

const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/100?u=alice' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/100?u=bob' },
  { id: 3, name: 'Carol Davis', email: 'carol@company.com', role: 'Viewer', status: 'Inactive', avatar: 'https://i.pravatar.cc/100?u=carol' },
  { id: 4, name: 'David Lee', email: 'david@company.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/100?u=david' },
  { id: 5, name: 'Emma Wilson', email: 'emma@company.com', role: 'Editor', status: 'Active', avatar: 'https://i.pravatar.cc/100?u=emma' },
];

const metrics = [
  { id: 1, metric: 'Active Users', value: '2,847', change: '+12.5%', trend: 'up', category: 'Users' },
  { id: 2, metric: 'Monthly Revenue', value: '$48,295', change: '+8.2%', trend: 'up', category: 'Finance' },
  { id: 3, metric: 'Conversion Rate', value: '3.24%', change: '-0.4%', trend: 'down', category: 'Marketing' },
  { id: 4, metric: 'Avg. Session', value: '4m 32s', change: '+0.8%', trend: 'up', category: 'Engagement' },
  { id: 5, metric: 'Bounce Rate', value: '42.1%', change: '-2.1%', trend: 'down', category: 'Engagement' },
  { id: 6, metric: 'Page Views', value: '124,582', change: '+15.3%', trend: 'up', category: 'Traffic' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function CodePreview({ code, title = 'Code' }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="relative mt-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--secondary)]/50 border border-[var(--border)] border-b-0 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Code style={{ width: 14, height: 14 }} className="text-[var(--muted-foreground)]" />
          <span className="text-xs font-medium text-[var(--muted-foreground)]">{title}</span>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
          {copied ? <Check style={{ width: 14, height: 14 }} className="text-[var(--ok)]" /> : <Copy style={{ width: 14, height: 14 }} />}
        </Button>
      </div>
      <pre className="p-4 text-[13px] font-mono bg-[var(--background)] border border-[var(--border)] rounded-b-lg overflow-x-auto max-h-[400px] overflow-y-auto">
        <code className="text-[var(--foreground)]">{code.trim()}</code>
      </pre>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════════

function HeroShowcase() {
  return (
    <div className="rounded-xl border border-[var(--border)] overflow-hidden mb-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--secondary)]/30">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Team Members</h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            {users.length} members · {users.filter(u => u.status === 'Active').length} active
          </p>
        </div>
        <Button size="sm">
          <Plus style={{ width: 14, height: 14 }} className="mr-1.5" />
          Invite Member
        </Button>
      </div>

      {/* Live Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.role === 'Admin' ? 'default' : user.role === 'Editor' ? 'outline' : 'secondary'}
                  size="sm"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      user.status === 'Active' ? 'bg-[var(--ok)]' : 'bg-[var(--muted-foreground)]/40'
                    }`}
                  />
                  <span className={`text-sm ${user.status === 'Active' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>
                    {user.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon-sm">
                  <DotsThree style={{ width: 16, height: 16 }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ToggleControl({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm
        ${checked 
          ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]' 
          : 'bg-[var(--secondary)]/50 border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)]'
        }
      `}
    >
      <span className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${checked ? 'bg-[var(--accent)]' : 'bg-[var(--secondary)] border border-[var(--border)]'}`}>
        {checked && <Check style={{ width: 10, height: 10 }} className="text-white" />}
      </span>
      <span className="font-medium whitespace-nowrap">{label}</span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTERACTIVE PLAYGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function TablePlayground() {
  const [size, setSize] = useState('default');
  // false | 'outline' | 'cells'  — matches the new TableBordered type
  const [bordered, setBordered] = useState(false);
  const [striped, setStriped] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  
  const total = invoices.slice(0, 5).reduce((sum, inv) => sum + inv.amount, 0);

  const borderedProp = bordered === 'outline' ? ' bordered="outline"' : bordered === 'cells' ? ' bordered="cells"' : '';

  const code = `<Table${size !== 'default' ? ` size="${size}"` : ''}${borderedProp}>
  ${showCaption ? '<TableCaption>A list of recent invoices.</TableCaption>\n  ' : ''}<TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody${striped ? ' striped' : ''}>
    {invoices.map(inv => (
      <TableRow key={inv.id}>
        <TableCell className="font-medium">{inv.id}</TableCell>
        <TableCell>{inv.customer}</TableCell>
        <TableCell>
          <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>
            {inv.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">\${inv.amount}.00</TableCell>
      </TableRow>
    ))}
  </TableBody>${showFooter ? `
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3} className="font-semibold">Total</TableCell>
      <TableCell className="text-right font-semibold">\$${total}.00</TableCell>
    </TableRow>
  </TableFooter>` : ''}
</Table>`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/30" />
        <div className="pl-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
            Interactive Playground
            <Badge variant="accent" size="sm">Live</Badge>
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Experiment with all Table props and see changes in real-time.
          </p>
        </div>
      </div>

      <Card>
        {/* Preview */}
        <PlaygroundPreview>
          <Table size={size} bordered={bordered}>
            {showCaption && <TableCaption>A list of recent invoices.</TableCaption>}
            {showHeader && (
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody striped={striped}>
              {invoices.slice(0, 5).map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {showFooter && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-semibold">Total</TableCell>
                  <TableCell className="text-right font-semibold">${total}.00</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </PlaygroundPreview>

        {/* Controls */}
        <PlaygroundControls count={7}>
          <div className="space-y-4">
            {/* Size selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[var(--muted-foreground)] w-16">Size</span>
              <div className="flex gap-2">
                {['default', 'dense'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      size === s 
                        ? 'bg-[var(--accent)] text-white' 
                        : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]/80'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Border mode selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[var(--muted-foreground)] w-16">Borders</span>
              <div className="flex gap-2">
                {[
                  { value: false, label: 'None' },
                  { value: 'outline', label: 'Outline' },
                  { value: 'cells', label: 'Cells' },
                ].map(opt => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setBordered(opt.value)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      bordered === opt.value
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]/80'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Boolean toggles */}
            <div className="flex flex-wrap gap-2">
              <ToggleControl label="Striped" checked={striped} onChange={setStriped} />
              <ToggleControl label="Header" checked={showHeader} onChange={setShowHeader} />
              <ToggleControl label="Footer" checked={showFooter} onChange={setShowFooter} />
              <ToggleControl label="Caption" checked={showCaption} onChange={setShowCaption} />
            </div>
          </div>
        </PlaygroundControls>

        {/* Code */}
        <PlaygroundCodeSection>
          <CodePreview code={code} title="JSX" />
        </PlaygroundCodeSection>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURE EXAMPLES WITH CODE
// ═══════════════════════════════════════════════════════════════════════════════

function SortableExample() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(false);

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(false);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (!sortColumn || !sortDirection) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (typeof aVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDirection === 'asc' 
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const code = `const [sortColumn, setSortColumn] = useState(null);
const [sortDirection, setSortDirection] = useState(false);

const handleSort = (column) => {
  if (sortColumn === column) {
    if (sortDirection === 'asc') setSortDirection('desc');
    else if (sortDirection === 'desc') {
      setSortColumn(null);
      setSortDirection(false);
    }
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

<Table>
  <TableHeader>
    <TableRow>
      <TableSortableHead
        sorted={sortColumn === 'id' ? sortDirection : false}
        onSort={() => handleSort('id')}
      >
        Invoice
      </TableSortableHead>
      <TableSortableHead
        sorted={sortColumn === 'customer' ? sortDirection : false}
        onSort={() => handleSort('customer')}
      >
        Customer
      </TableSortableHead>
      <TableSortableHead
        sorted={sortColumn === 'amount' ? sortDirection : false}
        onSort={() => handleSort('amount')}
        className="text-right"
      >
        Amount
      </TableSortableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sortedData.map(item => (
      <TableRow key={item.id}>...</TableRow>
    ))}
  </TableBody>
</Table>`;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortableHead
              sorted={sortColumn === 'id' ? sortDirection : false}
              onSort={() => handleSort('id')}
            >
              Invoice
            </TableSortableHead>
            <TableSortableHead
              sorted={sortColumn === 'customer' ? sortDirection : false}
              onSort={() => handleSort('customer')}
            >
              Customer
            </TableSortableHead>
            <TableSortableHead
              sorted={sortColumn === 'status' ? sortDirection : false}
              onSort={() => handleSort('status')}
            >
              Status
            </TableSortableHead>
            <TableSortableHead
              sorted={sortColumn === 'amount' ? sortDirection : false}
              onSort={() => handleSort('amount')}
              className="text-right"
            >
              Amount
            </TableSortableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map(inv => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.customer}</TableCell>
              <TableCell>
                <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="text-xs text-[var(--muted-foreground)]">
        Current sort: <code className="px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[var(--accent)]">
          {sortColumn ? `${sortColumn} (${sortDirection})` : 'none'}
        </code> — Click headers to sort. Supports keyboard (Enter/Space).
      </p>
      <CodePreview code={code} title="Sortable Table" />
    </div>
  );
}

function StickyHeaderExample() {
  const manyRows = [...invoices, ...invoices, ...invoices];

  const code = `// 1. Add stickyHeader to both Table and TableHeader
// 2. Wrap in a single fixed-height overflow-auto container (must be sole scroll container)

<div style={{ height: '280px', overflow: 'auto' }}>
  <Table stickyHeader>
    <TableHeader stickyHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id}>
          <TableCell className="font-medium">{row.id}</TableCell>
          <TableCell>{row.customer}</TableCell>
          <TableCell>
            <Badge variant={row.status === 'Paid' ? 'success' : 'warning'}>
              {row.status}
            </Badge>
          </TableCell>
          <TableCell className="text-right">\${row.amount}.00</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`;

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--muted-foreground)]">
        Add{' '}
        <code className="px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[var(--accent)] text-xs">stickyHeader</code>{' '}
        to <code className="px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[var(--accent)] text-xs">Table</code>{' '}
        and <code className="px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[var(--accent)] text-xs">TableHeader</code>,
        then wrap in a single fixed-height <code className="px-1.5 py-0.5 bg-[var(--secondary)] rounded text-[var(--accent)] text-xs">overflow-auto</code> container.
      </p>
      <div className="h-[280px] overflow-auto border border-[var(--border)] rounded-lg">
        <Table stickyHeader>
          <TableHeader stickyHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manyRows.map((inv, i) => (
              <TableRow key={`${inv.id}-${i}`}>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell>
                  <Badge
                    variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'}
                    size="sm"
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        Scroll the container to see the header remain fixed at the top.
      </p>
      <CodePreview code={code} title="stickyHeader" />
    </div>
  );
}


function SkeletonExample() {
  const code = `// Default skeleton (5 rows, 4 columns)
<TableSkeleton />

// Custom configuration
<TableSkeleton 
  rows={3} 
  columns={5} 
  showHeader={true}
  dense={false}
  columnWidths={['10%', '30%', '20%', '20%', '20%']}
/>

// Dense skeleton without header
<TableSkeleton rows={4} columns={3} showHeader={false} dense />`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Default skeleton:</p>
        <TableSkeleton />
      </div>
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Dense skeleton (3 rows, no header):</p>
        <TableSkeleton rows={3} columns={3} showHeader={false} dense />
      </div>
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Custom column widths:</p>
        <TableSkeleton rows={4} columns={5} columnWidths={['10%', '30%', '20%', '20%', '20%']} />
      </div>
      <CodePreview code={code} title="TableSkeleton" />
    </div>
  );
}

function EmptyStateExample() {
  const code = `// Basic empty state
<TableEmptyState 
  title="No invoices found"
  description="Create your first invoice to get started."
/>

// With action button
<TableEmptyState 
  title="No results"
  description="Try adjusting your search or filters."
  action={<Button size="sm"><Plus /> New Invoice</Button>}
/>

// Custom icon
<TableEmptyState 
  icon={<MagnifyingGlass className="w-12 h-12" />}
  title="No search results"
  description="Try different keywords."
/>

// Inside table body
<TableBody>
  {data.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="p-0">
        <TableEmptyState title="No data" />
      </TableCell>
    </TableRow>
  ) : (
    data.map(item => <TableRow>...</TableRow>)
  )}
</TableBody>`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Basic empty state:</p>
        <div className="border border-[var(--border)] rounded-lg">
          <TableEmptyState 
            title="No invoices found"
            description="Create your first invoice to get started."
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">With action:</p>
        <div className="border border-[var(--border)] rounded-lg">
          <TableEmptyState 
            title="No results"
            description="Try adjusting your search or filters."
            action={<Button size="sm"><Plus style={{ width: 14, height: 14 }} className="mr-1" /> New Invoice</Button>}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Custom icon:</p>
        <div className="border border-[var(--border)] rounded-lg">
          <TableEmptyState 
            icon={<MagnifyingGlass style={{ width: 48, height: 48 }} className="text-[var(--muted-foreground)]/50" />}
            title="No search results"
            description="Try different keywords."
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Inside table:</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="p-0">
                <TableEmptyState 
                  title="No matching invoices"
                  description="Clear filters to see all invoices."
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <CodePreview code={code} title="TableEmptyState" />
    </div>
  );
}

function ResponsiveExample() {
  const code = `<TableResponsiveWrapper 
  breakpoint="md" 
  mobileMode="scroll"
  showScrollIndicator={true}
>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map(inv => (
        <TableRow key={inv.id}>
          <TableCell>{inv.id}</TableCell>
          <TableCell>{inv.customer}</TableCell>
          <TableCell>{inv.email}</TableCell>
          <TableCell><Badge>{inv.status}</Badge></TableCell>
          <TableCell>{inv.method}</TableCell>
          <TableCell>{inv.date}</TableCell>
          <TableCell className="text-right">\${inv.amount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableResponsiveWrapper>`;

  return (
    <div className="space-y-4">
      <TableResponsiveWrapper breakpoint="md" mobileMode="scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(inv => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.customer}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{inv.email}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>{inv.method}</TableCell>
                <TableCell className="text-[var(--muted-foreground)]">{inv.date}</TableCell>
                <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableResponsiveWrapper>
      <p className="text-xs text-[var(--muted-foreground)]">
        Resize window to see horizontal scroll on mobile. Gradient indicator shows more content.
      </p>
      <CodePreview code={code} title="TableResponsiveWrapper" />
    </div>
  );
}

function StickyColumnExample() {
  const wideData = invoices.map(inv => ({
    ...inv,
    department: 'Engineering',
    region: 'North America',
    quarter: 'Q3 2024',
    notes: 'Processed successfully'
  }));

  const code = `import { 
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableStickyColumn 
} from 'invin-uix/ui/table';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { DotsThree } from 'invin-uix/ui/icons';

const data = [
  { id: 'INV001', customer: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', status: 'Paid', amount: 250 },
  { id: 'INV002', customer: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', status: 'Pending', amount: 150 },
  { id: 'INV003', customer: 'Carol Davis', email: 'carol@company.com', department: 'Sales', status: 'Paid', amount: 350 },
];

// Sticky Left Column Example
<div className="overflow-x-auto border border-[var(--border)] rounded-lg">
  <Table className="min-w-[900px]">
    <TableHeader>
      <TableRow>
        <TableStickyColumn position="left">
          <TableHead>Invoice</TableHead>
        </TableStickyColumn>
        <TableHead>Customer</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Department</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableStickyColumn position="left">
            <TableCell className="font-medium">{row.id}</TableCell>
          </TableStickyColumn>
          <TableCell>{row.customer}</TableCell>
          <TableCell className="text-[var(--muted-foreground)]">{row.email}</TableCell>
          <TableCell>{row.department}</TableCell>
          <TableCell>
            <Badge variant={row.status === 'Paid' ? 'success' : 'warning'} size="sm">
              {row.status}
            </Badge>
          </TableCell>
          <TableCell className="text-right font-medium">\${row.amount}.00</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

// Sticky Right Column Example (Actions)
<div className="overflow-x-auto border border-[var(--border)] rounded-lg">
  <Table className="min-w-[900px]">
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Department</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableStickyColumn position="right">
          <TableHead className="text-center">Actions</TableHead>
        </TableStickyColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id}>
          <TableCell className="font-medium">{row.id}</TableCell>
          <TableCell>{row.customer}</TableCell>
          <TableCell className="text-[var(--muted-foreground)]">{row.email}</TableCell>
          <TableCell>{row.department}</TableCell>
          <TableCell>
            <Badge variant={row.status === 'Paid' ? 'success' : 'warning'} size="sm">
              {row.status}
            </Badge>
          </TableCell>
          <TableCell className="text-right font-medium">\${row.amount}.00</TableCell>
          <TableStickyColumn position="right">
            <TableCell className="text-center">
              <Button variant="ghost" size="icon-sm">
                <DotsThree style={{ width: 16, height: 16 }} />
              </Button>
            </TableCell>
          </TableStickyColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

// Props:
// - position: 'left' | 'right' (required)
// - bgColor: string | false (default: 'bg-[var(--background)]')
// - showShadow: boolean (default: true)
// - zIndex: number (default: 10)`;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-2">Sticky Left Column</h4>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">
          The Invoice column stays fixed while you scroll horizontally. Try scrolling the table to the right.
        </p>
        <div className="overflow-x-auto max-w-full border border-[var(--border)] rounded-lg">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableStickyColumn position="left">
                  <TableHead>Invoice</TableHead>
                </TableStickyColumn>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Quarter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wideData.slice(0, 5).map(inv => (
                <TableRow key={inv.id}>
                  <TableStickyColumn position="left">
                    <TableCell className="font-medium">{inv.id}</TableCell>
                  </TableStickyColumn>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{inv.email}</TableCell>
                  <TableCell>{inv.department}</TableCell>
                  <TableCell>{inv.region}</TableCell>
                  <TableCell>{inv.quarter}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-2">Sticky Right Column (Actions)</h4>
        <p className="text-xs text-[var(--muted-foreground)] mb-4">
          The Actions column stays fixed on the right while scrolling left.
        </p>
        <div className="overflow-x-auto max-w-full border border-[var(--border)] rounded-lg">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableStickyColumn position="right">
                  <TableHead className="text-center">Actions</TableHead>
                </TableStickyColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wideData.slice(0, 5).map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{inv.email}</TableCell>
                  <TableCell>{inv.department}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
                  <TableStickyColumn position="right">
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon-sm">
                        <DotsThree style={{ width: 16, height: 16 }} />
                      </Button>
                    </TableCell>
                  </TableStickyColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CodePreview code={code} title="TableStickyColumn" />
    </div>
  );
}

function SelectableExample() {
  const [selected, setSelected] = useState([]);
  
  const toggleAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map(u => u.id));
    }
  };

  const toggleRow = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const code = `const [selected, setSelected] = useState([]);

const toggleAll = () => {
  if (selected.length === data.length) {
    setSelected([]);
  } else {
    setSelected(data.map(item => item.id));
  }
};

const toggleRow = (id) => {
  setSelected(prev => 
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );
};

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-10">
        <Checkbox 
          checked={selected.length === data.length}
          indeterminate={selected.length > 0 && selected.length < data.length}
          onCheckedChange={toggleAll}
        />
      </TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow 
        key={item.id}
        selected={selected.includes(item.id)}
      >
        <TableCell>
          <Checkbox 
            checked={selected.includes(item.id)}
            onCheckedChange={() => toggleRow(item.id)}
          />
        </TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.role}</TableCell>
        <TableCell>{item.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          {selected.length} of {users.length} row(s) selected
        </p>
        {selected.length > 0 && (
          <Button size="sm" variant="outline" onClick={() => setSelected([])}>
            Clear selection
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={selected.length === users.length}
                indeterminate={selected.length > 0 && selected.length < users.length}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} selected={selected.includes(user.id)}>
              <TableCell>
                <Checkbox 
                  checked={selected.includes(user.id)}
                  onCheckedChange={() => toggleRow(user.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} size="sm">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'success' : 'warning'} size="sm">
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon-sm">
                  <DotsThree style={{ width: 16, height: 16 }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CodePreview code={code} title="Selectable Rows" />
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function TableDemo() {
  return (
    <ComponentPage
      name="Table"
      description="Semantic HTML table primitives with styled sub-components. Build simple data displays or compose with additional components for sorting, selection, loading states, and responsive behavior."
      badges={[
        { label: '7 Components', variant: 'secondary' },
        { label: 'Accessible', variant: 'outline' }
      ]}
      importCode={`import { 
  Table, TableHeader, TableBody, TableFooter, 
  TableRow, TableHead, TableCell, TableCaption,
  TableSortableHead, TableSkeleton, TableEmptyState, 
  TableStickyColumn, TableResponsiveWrapper
} from 'invin-uix/ui/table';`}
    >
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <HeroShowcase />

      <Separator className="my-10" />

      {/* ─── Interactive Playground ─────────────────────────────────── */}
      <TablePlayground />
      
      <Separator className="my-10" />


      {/* ─── Feature Examples ─────────────────────────────────────── */}
      <div className="space-y-3 mb-8">
        <h2 className="text-xl font-bold text-[var(--foreground)]">Features & Examples</h2>
        <p className="text-[var(--muted-foreground)]">
          Explore each table feature with live examples and copy-ready code.
        </p>
      </div>

      <Tabs defaultValue="variants" className="w-full">
        <TabsList className="mb-8 flex-wrap h-auto gap-2 p-1 bg-[var(--secondary)]/50 rounded-lg">
          <TabsTrigger value="variants" className="px-4 py-2">Size & Style</TabsTrigger>
          <TabsTrigger value="sorting" className="px-4 py-2">Sorting</TabsTrigger>
          <TabsTrigger value="sticky" className="px-4 py-2">Sticky</TabsTrigger>
          <TabsTrigger value="states" className="px-4 py-2">States</TabsTrigger>
          <TabsTrigger value="responsive" className="px-4 py-2">Responsive</TabsTrigger>
          <TabsTrigger value="selectable" className="px-4 py-2">Selectable</TabsTrigger>
        </TabsList>

        {/* Size & Style Variants */}
        <TabsContent value="variants" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Size Variants</CardTitle>
              <CardDescription>Default vs dense sizing. Dense reduces padding for data-heavy tables.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">Default size:</p>
                <Table size="default">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 3).map(inv => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.id}</TableCell>
                        <TableCell>{inv.customer}</TableCell>
                        <TableCell className="text-right">${inv.amount}.00</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">Dense size:</p>
                <Table size="dense">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 3).map(inv => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium">{inv.id}</TableCell>
                        <TableCell>{inv.customer}</TableCell>
                        <TableCell className="text-right">${inv.amount}.00</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <CodePreview code={`// Default size
<Table size="default">...</Table>

// Dense / compact size
<Table size="dense">...</Table>`} title="Size Variants" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bordered Table</CardTitle>
              <CardDescription>Add borders to all cells for a grid-like appearance.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table bordered>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 4).map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.customer}</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${inv.amount}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CodePreview code={`<Table bordered>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
    </TableRow>
  </TableBody>
</Table>`} title="Bordered Table" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Striped Rows</CardTitle>
              <CardDescription>Alternating row colors improve readability for large datasets.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody striped>
                  {invoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.customer}</TableCell>
                      <TableCell className="text-[var(--muted-foreground)]">{inv.method}</TableCell>
                      <TableCell className="text-right">${inv.amount}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CodePreview code={`<Table>
  <TableBody striped>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`} title="Striped Rows" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Combined Features</CardTitle>
              <CardDescription>Dense + bordered + striped for maximum data density.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table size="dense" bordered>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody striped>
                  {invoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.customer}</TableCell>
                      <TableCell className="text-[var(--muted-foreground)]">{inv.method}</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'destructive'} size="sm">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">${inv.amount}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <CodePreview code={`<Table size="dense" bordered>
  <TableBody striped>
    {data.map(item => <TableRow>...</TableRow>)}
  </TableBody>
</Table>`} title="Combined Features" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sorting */}
        <TabsContent value="sorting">
          <Card>
            <CardHeader>
              <CardTitle>Sortable Headers</CardTitle>
              <CardDescription>
                TableSortableHead provides built-in sort icons, aria-sort attribute, and keyboard support. 
                Click headers to cycle through asc → desc → none.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SortableExample />
            </CardContent>
          </Card>
        </TabsContent>

        {/* States */}
        <TabsContent value="states">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loading</CardTitle>
                <CardDescription>
                  TableSkeleton shows animated placeholder rows while data loads.
                  Configurable rows, columns, and sizing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkeletonExample />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Empty State</CardTitle>
                <CardDescription>
                  TableEmptyState provides a consistent empty state with icon, title, description, and action slot.
                  Works standalone or inside table rows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyStateExample />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Responsive */}
        <TabsContent value="responsive">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Wrapper</CardTitle>
              <CardDescription>
                TableResponsiveWrapper enables horizontal scrolling on mobile with optional scroll indicator.
                Resize your browser to see the effect.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveExample />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sticky */}
        <TabsContent value="sticky">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sticky Header</CardTitle>
                <CardDescription>
                  Keeps column headings visible as you scroll through rows. Add{' '}
                  <code className="px-1 py-0.5 bg-[var(--secondary)] rounded text-xs">stickyHeader</code>{' '}
                  to TableHeader and place the table in a fixed-height scrollable container.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StickyHeaderExample />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sticky Columns</CardTitle>
                <CardDescription>
                  TableStickyColumn keeps important columns visible while scrolling horizontally.
                  Perfect for wide tables with many columns where you need to keep identifiers or actions visible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StickyColumnExample />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Selectable */}
        <TabsContent value="selectable">
          <Card>
            <CardHeader>
              <CardTitle>Selectable Rows</CardTitle>
              <CardDescription>
                Add checkboxes for row selection. Use the <code className="px-1 py-0.5 bg-[var(--secondary)] rounded text-xs">selected</code> prop on TableRow to highlight selected rows.
                Supports individual and bulk selection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SelectableExample />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />
      {/* ─── Component API ─────────────────────────────────────────── */}
      <PropsTable
        title="Component API"
        props={[
          { name: 'Table', type: '<table>', default: '—', description: 'Root table wrapper with overflow scroll container' },
          { name: '↳ size', type: "'default' | 'dense'", default: "'default'", description: 'Size variant — dense reduces cell padding' },
          { name: '↳ bordered', type: 'boolean', default: 'false', description: 'Show borders on all cells' },
          { name: 'TableHeader', type: '<thead>', default: '—', description: 'Header section with bottom border' },
          { name: '↳ stickyHeader', type: 'boolean', default: 'false', description: 'Stick the header to top when the table scrolls' },
          { name: 'TableBody', type: '<tbody>', default: '—', description: 'Body section for data rows' },
          { name: '↳ striped', type: 'boolean', default: 'false', description: 'Alternating row background colors' },
          { name: 'TableFooter', type: '<tfoot>', default: '—', description: 'Footer section with subtle background' },
          { name: 'TableRow', type: '<tr>', default: '—', description: 'Row with hover highlight' },
          { name: '↳ selected', type: 'boolean', default: 'false', description: 'Mark row as selected — highlights the row and sets data-state="selected"' },
          { name: 'TableHead', type: '<th>', default: '—', description: 'Header cell — muted color, medium font weight' },
          { name: '↳ align', type: "'left' | 'center' | 'right'", default: '—', description: 'Horizontal text alignment' },
          { name: 'TableCell', type: '<td>', default: '—', description: 'Data cell' },
          { name: '↳ align', type: "'left' | 'center' | 'right'", default: '—', description: 'Horizontal text alignment' },
          { name: '↳ isRowHeader', type: 'boolean', default: 'false', description: 'Render as <th scope="row"> for accessible row headers' },
          { name: 'TableCaption', type: '<caption>', default: '—', description: 'Accessible table caption (rendered below table)' },
        ]}
      />

      <PropsTable
        title="TableSortableHead"
        props={[
          { name: 'sorted', type: "'asc' | 'desc' | false", default: 'false', description: 'Current sort direction for this column' },
          { name: 'onSort', type: '() => void', default: '—', description: 'Callback when header is clicked or activated via keyboard', required: true },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable sorting interaction' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'Header label content' },
        ]}
      />

      <PropsTable
        title="TableSkeleton"
        props={[
          { name: 'rows', type: 'number', default: '5', description: 'Number of skeleton rows to display' },
          { name: 'columns', type: 'number', default: '4', description: 'Number of columns' },
          { name: 'showHeader', type: 'boolean', default: 'true', description: 'Show header skeleton row' },
          { name: 'dense', type: 'boolean', default: 'false', description: 'Use compact sizing' },
          { name: 'bordered', type: 'boolean', default: 'false', description: 'Show outer border on the skeleton table' },
          { name: 'columnWidths', type: 'string[]', default: '—', description: 'Custom column widths array (e.g., ["15%", "35%", "25%", "25%"])' },
        ]}
      />

      <PropsTable
        title="TableEmptyState"
        props={[
          { name: 'title', type: 'string', default: "'No data'", description: 'Main heading text' },
          { name: 'description', type: 'string', default: '—', description: 'Optional description text' },
          { name: 'icon', type: 'ReactNode', default: 'inbox icon', description: 'Custom icon (pass null to hide)' },
          { name: 'action', type: 'ReactNode', default: '—', description: 'Action button or content slot' },
          { name: 'colSpan', type: 'number', default: '—', description: 'Column span when used inside TableRow' },
        ]}
      />

      <PropsTable
        title="TableResponsiveWrapper"
        props={[
          { name: 'breakpoint', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Breakpoint below which mobile mode activates' },
          { name: 'mobileMode', type: "'scroll' | 'stack'", default: "'scroll'", description: 'Mobile behavior — scroll horizontally or stack vertically' },
          { name: 'showScrollIndicator', type: 'boolean', default: 'true', description: 'Show gradient indicator when content is scrollable' },
        ]}
      />

      <PropsTable
        title="TableStickyColumn"
        props={[
          { name: 'position', type: "'left' | 'right'", default: '—', description: 'Which edge to stick the column to', required: true },
          { name: 'zIndex', type: 'number', default: '10', description: 'Z-index for stacking context' },
          { name: 'bgColor', type: 'string | false', default: "'bg-[var(--background)]'", description: 'Background color class. Set to false for transparent.' },
          { name: 'showShadow', type: 'boolean', default: 'true', description: 'Show edge shadow indicator' },
          { name: 'children', type: 'ReactElement', default: '—', description: 'Single TableHead or TableCell element to make sticky', required: true },
        ]}
      />
    </ComponentPage>
  );
}
