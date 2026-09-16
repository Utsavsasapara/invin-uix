import { ComponentPage, PlaygroundSection, InteractiveDemo, PropsTable } from '../../components/PlaygroundSection.jsx';
import { Toaster, toast, useToast } from 'invin-uix/ui/toast';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from 'invin-uix/ui/card';
import { useState } from 'react';

// Demo component for action buttons - UI Guide: toasts with actions never auto-dismiss
function ActionToastDemo() {
  const handleUndo = () => {
    // Past tense, no exclamation marks per UI Guide v2.0 §13
    toast({ title: 'Deletion undone', variant: 'success' });
  };
  
  return (
    <Button 
      variant="outline" 
      onClick={() => toast({ 
        title: 'File deleted', 
        description: 'document.pdf moved to trash.',
        variant: 'destructive',
        // UI Guide: toasts with actions never auto-dismiss (handled automatically)
        action: (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleUndo}
            className="ml-2 bg-white/10 hover:bg-white/20"
          >
            Undo
          </Button>
        )
      })}
    >
      Delete with Undo
    </Button>
  );
}

// Demo component for programmatic dismiss
function ProgrammaticDismissDemo() {
  const [toastId, setToastId] = useState(null);
  
  const showPersistent = () => {
    const { id, dismiss } = toast({ 
      title: 'Processing request', 
      description: 'This may take a moment.',
      variant: 'info'
      // Error toasts never auto-dismiss; for info, use default duration
    });
    setToastId({ id, dismiss });
  };
  
  const dismissToast = () => {
    if (toastId) {
      toastId.dismiss();
      setToastId(null);
      toast({ title: 'Toast dismissed', variant: 'success' });
    }
  };
  
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={showPersistent} disabled={!!toastId}>
        Show Toast
      </Button>
      <Button variant="outline" onClick={dismissToast} disabled={!toastId}>
        Dismiss Programmatically
      </Button>
    </div>
  );
}

