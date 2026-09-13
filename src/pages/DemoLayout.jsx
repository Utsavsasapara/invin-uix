import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Spinner } from 'invin-uix/ui/spinner';
import { Menu } from 'invin-uix/ui/menu';
import { Topbar } from 'invin-uix/ui/topbar';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { Sun, Moon, House } from 'invin-uix/ui/icons';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { useTheme } from '../useTheme.jsx';
import { AppSwitcher } from '../components/AppSwitcher.jsx';

// ─── Lazy-loaded demo pages ─────────────────────────────────────────────────

// Getting Started
const GettingStartedDemo = lazy(() => import('./demos/GettingStartedDemo.jsx'));
const UIGuideV2 = lazy(() => import('./demos/UIGuideV2.jsx'));
const ShowcaseDemo = lazy(() => import('./demos/ShowcaseDemo.jsx'));

// Tier 1: Display
const ButtonDemo = lazy(() => import('./demos/ButtonDemo.jsx'));
const BadgeDemo = lazy(() => import('./demos/BadgeDemo.jsx'));
const SeparatorDemo = lazy(() => import('./demos/SeparatorDemo.jsx'));
const SkeletonDemo = lazy(() => import('./demos/SkeletonDemo.jsx'));
const AlertDemo = lazy(() => import('./demos/AlertDemo.jsx'));
const AvatarDemo = lazy(() => import('./demos/AvatarDemo.jsx'));
const CardDemo = lazy(() => import('./demos/CardDemo.jsx'));
const LabelDemo = lazy(() => import('./demos/LabelDemo.jsx'));
const SpinnerDemo = lazy(() => import('./demos/SpinnerDemo.jsx'));
const IconsDemo = lazy(() => import('./demos/IconsDemo.jsx'));
const TypographyDemo = lazy(() => import('./demos/TypographyDemo.jsx'));

// Tier 2: Form / Interactive
const InputDemo = lazy(() => import('./demos/InputDemo.jsx'));
const TextareaDemo = lazy(() => import('./demos/TextareaDemo.jsx'));
const SelectDemo = lazy(() => import('./demos/SelectDemo.jsx'));
const CheckboxDemo = lazy(() => import('./demos/CheckboxDemo.jsx'));
const RadioGroupDemo = lazy(() => import('./demos/RadioGroupDemo.jsx'));
const SwitchDemo = lazy(() => import('./demos/SwitchDemo.jsx'));
const SliderDemo = lazy(() => import('./demos/SliderDemo.jsx'));
const ToggleDemo = lazy(() => import('./demos/ToggleDemo.jsx'));
const ProgressDemo = lazy(() => import('./demos/ProgressDemo.jsx'));
const TabsDemo = lazy(() => import('./demos/TabsDemo.jsx'));

// Tier 3: Overlay / Floating
const DialogDemo = lazy(() => import('./demos/DialogDemo.jsx'));
const DrawerDemo = lazy(() => import('./demos/DrawerDemo.jsx'));
const TooltipDemo = lazy(() => import('./demos/TooltipDemo.jsx'));
const PopoverDemo = lazy(() => import('./demos/PopoverDemo.jsx'));
const DropdownDemo = lazy(() => import('./demos/DropdownDemo.jsx'));
const ContextMenuDemo = lazy(() => import('./demos/ContextMenuDemo.jsx'));
const HoverCardDemo = lazy(() => import('./demos/HoverCardDemo.jsx'));
const ToastDemo = lazy(() => import('./demos/ToastDemo.jsx'));

