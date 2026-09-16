import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import SoarWorkflows from './SoarWorkflows.jsx';
import SoarWorkflowBuilder from './SoarWorkflowBuilder.jsx';
import SoarIntegrations from './SoarIntegrations.jsx';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from 'invin-uix/ui/card';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Topbar } from 'invin-uix/ui/topbar';
import { Menu } from 'invin-uix/ui/menu';
import { KpiCard } from 'invin-uix/ui/kpi-card';
import { Avatar, AvatarFallback } from 'invin-uix/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from 'invin-uix/ui/table';
import { LineChart, RadarChart as InvinRadarChart } from 'invin-uix/ui/chart';
import { Tour, TourFAB } from 'invin-uix/ui/tour';
import {
  SquaresFour, FlowArrow, Plug, StackSimple, Storefront, Code,
  Users, UserGear, Tag, Key, FileText, ShieldCheck,
  Lock, Scroll, Gear as SettingsIcon, Cpu,
  ChatCircle, BookOpen, Sun, Moon,
  Sparkle, ArrowUpRight,
  CalendarBlank, Question, CaretDown, SignOut,
} from 'invin-uix/ui/icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from 'invin-uix/ui/dropdown-menu';
import { useTheme } from '../../useTheme.jsx';

// Import SOAR logos
import logoFull from '../../assets/main-logo-soar.svg';
import logoSmall from '../../assets/small-logo-soar.svg';

// ─── Sidebar Nav Items (matching SOAR screenshot) ────────────────────────────

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;
const iconKPI = (Icon) => <Icon style={{ width: 14, height: 14 }} />;

const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard', icon: icon(SquaresFour) },
  {
    key: 'automate', type: 'group', label: 'Automate',
    children: [
      { key: 'workflows', label: 'Workflows', icon: icon(FlowArrow), children: [
        { key: 'my-workflows', label: 'My Workflows' },
        { key: 'execution-history', label: 'Execution History' },
        { key: 'workflow-builder', label: 'FlowArrow Builder' },
      ]},
      { key: 'integrations', label: 'Integrations', icon: icon(Plug), children: [
        { key: 'connected', label: 'Connected' },
        { key: 'mcp-servers', label: 'MCP Servers' },
      ]},
      { key: 'types', label: 'Types', icon: icon(StackSimple) },
      { key: 'marketplace', label: 'Marketplace', icon: icon(Storefront) },
      { key: 'blueprints', label: 'Blueprints', icon: icon(Code) },
      { key: 'api-explorer', label: 'API Explorer', icon: icon(Scroll) },
    ],
  },
  {
    key: 'access-control', type: 'group', label: 'Access Control',
    children: [
      { key: 'users', label: 'Users Management', icon: icon(Users) },
      { key: 'roles', label: 'Roles', icon: icon(UserGear) },
      { key: 'groups', label: 'Groups', icon: icon(Users) },
      { key: 'tags', label: 'Tags', icon: icon(Tag) },
      { key: 'api-keys', label: 'API Keys', icon: icon(Key) },
      { key: 'audit-logs', label: 'Audit Logs', icon: icon(FileText) },
    ],
  },
  {
    key: 'api-executor', type: 'group', label: 'API Executor',
    children: [
      { key: 'executor-keys', label: 'Executor Keys', icon: icon(Key) },
      { key: 'credentials', label: 'Credentials', icon: icon(Lock) },
      { key: 'executor-permissions', label: 'Executor Permissions', icon: icon(ShieldCheck) },
      { key: 'api-configurations', label: 'API Configurations', icon: icon(Cpu) },
      { key: 'executor-audit', label: 'Executor Audit Logs', icon: icon(Scroll) },
    ],
  },
  {
    key: 'intelligence', type: 'group', label: 'Intelligence',
    children: [
      { key: 'ai-chat', label: 'AI Chat', icon: icon(ChatCircle) },
    ],
  },
  {
    key: 'resources', type: 'group', label: 'Resources',
    children: [
      { key: 'documentation', label: 'Documentation', icon: icon(BookOpen) },
    ],
  },
];

// ─── Mock Data ───────────────────────────────────────────────────────────────



const executionData = [
  { day: 'Jul 1', failed: 0, succeeded: 0 },
  { day: 'Jul 2', failed: 0.3, succeeded: 0.5 },
  { day: 'Jul 3', failed: 0, succeeded: 1.5 },
  { day: 'Jul 4', failed: 0.5, succeeded: 2.5 },
  { day: 'Jul 5', failed: 0, succeeded: 1.8 },
  { day: 'Jul 6', failed: 1.5, succeeded: 0.5 },
  { day: 'Jul 7', failed: 0, succeeded: 1.5 },
];

