import { useState } from 'react';
import { ComponentPage, PlaygroundSection, InteractiveDemo, PropsTable } from '../../components/PlaygroundSection.jsx';
import { 
  ContextMenu, 
  ContextMenuTrigger, 
  ContextMenuContent, 
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from 'invin-uix/ui/context-menu';
import { Separator } from 'invin-uix/ui/separator';

// Simple icons for demos
const CutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

export default function ContextMenuDemo() {
  const [showHidden, setShowHidden] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = (action) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const contextMenuItemProps = [
    { name: 'icon', type: 'ReactNode', default: '-', description: 'Icon displayed before item text' },
    { name: 'shortcut', type: 'string', default: '-', description: 'Keyboard shortcut hint (right-aligned)' },
    { name: 'description', type: 'string', default: '-', description: 'Description text below the item' },
    { name: 'destructive', type: 'boolean', default: 'false', description: 'Red styling for dangerous actions' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner, disables interaction' },
    { name: 'badge', type: 'ReactNode', default: '-', description: 'Badge content after item text' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the menu item' },
    { name: 'onSelect', type: '() => void', default: '-', description: 'Called when item is selected' },
  ];

  const contextMenuCheckboxProps = [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', default: '-', description: 'Callback when checked changes' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox item' },
  ];

  const contextMenuRadioProps = [
    { name: 'value', type: 'string', required: true, default: '-', description: 'Value for radio selection' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the radio item' },
  ];

  return (
    <ComponentPage
      name="Context Menu"
      description="A menu that appears on right-click, providing contextual actions. Supports icons, shortcuts, submenus, checkbox/radio items, and destructive actions."
      importCode={`import { 
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuRadioGroup,
  ContextMenuSeparator, ContextMenuLabel, ContextMenuSub, 
  ContextMenuSubTrigger, ContextMenuSubContent 
} from 'invin-uix/ui/context-menu';`}
    >
      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Context Menu Playground"
        description="Right-click in the area below to open the context menu with all features."
        controls={[]}
      >
        {() => (
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex items-center justify-center h-40 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none bg-surface/50 hover:bg-surface transition-colors">
                <div className="text-center">
                  <div className="text-lg font-medium mb-1">Right-click here</div>
                  <div className="text-caption text-muted-foreground-faint">Opens full-featured context menu</div>
                </div>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<CutIcon />} shortcut="⌘X">Cut</ContextMenuItem>
              <ContextMenuItem icon={<CopyIcon />} shortcut="⌘C">Copy</ContextMenuItem>
              <ContextMenuItem icon={<ClipboardIcon />} shortcut="⌘V">Paste</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem icon={<MailIcon />}>Email</ContextMenuItem>
                  <ContextMenuItem icon={<LinkIcon />}>Copy Link</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<TrashIcon />} destructive shortcut="⌫">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
      </InteractiveDemo>

      <PropsTable title="ContextMenuItem Props" props={contextMenuItemProps} />
      <PropsTable title="ContextMenuCheckboxItem Props" props={contextMenuCheckboxProps} />
      <PropsTable title="ContextMenuRadioItem Props" props={contextMenuRadioProps} />

      <Separator variant="bold" />

      {/* ─── Icons and Shortcuts ─────────────────────────────── */}
      <PlaygroundSection
        title="Icons and Shortcuts"
        description="Menu items can display icons and keyboard shortcut hints."
        code={`<ContextMenuItem icon={<CutIcon />} shortcut="⌘X">Cut</ContextMenuItem>
<ContextMenuItem icon={<CopyIcon />} shortcut="⌘C">Copy</ContextMenuItem>
<ContextMenuItem icon={<ClipboardIcon />} shortcut="⌘V">Paste</ContextMenuItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for icons & shortcuts
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem icon={<CutIcon />} shortcut="⌘X">Cut</ContextMenuItem>
            <ContextMenuItem icon={<CopyIcon />} shortcut="⌘C">Copy</ContextMenuItem>
            <ContextMenuItem icon={<ClipboardIcon />} shortcut="⌘V">Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem icon={<EditIcon />} shortcut="⌘E">Edit</ContextMenuItem>
            <ContextMenuItem icon={<DownloadIcon />} shortcut="⌘D">Download</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Submenus ─────────────────────────────── */}
      <PlaygroundSection
        title="Submenus"
        description="Nested menus for organizing related actions."
        code={`<ContextMenuSub>
  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Email</ContextMenuItem>
    <ContextMenuItem>Slack</ContextMenuItem>
    <ContextMenuItem>Copy Link</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for submenus
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem icon={<FileIcon />}>New File</ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem icon={<MailIcon />}>Email</ContextMenuItem>
                <ContextMenuItem>Slack</ContextMenuItem>
                <ContextMenuItem>Microsoft Teams</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem icon={<LinkIcon />}>Copy Link</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem icon={<FolderIcon />}>Documents</ContextMenuItem>
                <ContextMenuItem icon={<FolderIcon />}>Downloads</ContextMenuItem>
                <ContextMenuItem icon={<FolderIcon />}>Archive</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Checkbox Items ─────────────────────────────── */}
      <PlaygroundSection
        title="Checkbox Items"
        description="Toggle options within the context menu. Current: Hidden={showHidden ? 'on' : 'off'}, Preview={showPreview ? 'on' : 'off'}"
        code={`<ContextMenuCheckboxItem 
  checked={showHidden} 
  onCheckedChange={setShowHidden}
>
  Show Hidden Files
</ContextMenuCheckboxItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for checkbox items (Hidden: {showHidden ? 'ON' : 'OFF'}, Preview: {showPreview ? 'ON' : 'OFF'})
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>View Options</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
              Show Hidden Files
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showPreview} onCheckedChange={setShowPreview}>
              Show Preview Panel
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked disabled>
              Always Show Toolbar (locked)
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Radio Groups ─────────────────────────────── */}
      <PlaygroundSection
        title="Radio Groups"
        description={`Single selection within a group. Current sort: "${sortBy}"`}
        code={`<ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
  <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
  <ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
  <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
</ContextMenuRadioGroup>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for radio selection (Sort: {sortBy})
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Sort By</ContextMenuLabel>
            <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
              <ContextMenuRadioItem value="date">Date Modified</ContextMenuRadioItem>
              <ContextMenuRadioItem value="size">Size</ContextMenuRadioItem>
              <ContextMenuRadioItem value="type">Type</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Destructive Actions ─────────────────────────────── */}
      <PlaygroundSection
        title="Destructive Actions"
        description="Red styling for dangerous or irreversible actions."
        code={`<ContextMenuItem destructive icon={<TrashIcon />}>
  Delete permanently
</ContextMenuItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for destructive actions
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem icon={<EditIcon />}>Edit</ContextMenuItem>
            <ContextMenuItem icon={<CopyIcon />}>Duplicate</ContextMenuItem>
            <ContextMenuItem icon={<StarIcon />}>Add to Favorites</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem destructive icon={<TrashIcon />}>Move to Trash</ContextMenuItem>
            <ContextMenuItem destructive icon={<TrashIcon />} shortcut="⇧⌘⌫">Delete Permanently</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Badges ─────────────────────────────── */}
      <PlaygroundSection
        title="Badges"
        description="Display counts or status indicators on menu items."
        code={`<ContextMenuItem badge="New">New Feature</ContextMenuItem>
<ContextMenuItem badge={5}>Notifications</ContextMenuItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for badges
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem badge="New">New Feature</ContextMenuItem>
            <ContextMenuItem badge={5}>Notifications</ContextMenuItem>
            <ContextMenuItem badge="3">Pending Tasks</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem badge="Beta" icon={<StarIcon />}>Premium Feature</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Loading State ─────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show a spinner while an action is processing."
        code={`<ContextMenuItem loading>Saving...</ContextMenuItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for loading state (click Save to trigger)
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem loading={isLoading} onSelect={() => handleAction('save')}>
              {isLoading ? 'Saving...' : 'Save'}
            </ContextMenuItem>
            <ContextMenuItem>Save As...</ContextMenuItem>
            <ContextMenuItem disabled>Export (disabled)</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── With Descriptions ─────────────────────────────── */}
      <PlaygroundSection
        title="With Descriptions"
        description="Add helpful descriptions below menu items."
        code={`<ContextMenuItem 
  icon={<DownloadIcon />}
  description="Download file to your computer"
>
  Download
</ContextMenuItem>`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-24 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none">
              Right-click for descriptions
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent style={{ minWidth: '240px' }}>
            <ContextMenuItem icon={<DownloadIcon />} description="Download file to your computer">
              Download
            </ContextMenuItem>
            <ContextMenuItem icon={<ShareIcon />} description="Share with team members">
              Share
            </ContextMenuItem>
            <ContextMenuItem icon={<EyeIcon />} description="Open in preview mode">
              Preview
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── File Browser Example ─────────────────────────────── */}
      <PlaygroundSection
        title="File Browser Example"
        description="Real-world file browser context menu with all features."
        code={`// Complete file browser context menu example`}
      >
        <div className="flex gap-4 flex-wrap">
          {/* File item */}
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-surface cursor-default select-none w-24">
                <FileIcon />
                <span className="text-caption truncate w-full text-center">report.pdf</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<EyeIcon />}>Open</ContextMenuItem>
              <ContextMenuItem icon={<EyeIcon />}>Open With...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<CutIcon />} shortcut="⌘X">Cut</ContextMenuItem>
              <ContextMenuItem icon={<CopyIcon />} shortcut="⌘C">Copy</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem icon={<MailIcon />}>Email</ContextMenuItem>
                  <ContextMenuItem>AirDrop</ContextMenuItem>
                  <ContextMenuItem icon={<LinkIcon />}>Copy Link</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem icon={<FolderIcon />}>Documents</ContextMenuItem>
                  <ContextMenuItem icon={<FolderIcon />}>Downloads</ContextMenuItem>
                  <ContextMenuItem icon={<FolderIcon />}>Archive</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<EditIcon />}>Rename</ContextMenuItem>
              <ContextMenuItem icon={<StarIcon />}>Add to Favorites</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<TrashIcon />} destructive>Move to Trash</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          {/* Folder item */}
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-surface cursor-default select-none w-24">
                <FolderIcon />
                <span className="text-caption truncate w-full text-center">Projects</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<EyeIcon />}>Open</ContextMenuItem>
              <ContextMenuItem>Open in New Tab</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<FileIcon />}>New File</ContextMenuItem>
              <ContextMenuItem icon={<FolderIcon />}>New Folder</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<EditIcon />}>Rename</ContextMenuItem>
              <ContextMenuItem icon={<StarIcon />}>Add to Favorites</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<TrashIcon />} destructive>Move to Trash</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          {/* Image item */}
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-surface cursor-default select-none w-24">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-caption truncate w-full text-center">photo.jpg</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<EyeIcon />}>Preview</ContextMenuItem>
              <ContextMenuItem>Open in Editor</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Set as Wallpaper</ContextMenuItem>
              <ContextMenuItem>Rotate Left</ContextMenuItem>
              <ContextMenuItem>Rotate Right</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<TrashIcon />} destructive>Move to Trash</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Combined Example ─────────────────────────────── */}
      <PlaygroundSection
        title="Combined Features"
        description="A context menu showcasing all features together."
        code={`// All features combined`}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex items-center justify-center h-32 w-full border-2 border-dashed border-border rounded-lg text-label text-muted-foreground select-none bg-gradient-to-br from-surface to-transparent">
              <div className="text-center">
                <div className="text-lg font-medium mb-1">Complete Context Menu</div>
                <div className="text-caption text-muted-foreground-faint">Right-click to see all features</div>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent style={{ minWidth: '220px' }}>
            <ContextMenuLabel>Actions</ContextMenuLabel>
            <ContextMenuItem icon={<EditIcon />} shortcut="⌘E">Edit</ContextMenuItem>
            <ContextMenuItem icon={<CopyIcon />} shortcut="⌘D" description="Create a copy of this item">
              Duplicate
            </ContextMenuItem>
            <ContextMenuItem icon={<DownloadIcon />} badge="New">Export</ContextMenuItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuLabel>View Options</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
              Show Hidden
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showPreview} onCheckedChange={setShowPreview}>
              Preview Panel
            </ContextMenuCheckboxItem>
            
            <ContextMenuSeparator />
            
            <ContextMenuLabel>Sort</ContextMenuLabel>
            <ContextMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <ContextMenuRadioItem value="name">By Name</ContextMenuRadioItem>
              <ContextMenuRadioItem value="date">By Date</ContextMenuRadioItem>
              <ContextMenuRadioItem value="size">By Size</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            
            <ContextMenuSeparator />
            
            <ContextMenuSub>
              <ContextMenuSubTrigger>More Actions</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem icon={<ShareIcon />}>Share</ContextMenuItem>
                <ContextMenuItem icon={<StarIcon />}>Favorite</ContextMenuItem>
                <ContextMenuItem icon={<LinkIcon />}>Copy Link</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            
            <ContextMenuSeparator />
            
            <ContextMenuItem icon={<TrashIcon />} destructive shortcut="⌫">
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </PlaygroundSection>
    </ComponentPage>
  );
}
