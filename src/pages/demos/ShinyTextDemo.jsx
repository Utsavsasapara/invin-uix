import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { ShinyText } from 'invin-uix/ui/shiny-text';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function ShinyTextDemo() {
  return (
    <ComponentPage
      name="Shiny Text"
      description="Text with an animated shimmer effect. Uses the accent color as the shimmer highlight, which automatically adapts to the current theme."
      importCode={`import { ShinyText } from 'invin-uix/ui/shiny-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Shiny Text Playground"
        description="Customize the shimmer effect duration and width."
        controls={[
          { name: 'duration', label: 'Duration (seconds)', type: 'number', default: 2 },
          { name: 'shimmerWidth', label: 'Shimmer Width (%)', type: 'number', default: 100 },
        ]}
      >
        {(props) => (
          <div className="text-center py-8 space-y-4">
            <ShinyText
              duration={props.duration}
              shimmerWidth={props.shimmerWidth}
              className="text-[36px] font-bold"
            >
              Shiny Text Effect
            </ShinyText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to display' },
          { name: 'shimmer', type: 'boolean', default: 'true', description: 'Whether shimmer animation is active' },
          { name: 'duration', type: 'number', default: '2', description: 'Duration of one shimmer cycle in seconds' },
          { name: 'shimmerColor', type: 'string', default: 'var(--accent)', description: 'Shimmer highlight color (uses accent by default)' },
          { name: 'textColor', type: 'string', default: 'var(--foreground)', description: 'Base text color' },
          { name: 'shimmerWidth', type: 'number', default: '100', description: 'Width of shimmer highlight (0-100%)' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts in seconds' },
          { name: 'repeatCount', type: 'number', default: '-1', description: 'Number of repeats (-1 = infinite)' },
          { name: 'easing', type: 'string', default: 'linear', description: 'Animation timing function' },
          { name: 'as', type: 'string', default: 'span', description: 'HTML element to render' },
          { name: 'disableAnimation', type: 'boolean', default: 'false', description: 'Disable animation entirely' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Basic Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Basic Usage</h3>
        <p className="text-[var(--muted-foreground)]">
          By default, ShinyText uses the theme's accent color for the shimmer highlight, 
          which automatically adapts to light and dark modes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Default (Accent Shimmer)</Badge>
              <ShinyText className="text-[24px] font-bold block">
                Premium Feature
              </ShinyText>
              <p className="text-[var(--muted-foreground)] text-sm">Uses --accent color for shimmer</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Muted Text</Badge>
              <ShinyText className="text-[24px] text-[var(--muted-foreground)] block">
                Loading...
              </ShinyText>
              <p className="text-[var(--muted-foreground)] text-sm">Works with any text color</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Custom Shimmer Colors */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Custom Shimmer Colors</h3>
        <p className="text-[var(--muted-foreground)]">
          Override the shimmer color with any value for branded effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Gold</Badge>
              <ShinyText 
                shimmerColor="#FFD700"
                textColor="#b45309"
                className="text-[20px] font-bold block"
              >
                Premium Gold
              </ShinyText>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Cyan</Badge>
              <ShinyText 
                shimmerColor="#00FFFF"
                textColor="#0891b2"
                className="text-[20px] font-bold block"
              >
                Cyber Glow
              </ShinyText>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Pink</Badge>
              <ShinyText 
                shimmerColor="#FF69B4"
                textColor="#db2777"
                className="text-[20px] font-bold block"
              >
                Neon Pink
              </ShinyText>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Duration Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Duration Variations</h3>
        <p className="text-[var(--muted-foreground)]">
          Control the speed of the shimmer animation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Fast (1s)</Badge>
              <ShinyText duration={1} className="text-[20px] font-bold block">
                Fast Shimmer
              </ShinyText>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Default (2s)</Badge>
              <ShinyText duration={2} className="text-[20px] font-bold block">
                Default Speed
              </ShinyText>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="secondary">Slow (4s)</Badge>
              <ShinyText duration={4} className="text-[20px] font-bold block">
                Slow Shimmer
              </ShinyText>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Use Cases */}
      <PlaygroundSection
        title="Loading State"
        description="Perfect for indicating loading or processing states (like ChatGPT)."
        code={`<ShinyText className="text-muted-foreground">
  Generating response...
</ShinyText>`}
      >
        <div className="py-6 text-center">
          <ShinyText className="text-[18px] text-[var(--muted-foreground)]">
            Generating response...
          </ShinyText>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Premium Feature Highlight"
        description="Draw attention to premium features or badges."
        code={`<ShinyText className="text-2xl font-bold">
  Premium Feature Unlocked
</ShinyText>`}
      >
        <Card className="bg-gradient-to-r from-purple-900/20 to-purple-600/20 border-purple-500/30">
          <CardContent className="py-6 text-center">
            <ShinyText className="text-[28px] font-bold">
              Premium Feature Unlocked
            </ShinyText>
            <p className="text-[var(--muted-foreground)] mt-2">Experience the full power of our platform</p>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Navigation Highlight"
        description="Highlight important navigation elements."
        code={`<nav className="flex gap-6">
  <a href="#">Home</a>
  <ShinyText>What's New</ShinyText>
  <a href="#">Docs</a>
</nav>`}
      >
        <nav className="flex gap-6 items-center justify-center py-4">
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Home</span>
          <ShinyText className="font-medium cursor-pointer">
            What's New
          </ShinyText>
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Documentation</span>
          <span className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer">Pricing</span>
        </nav>
      </PlaygroundSection>

      <PlaygroundSection
        title="Call to Action"
        description="Use for important calls to action."
        code={`<ShinyText className="text-xl font-semibold">
  Get Started Free →
</ShinyText>`}
      >
        <div className="text-center py-6">
          <ShinyText className="text-[24px] font-semibold">
            Get Started Free →
          </ShinyText>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Usage Tips */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Theme-Aware</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Uses <code className="bg-[var(--secondary)] px-1 rounded text-xs">--accent</code> and 
                <code className="bg-[var(--secondary)] px-1 rounded text-xs ml-1">--foreground</code> CSS 
                variables which automatically adapt to light/dark themes.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-[var(--border)]">
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Custom Colors</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Use <code className="bg-[var(--secondary)] px-1 rounded text-xs">textColor</code> and 
                <code className="bg-[var(--secondary)] px-1 rounded text-xs ml-1">shimmerColor</code> props 
                for branded or custom color effects.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-[var(--border)]">
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Reduced Motion</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Respects <code className="bg-[var(--secondary)] px-1 rounded text-xs">prefers-reduced-motion</code> and 
                disables animation automatically for accessibility.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-[var(--border)]">
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">CSS-Only</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Pure CSS animation with no JavaScript runtime. Uses background-clip: text 
                for the shimmer effect.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

    </ComponentPage>
  );
}
