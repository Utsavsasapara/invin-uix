import { useState } from 'react';
import { ComponentPage, PlaygroundSection, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Menu } from 'invin-uix/ui/menu';
import { Badge } from 'invin-uix/ui/badge';
import { Switch } from 'invin-uix/ui/switch';
import { Separator } from 'invin-uix/ui/separator';
import {
  House, Users, Gear, Envelope, Calendar,
  FileText, ChartBar as BarChart, Shield, Tray,
  SignOut, Bell, BookmarkSimple, Lightning
} from 'invin-uix/ui/icons';

const icon = (Icon) => <Icon style={{ width: 16, height: 16 }} />;

export default function MenuDemo() {
  const [hSelected, setHSelected] = useState(['home']);
  const [vSelected, setVSelected] = useState(['dashboard']);
  const [iSelected, setISelected] = useState(['opt1']);
  const [collapsed, setCollapsed] = useState(false);
  const [bgSelected, setBgSelected] = useState(['dashboard']);
  const [borderSelected, setBorderSelected] = useState(['dashboard']);
  const [filledSelected, setFilledSelected] = useState(['dashboard']);
  const [collapsedSelected, setCollapsedSelected] = useState(['dashboard']);
  const [disabledSelected, setDisabledSelected] = useState(['active']);

  return (
    <ComponentPage
      name="Menu"
      description="Navigation menu with horizontal, vertical, and inline modes. Supports icons, descriptions, badges, sub-menus, groups, collapsed mode, and danger items."
      importCode={`import { Menu } from 'invin-uix/ui/menu';`}
    >
      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Menu Playground"
        description="Experiment with Menu configurations."
        controls={[
          { name: 'mode', type: 'select', label: 'Mode', default: 'vertical', options: [{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }, { value: 'sidebar', label: 'Sidebar' }] },
          { name: 'activeVariant', type: 'select', label: 'Active Variant', default: 'background', options: [{ value: 'background', label: 'Background' }, { value: 'border', label: 'Border' }, { value: 'filled', label: 'Filled' }] },
        ]}
      >
        {(props) => (
          <div style={{ maxWidth: props.mode === 'horizontal' ? '100%' : '220px' }}>
            <Menu
              mode={props.mode}
              activeVariant={props.activeVariant}
              selectedKeys={['dashboard']}
              items={[
                { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                { key: 'users', label: 'Users', icon: icon(Users) },
                { key: 'settings', label: 'Settings', icon: icon(Gear) },
              ]}
            />
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PlaygroundSection
        title="Horizontal (Top Nav)"
        description="Horizontal navigation bar for top-level pages."
        code={`<Menu
  mode="horizontal"
  selectedKeys={['home']}
  onClick={({ key }) => setSelected([key])}
  items={[
    { key: 'home', label: 'House', icon: <House /> },
    { key: 'products', label: 'Products' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' },
  ]}
/>`}
      >
        <div className="w-full">
          <Menu
            mode="horizontal"
            selectedKeys={hSelected}
            onClick={({ key }) => setHSelected([key])}
            items={[
              { key: 'home', label: 'House', icon: icon(House) },
              { key: 'products', label: 'Products' },
              { key: 'about', label: 'About' },
              { key: 'contact', label: 'Contact' },
            ]}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Horizontal with Sub-menu"
        description="Dropdown sub-menus on hover for horizontal nav."
        code={`<Menu
  mode="horizontal"
  selectedKeys={['home']}
  items={[
    { key: 'home', label: 'House', icon: <House /> },
    {
      key: 'docs', label: 'Documentation',
      children: [
        { key: 'getting-started', label: 'Getting Started', description: 'Quick setup guide' },
        { key: 'components', label: 'Components', description: 'All UI components' },
        { key: 'api', label: 'API Reference' },
      ]
    },
    { key: 'blog', label: 'Blog' },
  ]}
/>`}
      >
        <div className="w-full">
          <Menu
            mode="horizontal"
            selectedKeys={hSelected}
            onClick={({ key }) => setHSelected([key])}
            items={[
              { key: 'home', label: 'House', icon: icon(House) },
              {
                key: 'docs', label: 'Documentation',
                children: [
                  { key: 'getting-started', label: 'Getting Started', description: 'Quick setup guide' },
                  { key: 'components', label: 'Components', description: 'All UI components' },
                  { key: 'api', label: 'API Reference' },
                ]
              },
              { key: 'blog', label: 'Blog' },
            ]}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Active Variants"
        description="Three active indicator styles: background (default), border, filled."
        code={`<Menu mode="vertical" activeVariant="background" ... />
<Menu mode="vertical" activeVariant="border" ... />
<Menu mode="vertical" activeVariant="filled" ... />`}
      >
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div>
            <p className="text-caption text-muted-foreground mb-2">background (default)</p>
            <div style={{ maxWidth: '220px' }}>
              <Menu
                mode="vertical"
                activeVariant="background"
                selectedKeys={bgSelected}
                onClick={({ key }) => setBgSelected([key])}
                items={[
                  { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                  { key: 'inbox', label: 'Tray', icon: icon(Tray) },
                  { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
                  { key: 'settings', label: 'Gear', icon: icon(Gear) },
                ]}
              />
            </div>
          </div>
          <div>
            <p className="text-caption text-muted-foreground mb-2">border</p>
            <div style={{ maxWidth: '220px' }}>
              <Menu
                mode="vertical"
                activeVariant="border"
                selectedKeys={borderSelected}
                onClick={({ key }) => setBorderSelected([key])}
                items={[
                  { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                  { key: 'inbox', label: 'Tray', icon: icon(Tray) },
                  { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
                  { key: 'settings', label: 'Gear', icon: icon(Gear) },
                ]}
              />
            </div>
          </div>
          <div>
            <p className="text-caption text-muted-foreground mb-2">filled</p>
            <div style={{ maxWidth: '220px' }}>
              <Menu
                mode="vertical"
                activeVariant="filled"
                selectedKeys={filledSelected}
                onClick={({ key }) => setFilledSelected([key])}
                items={[
                  { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                  { key: 'inbox', label: 'Tray', icon: icon(Tray) },
                  { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
                  { key: 'settings', label: 'Gear', icon: icon(Gear) },
                ]}
              />
            </div>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Vertical with Badges & Descriptions"
        description="Sidebar navigation with badge counts, descriptions, and danger items."
        code={`<Menu
  mode="vertical"
  selectedKeys={['dashboard']}
  items={[
    { key: 'dashboard', label: 'Dashboard', icon: <House />, description: 'Overview & metrics' },
    { key: 'inbox', label: 'Tray', icon: <Tray />, extra: <Badge>5</Badge> },
    { key: 'reports', label: 'Reports', icon: <BarChart />, extra: <Badge variant="success" size="sm">New</Badge> },
    { key: 'divider1', type: 'divider', label: '' },
    { key: 'logout', label: 'Logout', icon: <SignOut />, danger: true },
  ]}
/>`}
      >
        <div style={{ maxWidth: '260px' }}>
          <Menu
            mode="vertical"
            selectedKeys={vSelected}
            onClick={({ key }) => setVSelected([key])}
            items={[
              { key: 'dashboard', label: 'Dashboard', icon: icon(House), description: 'Overview & metrics' },
              { key: 'inbox', label: 'Tray', icon: icon(Tray), extra: <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', padding: '0 5px', borderRadius: '9px', backgroundColor: 'var(--error, #dc2626)', color: '#fff', fontSize: '11px', fontWeight: 600, lineHeight: 1 }}>5</span> },
              { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
              { key: 'reports', label: 'Reports', icon: icon(BarChart), extra: <Badge variant="success" size="sm">New</Badge> },
              { key: 'divider1', type: 'divider', label: '' },
              { key: 'settings', label: 'Gear', icon: icon(Gear) },
              { key: 'logout', label: 'Logout', icon: icon(SignOut), danger: true },
            ]}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Inline (Collapsible Sub-menus)"
        description="Sub-menus that expand/collapse inline, with groups."
        code={`<Menu
  mode="sidebar"
  selectedKeys={['opt1']}
  defaultOpenKeys={['navigation']}
  items={[
    { key: 'home', label: 'House', icon: <House /> },
    {
      key: 'navigation', label: 'Navigation', icon: <Envelope />,
      children: [
        { key: 'opt1', label: 'Option 1' },
        { key: 'opt2', label: 'Option 2' },
      ]
    },
    { key: 'admin', type: 'group', label: 'Admin',
      children: [
        { key: 'users', label: 'Users', icon: <Users /> },
        { key: 'settings', label: 'Gear', icon: <Gear /> },
      ]
    },
  ]}
/>`}
      >
        <div style={{ maxWidth: '260px' }}>
          <Menu
            mode="sidebar"
            selectedKeys={iSelected}
            defaultOpenKeys={['navigation']}
            onClick={({ key }) => setISelected([key])}
            items={[
              { key: 'home', label: 'House', icon: icon(House) },
              {
                key: 'navigation', label: 'Navigation', icon: icon(Envelope),
                children: [
                  { key: 'opt1', label: 'Option 1' },
                  { key: 'opt2', label: 'Option 2' },
                  { key: 'opt3', label: 'Option 3' },
                ]
              },
              {
                key: 'features', label: 'Features', icon: icon(Lightning),
                children: [
                  { key: 'feature1', label: 'Analytics' },
                  { key: 'feature2', label: 'Notifications', extra: <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', padding: '0 5px', borderRadius: '9px', backgroundColor: 'var(--error, #dc2626)', color: '#fff', fontSize: '11px', fontWeight: 600, lineHeight: 1 }}>3</span> },
                  { key: 'feature3', label: 'Integrations' },
                ]
              },
              { key: 'divider', type: 'divider', label: '' },
              {
                key: 'admin', type: 'group', label: 'Admin',
                children: [
                  { key: 'users', label: 'Users', icon: icon(Users) },
                  { key: 'settings', label: 'Gear', icon: icon(Gear) },
                ]
              },
            ]}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Nested Sub-menus (3 levels)"
        description="Deep nesting without icons for content-heavy navigation."
        code={`<Menu
  mode="sidebar"
  defaultOpenKeys={['products', 'electronics']}
  items={[
    { key: 'overview', label: 'Overview' },
    {
      key: 'products', label: 'Products',
      children: [
        { key: 'all-products', label: 'All Products' },
        {
          key: 'electronics', label: 'Electronics',
          children: [
            { key: 'phones', label: 'Phones' },
            { key: 'laptops', label: 'Laptops' },
          ]
        },
      ]
    },
  ]}
/>`}
      >
        <div style={{ maxWidth: '260px' }}>
          <Menu
            mode="sidebar"
            selectedKeys={iSelected}
            defaultOpenKeys={['products', 'electronics']}
            onClick={({ key }) => setISelected([key])}
            items={[
              { key: 'overview', label: 'Overview' },
              {
                key: 'products', label: 'Products',
                children: [
                  { key: 'all-products', label: 'All Products' },
                  {
                    key: 'electronics', label: 'Electronics',
                    children: [
                      { key: 'phones', label: 'Phones' },
                      { key: 'laptops', label: 'Laptops' },
                      { key: 'tablets', label: 'Tablets' },
                    ]
                  },
                  { key: 'clothing', label: 'Clothing' },
                  { key: 'accessories', label: 'Accessories' },
                ]
              },
              {
                key: 'orders', label: 'Orders',
                children: [
                  { key: 'pending', label: 'Pending' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'cancelled', label: 'Cancelled' },
                ]
              },
              { key: 'divider2', type: 'divider', label: '' },
              { key: 'account-settings', label: 'Account Gear' },
            ]}
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Collapsed Mode"
        description="Icon-only mode with tooltips on hover. Toggle to see the transition. Tooltips work for all items including those with sub-menus."
        code={`<Menu
  mode="sidebar"
  collapsed={true}
  collapsedTooltip={true}
  selectedKeys={['dashboard']}
  items={[
    { key: 'dashboard', label: 'Dashboard', icon: <House /> },
    { key: 'inbox', label: 'Inbox', icon: <Tray /> },
    {
      key: 'navigation', label: 'Navigation', icon: <Envelope />,
      children: [
        { key: 'opt1', label: 'Option 1' },
        { key: 'opt2', label: 'Option 2' },
      ]
    },
    { key: 'settings', label: 'Settings', icon: <Gear /> },
  ]}
/>`}
      >
        <div className="w-full">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="text-label">Collapsed:</span>
            <Switch size="sm" checked={collapsed} onCheckedChange={setCollapsed} />
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <p className="text-caption text-muted-foreground mb-2">With tooltip (default)</p>
              <div style={{ width: collapsed ? '48px' : '220px', transition: 'width 200ms ease' }}>
                <Menu
                  mode="sidebar"
                  collapsed={collapsed}
                  collapsedTooltip={true}
                  selectedKeys={collapsedSelected}
                  onClick={({ key }) => setCollapsedSelected([key])}
                  items={[
                    { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                    { key: 'inbox', label: 'Inbox', icon: icon(Tray) },
                    {
                      key: 'navigation', label: 'Navigation', icon: icon(Envelope),
                      children: [
                        { key: 'nav-opt1', label: 'Option 1' },
                        { key: 'nav-opt2', label: 'Option 2' },
                      ]
                    },
                    { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
                    { key: 'settings', label: 'Settings', icon: icon(Gear) },
                  ]}
                />
              </div>
            </div>
            <div>
              <p className="text-caption text-muted-foreground mb-2">Without tooltip</p>
              <div style={{ width: collapsed ? '48px' : '220px', transition: 'width 200ms ease' }}>
                <Menu
                  mode="sidebar"
                  collapsed={collapsed}
                  collapsedTooltip={false}
                  selectedKeys={collapsedSelected}
                  onClick={({ key }) => setCollapsedSelected([key])}
                  items={[
                    { key: 'dashboard', label: 'Dashboard', icon: icon(House) },
                    { key: 'inbox', label: 'Inbox', icon: icon(Tray) },
                    { key: 'calendar', label: 'Calendar', icon: icon(Calendar) },
                    { key: 'settings', label: 'Settings', icon: icon(Gear) },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Disabled Items"
        description="Individual menu items can be disabled."
        code={`<Menu
  mode="vertical"
  items={[
    { key: 'active', label: 'Active Item', icon: <Bell /> },
    { key: 'disabled', label: 'Disabled Item', icon: <BookmarkSimple />, disabled: true },
    { key: 'normal', label: 'Normal Item', icon: <FileText /> },
  ]}
/>`}
      >
        <div style={{ maxWidth: '220px' }}>
          <Menu
            mode="vertical"
            selectedKeys={disabledSelected}
            onClick={({ key }) => setDisabledSelected([key])}
            items={[
              { key: 'active', label: 'Active Item', icon: icon(Bell) },
              { key: 'disabled', label: 'Disabled Item', icon: icon(BookmarkSimple), disabled: true },
              { key: 'normal', label: 'Normal Item', icon: icon(FileText) },
            ]}
          />
        </div>
      </PlaygroundSection>
    </ComponentPage>
  );
}