const radarWorkflows = [
  { workflow: 'Office 365 User Create', executions: 90 },
  { workflow: 'AR: Allow Force Push', executions: 60 },
  { workflow: 'GITLAB: Webhooks', executions: 75 },
  { workflow: 'Slack Alert', executions: 50 },
  { workflow: 'PagerDuty Notify', executions: 40 },
];

const integrations = [
  { name: 'Gitlab', status: 'Healthy', avail24h: '–', avail7d: '–', uptime: '100%', avgResponse: '3796 ms' },
  { name: 'Github', status: 'Healthy', avail24h: '–', avail7d: '–', uptime: '100%', avgResponse: '12 ms' },
  { name: 'Azure', status: 'Healthy', avail24h: '–', avail7d: '–', uptime: '100%', avgResponse: '8 ms' },
];

// ─── Charts use the new Recharts-based components from invin-uix/ui/chart ───

// ─── Dashboard Content (rendered at /apps/soar-dashboard) ────────────────────

function DashboardContent({ kpis, chartRange, setChartRange }) {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[var(--foreground)] font-[700] tracking-[-0.02em]">Dashboard</h1>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)] mt-1">
          Overview of your organization activity and key metrics
        </p>
      </div>

      {/* ─── KPI Cards ────────────────────────────────────── */}
      <div id="kpi-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            icon={kpi.icon}
            onClick={kpi.onClick}
            selected={kpi.selected}
          >
            <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{kpi.subtitle}</p>
          </KpiCard>
        ))}
      </div>

      {/* ─── Charts Row ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Execution Trends */}
        <Card id="execution-chart" className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkle style={{ width: 16, height: 16, color: 'var(--accent)' }} />
                <div>
                  <CardTitle className="text-body">Execution Trends</CardTitle>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">FlowArrow runs, success vs failure</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {['24H', '7D', '15D', '30D', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setChartRange(range)}
                    className={`px-2.5 py-1 rounded text-[11px] font-[500] cursor-pointer transition-colors ${
                      chartRange === range
                        ? 'bg-[var(--accent)] text-white'
                        : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              data={executionData}
              xKey="day"
              lines={[
                { key: 'failed', name: 'Failed', color: 'var(--error)' },
                { key: 'succeeded', name: 'Succeeded', color: 'var(--ok)' },
              ]}
              height={220}
            />
          </CardContent>
        </Card>

        {/* Most Executed Workflows (Radar) */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkle style={{ width: 16, height: 16, color: 'var(--accent)' }} />
              <CardTitle className="text-body">Most Executed Workflows</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <InvinRadarChart
              data={radarWorkflows}
              dataKey="workflow"
              categories={['executions']}
              height={220}
            />
          </CardContent>
        </Card>
      </div>

      {/* ─── Integration Health ───────────────────────────── */}
      <Card id="integration-table">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkle style={{ width: 16, height: 16, color: 'var(--accent)' }} />
            <CardTitle className="text-body">Integration Health</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Integration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Avail. (24h)</TableHead>
                <TableHead>Availability (7D)</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Avg Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" size="sm" className="text-ok bg-ok-bg font-[600]">{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{row.avail24h}</TableCell>
                  <TableCell className="text-[var(--muted-foreground)]">{row.avail7d}</TableCell>
                  <TableCell>{row.uptime}</TableCell>
                  <TableCell>{row.avgResponse}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── SOAR App ────────────────────────────────────────────────────────────────

export default function SoarApp() {
  const { dark, toggleDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [chartRange, setChartRange] = useState('30D');
  const [selectedKpi, setSelectedKpi] = useState('');
  const [showTour, setShowTour] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const tourSteps = [
    {
      target: '#kpi-section',
      title: 'Your automation posture in four numbers',
      description: 'The dashboard opens with live counts — 11 workflows, 5 executions in 30 days, 18 active integrations, 4 users. Click any card to jump to that area.',
      section: 'DASHBOARD',
      page: '/apps/soar-dashboard',
    },
    {
      target: '#execution-chart',
      title: 'Execution Trends — success vs failure',
      description: 'Green is Succeeded, red is Failed. Click a range chip — 24H, 7D, 15D, 30D, 1Y — to recompute the chart for that window. A rising red line here is your first hint that a playbook or credential broke.',
      section: 'DASHBOARD',
      placement: 'right',
      page: '/apps/soar-dashboard',
    },
    {
      target: '#integration-table',
      title: 'Integration Health — catch broken connectors early',
      description: 'Every connected service is probed continuously. Gitlab, Github and Azure are all Healthy at 100% uptime. If a row turns red, workflows that depend on it will start failing — fix it here first.',
      section: 'DASHBOARD',
      placement: 'top',
      page: '/apps/soar-dashboard',
    },
    {
      target: '#workflow-stats',
      title: 'FlowArrow Summary — quick health check',
      description: 'See how many workflows are Active, Paused, and total runs in the last 30 days. This gives you an instant overview of your automation health.',
      section: 'WORKFLOWS',
      page: '/apps/soar-dashboard/workflows',
    },
    {
      target: '#workflow-table',
      title: 'All Workflows — manage your automation',
      description: 'Every workflow is listed with its type, status, run count, and last execution time. Click any row to edit, or use the + New FlowArrow button to create one.',
      section: 'WORKFLOWS',
      placement: 'top',
      page: '/apps/soar-dashboard/workflows',
    },
  ];


  const kpis = [
    { label: 'WORKFLOWS', value: '11', subtitle: 'Across the organization', icon: iconKPI(FlowArrow) },
    { label: 'EXECUTIONS (30D)', value: '5', subtitle: 'Manual + triggered runs', icon: iconKPI(Sparkle) },
    { label: 'INTEGRATIONS', value: '18', subtitle: 'All currently active', icon: iconKPI(Plug) },
    { label: 'USERS', value: '4', subtitle: '3 admins · 1 viewer', icon: iconKPI(Users), onClick: () => { setSelectedKpi(selectedKpi === 'users' ? '' : 'users') }, selected: selectedKpi === 'users' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Sidebar ──────────────────────────────────────────── */}
      <Sidebar
        logo={<img src={logoFull} alt="SOAR" style={{ height: 24 }} />}
        logoCollapsed={<img src={logoSmall} alt="SOAR" style={{ height: 24 }} />}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        footer={
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <Avatar size="sm">
              <AvatarFallback className="bg-[var(--accent)] text-white text-[10px] font-[600]">OA</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-[var(--muted-foreground)] font-[500] truncate">Org Administrator</p>
                <p className="text-[10px] text-[var(--muted-foreground-faint)] truncate">Admin</p>
              </div>
            )}
            {!collapsed && (
              <Tooltip title="Log out">
                <Button variant="ghost" size="icon-sm" onClick={() => navigate('/')}>
                  <ArrowUpRight style={{ width: 14, height: 14 }} />
                </Button>
              </Tooltip>
            )}
          </div>
        }
      >
        <Menu
          mode="sidebar"
          collapsed={collapsed}
          collapsedTooltip
          selectedKeys={[activeNav]}
          defaultOpenKeys={collapsed ? [] : ['automate', 'access-control', 'api-executor', 'intelligence', 'resources', 'workflows', 'integrations']}
          onClick={({ key }) => {
            setActiveNav(key);
            if (key === 'dashboard') navigate('/apps/soar-dashboard');
            else if (key === 'workflows' || key === 'my-workflows') navigate('/apps/soar-dashboard/workflows');
            else if (key === 'execution-history') navigate('/apps/soar-dashboard/workflows');
            else if (key === 'workflow-builder') navigate('/apps/soar-dashboard/workflow-builder');
            else if (key === 'integrations' || key === 'connected' || key === 'mcp-servers') navigate('/apps/soar-dashboard/integrations');
          }}
          items={sidebarItems}
        />
      </Sidebar>

      {/* ─── Main ─────────────────────────────────────────────── */}
      <main
        className="transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        {/* Topbar */}
        <Topbar
          right={
            <div className="flex items-center gap-3">
              <Tooltip title="Gear">
                <Button variant="ghost" size="icon">
                  <SettingsIcon style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Calendar">
                <Button variant="ghost" size="icon">
                  <CalendarBlank style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Help">
                <Button variant="ghost" size="icon">
                  <Question style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <Button variant="ghost" size="icon" onClick={() => toggleDark(!dark)}>
                  {dark ? <Sun style={{ width: 16, height: 16 }} /> : <Moon style={{ width: 16, height: 16 }} />}
                </Button>
              </Tooltip>
              <Tooltip title="Apps">
                <Button variant="ghost" size="icon">
                  <SquaresFour style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="" variant="outline">
                    <Sparkle style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
                    <span className="text-[12px] font-[500]">Org Administrator</span>
                    <CaretDown style={{ width: 12, height: 12, color: 'var(--muted-foreground)' }} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ minWidth: '200px' }}>
                  <DropdownMenuItem>
                    <Users style={{ width: 14, height: 14 }} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon style={{ width: 14, height: 14 }} /> Organization Gear
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <SignOut style={{ width: 14, height: 14 }} /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />

        {/* Content */}
        <Routes>
          <Route index element={
            <DashboardContent
              kpis={kpis}
              chartRange={chartRange}
              setChartRange={setChartRange}
            />
          } />
          <Route path="workflows" element={<SoarWorkflows />} />
          <Route path="workflow-builder" element={<SoarWorkflowBuilder />} />
          <Route path="integrations" element={<SoarIntegrations />} />
        </Routes>

        {/* Tour */}
        <Tour
          steps={tourSteps}
          open={showTour}
          onClose={() => setShowTour(false)}
          currentPage={location.pathname}
          onNavigate={(path) => navigate(path)}
        />
        <TourFAB onClick={() => setShowTour(true)} />
      </main>
    </div>
  );
}
