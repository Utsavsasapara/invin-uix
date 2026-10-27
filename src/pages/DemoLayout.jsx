import { useState, lazy, Suspense, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Spinner } from 'invin-uix/ui/spinner';
import { Menu } from 'invin-uix/ui/menu';
import { Topbar } from 'invin-uix/ui/topbar';
import { Sidebar } from 'invin-uix/ui/sidebar';
import { CentralizedSearch, CentralizedSearchTrigger } from 'invin-uix/ui/centralized-search';
import { 
  Sun, Moon, House, BookOpen, Palette, SquaresFour, TextAa, 
  TextT, PaintBrush, 
  Textbox, ListChecks, NavigationArrow, Bell, Stack, GridFour, Wrench,
  CursorClick, Tag, UserCircle, Cards, Equals, Warning, CircleNotch, 
  CaretCircleRight, Table, ChartBar, MagnifyingGlass, Copy, FunnelSimple, BracketsCurly,
} from 'invin-uix/ui/icons';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { useTheme } from '../useTheme.jsx';
import { AppSwitcher } from '../components/AppSwitcher.jsx';
import { useLibConfig } from '../LibConfigContext.jsx';

// Import logos
import logoFullDarkMode from '../assets/main-logo-invinsense-for-darkMode.svg';
import logoFullLightMode from '../assets/main-logo-invinsense-for-lightMode.svg';
import logoSmall from '../assets/small-logo-invinsense.svg';

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
// DataTable sub-pages
const DataTableSortingDemo    = lazy(() => import('./demos/DataTableSortingDemo.jsx'));
const DataTableSearchDemo     = lazy(() => import('./demos/DataTableSearchDemo.jsx'));
const DataTablePaginationDemo = lazy(() => import('./demos/DataTablePaginationDemo.jsx'));
const DataTableSelectionDemo  = lazy(() => import('./demos/DataTableSelectionDemo.jsx'));
const DataTableColumnsDemo    = lazy(() => import('./demos/DataTableColumnsDemo.jsx'));
const DataTableRowsDemo       = lazy(() => import('./demos/DataTableRowsDemo.jsx'));
const DataTableEditingDemo    = lazy(() => import('./demos/DataTableEditingDemo.jsx'));
const DataTableExportDemo     = lazy(() => import('./demos/DataTableExportDemo.jsx'));
const DataTableAdvancedDemo   = lazy(() => import('./demos/DataTableAdvancedDemo.jsx'));
const FileUploadDemo = lazy(() => import('./demos/FileUploadDemo.jsx'));
const ResizableDemo = lazy(() => import('./demos/ResizableDemo.jsx'));
const ComboboxDemo = lazy(() => import('./demos/ComboboxDemo.jsx'));
const CommandDemo = lazy(() => import('./demos/CommandDemo.jsx'));
const CentralizedSearchDemo = lazy(() => import('./demos/CentralizedSearchDemo.jsx'));
const TreeViewDemo = lazy(() => import('./demos/TreeViewDemo.jsx'));

// Tier 7: Latest additions (v1.1.0)
const ErrorBoundaryDemo = lazy(() => import('./demos/ErrorBoundaryDemo.jsx'));
const NumberInputDemo = lazy(() => import('./demos/NumberInputDemo.jsx'));
const FormDemo = lazy(() => import('./demos/FormDemo.jsx'));

// Tier 8: New input components (v1.2.0)
const SearchInputDemo = lazy(() => import('./demos/SearchInputDemo.jsx'));
const TagInputDemo = lazy(() => import('./demos/TagInputDemo.jsx'));

// Tier 9: Animation components (v1.5.0)
const TextAnimateDemo = lazy(() => import('./demos/TextAnimateDemo.jsx'));
const TypingAnimationDemo = lazy(() => import('./demos/TypingAnimationDemo.jsx'));
const NumberTickerDemo = lazy(() => import('./demos/NumberTickerDemo.jsx'));
const WordRotateDemo = lazy(() => import('./demos/WordRotateDemo.jsx'));
const ShinyTextDemo = lazy(() => import('./demos/ShinyTextDemo.jsx'));
const GradientTextDemo = lazy(() => import('./demos/GradientTextDemo.jsx'));
const HyperTextDemo = lazy(() => import('./demos/HyperTextDemo.jsx'));
const AuroraTextDemo = lazy(() => import('./demos/AuroraTextDemo.jsx'));

