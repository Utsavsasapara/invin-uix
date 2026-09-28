import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';
import { PieChart } from 'invin-uix/ui/chart';
import { Separator } from 'invin-uix/ui/separator';
import { Progress } from 'invin-uix/ui/progress';
import { 
  Warning, 
  CheckCircle, 
  Clock, 
  FileText,
  ArrowRight,
  Info,
  Clipboard,
  ShieldCheck,
  Users,
  ChartBar,
  GraduationCap,
  ListChecks,
} from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const riskData = {
  bySeverity: [
    { label: 'Critical', value: 0, color: 'var(--error)' },
    { label: 'High', value: 0, color: '#f97316' },
    { label: 'Medium', value: 2, color: '#eab308' },
    { label: 'Low', value: 10, color: 'var(--ok)' },
  ],
  bySource: {
    External: { C: 0, H: 0, M: 1, L: 2 },
    People: { C: 0, H: 0, M: 0, L: 3 },
    System: { C: 0, H: 0, M: 1, L: 5 },
  },
};

const projectsData = {
  total: 1,
  pending: 0,
  inProgress: 1,
  done: 0,
  projects: [
    { id: 'BA', name: 'Project Onboarding', dates: 'Sep 02, 2026 - Sep 30, 2026', tasks: '1 tasks', color: '#8b5cf6' },
    { id: 'NG&RA', name: 'Operation Assets', dates: 'Aug 23, 2026 - Aug 31, 2026', tasks: '1 tasks', color: '#22c55e' },
    { id: 'JA', name: 'Clone - Employee Management System test', dates: 'Aug 26, 2026 - Aug 28, 2026', tasks: '5 tasks', color: '#eab308' },
  ],
};

const grcOverview = {
  policyStatus: { value: 9, label: 'Documents', title: 'Policy Governance Status', description: 'Seamless policy journey: From Creation to Approval', detail: 'Draft: 2 · Under Review: 3 · Pending Approval: 1' },
  riskMitigation: { value: 7.3, label: 'days', title: 'Risk Mitigation Time', description: 'Weighted across severities', detail: 'Critical: 0 · High: 0 · Medium: 2 · Low: 10' },
  complianceScore: { value: 5.8, label: '%', title: 'Compliance Score', description: 'Average of all frameworks', detail: 'Frameworks: 13 · Passed: 126 · Pending: 1829 · Total: 1955' },
};

const frameworkAlignment = [
  { name: 'ISO 27001:2022', compliance: 0 },
  { name: 'ISO 27701', compliance: 0 },
];

const vendorRisk = {
  total: 8,
  data: [
    { name: 'Critical Vendor', value: 1, color: 'var(--error)' },
    { name: 'Normal Vendor', value: 6, color: 'var(--ok)' },
    { name: 'Pending Assessment', value: 0, color: '#eab308' },
    { name: 'Overdue Assessment', value: 1, color: '#f97316' },
  ],
};

const continuousMonitoring = {
  passRate: 0.2,
  totalChecks: 1560,
  passed: 3,
  failed: 3,
  evidenceLibrary: 14,
  linked: 2,
  unlinked: 12,
};

const trainingData = {
  training: { completed: 5, inProgress: 4, notStarted: 213, overdue: 214 },
  assessment: { completed: 0, pending: 1, overdue: 1 },
};

const auditReadiness = {
  compliancePercent: 3,
  compliantControls: { current: 10, total: 350 },
  nonCompliant: { current: 0, total: 350 },
  pendingReview: { current: 0, total: 350 },
  evidenceFreshness: { fresh: 8, stale: 0, d30: 6, d60: 0, d90: 0 },
};

const complianceInsights = [
  '13 frameworks are under compliance monitoring.',
  'Focus on high-priority controls with missing evidence.',
  'Validated evidence improves overall compliance alignment.',
];

const vendorInsights = [
  '1 assessments have exceeded their due date.',
  'Prioritize critical vendors with outstanding assessments.',
  'Timely assessments strengthen third-party risk management.',
];

// ─── Risk KPI Card Component ─────────────────────────────────────────────────

