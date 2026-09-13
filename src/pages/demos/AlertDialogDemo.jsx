import React, { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
} from 'invin-uix/ui/alert-dialog';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { Trash, Warning, SignOut, CheckCircle, Info } from 'invin-uix/ui/icons';

// Stable AlertDialog component that doesn't remount on prop changes
function AlertDialogPreview({ size, showIcon, iconVariant, actionVariant }) {
  // Map icon variant to actual icon component
  const iconMap = {
    default: <Info />,
    destructive: <Trash />,
    warning: <Warning />,
    info: <Info />,
    success: <CheckCircle />,
    accent: <CheckCircle />,
  };
  
  const selectedIcon = iconMap[iconVariant] || <Info />;
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={actionVariant === 'destructive' ? 'destructive' : 'accent'}>
          {React.cloneElement(selectedIcon, { style: { width: 14, height: 14 } })}
          {actionVariant === 'destructive' ? 'Delete Item' : 'Confirm Action'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent 
        size={size}
        icon={showIcon ? selectedIcon : undefined}
        iconVariant={iconVariant}
      >
        <AlertDialogHeader className={showIcon ? 'text-center' : ''}>
          <AlertDialogTitle>
            {actionVariant === 'destructive' ? 'Are you sure?' : 'Confirm action'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {actionVariant === 'destructive' 
              ? 'This action cannot be undone. This will permanently delete the item.'
              : 'Please confirm that you want to proceed with this action.'
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={actionVariant}>
            {actionVariant === 'destructive' ? 'Delete' : 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AlertDialogDemo() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleAsyncDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setDeleteOpen(false);
  };

  return (
    <ComponentPage
      name="Alert Dialog"
      description="A modal confirmation dialog that requires explicit user action. Use for destructive operations (delete, discard) or important confirmations. Supports sizes, built-in icon with colored background, and loading state."
      importCode={`import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle,
  AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
} from 'invin-uix/ui/alert-dialog';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Alert Dialog Playground"
        description="Experiment with Alert Dialog configurations."
        controls={[
          { name: 'size', type: 'select', label: 'Size', default: 'md', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
          { name: 'showIcon', type: 'boolean', label: 'Show Icon', default: true },
          { name: 'iconVariant', type: 'select', label: 'Icon Variant', default: 'destructive', options: [{ value: 'default', label: 'Default' }, { value: 'destructive', label: 'Destructive' }, { value: 'warning', label: 'Warning' }, { value: 'info', label: 'Info' }, { value: 'success', label: 'Success' }, { value: 'accent', label: 'Accent' }] },
          { name: 'actionVariant', type: 'select', label: 'Action Variant', default: 'destructive', options: [{ value: 'destructive', label: 'Destructive' }, { value: 'primary', label: 'Primary' }] },
        ]}
      >
        {(props) => (
          <AlertDialogPreview
            size={props.size}
            showIcon={props.showIcon}
            iconVariant={props.iconVariant}
            actionVariant={props.actionVariant}
          />
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state' },
          { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback on open/close' },
          { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Uncontrolled default state' },
        ]}
      />

      <h4 className="text-[var(--foreground)] font-[600] mt-6 mb-2">AlertDialogContent Props</h4>
      <PropsTable
        props={[
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dialog width' },
          { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon displayed at top with colored circle' },
          { name: 'iconVariant', type: "'default' | 'destructive' | 'warning' | 'info' | 'success'", default: "'destructive'", description: 'Icon background color' },
        ]}
      />

      <h4 className="text-[var(--foreground)] font-[600] mt-6 mb-2">AlertDialogAction Props</h4>
      <PropsTable
        props={[
          { name: 'variant', type: "'primary' | 'destructive'", default: "'primary'", description: 'Button style for confirm action' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner and disable button' },
        ]}
      />

      <Separator />

      {/* ─── Sizes ────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Three sizes: sm (max-w-sm), md (max-w-md, default), lg (max-w-lg)."
      >
        <div className="flex gap-3 flex-wrap">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Small</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Small dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  Compact confirmation for simple actions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Medium (default)</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="md">
              <AlertDialogHeader>
                <AlertDialogTitle>Medium dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  Standard size for most confirmations. Good balance of readability and focus.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Large</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Large dialog</AlertDialogTitle>
                <AlertDialogDescription>
                  More space for longer descriptions or additional context. Use when you need to explain consequences in detail before the user makes a decision.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PlaygroundSection>

      {/* ─── With Icon ────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Icon"
        description="Built-in icon with colored background circle. Use iconVariant to match the action type."
      >
        <div className="flex gap-3 flex-wrap">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive"><Trash style={{ width: 14, height: 14 }} /> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent icon={<Trash />} iconVariant="destructive">
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The item will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"><Warning style={{ width: 14, height: 14 }} /> Reset</Button>
            </AlertDialogTrigger>
            <AlertDialogContent icon={<Warning />} iconVariant="warning">
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will restore factory defaults. All customizations will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"><Info style={{ width: 14, height: 14 }} /> Info</Button>
            </AlertDialogTrigger>
            <AlertDialogContent icon={<Info />} iconVariant="info">
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle>Session expiring</AlertDialogTitle>
                <AlertDialogDescription>
                  Your session will expire in 5 minutes. Would you like to extend it?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Sign out</AlertDialogCancel>
                <AlertDialogAction>Extend session</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline"><CheckCircle style={{ width: 14, height: 14 }} /> Success</Button>
            </AlertDialogTrigger>
            <AlertDialogContent icon={<CheckCircle />} iconVariant="success">
              <AlertDialogHeader className="text-center">
                <AlertDialogTitle>Publish changes?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your changes are ready to go live. This will be visible to all users.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Publish</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PlaygroundSection>

      {/* ─── Delete confirmation ────────────────────────────── */}
      <PlaygroundSection
        title="Delete confirmation"
        description="Classic destructive action confirmation — user must explicitly confirm or cancel."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><Trash style={{ width: 14, height: 14 }} /> Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent icon={<Trash />} iconVariant="destructive">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>Delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and remove all your data from our servers. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Yes, delete account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Discard changes ──────────────────────────────────── */}
      <PlaygroundSection
        title="Discard changes"
        description="Warn users before discarding unsaved work."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Discard Draft</Button>
          </AlertDialogTrigger>
          <AlertDialogContent icon={<Warning />} iconVariant="warning">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes in this document. If you discard now, all changes since your last save will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction>Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Logout confirmation ──────────────────────────────── */}
      <PlaygroundSection
        title="Logout confirmation"
        description="Confirm session-ending actions."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost"><SignOut style={{ width: 14, height: 14 }} /> Sign out</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of all devices. Any unsaved progress will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay signed in</AlertDialogCancel>
              <AlertDialogAction>Sign out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Loading state ────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading state"
        description="Show a loading spinner during async operations like API calls."
      >
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><Trash style={{ width: 14, height: 14 }} /> Delete with Loading</Button>
          </AlertDialogTrigger>
          <AlertDialogContent icon={<Trash />} iconVariant="destructive">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle>Delete this item?</AlertDialogTitle>
              <AlertDialogDescription>
                Click delete to see the loading state (2 second delay).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                variant="destructive" 
                loading={isDeleting}
                onClick={(e) => {
                  e.preventDefault();
                  handleAsyncDelete();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

      {/* ─── Without icon (classic) ───────────────────────────── */}
      <PlaygroundSection
        title="Without icon (classic)"
        description="Simple text-only confirmation without icon."
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Classic Style</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to proceed with this action?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PlaygroundSection>

    </ComponentPage>
  );
}