// Tier 4: Complex / Composite
const TableDemo = lazy(() => import('./demos/TableDemo.jsx'));
const AccordionDemo = lazy(() => import('./demos/AccordionDemo.jsx'));
const MenuDemo = lazy(() => import('./demos/MenuDemo.jsx'));
const BreadcrumbDemo = lazy(() => import('./demos/BreadcrumbDemo.jsx'));
const PaginationDemo = lazy(() => import('./demos/PaginationDemo.jsx'));
const CalendarDemo = lazy(() => import('./demos/CalendarDemo.jsx'));
const DatePickerDemo = lazy(() => import('./demos/DatePickerDemo.jsx'));
const ChartDemo = lazy(() => import('./demos/ChartDemo.jsx'));
const LineChartDemo = lazy(() => import('./demos/charts/LineChartDemo.jsx'));
const AreaChartDemo = lazy(() => import('./demos/charts/AreaChartDemo.jsx'));
const BarChartDemo = lazy(() => import('./demos/charts/BarChartDemo.jsx'));
const PieChartDemo = lazy(() => import('./demos/charts/PieChartDemo.jsx'));
const RadarChartDemo = lazy(() => import('./demos/charts/RadarChartDemo.jsx'));
const GaugeChartDemo = lazy(() => import('./demos/charts/GaugeChartDemo.jsx'));
const SparklineDemo = lazy(() => import('./demos/charts/SparklineDemo.jsx'));

// Tier 5: Layout / Utility
const AspectRatioDemo = lazy(() => import('./demos/AspectRatioDemo.jsx'));
const TopbarDemo = lazy(() => import('./demos/TopbarDemo.jsx'));
const TourDemo = lazy(() => import('./demos/TourDemo.jsx'));
const FlowBuilderDemo = lazy(() => import('./demos/FlowBuilderDemo.jsx'));

// Tier 6: New components
const StepperDemo = lazy(() => import('./demos/StepperDemo.jsx'));
const TimelineDemo = lazy(() => import('./demos/TimelineDemo.jsx'));
const CollapsibleDemo = lazy(() => import('./demos/CollapsibleDemo.jsx'));
const AlertDialogDemo = lazy(() => import('./demos/AlertDialogDemo.jsx'));
const ScrollAreaDemo = lazy(() => import('./demos/ScrollAreaDemo.jsx'));
const SidebarDemo = lazy(() => import('./demos/SidebarDemo.jsx'));
const KpiCardDemo = lazy(() => import('./demos/KpiCardDemo.jsx'));
const DataTableDemo = lazy(() => import('./demos/DataTableDemo.jsx'));
const FileUploadDemo = lazy(() => import('./demos/FileUploadDemo.jsx'));
const ResizableDemo = lazy(() => import('./demos/ResizableDemo.jsx'));
const ComboboxDemo = lazy(() => import('./demos/ComboboxDemo.jsx'));
const CommandDemo = lazy(() => import('./demos/CommandDemo.jsx'));
const TreeViewDemo = lazy(() => import('./demos/TreeViewDemo.jsx'));

// Tier 7: Latest additions (v1.1.0)
const ErrorBoundaryDemo = lazy(() => import('./demos/ErrorBoundaryDemo.jsx'));
const NumberInputDemo = lazy(() => import('./demos/NumberInputDemo.jsx'));
const FormDemo = lazy(() => import('./demos/FormDemo.jsx'));

// Tier 8: New input components (v1.2.0)
const SearchInputDemo = lazy(() => import('./demos/SearchInputDemo.jsx'));
const TagInputDemo = lazy(() => import('./demos/TagInputDemo.jsx'));

// ─── Component Registry ─────────────────────────────────────────────────────

