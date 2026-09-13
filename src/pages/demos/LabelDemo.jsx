import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Label } from 'invin-uix/ui/label';
import { Input } from 'invin-uix/ui/input';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Switch } from 'invin-uix/ui/switch';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';

export default function LabelDemo() {
  return (
    <ComponentPage
      name="Label"
      description="Accessible form label with required/optional indicators, info tooltip, and error state. Pairs with any input control via htmlFor. Automatically dims when the connected input is disabled (peer-disabled pattern)."
      importCode={`import { Label } from 'invin-uix/ui/label';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Label Playground"
        description="Experiment with different label configurations."
        controls={[
          { name: 'required', type: 'boolean', label: 'Required', default: false },
          { name: 'optional', type: 'boolean', label: 'Optional', default: false },
          { name: 'error', type: 'boolean', label: 'Error', default: false },
          { name: 'showInfo', type: 'boolean', label: 'Show Info', default: false },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
          { name: 'text', type: 'text', label: 'Label Text', default: 'Email address', placeholder: 'Enter label text' },
        ]}
      >
        {(props) => (
          <div className="space-y-2 w-full max-w-sm">
            <Label 
              htmlFor="demo-input" 
              required={props.required}
              optional={props.optional}
              error={props.error}
              info={props.showInfo ? "This is helpful information about this field." : undefined}
              className={props.disabled ? 'opacity-50' : ''}
            >
              {props.text || 'Label'}
            </Label>
            <Input id="demo-input" placeholder="Enter value..." disabled={props.disabled} error={props.error} />
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'htmlFor', type: 'string', default: '—', description: 'ID of the form control this label is for' },
          { name: 'required', type: 'boolean', default: 'false', description: 'Show a red required asterisk after the label text' },
          { name: 'optional', type: 'boolean', default: 'false', description: 'Show "(optional)" in muted text after the label' },
          { name: 'info', type: 'ReactNode', default: '—', description: 'Tooltip content for info icon (hover to see)' },
          { name: 'error', type: 'boolean', default: 'false', description: 'Apply error color to label text' },
          { name: 'className', type: 'string', default: '—', description: 'Additional Tailwind/CSS classes' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'Label text content' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic with Input"
        description="Label linked to an input via htmlFor. Clicking the label focuses the input."
        code={`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
</div>`}
      >
        <div className="space-y-2 w-full max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" />
        </div>
      </PlaygroundSection>

      {/* ─── Required Field ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Required indicator"
        description="Pass required to render a red asterisk. It's purely visual — also set the required attribute on the input for actual form validation."
        code={`<Label htmlFor="name" required>Full name</Label>
<Input id="name" required placeholder="John Doe" />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="fullname" required>Full name</Label>
            <Input id="fullname" required placeholder="John Doe" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Optional Field ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Optional indicator"
        description="Pass optional to show '(optional)' in muted text. Useful for forms where most fields are required."
        code={`<Label htmlFor="nickname" optional>Nickname</Label>
<Input id="nickname" placeholder="Optional nickname" />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="nickname" optional>Nickname</Label>
            <Input id="nickname" placeholder="Optional nickname" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" optional>Company</Label>
            <Input id="company" placeholder="Acme Inc." />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Info Tooltip ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Info tooltip"
        description="Pass info to show a small info icon. Hover or focus it to see the tooltip with helpful information."
        code={`<Label htmlFor="api-key" info="Your API key can be found in account settings.">
  API Key
</Label>
<Input id="api-key" type="password" />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="api-key" info="Your API key can be found in your account settings under Developer > API Keys.">
              API Key
            </Label>
            <Input id="api-key" type="password" placeholder="sk-..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook" required info="Webhook URL will receive POST requests when events occur.">
              Webhook URL
            </Label>
            <Input id="webhook" placeholder="https://example.com/webhook" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Error State ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Error state"
        description="Pass error to turn the label text red. Use alongside input error state for consistent visual feedback."
        code={`<Label htmlFor="email" error>Email address</Label>
<Input id="email" error />
<p className="text-[var(--error)] text-sm">Please enter a valid email</p>`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="error-email" error required>Email address</Label>
            <Input id="error-email" error defaultValue="invalid-email" />
            <p className="text-[var(--error)] text-sm">Please enter a valid email address</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="valid-email">Email address</Label>
            <Input id="valid-email" success defaultValue="valid@example.com" />
            <p className="text-[var(--ok)] text-sm">Email is valid</p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── With Checkbox ──────────────────────────────────────── */}
      <PlaygroundSection
        title="With Checkbox"
        description="Label as a clickable target for checkbox. Clicking anywhere on the text toggles the checkbox."
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

      {/* ─── With Switch ────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Switch"
        description="Label + Switch pattern for settings toggles."
        code={`<div className="flex items-center justify-between w-full">
  <Label htmlFor="notifications">Enable notifications</Label>
  <Switch id="notifications" />
</div>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-3 space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif">Enable notifications</Label>
              <Switch id="notif" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark" info="Switch between light and dark theme">Dark mode</Label>
              <Switch id="dark" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sounds">Sound effects</Label>
              <Switch id="sounds" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled state"
        description="When paired with a disabled input, apply opacity manually or use the peer pattern."
        code={`<Label className="opacity-50">Disabled field</Label>
<Input disabled placeholder="Cannot edit" />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="active-field">Active field</Label>
            <Input id="active-field" placeholder="Editable" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled-field" className="opacity-50">Disabled field</Label>
            <Input id="disabled-field" disabled placeholder="Cannot edit" />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real forms.</p>
      </div>

      <PlaygroundSection
        title="Registration form"
        description="Combining required, optional, and info props in a typical form."
        code={`<Label htmlFor="email" required>Email</Label>
<Input id="email" type="email" />

<Label htmlFor="password" required info="Min 8 characters">Password</Label>
<Input id="password" type="password" />

<Label htmlFor="referral" optional>Referral code</Label>
<Input id="referral" />`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-email" required>Email</Label>
                <Input id="reg-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pass" required info="Password must be at least 8 characters with one number">
                  Password
                </Label>
                <Input id="reg-pass" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-referral" optional>Referral code</Label>
                <Input id="reg-referral" placeholder="ABC123" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="reg-terms" />
                <Label htmlFor="reg-terms">I agree to the terms of service</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Settings section"
        description="Labels with info tooltips for context-sensitive help."
        code={`<Label htmlFor="language" info="This affects date formats and translations">
  Language
</Label>
<Select>...</Select>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language" info="This affects date formats, number formatting, and UI translations">
                Language
              </Label>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone" info="All dates and times will be displayed in this timezone">
                Timezone
              </Label>
              <Select>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="ist">IST (India)</SelectItem>
                  <SelectItem value="est">EST (US East)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
