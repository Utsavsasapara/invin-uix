import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Slider } from 'invin-uix/ui/slider';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

export default function SliderDemo() {
  const [volume, setVolume] = useState([50]);
  const [range, setRange] = useState([25, 75]);
  const [rating, setRating] = useState([3]);
  const [temperature, setTemperature] = useState([37]);

  return (
    <ComponentPage
      name="Slider"
      description="Range slider built on Radix UI. Supports single thumb, dual-thumb range, discrete steps with visible markers, step labels, and custom marks at specific values. Enhanced disabled state with muted colors. Keyboard accessible (arrow keys, Home, End). Focus ring with no offset gap."
      importCode={`import { Slider } from 'invin-uix/ui/slider';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Slider Playground"
        description="Experiment with slider configurations. Drag the slider or use arrow keys."
        controls={[
          { name: 'value', type: 'number', label: 'Value', default: 50, min: 0, max: 100 },
          { name: 'min', type: 'number', label: 'Min', default: 0, min: 0, max: 50 },
          { name: 'max', type: 'number', label: 'Max', default: 100, min: 50, max: 200 },
          { name: 'step', type: 'number', label: 'Step', default: 1, min: 1, max: 20 },
          { name: 'showSteps', type: 'boolean', label: 'Show Steps', default: false },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-3" style={{ width: '400px' }}>
            <div className="flex items-center justify-between gap-4">
              <Label>Value:</Label>
              <span className="text-[var(--accent)] font-semibold tabular-nums">{props.value}</span>
            </div>
            <Slider
              value={[props.value]}
              min={props.min}
              max={props.max}
              step={props.step}
              showSteps={props.showSteps}
              disabled={props.disabled}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'number[]', default: '—', description: 'Controlled value(s). [50] for single, [25, 75] for range' },
          { name: 'defaultValue', type: 'number[]', default: '—', description: 'Uncontrolled initial value(s)' },
          { name: 'onValueChange', type: '(value: number[]) => void', default: '—', description: 'Change callback (fires on every move)' },
          { name: 'onValueCommit', type: '(value: number[]) => void', default: '—', description: 'Callback when drag ends (final value)' },
          { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
          { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
          { name: 'step', type: 'number', default: '1', description: 'Step increment' },
          { name: 'showSteps', type: 'boolean', default: 'false', description: 'Show tick markers at each step position' },
          { name: 'stepLabels', type: 'string[]', default: '—', description: 'Labels below each step marker' },
          { name: 'marks', type: 'number[] | SliderMark[]', default: '—', description: 'Custom marks at specific values' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction (muted colors)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic"
        description="Single thumb slider. Drag or use arrow keys to change value."
        code={`<Slider defaultValue={[50]} max={100} step={1} />`}
      >
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </PlaygroundSection>

      {/* ─── Controlled ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled with value display"
        description="Use value + onValueChange to control state and show current value."
        code={`const [volume, setVolume] = useState([50]);

<div className="flex justify-between">
  <Label>Volume</Label>
  <span>{volume[0]}%</span>
</div>
<Slider value={volume} onValueChange={setVolume} max={100} />`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <div className="flex items-center justify-between">
            <Label>Volume</Label>
            <span className="text-[var(--accent)] font-semibold tabular-nums">{volume[0]}%</span>
          </div>
          <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
        </div>
      </PlaygroundSection>

      {/* ─── Range ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Range (dual thumb)"
        description="Pass two values for a range slider. Both thumbs are draggable independently."
        code={`const [range, setRange] = useState([25, 75]);

<Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
<span>${'{'}range[0]{'}'} – ${'{'}range[1]{'}'}</span>`}
      >
        <div className="space-y-3 w-full max-w-sm">
          <div className="flex items-center justify-between">
            <Label>Price range</Label>
            <span className="text-[var(--foreground)] font-semibold">${range[0]} – ${range[1]}</span>
          </div>
          <Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
        </div>
      </PlaygroundSection>

      {/* ─── Step Markers ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Discrete steps with markers"
        description="showSteps renders tick marks at each step. Works best with small step counts (≤20)."
        code={`<Slider defaultValue={[3]} min={1} max={5} step={1} showSteps />`}
      >
        <div className="space-y-4 w-full max-w-sm">
          <div>
            <Label>Rating (1–5)</Label>
            <Slider
              value={rating}
              onValueChange={setRating}
              min={1}
              max={5}
              step={1}
              showSteps
            />
            <p className="text-[var(--muted-foreground)] mt-2">
              Selected: <strong className="text-[var(--accent)]">{rating[0]}</strong>
            </p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Step Labels ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Steps with labels"
        description="stepLabels renders text below each marker. Great for discrete named values."
        code={`<Slider
  defaultValue={[2]}
  min={0}
  max={4}
  step={1}
  showSteps
  stepLabels={['XS', 'SM', 'MD', 'LG', 'XL']}
/>`}
      >
        <div className="space-y-6 w-full max-w-sm">
          <div>
            <Label>Size</Label>
            <Slider
              defaultValue={[2]}
              min={0}
              max={4}
              step={1}
              showSteps
              stepLabels={['XS', 'SM', 'MD', 'LG', 'XL']}
            />
          </div>
          <div>
            <Label>Priority</Label>
            <Slider
              defaultValue={[1]}
              min={0}
              max={3}
              step={1}
              showSteps
              stepLabels={['Low', 'Medium', 'High', 'Critical']}
            />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Custom Marks ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom marks"
        description="Use marks to place markers at specific values, independent of steps. Accepts numbers or objects with labels."
        code={`// Simple number marks
<Slider 
  defaultValue={[50]} 
  marks={[0, 25, 50, 75, 100]} 
/>

// Marks with labels
<Slider
  defaultValue={[37]}
  marks={[
    { value: 0, label: '0°C' },
    { value: 37, label: 'Normal' },
    { value: 100, label: '100°C' },
  ]}
/>`}
      >
        <div className="space-y-6 w-full max-w-sm">
          <div>
            <Label>Percentage with marks</Label>
            <Slider
              defaultValue={[50]}
              min={0}
              max={100}
              marks={[0, 25, 50, 75, 100]}
            />
          </div>
          <div>
            <Label>Temperature</Label>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={100}
              marks={[
                { value: 0, label: '0°C' },
                { value: 37, label: 'Normal' },
                { value: 100, label: '100°C' },
              ]}
            />
            <p className="text-[var(--muted-foreground)] mt-2">
              Current: <strong className="text-[var(--accent)]">{temperature[0]}°C</strong>
            </p>
          </div>
          <div>
            <Label>Audio levels</Label>
            <Slider
              defaultValue={[-6]}
              min={-60}
              max={12}
              marks={[
                { value: -60, label: '-60dB' },
                { value: -24, label: '-24' },
                { value: -12, label: '-12' },
                { value: -6, label: '-6' },
                { value: 0, label: '0dB' },
                { value: 12, label: '+12' },
              ]}
            />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Disabled ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled"
        description="Disabled state shows muted colors for track, filled range, and thumb. Cursor shows not-allowed."
        code={`<Slider disabled defaultValue={[40]} max={100} />
<Slider disabled defaultValue={[25, 75]} max={100} />
<Slider disabled defaultValue={[2]} min={0} max={4} showSteps stepLabels={['XS', 'SM', 'MD', 'LG', 'XL']} />`}
      >
        <div className="space-y-6 w-full max-w-sm">
          <div>
            <Label className="opacity-50">Single thumb (disabled)</Label>
            <Slider disabled defaultValue={[40]} max={100} />
          </div>
          <div>
            <Label className="opacity-50">Range (disabled)</Label>
            <Slider disabled defaultValue={[25, 75]} max={100} />
          </div>
          <div>
            <Label className="opacity-50">With step labels (disabled)</Label>
            <Slider 
              disabled 
              defaultValue={[2]} 
              min={0} 
              max={4} 
              step={1}
              showSteps 
              stepLabels={['XS', 'SM', 'MD', 'LG', 'XL']} 
            />
          </div>
          <div>
            <Label className="opacity-50">With custom marks (disabled)</Label>
            <Slider 
              disabled 
              defaultValue={[50]} 
              min={0} 
              max={100} 
              marks={[
                { value: 0, label: 'Min' },
                { value: 50, label: 'Mid' },
                { value: 100, label: 'Max' },
              ]} 
            />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-semibold">Use cases</h3>
        <p className="text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="Settings controls"
        description="Multiple sliders in a settings card for adjusting various parameters."
        code={`<Slider defaultValue={[70]} max={100} />
<Slider defaultValue={[50]} max={100} />
<Slider defaultValue={[60]} max={100} />`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-[var(--foreground)]">
                <span>Brightness</span>
                <span className="text-[var(--muted-foreground)] tabular-nums">70%</span>
              </div>
              <Slider defaultValue={[70]} max={100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[var(--foreground)]">
                <span>Contrast</span>
                <span className="text-[var(--muted-foreground)] tabular-nums">50%</span>
              </div>
              <Slider defaultValue={[50]} max={100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[var(--foreground)]">
                <span>Saturation</span>
                <span className="text-[var(--muted-foreground)] tabular-nums">60%</span>
              </div>
              <Slider defaultValue={[60]} max={100} />
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="E-commerce price filter"
        description="Range slider for filtering products by price with custom marks at key price points."
        code={`<Slider 
  defaultValue={[50, 150]} 
  min={0} 
  max={200}
  marks={[
    { value: 0, label: '$0' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 150, label: '$150' },
    { value: 200, label: '$200' },
  ]}
/>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4">
            <div className="flex justify-between text-[var(--foreground)] mb-3">
              <span>Price filter</span>
              <span className="font-semibold">$50 – $150</span>
            </div>
            <Slider 
              defaultValue={[50, 150]} 
              min={0} 
              max={200}
              marks={[
                { value: 0, label: '$0' },
                { value: 50, label: '$50' },
                { value: 100, label: '$100' },
                { value: 150, label: '$150' },
                { value: 200, label: '$200' },
              ]}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Video player seek bar"
        description="Timeline scrubber with time markers."
        code={`<Slider 
  defaultValue={[45]} 
  min={0} 
  max={180}
  marks={[
    { value: 0, label: '0:00' },
    { value: 60, label: '1:00' },
    { value: 120, label: '2:00' },
    { value: 180, label: '3:00' },
  ]}
/>`}
      >
        <Card className="w-full max-w-md">
          <CardContent className="py-4">
            <div className="flex justify-between text-[var(--foreground)] mb-2 text-sm">
              <span className="tabular-nums">0:45</span>
              <span className="text-[var(--muted-foreground)]">Playing: Intro to React</span>
              <span className="tabular-nums">3:00</span>
            </div>
            <Slider 
              defaultValue={[45]} 
              min={0} 
              max={180}
              marks={[
                { value: 0, label: '0:00' },
                { value: 60, label: '1:00' },
                { value: 120, label: '2:00' },
                { value: 180, label: '3:00' },
              ]}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
