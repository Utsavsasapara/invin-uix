import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { AuroraText } from 'invin-uix/ui/aurora-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function AuroraTextDemo() {
  return (
    <ComponentPage
      name="Aurora Text"
      description="Text with mesmerizing aurora borealis gradient effects. Features 6 presets and optional glow effects for creating stunning visual headlines."
      importCode={`import { AuroraText } from 'invin-uix/ui/aurora-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Aurora Text Playground"
        description="Experiment with different aurora presets and glow settings."
        controls={[
          { name: 'preset', label: 'Preset', type: 'select', default: 'default', options: [
            { value: 'default', label: 'Default' },
            { value: 'northern', label: 'Northern Lights' },
            { value: 'sunset', label: 'Sunset' },
            { value: 'ocean', label: 'Ocean' },
            { value: 'forest', label: 'Forest' },
            { value: 'cosmic', label: 'Cosmic' },
          ]},
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 8 },
          { name: 'glow', label: 'Glow Effect', type: 'boolean', default: false },
          { name: 'glowBlur', label: 'Glow Blur (px)', type: 'number', default: 20 },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <AuroraText
              preset={props.preset}
              duration={props.duration}
              glow={props.glow}
              glowBlur={props.glowBlur}
              className="text-[48px] font-bold"
            >
              Aurora Borealis
            </AuroraText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to display' },
          { name: 'preset', type: 'AuroraPreset', default: "'default'", description: 'Preset: default, northern, sunset, ocean, forest, cosmic' },
          { name: 'colors', type: 'string[]', default: '—', description: 'Custom gradient colors (overrides preset)' },
          { name: 'duration', type: 'number', default: '8', description: 'Animation cycle duration (seconds)' },
          { name: 'glow', type: 'boolean', default: 'false', description: 'Enable glow effect' },
          { name: 'glowBlur', type: 'number', default: '20', description: 'Blur radius for glow effect (px)' },
          { name: 'glowOpacity', type: 'number', default: '0.5', description: 'Opacity of the glow (0-1)' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
          { name: 'as', type: 'ElementType', default: "'span'", description: 'HTML element to render' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Preset Gallery ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Aurora Presets</h3>
        <p className="text-[var(--muted-foreground)]">
          6 built-in aurora color themes inspired by natural phenomena.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { preset: 'default', label: 'Default', desc: 'Classic aurora' },
          { preset: 'northern', label: 'Northern', desc: 'Arctic lights' },
          { preset: 'sunset', label: 'Sunset', desc: 'Warm sky' },
          { preset: 'ocean', label: 'Ocean', desc: 'Deep sea' },
          { preset: 'forest', label: 'Forest', desc: 'Nature tones' },
          { preset: 'cosmic', label: 'Cosmic', desc: 'Space vibes' },
        ].map((item) => (
          <Card key={item.preset}>
            <CardContent className="pt-4 text-center space-y-2 min-h-[120px] flex flex-col justify-center">
              <Badge variant="secondary">{item.label}</Badge>
              <AuroraText preset={item.preset} className="text-[28px] font-bold">
                {item.label}
              </AuroraText>
              <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator variant="bold" />

      {/* ─── Glow Effect ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Glow Effect</h3>
        <p className="text-[var(--muted-foreground)]">
          Add a soft glow behind the text for extra visual impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/50">
          <CardContent className="pt-6 text-center">
            <Badge variant="secondary" className="mb-4">Without Glow</Badge>
            <AuroraText preset="northern" className="text-[32px] font-bold">
              Northern Lights
            </AuroraText>
          </CardContent>
        </Card>

        <Card className="bg-black/50">
          <CardContent className="pt-6 text-center">
            <Badge variant="secondary" className="mb-4">With Glow</Badge>
            <AuroraText preset="northern" glow glowBlur={30} className="text-[32px] font-bold">
              Northern Lights
            </AuroraText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Hero Section"
        description="Stunning hero headline with aurora effect."
        code={`<AuroraText 
  preset="cosmic" 
  glow 
  as="h1"
  className="text-6xl font-bold"
>
  Welcome to the Future
</AuroraText>`}
      >
        <div className="text-center py-12 bg-gradient-to-b from-black to-[var(--background)] rounded-lg">
          <AuroraText preset="cosmic" glow glowBlur={40} as="h1" className="text-[48px] md:text-[64px] font-bold">
            Welcome to the Future
          </AuroraText>
          <p className="text-[var(--muted-foreground)] mt-4 text-lg">
            Next-generation cybersecurity platform
          </p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Custom Colors"
        description="Define your own aurora gradient colors."
        code={`<AuroraText 
  colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
>
  Custom Aurora
</AuroraText>`}
      >
        <div className="text-center py-8">
          <AuroraText
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1']}
            className="text-[40px] font-bold"
          >
            Custom Aurora Colors
          </AuroraText>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Brand Showcase"
        description="Highlight brand names or product titles."
        code={`<AuroraText preset="ocean" glow>
  Invinsense XDR+
</AuroraText>`}
      >
        <div className="flex flex-wrap gap-8 justify-center items-center py-8">
          <AuroraText preset="ocean" glow className="text-[28px] font-bold">
            Invinsense XDR+
          </AuroraText>
          <AuroraText preset="forest" glow className="text-[28px] font-bold">
            SOAR Platform
          </AuroraText>
          <AuroraText preset="sunset" glow className="text-[28px] font-bold">
            Threat Intelligence
          </AuroraText>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
