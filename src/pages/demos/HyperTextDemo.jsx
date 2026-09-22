import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { HyperText } from 'invin-uix/ui/hyper-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise, Play } from 'invin-uix/ui/icons';

export default function HyperTextDemo() {
  const [key, setKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Hyper Text"
      description="Text scramble/decrypt reveal effect that cycles through random characters before revealing the actual text. Supports multiple trigger modes: view, hover, click, or manual control."
      importCode={`import { HyperText } from 'invin-uix/ui/hyper-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Interactive', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Hyper Text Playground"
        description="Experiment with different trigger modes and timing settings."
        controls={[
          { name: 'trigger', label: 'Trigger', type: 'select', default: 'view', options: [
            { value: 'view', label: 'On View' },
            { value: 'hover', label: 'On Hover' },
            { value: 'click', label: 'On Click' },
          ]},
          { name: 'duration', label: 'Duration (ms)', type: 'number', default: 800 },
          { name: 'stagger', label: 'Stagger (ms)', type: 'number', default: 30 },
          { name: 'loop', label: 'Loop', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full text-center">
            <HyperText
              key={key}
              trigger={props.trigger}
              duration={props.duration}
              stagger={props.stagger}
              loop={props.loop}
              className="text-[36px] font-mono font-bold text-[var(--foreground)]"
            >
              SECURITY SYSTEM
            </HyperText>
            <p className="text-sm text-[var(--muted-foreground)]">
              {props.trigger === 'hover' && 'Hover over the text to trigger'}
              {props.trigger === 'click' && 'Click the text to trigger'}
              {props.trigger === 'view' && 'Triggered when visible'}
            </p>
            <Button variant="outline" size="sm" onClick={resetAnimation}>
              <ArrowClockwise style={{ width: 14, height: 14 }} /> Reset
            </Button>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text to reveal' },
          { name: 'trigger', type: "'view' | 'hover' | 'click' | 'manual'", default: "'view'", description: 'How to trigger the animation' },
          { name: 'duration', type: 'number', default: '800', description: 'Total animation duration (ms)' },
          { name: 'stagger', type: 'number', default: '30', description: 'Delay between character reveals (ms)' },
          { name: 'loop', type: 'boolean', default: 'false', description: 'Continuously loop the animation' },
          { name: 'isRunning', type: 'boolean', default: '—', description: 'Control animation externally (manual trigger)' },
          { name: 'characterSet', type: 'string', default: 'A-Z, 0-9, symbols', description: 'Characters to use for scrambling' },
          { name: 'onComplete', type: '() => void', default: '—', description: 'Callback when animation completes' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Trigger Modes ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Trigger Modes</h3>
        <p className="text-[var(--muted-foreground)]">
          Four ways to trigger the scramble animation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">On View</Badge>
            <HyperText key={`view-${key}`} trigger="view" className="text-[24px] font-mono font-bold">
              LOADING...
            </HyperText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">On Hover</Badge>
            <HyperText trigger="hover" className="text-[24px] font-mono font-bold cursor-pointer">
              HOVER ME
            </HyperText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">On Click</Badge>
            <HyperText trigger="click" className="text-[24px] font-mono font-bold cursor-pointer">
              CLICK ME
            </HyperText>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Loop</Badge>
            <HyperText trigger="view" loop className="text-[24px] font-mono font-bold text-[var(--accent)]">
              SCANNING
            </HyperText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Security Terminal"
        description="Cyberpunk-style terminal text reveal."
        code={`<HyperText 
  trigger="view"
  stagger={20}
  className="text-2xl font-mono text-green-400"
>
  ACCESS GRANTED
</HyperText>`}
      >
        <div className="bg-black p-6 rounded-lg text-center">
          <HyperText
            key={`term-${key}`}
            trigger="view"
            stagger={20}
            className="text-[28px] font-mono font-bold text-green-400"
          >
            ACCESS GRANTED
          </HyperText>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Messages"
        description="Animated status updates in a dashboard."
        code={`<HyperText trigger="view" duration={600}>
  THREAT DETECTED: HIGH SEVERITY
</HyperText>`}
      >
        <Card className="border-[var(--error)] bg-[var(--error)]/10">
          <CardContent className="py-4 text-center">
            <HyperText
              key={`alert-${key}`}
              trigger="view"
              duration={600}
              className="text-[20px] font-mono font-bold text-[var(--error)]"
            >
              ⚠ THREAT DETECTED: HIGH SEVERITY
            </HyperText>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Interactive Button"
        description="Reveal text on hover for interactive elements."
        code={`<Button>
  <HyperText trigger="hover">
    DECRYPT
  </HyperText>
</Button>`}
      >
        <div className="flex gap-4 justify-center py-4">
          <Button size="lg">
            <HyperText trigger="hover" className="font-mono">
              DECRYPT FILE
            </HyperText>
          </Button>
          <Button variant="outline" size="lg">
            <HyperText trigger="hover" className="font-mono">
              INITIALIZE
            </HyperText>
          </Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Manual Control"
        description="Programmatically control the animation."
        code={`const [isRunning, setIsRunning] = useState(false);

<HyperText trigger="manual" isRunning={isRunning}>
  CONTROLLED TEXT
</HyperText>
<Button onClick={() => setIsRunning(true)}>Start</Button>`}
      >
        <div className="text-center space-y-4 py-4">
          <HyperText
            trigger="manual"
            isRunning={isRunning}
            onComplete={() => setIsRunning(false)}
            className="text-[28px] font-mono font-bold"
          >
            MANUAL CONTROL
          </HyperText>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => setIsRunning(true)}>
              <Play style={{ width: 14, height: 14 }} /> Start Animation
            </Button>
          </div>
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