// Tier 10: Utility components
const CopyButtonDemo = lazy(() => import('./demos/CopyButtonDemo.jsx'));
const StatusPageDemo = lazy(() => import('./demos/StatusPageDemo.jsx'));
const FilterBarDemo = lazy(() => import('./demos/FilterBarDemo.jsx'));
const FilterBuilderDemo = lazy(() => import('./demos/FilterBuilderDemo.jsx'));
const JSONViewerDemo = lazy(() => import('./demos/JSONViewerDemo.jsx'));
const SpinningTextDemo = lazy(() => import('./demos/SpinningTextDemo.jsx'));
const HighlighterDemo = lazy(() => import('./demos/HighlighterDemo.jsx'));
const Text3DFlipDemo = lazy(() => import('./demos/Text3DFlipDemo.jsx'));
const AnimatedThemeTogglerDemo = lazy(() => import('./demos/AnimatedThemeTogglerDemo.jsx'));
const NotificationPanelDemo = lazy(() => import('./demos/NotificationPanelDemo.jsx'));

// ─── Component Registry ─────────────────────────────────────────────────────

// Helper to create icon element
const icon = (Icon) => <Icon weight="bold" style={{ width: 16, height: 16 }} />;

const categories = [
  {
    key: 'foundations',
    label: 'Foundations',
    type: 'group',
    icon: icon(BookOpen),
    children: [
      { key: 'getting-started', label: 'Getting Started', component: GettingStartedDemo, icon: icon(CaretCircleRight) },
      { key: 'showcase', label: 'Showcase', component: ShowcaseDemo, badge: 'New', icon: icon(Palette) },
      { key: 'ui-guide', label: 'UI Guide', component: UIGuideV2, icon: icon(PaintBrush) },
      { key: 'typography', label: 'Typography', component: TypographyDemo, icon: icon(TextT) },
      { key: 'icons', label: 'Icons', component: IconsDemo, icon: icon(SquaresFour) },
    ],
  },
  {
    key: 'display',
    label: 'Display',
    type: 'group',
    icon: icon(Cards),
    children: [
      { key: 'button', label: 'Button', component: ButtonDemo, icon: icon(CursorClick) },
      { key: 'copy-button', label: 'Copy Button', component: CopyButtonDemo, badge: 'New', icon: icon(Copy) },
      { key: 'badge', label: 'Badge', component: BadgeDemo, icon: icon(Tag) },
      { key: 'avatar', label: 'Avatar', component: AvatarDemo, icon: icon(UserCircle) },
      { key: 'card', label: 'Card', component: CardDemo, icon: icon(Cards) },
      { key: 'kpi-card', label: 'KPI Card', component: KpiCardDemo, icon: icon(Cards) },
      { key: 'label', label: 'Label', component: LabelDemo, icon: icon(TextAa) },
      { key: 'separator', label: 'Separator', component: SeparatorDemo, icon: icon(Equals) },
      { key: 'alert', label: 'Alert', component: AlertDemo, icon: icon(Warning) },
      { key: 'skeleton', label: 'Skeleton', component: SkeletonDemo, icon: icon(GridFour) },
      { key: 'spinner', label: 'Spinner', component: SpinnerDemo, icon: icon(CircleNotch) },
    ],
  },
  {
    key: 'form',
    label: 'Form & Input',
    type: 'group',
    icon: icon(Textbox),
    children: [
      { key: 'form', label: 'Form', component: FormDemo, icon: icon(ListChecks) },
      { key: 'input', label: 'Input', component: InputDemo, icon: icon(Textbox) },
      { key: 'number-input', label: 'Number Input', component: NumberInputDemo, icon: icon(Textbox) },
      { key: 'search-input', label: 'Search Input', component: SearchInputDemo, badge: 'New', icon: icon(Textbox) },
      { key: 'textarea', label: 'Textarea', component: TextareaDemo, icon: icon(Textbox) },
      { key: 'select', label: 'Select', component: SelectDemo, icon: icon(ListChecks) },
      { key: 'combobox', label: 'Combobox', component: ComboboxDemo, icon: icon(ListChecks) },
      { key: 'checkbox', label: 'Checkbox', component: CheckboxDemo, icon: icon(ListChecks) },
      { key: 'radio-group', label: 'Radio Group', component: RadioGroupDemo, icon: icon(ListChecks) },
      { key: 'switch', label: 'Switch', component: SwitchDemo, icon: icon(ListChecks) },
      { key: 'slider', label: 'Slider', component: SliderDemo, icon: icon(ListChecks) },
      { key: 'toggle', label: 'Toggle', component: ToggleDemo, icon: icon(ListChecks) },
      { key: 'tag-input', label: 'Tag Input', component: TagInputDemo, badge: 'New', icon: icon(Tag) },
    ],
  },
  {
    key: 'navigation',
    label: 'Navigation',
    type: 'group',
    icon: icon(NavigationArrow),
    children: [
      { key: 'tabs', label: 'Tabs', component: TabsDemo, icon: icon(NavigationArrow) },
      { key: 'breadcrumb', label: 'Breadcrumb', component: BreadcrumbDemo, icon: icon(NavigationArrow) },
      { key: 'pagination', label: 'Pagination', component: PaginationDemo, icon: icon(NavigationArrow) },
      { key: 'menu', label: 'Menu', component: MenuDemo, icon: icon(NavigationArrow) },
      { key: 'command', label: 'Command Palette', component: CommandDemo, icon: icon(NavigationArrow) },
      { key: 'centralized-search', label: 'Centralized Search', component: CentralizedSearchDemo, badge: 'New', icon: icon(NavigationArrow) },
    ],
  },
  {
    key: 'feedback',
    label: 'Feedback',
    type: 'group',
    icon: icon(Bell),
    children: [
      { key: 'progress', label: 'Progress', component: ProgressDemo, icon: icon(CircleNotch) },
      { key: 'toast', label: 'Toast', component: ToastDemo, icon: icon(Bell) },
      { key: 'tooltip', label: 'Tooltip', component: TooltipDemo, icon: icon(Bell) },
      { key: 'error-boundary', label: 'Error Boundary', component: ErrorBoundaryDemo, icon: icon(Warning) },
      { key: 'status-page', label: 'Status Page', component: StatusPageDemo, badge: 'New', icon: icon(Warning) },
    ],
  },
  {
    key: 'overlay',
    label: 'Overlay & Floating',
    type: 'group',
    icon: icon(Stack),
    children: [
      { key: 'dialog', label: 'Dialog', component: DialogDemo, icon: icon(Stack) },
      { key: 'alert-dialog', label: 'Alert Dialog', component: AlertDialogDemo, icon: icon(Warning) },
      { key: 'drawer', label: 'Drawer', component: DrawerDemo, icon: icon(Stack) },
      { key: 'popover', label: 'Popover', component: PopoverDemo, icon: icon(Stack) },
      { key: 'dropdown', label: 'Dropdown Menu', component: DropdownDemo, icon: icon(Stack) },
      { key: 'context-menu', label: 'Context Menu', component: ContextMenuDemo, icon: icon(Stack) },
      { key: 'hover-card', label: 'Hover Card', component: HoverCardDemo, icon: icon(Stack) },
    ],
  },
  {
    key: 'data',
    label: 'Data & Disclosure',
    type: 'group',
    icon: icon(GridFour),
    children: [
      { key: 'table', label: 'Table', component: TableDemo, icon: icon(Table) },
      { key: 'data-table', label: 'Data Table', icon: icon(Table), children: [
        { key: 'data-table-overview',    label: 'Overview',           component: DataTableDemo,           icon: icon(Table) },
        { key: 'data-table-sorting',     label: 'Sorting',            component: DataTableSortingDemo,    icon: icon(Table) },
        { key: 'data-table-search',      label: 'Search & Filtering', component: DataTableSearchDemo,     icon: icon(MagnifyingGlass) },
        { key: 'data-table-pagination',  label: 'Pagination',         component: DataTablePaginationDemo, icon: icon(Table) },
        { key: 'data-table-selection',   label: 'Selection',          component: DataTableSelectionDemo,  icon: icon(Table) },
        { key: 'data-table-columns',     label: 'Columns',            component: DataTableColumnsDemo,    icon: icon(Table) },
        { key: 'data-table-rows',        label: 'Rows',               component: DataTableRowsDemo,       icon: icon(Table) },
        { key: 'data-table-editing',     label: 'Editing',            component: DataTableEditingDemo,    icon: icon(Table) },
        { key: 'data-table-export',      label: 'Export',             component: DataTableExportDemo,     icon: icon(Table) },
        { key: 'data-table-advanced',    label: 'Advanced',           component: DataTableAdvancedDemo,   icon: icon(Table) },
      ]},
      { key: 'filter-bar', label: 'Filter Bar', component: FilterBarDemo, badge: 'New', icon: icon(FunnelSimple) },
      { key: 'filter-builder', label: 'Filter Builder', component: FilterBuilderDemo, badge: 'New', icon: icon(FunnelSimple) },
      { key: 'notification-panel', label: 'Notification Panel', component: NotificationPanelDemo, badge: 'New', icon: icon(Bell) },
      { key: 'json-viewer', label: 'JSON Viewer', component: JSONViewerDemo, badge: 'New', icon: icon(BracketsCurly) },
      { key: 'accordion', label: 'Accordion', component: AccordionDemo, icon: icon(GridFour) },
      { key: 'collapsible', label: 'Collapsible', component: CollapsibleDemo, icon: icon(GridFour) },
      { key: 'tree-view', label: 'Tree View', component: TreeViewDemo, icon: icon(GridFour) },
      { key: 'calendar', label: 'Calendar', component: CalendarDemo, icon: icon(GridFour) },
      { key: 'date-picker', label: 'Date Picker', component: DatePickerDemo, icon: icon(GridFour) },
      { key: 'stepper', label: 'Stepper', component: StepperDemo, icon: icon(GridFour) },
      { key: 'timeline', label: 'Timeline', component: TimelineDemo, icon: icon(GridFour) },
      { key: 'file-upload', label: 'File Upload', component: FileUploadDemo, icon: icon(GridFour) },
      { key: 'chart', label: 'Charts', icon: icon(ChartBar), children: [
        { key: 'chart-overview', label: 'Overview', component: ChartDemo, icon: icon(ChartBar) },
        { key: 'chart-line', label: 'Line Chart', component: LineChartDemo, icon: icon(ChartBar) },
        { key: 'chart-area', label: 'Area Chart', component: AreaChartDemo, icon: icon(ChartBar) },
        { key: 'chart-bar', label: 'Bar Chart', component: BarChartDemo, icon: icon(ChartBar) },
        { key: 'chart-pie', label: 'Pie & Donut', component: PieChartDemo, icon: icon(ChartBar) },
        { key: 'chart-radar', label: 'Radar Chart', component: RadarChartDemo, icon: icon(ChartBar) },
        { key: 'chart-gauge', label: 'Gauge Chart', component: GaugeChartDemo, icon: icon(ChartBar) },
        { key: 'chart-sparkline', label: 'Sparkline', component: SparklineDemo, icon: icon(ChartBar) },
      ]},
    ],
  },
  {
    key: 'layout',
    label: 'Layout & Utility',
    type: 'group',
    icon: icon(Wrench),
    children: [
      { key: 'topbar', label: 'Topbar', component: TopbarDemo, icon: icon(Wrench) },
      { key: 'sidebar-demo', label: 'Sidebar', component: SidebarDemo, icon: icon(Wrench) },
      { key: 'scroll-area', label: 'Scroll Area', component: ScrollAreaDemo, icon: icon(Wrench) },
      { key: 'resizable', label: 'Resizable Panels', component: ResizableDemo, icon: icon(Wrench) },
      { key: 'aspect-ratio', label: 'Aspect Ratio', component: AspectRatioDemo, icon: icon(Wrench) },
      { key: 'tour', label: 'Tour', component: TourDemo, icon: icon(Wrench) },
      { key: 'flow-builder', label: 'Flow Builder', component: FlowBuilderDemo, icon: icon(Wrench) },
    ],
  },
  {
    key: 'animation',
    label: 'Animation',
    type: 'group',
    icon: icon(Palette),
    children: [
      { key: 'text-animate', label: 'Text Animate', component: TextAnimateDemo, badge: 'New', icon: icon(TextAa) },
      { key: 'typing-animation', label: 'Typing Animation', component: TypingAnimationDemo, badge: 'New', icon: icon(TextT) },
      { key: 'number-ticker', label: 'Number Ticker', component: NumberTickerDemo, badge: 'New', icon: icon(TextAa) },
      { key: 'word-rotate', label: 'Word Rotate', component: WordRotateDemo, badge: 'New', icon: icon(TextT) },
      { key: 'shiny-text', label: 'Shiny Text', component: ShinyTextDemo, badge: 'New', icon: icon(TextAa) },
      { key: 'gradient-text', label: 'Gradient Text', component: GradientTextDemo, badge: 'New', icon: icon(Palette) },
      { key: 'hyper-text', label: 'Hyper Text', component: HyperTextDemo, badge: 'New', icon: icon(TextT) },
      { key: 'aurora-text', label: 'Aurora Text', component: AuroraTextDemo, badge: 'New', icon: icon(Palette) },
      { key: 'spinning-text', label: 'Spinning Text', component: SpinningTextDemo, badge: 'New', icon: icon(TextAa) },
      { key: 'highlighter', label: 'Highlighter', component: HighlighterDemo, badge: 'New', icon: icon(PaintBrush) },
      { key: 'text-3d-flip', label: 'Text 3D Flip', component: Text3DFlipDemo, badge: 'New', icon: icon(TextAa) },
      { key: 'animated-theme-toggler', label: 'Theme Toggler', component: AnimatedThemeTogglerDemo, badge: 'New', icon: icon(Palette) },
    ],
  },
];

