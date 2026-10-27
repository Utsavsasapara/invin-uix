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
        description="The seven variants in compact mode, with their default content. 'Try again' reloads the page; 'Contact support' and 'Sign in' are placeholders until you pass your own actions."
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

      {/* ─── Custom content ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom title, description, icon and actions"
        description="Override any part. Actions replace the defaults; give one an href to render it as a link."
        code={`import { ShieldWarning } from 'invin-uix/ui/icons';

<StatusPage
  variant="403"
  compact
  title="Restricted report"
  description="Only members of the SOC Admin group can open this report."
  icon={<ShieldWarning size={32} weight="duotone" />}
  actions={[
    { label: 'Request access', onClick: requestAccess, variant: 'default' },
    { label: 'Browse reports', href: '/reports', variant: 'outline' },
  ]}
/>`}
      >
        <div className="w-full max-w-xl space-y-3">
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
          <p className="text-caption text-[var(--muted-foreground)]">
            Last action: <span className="font-mono">{lastAction || '—'}</span>
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Error with report ──────────────────────────────────── */}
      <PlaygroundSection
        title="Replacing the default actions"
        description="The 500 page offers 'Try again' and 'Go home'. Pass actions to wire in your own recovery, or [] to show none."
        code={`<StatusPage
  variant="500"
  compact
  icon={<Bug size={32} weight="duotone" />}
  actions={[
    { label: 'Retry request', onClick: retry },
    { label: 'Report problem', href: '/support', variant: 'ghost' },
  ]}
/>

// No actions at all
<StatusPage variant="500" compact actions={[]} />`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <StatusPage
                variant="500"
                compact
                icon={<Bug size={32} weight="duotone" />}
                actions={[
                  { label: 'Retry request', onClick: () => setLastAction('Retry request') },
                  { label: 'Report problem', href: '#support', variant: 'ghost' },
                ]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="500" compact actions={[]} />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Disabled actions ───────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled actions"
        description="Disable individual actions while async work is in progress. For link actions, disabled adds aria-disabled and removes it from tab order."
        code={`<StatusPage
  variant="500"
  compact
  actions={[
    { label: 'Retrying…', onClick: retry, disabled: true, variant: 'default' },
    { label: 'Go home', href: '/', variant: 'outline' },
  ]}
/>`}
      >
        <div className="w-full max-w-xl">
          <Card>
            <CardContent className="p-0">
              <StatusPage
                variant="500"
                compact
                actions={[
                  { label: 'Retrying…', onClick: () => {}, disabled: true, variant: 'default' },
                  { label: 'Go home', href: '#home', variant: 'outline' },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Maintenance ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Maintenance with an estimate"
        description="estimatedTime adds the estimate to the maintenance description."
        code={`<StatusPage variant="maintenance" estimatedTime="approximately 2 hours" />
// We are performing scheduled maintenance. Estimated completion: approximately 2 hours.`}
      >
        <div className="w-full max-w-xl">
          <Card>
            <CardContent className="p-0">
              <StatusPage variant="maintenance" compact estimatedTime="approximately 2 hours" />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Extra content (children) ───────────────────────────── */}
      <PlaygroundSection
        title="Extra content (children)"
        description="Pass children to inject content between the description and the actions. Useful for error reference codes on 500 pages, countdowns on maintenance pages, or help links on empty states."
        code={`<StatusPage variant="500" compact>
  <code className="rounded bg-[var(--secondary)] px-2 py-1 text-sm font-mono text-[var(--muted-foreground)]">
    Error ref: ERR-8f3a21
  </code>
</StatusPage>

<StatusPage variant="empty" compact description="No reports match your current filters." actions={[{ label: 'Clear filters' }]} />`}
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
              <StatusPage
                variant="empty"
                compact
                description="No reports match your current filters."
                actions={[{ label: 'Clear filters', onClick: () => setLastAction('Clear filters') }]}
              />
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── In a dialog ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Inside a dialog"
        description="Compact mode drops the minimum height so it fits a dialog. The dialog needs its own accessible title; here it is visually hidden because the status title says the same thing."
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
        { label: 'Request access', onClick: handleRequest, variant: 'default' },
        { label: 'Cancel', onClick: onClose, variant: 'outline' },
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