function RiskKpiCard({ label, value, color }) {
  return (
    <div 
      className="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 bg-[var(--secondary)] hover:bg-[var(--muted)] flex-1"
    >
      <span className="text-[24px] font-bold" style={{ color }}>{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-[var(--muted-foreground)]">{label}</span>
    </div>
  );
}

// ─── GRC Stat Card Component ─────────────────────────────────────────────────

function GrcStatCard({ title, value, label, description, detail }) {
  return (
    <div className="flex items-start justify-between p-4 border-b border-[var(--border)] last:border-b-0 cursor-pointer hover:bg-[var(--secondary)]/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide font-medium">
          {title}
          <Info style={{ width: 12, height: 12 }} />
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] mt-1">{description}</p>
        <p className="text-[10px] text-[var(--muted-foreground)]/70 mt-0.5">{detail}</p>
      </div>
      <div className="text-right shrink-0 ml-4">
        <span className="text-[28px] font-bold text-[var(--accent)]">{value}</span>
        <span className="text-[12px] text-[var(--muted-foreground)] ml-1">{label}</span>
      </div>
    </div>
  );
}

// ─── Circular Progress Ring ──────────────────────────────────────────────────

function CircularProgress({ value, size = 80, strokeWidth = 3, children }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ─── Stat Item Component ─────────────────────────────────────────────────────

function StatItem({ label, value, color, onClick }) {
  return (
    <div 
      className="flex items-center justify-between text-[12px] py-1 px-2 rounded hover:bg-[var(--secondary)] cursor-pointer transition-colors"
      onClick={onClick}
    >
      <span className="flex items-center gap-2 text-[var(--muted-foreground)]">
        {color && <span className="w-2 h-2 rounded" style={{ backgroundColor: color }}></span>}
        {label}
      </span>
      <span className="font-medium" style={color ? { color } : {}}>{value}</span>
    </div>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────────────────

export default function GsosDashboard() {
  const [riskGroupBy, setRiskGroupBy] = useState('risk-source');

  // Donut chart data for Projects
  const projectsChartData = [
    { name: 'Pending', value: projectsData.pending || 0.01, fill: '#eab308' },
    { name: 'In Progress', value: projectsData.inProgress, fill: 'var(--accent)' },
    { name: 'Done', value: projectsData.done || 0.01, fill: 'var(--ok)' },
  ];

  // Donut chart data for Vendor Risk
  const vendorChartData = vendorRisk.data.map(item => ({
    name: item.name,
    value: item.value || 0.01,
    fill: item.color,
  }));

  // Donut chart data for CCM Pass Rate
  const ccmChartData = [
    { name: 'Passed', value: continuousMonitoring.passed, fill: 'var(--ok)' },
    { name: 'Failed', value: continuousMonitoring.failed, fill: 'var(--error)' },
    { name: 'Pending', value: continuousMonitoring.totalChecks - continuousMonitoring.passed - continuousMonitoring.failed, fill: 'var(--border)' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] text-[var(--muted-foreground)]">
            <span className="text-[var(--accent)]">🏠 Home</span> › Unified Monitoring & Compliance Platform
          </p>
          <h1 className="text-[24px] font-bold text-[var(--foreground)] mt-1">
            Unified Monitoring & Compliance Platform
          </h1>
        </div>
      </div>

      {/* ─── Tab Navigation ───────────────────────────────────── */}
      <div className="flex items-center gap-4 border-b border-[var(--border)]">
        <button className="pb-2 px-1 text-[var(--accent)] border-b-2 border-[var(--accent)] font-medium text-[14px] flex items-center gap-2">
          <CheckCircle style={{ width: 14, height: 14 }} />
          Compliance
        </button>
      </div>

      {/* ─── Row 1: Risks + My Tasks ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risks Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px]">Risks</CardTitle>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                  Risk distribution by severity and category
                </p>
              </div>
              <Select value={riskGroupBy} onValueChange={setRiskGroupBy}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Group by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="risk-source">Risk Source</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {/* Risk Severity KPIs */}
            <div className="flex gap-2 mb-4">
              {riskData.bySeverity.map((risk) => (
                <RiskKpiCard key={risk.label} label={risk.label} value={risk.value} color={risk.color} />
              ))}
            </div>

            {/* Risk Matrix Table */}
            <div className="mt-4">
              <div className="grid grid-cols-5 gap-1 text-[11px]">
                <div></div>
                <div className="text-center font-medium text-[var(--error)]">C</div>
                <div className="text-center font-medium text-[#f97316]">H</div>
                <div className="text-center font-medium text-[#eab308]">M</div>
                <div className="text-center font-medium text-[var(--ok)]">L</div>
                
                {Object.entries(riskData.bySource).map(([source, values]) => (
                  <>
                    <div key={`label-${source}`} className="text-[var(--muted-foreground)] py-2">{source}</div>
                    <div key={`c-${source}`} className="text-center py-2 rounded cursor-pointer hover:opacity-80" style={{ backgroundColor: 'color-mix(in srgb, var(--error) 20%, transparent)', color: 'var(--error)' }}>{values.C}</div>
                    <div key={`h-${source}`} className="text-center py-2 rounded cursor-pointer hover:opacity-80" style={{ backgroundColor: 'color-mix(in srgb, #f97316 20%, transparent)', color: '#f97316' }}>{values.H}</div>
                    <div key={`m-${source}`} className="text-center py-2 rounded cursor-pointer hover:opacity-80" style={{ backgroundColor: 'color-mix(in srgb, #eab308 20%, transparent)', color: '#eab308' }}>{values.M}</div>
                    <div key={`l-${source}`} className="text-center py-2 rounded cursor-pointer hover:opacity-80" style={{ backgroundColor: 'color-mix(in srgb, var(--ok) 20%, transparent)', color: 'var(--ok)' }}>{values.L}</div>
                  </>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-[10px] text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--error)]"></span> Critical</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f97316]"></span> High</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#eab308]"></span> Medium</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--ok)]"></span> Low</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Tasks Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px]">My Tasks</CardTitle>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                  Tasks assigned to you across all modules
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clipboard style={{ width: 48, height: 48, color: 'var(--muted-foreground)', opacity: 0.3 }} />
              <p className="text-[14px] text-[var(--muted-foreground)] mt-4">All caught up!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Row 2: Projects + GRC Overview ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Card */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Projects</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Tracks project progress across latest projects
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              {/* Donut Chart */}
              <div className="relative shrink-0">
                <PieChart
                  data={projectsChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={65}
                  height={140}
                  width={140}
                  showLegend={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[12px] font-medium">0%</span>
                  <span className="text-[9px] text-[var(--muted-foreground)]">Completed</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-1 pt-2">
                <StatItem label="Total" value={projectsData.total} color="var(--muted-foreground)" />
                <StatItem label="Pending" value={projectsData.pending} color="#eab308" />
                <StatItem label="In Progress" value={projectsData.inProgress} color="var(--accent)" />
                <StatItem label="Done" value={projectsData.done} color="var(--ok)" />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Project List */}
            <div className="space-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[var(--muted-foreground)]">Projects</span>
                <Button variant="link" size="sm" className="text-[var(--accent)] h-auto p-0 text-[11px]">
                  All Projects
                </Button>
              </div>
              {projectsData.projects.map((project) => (
                <div key={project.id} className="flex items-center gap-3 py-2 px-2 rounded hover:bg-[var(--secondary)] cursor-pointer transition-colors">
                  <div 
                    className="w-9 h-9 rounded flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium truncate">{project.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">📅 {project.dates}</p>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{project.tasks}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GRC Overview Card */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">GRC Overview</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Policy governance, risk mitigation, and compliance at a glance
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <GrcStatCard {...grcOverview.policyStatus} />
            <GrcStatCard {...grcOverview.riskMitigation} />
            <GrcStatCard {...grcOverview.complianceScore} />
          </CardContent>
        </Card>
      </div>

      {/* ─── Row 3: Framework Alignment + Vendor Risk ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Framework Alignment */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Framework Alignment</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                % compliance achieved across framework controls
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8 py-4">
              {frameworkAlignment.map((fw) => (
                <div key={fw.name} className="text-center cursor-pointer">
                  <CircularProgress value={fw.compliance} size={72} strokeWidth={4}>
                    <span className="text-[14px] font-bold text-[var(--accent)]">{fw.compliance}%</span>
                  </CircularProgress>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-2">{fw.name}</p>
                </div>
              ))}
            </div>

            <Button variant="link" className="w-full text-[var(--accent)] mt-2 text-[12px]">
              View More <ArrowRight style={{ width: 14, height: 14, marginLeft: 4 }} />
            </Button>

            {/* Compliance Insights */}
            <div className="mt-4 p-3 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20">
              <p className="text-[11px] font-medium text-[var(--accent)] mb-2">Compliance Insights</p>
              <ul className="space-y-1">
                {complianceInsights.map((insight, i) => (
                  <li key={i} className="text-[11px] text-[var(--muted-foreground)] flex items-start gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Vendor Risk Overview */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Vendor Risk Overview</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Vendor classification by risk level and assessment progress
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              {/* Donut Chart */}
              <div className="relative shrink-0">
                <PieChart
                  data={vendorChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={65}
                  height={140}
                  width={140}
                  showLegend={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-bold">{vendorRisk.total}</span>
                  <span className="text-[9px] text-[var(--muted-foreground)]">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-1 pt-2">
                {vendorRisk.data.map((item) => (
                  <StatItem key={item.name} label={item.name} value={item.value} color={item.color} />
                ))}
              </div>
            </div>

            {/* Vendor Insights */}
            <div className="mt-4 p-3 rounded-lg bg-[var(--error)]/10 border border-[var(--error)]/20">
              <p className="text-[11px] font-medium text-[var(--error)] mb-2">Vendor Risk Insights</p>
              <ul className="space-y-1">
                {vendorInsights.map((insight, i) => (
                  <li key={i} className="text-[11px] text-[var(--muted-foreground)] flex items-start gap-2">
                    <span className="text-[var(--error)]">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Row 4: Continuous Control Monitoring + Training ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continuous Control Monitoring */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Continuous Control Monitoring</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Automated check pass rate and evidence coverage
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              {/* Pass Rate Donut */}
              <div className="relative shrink-0">
                <PieChart
                  data={ccmChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={65}
                  height={140}
                  width={140}
                  showLegend={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[14px] font-bold">{continuousMonitoring.passRate}%</span>
                  <span className="text-[9px] text-[var(--muted-foreground)]">Passed</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-1 pt-2">
                <StatItem label="Total Checks" value={continuousMonitoring.totalChecks.toLocaleString()} color="var(--muted-foreground)" />
                <StatItem label="Passed" value={continuousMonitoring.passed} color="var(--ok)" />
                <StatItem label="Failed" value={continuousMonitoring.failed} color="var(--error)" />
              </div>
            </div>

            {/* Evidence Library Card */}
            <div className="mt-4 p-3 rounded-lg border border-[var(--border)] bg-[var(--secondary)]/50 cursor-pointer hover:bg-[var(--secondary)] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--muted-foreground)]">Evidence Library</span>
                <span className="text-[16px] font-bold text-[var(--accent)]">{continuousMonitoring.evidenceLibrary}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-[var(--ok)]"></span>
                  <span className="text-[var(--ok)] font-medium">{continuousMonitoring.linked}</span>
                  <span className="text-[var(--muted-foreground)]">Linked</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-[var(--muted-foreground)]"></span>
                  <span className="font-medium">{continuousMonitoring.unlinked}</span>
                  <span className="text-[var(--muted-foreground)]">Unlinked</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training-Assessment Lifecycle */}
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Training-Assessment Lifecycle</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Training progress and continuous assessment performance across the organization
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Training */}
              <div className="p-3 rounded-lg border border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium flex items-center gap-1">
                    <GraduationCap style={{ width: 14, height: 14, color: 'var(--accent)' }} />
                    Training
                  </span>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-6 text-[10px] w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Trainings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <StatItem label="Completed" value={trainingData.training.completed} color="var(--ok)" />
                  <StatItem label="In Progress" value={trainingData.training.inProgress} color="var(--accent)" />
                  <StatItem label="Not Started" value={trainingData.training.notStarted} color="var(--muted-foreground)" />
                  <StatItem label="Overdue" value={trainingData.training.overdue} color="var(--error)" />
                </div>
              </div>

              {/* Continuous Assessment */}
              <div className="p-3 rounded-lg border border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium flex items-center gap-1">
                    <ListChecks style={{ width: 14, height: 14, color: 'var(--accent)' }} />
                    Continuous Assessment
                  </span>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-6 text-[10px] w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assessments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <StatItem label="Completed" value={trainingData.assessment.completed} color="var(--ok)" />
                  <StatItem label="Pending" value={trainingData.assessment.pending} color="#eab308" />
                  <StatItem label="Overdue" value={trainingData.assessment.overdue} color="var(--error)" />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-[var(--muted-foreground)] mt-3 p-2 bg-[var(--secondary)]/50 rounded">
              <strong>The combined panel is not a sum.</strong> Training shows course completion, while assessment reflects how well users perform in evaluations.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ─── Row 5: Audit Readiness ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div>
              <CardTitle className="text-[14px]">Audit Readiness</CardTitle>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                Control compliance and evidence status for audit preparation
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Compliance Gauge + Control Metrics */}
              <div className="flex gap-6">
                {/* Gauge */}
                <div className="shrink-0">
                  <CircularProgress value={auditReadiness.compliancePercent} size={100} strokeWidth={6}>
                    <span className="text-[18px] font-bold">{auditReadiness.compliancePercent}%</span>
                    <span className="text-[9px] text-[var(--muted-foreground)]">Compliant</span>
                  </CircularProgress>
                </div>

                {/* Control Metrics */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-[var(--ok)]/10 border border-[var(--ok)]/20 cursor-pointer">
                    <span className="text-[11px] text-[var(--muted-foreground)]">Compliant Controls</span>
                    <span className="text-[12px] font-medium text-[var(--ok)]">{auditReadiness.compliantControls.current}/{auditReadiness.compliantControls.total}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-[var(--error)]/10 border border-[var(--error)]/20 cursor-pointer">
                    <span className="text-[11px] text-[var(--muted-foreground)]">Non-Compliant</span>
                    <span className="text-[12px] font-medium text-[var(--error)]">{auditReadiness.nonCompliant.current}/{auditReadiness.nonCompliant.total}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 rounded bg-[#eab308]/10 border border-[#eab308]/20 cursor-pointer">
                    <span className="text-[11px] text-[var(--muted-foreground)]">Pending Review</span>
                    <span className="text-[12px] font-medium text-[#eab308]">{auditReadiness.pendingReview.current}/{auditReadiness.pendingReview.total}</span>
                  </div>
                </div>
              </div>

              {/* Right: Evidence Freshness */}
              <div className="p-4 rounded-lg border border-[var(--border)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium cursor-pointer hover:text-[var(--accent)]">Evidence Freshness</span>
                  <div className="flex items-center gap-4 text-[12px]">
                    <span className="flex items-center gap-1">
                      <span className="text-[var(--ok)] font-bold">{auditReadiness.evidenceFreshness.fresh}</span>
                      <span className="text-[var(--muted-foreground)]">Fresh</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-[var(--error)] font-bold">{auditReadiness.evidenceFreshness.stale}</span>
                      <span className="text-[var(--muted-foreground)]">Stale</span>
                    </span>
                  </div>
                </div>

                {/* Stacked Bar */}
                <div className="h-6 rounded overflow-hidden flex">
                  <div className="bg-[var(--ok)]" style={{ width: `${(auditReadiness.evidenceFreshness.fresh / 14) * 100}%` }}></div>
                  <div className="bg-[#eab308]" style={{ width: `${(auditReadiness.evidenceFreshness.d30 / 14) * 100}%` }}></div>
                  <div className="bg-[#f97316]" style={{ width: `${(auditReadiness.evidenceFreshness.d60 / 14) * 100}%` }}></div>
                  <div className="bg-[var(--error)]" style={{ width: `${(auditReadiness.evidenceFreshness.d90 / 14) * 100}%` }}></div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-3 text-[10px] text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[var(--ok)]"></span> Fresh</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#eab308]"></span> 30d</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#f97316]"></span> 60d</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[var(--error)]"></span> 90d+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
