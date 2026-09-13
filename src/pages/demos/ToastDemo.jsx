import { ComponentPage, PlaygroundSection, InteractiveDemo, PropsTable } from '../../components/PlaygroundSection.jsx';
import { Toaster, toast, useToast } from 'invin-uix/ui/toast';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { useState } from 'react';

// Demo component for action buttons
function ActionToastDemo() {
  const handleUndo = () => {
    toast({ title: 'Undo successful', variant: 'success', duration: 2000 });
  };
  
  return (
    <Button 
      variant="outline" 
      onClick={() => toast({ 
        title: 'File deleted', 
        description: 'document.pdf has been moved to trash.',
        variant: 'destructive',
        duration: 6000,
        action: (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleUndo}
            style={{ marginLeft: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}
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
      title: 'Processing...', 
      description: 'This toast stays until dismissed.',
      duration: 0, // infinite
      variant: 'info'
    });
    setToastId({ id, dismiss });
  };
  
  const dismissToast = () => {
    if (toastId) {
      toastId.dismiss();
      setToastId(null);
      toast({ title: 'Toast dismissed', variant: 'success', duration: 2000 });
    }
  };
  
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={showPersistent} disabled={!!toastId}>
        Show Persistent Toast
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
      description="Non-intrusive notification messages that appear temporarily. Supports variants, positioning, duration, and action buttons."
      importCode={`import { Toaster, toast } from 'invin-uix/ui/toast';
// Place <Toaster /> once in your app root`}
    >
      <Toaster position="top-right" />

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Toast Playground"
        description="Experiment with different toast configurations. Click the button to trigger a toast."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'success', label: 'Success' },
              { value: 'warning', label: 'Warning' },
              { value: 'destructive', label: 'Destructive' },
              { value: 'info', label: 'Info' },
            ],
          },
          { name: 'duration', type: 'number', label: 'Duration (ms)', default: 4000, min: 1000, max: 10000 },
          { name: 'title', type: 'text', label: 'Title', default: 'Notification', placeholder: 'Toast title' },
          { name: 'description', type: 'text', label: 'Description', default: 'This is a toast message.', placeholder: 'Toast description' },
        ]}
      >
        {(props) => (
          <Button 
            variant="outline" 
            onClick={() => toast({ 
              title: props.title, 
              description: props.description, 
              variant: props.variant,
              duration: props.duration
            })}
          >
            Show Toast
          </Button>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      <PlaygroundSection
        title="Variants"
        description="Five semantic variants for different message types."
        code={`toast({ title: 'Default notification' });
toast({ title: 'Success!', variant: 'success' });
toast({ title: 'Warning', variant: 'warning' });
toast({ title: 'Error occurred', variant: 'destructive' });
toast({ title: 'Info message', variant: 'info' });`}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Default notification', description: 'This is a default toast.' })}>Default</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Success!', description: 'Action completed.', variant: 'success' })}>Success</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Warning', description: 'Check this out.', variant: 'warning' })}>Warning</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' })}>Destructive</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Info', description: 'Here is some info.', variant: 'info' })}>Info</Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Description"
        description="Add a description for more context."
        code={`toast({
  title: 'Scheduled',
  description: 'Meeting set for Friday at 3pm.',
});`}
      >
        <Button variant="outline" onClick={() => toast({ title: 'Scheduled', description: 'Your meeting has been set for Friday at 3:00 PM.' })}>
          Show with Description
        </Button>
      </PlaygroundSection>

      <PlaygroundSection
        title="Custom Duration"
        description="Control how long the toast stays visible (default 4000ms)."
        code={`toast({ title: 'Quick', duration: 1500 });
toast({ title: 'Long', duration: 8000 });`}
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Quick toast', description: 'Gone in 1.5s', duration: 1500 })}>1.5s</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Standard toast', description: 'Default 4s duration' })}>4s (default)</Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Long toast', description: 'Stays for 8s', duration: 8000 })}>8s</Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Action Button"
        description="Add an action button for undo, retry, or other quick actions."
        code={`toast({
  title: 'File deleted',
  description: 'document.pdf has been moved to trash.',
  variant: 'destructive',
  duration: 6000,
  action: <Button size="sm" onClick={handleUndo}>Undo</Button>
});`}
      >
        <ActionToastDemo />
      </PlaygroundSection>

      <PlaygroundSection
        title="Programmatic Dismiss"
        description="Use toast() return value to dismiss programmatically. Set duration: 0 for persistent toasts."
        code={`const { id, dismiss } = toast({ 
  title: 'Processing...', 
  duration: 0  // infinite
});

// Later...
dismiss();  // or use id with useToast().dismiss(id)`}
      >
        <ProgrammaticDismissDemo />
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Real-world use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns for production apps.</p>
      </div>

      <PlaygroundSection
        title="Form submission feedback"
        description="Success/error toasts after form submit."
        code={`// On success
toast({ title: 'Profile updated', variant: 'success' });

// On error
toast({ 
  title: 'Failed to save', 
  description: 'Please try again.',
  variant: 'destructive' 
});`}
      >
        <div className="flex gap-2">
          <Button variant="default" size="sm" onClick={() => toast({ title: 'Profile updated', description: 'Your changes have been saved.', variant: 'success' })}>
            Save Profile ✓
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Failed to save', description: 'Network error. Please try again.', variant: 'destructive' })}>
            Save (Error)
          </Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Copy to clipboard"
        description="Quick feedback after copying."
        code={`navigator.clipboard.writeText(text);
toast({ title: 'Copied!', variant: 'success', duration: 2000 });`}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            navigator.clipboard.writeText('https://example.com/share/abc123');
            toast({ title: 'Link copied!', description: 'Share link copied to clipboard.', variant: 'success', duration: 2000 });
          }}
        >
          Copy Share Link
        </Button>
      </PlaygroundSection>

      <PlaygroundSection
        title="Background task notification"
        description="Notify when async operations complete."
        code={`// Start task
toast({ title: 'Exporting...', variant: 'info' });

// When done
toast({ title: 'Export complete', description: 'Download ready.', variant: 'success' });`}
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            toast({ title: 'Exporting report...', description: 'This may take a moment.', variant: 'info', duration: 2000 });
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
          { name: 'variant', type: "'default' | 'success' | 'destructive' | 'warning' | 'info'", default: "'default'", description: 'Visual style/color' },
          { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss time in ms (0 = persistent)' },
          { name: 'action', type: 'ReactNode', default: '—', description: 'Action button or content' },
        ]}
      />

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">Toaster Props</h4>
        <PropsTable
          props={[
            { name: 'position', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'", default: "'bottom-right'", description: 'Position of toast stack' },
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
