import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Spinner } from 'invin-uix/ui/spinner';
import { Switch } from 'invin-uix/ui/switch';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Alert, AlertTitle, AlertDescription } from 'invin-uix/ui/alert';
import { Label } from 'invin-uix/ui/label';

export default function SpinnerDemo() {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <ComponentPage
      name="Spinner"
      description="Loading indicator with 4 animation variants, 3 sizes, tip text, delay, content wrapper overlay, fullscreen mode, and custom indicator support."
      importCode={`import { Spinner } from 'invin-uix/ui/spinner';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Spinner Playground"
        description="Experiment with different spinner configurations."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'dots', label: 'Dots' },
              { value: 'ring', label: 'Ring' },
              { value: 'bars', label: 'Bars' },
            ],
          },
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (16px)' },
              { value: 'md', label: 'Medium (24px)' },
              { value: 'lg', label: 'Large (32px)' },
            ],
          },
          { name: 'tip', type: 'text', label: 'Tip Text', default: 'Loading...', placeholder: 'Enter tip text' },
          { name: 'color', type: 'text', label: 'Color', default: '', placeholder: 'e.g., red, #3b82f6' },
        ]}
      >
        {(props) => (
          <Spinner
            variant={props.variant}
            size={props.size}
            tip={props.tip || undefined}
            color={props.color || undefined}
          />
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'spinning', type: 'boolean', default: 'true', description: 'Controls visibility (useful for toggling)' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner dimensions (16px / 24px / 32px)' },
          { name: 'variant', type: "'default' | 'dots' | 'ring' | 'bars'", default: "'default'", description: 'Animation style' },
          { name: 'tip', type: 'ReactNode', default: '—', description: 'Text shown below the spinner' },
          { name: 'delay', type: 'number (ms)', default: '0', description: 'Delay before showing — prevents flash for fast loads' },
          { name: 'indicator', type: 'ReactNode', default: '—', description: 'Custom spinner element (overrides variant)' },
          { name: 'fullscreen', type: 'boolean', default: 'false', description: 'Fixed overlay covering the entire viewport' },
          { name: 'color', type: 'string', default: '—', description: 'Custom spinner color (CSS value)' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'Content to wrap with loading overlay' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="Four built-in animation styles. All use accent colour."
        code={`<Spinner variant="default" tip="Default" />
<Spinner variant="dots" tip="Dots" />
<Spinner variant="ring" tip="Ring" />
<Spinner variant="bars" tip="Bars" />`}
      >
        <div className="flex flex-wrap items-start gap-8">
          <Spinner variant="default" tip="Default" />
          <Spinner variant="dots" tip="Dots" />
          <Spinner variant="ring" tip="Ring" />
          <Spinner variant="bars" tip="Bars" />
        </div>
      </PlaygroundSection>

      {/* ─── Custom Color ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom Color"
        description="Override the default accent color with any CSS color value."
        code={`<Spinner color="red" tip="Red" />
<Spinner color="#3b82f6" tip="Blue" />
<Spinner color="green" tip="Green" />
<Spinner color="var(--warning)" tip="Warning" />`}
      >
        <div className="flex flex-wrap items-start gap-8">
          <Spinner color="red" tip="Red" />
          <Spinner color="#3b82f6" tip="Blue" />
          <Spinner color="green" tip="Green" />
          <Spinner color="var(--warning)" tip="Warning" />
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="sm (16px), md (24px, default), lg (40px). Works with all variants."
        code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
      >
        <div className="flex flex-wrap items-end gap-8">
          <Spinner size="sm" tip="sm" />
          <Spinner size="md" tip="md" />
          <Spinner size="lg" tip="lg" />
        </div>
      </PlaygroundSection>

      {/* ─── Size × Variant Grid ────────────────────────────────── */}
      <PlaygroundSection
        title="Size × Variant matrix"
        description="All combinations for reference."
        code={`<Spinner variant="dots" size="lg" />
<Spinner variant="ring" size="sm" />
// ...all combos`}
      >
        <div className="grid grid-cols-4 gap-6">
          {['default', 'dots', 'ring', 'bars'].map(v => (
            <div key={v} className="flex flex-col items-center gap-4">
              <Spinner variant={v} size="sm" />
              <Spinner variant={v} size="md" />
              <Spinner variant={v} size="lg" />
              <span className="text-[10px] text-[var(--muted-foreground-faint)] capitalize">{v}</span>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── With Delay ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Delay"
        description="Prevents flash for fast operations. The spinner only appears after the delay. Useful when data loads in <300ms — user never sees a spinner."
        code={`// Won't show if data arrives within 500ms
<Spinner delay={500} tip="Delayed 500ms" />`}
      >
        <div className="flex items-start gap-8">
          <Spinner delay={0} tip="No delay (0ms)" />
          <Spinner delay={500} tip="500ms delay" />
          <Spinner delay={1000} tip="1000ms delay" />
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Wrapper Mode ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Wrapper mode"
        description="Wraps content with a blur overlay when loading. Toggle to see the transition."
        code={`const [loading, setLoading] = useState(true);

<Spinner spinning={loading} tip="Loading...">
  <Card>
    <CardContent>Your content here</CardContent>
  </Card>
</Spinner>`}
      >
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="wrapper-toggle" className="text-[var(--foreground)]">Loading:</Label>
            <Switch id="wrapper-toggle" size="sm" checked={loading} onCheckedChange={setLoading} />
          </div>
          <Spinner spinning={loading} tip="Fetching data...">
            <Card>
              <CardContent className="py-4">
                <p className="text-[var(--foreground)] font-[600]">Dashboard Stats</p>
                <p className="text-[var(--foreground)] text-[var(--muted-foreground)] mt-1">Revenue: $45,231 | Users: 2,350 | Active: 573</p>
                <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2">Last updated: 2 minutes ago</p>
              </CardContent>
            </Card>
          </Spinner>
        </div>
      </PlaygroundSection>

      {/* ─── Fullscreen ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Fullscreen"
        description="Fixed overlay covering the viewport. For page-level or app-level loading states."
        code={`const [fullscreen, setFullscreen] = useState(false);

<Button onClick={() => {
  setFullscreen(true);
  setTimeout(() => setFullscreen(false), 3000);
}}>
  Show Fullscreen
</Button>

<Spinner spinning={fullscreen} fullscreen tip="Loading application..." size="lg" />`}
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => { setFullscreen(true); setTimeout(() => setFullscreen(false), 3000); }}>
            Show Fullscreen (3 seconds)
          </Button>
          <span className="text-[10px] text-[var(--muted-foreground-faint)]">Auto-dismisses after 3s</span>
        </div>
        <Spinner spinning={fullscreen} fullscreen tip="Loading application..." size="lg" />
      </PlaygroundSection>

      {/* ─── Custom Indicator ───────────────────────────────────── */}
      <PlaygroundSection
        title="Custom indicator"
        description="Override the default animation with any ReactNode."
        code={`<Spinner indicator={<span style={{ fontSize: 24 }}>⏳</span>} tip="Custom" />

<Spinner indicator={
  <div style={{
    width: 24, height: 24,
    border: '3px dotted var(--accent)',
    borderRadius: '50%',
    animation: 'spinner-rotate 2s linear infinite',
  }} />
} tip="Dotted" />`}
      >
        <div className="flex flex-wrap items-start gap-8">
          <Spinner indicator={<span style={{ fontSize: 24, animation: 'spinner-rotate 1s linear infinite', display: 'inline-block' }}>⏳</span>} tip="Emoji" />
          <Spinner indicator={
            <div style={{ width: 24, height: 24, border: '3px dotted var(--accent)', borderRadius: '50%', animation: 'spinner-rotate 2s linear infinite' }} />
          } tip="Dotted ring" />
          <Spinner indicator={
            <div style={{ width: 20, height: 20, backgroundColor: 'var(--accent)', borderRadius: 4, animation: 'spinner-rotate 0.8s ease-in-out infinite' }} />
          } tip="Square" />
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common loading patterns.</p>
      </div>

      <PlaygroundSection
        title="Table loading"
        description="Overlay on a data table while fetching rows."
        code={`<Spinner spinning={isLoading} tip="Loading records...">
  <Table>...</Table>
</Spinner>`}
      >
        <Spinner spinning={loading} tip="Loading records...">
          <Card>
            <CardContent className="py-3">
              <div className="space-y-2">
                {['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Lee'].map(name => (
                  <div key={name} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                    <span className="text-[var(--foreground)]">{name}</span>
                    <span className="text-[10px] text-[var(--muted-foreground-faint)]">Active</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Spinner>
      </PlaygroundSection>

      <PlaygroundSection
        title="Inline loading button"
        description="Small spinner next to action feedback."
        code={`<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Saving changes...</span>
</div>`}
      >
        <div className="flex items-center gap-2">
          <Spinner size="sm" variant="ring" />
          <span className="text-[var(--foreground)] text-[var(--muted-foreground)]">Saving changes...</span>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Page section loading"
        description="Large spinner with tip for section-level content."
        code={`<div className="flex items-center justify-center py-16">
  <Spinner size="lg" tip="Loading dashboard..." />
</div>`}
      >
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Spinner size="lg" variant="default" tip="Loading dashboard..." />
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
