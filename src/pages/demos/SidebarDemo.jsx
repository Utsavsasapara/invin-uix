import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Menu } from 'invin-uix/ui/menu';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { Switch } from 'invin-uix/ui/switch';
import { Avatar, AvatarFallback } from 'invin-uix/ui/avatar';
import {
  SquaresFour, Users, Gear, FileText, Shield, Pulse,
  Sun, Moon,
} from 'invin-uix/ui/icons';
import { useTheme } from '../../useTheme.jsx';

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;

const demoItems = [
  {
    key: 'main', type: 'group', label: 'Main',
    children: [
      { key: 'dashboard', label: 'Dashboard', icon: icon(SquaresFour) },
      { key: 'users', label: 'Users', icon: icon(Users) },
      { key: 'reports', label: 'Reports', icon: icon(FileText) },
    ],
  },
  {
    key: 'admin', type: 'group', label: 'Administration',
    children: [
      { key: 'security', label: 'Security', icon: icon(Shield) },
      { key: 'activity', label: 'Pulse Log', icon: icon(Pulse) },
      { key: 'settings', label: 'Gear', icon: icon(Gear) },
    ],
  },
];

export default function SidebarDemo() {
  const { dark, toggleDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('dashboard');

  return (
    <ComponentPage
      name="Sidebar"
      description="Fixed navigation sidebar with brand header, collapsible state, grouped menu items, and footer slot. The core layout shell for all Invinsense modules."
      importCode={`import { Sidebar } from 'invin-uix/ui/sidebar';
import { Menu } from 'invin-uix/ui/menu';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Sidebar Playground"
        description="Toggle the sidebar collapsed state."
        controls={[
          { name: 'collapsed', type: 'boolean', label: 'Collapsed', default: false },
        ]}
      >
        {(props) => (
          <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden h-[320px] relative bg-[var(--background)]">
            <div className="absolute inset-0 flex">
              <div className={`shrink-0 transition-[width] duration-200 ${props.collapsed ? 'w-[76px]' : 'w-[220px]'} h-full border-r border-[var(--border)] bg-[var(--card)] flex flex-col`}>
                <div className={`h-[50px] flex items-center border-b border-[var(--border)] ${props.collapsed ? 'justify-center px-3' : 'px-4 gap-2'}`}>
                  {props.collapsed ? (
                    <div className="h-7 w-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-white text-[11px] font-[700]">S</div>
                  ) : (
                    <>
                      <div className="h-6 w-6 rounded-[6px] bg-[var(--accent)] flex items-center justify-center text-white text-[9px] font-[700]">IS</div>
                      <span className="text-label font-[600]">Invinsense</span>
                    </>
                  )}
                </div>
                <div className="flex-1 p-2">
                  <Menu
                    mode="sidebar"
                    collapsed={props.collapsed}
                    collapsedTooltip
                    selectedKeys={['dashboard']}
                    items={[
                      { key: 'dashboard', label: 'Dashboard', icon: icon(SquaresFour) },
                      { key: 'users', label: 'Users', icon: icon(Users) },
                      { key: 'settings', label: 'Settings', icon: icon(Gear) },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center text-label text-[var(--muted-foreground)] bg-[var(--background)]">
                Content area
              </div>
            </div>
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'product', type: 'string', default: '—', description: 'Product name — maps to product icon in collapsed state' },
          { name: 'collapsed', type: 'boolean', default: 'false', description: 'Controlled collapsed state' },
          { name: 'onCollapsedChange', type: '(collapsed: boolean) => void', default: '—', description: 'Collapse toggle callback' },
          { name: 'footer', type: 'ReactNode', default: '—', description: 'Footer area (user profile, settings)' },
          { name: 'brand', type: 'SidebarBrand', default: '—', description: 'Custom logo/branding overrides' },
        ]}
      />

      <Separator />

      {/* ─── Interactive demo ─────────────────────────────────── */}
      <PlaygroundSection
        title="Interactive sidebar"
        description="A contained preview of the Sidebar component. Toggle collapse and click nav items."
        code={`import { useState } from 'react';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Menu } from 'invin-uix/ui/menu';
import { Avatar, AvatarFallback } from 'invin-uix/ui/avatar';
import { SquaresFour, Users, Gear, FileText, Shield, Pulse } from 'invin-uix/ui/icons';

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;

const menuItems = [
  {
    key: 'main', type: 'group', label: 'Main',
    children: [
      { key: 'dashboard', label: 'Dashboard', icon: icon(SquaresFour) },
      { key: 'users', label: 'Users', icon: icon(Users) },
      { key: 'reports', label: 'Reports', icon: icon(FileText) },
    ],
  },
  {
    key: 'admin', type: 'group', label: 'Administration',
    children: [
      { key: 'security', label: 'Security', icon: icon(Shield) },
      { key: 'activity', label: 'Activity Log', icon: icon(Pulse) },
      { key: 'settings', label: 'Settings', icon: icon(Gear) },
    ],
  },
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('dashboard');

  return (
    <Sidebar
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      logo={
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-[6px] bg-[var(--accent)] flex items-center justify-center text-white text-[9px] font-[700]">IS</div>
          <span className="text-label font-[600]">Invinsense</span>
        </div>
      }
      logoCollapsed={
        <div className="h-7 w-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-white text-[11px] font-[700]">S</div>
      }
      footer={
        <div className="flex items-center gap-2">
          <Avatar size="sm"><AvatarFallback>AD</AvatarFallback></Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-[500] truncate">Admin</p>
              <p className="text-[10px] text-[var(--muted-foreground-faint)]">admin@invin.io</p>
            </div>
          )}
        </div>
      }
    >
      <Menu
        mode="sidebar"
        collapsed={collapsed}
        collapsedTooltip
        selectedKeys={[selected]}
        defaultOpenKeys={['main', 'admin']}
        onClick={({ key }) => setSelected(key)}
        items={menuItems}
      />
    </Sidebar>
  );
}`}
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[420px] relative">
          <div className="absolute inset-0 flex">
            {/* Sidebar in a contained box */}
            <div className={`shrink-0 transition-[width] duration-200 ${collapsed ? 'w-[76px]' : 'w-[260px]'} h-full border-r border-[var(--border)] bg-[var(--sidebar)] flex flex-col overflow-hidden`}>
              {/* Header */}
              <div className={`h-[58px] flex items-center border-b border-[var(--border)] shrink-0 ${collapsed ? 'justify-center px-3' : 'px-4 gap-2'}`}>
                {collapsed ? (
                  <div className="h-7 w-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-white text-[11px] font-[700]">S</div>
                ) : (
                  <>
                    <div className="h-6 w-6 rounded-[6px] bg-[var(--accent)] flex items-center justify-center text-white text-[9px] font-[700]">IS</div>
                    <span className="text-label font-[600]">Invinsense</span>
                    <span className="text-[10px] font-[600] uppercase text-[var(--muted-foreground)]">SOAR</span>
                  </>
                )}
              </div>

              {/* Nav */}
              <div className="flex-1 overflow-auto p-2">
                <Menu
                  mode="sidebar"
                  collapsed={collapsed}
                  collapsedTooltip
                  selectedKeys={[selected]}
                  defaultOpenKeys={['main', 'admin']}
                  onClick={({ key }) => setSelected(key)}
                  items={demoItems}
                />
              </div>

              {/* Footer */}
              {!collapsed && (
                <div className="border-t border-[var(--border)] p-3">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm"><AvatarFallback>AD</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-[500] truncate">Admin</p>
                      <p className="text-[10px] text-[var(--muted-foreground-faint)]">admin@invin.io</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
              <div className="h-[58px] border-b border-[var(--border)] flex items-center px-4 justify-between shrink-0">
                <span className="text-label font-[600] capitalize">{selected}</span>
                <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
                  {collapsed ? 'Expand' : 'Collapse'}
                </Button>
              </div>
              <div className="flex-1 p-4 flex items-center justify-center text-label text-[var(--muted-foreground)]">
                Content area — "{selected}" selected
              </div>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Product variants ─────────────────────────────────── */}
      <PlaygroundSection
        title="Product icons (collapsed state)"
        description="The product prop maps to a built-in product icon shown when collapsed."
        code={`// Use logoCollapsed prop for custom collapsed state icon
<Sidebar
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  logo={<FullLogo />}
  logoCollapsed={
    <div className="h-7 w-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-white text-[11px] font-[700]">
      S
    </div>
  }
>
  {/* Menu content */}
</Sidebar>`}
      >
        <div className="flex flex-wrap gap-3">
          {['Soar', 'Siem', 'Ndr', 'Gsos', 'Asm', 'Bas'].map((name) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <Badge variant="outline" size="sm">{name}</Badge>
            </div>
          ))}
        </div>
        <p className="text-caption text-[var(--muted-foreground)] mt-3">
          Pass <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">product="Soar"</code> to auto-show the SOAR icon when sidebar is collapsed.
        </p>
      </PlaygroundSection>

    </ComponentPage>
  );
}
