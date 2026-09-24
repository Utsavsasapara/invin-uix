import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { SpinningText } from 'invin-uix/ui/spinning-text';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { Spinner, Shield, ArrowClockwise, Star, Lightning } from '@phosphor-icons/react';

export default function SpinningTextDemo() {
  return (
    <ComponentPage
      name="Spinning Text"
      description="Displays text arranged in a circle that rotates continuously. Perfect for decorative badges, loaders, or eye-catching design elements."
      importCode={`import { SpinningText } from 'invin-uix/ui/spinning-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Spinning Text Playground"
        description="Customize the circular text rotation effect."
        controls={[
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 10 },
          { name: 'radius', label: 'Radius (px)', type: 'number', default: 80 },
          { name: 'fontSize', label: 'Font Size (px)', type: 'number', default: 12 },
          { name: 'reverse', label: 'Direction', type: 'select', default: 'false', options: [
            { value: 'false', label: 'Clockwise' },
            { value: 'true', label: 'Counter-Clockwise' },
          ]},
        ]}
      >
        {(props) => (
          <div className="flex justify-center items-center py-8">
            <SpinningText
              duration={props.duration}
              radius={props.radius}
              fontSize={props.fontSize}
              reverse={props.reverse === 'true'}
              className="font-medium text-[var(--foreground)]"
            >
              GROW MORE • LEARN MORE • EARN MORE •
            </SpinningText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'children', type: 'string | string[]', required: true, default: '-', description: 'The text to display in a spinning circle' },
          { name: 'duration', type: 'number', default: '10', description: 'Duration of one full rotation (seconds)' },
          { name: 'reverse', type: 'boolean', default: 'false', description: 'Spin in reverse (counter-clockwise) direction' },
          { name: 'radius', type: 'number', default: '80', description: 'Radius of the text circle (pixels)' },
          { name: 'fontSize', type: 'number', default: '12', description: 'Font size of the text (pixels)' },
          { name: 'transition', type: 'Transition', default: '-', description: 'Custom Framer Motion transition overrides' },
          { name: 'variants', type: 'SpinningTextVariants', default: '-', description: 'Custom Framer Motion variants for container and items' },
          { name: 'className', type: 'string', default: '-', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
        {/* Default */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[260px]">
            <Badge variant="secondary" className="mb-4">Default</Badge>
            <SpinningText 
              radius={70}
              fontSize={11}
              className="font-semibold text-[var(--foreground)]"
            >
              INVINSENSE • SECURITY •
            </SpinningText>
          </CardContent>
        </Card>

        {/* Reverse */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[260px]">
            <Badge variant="secondary" className="mb-4">Reverse</Badge>
            <SpinningText 
              reverse 
              radius={70}
              fontSize={11}
              className="font-semibold text-[var(--accent)]"
            >
              COUNTER-CLOCKWISE • SPIN •
            </SpinningText>
          </CardContent>
        </Card>

        {/* Fast */}
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[260px]">
            <Badge variant="secondary" className="mb-4">Fast (4s)</Badge>
            <SpinningText 
              duration={4} 
              radius={70}
              fontSize={11}
              className="font-semibold text-[var(--ok)]"
            >
              LOADING • PLEASE WAIT •
            </SpinningText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Use Cases */}
      <PlaygroundSection
        title="Loading Indicator"
        description="Circular loading text with centered spinner icon."
        code={`import { Spinner } from '@phosphor-icons/react';

<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={70} duration={8} fontSize={10}>
    LOADING YOUR DATA •
  </SpinningText>
  <ArrowClockwise className="absolute" size={28} weight="bold" />
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText 
              radius={70} 
              duration={8} 
              fontSize={10}
              className="tracking-wider text-[var(--muted-foreground)] font-medium"
            >
              LOADING YOUR DATA •
            </SpinningText>
            <ArrowClockwise 
              className="absolute text-[var(--accent)]" 
              size={28} 
              weight="bold" 
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Security Badge"
        description="Spinning text around a centered shield icon."
        code={`import { Shield } from '@phosphor-icons/react';

<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={80} duration={15} fontSize={11}>
    CERTIFIED SECURE • PROTECTED •
  </SpinningText>
  <Shield className="absolute" size={32} weight="fill" />
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText 
              radius={80} 
              duration={15} 
              fontSize={11}
              className="text-[var(--ok)] font-bold"
            >
              CERTIFIED SECURE • PROTECTED •
            </SpinningText>
            <Shield 
              className="absolute text-[var(--accent)]" 
              size={32} 
              weight="fill" 
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Premium Badge"
        description="Star icon with premium text spinning around it."
        code={`import { Star } from '@phosphor-icons/react';

<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={75} duration={12} fontSize={10} reverse>
    PREMIUM • EXCLUSIVE • VIP •
  </SpinningText>
  <Star className="absolute" size={28} weight="fill" />
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText 
              radius={75} 
              duration={12} 
              fontSize={10}
              reverse
              className="text-[var(--warning)] font-bold"
            >
              PREMIUM • EXCLUSIVE • VIP •
            </SpinningText>
            <Star 
              className="absolute text-[var(--warning)]" 
              size={28} 
              weight="fill" 
            />
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Power Badge"
        description="Lightning icon with energy text."
        code={`import { Lightning } from '@phosphor-icons/react';

<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={70} duration={6} fontSize={10}>
    HIGH PERFORMANCE • FAST •
  </SpinningText>
  <Lightning className="absolute" size={26} weight="fill" />
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText 
              radius={70} 
              duration={6} 
              fontSize={10}
              className="text-[var(--accent)] font-bold"
            >
              HIGH PERFORMANCE • FAST •
            </SpinningText>
            <Lightning 
              className="absolute text-[var(--warning)]" 
              size={26} 
              weight="fill" 
            />
          </div>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}