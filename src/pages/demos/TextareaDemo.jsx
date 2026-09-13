import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Textarea } from 'invin-uix/ui/textarea';
import { Input } from 'invin-uix/ui/input';
import { Label } from 'invin-uix/ui/label';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

export default function TextareaDemo() {
  return (
    <ComponentPage
      name="Textarea"
      description="Multi-line text input with 3 sizes, vertical resize, focus ring (no offset gap), disabled/readOnly states, error/success validation with aria-describedby, and a built-in character counter (showCount). Same design language as Input."
      importCode={`import { Textarea } from 'invin-uix/ui/textarea';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Textarea Playground"
        description="Experiment with different textarea configurations."
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
            ],
          },
          { name: 'rows', type: 'number', label: 'Rows', default: 4, min: 2, max: 10 },
          { name: 'showCount', type: 'boolean', label: 'Show Count', default: false },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
          { name: 'placeholder', type: 'text', label: 'Placeholder', default: 'Enter your message...', placeholder: 'Placeholder text' },
        ]}
      >
        {(props) => (
          <div className="w-full max-w-sm">
            <Textarea
              size={props.size}
              rows={props.rows}
              showCount={props.showCount}
              disabled={props.disabled}
              placeholder={props.placeholder}
              maxLength={props.showCount ? 200 : undefined}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset. Min-height + equal padding: sm 60px/8px, md 80px/12px, lg 120px/14px.' },
          { name: 'placeholder', type: 'string', default: '—', description: 'Placeholder text' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables textarea (50% opacity)' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Makes textarea read-only (muted background, no focus ring)' },
          { name: 'error', type: 'string', default: '—', description: 'Error message — renders below textarea and auto-sets aria-invalid + aria-describedby' },
          { name: 'success', type: 'string', default: '—', description: 'Success message — renders below textarea with green border' },
          { name: 'showCount', type: 'boolean', default: 'false', description: 'Show a live character counter. With maxLength shows count/max and turns red at the limit.' },
          { name: 'maxLength', type: 'number', default: '—', description: 'Native character limit (browser enforces); also drives the counter' },
          { name: 'autoResize', type: 'boolean', default: 'false', description: 'Textarea grows/shrinks with content instead of scrolling' },
          { name: 'minRows', type: 'number', default: '2', description: 'Minimum rows for auto-resize mode' },
          { name: 'maxRows', type: 'number', default: '—', description: 'Maximum rows before scrolling (auto-resize mode)' },
          { name: 'clearable', type: 'boolean', default: 'false', description: 'Show clear button when textarea has content' },
          { name: 'onClear', type: '() => void', default: '—', description: 'Callback when clear button is clicked' },
          { name: 'rows', type: 'number', default: '—', description: 'Initial visible rows (overrides min-height)' },
          { name: 'className', type: 'string', default: '—', description: 'Additional Tailwind/CSS classes' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Min-height and equal padding per size: sm (60px min-height, 8px padding), md (80px, 12px — default), lg (120px, 14px). All are vertically resizable."
        code={`<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium (default)" />
<Textarea size="lg" placeholder="Large" />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <Textarea size="sm" placeholder="Small textarea" />
          <Textarea size="md" placeholder="Medium textarea (default)" />
          <Textarea size="lg" placeholder="Large textarea" />
        </div>
      </PlaygroundSection>

      {/* ─── With Label ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Label"
        description="Standard form pattern — label above, textarea below."
        code={`<div className="space-y-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Type your message..." />
</div>`}
      >
        <div className="space-y-1.5 w-full max-w-sm">
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" placeholder="Type your message here..." />
        </div>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled"
        description="Reduced opacity, no pointer events. Content is still readable."
        code={`<Textarea disabled placeholder="Cannot edit" />
<Textarea disabled defaultValue="Read-only content that was previously entered." />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <Textarea disabled placeholder="Cannot edit" />
          <Textarea disabled defaultValue="Read-only content that was previously entered by the user." />
        </div>
      </PlaygroundSection>

      {/* ─── Read Only ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Read Only"
        description="Muted background, no focus ring. User can select and copy but not edit."
        code={`<Textarea readOnly defaultValue="This content cannot be edited but can be selected and copied." />`}
      >
        <div className="space-y-1.5 w-full max-w-sm">
          <Label htmlFor="readonly-ta">Terms (Read Only)</Label>
          <Textarea id="readonly-ta" readOnly defaultValue="This content cannot be edited but can be selected and copied. Useful for displaying terms, policies, or generated content." />
        </div>
      </PlaygroundSection>

      {/* ─── Error State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Error state"
        description="Pass error='message' to show red border + error text below. aria-invalid and aria-describedby are set automatically for accessibility."
        code={`<Textarea error="Bio must be at least 20 characters." defaultValue="x" />`}
      >
        <div className="space-y-1.5 w-full max-w-sm">
          <Label htmlFor="bio-err">Bio</Label>
          <Textarea id="bio-err" error="Bio must be at least 20 characters." defaultValue="x" />
        </div>
      </PlaygroundSection>

      {/* ─── Success State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Success state"
        description="Pass success='message' to show green border + success text below."
        code={`<Textarea success="Bio saved successfully!" defaultValue="This is my professional bio..." />`}
      >
        <div className="space-y-1.5 w-full max-w-sm">
          <Label htmlFor="bio-success">Bio</Label>
          <Textarea id="bio-success" success="Bio saved successfully!" defaultValue="This is my professional bio with all the required information." />
        </div>
      </PlaygroundSection>

      {/* ─── Character Count ────────────────────────────────────── */}
      <PlaygroundSection
        title="Character count"
        description="Pass showCount to render a live counter — no state wiring needed. With maxLength it shows count / max and turns red at the limit. Works controlled or uncontrolled."
        code={`// With a limit — shows "count / 200" and turns red at the limit
<Textarea showCount maxLength={200} placeholder="Write something..." />

// Without a limit — shows just the running count
<Textarea showCount placeholder="Notes..." />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="limited">Description</Label>
            <Textarea id="limited" showCount maxLength={200} placeholder="Write something..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" showCount placeholder="No limit — running count only..." />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Auto-Resize ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Auto-resize"
        description="Pass autoResize to make the textarea grow/shrink with content. Use minRows and maxRows to constrain height. Great for chat inputs and comment boxes."
        code={`// Grows from 2 rows (default min) to unlimited
<Textarea autoResize placeholder="Start typing..." />

// Constrained: 3 to 6 rows
<Textarea autoResize minRows={3} maxRows={6} placeholder="Limited growth..." />

// Single-line feel that expands
<Textarea autoResize minRows={1} maxRows={4} placeholder="Chat message..." />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="auto1">Unlimited growth</Label>
            <Textarea id="auto1" autoResize placeholder="Grows with content..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="auto2">Constrained (3-6 rows)</Label>
            <Textarea id="auto2" autoResize minRows={3} maxRows={6} placeholder="Limited growth — scrolls after 6 rows..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="auto3">Chat-style (1-4 rows)</Label>
            <Textarea id="auto3" autoResize minRows={1} maxRows={4} placeholder="Single line that expands..." />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Clearable ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Clearable"
        description="Pass clearable to show a clear button when textarea has content. Works for both controlled and uncontrolled usage."
        code={`<Textarea clearable placeholder="Type something to see clear button..." />

// With callback
<Textarea clearable onClear={() => console.log('Cleared!')} />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-1.5">
            <Label htmlFor="clearable1">Feedback</Label>
            <Textarea id="clearable1" clearable placeholder="Type something to see clear button..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="clearable2">With auto-resize</Label>
            <Textarea id="clearable2" clearable autoResize minRows={1} maxRows={4} placeholder="Clearable + auto-resize combo..." />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="Feedback form"
        description="Rating or support feedback with subject + message."
        code={`<Card>
  <CardContent>
    <div className="space-y-4">
      <Input placeholder="Subject" />
      <Textarea placeholder="Describe your issue..." size="lg" />
      <Button fullWidth>Submit Feedback</Button>
    </div>
  </CardContent>
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fb-subject">Subject</Label>
                <Input id="fb-subject" placeholder="Bug report" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fb-msg">Message</Label>
                <Textarea id="fb-msg" placeholder="Describe your issue in detail..." size="lg" />
              </div>
              <Button fullWidth>Submit Feedback</Button>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Comment box"
        description="Compact textarea with submit button inline."
        code={`<div className="flex gap-2 items-end">
  <div className="flex-1">
    <Textarea size="sm" placeholder="Add a comment..." />
  </div>
  <Button size="sm">Post</Button>
</div>`}
      >
        <div className="flex gap-2 items-end w-full max-w-md">
          <div className="flex-1">
            <Textarea size="sm" placeholder="Add a comment..." />
          </div>
          <Button size="sm">Post</Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="No resize"
        description="Disable resize with className when you want fixed height."
        code={`<Textarea className="resize-none" placeholder="Fixed height, no resize handle" />`}
      >
        <div className="w-full max-w-sm">
          <Textarea className="resize-none" placeholder="Fixed height — resize is disabled" />
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
