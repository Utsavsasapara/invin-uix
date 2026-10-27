import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import {
  CentralizedSearch,
  CentralizedSearchTrigger,
} from 'invin-uix/ui/centralized-search';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';
import { Input } from 'invin-uix/ui/input';
import { Toaster, toast } from 'invin-uix/ui/toast';
import {
  MagnifyingGlass, House, Users, Gear, FileText, Shield,
  ChartBar, Bell, Envelope, Calendar, Plus,
  Moon, SignOut, Lightning, Tag, Folder, Warning,
  Globe, Lock, Eye, Download, Upload,
  CheckCircle, XCircle, Info, Code, Keyboard,
} from 'invin-uix/ui/icons';

// ─── Sample Data ─────────────────────────────────────────────────────────────

// Recent items (shown separately at top)
const sampleRecentItems = [
  { id: 'recent-1', title: 'Security Dashboard', icon: <Shield style={{ width: 16, height: 16 }} />, description: 'Last visited 2 hours ago' },
  { id: 'recent-2', title: 'User Management', icon: <Users style={{ width: 16, height: 16 }} />, description: 'Last visited yesterday' },
  { id: 'recent-3', title: 'System Settings', icon: <Gear style={{ width: 16, height: 16 }} />, description: 'Last visited 3 days ago' },
];

// Tags for tag mode
const sampleTags = [
  { value: 'security', label: 'Security', color: 'var(--destructive)' },
  { value: 'users', label: 'Users', color: 'var(--info)' },
  { value: 'reports', label: 'Reports', color: 'var(--success)' },
  { value: 'settings', label: 'Settings', color: 'var(--warning)' },
  { value: 'analytics', label: 'Analytics', color: 'var(--accent)' },
  { value: 'alerts', label: 'Alerts', color: 'var(--destructive)' },
  { value: 'documents', label: 'Documents', color: 'var(--info)' },
  { value: 'admin', label: 'Admin', color: 'var(--warning)' },
];

// Groups with their items (component expects this structure)
const sampleGroups = [
  {
    id: 'pages',
    heading: 'Pages',
    icon: <Folder style={{ width: 16, height: 16 }} />,
    priority: 1,
    items: [
      { id: 'page-1', title: 'Dashboard', icon: <House style={{ width: 16, height: 16 }} />, description: 'Main overview', keywords: ['home', 'main'] },
      { id: 'page-2', title: 'Analytics', icon: <ChartBar style={{ width: 16, height: 16 }} />, description: 'View reports', keywords: ['stats', 'metrics'] },
      { id: 'page-3', title: 'Users', icon: <Users style={{ width: 16, height: 16 }} />, description: 'User management', keywords: ['team', 'people'] },
      { id: 'page-4', title: 'Settings', icon: <Gear style={{ width: 16, height: 16 }} />, description: 'System settings', keywords: ['config', 'preferences'] },
      { id: 'page-5', title: 'Security', icon: <Shield style={{ width: 16, height: 16 }} />, description: 'Security center', keywords: ['protection', 'firewall'] },
      { id: 'page-6', title: 'Reports', icon: <FileText style={{ width: 16, height: 16 }} />, description: 'Generate reports', keywords: ['export', 'documents'] },
      { id: 'page-7', title: 'Calendar', icon: <Calendar style={{ width: 16, height: 16 }} />, description: 'Event calendar', keywords: ['schedule', 'events'] },
      { id: 'page-8', title: 'Notifications', icon: <Bell style={{ width: 16, height: 16 }} />, description: 'Alert settings', keywords: ['alerts', 'messages'] },
    ],
  },
  {
    id: 'actions',
    heading: 'Quick Actions',
    icon: <Lightning style={{ width: 16, height: 16 }} />,
    priority: 2,
    items: [
      { id: 'action-1', title: 'Create New Document', icon: <Plus style={{ width: 16, height: 16 }} />, description: 'Start fresh', keywords: ['new', 'add'] },
      { id: 'action-2', title: 'Send Email', icon: <Envelope style={{ width: 16, height: 16 }} />, description: 'Compose message', keywords: ['mail', 'compose'] },
      { id: 'action-3', title: 'Toggle Dark Mode', icon: <Moon style={{ width: 16, height: 16 }} />, description: 'Switch theme', keywords: ['theme', 'light'] },
      { id: 'action-4', title: 'Sign Out', icon: <SignOut style={{ width: 16, height: 16 }} />, description: 'End session', keywords: ['logout', 'exit'] },
      { id: 'action-5', title: 'Download Report', icon: <Download style={{ width: 16, height: 16 }} />, description: 'Export data', keywords: ['export', 'save'] },
      { id: 'action-6', title: 'Upload Files', icon: <Upload style={{ width: 16, height: 16 }} />, description: 'Add files', keywords: ['import', 'add'] },
    ],
  },
];

// ─── Demo Component ──────────────────────────────────────────────────────────