const categories = [
  {
    key: 'foundations',
    label: 'Foundations',
    type: 'group',
    children: [
      { key: 'getting-started', label: 'Getting Started', component: GettingStartedDemo },
      { key: 'showcase', label: 'Showcase', component: ShowcaseDemo, badge: 'New' },
      { key: 'ui-guide', label: 'UI Guide', component: UIGuideV2 },
      { key: 'typography', label: 'Typography', component: TypographyDemo },
      { key: 'icons', label: 'Icons', component: IconsDemo },
    ],
  },
  {
    key: 'display',
    label: 'Display',
    type: 'group',
    children: [
      { key: 'button', label: 'Button', component: ButtonDemo },
      { key: 'badge', label: 'Badge', component: BadgeDemo },
      { key: 'avatar', label: 'Avatar', component: AvatarDemo },
      { key: 'card', label: 'Card', component: CardDemo },
      { key: 'kpi-card', label: 'KPI Card', component: KpiCardDemo },
      { key: 'label', label: 'Label', component: LabelDemo },
      { key: 'separator', label: 'Separator', component: SeparatorDemo },
      { key: 'alert', label: 'Alert', component: AlertDemo },
      { key: 'skeleton', label: 'Skeleton', component: SkeletonDemo },
      { key: 'spinner', label: 'Spinner', component: SpinnerDemo },
    ],
  },
  {
    key: 'form',
    label: 'Form & Input',
    type: 'group',
    children: [
      { key: 'form', label: 'Form', component: FormDemo },
      { key: 'input', label: 'Input', component: InputDemo },
      { key: 'number-input', label: 'Number Input', component: NumberInputDemo },
      { key: 'search-input', label: 'Search Input', component: SearchInputDemo, badge: 'New' },
      { key: 'textarea', label: 'Textarea', component: TextareaDemo },
      { key: 'select', label: 'Select', component: SelectDemo },
      { key: 'combobox', label: 'Combobox', component: ComboboxDemo },
      { key: 'checkbox', label: 'Checkbox', component: CheckboxDemo },
      { key: 'radio-group', label: 'Radio Group', component: RadioGroupDemo },
      { key: 'switch', label: 'Switch', component: SwitchDemo },
      { key: 'slider', label: 'Slider', component: SliderDemo },
      { key: 'toggle', label: 'Toggle', component: ToggleDemo },
      { key: 'tag-input', label: 'Tag Input', component: TagInputDemo, badge: 'New' },
    ],
  },
  {
    key: 'navigation',
    label: 'Navigation',
    type: 'group',
    children: [
      { key: 'tabs', label: 'Tabs', component: TabsDemo },
      { key: 'breadcrumb', label: 'Breadcrumb', component: BreadcrumbDemo },
      { key: 'pagination', label: 'Pagination', component: PaginationDemo },
      { key: 'menu', label: 'Menu', component: MenuDemo },
      { key: 'command', label: 'Command Palette', component: CommandDemo },
    ],
  },
  {
    key: 'feedback',
    label: 'Feedback',
    type: 'group',
    children: [
      { key: 'progress', label: 'Progress', component: ProgressDemo },
      { key: 'toast', label: 'Toast', component: ToastDemo },
      { key: 'tooltip', label: 'Tooltip', component: TooltipDemo },
      { key: 'error-boundary', label: 'Error Boundary', component: ErrorBoundaryDemo },
    ],
  },
  {
    key: 'overlay',
    label: 'Overlay & Floating',
    type: 'group',
    children: [
      { key: 'dialog', label: 'Dialog', component: DialogDemo },
      { key: 'alert-dialog', label: 'Alert Dialog', component: AlertDialogDemo },
      { key: 'drawer', label: 'Drawer', component: DrawerDemo },
      { key: 'popover', label: 'Popover', component: PopoverDemo },
      { key: 'dropdown', label: 'Dropdown Menu', component: DropdownDemo },
      { key: 'context-menu', label: 'Context Menu', component: ContextMenuDemo },
      { key: 'hover-card', label: 'Hover Card', component: HoverCardDemo },
    ],
  },
  {
    key: 'data',
    label: 'Data & Disclosure',
    type: 'group',
    children: [
      { key: 'table', label: 'Table', component: TableDemo },
      { key: 'data-table', label: 'Data Table', component: DataTableDemo },
      { key: 'accordion', label: 'Accordion', component: AccordionDemo },
      { key: 'collapsible', label: 'Collapsible', component: CollapsibleDemo },
      { key: 'tree-view', label: 'Tree View', component: TreeViewDemo },
      { key: 'calendar', label: 'Calendar', component: CalendarDemo },
      { key: 'date-picker', label: 'Date Picker', component: DatePickerDemo },
      { key: 'stepper', label: 'Stepper', component: StepperDemo },
      { key: 'timeline', label: 'Timeline', component: TimelineDemo },
      { key: 'file-upload', label: 'File Upload', component: FileUploadDemo },
      { key: 'chart', label: 'Charts', children: [
        { key: 'chart-overview', label: 'Overview', component: ChartDemo },
        { key: 'chart-line', label: 'Line Chart', component: LineChartDemo },
        { key: 'chart-area', label: 'Area Chart', component: AreaChartDemo },
        { key: 'chart-bar', label: 'Bar Chart', component: BarChartDemo },
        { key: 'chart-pie', label: 'Pie & Donut', component: PieChartDemo },
        { key: 'chart-radar', label: 'Radar Chart', component: RadarChartDemo },
        { key: 'chart-gauge', label: 'Gauge Chart', component: GaugeChartDemo },
        { key: 'chart-sparkline', label: 'Sparkline', component: SparklineDemo },
      ]},
    ],
  },
  {
    key: 'layout',
    label: 'Layout & Utility',
    type: 'group',
    children: [
      { key: 'topbar', label: 'Topbar', component: TopbarDemo },
      { key: 'sidebar-demo', label: 'Sidebar', component: SidebarDemo },
      { key: 'scroll-area', label: 'Scroll Area', component: ScrollAreaDemo },
      { key: 'resizable', label: 'Resizable Panels', component: ResizableDemo },
      { key: 'aspect-ratio', label: 'Aspect Ratio', component: AspectRatioDemo },
      { key: 'tour', label: 'Tour', component: TourDemo },
      { key: 'flow-builder', label: 'Flow Builder', component: FlowBuilderDemo },
    ],
  },
];

