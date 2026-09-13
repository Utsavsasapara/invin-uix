import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Alert, AlertTitle, AlertDescription } from 'invin-uix/ui/alert';
import { Separator } from 'invin-uix/ui/separator';
import { Button } from 'invin-uix/ui/button';
import { WarningCircle, CheckCircle, Info, Warning, Terminal } from 'invin-uix/ui/icons';

export default function AlertDemo() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <ComponentPage
      name="Alert"
      description="Status message component with 5 semantic variants (filled and bordered styles). Supports icon, loading state, compact size, dismissible mode, and action buttons."
      importCode={`import { Alert, AlertTitle, AlertDescription } from 'invin-uix/ui/alert';`}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with Alert props in real-time."
        controls={[
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'info', label: 'Info' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'destructive', label: 'Destructive' },
              { value: 'default-bordered', label: 'Default (bordered)' },
              { value: 'info-bordered', label: 'Info (bordered)' },
              { value: 'success-bordered', label: 'Success (bordered)' },
              { value: 'warning-bordered', label: 'Warning (bordered)' },
              { value: 'destructive-bordered', label: 'Destructive (bordered)' },
            ]
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'compact', label: 'Compact' },
            ]
          },
          { name: 'title', label: 'Title', type: 'text', default: 'Alert Title' },
          { name: 'description', label: 'Description', type: 'text', default: 'This is the alert description message.' },
          { name: 'showIcon', label: 'Show Icon', type: 'boolean', default: true },
          { name: 'loading', label: 'Loading', type: 'boolean', default: false },
          { name: 'closable', label: 'Closable', type: 'boolean', default: false },
        ]}
      >
        {(props) => {
          const baseVariant = props.variant.replace('-bordered', '');
          const iconMap = {
            default: Terminal,
            info: Info,
            success: CheckCircle,
            warning: Warning,
            destructive: WarningCircle,
          };
          const IconComponent = iconMap[baseVariant];
          return (
            <div className="w-full max-w-md">
              <Alert 
                variant={props.variant} 
                size={props.size}
                icon={props.showIcon && !props.loading ? <IconComponent style={{ width: 16, height: 16 }} /> : undefined}
                loading={props.loading}
                closable={props.closable}
                onClose={() => {}}
              >
                <AlertTitle>{props.title}</AlertTitle>
                <AlertDescription>{props.description}</AlertDescription>
              </Alert>
            </div>
          );
        }}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'variant', type: "'default' | 'info' | 'success' | 'warning' | 'destructive' | '*-bordered'", default: "'default'", description: 'Semantic colour variant. Add -bordered for outline style' },
          { name: 'size', type: "'default' | 'compact'", default: "'default'", description: 'Alert size (compact has reduced padding)' },
          { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon auto-positioned top-left and coloured to match the variant' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show spinner instead of icon' },
          { name: 'closable', type: 'boolean', default: 'false', description: 'Shows a dismiss (X) button in top-right corner' },
          { name: 'onClose', type: '() => void', default: '—', description: 'Callback when dismiss button is clicked' },
          { name: 'action', type: 'ReactNode', default: '—', description: 'Action element (e.g., button) displayed on the right' },
          { name: 'className', type: 'string', default: '—', description: 'Additional Tailwind/CSS classes' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'AlertTitle + AlertDescription' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── All Variants (Filled) ──────────────────────────────── */}
      <PlaygroundSection
        title="Filled Variants"
        description="Five semantic variants with tinted backgrounds."
        code={`<Alert icon={<Terminal />}>
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>Neutral informational message.</AlertDescription>
</Alert>

<Alert variant="info" icon={<Info />}>...</Alert>
<Alert variant="success" icon={<CheckCircle />}>...</Alert>
<Alert variant="warning" icon={<Warning />}>...</Alert>
<Alert variant="destructive" icon={<WarningCircle />}>...</Alert>`}
      >
        <div className="space-y-3 w-full">
          <Alert icon={<Terminal style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>Neutral informational message with no severity.</AlertDescription>
          </Alert>
          <Alert variant="info" icon={<Info style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
          </Alert>
          <Alert variant="success" icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Profile updated successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning" icon={<Warning style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Storage is 90% full. Consider cleaning up old files.</AlertDescription>
          </Alert>
          <Alert variant="destructive" icon={<WarningCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      {/* ─── Bordered Variants ──────────────────────────────────── */}
      <PlaygroundSection
        title="Bordered Variants"
        description="Outline style without filled background. Add -bordered suffix to any variant."
        code={`<Alert variant="info-bordered" icon={<Info />}>
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>Bordered style with no background fill.</AlertDescription>
</Alert>

<Alert variant="success-bordered" icon={<CheckCircle />}>...</Alert>
<Alert variant="warning-bordered" icon={<Warning />}>...</Alert>
<Alert variant="destructive-bordered" icon={<WarningCircle />}>...</Alert>`}
      >
        <div className="space-y-3 w-full">
          <Alert variant="default-bordered" icon={<Terminal style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Default (bordered)</AlertTitle>
            <AlertDescription>Neutral bordered style.</AlertDescription>
          </Alert>
          <Alert variant="info-bordered" icon={<Info style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Info (bordered)</AlertTitle>
            <AlertDescription>Information with outline style.</AlertDescription>
          </Alert>
          <Alert variant="success-bordered" icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Success (bordered)</AlertTitle>
            <AlertDescription>Success with outline style.</AlertDescription>
          </Alert>
          <Alert variant="warning-bordered" icon={<Warning style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Warning (bordered)</AlertTitle>
            <AlertDescription>Warning with outline style.</AlertDescription>
          </Alert>
          <Alert variant="destructive-bordered" icon={<WarningCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Error (bordered)</AlertTitle>
            <AlertDescription>Error with outline style.</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      {/* ─── Compact Size ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Compact Size"
        description="Reduced padding for inline or smaller alerts. Use size='compact'."
        code={`<Alert size="compact" variant="info" icon={<Info />}>
  <AlertDescription>Compact alert with less padding.</AlertDescription>
</Alert>

<Alert size="compact" variant="success" icon={<CheckCircle />}>
  <AlertDescription>Changes saved.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-3 w-full">
          <Alert size="compact" variant="info" icon={<Info style={{ width: 16, height: 16 }} />}>
            <AlertDescription>Compact info alert with less padding.</AlertDescription>
          </Alert>
          <Alert size="compact" variant="success" icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertDescription>Changes saved successfully.</AlertDescription>
          </Alert>
          <Alert size="compact" variant="warning-bordered" icon={<Warning style={{ width: 16, height: 16 }} />}>
            <AlertDescription>Compact bordered warning.</AlertDescription>
          </Alert>
          <Alert size="compact" variant="destructive" icon={<WarningCircle style={{ width: 16, height: 16 }} />} closable onClose={() => {}}>
            <AlertDescription>Compact with close button.</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show a spinner when the alert represents an ongoing operation."
        code={`<Alert variant="info" loading>
  <AlertTitle>Processing</AlertTitle>
  <AlertDescription>Please wait while we save your changes...</AlertDescription>
</Alert>

<Alert variant="warning" loading>
  <AlertDescription>Connecting to server...</AlertDescription>
</Alert>`}
      >
        <div className="space-y-3 w-full">
          <Alert variant="info" loading>
            <AlertTitle>Processing</AlertTitle>
            <AlertDescription>Please wait while we save your changes...</AlertDescription>
          </Alert>
          <Alert variant="warning" loading>
            <AlertDescription>Connecting to server...</AlertDescription>
          </Alert>
          <Alert size="compact" variant="default" loading>
            <AlertDescription>Loading data...</AlertDescription>
          </Alert>
          <Alert variant="success-bordered" loading>
            <AlertTitle>Syncing</AlertTitle>
            <AlertDescription>Synchronizing with remote server...</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      {/* ─── Dismissible ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Dismissible"
        description="Add closable to show a dismiss button. Use onClose to handle the dismiss action."
        code={`const [show, setShow] = useState(true);

{show && (
  <Alert variant="info" closable onClose={() => setShow(false)} icon={<Info />}>
    <AlertTitle>Tip</AlertTitle>
    <AlertDescription>Click the X to dismiss this alert.</AlertDescription>
  </Alert>
)}`}
      >
        <div className="space-y-3 w-full">
          {showDismissible ? (
            <Alert variant="info" closable onClose={() => setShowDismissible(false)} icon={<Info style={{ width: 16, height: 16 }} />}>
              <AlertTitle>Tip</AlertTitle>
              <AlertDescription>Click the X to dismiss this alert.</AlertDescription>
            </Alert>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowDismissible(true)}>Show alert again</Button>
          )}
          <Alert variant="success" closable onClose={() => {}} icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Deployment complete</AlertTitle>
            <AlertDescription>Your changes are now live.</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      {/* ─── With Action ────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Action"
        description="Add an action prop to display a button or link on the right side of the alert."
        code={`<Alert 
  variant="warning" 
  icon={<Warning />}
  action={<Button size="sm" variant="outline">Retry</Button>}
>
  <AlertTitle>Connection Lost</AlertTitle>
  <AlertDescription>Unable to connect to the server.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-3 w-full">
          <Alert 
            variant="warning" 
            icon={<Warning style={{ width: 16, height: 16 }} />}
            action={<Button size="sm" variant="outline">Retry</Button>}
          >
            <AlertTitle>Connection Lost</AlertTitle>
            <AlertDescription>Unable to connect to the server.</AlertDescription>
          </Alert>
          <Alert 
            variant="info" 
            icon={<Info style={{ width: 16, height: 16 }} />}
            action={<Button size="sm" variant="ghost">Learn more</Button>}
          >
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>Check out our new dashboard analytics.</AlertDescription>
          </Alert>
          <Alert 
            variant="destructive-bordered" 
            icon={<WarningCircle style={{ width: 16, height: 16 }} />}
            action={<Button size="sm" variant="destructive">Fix now</Button>}
          >
            <AlertTitle>Critical Error</AlertTitle>
            <AlertDescription>Database connection failed.</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="Form validation errors"
        description="Show validation feedback after form submission."
        code={`<Alert variant="destructive" icon={<WarningCircle />}>
  <AlertTitle>Validation failed</AlertTitle>
  <AlertDescription>
    <ul className="list-disc pl-4 mt-1 space-y-0.5">
      <li>Email is required</li>
      <li>Password must be at least 8 characters</li>
    </ul>
  </AlertDescription>
</Alert>`}
      >
        <Alert variant="destructive" icon={<WarningCircle style={{ width: 16, height: 16 }} />}>
          <AlertTitle>Validation failed</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>Email is required</li>
              <li>Password must be at least 8 characters</li>
              <li>Please agree to the terms of service</li>
            </ul>
          </AlertDescription>
        </Alert>
      </PlaygroundSection>

      <PlaygroundSection
        title="Inline status (compact)"
        description="Compact alerts for inline status messages."
        code={`<Alert size="compact" variant="success" icon={<CheckCircle />}>
  <AlertDescription>Auto-saved at 2:45 PM</AlertDescription>
</Alert>`}
      >
        <div className="space-y-2 w-full max-w-sm">
          <Alert size="compact" variant="success" icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertDescription>Auto-saved at 2:45 PM</AlertDescription>
          </Alert>
          <Alert size="compact" variant="info-bordered" loading>
            <AlertDescription>Syncing changes...</AlertDescription>
          </Alert>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="System maintenance banner"
        description="Warning at the top of a page about upcoming downtime."
        code={`<Alert variant="warning" closable onClose={() => {}} icon={<Warning />}>
  <AlertTitle>Scheduled maintenance</AlertTitle>
  <AlertDescription>
    The system will be unavailable on Sunday, 2am–4am UTC.
  </AlertDescription>
</Alert>`}
      >
        <Alert variant="warning" closable onClose={() => {}} icon={<Warning style={{ width: 16, height: 16 }} />}>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            The system will be unavailable on Sunday, 2am–4am UTC for database migration.
          </AlertDescription>
        </Alert>
      </PlaygroundSection>

    </ComponentPage>
  );
}
