import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Text3DFlip } from 'invin-uix/ui/text-3d-flip';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function Text3DFlipDemo() {
  return (
    <ComponentPage
      name="Text 3D Flip"
      description="A text animation that flips each letter in 3D with a staggered animation on hover. Creates a dramatic reveal effect perfect for interactive headings and call-to-actions."
      importCode={`import { Text3DFlip } from 'invin-uix/ui/text-3d-flip';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }, { label: '3D', variant: 'outline' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Text 3D Flip Playground"
        description="Customize the 3D flip effect with different timing and rotation settings."
        controls={[
          { name: 'stagger', label: 'Stagger (s)', type: 'number', default: 0.05 },
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 0.5 },
          { name: 'axis', label: 'Flip Axis', type: 'select', default: 'x', options: [
            { value: 'x', label: 'X Axis (Vertical Flip)' },
            { value: 'y', label: 'Y Axis (Horizontal Flip)' },
          ]},
          { name: 'rotationDegrees', label: 'Rotation (deg)', type: 'number', default: 90 },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <Text3DFlip
              stagger={props.stagger}
              duration={props.duration}
              axis={props.axis}
              rotationDegrees={props.rotationDegrees}
              className="text-[48px] font-bold text-[var(--foreground)]"
            >
              HOVER ME
            </Text3DFlip>
            <p className="text-sm text-[var(--muted-foreground)] mt-4">Hover over the text to see the 3D flip effect</p>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text to animate' },
          { name: 'stagger', type: 'number', default: '0.05', description: 'Delay between each letter (seconds)' },
          { name: 'duration', type: 'number', default: '0.5', description: 'Duration of each letter flip (seconds)' },
          { name: 'letterDurations', type: 'number[]', default: '—', description: 'Custom duration per letter' },
          { name: 'axis', type: "'x' | 'y'", default: "'x'", description: 'Axis to flip around (x=vertical, y=horizontal)' },
          { name: 'rotationDegrees', type: 'number', default: '90', description: 'Degrees to rotate on flip' },
          { name: 'backText', type: 'string', default: '—', description: 'Text to show on the back face' },
          { name: 'backColor', type: 'string', default: '—', description: 'Color of the back text' },
          { name: 'perspective', type: 'number', default: '1000', description: 'Perspective depth for 3D effect (px)' },
          { name: 'onHoverStart', type: '() => void', default: '—', description: 'Callback when hover starts' },
          { name: 'onHoverEnd', type: '() => void', default: '—', description: 'Callback when hover ends' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Axis Examples ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Flip Axes</h3>
        <p className="text-[var(--muted-foreground)]">
          Two rotation axes for different flip effects. Hover over each to compare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-4 text-center min-h-[150px] flex flex-col justify-center">
            <Badge variant="secondary">X Axis (Vertical Flip)</Badge>
            <Text3DFlip axis="x" className="text-[32px] font-bold">
              SECURITY
            </Text3DFlip>
            <p className="text-xs text-[var(--muted-foreground)]">Letters flip vertically</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4 text-center min-h-[150px] flex flex-col justify-center">
            <Badge variant="secondary">Y Axis (Horizontal Flip)</Badge>
            <Text3DFlip axis="y" className="text-[32px] font-bold">
              SECURITY
            </Text3DFlip>
            <p className="text-xs text-[var(--muted-foreground)]">Letters flip horizontally</p>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Hero Headline"
        description="Create an attention-grabbing hero headline."
        code={`<h1>
  <Text3DFlip className="text-5xl font-bold">
    INVINSENSE
  </Text3DFlip>
</h1>`}
      >
        <div className="text-center py-8 bg-gradient-to-br from-[var(--background)] to-[var(--secondary)] rounded-lg">
          <Text3DFlip className="text-[48px] md:text-[64px] font-bold text-[var(--foreground)]">
            INVINSENSE
          </Text3DFlip>
          <p className="text-[var(--muted-foreground)] mt-2">Hover to reveal</p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Back Text"
        description="Show different text on the back face for a reveal effect."
        code={`<Text3DFlip 
  backText="SECURE!" 
  backColor="var(--accent)"
>
  HOVER ME
</Text3DFlip>`}
      >
        <div className="text-center py-6">
          <Text3DFlip 
            backText="SECURE!" 
            backColor="var(--accent)"
            className="text-[36px] font-bold"
          >
            HOVER ME
          </Text3DFlip>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Hover to see the back text</p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Stagger Variations"
        description="Different stagger timings create unique effects."
        code={`<Text3DFlip stagger={0.02}>Fast stagger</Text3DFlip>
<Text3DFlip stagger={0.1}>Slow stagger</Text3DFlip>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-4 text-center">
              <Badge variant="secondary" className="mb-3">Fast (0.02s)</Badge>
              <Text3DFlip stagger={0.02} className="text-[28px] font-bold">
                RAPID FLIP
              </Text3DFlip>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Badge variant="secondary" className="mb-3">Slow (0.1s)</Badge>
              <Text3DFlip stagger={0.1} className="text-[28px] font-bold">
                WAVE FLIP
              </Text3DFlip>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Navigation Links"
        description="Use for interactive navigation elements."
        code={`<nav className="flex gap-6">
  <Text3DFlip>HOME</Text3DFlip>
  <Text3DFlip>ABOUT</Text3DFlip>
  <Text3DFlip>CONTACT</Text3DFlip>
</nav>`}
      >
        <nav className="flex gap-8 justify-center py-4">
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            HOME
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            PRODUCTS
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            SOLUTIONS
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            CONTACT
          </Text3DFlip>
        </nav>
      </PlaygroundSection>

      <PlaygroundSection
        title="Colored Text"
        description="Apply colors using className for branded effects."
        code={`<Text3DFlip className="text-accent">
  PREMIUM
</Text3DFlip>`}
      >
        <div className="flex gap-8 justify-center py-4">
          <Text3DFlip className="text-[28px] font-bold text-[var(--accent)]">
            PREMIUM
          </Text3DFlip>
          <Text3DFlip className="text-[28px] font-bold text-[var(--ok)]">
            SUCCESS
          </Text3DFlip>
          <Text3DFlip className="text-[28px] font-bold text-[var(--error)]">
            ALERT
          </Text3DFlip>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Tips ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">🖥️ Best for Desktop</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                This component is designed for hover interactions. Consider alternatives 
                for touch-only devices.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">🔤 Short Text Works Best</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Use with single words or short phrases. Long text can look overwhelming 
                with the staggered animation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">⚡ Performance</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Uses hardware-accelerated CSS transforms for smooth 60fps animations.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">♿ Accessibility</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                The text content is always readable. Animation is purely visual enhancement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

    </ComponentPage>
  );
}
