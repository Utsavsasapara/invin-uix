import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Progress } from 'invin-uix/ui/progress';
import { PieChart } from 'invin-uix/ui/chart';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from 'invin-uix/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'invin-uix/ui/dropdown-menu';
import { 
  MagnifyingGlass,
  FunnelSimple,
  ArrowsDownUp,
  Rows,
  SquaresFour,
  ArrowClockwise,
  Folder,
  File,
  Pencil,
  Trash,
  Eye,
  Download,
  DotsThreeVertical,
  CheckCircle,
  Warning,
  Clock,
  XCircle,
  Info,
  CloudArrowUp,
} from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const kpiStats = [
  { 
    key: 'total',
    label: 'Total Evidence', 
    value: 14, 
    icon: File,
    color: 'var(--muted-foreground)',
    bgColor: 'var(--secondary)',
  },
  { 
    key: 'approved',
    label: 'Approved', 
    value: 0, 
    suffix: '0%',
    icon: CheckCircle,
    color: 'var(--ok)',
    bgColor: 'color-mix(in srgb, var(--ok) 15%, transparent)',
  },
  { 
    key: 'review',
    label: 'Needs Review', 
    value: 1, 
    icon: Eye,
    color: '#eab308',
    bgColor: 'color-mix(in srgb, #eab308 15%, transparent)',
  },
  { 
    key: 'expiring',
    label: 'Expiring Soon', 
    value: 3, 
    suffix: '45 days',
    icon: Clock,
    color: '#f97316',
    bgColor: 'color-mix(in srgb, #f97316 15%, transparent)',
  },
  { 
    key: 'gaps',
    label: 'Evidence Gaps', 
    value: 2281, 
    suffix: 'controls',
    icon: Warning,
    color: 'var(--error)',
    bgColor: 'color-mix(in srgb, var(--error) 15%, transparent)',
  },
];

const healthData = {
  healthy: 0,
  stats: [
    { label: 'Needs Review', value: 1, color: '#eab308' },
    { label: 'Expiring Soon', value: 3, color: '#f97316' },
    { label: 'Expired', value: 5, color: 'var(--error)' },
    { label: 'Others', value: 5, color: 'var(--muted-foreground)' },
  ],
};

const coverageData = {
  percentage: 0.1,
  frameworks: [
    { name: 'CIS Controls v8.1', percentage: 0.6, controls: '1/171' },
    { name: 'ISO 27701', percentage: 1.5, controls: '1/65' },
  ],
};

const sourcesData = {
  total: 14,
  sources: [
    { name: 'Local Upload', percentage: 100, count: 14, icon: CloudArrowUp },
  ],
};

const foldersData = [
  { id: 1, name: 'Audit-3rd_September', owner: '-', dateModified: '9/2/2026', size: '-' },
  { id: 2, name: 'AWS CloudTrail', owner: '-', dateModified: '8/22/2026', size: '-' },
  { id: 3, name: 'CrowdStrike Falcon', owner: '-', dateModified: '8/22/2026', size: '-' },
];

