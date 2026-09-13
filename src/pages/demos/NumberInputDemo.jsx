import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { NumberInput } from 'invin-uix/ui/number-input';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from 'invin-uix/ui/card';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';

export default function NumberInputDemo() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(29.99);
  const [temperature, setTemperature] = useState(22);

  return (
    <ComponentPage
      name="NumberInput"
      description="Numeric input field with increment/decrement controls. Supports min/max constraints, step values, precision, prefix/suffix, and two button layouts (sides or right-stacked)."
      importCode={`import { NumberInput } from 'invin-uix/ui/number-input';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="NumberInput Playground"
        description="Experiment with different number input configurations."
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
          {
            name: 'buttonPosition',
            type: 'select',
            label: 'Button Position',
            default: 'sides',
            options: [
              { value: 'sides', label: 'Sides' },
              { value: 'right', label: 'Right' },
            ],
          },
          { name: 'value', type: 'number', label: 'Value', default: 10, min: 0, max: 100 },
          { name: 'step', type: 'number', label: 'Step', default: 1, min: 1, max: 10 },
          { name: 'showButtons', type: 'boolean', label: 'Show Buttons', default: true },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
        ]}
      >
        {(props) => (
          <NumberInput
            size={props.size}
            buttonPosition={props.buttonPosition}
            value={props.value}
            step={props.step}
            showButtons={props.showButtons}
            disabled={props.disabled}
            min={0}
            max={100}
            className="w-36"
          />
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'number | null', default: '—', description: 'Controlled value' },
          { name: 'defaultValue', type: 'number', default: '—', description: 'Initial value (uncontrolled)' },
          { name: 'onChange', type: '(value: number | null) => void', default: '—', description: 'Change handler' },
          { name: 'min', type: 'number', default: '—', description: 'Minimum allowed value' },
          { name: 'max', type: 'number', default: '—', description: 'Maximum allowed value' },
          { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step' },
          { name: 'precision', type: 'number', default: '—', description: 'Decimal places to round to' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size (32/36/40px)' },
          { name: 'showButtons', type: 'boolean', default: 'true', description: 'Show increment/decrement buttons' },
          { name: 'buttonPosition', type: "'sides' | 'right'", default: "'sides'", description: 'Button placement' },
          { name: 'prefix', type: 'string', default: '—', description: 'Prefix text (e.g., "$")' },
          { name: 'suffix', type: 'string', default: '—', description: 'Suffix text (e.g., "kg")' },
          { name: 'error', type: 'string', default: '—', description: 'Error message' },
          { name: 'success', type: 'string', default: '—', description: 'Success message (green border + message)' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable input' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic Usage"
        description="Default number input with buttons on both sides. Click buttons or use Arrow Up/Down keys."
        code={`<NumberInput defaultValue={10} min={0} max={100} />`}
      >
        <div className="w-48">
          <NumberInput defaultValue={10} min={0} max={100} />
        </div>
      </PlaygroundSection>

      {/* ─── Button Positions ───────────────────────────────────── */}
      <PlaygroundSection
        title="Button Positions"
        description="Choose 'sides' (default) or 'right' for stacked chevron buttons like browser native inputs."
        code={`<NumberInput buttonPosition="sides" />
<NumberInput buttonPosition="right" />
<NumberInput showButtons={false} />`}
      >
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <Label>Sides (default)</Label>
            <NumberInput defaultValue={5} buttonPosition="sides" className="w-32" />
          </div>
          <div className="space-y-2">
            <Label>Right stacked</Label>
            <NumberInput defaultValue={5} buttonPosition="right" className="w-32" />
          </div>
          <div className="space-y-2">
            <Label>No buttons</Label>
            <NumberInput defaultValue={5} showButtons={false} className="w-32" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Three sizes to match other form controls: sm (32px), md (36px), lg (40px)."
        code={`<NumberInput size="sm" />
<NumberInput size="md" />
<NumberInput size="lg" />`}
      >
        <div className="flex items-end gap-4">
          <div className="space-y-2">
            <Label>Small</Label>
            <NumberInput size="sm" defaultValue={10} className="w-28" />
          </div>
          <div className="space-y-2">
            <Label>Medium</Label>
            <NumberInput size="md" defaultValue={10} className="w-32" />
          </div>
          <div className="space-y-2">
            <Label>Large</Label>
            <NumberInput size="lg" defaultValue={10} className="w-36" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Prefix & Suffix ────────────────────────────────────── */}
      <PlaygroundSection
        title="Prefix & Suffix"
        description="Add currency symbols, units, or other decorations."
        code={`<NumberInput prefix="$" defaultValue={99.99} />
<NumberInput suffix="kg" defaultValue={75} />
<NumberInput prefix="$" suffix="USD" defaultValue={1000} />`}
      >
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>Currency</Label>
            <NumberInput prefix="$" defaultValue={99.99} precision={2} className="w-32" />
          </div>
          <div className="space-y-2">
            <Label>Weight</Label>
            <NumberInput suffix="kg" defaultValue={75} className="w-28" />
          </div>
          <div className="space-y-2">
            <Label>Percentage</Label>
            <NumberInput suffix="%" defaultValue={50} min={0} max={100} className="w-24" />
          </div>
          <div className="space-y-2">
            <Label>Temperature</Label>
            <NumberInput suffix="°C" defaultValue={22} step={0.5} precision={1} className="w-28" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Controlled ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled"
        description="Manage state externally with value + onChange. The value updates in real-time."
        code={`const [quantity, setQuantity] = useState(1);

<NumberInput 
  value={quantity} 
  onChange={setQuantity}
  min={1} 
  max={99} 
/>
<span>Quantity: {quantity}</span>`}
      >
        <div className="flex items-center gap-4">
          <NumberInput 
            value={quantity} 
            onChange={setQuantity}
            min={1} 
            max={99}
            className="w-28"
          />
          <Badge variant="secondary">
            Quantity: <strong className="ml-1">{quantity}</strong>
          </Badge>
        </div>
      </PlaygroundSection>

      {/* ─── Step & Precision ───────────────────────────────────── */}
      <PlaygroundSection
        title="Step & Precision"
        description="Control increment amount and decimal precision for prices, measurements, etc."
        code={`<NumberInput step={5} defaultValue={50} />
<NumberInput step={0.01} precision={2} prefix="$" />
<NumberInput step={0.5} precision={1} suffix="°C" />`}
      >
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>Step by 5</Label>
            <NumberInput step={5} defaultValue={50} min={0} max={100} className="w-28" />
          </div>
          <div className="space-y-2">
            <Label>Price (0.01 step)</Label>
            <NumberInput 
              step={0.01} 
              precision={2} 
              prefix="$" 
              defaultValue={19.99}
              className="w-32"
            />
          </div>
          <div className="space-y-2">
            <Label>Temperature (0.5 step)</Label>
            <NumberInput 
              step={0.5} 
              precision={1} 
              suffix="°C"
              defaultValue={22.5}
              className="w-28"
            />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── States ─────────────────────────────────────────────── */}
      <PlaygroundSection
        title="States"
        description="Disabled, read-only, error, and success states."
        code={`<NumberInput disabled />
<NumberInput readOnly value={42} />
<NumberInput error="Value must be positive" />
<NumberInput success="Valid quantity" defaultValue={5} />`}
      >
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>Disabled</Label>
            <NumberInput disabled defaultValue={10} className="w-28" />
          </div>
          <div className="space-y-2">
            <Label>Read-only</Label>
            <NumberInput readOnly value={42} className="w-28" />
          </div>
          <div className="space-y-2 w-40">
            <Label>With error</Label>
            <NumberInput defaultValue={-5} error="Must be positive" />
          </div>
          <div className="space-y-2 w-40">
            <Label>With success</Label>
            <NumberInput defaultValue={5} success="Valid quantity" />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use Cases</h3>
        <p className="text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="Shopping Cart Quantity"
        description="Compact quantity selector for e-commerce."
        code={`<NumberInput
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
  size="sm"
/>`}
      >
        <Card className="w-80">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[var(--foreground)]">Product Name</p>
                <p className="text-sm text-[var(--muted-foreground)]">${price.toFixed(2)} each</p>
              </div>
              <NumberInput
                value={quantity}
                onChange={(v) => setQuantity(v ?? 1)}
                min={1}
                max={99}
                size="sm"
                className="w-24"
              />
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-[var(--accent)]">${(price * quantity).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Thermostat Control"
        description="Temperature control with 0.5 degree increments."
        code={`<NumberInput
  value={temperature}
  onChange={setTemperature}
  min={16}
  max={30}
  step={0.5}
  precision={1}
  suffix="°C"
  size="lg"
/>`}
      >
        <Card className="w-64">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Target Temperature</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <NumberInput
              value={temperature}
              onChange={(v) => setTemperature(v ?? 20)}
              min={16}
              max={30}
              step={0.5}
              precision={1}
              suffix="°C"
              size="lg"
              className="w-full"
            />
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              {temperature < 20 ? 'Cooling' : temperature > 24 ? 'Heating' : 'Comfortable'}
            </p>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Budget Input"
        description="Currency input with right-side buttons for compact forms."
        code={`<NumberInput
  prefix="$"
  suffix="USD"
  min={0}
  step={100}
  buttonPosition="right"
/>`}
      >
        <div className="space-y-2 w-48">
          <Label required>Project Budget</Label>
          <NumberInput
            prefix="$"
            min={0}
            step={100}
            defaultValue={5000}
            buttonPosition="right"
          />
          <p className="text-xs text-[var(--muted-foreground)]">Minimum $1,000</p>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
