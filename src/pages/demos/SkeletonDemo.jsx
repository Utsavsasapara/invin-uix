import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Skeleton } from 'invin-uix/ui/skeleton';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

export default function SkeletonDemo() {
  return (
    <ComponentPage
      name="Skeleton"
      description="Animated loading placeholder that mimics content shape while data loads. Three shape variants, plus a lines prop for multi-line text paragraphs — compose them to match any layout."
      importCode={`import { Skeleton } from 'invin-uix/ui/skeleton';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Skeleton Playground"
        description="Experiment with different skeleton configurations."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'default',
            options: [
              { value: 'default', label: 'Default (Rectangle)' },
              { value: 'circle', label: 'Circle' },
              { value: 'text', label: 'Text Line' },
            ],
          },
          { name: 'lines', type: 'number', label: 'Lines', default: 1, min: 1, max: 5 },
          { name: 'animated', type: 'boolean', label: 'Animated', default: true },
          { name: 'width', type: 'number', label: 'Width (px)', default: 200, min: 50, max: 400 },
          { name: 'height', type: 'number', label: 'Height (px)', default: 40, min: 20, max: 200 },
        ]}
      >
        {(props) => (
          <div className="flex items-center justify-center">
            {props.lines > 1 ? (
              <Skeleton lines={props.lines} animated={props.animated} className={`w-[${props.width}px]`} style={{ width: props.width }} />
            ) : props.variant === 'circle' ? (
              <Skeleton variant="circle" animated={props.animated} style={{ width: props.height, height: props.height }} />
            ) : props.variant === 'text' ? (
              <Skeleton variant="text" animated={props.animated} style={{ width: props.width }} />
            ) : (
              <Skeleton animated={props.animated} style={{ width: props.width, height: props.height }} />
            )}
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'variant', type: "'default' | 'circle' | 'text'", default: "'default'", description: 'Shape — default (rounded-md), circle (rounded-full), text (full-width line)' },
          { name: 'lines', type: 'number', default: '—', description: 'Render a multi-line text paragraph (last line shorter). Implies the text look.' },
          { name: 'animated', type: 'boolean', default: 'true', description: 'Enable/disable pulse animation (for reduced motion or static placeholders)' },
          { name: 'className', type: 'string', default: '—', description: 'Width and height via Tailwind classes (h-10, w-40, etc.)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="Three shape presets. Size is controlled via className."
        code={`// Rectangle (default) — cards, images, panels
<Skeleton className="h-20 w-full" />

// Circle — avatars, icons
<Skeleton variant="circle" className="h-12 w-12" />

// Text — single line
<Skeleton variant="text" />

// Multi-line paragraph (last line shorter)
<Skeleton lines={3} />`}
      >
        <div className="flex flex-wrap items-start gap-6">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Default</p>
            <Skeleton className="h-20 w-40" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Circle</p>
            <Skeleton variant="circle" className="h-12 w-12" />
          </div>
          <div className="space-y-1 flex-1 min-w-[150px]">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Text paragraph (lines)</p>
            <Skeleton lines={3} />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Multi-line text ────────────────────────────────────── */}
      <PlaygroundSection
        title="Multi-line text (lines)"
        description="Pass lines to render a text paragraph — no manual stacking. The last line is shorter to mimic real text."
        code={`<Skeleton lines={2} />
<Skeleton lines={3} />
<Skeleton lines={4} />`}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">lines=2</p>
            <Skeleton lines={2} />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">lines=4</p>
            <Skeleton lines={4} />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Custom Sizes ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom Sizes"
        description="Control dimensions with standard Tailwind height/width classes."
        code={`<Skeleton className="h-6 w-24" />
<Skeleton className="h-10 w-40" />
<Skeleton className="h-32 w-full" />
<Skeleton variant="circle" className="h-8 w-8" />
<Skeleton variant="circle" className="h-16 w-16" />`}
      >
        <div className="flex flex-wrap items-end gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-16 w-32" />
          <Skeleton variant="circle" className="h-8 w-8" />
          <Skeleton variant="circle" className="h-12 w-12" />
          <Skeleton variant="circle" className="h-16 w-16" />
        </div>
      </PlaygroundSection>

      {/* ─── Disable Animation ──────────────────────────────────── */}
      <PlaygroundSection
        title="Disable Animation"
        description="Set animated={false} for static placeholders or to respect prefers-reduced-motion."
        code={`// Static skeleton without pulse
<Skeleton animated={false} className="h-8 w-full" />

// With animation (default)
<Skeleton animated={true} className="h-8 w-full" />`}
      >
        <div className="space-y-4 w-full max-w-md">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">animated=false (static)</p>
            <Skeleton animated={false} className="h-8 w-full" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">animated=true (default)</p>
            <Skeleton animated={true} className="h-8 w-full" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Multi-line without animation</p>
            <Skeleton lines={3} animated={false} />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Compose skeletons to match the content they replace.</p>
      </div>

      <PlaygroundSection
        title="User profile"
        description="Avatar + name + bio lines — matches a typical user card."
        code={`<div className="flex items-center gap-4">
  <Skeleton variant="circle" className="h-12 w-12" />
  <Skeleton lines={2} className="flex-1" />
</div>`}
      >
        <div className="flex items-center gap-4 w-full">
          <Skeleton variant="circle" className="h-12 w-12" />
          <Skeleton lines={2} className="flex-1" />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Card loading"
        description="Image area + title + description to replace a content card."
        code={`<Card>
  <CardContent>
    <Skeleton className="h-36 w-full rounded-lg" />
    <Skeleton lines={2} className="mt-3" />
  </CardContent>
</Card>`}
      >
        <Card>
          <CardContent className="py-4">
            <Skeleton className="h-36 w-full rounded-lg" />
            <Skeleton lines={2} className="mt-3" />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="List items"
        description="Repeated row pattern for tables or feeds."
        code={`{[1,2,3,4].map(i => (
  <div key={i} className="flex items-center gap-3 py-2">
    <Skeleton variant="circle" className="h-8 w-8" />
    <Skeleton variant="text" className="flex-1" />
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
))}`}
      >
        <Card>
          <CardContent className="py-3">
            <div className="space-y-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <Skeleton variant="circle" className="h-8 w-8" />
                  <Skeleton variant="text" className="flex-1" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Stats / KPI grid"
        description="Multiple stat cards loading at once."
        code={`<div className="grid grid-cols-3 gap-4">
  {[1,2,3].map(i => (
    <Card key={i}>
      <CardContent>
        <Skeleton variant="text" className="w-1/2 mb-2" />
        <Skeleton className="h-7 w-20" />
        <Skeleton variant="text" className="w-2/3 mt-2" />
      </CardContent>
    </Card>
  ))}
</div>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <Card key={i}>
              <CardContent className="py-3">
                <Skeleton variant="text" className="w-1/2 mb-2" />
                <Skeleton className="h-7 w-20" />
                <Skeleton variant="text" className="w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Sidebar navigation"
        description="Menu items loading in a sidebar."
        code={`<div className="w-52 space-y-2">
  <Skeleton variant="text" className="w-1/3 h-3 mb-3" />
  {[1,2,3,4,5].map(i => (
    <div key={i} className="flex items-center gap-2 px-2 py-1.5">
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton variant="text" className="flex-1" />
    </div>
  ))}
</div>`}
      >
        <div className="w-52 p-3 rounded-[8px] border border-[var(--border)]">
          <Skeleton variant="text" className="w-1/3 h-3 mb-3" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-2 px-2 py-1.5">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton variant="text" className="flex-1" />
            </div>
          ))}
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