export default function CentralizedSearchDemo() {
  // Controlled state example
  const [controlledOpen, setControlledOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (item) => {
    toast({
      title: 'Item Selected',
      description: `You selected: ${item.title}`,
    });
  };

  const handleTagSelect = (tag) => {
    toast({
      title: 'Tag Selected',
      description: `Filtering by tag: ${tag.label || tag.value}`,
    });
  };

  const simulateLoading = () => {
    setLoadingOpen(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <ComponentPage
      name="Centralized Search"
      description="A powerful command palette / spotlight search component with keyboard shortcuts, live filtering, tag mode, grouped results, and customizable behavior. Perfect for quick navigation, actions, and content discovery."
      importCode={`import {
  CentralizedSearch,
  CentralizedSearchTrigger,
  useCentralizedSearchState,
} from 'invin-uix/ui/centralized-search';`}
    >
      <Toaster position="top-right" />

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with CentralizedSearch props in real-time. Press Ctrl+K or click the trigger to open."
        controls={[
          {
            name: 'size',
            label: 'Dialog Size',
            type: 'select',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (450px)' },
              { value: 'md', label: 'Medium (600px)' },
              { value: 'lg', label: 'Large (750px)' },
            ],
          },
          {
            name: 'position',
            label: 'Dialog Position',
            type: 'select',
            default: 'top',
            options: [
              { value: 'top', label: 'Top' },
              { value: 'center', label: 'Center' },
            ],
          },
          {
            name: 'enableTagMode',
            label: 'Enable Tag Mode (#)',
            type: 'boolean',
            default: true,
          },
          {
            name: 'showRecentItems',
            label: 'Show Recent Items',
            type: 'boolean',
            default: true,
          },
          {
            name: 'showShortcutHint',
            label: 'Show Shortcut Hint',
            type: 'boolean',
            default: true,
          },
          {
            name: 'showCloseButton',
            label: 'Show Close Button',
            type: 'boolean',
            default: false,
          },
          {
            name: 'loop',
            label: 'Loop Navigation',
            type: 'boolean',
            default: false,
          },
          {
            name: 'highlightMatches',
            label: 'Highlight Matches',
            type: 'boolean',
            default: false,
          },
          {
            name: 'showItemCount',
            label: 'Show Item Count',
            type: 'boolean',
            default: true,
          },
          {
            name: 'closeOnTagSelect',
            label: 'Close on Tag Select',
            type: 'boolean',
            default: true,
          },
        ]}
      >
        {(props) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [open, setOpen] = useState(false);
          
          return (
            <div className="flex flex-col items-center gap-4">
              <CentralizedSearchTrigger
                shortcut="ctrl+k"
                onClick={() => setOpen(true)}
              />
              <CentralizedSearch
                groups={sampleGroups}
                tags={props.enableTagMode ? sampleTags : undefined}
                recentItems={props.showRecentItems ? sampleRecentItems : undefined}
                open={open}
                onOpenChange={setOpen}
                onSelect={(item) => {
                  handleSelect(item);
                  setOpen(false);
                }}
                onTagSelect={(tag) => {
                  handleTagSelect(tag);
                  if (props.closeOnTagSelect) setOpen(false);
                }}
                shortcut="ctrl+k"
                showShortcutHint={props.showShortcutHint}
                enableTagMode={props.enableTagMode}
                closeOnTagSelect={props.closeOnTagSelect}
                emptyMessage="No results found. Try a different search term."
                // New props
                size={props.size}
                position={props.position}
                showCloseButton={props.showCloseButton}
                loop={props.loop}
                highlightMatches={props.highlightMatches}
                showItemCount={props.showItemCount}
              />
              <p className="text-sm text-[var(--muted-foreground)]">
                Press Ctrl+K (or ⌘K on Mac) to open, or click the trigger above
              </p>
            </div>
          );
        }}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Tables ─────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">
            CentralizedSearch Props
          </p>
          <PropsTable
            props={[
              // Core Props
              { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
              { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback when open state changes' },
              { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Input placeholder text' },
              { name: 'tagPlaceholder', type: 'string', default: '"Type tag name..."', description: 'Placeholder when in tag mode' },
              { name: 'shortcut', type: 'string', default: '"ctrl+k"', description: 'Keyboard shortcut to toggle' },
              { name: 'groups', type: 'CentralizedSearchGroupType[]', default: '[]', description: 'Groups of searchable items' },
              { name: 'recentItems', type: 'CentralizedSearchItemType[]', default: '[]', description: 'Recently visited items' },
              { name: 'maxRecentItems', type: 'number', default: '5', description: 'Maximum recent items to display' },
              { name: 'tags', type: 'CentralizedSearchTag[]', default: '[]', description: 'Tags for tag mode filtering' },
              { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Footer content' },
              { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
              { name: 'emptyMessage', type: 'string', default: '"No results found."', description: 'Message when no results' },
              { name: 'onSelect', type: '(item) => void', default: '—', description: 'Callback when item is selected' },
              { name: 'onTagSelect', type: '(tag) => void', default: '—', description: 'Callback when tag is selected' },
              { name: 'onSearchChange', type: '(value) => void', default: '—', description: 'Callback when search changes' },
              { name: 'filter', type: '(item, search) => boolean', default: 'built-in', description: 'Custom filter function' },
              { name: 'showShortcutHint', type: 'boolean', default: 'true', description: 'Show shortcut hint in UI' },
              { name: 'enableTagMode', type: 'boolean', default: 'true', description: 'Enable # prefix for tag mode' },
              { name: 'closeOnTagSelect', type: 'boolean', default: 'true', description: 'Close dialog after selecting a tag' },
              // Layout/Sizing Props (Category A)
              { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dialog size preset (450px/600px/750px)' },
              { name: 'maxHeight', type: 'string', default: '"60vh"', description: 'Maximum height of the dialog' },
              { name: 'position', type: '"top" | "center"', default: '"top"', description: 'Dialog position on screen' },
              // Behavior Props (Category B)
              { name: 'loop', type: 'boolean', default: 'false', description: 'Loop keyboard navigation at boundaries' },
              { name: 'shouldFilter', type: 'boolean', default: 'true', description: 'Enable built-in filtering (false for external)' },
              { name: 'disablePointerSelection', type: 'boolean', default: 'false', description: 'Disable mouse selection, keyboard only' },
              { name: 'closeOnSelect', type: 'boolean', default: 'true', description: 'Close dialog when item is selected' },
              // Accessibility Props (Category C)
              { name: 'showCloseButton', type: 'boolean', default: 'false', description: 'Show close button in header' },
              { name: 'label', type: 'string', default: '"Search"', description: 'Accessible label for the dialog' },
              { name: 'autoFocus', type: 'boolean', default: 'true', description: 'Auto-focus search input when opened' },
              // Visual Props (Category D)
              { name: 'showItemCount', type: 'boolean', default: 'true', description: 'Show item count in group headers' },
              { name: 'showGroupIcons', type: 'boolean', default: 'true', description: 'Show icons in group headers' },
              { name: 'itemHeight', type: 'number', default: 'undefined', description: 'Fixed height for items (virtual scroll prep)' },
              // Advanced Props (Category E)
              { name: 'container', type: 'HTMLElement', default: 'undefined', description: 'Custom portal container element' },
              { name: 'onSearchClear', type: '() => void', default: '—', description: 'Callback when search is cleared' },
              { name: 'defaultValue', type: 'string', default: '""', description: 'Default search value (uncontrolled)' },
              { name: 'value', type: 'string', default: 'undefined', description: 'Controlled search value' },
              { name: 'highlightMatches', type: 'boolean', default: 'false', description: 'Highlight matching text in results' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">
            CentralizedSearchTrigger Props
          </p>
          <PropsTable
            props={[
              { name: 'shortcut', type: 'string', default: '"ctrl+k"', description: 'Shortcut to display' },
              { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Trigger button size' },
              { name: 'variant', type: '"default" | "outline" | "ghost"', default: '"default"', description: 'Visual variant' },
              { name: 'showIcon', type: 'boolean', default: 'true', description: 'Show search icon' },
              { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width trigger' },
              { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes' },
              { name: 'onClick', type: '() => void', default: '—', description: 'Click handler' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">
            CentralizedSearchGroupType
          </p>
          <PropsTable
            props={[
              { name: 'id', type: 'string', default: '—', description: 'Unique identifier' },
              { name: 'heading', type: 'string', default: '—', description: 'Group heading text' },
              { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icon for group header' },
              { name: 'items', type: 'CentralizedSearchItemType[]', default: '[]', description: 'Items in this group' },
              { name: 'priority', type: 'number', default: '100', description: 'Display order (lower = higher)' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">
            CentralizedSearchItemType
          </p>
          <PropsTable
            props={[
              { name: 'id', type: 'string', default: '—', description: 'Unique identifier' },
              { name: 'title', type: 'string', default: '—', description: 'Display title' },
              { name: 'description', type: 'string', default: 'undefined', description: 'Subtitle/description' },
              { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Icon element' },
              { name: 'keywords', type: 'string[]', default: '[]', description: 'Extra search keywords' },
              { name: 'tags', type: 'string[]', default: '[]', description: 'Tags associated with item' },
              { name: 'onSelect', type: '() => void', default: 'undefined', description: 'Item-specific action' },
              { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable item' },
              { name: 'data', type: 'Record<string, unknown>', default: 'undefined', description: 'Custom data' },
            ]}
          />
        </div>
      </div>

      <Separator variant="bold" />

      {/* ─── Basic Usage ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic Usage"
        description="The simplest setup with groups and a trigger button. The search automatically filters items as you type."
        code={`import { CentralizedSearch, CentralizedSearchTrigger } from 'invin-uix/ui/centralized-search';
import { House, Users, Gear, Folder } from 'invin-uix/ui/icons';

const groups = [
  {
    id: 'pages',
    heading: 'Pages',
    icon: <Folder style={{ width: 16, height: 16 }} />,
    items: [
      { id: '1', title: 'Dashboard', icon: <House style={{ width: 16, height: 16 }} /> },
      { id: '2', title: 'Users', icon: <Users style={{ width: 16, height: 16 }} /> },
      { id: '3', title: 'Settings', icon: <Gear style={{ width: 16, height: 16 }} /> },
    ],
  },
];

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CentralizedSearchTrigger onClick={() => setOpen(true)} />
      <CentralizedSearch
        groups={groups}
        open={open}
        onOpenChange={setOpen}
        onSelect={(item) => console.log('Selected:', item)}
      />
    </>
  );
}`}
      >
        <BasicUsageDemo />
      </PlaygroundSection>

      {/* ─── Size Variants ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Size Variants"
        description="Three dialog sizes to fit different use cases. Small for simple searches, medium for standard use, large for rich content."
        code={`// Small - compact, minimal (450px)
<CentralizedSearch size="sm" />

// Medium - standard, default (600px)
<CentralizedSearch size="md" />

// Large - expanded, detailed (750px)
<CentralizedSearch size="lg" />

// Custom max height
<CentralizedSearch maxHeight="50vh" />`}
      >
        <SizeVariantsDemo />
      </PlaygroundSection>

      {/* ─── Trigger Variants ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Trigger Variants"
        description="Customize the trigger button with different sizes, variants, and options."
        code={`// Size variants
<CentralizedSearchTrigger size="sm" />
<CentralizedSearchTrigger size="md" /> // default
<CentralizedSearchTrigger size="lg" />

// Visual variants
<CentralizedSearchTrigger variant="default" /> // filled background
<CentralizedSearchTrigger variant="outline" /> // transparent with border
<CentralizedSearchTrigger variant="ghost" /> // no border

// Options
<CentralizedSearchTrigger showIcon={false} /> // hide search icon
<CentralizedSearchTrigger fullWidth /> // full width trigger`}
      >
        <TriggerVariantsDemo />
      </PlaygroundSection>

      {/* ─── Search Highlighting ─────────────────────────────────── */}
      <PlaygroundSection
        title="Search Highlighting"
        description="Enable highlighting to visually show matching text in results."
        code={`<CentralizedSearch
  groups={groups}
  highlightMatches={true}
  // Matches will be highlighted with accent color background
/>`}
      >
        <HighlightDemo />
      </PlaygroundSection>

      {/* ─── Controlled State ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled State"
        description="Control the open state programmatically. Useful for opening the search from custom buttons or keyboard shortcuts."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  <MagnifyingGlass style={{ width: 14, height: 14 }} />
  Open Search
</Button>

<CentralizedSearch
  groups={groups}
  open={open}
  onOpenChange={setOpen}
  shortcut={undefined} // Disable built-in shortcut when controlling externally
  onSelect={(item) => {
    console.log('Selected:', item);
    setOpen(false);
  }}
/>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Button onClick={() => setControlledOpen(true)}>
              <MagnifyingGlass style={{ width: 14, height: 14 }} />
              Open Search
            </Button>
            <Badge variant="outline">
              {controlledOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>
          <CentralizedSearch
            groups={sampleGroups}
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            shortcut={undefined}
            onSelect={(item) => {
              handleSelect(item);
              setControlledOpen(false);
            }}
          />
        </div>
      </PlaygroundSection>

      {/* ─── With Tags ─────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Tag Mode"
        description="Type '#' to enter tag mode for category-based filtering. Tags are displayed as colored pills."
        code={`const tags = [
  { value: 'security', label: 'Security', color: 'var(--destructive)' },
  { value: 'users', label: 'Users', color: 'var(--info)' },
  { value: 'reports', label: 'Reports', color: 'var(--success)' },
  { value: 'settings', label: 'Settings', color: 'var(--warning)' },
];

<CentralizedSearch
  groups={groups}
  tags={tags}
  enableTagMode={true}
  closeOnTagSelect={false} // Keep open to show filtered results
  onTagSelect={(tag) => console.log('Tag selected:', tag)}
/>`}
      >
        <TagModeDemo />
      </PlaygroundSection>

      {/* ─── With Recent Items ──────────────────────────────────── */}
      <PlaygroundSection
        title="Recent Items"
        description="Show recently visited items at the top of the search results for quick access."
        code={`const recentItems = [
  { 
    id: 'recent-1', 
    title: 'Security Dashboard', 
    icon: <Shield style={{ width: 16, height: 16 }} />,
    description: 'Last visited 2 hours ago' 
  },
  { 
    id: 'recent-2', 
    title: 'User Management', 
    icon: <Users style={{ width: 16, height: 16 }} />,
    description: 'Last visited yesterday' 
  },
];

<CentralizedSearch
  groups={groups}
  recentItems={recentItems}
  maxRecentItems={5}
  onSelect={(item) => console.log('Selected:', item)}
/>`}
      >
        <RecentItemsDemo />
      </PlaygroundSection>

      {/* ─── Loading State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show a loading indicator when fetching search results asynchronously."
        code={`const [loading, setLoading] = useState(false);
const [results, setResults] = useState([]);

const handleSearchChange = async (query) => {
  setLoading(true);
  const data = await fetchResults(query);
  setResults(data);
  setLoading(false);
};

<CentralizedSearch
  groups={results}
  loading={loading}
  onSearchChange={handleSearchChange}
  emptyMessage="No results found."
/>`}
      >
        <div className="flex flex-col gap-4">
          <Button onClick={simulateLoading}>
            <MagnifyingGlass style={{ width: 14, height: 14 }} />
            Open with Loading (2s delay)
          </Button>
          <CentralizedSearch
            groups={isLoading ? [] : sampleGroups}
            open={loadingOpen}
            onOpenChange={setLoadingOpen}
            loading={isLoading}
            shortcut={undefined}
            onSelect={(item) => {
              handleSelect(item);
              setLoadingOpen(false);
            }}
          />
        </div>
      </PlaygroundSection>

      {/* ─── Custom Trigger Styles ────────────────────────────────── */}
      <PlaygroundSection
        title="Custom Trigger Styles"
        description="The trigger button can be customized or replaced with your own button design."
        code={`// Default trigger
<CentralizedSearchTrigger 
  placeholder="Search..." 
  shortcut="ctrl+k"
  onClick={() => setOpen(true)} 
/>

// Custom button as trigger
<Button variant="outline" onClick={() => setOpen(true)}>
  <MagnifyingGlass style={{ width: 14, height: 14 }} />
  Quick Search
  <Badge variant="secondary" size="sm">⌘K</Badge>
</Button>

// Minimal icon-only trigger
<Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
  <MagnifyingGlass style={{ width: 18, height: 18 }} />
</Button>`}
      >
        <CustomTriggerDemo />
      </PlaygroundSection>

      {/* ─── Custom Filter Function ──────────────────────────────── */}
      <PlaygroundSection
        title="Custom Filter Function"
        description="Provide a custom filter function for advanced filtering logic like fuzzy matching or weighted scoring."
        code={`<CentralizedSearch
  groups={groups}
  filter={(item, query) => {
    const q = query.toLowerCase();
    // Match title
    if (item.title.toLowerCase().includes(q)) return true;
    // Match description
    if (item.description?.toLowerCase().includes(q)) return true;
    // Match keywords
    if (item.keywords?.some(k => k.toLowerCase().includes(q))) return true;
    return false;
  }}
/>`}
      >
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Code style={{ width: 16, height: 16 }} />
              Custom Filter Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              The default filter matches title, description, and keywords. Override it for custom logic:
            </p>
            <pre className="bg-[var(--muted)] p-3 rounded-md text-xs overflow-x-auto">
{`filter={(item, query) => {
  const q = query.toLowerCase();
  
  // Exact title match gets priority
  if (item.title.toLowerCase() === q) return true;
  
  // Partial matches
  return (
    item.title.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.keywords?.some(k => k.includes(q))
  );
}}`}
            </pre>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Keyboard Navigation ──────────────────────────────────── */}
      <PlaygroundSection
        title="Keyboard Navigation"
        description="Full keyboard support for accessibility and power users. The component follows WAI-ARIA patterns."
        code={`// Keyboard shortcuts are built-in:
// - Ctrl+K / ⌘K: Open search
// - ↑/↓: Navigate items
// - Enter: Select item
// - Escape: Close search
// - #: Enter tag mode

// Custom shortcut
<CentralizedSearch
  shortcut="ctrl+p" // VS Code style
  // or
  shortcut="ctrl+shift+p" // Command palette style
/>`}
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Keyboard style={{ width: 16, height: 16 }} />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span>Open search</span>
                <div className="flex gap-1">
                  <Badge variant="secondary">Ctrl</Badge>
                  <Badge variant="secondary">K</Badge>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Navigate up</span>
                <Badge variant="secondary">↑</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Navigate down</span>
                <Badge variant="secondary">↓</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Select item</span>
                <Badge variant="secondary">Enter</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Close search</span>
                <Badge variant="secondary">Escape</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Enter tag mode</span>
                <Badge variant="secondary">#</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── With Footer ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Custom Footer"
        description="Add a custom footer for additional actions, tips, or navigation hints."
        code={`<CentralizedSearch
  groups={groups}
  footer={
    <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
      <span>Pro tip: Use # to filter by tags</span>
      <div className="flex gap-2">
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>Esc Close</span>
      </div>
    </div>
  }
/>`}
      >
        <FooterDemo />
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases Section ───────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use Cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Real-world examples showing how to use CentralizedSearch in different scenarios.</p>
      </div>

      {/* ─── Navigation Use Case ─────────────────────────────────── */}
      <PlaygroundSection
        title="App Navigation"
        description="Use as a global navigation tool. Map items to routes and navigate on selection."
        code={`import { useNavigate } from 'react-router-dom';

function AppSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const groups = [
    {
      id: 'pages',
      heading: 'Pages',
      items: [
        { id: '1', title: 'Dashboard', data: { path: '/dashboard' } },
        { id: '2', title: 'Users', data: { path: '/users' } },
        { id: '3', title: 'Settings', data: { path: '/settings' } },
      ],
    },
  ];

  const handleSelect = (item) => {
    navigate(item.data.path);
    setOpen(false);
  };

  return (
    <CentralizedSearch
      groups={groups}
      open={open}
      onOpenChange={setOpen}
      onSelect={handleSelect}
    />
  );
}`}
      >
        <NavigationDemo />
      </PlaygroundSection>

      {/* ─── Security Dashboard Use Case ─────────────────────────── */}
      <PlaygroundSection
        title="Security Operations Center"
        description="A real-world example for a security dashboard with threat severity tags and quick actions."
        code={`const securityGroups = [
  {
    id: 'alerts',
    heading: 'Active Alerts',
    icon: <Warning />,
    priority: 0,
    items: [
      { id: '1', title: 'View Active Threats', description: '3 critical alerts' },
    ],
  },
  {
    id: 'pages',
    heading: 'Security Pages',
    icon: <Shield />,
    items: [
      { id: '2', title: 'Security Dashboard' },
      { id: '3', title: 'Incident Response' },
      { id: '4', title: 'Threat Intelligence' },
    ],
  },
  {
    id: 'actions',
    heading: 'Quick Actions',
    icon: <Lightning />,
    items: [
      { id: '5', title: 'Generate Report' },
      { id: '6', title: 'Block IP Address' },
    ],
  },
];

const severityTags = [
  { value: 'critical', label: 'Critical', color: '#ef4444' },
  { value: 'high', label: 'High', color: '#f97316' },
  { value: 'medium', label: 'Medium', color: '#eab308' },
  { value: 'low', label: 'Low', color: '#22c55e' },
];`}
      >
        <SecurityDashboardExample />
      </PlaygroundSection>

      {/* ─── Command Actions Use Case ────────────────────────────── */}
      <PlaygroundSection
        title="Command Actions"
        description="Use individual item onSelect for different actions per item."
        code={`const groups = [
  {
    id: 'actions',
    heading: 'Actions',
    items: [
      { 
        id: '1', 
        title: 'Toggle Dark Mode',
        onSelect: () => toggleTheme(),
      },
      { 
        id: '2', 
        title: 'Copy Current URL',
        onSelect: () => navigator.clipboard.writeText(window.location.href),
      },
      { 
        id: '3', 
        title: 'Export as PDF',
        onSelect: () => exportToPDF(),
      },
    ],
  },
];

// Items with onSelect will call that instead of the global onSelect`}
      >
        <CommandActionsDemo />
      </PlaygroundSection>

    </ComponentPage>
  );
}

// ─── Helper Demo Components ──────────────────────────────────────────────────

function BasicUsageDemo() {
  const [open, setOpen] = useState(false);
  
  const basicGroups = [
    {
      id: 'pages',
      heading: 'Pages',
      icon: <Folder style={{ width: 16, height: 16 }} />,
      items: [
        { id: '1', title: 'Dashboard', icon: <House style={{ width: 16, height: 16 }} />, description: 'Main overview' },
        { id: '2', title: 'Users', icon: <Users style={{ width: 16, height: 16 }} />, description: 'User management' },
        { id: '3', title: 'Settings', icon: <Gear style={{ width: 16, height: 16 }} />, description: 'App settings' },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-start gap-4">
      <CentralizedSearchTrigger onClick={() => setOpen(true)} placeholder="Search pages..." />
      <CentralizedSearch
        groups={basicGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}

function TagModeDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <p className="text-sm text-[var(--muted-foreground)] w-full mb-2">Available tags:</p>
        {sampleTags.map((tag) => (
          <Badge
            key={tag.value}
            variant="outline"
            style={{ borderColor: tag.color, color: tag.color }}
          >
            #{tag.label || tag.value}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Tag style={{ width: 14, height: 14 }} />
          Open Tag Mode Demo
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">
          Type <code className="bg-[var(--muted)] px-1 rounded">#</code> after opening
        </span>
      </div>
      <CentralizedSearch
        groups={sampleGroups}
        tags={sampleTags}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        enableTagMode={true}
        closeOnTagSelect={false}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
        onTagSelect={(tag) => {
          toast({ title: 'Tag Filter', description: `Filtering by: ${tag.label}` });
        }}
      />
    </div>
  );
}

function RecentItemsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Recent Items Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {sampleRecentItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-sm">
                {item.icon}
                <span>{item.title}</span>
                <span className="text-[var(--muted-foreground)] ml-auto text-xs">{item.description}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open to See Recent Items
      </Button>
      <CentralizedSearch
        groups={sampleGroups}
        recentItems={sampleRecentItems}
        maxRecentItems={5}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}

function CustomTriggerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Default trigger */}
      <CentralizedSearchTrigger
        placeholder="Default trigger..."
        onClick={() => setOpen(true)}
      />
      
      {/* Custom button trigger */}
      <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
        <MagnifyingGlass style={{ width: 14, height: 14 }} />
        Quick Search
        <Badge variant="secondary" size="sm">⌘K</Badge>
      </Button>
      
      {/* Icon-only trigger */}
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Search">
        <MagnifyingGlass style={{ width: 18, height: 18 }} />
      </Button>

      <CentralizedSearch
        groups={sampleGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}

function FooterDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open with Footer
      </Button>
      <CentralizedSearch
        groups={sampleGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        footer={
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] px-2">
            <span className="flex items-center gap-1">
              <Info style={{ width: 12, height: 12 }} />
              Pro tip: Use # to filter by tags
            </span>
            <div className="flex gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </div>
        }
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}

function NavigationDemo() {
  const [open, setOpen] = useState(false);

  const navGroups = [
    {
      id: 'pages',
      heading: 'Pages',
      icon: <Folder style={{ width: 16, height: 16 }} />,
      items: [
        { id: '1', title: 'Dashboard', icon: <House style={{ width: 16, height: 16 }} />, data: { path: '/dashboard' } },
        { id: '2', title: 'Analytics', icon: <ChartBar style={{ width: 16, height: 16 }} />, data: { path: '/analytics' } },
        { id: '3', title: 'Users', icon: <Users style={{ width: 16, height: 16 }} />, data: { path: '/users' } },
        { id: '4', title: 'Settings', icon: <Gear style={{ width: 16, height: 16 }} />, data: { path: '/settings' } },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <CentralizedSearchTrigger placeholder="Navigate to..." onClick={() => setOpen(true)} />
      <CentralizedSearch
        groups={navGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        onSelect={(item) => {
          toast({ 
            title: 'Navigation', 
            description: `Would navigate to: ${item.data?.path || item.title}` 
          });
          setOpen(false);
        }}
      />
    </div>
  );
}

function SecurityDashboardExample() {
  const [open, setOpen] = useState(false);
  
  const securityGroups = [
    {
      id: 'alerts',
      heading: 'Active Alerts',
      icon: <Warning style={{ width: 16, height: 16 }} />,
      priority: 0,
      items: [
        { id: 's1', title: 'View Active Threats', icon: <Warning style={{ width: 16, height: 16 }} />, description: '3 critical alerts' },
      ],
    },
    {
      id: 'pages',
      heading: 'Security Pages',
      icon: <Shield style={{ width: 16, height: 16 }} />,
      priority: 1,
      items: [
        { id: 's2', title: 'Security Dashboard', icon: <Shield style={{ width: 16, height: 16 }} />, description: 'Main overview' },
        { id: 's3', title: 'Incident Response', icon: <Lightning style={{ width: 16, height: 16 }} />, description: 'Active incidents' },
        { id: 's4', title: 'Threat Intelligence', icon: <Globe style={{ width: 16, height: 16 }} />, description: 'Latest feeds' },
      ],
    },
    {
      id: 'actions',
      heading: 'Quick Actions',
      icon: <Lightning style={{ width: 16, height: 16 }} />,
      priority: 2,
      items: [
        { id: 's5', title: 'Generate Report', icon: <FileText style={{ width: 16, height: 16 }} />, description: 'Export security report' },
        { id: 's6', title: 'Block IP Address', icon: <XCircle style={{ width: 16, height: 16 }} />, description: 'Add to blocklist' },
        { id: 's7', title: 'Whitelist Domain', icon: <CheckCircle style={{ width: 16, height: 16 }} />, description: 'Add to allowlist' },
      ],
    },
  ];

  const securityTags = [
    { value: 'critical', label: 'Critical', color: '#ef4444' },
    { value: 'high', label: 'High', color: '#f97316' },
    { value: 'medium', label: 'Medium', color: '#eab308' },
    { value: 'low', label: 'Low', color: '#22c55e' },
    { value: 'resolved', label: 'Resolved', color: '#6b7280' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield style={{ width: 20, height: 20 }} />
          Security Operations Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <CentralizedSearchTrigger
            placeholder="Search security features..."
            onClick={() => setOpen(true)}
          />
          <CentralizedSearch
            groups={securityGroups}
            tags={securityTags}
            open={open}
            onOpenChange={setOpen}
            shortcut={undefined}
            placeholder="Search threats, pages, actions..."
            emptyMessage="No security items found."
            closeOnTagSelect={false}
            onSelect={(item) => {
              toast({ title: 'Navigation', description: `Navigating to: ${item.title}` });
              setOpen(false);
            }}
            onTagSelect={(tag) => {
              toast({ title: 'Filter Applied', description: `Filtering by severity: ${tag.label}` });
            }}
          />
          <p className="text-sm text-[var(--muted-foreground)]">
            Try searching for "threat", "report", or type "#" to filter by severity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function CommandActionsDemo() {
  const [open, setOpen] = useState(false);

  const actionGroups = [
    {
      id: 'actions',
      heading: 'Actions',
      icon: <Lightning style={{ width: 16, height: 16 }} />,
      items: [
        { 
          id: '1', 
          title: 'Toggle Dark Mode', 
          icon: <Moon style={{ width: 16, height: 16 }} />,
          description: 'Switch between light and dark',
          onSelect: () => {
            const current = document.documentElement.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
            toast({ title: 'Theme Changed', description: `Switched to ${current === 'dark' ? 'light' : 'dark'} mode` });
          },
        },
        { 
          id: '2', 
          title: 'Copy Current URL', 
          icon: <Globe style={{ width: 16, height: 16 }} />,
          description: 'Copy page URL to clipboard',
          onSelect: () => {
            navigator.clipboard.writeText(window.location.href);
            toast({ title: 'Copied!', description: 'URL copied to clipboard' });
          },
        },
        { 
          id: '3', 
          title: 'Open Documentation', 
          icon: <FileText style={{ width: 16, height: 16 }} />,
          description: 'View component docs',
          onSelect: () => {
            toast({ title: 'Opening Docs', description: 'Would open documentation in new tab' });
          },
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Lightning style={{ width: 14, height: 14 }} />
        Open Command Actions
      </Button>
      <CentralizedSearch
        groups={actionGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        placeholder="Type a command..."
        onSelect={() => setOpen(false)}
      />
      <p className="text-sm text-[var(--muted-foreground)]">
        Each item has its own <code className="bg-[var(--muted)] px-1 rounded">onSelect</code> handler for specific actions.
      </p>
    </div>
  );
}

// ─── New Demo Components for Enhanced Props ──────────────────────────────────

function SizeVariantsDemo() {
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);

  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" onClick={() => setOpenSm(true)}>
        Small (450px)
      </Button>
      <Button variant="outline" onClick={() => setOpenMd(true)}>
        Medium (600px)
      </Button>
      <Button variant="outline" onClick={() => setOpenLg(true)}>
        Large (750px)
      </Button>
      
      <CentralizedSearch
        groups={sampleGroups}
        open={openSm}
        onOpenChange={setOpenSm}
        shortcut={undefined}
        size="sm"
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpenSm(false);
        }}
      />
      <CentralizedSearch
        groups={sampleGroups}
        open={openMd}
        onOpenChange={setOpenMd}
        shortcut={undefined}
        size="md"
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpenMd(false);
        }}
      />
      <CentralizedSearch
        groups={sampleGroups}
        open={openLg}
        onOpenChange={setOpenLg}
        shortcut={undefined}
        size="lg"
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpenLg(false);
        }}
      />
    </div>
  );
}

function TriggerVariantsDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Size variants */}
      <div className="space-y-2">
        <p className="text-sm text-[var(--muted-foreground)] font-medium">Size Variants</p>
        <div className="flex flex-wrap gap-3">
          <CentralizedSearchTrigger size="sm" onClick={() => setOpen(true)}>Small</CentralizedSearchTrigger>
          <CentralizedSearchTrigger size="md" onClick={() => setOpen(true)}>Medium</CentralizedSearchTrigger>
          <CentralizedSearchTrigger size="lg" onClick={() => setOpen(true)}>Large</CentralizedSearchTrigger>
        </div>
      </div>
      
      {/* Visual variants */}
      <div className="space-y-2">
        <p className="text-sm text-[var(--muted-foreground)] font-medium">Visual Variants</p>
        <div className="flex flex-wrap gap-3">
          <CentralizedSearchTrigger variant="default" onClick={() => setOpen(true)}>Default</CentralizedSearchTrigger>
          <CentralizedSearchTrigger variant="outline" onClick={() => setOpen(true)}>Outline</CentralizedSearchTrigger>
          <CentralizedSearchTrigger variant="ghost" onClick={() => setOpen(true)}>Ghost</CentralizedSearchTrigger>
        </div>
      </div>
      
      {/* Options */}
      <div className="space-y-2">
        <p className="text-sm text-[var(--muted-foreground)] font-medium">Options</p>
        <div className="flex flex-wrap gap-3">
          <CentralizedSearchTrigger showIcon={false} onClick={() => setOpen(true)}>No Icon</CentralizedSearchTrigger>
          <div className="w-64">
            <CentralizedSearchTrigger fullWidth onClick={() => setOpen(true)}>Full Width</CentralizedSearchTrigger>
          </div>
        </div>
      </div>

      <CentralizedSearch
        groups={sampleGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}

function HighlightDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Eye style={{ width: 14, height: 14 }} />
          Open with Highlighting
        </Button>
        <span className="text-sm text-[var(--muted-foreground)]">
          Type "dash" or "set" to see matches highlighted
        </span>
      </div>
      <CentralizedSearch
        groups={sampleGroups}
        open={open}
        onOpenChange={setOpen}
        shortcut={undefined}
        highlightMatches={true}
        onSelect={(item) => {
          toast({ title: 'Selected', description: item.title });
          setOpen(false);
        }}
      />
    </div>
  );
}