// Flatten for lookup (handles nested children like Charts sub-items)
const allComponents = categories.flatMap(cat =>
  cat.children.flatMap(c => c.children ? c.children : [c])
);

// Build menu items for the Menu component
const menuItems = categories.map(cat => ({
  key: cat.key,
  label: cat.label,
  type: 'group',
  children: cat.children.map(c =>
    c.children
      ? { key: c.key, label: c.label, children: c.children.map(sc => ({ key: sc.key, label: sc.label })) }
      : { key: c.key, label: c.label }
  ),
}));

// ─── Fallback ────────────────────────────────────────────────────────────────

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner size="md" tip="Loading component..." />
    </div>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────

export default function DemoLayout() {
  const { dark, toggleDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('getting-started');

  const activeEntry = allComponents.find(c => c.key === activePage);
  const ActiveComponent = activeEntry?.component || GettingStartedDemo;

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        product="Playground"
        footer={
          !collapsed ? (
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[var(--muted-foreground-faint)]">Components</span>
              <Badge variant="secondary" size="sm">{allComponents.length}</Badge>
            </div>
          ) : null
        }
      >
        <Menu
          mode="sidebar"
          collapsed={collapsed}
          collapsedTooltip
          selectedKeys={[activePage]}
          defaultOpenKeys={collapsed ? [] : categories.map(c => c.key)}
          onClick={({ key }) => setActivePage(key)}
          items={menuItems}
        />
      </Sidebar>

      {/* ─── Main Content ────────────────────────────────────── */}
      <main
        className="transition-[margin-left] duration-200 ease-out"
        style={{ marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        <Topbar
          left={
            <h1 className="text-page-title font-semibold text-[var(--foreground)] tracking-[-0.01em]">{activeEntry?.label || 'Component'}</h1>
          }
          right={
            <div className="flex items-center gap-1">
              <AppSwitcher />
              <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"}>
                <Button variant="ghost" size="icon-sm" onClick={() => toggleDark(!dark)}>
                  {dark ? <Sun style={{ width: 16, height: 16 }} /> : <Moon style={{ width: 16, height: 16 }} />}
                </Button>
              </Tooltip>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <House style={{ width: 14, height: 14 }} /> Home
                </Button>
              </Link>
            </div>
          }
        />

        <div className="px-6 py-6">
          <Suspense fallback={<LoadingFallback />}>
            <ActiveComponent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
