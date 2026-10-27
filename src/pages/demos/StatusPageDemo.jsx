import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { StatusPage } from 'invin-uix/ui/status-page';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from 'invin-uix/ui/dialog';
import { Separator } from 'invin-uix/ui/separator';
import { ShieldWarning, Bug } from 'invin-uix/ui/icons';

const VARIANTS = [
  { value: '404', label: '404 — Not found' },
  { value: '403', label: '403 — Access denied' },
  { value: '500', label: '500 — Server error' },
  { value: 'session-expired', label: 'Session expired' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'offline', label: 'Offline' },
  { value: 'empty', label: 'Empty' },
];

export default function StatusPageDemo() {
  const [lastAction, setLastAction] = useState('');

  return (
    <ComponentPage
      name="StatusPage"
      description="Full-page and compact states for not found, forbidden, server error, expired session, maintenance, offline and empty screens. Every variant has a default icon, title, description and actions that can all be overridden."
      importCode={`import { StatusPage } from 'invin-uix/ui/status-page';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Pick a variant and override its text. Compact is on so the preview fits; switch it off to see the full-page layout (at least 60vh tall)."
        controls={[
          { name: 'variant', label: 'Variant', type: 'select', default: '404', options: VARIANTS },
          { name: 'compact', label: 'Compact', type: 'boolean', default: true },
          { name: 'title', label: 'Title (empty = default)', type: 'text', default: '' },
          { name: 'description', label: 'Description (empty = default)', type: 'text', default: '' },
          { name: 'estimatedTime', label: 'Estimated time (maintenance)', type: 'text', default: '' },
          { name: 'headingLevel', label: 'headingLevel', type: 'select', default: '', options: [
            { value: '', label: 'auto (1 or 2)' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
          ]},
        ]}
      >
        {(props) => (
          <StatusPage
            key={props.variant}
            variant={props.variant}
            compact={props.compact}
            title={props.title || undefined}
            description={props.description || undefined}
            estimatedTime={props.estimatedTime || undefined}
            headingLevel={props.headingLevel ? Number(props.headingLevel) : undefined}
          />
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'variant', type: "'404' | '403' | '500' | 'session-expired' | 'maintenance' | 'offline' | 'empty'", default: '—', description: 'Which status to show; provides the default icon, title, description and actions (required)' },
          { name: 'title', type: 'string', default: 'variant default', description: 'Override the title (the heading text, not the HTML tooltip attribute)' },
          { name: 'description', type: 'string', default: 'variant default', description: "Override the description; '' removes it" },
          { name: 'actions', type: 'StatusPageAction[]', default: 'variant default', description: 'Replaces the default actions; [] shows none' },
          { name: 'icon', type: 'ReactNode', default: 'variant default', description: 'Replaces the icon inside the tile' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'Card-sized layout (no min-height) for Dialog, Drawer and Card; title becomes an h2' },
          { name: 'estimatedTime', type: 'string', default: '—', description: "Adds 'Estimated completion: …' to the maintenance description" },
          { name: 'className', type: 'string', default: '—', description: 'CSS class(es) applied to the root div. Use to set width, background, border, etc.' },
          { name: 'headingLevel', type: '1 | 2 | 3 | 4 | 5 | 6', default: '1 (full) / 2 (compact)', description: 'Override the heading element level when the default does not fit the surrounding document outline.' },
        ]}
      />

      <PropsTable
        title="StatusPageAction"
        props={[
          { name: 'label', type: 'string', default: '—', description: 'Text of the button or link (required)' },
          { name: 'onClick', type: '() => void', default: '—', description: 'Called when the action is clicked' },
          { name: 'href', type: 'string', default: '—', description: 'Renders the action as a link. Can be combined with onClick for client-side routing.' },
          { name: 'variant', type: "'default' | 'primary' | 'outline' | 'ghost' | 'secondary'", default: 'first default, rest outline', description: "Button style. 'default' and 'primary' are equivalent (filled primary style)." },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button, or adds aria-disabled to a link action' },
          { name: 'className', type: 'string', default: '—', description: 'CSS class(es) applied to the action button or link' },
          { name: 'icon', type: 'ReactNode', default: '—', description: 'Leading icon rendered before the label (decorative)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── All variants ───────────────────────────────────────── */}
      <PlaygroundSection
        title="All variants"
        description="All seven variants in compact mode showing their default icon, title, description and actions."
        code={`<StatusPage variant="404" />
<StatusPage variant="403" />
<StatusPage variant="500" />
<StatusPage variant="session-expired" />
<StatusPage variant="maintenance" />
<StatusPage variant="offline" />
<StatusPage variant="empty" />`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          {VARIANTS.map(({ value }) => (
            <Card key={value}>
              <CardContent className="p-0">
                <StatusPage variant={value} compact />
              </CardContent>
            </Card>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Full page ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Full page"
        description="The default layout is centred and at least 60vh tall (not 100vh, so it sits inside an app shell with a header or sidebar). The 404, 403 and 500 pages draw their code large and faint behind the icon."
        code={`// A route that renders when nothing matches
<Route path="*" element={<StatusPage variant="404" />} />`}
      >
        <div className="w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)]">
          <StatusPage variant="404" />
        </div>
      </PlaygroundSection>

      {/* ─── Custom content and actions ────────────────────────────────── */}
      <PlaygroundSection
        title="Custom content and actions"
        description="Override title, description, icon and actions independently. Pass actions={[]} to show none. Use disabled on an action while async work is in progress. estimatedTime appends an estimate to the maintenance description."
        code={`import { ShieldWarning, Bug } from 'invin-uix/ui/icons';

// Override everything
<StatusPage
  variant="403"
  compact
  title="Restricted report"
  description="Only members of the SOC Admin group can open this report."
  icon={<ShieldWarning size={32} weight="duotone" />}
  actions={[
    { label: 'Request access', onClick: () => { /* wire up */ }, variant: 'default' },
    { label: 'Browse reports', href: '/reports', variant: 'outline' },
  ]}
/>

// Custom actions + disabled while retrying
<StatusPage
  variant="500"
  compact
  icon={<Bug size={32} weight="duotone" />}
  actions={[
    { label: 'Retrying…', onClick: () => { /* retry */ }, disabled: true, variant: 'default' },
    { label: 'Go home', href: '/', variant: 'outline' },
  ]}
/>

// No actions at all
<StatusPage variant="500" compact actions={[]} />

// estimatedTime on the maintenance variant
<StatusPage variant="maintenance" compact estimatedTime="approximately 2 hours" />`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <StatusPage
                variant="403"
                compact
                title="Restricted report"
                description="Only members of the SOC Admin group can open this report."
                icon={<ShieldWarning size={32} weight="duotone" />}
                actions={[
                  { label: 'Request access', onClick: () => setLastAction('Request access'), variant: 'default' },
                  { label: 'Browse reports', href: '#reports', onClick: () => setLastAction('Browse reports'), variant: 'outline' },
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage
                variant="500"
                compact
                icon={<Bug size={32} weight="duotone" />}
                actions={[
                  { label: 'Retrying…', onClick: () => {}, disabled: true, variant: 'default' },
                  { label: 'Go home', href: '#home', variant: 'outline' },
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="500" compact actions={[]} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="maintenance" compact estimatedTime="approximately 2 hours" />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Extra content (children) ──────────────────────────────────── */}
      <PlaygroundSection
        title="Extra content (children)"
        description="Pass children to inject content between the description and the actions. Useful for error reference codes on 500 pages, countdowns on maintenance pages, or contextual help links."
        code={`// Error reference code on a 500 page
<StatusPage variant="500" compact>
  <code className="rounded bg-[var(--secondary)] px-2 py-1 text-sm font-mono text-[var(--muted-foreground)]">
    Error ref: ERR-8f3a21
  </code>
</StatusPage>

// Contextual note on a maintenance page
<StatusPage variant="maintenance" compact>
  <p className="text-caption text-[var(--muted-foreground)]">
    Follow{' '}
    <a href="/status" className="text-[var(--accent-text)] underline">
      status.example.com
    </a>
    {' '}for live updates.
  </p>
</StatusPage>`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="500" compact>
                <code className="rounded bg-[var(--secondary)] px-2 py-1 text-sm font-mono text-[var(--muted-foreground)]">
                  Error ref: ERR-8f3a21
                </code>
              </StatusPage>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="maintenance" compact>
                <p className="text-caption text-[var(--muted-foreground)]">
                  Follow{' '}
                  <a href="#status" className="text-[var(--accent-text)] underline">
                    status.example.com
                  </a>
                  {' '}for live updates.
                </p>
              </StatusPage>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── In a dialog ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Inside a dialog"
        description="Use compact inside a Dialog or Drawer. Give the dialog its own accessible title — hide it visually with sr-only if the status title already says the same thing."
        code={`<Dialog>
  <DialogTrigger asChild><Button variant="outline">Open report</Button></DialogTrigger>
  <DialogContent>
    <DialogTitle className="sr-only">Restricted report</DialogTitle>
    <DialogDescription className="sr-only">You do not have access to this report.</DialogDescription>
    <StatusPage
      variant="403"
      compact
      title="Insufficient permissions"
      description="This report is restricted to Admin users."
      actions={[
        { label: 'Request access', onClick: () => { /* wire up */ }, variant: 'default' },
        { label: 'Cancel', onClick: () => { /* close dialog */ }, variant: 'outline' },
      ]}
    />
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open restricted report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Restricted report</DialogTitle>
            <DialogDescription className="sr-only">You do not have access to this report.</DialogDescription>
            <StatusPage
              variant="403"
              compact
              title="Insufficient permissions"
              description="This report is restricted to Admin users."
              actions={[
                { label: 'Request access', onClick: () => setLastAction('Request access (dialog)'), variant: 'default' },
              ]}
            />
            <div className="flex justify-center pb-2">
              <DialogClose asChild>
                <Button variant="ghost" size="sm">Cancel</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </PlaygroundSection>

      {/* ─── Accessibility ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Announcing a status that appears on the current page"
        description="The component sets no live-region role, because it normally replaces a page. When it appears in response to a change (going offline, a session timing out), add a role."
        code={`// h1 on a full page, h2 when compact. Decorative icon and status code are aria-hidden.
<StatusPage variant="offline" compact role="status" />
<StatusPage variant="session-expired" compact role="alert" />`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="offline" compact role="status" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="session-expired" compact role="alert" />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
