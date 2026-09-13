import { useState, useEffect } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator, SelectEmpty } from 'invin-uix/ui/select';
import { Label } from 'invin-uix/ui/label';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { MagnifyingGlass } from 'invin-uix/ui/icons';

export default function SelectDemo() {
  return (
    <ComponentPage
      name="Select"
      description="Dropdown select built on Radix UI. Full keyboard navigation, portal rendering, grouped options, size variants, and error/success validation states with proper accessibility."
      importCode={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';
// Optional: SelectGroup, SelectLabel, SelectSeparator`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Select Playground"
        description="Experiment with different select configurations."
        controls={[
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (28px)' },
              { value: 'md', label: 'Medium (38px)' },
              { value: 'lg', label: 'Large (44px)' },
            ],
          },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
          { name: 'loading', type: 'boolean', label: 'Loading', default: false },
          { name: 'hasError', type: 'boolean', label: 'Show Error', default: false },
          { name: 'hasSuccess', type: 'boolean', label: 'Show Success', default: false },
        ]}
      >
        {(props) => (
          <div className="w-64">
            <Select disabled={props.disabled || props.loading}>
              <SelectTrigger 
                size={props.size} 
                loading={props.loading}
                error={props.hasError ? "Please select an option" : undefined}
                success={!props.hasError && props.hasSuccess ? "Great choice!" : undefined}
              >
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">SelectTrigger</p>
        <PropsTable
          props={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height — sm (28px), md (38px), lg (44px). Matches Input/Button.' },
            { name: 'error', type: 'string', default: '—', description: 'Error message — red border, message below, auto aria-invalid + aria-describedby' },
            { name: 'success', type: 'string', default: '—', description: 'Success message — green border, message below (error takes precedence)' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner while fetching options' },
            { name: 'loadingText', type: 'string', default: "'Loading...'", description: 'Text shown while loading' },
            { name: 'placeholder', type: '—', default: '—', description: 'Use <SelectValue placeholder="..." /> inside trigger' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Set on <Select disabled> root' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">Select (Root)</p>
        <PropsTable
          props={[
            { name: 'value', type: 'string', default: '—', description: 'Controlled value' },
            { name: 'defaultValue', type: 'string', default: '—', description: 'Uncontrolled default' },
            { name: 'onValueChange', type: '(value: string) => void', default: '—', description: 'Change callback' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire select' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic"
        description="Simple select with placeholder and items."
        code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="w-full max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Matches Input and Button heights exactly. sm=28px, md=38px, lg=44px."
        code={`<SelectTrigger size="sm">...</SelectTrigger>
<SelectTrigger size="md">...</SelectTrigger>
<SelectTrigger size="lg">...</SelectTrigger>`}
      >
        <div className="space-y-3 w-full max-w-xs">
          <Select>
            <SelectTrigger size="sm"><SelectValue placeholder="Small (28px)" /></SelectTrigger>
            <SelectContent><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="md"><SelectValue placeholder="Medium (38px) — default" /></SelectTrigger>
            <SelectContent><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="lg"><SelectValue placeholder="Large (44px)" /></SelectTrigger>
            <SelectContent><SelectItem value="a">Option A</SelectItem><SelectItem value="b">Option B</SelectItem></SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      {/* ─── Height alignment demo ──────────────────────────────── */}
      <PlaygroundSection
        title="Aligned with Input & Button"
        description="Select, Input, and Button at the same size will align perfectly in a row."
        code={`<div className="flex gap-2">
  <Select>
    <SelectTrigger size="md"><SelectValue placeholder="Role" /></SelectTrigger>
    <SelectContent>...</SelectContent>
  </Select>
  <Input placeholder="Name" />
  <Button>Submit</Button>
</div>`}
      >
        <div className="flex gap-2 w-full max-w-md items-start">
          <Select>
            <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Name" />
          <Button>Submit</Button>
        </div>
      </PlaygroundSection>

      {/* ─── Grouped ────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Grouped options"
        description="Use SelectGroup + SelectLabel for categorized items. SelectSeparator between groups."
        code={`<SelectContent>
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
    <SelectItem value="broccoli">Broccoli</SelectItem>
  </SelectGroup>
</SelectContent>`}
      >
        <div className="w-full max-w-xs">
          <Select>
            <SelectTrigger><SelectValue placeholder="Select food" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="spinach">Spinach</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled"
        description="Set disabled on the Select root to disable the entire component."
        code={`<Select disabled>
  <SelectTrigger><SelectValue placeholder="Disabled" /></SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>`}
      >
        <div className="w-full max-w-xs">
          <Select disabled>
            <SelectTrigger><SelectValue placeholder="Disabled" /></SelectTrigger>
            <SelectContent><SelectItem value="a">Option A</SelectItem></SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading state"
        description="Show a spinner while fetching options from an API. The select is disabled during loading."
        code={`<Select disabled={loading}>
  <SelectTrigger loading={loading} loadingText="Loading users...">
    <SelectValue placeholder="Select user" />
  </SelectTrigger>
  <SelectContent>
    {users.map(user => (
      <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
    ))}
  </SelectContent>
</Select>`}
      >
        <div className="space-y-4 w-full max-w-xs">
          <div className="space-y-1.5">
            <Label>Loading state</Label>
            <Select disabled>
              <SelectTrigger loading loadingText="Loading users...">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">User A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Custom loading text</Label>
            <Select disabled>
              <SelectTrigger loading loadingText="Fetching countries...">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Country A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Empty State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Empty state"
        description="Show a message when no options are available. Use SelectEmpty inside SelectContent."
        code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select user" />
  </SelectTrigger>
  <SelectContent>
    {users.length > 0 ? (
      users.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)
    ) : (
      <SelectEmpty>No users found</SelectEmpty>
    )}
  </SelectContent>
</Select>

// With icon
<SelectEmpty icon={<SearchIcon />}>No matching results</SelectEmpty>`}
      >
        <div className="space-y-4 w-full max-w-xs">
          <div className="space-y-1.5">
            <Label>Empty list</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectEmpty>No users found</SelectEmpty>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>With icon</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Search results" />
              </SelectTrigger>
              <SelectContent>
                <SelectEmpty icon={<MagnifyingGlass style={{ width: 24, height: 24 }} />}>
                  No matching results
                </SelectEmpty>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Error State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Error state"
        description="Pass error='message' to SelectTrigger. Shows red border + error text. aria-invalid and aria-describedby set automatically."
        code={`<Select>
  <SelectTrigger error="Please select a country.">
    <SelectValue placeholder="Choose country" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="uk">United Kingdom</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="space-y-1.5 w-full max-w-xs">
          <Label>Country</Label>
          <Select>
            <SelectTrigger error="Please select a country.">
              <SelectValue placeholder="Choose country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="in">India</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      {/* ─── Success State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Success state"
        description="Pass success='message' to SelectTrigger. Shows green border + success text. Great for showing validation passed."
        code={`<Select defaultValue="us">
  <SelectTrigger success="Great choice!">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="us">United States</SelectItem>
    <SelectItem value="uk">United Kingdom</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="space-y-1.5 w-full max-w-xs">
          <Label>Country</Label>
          <Select defaultValue="us">
            <SelectTrigger success="Great choice!">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="in">India</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real forms.</p>
      </div>

      <PlaygroundSection
        title="Form with mixed controls"
        description="Select alongside inputs in a registration form."
        code={`<Input placeholder="Full name" />
<Input type="email" placeholder="Email" />
<Select>
  <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>
<Button fullWidth>Create Account</Button>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="reg-name">Full name</Label>
                <Input id="reg-name" placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button fullWidth>Create Account</Button>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Filter row"
        description="Multiple selects in a horizontal filter bar."
        code={`<div className="flex gap-2">
  <Select><SelectTrigger size="sm"><SelectValue placeholder="Status" /></SelectTrigger>...</Select>
  <Select><SelectTrigger size="sm"><SelectValue placeholder="Priority" /></SelectTrigger>...</Select>
  <Select><SelectTrigger size="sm"><SelectValue placeholder="Assignee" /></SelectTrigger>...</Select>
</div>`}
      >
        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger size="sm"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm"><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm"><SelectValue placeholder="Assignee" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="alice">Alice</SelectItem>
              <SelectItem value="bob">Bob</SelectItem>
              <SelectItem value="carol">Carol</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Settings panel"
        description="Select for preference options in a settings card."
        code={`<Label>Theme</Label>
<Select defaultValue="dark">
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4 space-y-4">
            <div className="space-y-1.5">
              <Label>Theme</Label>
              <Select defaultValue="dark">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="ist">IST (India)</SelectItem>
                  <SelectItem value="est">EST (US East)</SelectItem>
                  <SelectItem value="pst">PST (US West)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