// Flatten for lookup (handles nested children like Charts sub-items)
const allComponents = categories.flatMap(cat =>
  cat.children.flatMap(c => c.children ? c.children : [c])
);

// Build menu items for the Menu component (include icons for collapsed sidebar)
const menuItems = categories.map(cat => ({
  key: cat.key,
  label: cat.label,
  type: 'group',
  icon: cat.icon,
  children: cat.children.map(c =>
    c.children
      ? { key: c.key, label: c.label, icon: c.icon, children: c.children.map(sc => ({ key: sc.key, label: sc.label, icon: sc.icon })) }
      : { key: c.key, label: c.label, icon: c.icon }
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeTagFilter, setActiveTagFilter] = useState(null); // Track selected tag for filtering
  const libConfig = useLibConfig();

  // Read demo from URL, default to 'getting-started'
  const activePage = searchParams.get('demo') || 'getting-started';
  
  // Update URL when changing page
  const setActivePage = (key) => {
    setSearchParams({ demo: key });
  };

  const activeEntry = allComponents.find(c => c.key === activePage);
  const ActiveComponent = activeEntry?.component || GettingStartedDemo;

  // Define tags for filtering
  const searchTags = useMemo(() => [
    { value: 'foundations', label: 'Foundations', color: 'var(--info)' },
    { value: 'display', label: 'Display', color: 'var(--success)' },
    { value: 'form', label: 'Form & Input', color: 'var(--warning)' },
    { value: 'navigation', label: 'Navigation', color: 'var(--accent)' },
    { value: 'feedback', label: 'Feedback', color: 'var(--error)' },
    { value: 'overlay', label: 'Overlay', color: 'var(--info)' },
    { value: 'data', label: 'Data & Disclosure', color: 'var(--success)' },
    { value: 'layout', label: 'Layout & Utility', color: 'var(--muted-foreground)' },
    { value: 'animation', label: 'Animation', color: 'var(--accent)' },
    { value: 'new', label: 'New', color: 'var(--success)' },
    { value: 'chart', label: 'Charts', color: 'var(--info)' },
  ], []);

  // Build search groups from categories for CentralizedSearch
  const searchGroups = useMemo(() => {
    return categories.map(cat => ({
      id: cat.key,
      heading: cat.label,
      icon: cat.icon,
      priority: categories.indexOf(cat),
      items: cat.children.flatMap(c => {
        // Handle nested children (like Charts sub-items)
        if (c.children) {
          return c.children.map(sc => ({
            id: sc.key,
            title: sc.label,
            description: `${cat.label} › ${c.label}`,
            icon: sc.icon,
            keywords: [cat.label.toLowerCase(), c.label.toLowerCase(), sc.label.toLowerCase()],
            tags: [cat.key, c.key], // category tag + parent key for sub-items
          }));
        }
        // Build tags array: category tag + 'new' if has badge
        const itemTags = [cat.key];
        if (c.badge === 'New') itemTags.push('new');
        
        return [{
          id: c.key,
          title: c.label,
          description: cat.label,
          icon: c.icon,
          keywords: [cat.label.toLowerCase(), c.label.toLowerCase()],
          tags: itemTags,
        }];
      }),
    }));
  }, []);

  // Filter search groups based on active tag filter
  const filteredSearchGroups = useMemo(() => {
    if (!activeTagFilter) return searchGroups;
    
    // Filter each group to only include items with matching tag
    return searchGroups
      .map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.tags?.includes(activeTagFilter)
        ),
      }))
      .filter(group => group.items.length > 0); // Remove empty groups
  }, [searchGroups, activeTagFilter]);

  // Handle search item selection - navigate to component
  const handleSearchSelect = (item) => {
    setActivePage(item.id);
    setSearchOpen(false);
    setActiveTagFilter(null); // Clear filter after selection
  };

  // Handle tag selection - filter components by tag
  const handleTagSelect = (tag) => {
    const tagValue = tag.value || tag.id;
    setActiveTagFilter(tagValue);
    // Keep search open to show filtered results
  };

  // Reset tag filter when search closes
  const handleSearchOpenChange = (open) => {
    setSearchOpen(open);
    if (!open) {
      setActiveTagFilter(null); // Clear filter when closing
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Global Search ─────────────────────────────────── */}
      <CentralizedSearch
        open={searchOpen}
        onOpenChange={handleSearchOpenChange}
        groups={filteredSearchGroups}
        tags={searchTags}
        placeholder={activeTagFilter 
          ? `Showing ${searchTags.find(t => t.value === activeTagFilter)?.label || activeTagFilter} components...`
          : "Search components..."
        }
        emptyMessage={activeTagFilter 
          ? `No components found in "${searchTags.find(t => t.value === activeTagFilter)?.label || activeTagFilter}" category.`
          : "No components found. Try a different search term."
        }
        onSelect={handleSearchSelect}
        onTagSelect={handleTagSelect}
        closeOnTagSelect={false}
        shortcut="ctrl+k"
      />

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        logo={<img src={dark ? logoFullDarkMode : logoFullLightMode} alt="Invinsense" style={{ height: 26 }} />}
        logoCollapsed={<img src={logoSmall} alt="Invinsense" style={{ height: 28, width: 22 }} />}
        footer={
          !collapsed ? (
            <p className="text-caption text-[var(--muted-foreground-faint)] px-2">
              {libConfig.name} <Badge variant="outline" size="sm">v{libConfig.version}</Badge>
            </p>
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
            <div className="flex items-center gap-2">
              {/* Component Search Trigger */}
              <CentralizedSearchTrigger
                placeholder="Search components..."
                shortcut="ctrl+k"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex"
              />
              {/* Mobile search button */}
              <Tooltip title="Search components (Ctrl+K)">
                <Button 
                  variant="ghost" 
                  size="icon-sm" 
                  onClick={() => setSearchOpen(true)}
                  className="sm:hidden"
                >
                  <MagnifyingGlass style={{ width: 16, height: 16 }} />
                </Button>
              </Tooltip>
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
