import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, DialogClose } from 'invin-uix/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from 'invin-uix/ui/alert-dialog';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Label } from 'invin-uix/ui/label';
import { Separator } from 'invin-uix/ui/separator';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Trash, Warning } from 'invin-uix/ui/icons';

export default function DialogDemo() {
  return (
    <ComponentPage
      name="Dialog"
      description="Modal overlay for content, forms, and confirmations. 5 size variants (sm/md/lg/xl/full), optional overlay close prevention. Two types: Dialog (dismissible) and AlertDialog (forced-choice)."
      importCode={`// General dialog (dismissible)
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from 'invin-uix/ui/dialog';

// Alert dialog (forced-choice, no overlay dismiss)
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from 'invin-uix/ui/alert-dialog';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Dialog Playground"
        description="Experiment with Dialog configurations."
        controls={[
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
              { value: 'xl', label: 'Extra Large' },
              { value: 'full', label: 'Full Screen' },
            ],
          },
          { name: 'hideClose', type: 'boolean', label: 'Hide Close Button', default: false },
          { name: 'preventOverlayClose', type: 'boolean', label: 'Prevent Overlay Close', default: false },
          { name: 'loading', type: 'boolean', label: 'Loading', default: false },
        ]}
      >
        {(props) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent 
              size={props.size} 
              hideClose={props.hideClose}
              preventOverlayClose={props.preventOverlayClose}
              loading={props.loading}
            >
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 my-2">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-name">Name</Label>
                  <Input id="demo-name" defaultValue="Admin User" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">DialogContent</p>
        <PropsTable
          props={[
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Dialog width — sm (384px), md (512px), lg (672px), xl (896px), full (100vw)' },
            { name: 'hideClose', type: 'boolean', default: 'false', description: 'Hide the X close button' },
            { name: 'preventOverlayClose', type: 'boolean', default: 'false', description: 'Prevent closing when clicking overlay' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state - shows spinner on close button, prevents closing' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">Dialog (Root)</p>
        <PropsTable
          props={[
            { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Open/close callback' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">AlertDialog</p>
        <PropsTable
          props={[
            { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state' },
            { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Open/close callback' },
          ]}
        />
        <p className="text-[var(--muted-foreground)] text-[var(--muted-foreground)]">
          AlertDialog cannot be dismissed by clicking overlay or pressing Escape — user must choose Cancel or Action.
        </p>
      </div>

      <Separator variant="bold" />

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="5 width presets: sm (384px), md (512px, default), lg (672px), xl (896px), full (screen)."
        code={`<DialogContent size="sm">Small</DialogContent>
<DialogContent size="md">Medium (default)</DialogContent>
<DialogContent size="lg">Large</DialogContent>
<DialogContent size="xl">Extra Large</DialogContent>
<DialogContent size="full">Full Screen</DialogContent>`}
      >
        <div className="flex flex-wrap gap-2">
          {['sm', 'md', 'lg', 'xl', 'full'].map((size) => (
            <Dialog key={size}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">{size}</Button>
              </DialogTrigger>
              <DialogContent size={size}>
                <DialogHeader>
                  <DialogTitle>Size: {size}</DialogTitle>
                  <DialogDescription>This dialog uses size="{size}"</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-[var(--muted-foreground)]">
                    {size === 'sm' && 'Small dialogs (max-w-sm / 384px) are great for confirmations.'}
                    {size === 'md' && 'Medium dialogs (max-w-lg / 512px) are the default, good for forms.'}
                    {size === 'lg' && 'Large dialogs (max-w-2xl / 672px) work well for complex forms.'}
                    {size === 'xl' && 'Extra large dialogs (max-w-4xl / 896px) fit data tables and previews.'}
                    {size === 'full' && 'Full screen dialogs take up the entire viewport minus some padding.'}
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Basic Dialog ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic Dialog"
        description="General purpose modal. Dismissible via X button, overlay click, or Escape key."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 my-2">
              <div className="space-y-1.5">
                <Label htmlFor="dlg-name">Name</Label>
                <Input id="dlg-name" defaultValue="Admin User" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dlg-email">Email</Label>
                <Input id="dlg-email" defaultValue="admin@invin.io" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PlaygroundSection>

      {/* ─── Alert Dialog ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Alert Dialog (confirmation)"
        description="Forced-choice modal. Cannot dismiss by clicking overlay or Escape. User must choose Cancel or Confirm."
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><Trash style={{ width: 14, height: 14 }} /> Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[var(--error)] border-transparent hover:brightness-110">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Dialog without close button ────────────────────────── */}
      <PlaygroundSection
        title="Dialog without X button"
        description="Use hideClose to remove the close button — useful for mandatory forms."
        code={`<DialogContent hideClose>
  ...
</DialogContent>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">No Close Button</Button>
          </DialogTrigger>
          <DialogContent hideClose>
            <DialogHeader>
              <DialogTitle>Complete Setup</DialogTitle>
              <DialogDescription>Please fill in the required information to continue.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 my-2">
              <div className="space-y-1.5">
                <Label htmlFor="dlg-org">Organization</Label>
                <Input id="dlg-org" placeholder="Your company name" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Continue</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">When to use Dialog vs AlertDialog.</p>
      </div>

      <PlaygroundSection
        title="Form dialog"
        description="Dialog for creating or editing records. User can dismiss without saving."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button>New Project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Project</DialogTitle>
    </DialogHeader>
    <Input placeholder="Project name" />
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>Start a new project in your workspace.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 my-2">
              <div className="space-y-1.5">
                <Label htmlFor="dlg-proj">Project name</Label>
                <Input id="dlg-proj" placeholder="My awesome project" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dlg-desc">Description</Label>
                <Input id="dlg-desc" placeholder="Brief description..." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PlaygroundSection>

      <PlaygroundSection
        title="Destructive confirmation"
        description="AlertDialog for dangerous actions. Forces user to make a deliberate choice."
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive" size="sm">Remove Member</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Remove team member?</AlertDialogTitle>
      <AlertDialogDescription>
        They will lose access to all projects.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep Member</AlertDialogCancel>
      <AlertDialogAction>Remove</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm"><Trash style={{ width: 14, height: 14 }} /> Remove Member</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove team member?</AlertDialogTitle>
              <AlertDialogDescription>
                This person will immediately lose access to all shared projects, documents, and resources. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Member</AlertDialogCancel>
              <AlertDialogAction className="bg-[var(--error)] border-transparent">Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      <PlaygroundSection
        title="Warning confirmation"
        description="Non-destructive but important confirmation."
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Deploy to Production</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Deploy to production?</AlertDialogTitle>
      <AlertDialogDescription>This will push changes to all users.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Deploy</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline"><Warning style={{ width: 14, height: 14 }} /> Deploy to Production</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deploy to production?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately push all staged changes to production. All active users will see the new version.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Deploy Now</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading state"
        description="Show a spinner on close button and prevent closing while saving. Use for async operations."
        code={`const [loading, setLoading] = useState(false);

<DialogContent loading={loading}>
  <DialogHeader>
    <DialogTitle>Save Changes</DialogTitle>
  </DialogHeader>
  <DialogFooter>
    <Button onClick={handleSave} loading={loading}>
      Save
    </Button>
  </DialogFooter>
</DialogContent>`}
      >
        <LoadingDialogDemo />
      </PlaygroundSection>

      {/* ─── Scrollable Content ─────────────────────────────────── */}
      <PlaygroundSection
        title="Scrollable content (DialogBody)"
        description="Use DialogBody for long content. Header and footer stay fixed while body scrolls."
        code={`<DialogContent>
  <DialogHeader>
    <DialogTitle>Terms of Service</DialogTitle>
  </DialogHeader>
  <DialogBody maxHeight="50vh">
    {/* Long scrollable content */}
    <p>Lorem ipsum dolor sit amet...</p>
  </DialogBody>
  <DialogFooter>
    <Button>Accept</Button>
  </DialogFooter>
</DialogContent>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Terms (Scrollable)</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>Please read and accept our terms.</DialogDescription>
            </DialogHeader>
            <DialogBody maxHeight="300px">
              <div className="space-y-4 text-[var(--muted-foreground)]">
                <p><strong>1. Acceptance of Terms</strong></p>
                <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p><strong>2. Use License</strong></p>
                <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
                <p><strong>3. Disclaimer</strong></p>
                <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.</p>
                <p><strong>4. Limitations</strong></p>
                <p>In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
                <p><strong>5. Revisions</strong></p>
                <p>We may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version.</p>
                <p><strong>6. Privacy Policy</strong></p>
                <p>Your privacy is important to us. Our privacy policy explains how we collect, use, and protect your personal information.</p>
                <p><strong>7. Governing Law</strong></p>
                <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.</p>
              </div>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Decline</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Accept Terms</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PlaygroundSection>

    </ComponentPage>
  );
}

// Loading dialog demo component
function LoadingDialogDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Loading Demo</Button>
      </DialogTrigger>
      <DialogContent loading={loading}>
        <DialogHeader>
          <DialogTitle>Edit Settings</DialogTitle>
          <DialogDescription>Click save to see the loading state. Close is disabled while saving.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 my-2">
          <div className="space-y-1.5">
            <Label htmlFor="dlg-setting">Setting Name</Label>
            <Input id="dlg-setting" defaultValue="Default Value" disabled={loading} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} loading={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
