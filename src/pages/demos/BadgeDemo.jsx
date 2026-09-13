import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Badge, NotificationBadge, StatusBadge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from 'invin-uix/ui/avatar';
import { Bell, Envelope, Star, Check, Lightning, User, Shield, Clock, Pulse, ArrowRight, Tag, X } from 'invin-uix/ui/icons';

export default function BadgeDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Radix']);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const resetTags = () => {
    setTags(['React', 'TypeScript', 'Tailwind', 'Radix']);
  };

  return (
    <ComponentPage
      name="Badge"
      description="Three focused components: Badge (inline label pill with icons and removable support), NotificationBadge (count/dot on an element), and StatusBadge (status dot + text). All support pulse animation."
      importCode={`import { Badge, NotificationBadge, StatusBadge } from 'invin-uix/ui/badge';`}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with Badge props in real-time."
        controls={[
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'destructive', label: 'Destructive' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'info', label: 'Info' },
              { value: 'outline', label: 'Outline' },
            ]
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
            ]
          },
          { name: 'showLeftIcon', label: 'Left Icon', type: 'boolean', default: false },
          { name: 'showRightIcon', label: 'Right Icon', type: 'boolean', default: false },
          { name: 'removable', label: 'Removable', type: 'boolean', default: false },
          { name: 'pulse', label: 'Pulse', type: 'boolean', default: false },
          { name: 'text', label: 'Text', type: 'text', default: 'Badge' },
        ]}
      >
        {(props) => (
          <Badge 
            variant={props.variant} 
            size={props.size}
            iconLeft={props.showLeftIcon ? <Star style={{ width: 12, height: 12 }} /> : undefined}
            iconRight={props.showRightIcon ? <ArrowRight style={{ width: 12, height: 12 }} /> : undefined}
            removable={props.removable}
            onRemove={() => alert('Remove clicked!')}
            pulse={props.pulse}
          >
            {props.text}
          </Badge>
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">Badge (label pill)</p>
        <PropsTable
          props={[
            { name: 'variant', type: "'default' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'outline'", default: "'default'", description: 'Colour variant' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'sm (11px, tight), md (12px), lg (12px, roomy)' },
            { name: 'iconLeft', type: 'ReactNode', default: '—', description: 'Icon on the left side' },
            { name: 'iconRight', type: 'ReactNode', default: '—', description: 'Icon on the right side' },
            { name: 'removable', type: 'boolean', default: 'false', description: 'Show close button' },
            { name: 'onRemove', type: '() => void', default: '—', description: 'Callback when close clicked' },
            { name: 'pulse', type: 'boolean', default: 'false', description: 'Apply pulse animation' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Label text' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">NotificationBadge (count / dot)</p>
        <PropsTable
          props={[
            { name: 'count', type: 'number | ReactNode', default: '—', description: 'Count bubble value' },
            { name: 'dot', type: 'boolean', default: 'false', description: 'Show a dot instead of a count' },
            { name: 'overflowCount', type: 'number', default: '99', description: 'Max before showing "99+"' },
            { name: 'showZero', type: 'boolean', default: 'false', description: 'Show even when count is 0' },
            { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Bubble size — 14px / 18px' },
            { name: 'color', type: 'string', default: '—', description: 'Custom bubble/dot colour' },
            { name: 'offset', type: '[right, top]', default: '—', description: 'Pixel offset for the bubble/dot' },
            { name: 'pulse', type: 'boolean', default: 'false', description: 'Apply pulse animation' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Element to badge' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">StatusBadge (dot + text)</p>
        <PropsTable
          props={[
            { name: 'status', type: "'default' | 'success' | 'processing' | 'error' | 'warning'", default: '—', description: 'Drives dot colour; processing pulses' },
            { name: 'text', type: 'string', default: '—', description: 'Text next to the dot' },
            { name: 'color', type: 'string', default: '—', description: 'Override the dot colour' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Label Variants ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Label Variants"
        description="Seven colour variants for status tags, categories, and metadata."
        code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Critical</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Draft</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Critical</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </PlaygroundSection>

      {/* ─── With Icons ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Icons"
        description="Add icons to the left, right, or both sides of the badge."
        code={`<Badge iconLeft={<Star />}>Featured</Badge>
<Badge iconRight={<ArrowRight />}>Next</Badge>
<Badge iconLeft={<Check />} iconRight={<ArrowRight />} variant="success">
  Completed
</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge iconLeft={<Star style={{ width: 12, height: 12 }} />}>Featured</Badge>
          <Badge iconRight={<ArrowRight style={{ width: 12, height: 12 }} />} variant="secondary">Next</Badge>
          <Badge iconLeft={<Check style={{ width: 12, height: 12 }} />} variant="success">Verified</Badge>
          <Badge iconLeft={<Shield style={{ width: 12, height: 12 }} />} variant="info">Secure</Badge>
          <Badge iconLeft={<Lightning style={{ width: 12, height: 12 }} />} iconRight={<ArrowRight style={{ width: 12, height: 12 }} />} variant="warning">
            Upgrade
          </Badge>
        </div>
      </PlaygroundSection>

      {/* ─── Removable Badges ───────────────────────────────────── */}
      <PlaygroundSection
        title="Removable Badges"
        description="Show a close button to dismiss badges. Great for tag-like usage. Click to remove."
        code={`const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);

{tags.map(tag => (
  <Badge 
    key={tag} 
    removable 
    onRemove={() => setTags(tags.filter(t => t !== tag))}
  >
    {tag}
  </Badge>
))}`}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary"
                iconLeft={<Tag style={{ width: 12, height: 12 }} />}
                removable 
                onRemove={() => removeTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {tags.length === 0 && (
              <span className="text-[var(--muted-foreground)] text-sm">All tags removed</span>
            )}
          </div>
          {tags.length < 4 && (
            <Button size="sm" variant="outline" onClick={resetTags}>Reset Tags</Button>
          )}
        </div>
      </PlaygroundSection>

      {/* ─── Pulse Animation ────────────────────────────────────── */}
      <PlaygroundSection
        title="Pulse Animation"
        description="Apply pulse animation to draw attention to important badges."
        code={`<Badge variant="success" pulse>Live</Badge>
<Badge variant="destructive" pulse>Alert</Badge>
<Badge variant="info" pulse>New</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success" pulse>Live</Badge>
          <Badge variant="destructive" pulse>Alert</Badge>
          <Badge variant="info" pulse>New</Badge>
          <Badge variant="warning" pulse iconLeft={<Lightning style={{ width: 12, height: 12 }} />}>
            Urgent
          </Badge>
        </div>
      </PlaygroundSection>

      {/* ─── Label Sizes ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Label Sizes"
        description="Three sizes, distinct by font size and padding: sm (11px, tight), md (12px, default), lg (12px, roomy)."
        code={`<Badge variant="info" size="sm">Small</Badge>
<Badge variant="info" size="md">Medium</Badge>
<Badge variant="info" size="lg">Large</Badge>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="info" size="sm">Small</Badge>
          <Badge variant="info" size="md">Medium</Badge>
          <Badge variant="info" size="lg">Large</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <Badge variant="success" size="sm">v1.2.0</Badge>
          <Badge variant="outline" size="sm">React 19</Badge>
          <Badge variant="secondary" size="sm">Tailwind v4</Badge>
        </div>
      </PlaygroundSection>

      <Separator />

      {/* ─── Notification Count ─────────────────────────────────── */}
      <PlaygroundSection
        title="Notification Count"
        description="NotificationBadge wraps any element (button, avatar, icon) to show a count bubble in the top-right corner."
        code={`<NotificationBadge count={5}>
  <Button size="icon" variant="outline"><Bell /></Button>
</NotificationBadge>

// Overflow (shows "99+")
<NotificationBadge count={120} overflowCount={99}>
  <Avatar size="md"><AvatarFallback>U</AvatarFallback></Avatar>
</NotificationBadge>

// With pulse animation
<NotificationBadge count={3} pulse>
  <Button size="icon" variant="outline"><Bell /></Button>
</NotificationBadge>`}
      >
        <div className="flex flex-wrap items-center gap-5">
          <NotificationBadge count={5}>
            <Button size="icon" variant="outline" aria-label="Notifications"><Bell style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
          <NotificationBadge count={12}>
            <Button size="icon" variant="outline" aria-label="Messages"><Envelope style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
          <NotificationBadge count={120} overflowCount={99}>
            <Avatar size="md"><AvatarImage src="https://i.pravatar.cc/100?u=badge3" /><AvatarFallback>U</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge count={3} pulse>
            <Button size="icon" variant="outline" aria-label="Alerts"><Bell style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
        </div>
      </PlaygroundSection>

      <Separator />

      {/* ─── Dot Mode ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Dot Mode"
        description="Minimal dot indicator without a number. Shows a 7px circle in the top-right corner. Supports pulse."
        code={`<NotificationBadge dot>
  <Button size="icon" variant="outline"><Bell /></Button>
</NotificationBadge>

// With pulse
<NotificationBadge dot pulse>
  <Avatar><AvatarFallback>U</AvatarFallback></Avatar>
</NotificationBadge>

// Custom dot colour
<NotificationBadge dot color="var(--ok)">
  <Avatar><AvatarFallback>U</AvatarFallback></Avatar>
</NotificationBadge>`}
      >
        <div className="flex flex-wrap items-center gap-5">
          <NotificationBadge dot>
            <Button size="icon" variant="outline" aria-label="Notifications"><Bell style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
          <NotificationBadge dot pulse>
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=dot1" /><AvatarFallback>U</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge dot color="var(--ok)">
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=dot2" /><AvatarFallback>U</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge dot color="var(--degraded)">
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=dot3" /><AvatarFallback>U</AvatarFallback></Avatar>
          </NotificationBadge>
        </div>
      </PlaygroundSection>

      <Separator />

      {/* ─── Status Dot Mode ────────────────────────────────────── */}
      <PlaygroundSection
        title="Status Dot (StatusBadge)"
        description="Standalone status indicator with an animated dot and text. 'processing' pulses automatically."
        code={`<StatusBadge status="success" text="Active" />
<StatusBadge status="processing" text="Syncing..." />
<StatusBadge status="error" text="Failed" />
<StatusBadge status="warning" text="Pending" />
<StatusBadge status="default" text="Idle" />`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status="success" text="Active" />
          <StatusBadge status="processing" text="Syncing..." />
          <StatusBadge status="error" text="Failed" />
          <StatusBadge status="warning" text="Pending" />
          <StatusBadge status="default" text="Idle" />
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Real-world Use Cases ───────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns you'll use in your project.</p>
      </div>

      <PlaygroundSection
        title="Notification header"
        description="Topbar notification bell with unread count and pulse for urgency."
        code={`<NotificationBadge count={3} size="sm" pulse>
  <Button variant="ghost" size="icon-sm"><Bell /></Button>
</NotificationBadge>`}
      >
        <div className="flex items-center gap-1 p-1 rounded-[8px] border border-[var(--border)] w-fit">
          <NotificationBadge count={3} size="sm" pulse>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications"><Bell style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
          <NotificationBadge count={7} size="sm" color="var(--accent)">
            <Button variant="ghost" size="icon-sm" aria-label="Messages"><Envelope style={{ width: 16, height: 16 }} /></Button>
          </NotificationBadge>
          <Button variant="ghost" size="icon-sm" aria-label="User"><User style={{ width: 16, height: 16 }} /></Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="User list with status"
        description="Avatar with online/offline dot indicator."
        code={`// Online / away / offline via token colours
<NotificationBadge dot color="var(--ok)">
  <Avatar size="sm"><AvatarFallback>SC</AvatarFallback></Avatar>
</NotificationBadge>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          {[
            { name: 'Sarah C.', color: 'var(--ok)', img: 'u=team10' },
            { name: 'John R.', color: 'var(--ok)', img: 'u=team11' },
            { name: 'Lisa P.', color: 'var(--degraded)', img: 'u=team12' },
            { name: 'Mike C.', color: 'var(--muted-foreground-faint)', img: 'u=team13' },
          ].map(u => (
            <div key={u.name} className="flex items-center gap-2">
              <NotificationBadge dot color={u.color}>
                <Avatar size="sm"><AvatarImage src={`https://i.pravatar.cc/100?${u.img}`} /><AvatarFallback>{u.name[0]}</AvatarFallback></Avatar>
              </NotificationBadge>
              <span className="text-[var(--foreground)]">{u.name}</span>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status table column"
        description="Status dots in a data list or table row."
        code={`<StatusBadge status="success" text="Running" />
<StatusBadge status="processing" text="Deploying..." />
<StatusBadge status="error" text="Crashed" />`}
      >
        <Card>
          <CardContent className="py-3">
            <div className="space-y-3">
              {[
                { name: 'API Gateway', env: 'Production', status: 'success', text: 'Running' },
                { name: 'Auth Service', env: 'Staging', status: 'processing', text: 'Deploying...' },
                { name: 'Worker Queue', env: 'Production', status: 'error', text: 'Crashed' },
                { name: 'CDN Edge', env: 'Production', status: 'warning', text: 'Degraded' },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-[var(--foreground)] font-[500]">{s.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground-faint)]">{s.env}</p>
                  </div>
                  <StatusBadge status={s.status} text={s.text} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Tag labels with icons"
        description="Categorize content with badge labels and icons."
        code={`<Badge variant="info" size="sm" iconLeft={<Shield />}>Security</Badge>
<Badge variant="success" size="sm" iconLeft={<Check />}>Resolved</Badge>
<Badge variant="outline" size="sm">v2.1</Badge>`}
      >
        <Card hover>
          <CardContent className="py-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info" size="sm" iconLeft={<Shield style={{ width: 10, height: 10 }} />}>Security</Badge>
              <Badge variant="success" size="sm" iconLeft={<Check style={{ width: 10, height: 10 }} />}>Resolved</Badge>
              <Badge variant="outline" size="sm">v2.1</Badge>
            </div>
            <p className="text-[var(--foreground)] font-[600]">Fix authentication bypass vulnerability</p>
            <p className="text-[var(--muted-foreground)] text-[var(--muted-foreground)] mt-1">Patched JWT validation to prevent token replay attacks on the auth service.</p>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature flags / permissions"
        description="Combine variants and icons to show feature status and access level."
        code={`<Badge variant="success" size="sm" iconLeft={<Check />}>Enabled</Badge>
<Badge variant="warning" size="sm" pulse>Beta</Badge>
<Badge variant="info" size="sm">Preview</Badge>`}
      >
        <Card>
          <CardContent className="py-3">
            <div className="space-y-3">
              {[
                { icon: Shield, label: 'Role-Based Access', badge: 'success', text: 'Enabled', iconBadge: Check },
                { icon: Pulse, label: 'Real-time Sync', badge: 'warning', text: 'Beta', pulse: true },
                { icon: Lightning, label: 'AI Copilot', badge: 'info', text: 'Preview' },
                { icon: Clock, label: 'Scheduled Reports', badge: 'secondary', text: 'Disabled' },
              ].map(f => (
                <div key={f.label} className="flex items-center gap-2">
                  <f.icon style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
                  <span className="text-[var(--foreground)] flex-1">{f.label}</span>
                  <Badge 
                    variant={f.badge} 
                    size="sm" 
                    pulse={f.pulse}
                    iconLeft={f.iconBadge ? <f.iconBadge style={{ width: 10, height: 10 }} /> : undefined}
                  >
                    {f.text}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
