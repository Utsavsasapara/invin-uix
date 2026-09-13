import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Button } from 'invin-uix/ui/button';

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [items, setItems] = useState([
    { id: 'email', label: 'Email notifications', checked: true },
    { id: 'sms', label: 'SMS notifications', checked: false },
    { id: 'push', label: 'Push notifications', checked: true },
    { id: 'slack', label: 'Slack messages', checked: false },
  ]);

  const toggleItem = (id, v) => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: v } : i));
  const allChecked = items.every(i => i.checked);
  const someChecked = items.some(i => i.checked) && !allChecked;

  return (
    <ComponentPage
      name="Checkbox"
      description="Toggle control for binary or multi-select choices. Built on Radix UI with keyboard support, 3 visual variants (solid, outline, subtle), 3 sizes, indeterminate state (minus icon), and error state."
      importCode={`import { Checkbox } from 'invin-uix/ui/checkbox';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Checkbox Playground"
        description="Experiment with different checkbox configurations."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'solid',
            options: [
              { value: 'solid', label: 'Solid' },
              { value: 'outline', label: 'Outline' },
              { value: 'subtle', label: 'Subtle' },
            ],
          },
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
          {
            name: 'state',
            type: 'select',
            label: 'State',
            default: 'checked',
            options: [
              { value: 'unchecked', label: 'Unchecked' },
              { value: 'checked', label: 'Checked (✓)' },
              { value: 'indeterminate', label: 'Indeterminate (—)' },
            ],
          },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
          { name: 'hasError', type: 'boolean', label: 'Show Error', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Checkbox
                variant={props.variant}
                size={props.size}
                checked={props.state === 'unchecked' ? false : props.state === 'indeterminate' ? 'indeterminate' : true}
                disabled={props.disabled}
                error={props.hasError}
                id="demo-checkbox"
              />
              <Label htmlFor="demo-checkbox" className={props.disabled ? 'opacity-50' : ''}>
                Accept terms and conditions
              </Label>
            </div>
            {props.hasError && (
              <p className="text-[var(--error)] text-[length:var(--text-label)]">
                You must accept the terms
              </p>
            )}
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'variant', type: "'solid' | 'outline' | 'subtle'", default: "'solid'", description: 'Visual style — solid (filled), outline (border only), subtle (light bg)' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Checkbox dimensions (14px / 16px / 20px)' },
          { name: 'checked', type: 'boolean | "indeterminate"', default: '—', description: 'Controlled checked state' },
          { name: 'defaultChecked', type: 'boolean', default: '—', description: 'Uncontrolled initial state' },
          { name: 'onCheckedChange', type: '(checked: boolean | "indeterminate") => void', default: '—', description: 'Change callback' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction (50% opacity)' },
          { name: 'error', type: 'boolean | string', default: '—', description: 'Shows red border on checkbox. Render error message separately in your layout.' },
          { name: 'id', type: 'string', default: '—', description: 'Links with Label via htmlFor' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic with Label"
        description="Click the checkbox or the label text to toggle. Always pair with Label for accessibility."
        code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="Three visual styles: solid (filled accent), outline (border + checkmark), subtle (light background)."
        code={`<Checkbox variant="solid" defaultChecked />
<Checkbox variant="outline" defaultChecked />
<Checkbox variant="subtle" defaultChecked />`}
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Checkbox variant="solid" defaultChecked id="v-solid" />
            <Label htmlFor="v-solid">Solid</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox variant="outline" defaultChecked id="v-outline" />
            <Label htmlFor="v-outline">Outline</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox variant="subtle" defaultChecked id="v-subtle" />
            <Label htmlFor="v-subtle">Subtle</Label>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="sm (14px), md (16px, default), lg (20px). Check icon scales proportionally."
        code={`<Checkbox size="sm" defaultChecked />
<Checkbox size="md" defaultChecked />
<Checkbox size="lg" defaultChecked />`}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox size="sm" defaultChecked id="cb-sm" />
            <Label htmlFor="cb-sm">Small</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox size="md" defaultChecked id="cb-md" />
            <Label htmlFor="cb-md">Medium</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox size="lg" defaultChecked id="cb-lg" />
            <Label htmlFor="cb-lg">Large</Label>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Controlled ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled"
        description="Manage state externally with checked + onCheckedChange."
        code={`const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onCheckedChange={setChecked} />
<span>{checked ? 'Checked' : 'Unchecked'}</span>`}
      >
        <div className="flex items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={setChecked} id="controlled" />
          <Label htmlFor="controlled">
            State: <strong className="text-[var(--accent)]">{checked ? 'Checked' : 'Unchecked'}</strong>
          </Label>
        </div>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled"
        description="Prevents interaction. Works in both checked and unchecked states."
        code={`<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox disabled id="cb-dis-un" />
            <Label htmlFor="cb-dis-un" className="opacity-50">Disabled unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox disabled defaultChecked id="cb-dis-ch" />
            <Label htmlFor="cb-dis-ch" className="opacity-50">Disabled checked</Label>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Indeterminate State ────────────────────────────────── */}
      <PlaygroundSection
        title="Indeterminate state"
        description="Shows a minus icon instead of checkmark. Used for 'select all' when some but not all items are selected."
        code={`<Checkbox checked="indeterminate" />

// Common usage: parent checkbox
const allChecked = items.every(i => i.checked);
const someChecked = items.some(i => i.checked) && !allChecked;

<Checkbox 
  checked={allChecked ? true : someChecked ? 'indeterminate' : false} 
/>`}
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Checkbox id="indet-unchecked" />
            <Label htmlFor="indet-unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="indet-checked" defaultChecked />
            <Label htmlFor="indet-checked">Checked (✓)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="indet-indet" checked="indeterminate" />
            <Label htmlFor="indet-indet">Indeterminate (—)</Label>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Error State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Error state"
        description="Pass error={true} or error='message' to show red border. Render the error message in your form layout below the checkbox row."
        code={`<div className="space-y-1">
  <div className="flex items-center gap-2">
    <Checkbox id="terms" error />
    <Label htmlFor="terms">Accept terms and conditions</Label>
  </div>
  <p className="text-[var(--error)] text-[length:var(--text-label)]">
    You must accept the terms
  </p>
</div>`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Checkbox id="terms-error" error />
            <Label htmlFor="terms-error">Accept terms and conditions</Label>
          </div>
          <p className="text-[var(--error)] text-[length:var(--text-label)]">
            You must accept the terms
          </p>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real forms.</p>
      </div>

      <PlaygroundSection
        title="Select all + items"
        description="Parent checkbox controls all children. Shows indeterminate when partially selected."
        code={`<Checkbox
  checked={allChecked ? true : someChecked ? 'indeterminate' : false}
  onCheckedChange={(v) => setItems(items.map(i => ({ ...i, checked: !!v })))}
/>

{items.map(item => (
  <Checkbox checked={item.checked} onCheckedChange={(v) => toggle(item.id, v)} />
))}`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-3 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
              <Checkbox
                id="select-all"
                checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                onCheckedChange={(v) => setItems(items.map(i => ({ ...i, checked: !!v })))}
              />
              <Label htmlFor="select-all" className="font-[600]">Select all</Label>
              <span className="text-[10px] text-[var(--muted-foreground-faint)] ml-auto">{items.filter(i => i.checked).length}/{items.length}</span>
            </div>
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox
                  id={item.id}
                  checked={item.checked}
                  onCheckedChange={(v) => toggleItem(item.id, v)}
                />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Form agreement"
        description="Required checkbox before form submission."
        code={`<div className="flex items-start gap-2">
  <Checkbox id="agree" />
  <Label htmlFor="agree" className="leading-relaxed">
    I agree to the <a>Terms</a> and <a>Privacy Policy</a>
  </Label>
</div>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4 space-y-4">
            <div className="flex items-start gap-2">
              <Checkbox id="agree-terms" className="mt-0.5" />
              <Label htmlFor="agree-terms" className="leading-relaxed">
                I agree to the <span className="text-[var(--accent)] cursor-pointer">Terms of Service</span> and <span className="text-[var(--accent)] cursor-pointer">Privacy Policy</span>
              </Label>
            </div>
            <Button fullWidth disabled>Create Account</Button>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
