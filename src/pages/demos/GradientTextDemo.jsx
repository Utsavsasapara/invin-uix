import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { GradientText } from 'invin-uix/ui/gradient-text';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function GradientTextDemo() {
  return (
    <ComponentPage
      name="Gradient Text"
      description="Text with an animated flowing gradient effect. Customize the colors and animation speed for eye-catching headlines and highlights."
      importCode={`import { GradientText } from 'invin-uix/ui/gradient-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Gradient Text Playground"
        description="Customize the gradient colors and animation speed."
        controls={[
          { name: 'speed', label: 'Speed', type: 'number', default: 1 },
          { name: 'colorFrom', label: 'Color From', type: 'text', default: '#ffaa40' },
          { name: 'colorTo', label: 'Color To', type: 'text', default: '#9c40ff' },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <GradientText
              speed={props.speed}
              colorFrom={props.colorFrom}
              colorTo={props.colorTo}
              className="text-[48px] font-bold"
            >
              Animated Gradient
            </GradientText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to display' },
          { name: 'speed', type: 'number', default: '1', description: 'Animation speed multiplier (higher = faster)' },
          { name: 'colorFrom', type: 'string', default: "'#ffaa40'", description: 'Starting color of the gradient' },
          { name: 'colorTo', type: 'string', default: "'#9c40ff'", description: 'Middle/ending color of the gradient' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Speed Variations */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Speed Variations</h3>
        <p className="text-[var(--muted-foreground)]">
          Adjust the animation speed for different effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Slow (0.5x)</Badge>
            <GradientText speed={0.5} className="text-[24px] font-bold">
              Slow Gradient
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Normal (1x)</Badge>
            <GradientText speed={1} className="text-[24px] font-bold">
              Normal Gradient
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Fast (2x)</Badge>
            <GradientText speed={2} className="text-[24px] font-bold">
              Fast Gradient
            </GradientText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Color Variations */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Color Variations</h3>
        <p className="text-[var(--muted-foreground)]">
          Different color combinations for various use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Orange to Purple</Badge>
            <GradientText colorFrom="#ffaa40" colorTo="#9c40ff" className="text-[24px] font-bold">
              Default
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Cyan to Blue</Badge>
            <GradientText colorFrom="#00f5a0" colorTo="#00d9f5" className="text-[24px] font-bold">
              Cyber
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Pink to Orange</Badge>
            <GradientText colorFrom="#ff0080" colorTo="#ff8c00" className="text-[24px] font-bold">
              Sunset
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Green to Teal</Badge>
            <GradientText colorFrom="#22c55e" colorTo="#14b8a6" className="text-[24px] font-bold">
              Nature
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Red to Yellow</Badge>
            <GradientText colorFrom="#ef4444" colorTo="#eab308" className="text-[24px] font-bold">
              Fire
            </GradientText>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center space-y-2">
            <Badge variant="secondary">Blue to Purple</Badge>
            <GradientText colorFrom="#3b82f6" colorTo="#8b5cf6" className="text-[24px] font-bold">
              Ocean
            </GradientText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Use Cases */}
      <PlaygroundSection
        title="Hero Headline"
        description="Eye-catching hero text for landing pages."
        code={`<GradientText 
  colorFrom="#00f5a0" 
  colorTo="#00d9f5"
  className="text-6xl font-bold"
>
  Next-Gen Security
</GradientText>`}
      >
        <div className="text-center py-8 bg-gradient-to-b from-[var(--background)] to-[var(--secondary)] rounded-lg">
          <GradientText 
            colorFrom="#00f5a0" 
            colorTo="#00d9f5"
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
        title="Feature Highlight"
        description="Highlight important features or announcements."
        code={`<GradientText colorFrom="#ffaa40" colorTo="#9c40ff">
  Introducing v2.0
</GradientText>`}
      >
        <div className="text-center py-6">
          <Badge variant="outline" className="py-2 px-4">
            <GradientText colorFrom="#ffaa40" colorTo="#9c40ff" className="font-semibold">
              Introducing v2.0
            </GradientText>
          </Badge>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Brand Text"
        description="Use for brand names or product titles."
        code={`<GradientText colorFrom="#3b82f6" colorTo="#8b5cf6">
  INVINSENSE
</GradientText>`}
      >
        <div className="text-center py-6">
          <GradientText 
            colorFrom="#3b82f6" 
            colorTo="#8b5cf6" 
            className="text-[36px] font-bold tracking-wider"
          >
            INVINSENSE
          </GradientText>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