export default function ToastDemo() {
  return (
    <ComponentPage
      name="Toast"
      description="Non-intrusive notifications following UI Guide v2.0 §13. Features severity-based durations, 3px edge stripe, close button, and responsive positioning."
      importCode={`import { Toaster, toast } from 'invin-uix/ui/toast';
// Place <Toaster /> once in your app root`}
    >
      <Toaster position="bottom-right" />

      {/* ─── UI Guide v2.0 §13 Reference ────────────────────────── */}
      <Card className="border-[var(--accent)]/30 bg-[var(--accent)]/5">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            UI Guide v2.0 §13 — Toast Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="font-[600] text-[var(--foreground)]">Duration by Severity</p>
              <ul className="text-[var(--muted-foreground)] text-xs mt-1 space-y-1">
                <li>• <strong>Info/Success:</strong> 4 seconds</li>
                <li>• <strong>Warning:</strong> 7 seconds</li>
                <li>• <strong>Error:</strong> Never auto-dismiss</li>
                <li>• <strong>With action:</strong> Never auto-dismiss</li>
              </ul>
            </div>
            <div>
              <p className="font-[600] text-[var(--foreground)]">Content Guidelines</p>
              <ul className="text-[var(--muted-foreground)] text-xs mt-1 space-y-1">
                <li>• Success: Past tense, no exclamation marks</li>
                <li>• Error: Says what to do next</li>
                <li>• Max 3 visible, 4th queues</li>
                <li>• Below 640px: top-center position</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Toast Playground"
        description="Experiment with different toast configurations. Severity determines duration automatically."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Severity',
            default: 'default',
            options: [
              { value: 'default', label: 'Default (4s)' },
              { value: 'success', label: 'Success (4s)' },
              { value: 'info', label: 'Info (4s)' },
              { value: 'warning', label: 'Warning (7s)' },
              { value: 'destructive', label: 'Error (persistent)' },
            ],
          },
          { name: 'title', type: 'text', label: 'Title', default: 'Changes saved', placeholder: 'Toast title' },
          { name: 'description', type: 'text', label: 'Description', default: 'Your preferences have been updated.', placeholder: 'Toast description' },
        ]}
      >
        {(props) => (
          <Button 
            variant="outline" 
            onClick={() => toast({ 
              title: props.title, 
              description: props.description, 
              variant: props.variant
              // Duration is automatically set by severity per UI Guide v2.0
            })}
          >
            Show Toast
          </Button>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Severity Variants ──────────────────────────────────── */}
      <PlaygroundSection
        title="Severity Variants"
        description="Each severity has automatic duration: info/success (4s), warning (7s), error (never auto-dismiss)."
        code={`// Info/Success: 4 seconds
toast({ title: 'Settings saved', variant: 'success' });

// Warning: 7 seconds  
toast({ title: 'Session expiring', description: 'Save your work.', variant: 'warning' });

// Error: Never auto-dismiss
toast({ title: 'Connection failed', description: 'Check your network.', variant: 'destructive' });`}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Notification', description: 'Default toast.' })}>Default (4s)</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Settings saved', description: 'Your changes have been applied.', variant: 'success' })}>Success (4s)</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'New update available', description: 'Refresh to see changes.', variant: 'info' })}>Info (4s)</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Session expiring soon', description: 'You have 5 minutes remaining. Save your work.', variant: 'warning' })}>Warning (7s)</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Connection failed', description: 'Check your network and try again.', variant: 'destructive' })}>Error (persistent)</Button>
        </div>
      </PlaygroundSection>

      {/* ─── Content Guidelines ─────────────────────────────────── */}
      <PlaygroundSection
        title="Content Guidelines"
        description="UI Guide v2.0: Success uses past tense, no exclamation marks. Errors say what to do next."
        code={`// ✓ Good success message (past tense, no !)
toast({ title: 'Profile updated', variant: 'success' });

// ✗ Avoid: "Profile updated!" or "Updating profile..."

// ✓ Good error message (says what to do)
toast({ 
  title: 'Upload failed', 
  description: 'File too large. Try a file under 10MB.',
  variant: 'destructive' 
});`}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="py-3">
              <p className="text-xs font-[600] text-[var(--ok)] uppercase tracking-wider mb-3">✓ Correct Examples</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast({ title: 'Profile updated', variant: 'success' })}>
                  "Profile updated"
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast({ title: 'File uploaded', description: '3 files added to Documents.', variant: 'success' })}>
                  "File uploaded"
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast({ title: 'Connection failed', description: 'Check your network and try again.', variant: 'destructive' })}>
                  Error with next step
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3">
              <p className="text-xs font-[600] text-[var(--error)] uppercase tracking-wider mb-3">✗ Avoid</p>
              <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
                <div className="p-2 bg-[var(--muted)]/50 rounded line-through decoration-[var(--error)]">"Profile updated!"</div>
                <div className="p-2 bg-[var(--muted)]/50 rounded line-through decoration-[var(--error)]">"Success! Your file was uploaded!"</div>
                <div className="p-2 bg-[var(--muted)]/50 rounded line-through decoration-[var(--error)]">"Error occurred" (no next step)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Error with Correlation ID ──────────────────────────── */}
      <PlaygroundSection
        title="Error with Correlation ID"
        description="For API errors, include a correlation ID that users can copy and share with support."
        code={`toast({
  title: 'Request failed',
  description: 'Unable to process your request.',
  variant: 'destructive',
  correlationId: 'req_a1b2c3d4e5f6'
});`}
      >
        <Button 
          variant="outline" 
          onClick={() => toast({ 
            title: 'Request failed', 
            description: 'Unable to process your request. Contact support with the ID below.',
            variant: 'destructive',
            correlationId: 'req_' + Math.random().toString(36).substring(2, 14)
          })}
        >
          Show Error with Correlation ID
        </Button>
      </PlaygroundSection>

      {/* ─── With Action Button ─────────────────────────────────── */}
      <PlaygroundSection
        title="With Action Button"
        description="Toasts with actions never auto-dismiss (UI Guide rule). Action should be relevant to the message."
        code={`toast({
  title: 'File deleted',
  description: 'document.pdf moved to trash.',
  variant: 'destructive',
  action: <Button size="sm" onClick={handleUndo}>Undo</Button>
  // Duration is automatically set to 0 (never auto-dismiss)
});`}
      >
        <ActionToastDemo />
      </PlaygroundSection>

      {/* ─── Toast Limit ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Toast Limit (Max 3)"
        description="UI Guide v2.0: Maximum 3 visible toasts. Additional toasts queue until space opens."
        code={`// Rapidly show 5 toasts - only 3 will be visible
for (let i = 1; i <= 5; i++) {
  toast({ title: \`Toast \${i}\`, variant: 'info' });
}`}
      >
        <Button 
          variant="outline" 
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              setTimeout(() => {
                toast({ title: `Toast ${i} of 5`, description: 'Only 3 visible at once.', variant: 'info' });
              }, i * 100);
            }
          }}
        >
          Show 5 Toasts (Max 3 Visible)
        </Button>
      </PlaygroundSection>

      <PlaygroundSection
        title="Programmatic Dismiss"
        description="Use toast() return value to dismiss programmatically."
        code={`const { id, dismiss } = toast({ 
  title: 'Processing...', 
  variant: 'info'
});

// Later...
dismiss();`}
      >
        <ProgrammaticDismissDemo />
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Real-world use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns following UI Guide v2.0 content rules.</p>
      </div>

      <PlaygroundSection
        title="Form submission feedback"
        description="Success uses past tense. Error explains what to do."
        code={`// On success (past tense, no !)
toast({ title: 'Profile saved', variant: 'success' });

// On error (says what to do)
toast({ 
  title: 'Save failed', 
  description: 'Check your connection and try again.',
  variant: 'destructive' 
});`}
      >
        <div className="flex gap-2">
          <Button variant="default" size="sm" onClick={() => toast({ title: 'Profile saved', description: 'Your changes are now live.', variant: 'success' })}>
            Save Profile ✓
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Save failed', description: 'Check your connection and try again.', variant: 'destructive' })}>
            Save (Error)
          </Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Copy to clipboard"
        description="Quick feedback after copying."
        code={`navigator.clipboard.writeText(text);
toast({ title: 'Link copied', variant: 'success' });`}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            navigator.clipboard.writeText('https://example.com/share/abc123');
            toast({ title: 'Link copied', description: 'Share link copied to clipboard.', variant: 'success' });
          }}
        >
          Copy Share Link
        </Button>
      </PlaygroundSection>

      <PlaygroundSection
        title="Background task notification"
        description="Info for starting, success for completion."
        code={`// Start task (info, 4s)
toast({ title: 'Exporting report', variant: 'info' });

// When done (success, 4s)
toast({ title: 'Export complete', variant: 'success' });`}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            toast({ title: 'Exporting report', description: 'This may take a moment.', variant: 'info' });
            setTimeout(() => {
              toast({ title: 'Export complete', description: 'Your report is ready for download.', variant: 'success' });
            }, 2500);
          }}
        >
          Export Report
        </Button>
      </PlaygroundSection>

      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'title', type: 'string', default: '—', description: 'Toast title (required)' },
          { name: 'description', type: 'string', default: '—', description: 'Additional description text' },
          { name: 'variant', type: "'default' | 'success' | 'destructive' | 'warning' | 'info'", default: "'default'", description: 'Severity — determines color and duration' },
          { name: 'duration', type: 'number', default: 'auto', description: 'Auto by severity: info/success=4s, warning=7s, error=persistent. Override with explicit value.' },
          { name: 'action', type: 'ReactNode', default: '—', description: 'Action button. Toasts with actions never auto-dismiss.' },
          { name: 'correlationId', type: 'string', default: '—', description: 'Request ID for errors — displayed in mono, user can copy' },
        ]}
      />

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">Toaster Props</h4>
        <PropsTable
          props={[
            { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'bottom-right'", description: 'Position of toast stack. Auto-switches to top-center below 640px.' },
          ]}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">toast() Return Value</h4>
        <PropsTable
          props={[
            { name: 'id', type: 'string', default: '—', description: 'Unique toast identifier' },
            { name: 'dismiss', type: '() => void', default: '—', description: 'Function to dismiss this toast' },
          ]}
        />
      </div>
    </ComponentPage>
  );
}