const evidenceData = [
  { id: 1, name: '05_Acceptable_Use_Policy', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
  { id: 2, name: '04_Incident_Response_Policy', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
  { id: 3, name: '03_Password_and_MFA_Policy', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
  { id: 4, name: 'v1-2026-08-04', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
  { id: 5, name: 'test_evidence_11353_20260730', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
  { id: 6, name: 'test_evidence_13402_20260730', tag: '-', visibility: 'Public', approval: 'Pending', owner: 'NG&RA' },
];

// ─── KPI Stat Card Component ─────────────────────────────────────────────────

function KpiStatCard({ label, value, suffix, icon: Icon, color, bgColor }) {
  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.02]"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: color + '20' }}
      >
        <Icon style={{ width: 20, height: 20, color: color }} />
      </div>
      <div className="flex-1">
        <p className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-[24px] font-bold text-[var(--foreground)]">{value}</span>
          {suffix && <span className="text-[12px] text-[var(--muted-foreground)]">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Main Evidence Library Component ─────────────────────────────────────────

export default function GsosEvidence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState([]);

  // Chart data for health donut
  const healthChartData = healthData.stats.map(item => ({
    name: item.label,
    value: item.value,
    fill: item.color,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <div>
        <p className="text-[12px] text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">🏠 Home</span> › Evidence Library
        </p>
        <h1 className="text-[24px] font-bold text-[var(--foreground)] mt-1">
          Evidence Library
        </h1>
      </div>

      {/* ─── KPI Stats Row ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiStats.map((stat) => (
          <KpiStatCard key={stat.key} {...stat} />
        ))}
      </div>

      {/* ─── Charts Row ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence Health */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px]">Evidence Health</CardTitle>
              <Info style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {/* Donut Chart */}
              <div className="relative w-32 h-32">
                <PieChart
                  data={healthChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={55}
                  height={128}
                  width={128}
                  showLegend={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] font-bold text-[var(--ok)]">{healthData.healthy}%</span>
                  <span className="text-[9px] text-[var(--muted-foreground)]">HEALTHY</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-2">
                {healthData.stats.map((item) => (
                  <div 
                    key={item.label} 
                    className="flex items-center justify-between text-[11px] cursor-pointer hover:bg-[var(--secondary)] p-1 rounded"
                  >
                    <span className="flex items-center gap-2 text-[var(--muted-foreground)]">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Coverage */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[14px]">Evidence Coverage</CardTitle>
              <Info style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {/* Donut Chart */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray={`${coverageData.percentage} 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[16px] font-bold text-[#f97316]">{coverageData.percentage}%</span>
                  <span className="text-[9px] text-[var(--muted-foreground)]">COVERAGE</span>
                </div>
              </div>

              {/* Framework Progress */}
              <div className="flex-1 space-y-3">
                {coverageData.frameworks.map((fw) => (
                  <div key={fw.name} className="cursor-pointer hover:bg-[var(--secondary)] p-1 rounded">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[var(--muted-foreground)] truncate">{fw.name}</span>
                      <span className="text-[var(--accent)] font-medium">{fw.percentage}%</span>
                    </div>
                    <Progress value={fw.percentage} className="h-1" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Sources */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-[14px]">Evidence Sources</CardTitle>
                <Badge variant="outline" size="sm">{sourcesData.total}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sourcesData.sources.map((source) => (
                <div 
                  key={source.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--secondary)] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[var(--accent)]/10 flex items-center justify-center">
                      <source.icon style={{ width: 16, height: 16, color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <p className="text-[12px] font-medium">{source.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{source.percentage}%</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-bold text-[var(--accent)]">{source.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Search & Filter Bar ──────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MagnifyingGlass 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" 
              style={{ width: 16, height: 16 }} 
            />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[280px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <FunnelSimple style={{ width: 14, height: 14 }} />
            Sort & Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm">
            <ArrowClockwise style={{ width: 16, height: 16 }} />
          </Button>
          <div className="flex border border-[var(--border)] rounded-md">
            <Button variant="ghost" size="icon-sm" className="rounded-r-none border-r border-[var(--border)]">
              <Rows style={{ width: 16, height: 16 }} />
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-l-none">
              <SquaresFour style={{ width: 16, height: 16 }} />
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Folders Table ────────────────────────────────────── */}
      <div>
        <h3 className="text-[12px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">
          Folders ({foldersData.length})
        </h3>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedFolders.length === foldersData.length}
                    onCheckedChange={(checked) => {
                      setSelectedFolders(checked ? foldersData.map(f => f.id) : []);
                    }}
                  />
                </TableHead>
                <TableHead className="w-16">Sr. no</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Date modified</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foldersData.map((folder) => (
                <TableRow key={folder.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedFolders.includes(folder.id)}
                      onCheckedChange={(checked) => {
                        setSelectedFolders(prev => 
                          checked 
                            ? [...prev, folder.id]
                            : prev.filter(id => id !== folder.id)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{folder.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Folder style={{ width: 16, height: 16, color: '#eab308' }} />
                      <span className="font-medium">{folder.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{folder.owner}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{folder.dateModified}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{folder.size}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Pencil style={{ width: 14, height: 14 }} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Trash style={{ width: 14, height: 14 }} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end gap-4 p-3 border-t border-[var(--border)]">
            <span className="text-[12px] text-[var(--muted-foreground)]">Rows per page: 5</span>
            <span className="text-[12px] text-[var(--muted-foreground)]">1–3 of 3</span>
          </div>
        </Card>
      </div>

      {/* ─── Evidence Table ───────────────────────────────────── */}
      <div>
        <h3 className="text-[12px] font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">
          Evidence ({evidenceData.length})
        </h3>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedEvidence.length === evidenceData.length}
                    onCheckedChange={(checked) => {
                      setSelectedEvidence(checked ? evidenceData.map(e => e.id) : []);
                    }}
                  />
                </TableHead>
                <TableHead className="w-16">Sr. no</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidenceData.map((evidence) => (
                <TableRow key={evidence.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedEvidence.includes(evidence.id)}
                      onCheckedChange={(checked) => {
                        setSelectedEvidence(prev => 
                          checked 
                            ? [...prev, evidence.id]
                            : prev.filter(id => id !== evidence.id)
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{evidence.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <File style={{ width: 16, height: 16, color: 'var(--error)' }} />
                      <span className="font-medium truncate max-w-[200px]">{evidence.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{evidence.tag}</TableCell>
                  <TableCell>
                    <Badge variant="outline" size="sm" className="bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30">
                      {evidence.visibility}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" size="sm" className="bg-[#f97316]/10 text-[#f97316] border-[#f97316]/30">
                      {evidence.approval}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm">
                        <Pencil style={{ width: 14, height: 14 }} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Folder style={{ width: 14, height: 14 }} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Download style={{ width: 14, height: 14 }} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Trash style={{ width: 14, height: 14 }} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end gap-4 p-3 border-t border-[var(--border)]">
            <span className="text-[12px] text-[var(--muted-foreground)]">Rows per page: 25</span>
            <span className="text-[12px] text-[var(--muted-foreground)]">1–6 of 6</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
