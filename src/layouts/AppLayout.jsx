import { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { Separator } from 'invin-uix/ui/separator';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Topbar } from 'invin-uix/ui/topbar';
import { Menu } from 'invin-uix/ui/menu';
import { LIB_CONFIG } from 'invin-uix/lib-config';
import {
  Sun, Moon, House, BookOpen, Package, ArrowSquareOut,
} from 'invin-uix/ui/icons';
import { useTheme } from '../useTheme.jsx';
import { AppSwitcher } from '../components/AppSwitcher.jsx';

// Import logos
import logoFullDarkMode from '../assets/main-logo-invinsense-for-darkMode.svg';
import logoFullLightMode from '../assets/main-logo-invinsense-for-lightMode.svg';
import logoSmall from '../assets/small-logo-invinsense.svg';

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;

// ─── Sidebar nav ─────────────────────────────────────────────────────────────
// Components (/components) is its own full layout — we open it as a normal link
// so the browser navigates and swaps to DemoLayout. Mark it with ArrowSquareOut
// to signal "leaves this shell".

const sidebarItems = [
  {
    key: 'nav',
    type: 'group',
    label: 'Navigation',
    children: [
      { key: '/',          label: 'Home',        icon: icon(House) },
      { key: '/ui-guide',  label: 'UI Guide',    icon: icon(BookOpen) },
      { key: '/components', label: 'Components', icon: icon(Package) },
    ],
  },
];

// ─── Page title map ───────────────────────────────────────────────────────────
const PAGE_TITLE = {
  '/':          'Home',
  '/ui-guide':  'UI Guide',
};

export default function AppLayout() {
  const { dark, toggleDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = location.pathname === '/' ? '/' : location.pathname;
  const pageTitle = PAGE_TITLE[activeKey] ?? 'invin-uix';

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <Sidebar
        logo={<img src={dark ? logoFullDarkMode : logoFullLightMode} alt="Invinsense" style={{ height: 26 }} />}
        logoCollapsed={<img src={logoSmall} alt="Invinsense" style={{ height: 28, width: 22 }} />}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        footer={
          !collapsed ? (
            <div className="space-y-1">
              <Separator />
              <p className="text-caption text-[var(--muted-foreground-faint)] px-2 pt-1">
                {LIB_CONFIG.name} <Badge variant="outline" size="sm">v{LIB_CONFIG.version}</Badge>
              </p>
            </div>
          ) : null
        }
      >
        <Menu
          mode="sidebar"
          collapsed={collapsed}
          collapsedTooltip
          selectedKeys={[activeKey]}
          defaultOpenKeys={collapsed ? [] : ['nav']}
          onClick={({ key }) => navigate(key)}
          items={sidebarItems}
        />
      </Sidebar>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main
        className="transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        <Topbar
          left={
            <div className="flex items-center gap-2">
              <h1 className="text-page-title font-semibold text-[var(--foreground)] tracking-[-0.01em]">
                {pageTitle}
              </h1>
            </div>
          }
          right={
            <div className="flex items-center gap-1">
              <AppSwitcher />
              <Tooltip title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <Button variant="ghost" size="icon-sm" onClick={() => toggleDark(!dark)}>
                  {dark
                    ? <Sun  style={{ width: 16, height: 16 }} />
                    : <Moon style={{ width: 16, height: 16 }} />}
                </Button>
              </Tooltip>
            </div>
          }
        />

        <div className="px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
