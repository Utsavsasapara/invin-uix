import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { HyperText } from 'invin-uix/ui/hyper-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function HyperTextDemo() {
  const [key, setKey] = useState(0);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Hyper Text"
      description="Text scramble/decrypt reveal effect that cycles through random characters before revealing the actual text. Animates on view or hover."
      importCode={`import { HyperText } from 'invin-uix/ui/hyper-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Hyper Text Playground"
        description="Experiment with different settings. Hover over the text to re-trigger the animation."
        controls={[
          { name: 'duration', label: 'Duration (ms)', type: 'number', default: 800 },
          { name: 'delay', label: 'Delay (ms)', type: 'number', default: 0 },
          { name: 'startOnView', label: 'Start On View', type: 'boolean', default: false },
          { name: 'animateOnHover', label: 'Animate On Hover', type: 'boolean', default: true },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full text-center">
            <HyperText
              key={key}
              duration={props.duration}
              delay={props.delay}
              startOnView={props.startOnView}
              animateOnHover={props.animateOnHover}
              className="text-[36px] font-bold"
            >
              HOVER ME
            </HyperText>
            <p className="text-sm text-[var(--muted-foreground)]">
              {props.animateOnHover ? 'Hover over the text to trigger the scramble effect' : 'Animation plays automatically'}
            </p>
            <Button variant="outline" size="sm" onClick={resetAnimation}>
              <ArrowClockwise style={{ width: 14, height: 14 }} /> Reset
            </Button>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text to reveal' },
          { name: 'duration', type: 'number', default: '800', description: 'Animation duration in milliseconds' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (ms)' },
          { name: 'as', type: 'MotionElementType', default: "'div'", description: 'HTML element to render (div, span, h1-h6, p, etc.)' },
          { name: 'startOnView', type: 'boolean', default: 'false', description: 'Start animation when element comes into view' },
          { name: 'animateOnHover', type: 'boolean', default: 'true', description: 'Trigger animation on hover' },
          { name: 'characterSet', type: 'string[]', default: 'A-Z', description: 'Characters to use for scrambling' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Hover Trigger</Badge>
            <HyperText animateOnHover className="text-[24px] font-bold cursor-pointer">
              HOVER ME
            </HyperText>
            <p className="text-xs text-[var(--muted-foreground)]">Hover to trigger scramble</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Start On View</Badge>
            <HyperText key={`view-${key}`} startOnView animateOnHover={false} className="text-[24px] font-bold">
              LOADING
            </HyperText>
            <p className="text-xs text-[var(--muted-foreground)]">Animates when scrolled into view</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Fast Duration</Badge>
            <HyperText duration={400} className="text-[24px] font-bold cursor-pointer">
              QUICK
            </HyperText>
            <p className="text-xs text-[var(--muted-foreground)]">400ms duration</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Slow Duration</Badge>
            <HyperText duration={1500} className="text-[24px] font-bold cursor-pointer">
              SLOW
            </HyperText>
            <p className="text-xs text-[var(--muted-foreground)]">1500ms duration</p>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Use Cases */}
      <PlaygroundSection
        title="Security Terminal"
        description="Cyberpunk-style terminal text reveal."
        code={`<HyperText 
  startOnView
  animateOnHover={false}
  className="text-2xl font-bold text-green-400"
>
  ACCESS GRANTED
</HyperText>`}
      >
        <div className="bg-black p-6 rounded-lg text-center">
          <HyperText
            key={`term-${key}`}
            startOnView
            animateOnHover={false}
            className="text-[28px] font-bold text-green-400"
          >
            ACCESS GRANTED
          </HyperText>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Messages"
        description="Animated status updates in a dashboard."
        code={`<HyperText startOnView duration={600}>
  THREAT DETECTED
</HyperText>`}
      >
        <Card className="border-[var(--error)] bg-[var(--error)]/10">
          <CardContent className="py-4 text-center">
            <HyperText
              key={`alert-${key}`}
              startOnView
              animateOnHover={false}
              duration={600}
              className="text-[20px] font-bold text-[var(--error)]"
            >
              THREAT DETECTED: HIGH SEVERITY
            </HyperText>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Interactive Buttons"
        description="Reveal text on hover for interactive elements."
        code={`<Button>
  <HyperText animateOnHover>
    DECRYPT
  </HyperText>
</Button>`}
      >
        <div className="flex gap-4 justify-center py-4">
          <Button size="lg">
            <HyperText animateOnHover as="span">
              DECRYPT FILE
            </HyperText>
          </Button>
          <Button variant="outline" size="lg">
            <HyperText animateOnHover as="span">
              INITIALIZE
            </HyperText>
          </Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Delay"
        description="Add a delay before the animation starts."
        code={`<HyperText startOnView delay={500}>
  DELAYED START
</HyperText>`}
      >
        <div className="text-center py-6">
          <HyperText
            key={`delay-${key}`}
            startOnView
            animateOnHover={false}
            delay={500}
            className="text-[28px] font-bold"
          >
            DELAYED START
          </HyperText>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">500ms delay before animation</p>
        </div>
      </PlaygroundSection>

      <div className="flex justify-center pt-4">
        <Button onClick={resetAnimation}>
          <ArrowClockwise style={{ width: 16, height: 16 }} /> Replay All Animations
        </Button>
      </div>

    </ComponentPage>
  );
}
