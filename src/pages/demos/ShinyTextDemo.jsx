import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { ShinyText } from 'invin-uix/ui/shiny-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function ShinyTextDemo() {
  return (
    <ComponentPage
      name="Shiny Text"
      description="Text with an animated shimmer/shine effect that sweeps across the text. Perfect for highlighting special content, premium features, or call-to-action elements."
      importCode={`import { ShinyText } from 'invin-uix/ui/shiny-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Shiny Text Playground"
        description="Customize the shimmer effect with different colors and timing."
        controls={[
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 3 },
          { name: 'shimmerWidth', label: 'Shimmer Width', type: 'number', default: 100 },
          { name: 'baseColor', label: 'Base Color', type: 'text', default: '#9CA3AF' },
          { name: 'shimmerColor', label: 'Shimmer Color', type: 'text', default: '#FFFFFF' },
          { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <ShinyText
              duration={props.duration}
              shimmerWidth={props.shimmerWidth}
              baseColor={props.baseColor}
              shimmerColor={props.shimmerColor}
              disabled={props.disabled}
              className="text-[36px] font-bold"
            >
              Premium Feature
            </ShinyText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to display' },
          { name: 'duration', type: 'number', default: '3', description: 'Duration of one shimmer cycle (seconds)' },
          { name: 'shimmerWidth', type: 'number', default: '100', description: 'Width of the shimmer effect (pixels)' },
          { name: 'baseColor', type: 'string', default: "'#9CA3AF'", description: 'Base text color' },
          { name: 'shimmerColor', type: 'string', default: "'#FFFFFF'", description: 'Color of the shimmer highlight' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the shimmer animation' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
          { name: 'as', type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'", default: "'span'", description: 'HTML element to render' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Examples ─────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Badge variant="secondary">Premium Badge</Badge>
            <ShinyText className="text-[24px] font-bold" baseColor="#FFD700" shimmerColor="#FFFFFF">
              ⭐ PREMIUM
            </ShinyText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Badge variant="secondary">New Feature</Badge>
            <ShinyText className="text-[24px] font-bold" baseColor="#22C55E" shimmerColor="#BBFFD9">
              ✨ New Feature
            </ShinyText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Badge variant="secondary">CTA Text</Badge>
            <ShinyText className="text-[20px] font-semibold" baseColor="#3B82F6" shimmerColor="#93C5FD">
              Get Started Now →
            </ShinyText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <Badge variant="secondary">Alert</Badge>
            <ShinyText className="text-[20px] font-semibold" baseColor="#EF4444" shimmerColor="#FCA5A5">
              ⚠️ Critical Security Update
            </ShinyText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Premium Plan Highlight"
        description="Draw attention to premium features or pricing."
        code={`<ShinyText 
  baseColor="#9333EA" 
  shimmerColor="#C084FC"
  className="text-2xl font-bold"
>
  Enterprise Plan - Best Value
</ShinyText>`}
      >
        <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-500/30">
          <CardContent className="py-6 text-center">
            <ShinyText 
              baseColor="#9333EA" 
              shimmerColor="#C084FC"
              className="text-[28px] font-bold"
            >
              Enterprise Plan - Best Value
            </ShinyText>
            <p className="text-[var(--muted-foreground)] mt-2">Unlimited users, 24/7 support, custom integrations</p>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Navigation Link"
        description="Highlight important navigation elements."
        code={`<nav className="flex gap-6">
  <a href="#">Home</a>
  <ShinyText as="a" href="#">
    What's New
  </ShinyText>
  <a href="#">Docs</a>
</nav>`}
      >
        <nav className="flex gap-6 items-center justify-center py-4">
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Home</span>
          <ShinyText className="font-medium cursor-pointer">
            What's New ✨
          </ShinyText>
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Documentation</span>
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Pricing</span>
        </nav>
      </PlaygroundSection>

      <PlaygroundSection
        title="Disabled State"
        description="Static text when animation is disabled."
        code={`<ShinyText disabled>
  Static Text (no shimmer)
</ShinyText>`}
      >
        <div className="text-center py-4">
          <ShinyText disabled className="text-[24px] font-semibold">
            Static Text (shimmer disabled)
          </ShinyText>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
