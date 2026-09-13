import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose } from 'invin-uix/ui/drawer';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Label } from 'invin-uix/ui/label';
import { Separator } from 'invin-uix/ui/separator';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Gear, Funnel, ShareNetwork, List } from 'invin-uix/ui/icons';

export default function DrawerDemo() {
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setLoadingOpen(false);
  };

  return (
    <ComponentPage
      name="Drawer"
      description="Slide-in panels from any side (left/right/top/bottom). Use for navigation, filters, settings, and detail views. Supports loading state for async operations."
      importCode={`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from 'invin-uix/ui/drawer';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Drawer Playground"
        description="Experiment with different drawer configurations. Click the button to open."
        controls={[
          {
            name: 'side',
            type: 'select',
            label: 'Side',
            default: 'right',
            options: [
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
            ],
          },
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (320px)' },
              { value: 'md', label: 'Medium (400px)' },
              { value: 'lg', label: 'Large (540px)' },
              { value: 'full', label: 'Full' },
            ],
          },
          { name: 'hideClose', type: 'boolean', label: 'Hide Close', default: false },
          { name: 'loading', type: 'boolean', label: 'Loading', default: false },
        ]}
      >
        {(props) => (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer ({props.side}, {props.size})</Button>
            </DrawerTrigger>
            <DrawerContent side={props.side} size={props.size} hideClose={props.hideClose} loading={props.loading}>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>This is a {props.side} drawer panel ({props.size} size).</DrawerDescription>
              </DrawerHeader>
              <div className="py-4">
                <p className="text-[var(--muted-foreground)]">Your content goes here.</p>
                {props.loading && (
                  <p className="text-[var(--accent)] mt-2 text-sm">Loading state active — cannot close via X, overlay, or Escape.</p>
                )}
              </div>
              <DrawerFooter>
                <DrawerClose asChild><Button variant="outline" disabled={props.loading}>Close</Button></DrawerClose>
                <Button disabled={props.loading}>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)] text-xs">DrawerContent Props</p>
        <PropsTable
          props={[
            { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Slide-in direction' },
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Panel width (left/right) or height (top/bottom)' },
            { name: 'hideClose', type: 'boolean', default: 'false', description: 'Hide the X close button' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state — shows spinner, prevents closing' },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)] text-xs">Size Values</p>
        <PropsTable
          props={[
            { name: 'sm', type: 'Left/Right: 320px', default: 'Top/Bottom: 200px', description: 'Narrow panel' },
            { name: 'md', type: 'Left/Right: 400px', default: 'Top/Bottom: 320px', description: 'Default size' },
            { name: 'lg', type: 'Left/Right: 540px', default: 'Top/Bottom: 480px', description: 'Wide panel' },
            { name: 'full', type: '100vw', default: '100vh', description: 'Full screen' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Drawer: Right ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Right (default)"
        description="Slides in from the right. Good for settings, details, and forms."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Settings</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Adjust preferences.</DrawerDescription>
    </DrawerHeader>
    {/* content */}
    <DrawerFooter>
      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline"><Gear style={{ width: 14, height: 14 }} /> Settings</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Adjust your preferences below.</DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label>Display name</Label>
                <Input defaultValue="Admin User" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input defaultValue="admin@invin.io" />
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PlaygroundSection>

      {/* ─── Drawer: Left ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Left"
        description="Slides from left. Common for mobile navigation and sidebars."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="ghost" size="icon"><List /></Button>
  </DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <DrawerTitle>Navigation</DrawerTitle>
    </DrawerHeader>
    {/* nav items */}
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon-sm"><List style={{ width: 16, height: 16 }} /></Button>
          </DrawerTrigger>
          <DrawerContent side="left">
            <DrawerHeader>
              <DrawerTitle>Navigation</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-1 mt-4">
              {['Dashboard', 'Projects', 'Team', 'Settings', 'Help'].map(item => (
                <div key={item} className="px-3 py-2 rounded-md hover:bg-[var(--secondary)] cursor-pointer text-[var(--foreground)]">
                  {item}
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </PlaygroundSection>

      {/* ─── Drawer: Bottom ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Bottom"
        description="Slides up from bottom. Fixed height. Good for quick actions and share menus."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Share</Button>
  </DrawerTrigger>
  <DrawerContent side="bottom">
    <DrawerHeader>
      <DrawerTitle>Share</DrawerTitle>
    </DrawerHeader>
    {/* share options */}
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline"><ShareNetwork style={{ width: 14, height: 14 }} /> Share</Button>
          </DrawerTrigger>
          <DrawerContent side="bottom">
            <DrawerHeader>
              <DrawerTitle>Share this project</DrawerTitle>
              <DrawerDescription>Anyone with the link can view.</DrawerDescription>
            </DrawerHeader>
            <div className="flex gap-2 mt-3">
              <Input defaultValue="https://app.invin.io/project/abc123" readOnly className="flex-1" />
              <Button size="sm">Copy</Button>
            </div>
          </DrawerContent>
        </Drawer>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Use loading prop during async operations. Drawer cannot be closed while loading."
        code={`const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

const handleSave = async () => {
  setLoading(true);
  await saveSettings();
  setLoading(false);
  setOpen(false);
};

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button>Settings</Button>
  </DrawerTrigger>
  <DrawerContent loading={loading}>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
    </DrawerHeader>
    {/* form */}
    <DrawerFooter>
      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer open={loadingOpen} onOpenChange={setLoadingOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Save Settings (with loading)</Button>
          </DrawerTrigger>
          <DrawerContent loading={isLoading}>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Click save to see loading state (2s delay).</DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label>Username</Label>
                <Input defaultValue="admin" disabled={isLoading} />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input defaultValue="admin@invin.io" disabled={isLoading} />
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild><Button variant="outline" disabled={isLoading}>Cancel</Button></DrawerClose>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Filter Panel ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Filter Panel"
        description="Right-side filter panel for data tables."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline" size="sm"><Funnel /> Filters</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader><DrawerTitle>Filters</DrawerTitle></DrawerHeader>
    {/* filter controls */}
    <DrawerFooter>
      <Button variant="outline">Reset</Button>
      <Button>Apply</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm"><Funnel style={{ width: 14, height: 14 }} /> Filters</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Narrow down results.</DrawerDescription>
            </DrawerHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Input placeholder="All statuses" />
              </div>
              <div className="space-y-1.5">
                <Label>Date range</Label>
                <Input type="date" />
              </div>
              <div className="space-y-1.5">
                <Label>Assigned to</Label>
                <Input placeholder="Any member" />
              </div>
            </div>
            <DrawerFooter>
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── When to Use ────────────────────────────────────────── */}
      <Card>
        <CardContent className="py-4">
          <div className="space-y-3 text-[var(--foreground)]">
            <p className="font-[600] text-sm">When to use each side</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Right</span>
                <span className="text-[var(--muted-foreground)]">Settings, details, forms, filters (most common)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Left</span>
                <span className="text-[var(--muted-foreground)]">Navigation, sidebar menus, mobile nav</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Bottom</span>
                <span className="text-[var(--muted-foreground)]">Share menus, quick actions, mobile actions</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Top</span>
                <span className="text-[var(--muted-foreground)]">Announcements, global alerts (rare)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="py-4">
          <div className="space-y-3 text-[var(--foreground)]">
            <p className="font-[600] text-sm">Drawer vs Dialog</p>
            <div className="flex gap-3 text-sm">
              <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Drawer</span>
              <span className="text-[var(--muted-foreground)]">Slides from edge. Use for navigation, filters, settings, detail views.</span>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="text-[var(--accent)] font-[600] shrink-0 w-16">Dialog</span>
              <span className="text-[var(--muted-foreground)]">Centered modal. Use for confirmations, alerts, short forms.</span>
            </div>
          </div>
        </CardContent>
      </Card>

    </ComponentPage>
  );
}
