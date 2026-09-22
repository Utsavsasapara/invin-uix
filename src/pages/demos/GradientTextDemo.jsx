import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { GradientText } from 'invin-uix/ui/gradient-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function GradientTextDemo() {
  return (
    <ComponentPage
      name="Gradient Text"
      description="Text with animated flowing gradient colors. Choose from 8 presets or define custom gradients. Perfect for hero text, headings, and eye-catching elements."
      importCode={`import { GradientText } from 'invin-uix/ui/gradient-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Gradient Text Playground"
        description="Experiment with different gradient presets and animation settings."
        controls={[
          { name: 'preset', label: 'Preset', type: 'select', default: 'rainbow', options: [
            { value: 'rainbow', label: 'Rainbow' },
            { value: 'sunset', label: 'Sunset' },
            { value: 'ocean', label: 'Ocean' },
            { value: 'forest', label: 'Forest' },
            { value: 'fire', label: 'Fire' },
            { value: 'purple', label: 'Purple' },
            { value: 'cyber', label: 'Cyber' },
            { value: 'gold', label: 'Gold' },
          ]},
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 5 },
          { name: 'direction', label: 'Direction', type: 'select', default: 'to-r', options: [
            { value: 'to-r', label: 'Left to Right' },
            { value: 'to-l', label: 'Right to Left' },
            { value: 'to-t', label: 'Bottom to Top' },
            { value: 'to-b', label: 'Top to Bottom' },
            { value: 'to-tr', label: 'Diagonal (TR)' },
            { value: 'to-br', label: 'Diagonal (BR)' },
          ]},
          { name: 'animated', label: 'Animated', type: 'boolean', default: true },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <GradientText
              preset={props.preset}
              duration={props.duration}
              direction={props.direction}
              animated={props.animated}
              className="text-[48px] font-bold"
            >
              Invinsense Security
            </GradientText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to display' },
          { name: 'preset', type: 'GradientPreset', default: "'rainbow'", description: 'Preset gradient: rainbow, sunset, ocean, forest, fire, purple, cyber, gold' },
          { name: 'colors', type: 'string[]', default: '—', description: 'Custom gradient colors (overrides preset)' },
          { name: 'direction', type: 'GradientDirection', default: "'to-r'", description: 'Gradient direction: to-r, to-l, to-t, to-b, to-tr, to-tl, to-br, to-bl' },
          { name: 'animated', type: 'boolean', default: 'true', description: 'Enable gradient animation' },
          { name: 'duration', type: 'number', default: '5', description: 'Animation cycle duration (seconds)' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
          { name: 'as', type: 'ElementType', default: "'span'", description: 'HTML element to render' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Preset Gallery ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Gradient Presets</h3>
        <p className="text-[var(--muted-foreground)]">
          8 built-in gradient presets for common use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['rainbow', 'sunset', 'ocean', 'forest', 'fire', 'purple', 'cyber', 'gold'].map((preset) => (
          <Card key={preset}>
            <CardContent className="pt-4 text-center space-y-2">
              <Badge variant="secondary" className="capitalize">{preset}</Badge>
              <GradientText preset={preset} className="text-[24px] font-bold block">
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </GradientText>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator variant="bold" />

      {/* ─── Custom Gradient ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom Gradient"
        description="Define your own gradient colors."
        code={`<GradientText 
  colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1']}
  duration={4}
>
  Custom Colors
</GradientText>`}
      >
        <div className="text-center py-4">
          <GradientText 
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1']}
            duration={4}
            className="text-[36px] font-bold"
          >
            Custom Gradient Colors
          </GradientText>
        </div>
      </PlaygroundSection>

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Hero Headline"
        description="Eye-catching hero text for landing pages."
        code={`<GradientText 
  preset="cyber" 
  as="h1"
  className="text-6xl font-bold"
>
  Next-Gen Security
</GradientText>`}
      >
        <div className="text-center py-8 bg-gradient-to-b from-[var(--background)] to-[var(--secondary)] rounded-lg">
          <GradientText 
            preset="cyber"
            as="h1"
            className="text-[48px] md:text-[64px] font-bold"
          >
            Next-Gen Security
          </GradientText>
          <p className="text-[var(--muted-foreground)] mt-4">
            AI-powered threat detection for the modern enterprise
          </p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature Badges"
        description="Highlight feature names with gradient text."
        code={`<GradientText preset="gold">
  ★ Premium Feature
</GradientText>`}
      >
        <div className="flex flex-wrap gap-4 justify-center py-4">
          <Badge variant="outline" className="py-2 px-4">
            <GradientText preset="gold" className="font-semibold">
              ★ Premium
            </GradientText>
          </Badge>
          <Badge variant="outline" className="py-2 px-4">
            <GradientText preset="ocean" className="font-semibold">
              ⚡ Fast
            </GradientText>
          </Badge>
          <Badge variant="outline" className="py-2 px-4">
            <GradientText preset="forest" className="font-semibold">
              ✓ Secure
            </GradientText>
          </Badge>
          <Badge variant="outline" className="py-2 px-4">
            <GradientText preset="fire" className="font-semibold">
              🔥 Hot
            </GradientText>
          </Badge>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Static Gradient"
        description="Disable animation for a static gradient look."
        code={`<GradientText preset="sunset" animated={false}>
  Static Gradient Text
</GradientText>`}
      >
        <div className="text-center py-4">
          <GradientText preset="sunset" animated={false} className="text-[32px] font-bold">
            Static Gradient Text
          </GradientText>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
