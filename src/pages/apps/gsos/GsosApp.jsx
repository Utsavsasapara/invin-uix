import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'invin-uix/ui/button';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Topbar } from 'invin-uix/ui/topbar';
import { Menu } from 'invin-uix/ui/menu';
import { Avatar, AvatarFallback } from 'invin-uix/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from 'invin-uix/ui/dropdown-menu';
import {
  House,
  ClipboardText,
  Folder,
  Plugs,
  Warning,
  Storefront,
  CalendarBlank,
  ShieldCheck,
  Target,
  Notebook,
  Headset,
  Scroll,
  Question,
  Sun,
  Moon,
  Bell,
  Gear,
  MagnifyingGlass,
  CaretDown,
  SignOut,
  User,
  ArrowUpRight,
  DownloadSimple,
} from 'invin-uix/ui/icons';
import { useTheme } from '../../../useTheme.jsx';

// Import page components
import GsosDashboard from './GsosDashboard.jsx';
import GsosEvidence from './GsosEvidence.jsx';
import GsosFrameworks from './GsosFrameworks.jsx';
import GsosFrameworkInsights from './GsosFrameworkInsights.jsx';

// ─── GSOS Logo (inline SVG for demo) ─────────────────────────────────────────

const GsosLogo = ({ collapsed }) => (
  <div className="flex items-center gap-2">
    <div 
      className="flex items-center justify-center rounded-md"
      style={{ 
        width: 28, 
        height: 28, 
        background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #000) 100%)'
      }}
    >
      <ShieldCheck style={{ width: 16, height: 16, color: 'white' }} weight="bold" />
    </div>
    {!collapsed && (
      <div className="flex flex-col">
        <span className="text-[14px] font-bold text-[var(--foreground)] leading-none">GSOS</span>
        <span className="text-[9px] text-[var(--accent)] leading-none mt-0.5">GRC Platform</span>
      </div>
    )}
  </div>
);

// ─── Sidebar Navigation Items ────────────────────────────────────────────────

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;

const sidebarItems = [
  { 
    key: 'overview', 
    type: 'group', 
    label: 'Overview',
    children: [
      { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
      { key: 'my-tasks', label: 'My Tasks', icon: icon(ClipboardText) },
    ],
  },
  {
    key: 'governance',
    type: 'group',
    label: 'Governance',
    children: [
      { 
        key: 'compliance', 
        label: 'Compliance', 
        icon: icon(ShieldCheck),
        children: [
          { key: 'frameworks', label: 'Frameworks' },
          { key: 'controls', label: 'Controls' },
          { key: 'tests', label: 'Tests' },
          { key: 'documents', label: 'Documents' },
          { key: 'audits', label: 'Audits' },
        ],
      },
      { key: 'evidence', label: 'Evidence Library', icon: icon(Folder) },
      { key: 'integrations', label: 'Integrations', icon: icon(Plugs) },
      { 
        key: 'risks', 
        label: 'Risks', 
        icon: icon(Warning),
        children: [
          { key: 'risk-register', label: 'Risk Register' },
          { key: 'risk-assessment', label: 'Risk Assessment' },
        ],
      },
      { key: 'vendors', label: 'Vendors', icon: icon(Storefront) },
      { key: 'mrm', label: 'MRM', icon: icon(CalendarBlank) },
    ],
  },
  {
    key: 'awareness',
    type: 'group',
    label: 'Awareness & Readiness',
    children: [
      { key: 'security-awareness', label: 'Security Awareness', icon: icon(Target) },
      { key: 'tabletop', label: 'TableTop Simulation', icon: icon(Notebook) },
    ],
  },
  {
    key: 'program',
    type: 'group',
    label: 'Program Management',
    children: [
      { key: 'projects', label: 'Projects', icon: icon(ClipboardText) },
    ],
  },
  {
    key: 'support',
    type: 'group',
    label: 'Support',
    children: [
      { key: 'audit-trail', label: 'Audit Trail', icon: icon(Scroll) },
      { key: 'help', label: 'Help', icon: icon(Question) },
    ],
  },
];

// ─── Main GSOS App Component ─────────────────────────────────────────────────

export default function GsosApp() {
  const { dark, toggleDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation
  const handleNavClick = ({ key }) => {
    setActiveNav(key);
    switch (key) {
      case 'dashboard':
        navigate('/apps/gsos-demo');
        break;
      case 'evidence':
        navigate('/apps/gsos-demo/evidence');
        break;
      case 'frameworks':
        navigate('/apps/gsos-demo/frameworks');
        break;
      default:
        // Other routes not yet implemented
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Sidebar ──────────────────────────────────────────── */}
      <Sidebar
        logo={<GsosLogo collapsed={false} />}
        logoCollapsed={<GsosLogo collapsed={true} />}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        footer={
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <Avatar size="sm">
              <AvatarFallback className="bg-[var(--accent)] text-white text-[10px] font-[600]">
                US
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-[var(--foreground)] text-[12px] font-[500] truncate">
                  Nexora Gover...
                </p>
                <p className="text-[10px] text-[var(--muted-foreground)] truncate">
                  Admin
                </p>
              </div>
            )}
            {!collapsed && (
              <Tooltip title="Back to demo">
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
          defaultOpenKeys={collapsed ? [] : ['overview', 'governance', 'compliance']}
          onClick={handleNavClick}
          items={sidebarItems}
        />
      </Sidebar>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main
        className="transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        {/* Topbar */}
        <Topbar
          right={
            <div className="flex items-center gap-2">
              <Tooltip title="Search">
                <Button variant="ghost" size="icon">
                  <MagnifyingGlass style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Downloads">
                <Button variant="ghost" size="icon">
                  <DownloadSimple style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Notifications">
                <Button variant="ghost" size="icon">
                  <Bell style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title="Settings">
                <Button variant="ghost" size="icon">
                  <Gear style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
              <Tooltip title={dark ? 'Light mode' : 'Dark mode'}>
                <Button variant="ghost" size="icon" onClick={() => toggleDark(!dark)}>
                  {dark ? <Sun style={{ width: 16, height: 16 }} /> : <Moon style={{ width: 16, height: 16 }} />}
                </Button>
              </Tooltip>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar size="xs">
                      <AvatarFallback className="bg-[var(--accent)] text-white text-[9px] font-[600]">
                        US
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[12px] font-[500]">Nexora Gover...</span>
                    <CaretDown style={{ width: 12, height: 12 }} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ minWidth: '180px' }}>
                  <DropdownMenuItem icon={<User style={{ width: 14, height: 14 }} />}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem icon={<Gear style={{ width: 14, height: 14 }} />}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    icon={<SignOut style={{ width: 14, height: 14 }} />}
                    onClick={() => navigate('/')}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }
        />

        {/* Page Content */}
        <Routes>
          <Route index element={<GsosDashboard />} />
          <Route path="evidence" element={<GsosEvidence />} />
          <Route path="frameworks" element={<GsosFrameworks />} />
          <Route path="frameworks/:id" element={<GsosFrameworkInsights />} />
        </Routes>
      </main>
    </div>
  );
}
