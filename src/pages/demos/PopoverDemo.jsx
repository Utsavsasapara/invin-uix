import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'invin-uix/ui/popover';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Label } from 'invin-uix/ui/label';
import { Separator } from 'invin-uix/ui/separator';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Switch } from 'invin-uix/ui/switch';
import { Gear, Funnel, ShareNetwork, Bell } from 'invin-uix/ui/icons';

export default function PopoverDemo() {
  return (
    <ComponentPage
      name="Popover"
      description="Floating panel triggered by click, positioned relative to a trigger element. Built on Radix — portal rendering, focus trap, keyboard dismiss (Escape), outside-click dismiss. For forms, settings, and contextual content."
      importCode={`import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'invin-uix/ui/popover';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Popover Playground"
        description="Experiment with different popover configurations."
        controls={[
          {
            name: 'side',
            type: 'select',
            label: 'Side',
            default: 'bottom',
            options: [
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            label: 'Align',
            default: 'center',
            options: [
              { value: 'start', label: 'Start' },
              { value: 'center', label: 'Center' },
              { value: 'end', label: 'End' },
            ],
          },
          { name: 'sideOffset', type: 'number', label: 'Side Offset', default: 4, min: 0, max: 20 },
        ]}
      >
        {(props) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent side={props.side} align={props.align} sideOffset={props.sideOffset}>
              <div className="space-y-2">
                <p className="text-[var(--foreground)] font-[600]">Popover Content</p>
                <p className="text-[var(--muted-foreground)]">This is a sample popover. Click outside or press Escape to close.</p>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Horizontal alignment relative to trigger (on PopoverContent)' },
          { name: 'sideOffset', type: 'number (px)', default: '4', description: 'Gap between trigger and popover (on PopoverContent)' },
          { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Which side to appear on (auto-flips if no space)' },
          { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state (on Popover root)' },
          { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Open/close callback (on Popover root)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic"
        description="Click trigger to open. Click outside or press Escape to close."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Any content here — forms, lists, settings.</p>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <p className="text-[var(--foreground)] font-[600]">Popover Title</p>
              <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Any content here — forms, lists, settings panels. Click outside or press Escape to close.</p>
            </div>
          </PopoverContent>
        </Popover>
      </PlaygroundSection>

      {/* ─── Alignment ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Alignment"
        description="Control horizontal alignment relative to the trigger."
        code={`<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`}
      >
        <div className="flex flex-wrap gap-3">
          {['start', 'center', 'end'].map(align => (
            <Popover key={align}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">{align}</Button>
              </PopoverTrigger>
              <PopoverContent align={align}>
                <p className="text-[var(--foreground)]">Aligned to <strong className="text-[var(--accent)]">{align}</strong></p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Side ───────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Side"
        description="Choose which side the popover appears on. Auto-flips if no space."
        code={`<PopoverContent side="top">...</PopoverContent>
<PopoverContent side="bottom">...</PopoverContent>
<PopoverContent side="left">...</PopoverContent>
<PopoverContent side="right">...</PopoverContent>`}
      >
        <div className="flex flex-wrap gap-3">
          {['top', 'bottom', 'left', 'right'].map(side => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </PopoverTrigger>
              <PopoverContent side={side} align="center">
                <p className="text-[var(--foreground)]">Side: <strong className="text-[var(--accent)]">{side}</strong></p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns.</p>
      </div>

      <PlaygroundSection
        title="Quick settings"
        description="Compact settings form in a popover — no need for a full dialog."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon-sm"><Gear /></Button>
  </PopoverTrigger>
  <PopoverContent align="end">
    <Label>Font size</Label>
    <Input defaultValue="14px" size="sm" />
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-sm"><Gear style={{ width: 14, height: 14 }} /></Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="space-y-3">
              <p className="text-[var(--foreground)] font-[600]">Display</p>
              <div className="space-y-1.5">
                <Label>Font size</Label>
                <Input defaultValue="13.5px" size="sm" />
              </div>
              <div className="space-y-1.5">
                <Label>Line height</Label>
                <Input defaultValue="1.5" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Compact mode</Label>
                <Switch size="sm" />
              </div>
              <Button size="sm" fullWidth>Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </PlaygroundSection>

      <PlaygroundSection
        title="Notification panel"
        description="Bell icon trigger with notification list inside."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon-sm"><Bell /></Button>
  </PopoverTrigger>
  <PopoverContent align="end">
    {/* notification list */}
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-sm"><Bell style={{ width: 14, height: 14 }} /></Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[var(--foreground)] font-[600]">Notifications</p>
                <Button variant="ghost" size="sm">Mark all read</Button>
              </div>
              <Separator className="my-0" />
              {[
                { text: 'New deployment completed', time: '2m ago' },
                { text: 'Alice commented on PR #42', time: '15m ago' },
                { text: 'Security scan passed', time: '1h ago' },
              ].map((n, i) => (
                <div key={i} className="py-1.5 cursor-pointer hover:bg-[var(--secondary)] -mx-2 px-2 rounded-md">
                  <p className="text-[var(--foreground)]">{n.text}</p>
                  <p className="text-[10px] text-[var(--muted-foreground-faint)]">{n.time}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </PlaygroundSection>

      <PlaygroundSection
        title="Share popover"
        description="Copy-link pattern with a share popover."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm"><ShareNetwork /> Share</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Input defaultValue="https://app.invin.io/..." readOnly />
    <Button size="sm">Copy Link</Button>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm"><ShareNetwork style={{ width: 14, height: 14 }} /> Share</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-3">
              <p className="text-[var(--foreground)] font-[600]">Share link</p>
              <p className="text-[var(--muted-foreground)] text-[var(--muted-foreground)]">Anyone with this link can view.</p>
              <div className="flex gap-2">
                <Input defaultValue="https://app.invin.io/project/abc" readOnly size="sm" className="flex-1" />
                <Button size="sm">Copy</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PlaygroundSection>

      <PlaygroundSection
        title="Funnel popover"
        description="Compact filter form that doesn't need a full sheet."
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm"><Funnel /> Funnel</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    {/* filter inputs */}
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm"><Funnel style={{ width: 14, height: 14 }} /> Funnel</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <div className="space-y-3">
              <p className="text-[var(--foreground)] font-[600]">Filters</p>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Input placeholder="All" size="sm" />
              </div>
              <div className="space-y-1.5">
                <Label>Assigned to</Label>
                <Input placeholder="Anyone" size="sm" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Reset</Button>
                <Button size="sm" className="flex-1">Apply</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </PlaygroundSection>

    </ComponentPage>
  );
}
