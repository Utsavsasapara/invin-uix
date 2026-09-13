import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { RadioGroup, RadioGroupItem } from 'invin-uix/ui/radio-group';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';

export default function RadioGroupDemo() {
  const [plan, setPlan] = useState('pro');
  const [value, setValue] = useState('comfortable');

  return (
    <ComponentPage
      name="Radio Group"
      description="Single-selection from a list of options. Built on Radix UI with arrow-key navigation, focus ring (no offset gap), error state with aria-describedby, and accent dot indicator on selected."
      importCode={`import { RadioGroup, RadioGroupItem } from 'invin-uix/ui/radio-group';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Radio Group Playground"
        description="Experiment with different radio group configurations."
        controls={[
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (14px)' },
              { value: 'md', label: 'Medium (16px)' },
              { value: 'lg', label: 'Large (20px)' },
            ],
          },
          {
            name: 'orientation',
            type: 'select',
            label: 'Orientation',
            default: 'vertical',
            options: [
              { value: 'vertical', label: 'Vertical' },
              { value: 'horizontal', label: 'Horizontal' },
            ],
          },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
        ]}
      >
        {(props) => (
          <RadioGroup 
            defaultValue="option2" 
            disabled={props.disabled}
            className={props.orientation === 'horizontal' ? 'flex gap-6' : 'space-y-2'}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option1" size={props.size} id="pg-r1" />
              <Label htmlFor="pg-r1" className={props.disabled ? 'opacity-50' : ''}>Option 1</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option2" size={props.size} id="pg-r2" />
              <Label htmlFor="pg-r2" className={props.disabled ? 'opacity-50' : ''}>Option 2</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option3" size={props.size} id="pg-r3" />
              <Label htmlFor="pg-r3" className={props.disabled ? 'opacity-50' : ''}>Option 3</Label>
            </div>
          </RadioGroup>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">RadioGroup (Root)</p>
        <PropsTable
          props={[
            { name: 'value', type: 'string', default: '—', description: 'Controlled selected value' },
            { name: 'defaultValue', type: 'string', default: '—', description: 'Uncontrolled initial value' },
            { name: 'onValueChange', type: '(value: string) => void', default: '—', description: 'Selection change callback' },
            { name: 'label', type: 'string', default: '—', description: 'Label text rendered above the group' },
            { name: 'required', type: 'boolean', default: 'false', description: 'Shows asterisk next to label' },
            { name: 'error', type: 'string', default: '—', description: 'Error message — renders below and sets aria-invalid' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables entire group' },
            { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction for arrow key navigation' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">RadioGroupItem</p>
        <PropsTable
          props={[
            { name: 'value', type: 'string (required)', default: '—', description: 'Option value' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Radio button size (14px / 16px / 20px)' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this individual option' },
            { name: 'id', type: 'string', default: '—', description: 'Links with Label via htmlFor' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic"
        description="Vertical radio group with labels. Arrow keys cycle between options."
        code={`<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="comfortable" className="space-y-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="sm (14px), md (16px, default), lg (20px). Dot indicator scales with size."
        code={`<RadioGroupItem size="sm" value="sm" />
<RadioGroupItem size="md" value="md" />
<RadioGroupItem size="lg" value="lg" />`}
      >
        <div className="flex items-center gap-8">
          <RadioGroup defaultValue="sm">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sm" size="sm" id="sz-sm" />
              <Label htmlFor="sz-sm">Small</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="md">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="md" size="md" id="sz-md" />
              <Label htmlFor="sz-md">Medium</Label>
            </div>
          </RadioGroup>
          <RadioGroup defaultValue="lg">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="lg" size="lg" id="sz-lg" />
              <Label htmlFor="sz-lg">Large</Label>
            </div>
          </RadioGroup>
        </div>
      </PlaygroundSection>

      {/* ─── Horizontal ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Horizontal layout"
        description="Use flex on the group for inline options."
        code={`<RadioGroup defaultValue="left" className="flex gap-4">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="left" id="h1" />
    <Label htmlFor="h1">Left</Label>
  </div>
  ...
</RadioGroup>`}
      >
        <RadioGroup defaultValue="center" className="flex gap-6">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="left" id="h-left" />
            <Label htmlFor="h-left">Left</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="center" id="h-center" />
            <Label htmlFor="h-center">Center</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="right" id="h-right" />
            <Label htmlFor="h-right">Right</Label>
          </div>
        </RadioGroup>
      </PlaygroundSection>

      {/* ─── Controlled ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled"
        description="value + onValueChange for external state management."
        code={`const [value, setValue] = useState('comfortable');

<RadioGroup value={value} onValueChange={setValue}>
  ...
</RadioGroup>
<p>Selected: {value}</p>`}
      >
        <div className="space-y-3">
          <RadioGroup value={value} onValueChange={setValue} className="space-y-2">
            <div className="flex items-center gap-2"><RadioGroupItem value="default" id="ctrl-1" /><Label htmlFor="ctrl-1">Default</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="ctrl-2" /><Label htmlFor="ctrl-2">Comfortable</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="ctrl-3" /><Label htmlFor="ctrl-3">Compact</Label></div>
          </RadioGroup>
          <p className="text-[var(--muted-foreground)] text-[var(--muted-foreground)]">Selected: <strong className="text-[var(--accent)]">{value}</strong></p>
        </div>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled"
        description="Disable the entire group or individual items."
        code={`<RadioGroup disabled defaultValue="opt1">
  ...
</RadioGroup>`}
      >
        <RadioGroup disabled defaultValue="opt1" className="space-y-2">
          <div className="flex items-center gap-2"><RadioGroupItem value="opt1" id="dis-1" /><Label htmlFor="dis-1" className="opacity-50">Option 1 (selected)</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="opt2" id="dis-2" /><Label htmlFor="dis-2" className="opacity-50">Option 2</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="opt3" id="dis-3" /><Label htmlFor="dis-3" className="opacity-50">Option 3</Label></div>
        </RadioGroup>
      </PlaygroundSection>

      {/* ─── Error State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Error state"
        description="Pass error='message' to RadioGroup to show validation error. Sets aria-invalid and aria-describedby automatically."
        code={`<RadioGroup error="Please select an option">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="opt1" id="err-1" />
    <Label htmlFor="err-1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="opt2" id="err-2" />
    <Label htmlFor="err-2">Option 2</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup error="Please select an option" className="space-y-2">
          <div className="flex items-center gap-2"><RadioGroupItem value="opt1" id="err-1" /><Label htmlFor="err-1">Option 1</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="opt2" id="err-2" /><Label htmlFor="err-2">Option 2</Label></div>
          <div className="flex items-center gap-2"><RadioGroupItem value="opt3" id="err-3" /><Label htmlFor="err-3">Option 3</Label></div>
        </RadioGroup>
      </PlaygroundSection>

      {/* ─── Label with Required ────────────────────────────────── */}
      <PlaygroundSection
        title="Label with required indicator"
        description="Use label and required props for built-in label with asterisk. Adds aria-required and aria-labelledby automatically."
        code={`<RadioGroup label="Subscription Plan" required>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="free" id="plan1" />
    <Label htmlFor="plan1">Free</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="plan2" />
    <Label htmlFor="plan2">Pro</Label>
  </div>
</RadioGroup>`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <RadioGroup label="Subscription Plan" required defaultValue="pro" className="space-y-2">
            <div className="flex items-center gap-2"><RadioGroupItem value="free" id="req-1" /><Label htmlFor="req-1">Free — 5 projects</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="pro" id="req-2" /><Label htmlFor="req-2">Pro — Unlimited</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="enterprise" id="req-3" /><Label htmlFor="req-3">Enterprise — Custom</Label></div>
          </RadioGroup>
          <RadioGroup label="Contact preference" required error="Please select how we can reach you" className="space-y-2">
            <div className="flex items-center gap-2"><RadioGroupItem value="email" id="contact-1" /><Label htmlFor="contact-1">Email</Label></div>
            <div className="flex items-center gap-2"><RadioGroupItem value="phone" id="contact-2" /><Label htmlFor="contact-2">Phone</Label></div>
          </RadioGroup>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="Plan selection"
        description="Radio group for pricing/plan selection in a card."
        code={`<RadioGroup value={plan} onValueChange={setPlan}>
  {plans.map(p => (
    <Card hover selected={plan === p.value}>
      <RadioGroupItem value={p.value} />
      <span>{p.name} — {p.price}</span>
    </Card>
  ))}
</RadioGroup>`}
      >
        <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2 w-full max-w-sm">
          {[
            { value: 'free', name: 'Free', price: '$0/mo', desc: '5 projects, 1GB' },
            { value: 'pro', name: 'Pro', price: '$29/mo', desc: 'Unlimited, 100GB' },
            { value: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'SSO, SLA, dedicated' },
          ].map(p => (
            <label key={p.value} className={`flex items-center gap-3 p-3 rounded-[var(--radius-sm,9px)] border cursor-pointer transition-colors ${plan === p.value ? 'border-[var(--accent)] bg-[var(--accent-soft)]' : 'border-[var(--border)] hover:bg-[var(--secondary)]'}`}>
              <RadioGroupItem value={p.value} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--foreground)] font-[600]">{p.name}</span>
                  {p.value === 'pro' && <Badge variant="default" size="sm">Popular</Badge>}
                </div>
                <p className="text-[10px] text-[var(--muted-foreground)]">{p.desc}</p>
              </div>
              <span className="text-[var(--foreground)] font-[600]">{p.price}</span>
            </label>
          ))}
        </RadioGroup>
      </PlaygroundSection>

      <PlaygroundSection
        title="Settings preference"
        description="Theme or density selection in a settings panel."
        code={`<Label>Display density</Label>
<RadioGroup defaultValue="comfortable" className="mt-2 space-y-2">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="comfortable" id="pref-1" />
    <Label htmlFor="pref-1">Comfortable</Label>
  </div>
  ...
</RadioGroup>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4">
            <p className="text-[var(--foreground)] font-[600] mb-3">Display density</p>
            <RadioGroup defaultValue="comfortable" className="space-y-2">
              <div className="flex items-center gap-2"><RadioGroupItem value="compact" id="pref-compact" /><Label htmlFor="pref-compact">Compact — smaller text and spacing</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="pref-comfortable" /><Label htmlFor="pref-comfortable">Comfortable — balanced</Label></div>
              <div className="flex items-center gap-2"><RadioGroupItem value="spacious" id="pref-spacious" /><Label htmlFor="pref-spacious">Spacious — more breathing room</Label></div>
            </RadioGroup>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
