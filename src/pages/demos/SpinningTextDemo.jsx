import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { SpinningText } from 'invin-uix/ui/spinning-text';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function SpinningTextDemo() {
  const [paused, setPaused] = useState(false);

  return (
    <ComponentPage
      name="Spinning Text"
      description="Displays text arranged in a circle that rotates continuously. Perfect for decorative badges, loaders, or eye-catching design elements."
      importCode={`import { SpinningText } from 'invin-uix/ui/spinning-text';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'CSS', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Spinning Text Playground"
        description="Customize the circular text rotation effect."
        controls={[
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 10 },
          { name: 'radius', label: 'Radius (px)', type: 'number', default: 80 },
          { name: 'fontSize', label: 'Font Size (px)', type: 'number', default: 14 },
          { name: 'direction', label: 'Direction', type: 'select', default: 'clockwise', options: [
            { value: 'clockwise', label: 'Clockwise' },
            { value: 'counter-clockwise', label: 'Counter-Clockwise' },
          ]},
          { name: 'repeat', label: 'Repeat Count', type: 'number', default: 2 },
        ]}
      >
        {(props) => (
          <div className="flex justify-center py-8">
            <SpinningText
              duration={props.duration}
              radius={props.radius}
              fontSize={props.fontSize}
              direction={props.direction}
              repeat={props.repeat}
              className="text-[var(--foreground)] font-bold uppercase tracking-widest"
            >
              SPINNING TEXT
            </SpinningText>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text to display in a spinning circle' },
          { name: 'duration', type: 'number', default: '10', description: 'Duration of one full rotation (seconds)' },
          { name: 'direction', type: "'clockwise' | 'counter-clockwise'", default: "'clockwise'", description: 'Direction of rotation' },
          { name: 'fontSize', type: 'number | string', default: '14', description: 'Font size of the text' },
          { name: 'radius', type: 'number', default: '80', description: 'Radius of the text circle (px)' },
          { name: 'paused', type: 'boolean', default: 'false', description: 'Pause the animation' },
          { name: 'separator', type: 'string', default: "' • '", description: 'Character between text repetitions' },
          { name: 'repeat', type: 'number', default: '2', description: 'Times to repeat text around circle' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Examples ─────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
        {/* Default */}
        <Card>
          <CardContent className="pt-4 flex flex-col items-center justify-center min-h-[250px]">
            <Badge variant="secondary" className="mb-4">Default</Badge>
            <SpinningText className="text-[var(--foreground)] font-semibold">
              SECURITY
            </SpinningText>
          </CardContent>
        </Card>

        {/* Counter-Clockwise */}
        <Card>
          <CardContent className="pt-4 flex flex-col items-center justify-center min-h-[250px]">
            <Badge variant="secondary" className="mb-4">Counter-Clockwise</Badge>
            <SpinningText direction="counter-clockwise" className="text-[var(--accent)] font-semibold">
              PROTECTED
            </SpinningText>
          </CardContent>
        </Card>

        {/* Fast */}
        <Card>
          <CardContent className="pt-4 flex flex-col items-center justify-center min-h-[250px]">
            <Badge variant="secondary" className="mb-4">Fast (5s)</Badge>
            <SpinningText duration={5} className="text-[var(--ok)] font-semibold">
              LOADING
            </SpinningText>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading Indicator"
        description="Circular loading text with centered content."
        code={`<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={60} duration={8}>
    LOADING YOUR DATA
  </SpinningText>
  <Spinner size="lg" />
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText radius={60} duration={8} fontSize={12} className="text-[var(--muted-foreground)] uppercase tracking-wider">
              LOADING YOUR DATA
            </SpinningText>
            <div className="absolute text-[28px]">🔄</div>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Badge with Icon"
        description="Spinning text around a centered icon or logo."
        code={`<div className="relative inline-flex items-center justify-center">
  <SpinningText radius={70} duration={15}>
    CERTIFIED SECURE
  </SpinningText>
  <span className="absolute text-3xl">🛡️</span>
</div>`}
      >
        <div className="flex justify-center py-8">
          <div className="relative inline-flex items-center justify-center">
            <SpinningText radius={70} duration={15} fontSize={11} className="text-[var(--ok)] font-bold uppercase tracking-widest">
              CERTIFIED SECURE
            </SpinningText>
            <span className="absolute text-[36px]">🛡️</span>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Pause Control"
        description="Toggle the spinning animation programmatically."
        code={`const [paused, setPaused] = useState(false);

<SpinningText paused={paused}>
  PAUSE ME
</SpinningText>
<Button onClick={() => setPaused(!paused)}>
  {paused ? 'Resume' : 'Pause'}
</Button>`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <SpinningText paused={paused} className="text-[var(--foreground)] font-semibold">
            CLICK TO PAUSE
          </SpinningText>
          <Button variant="outline" onClick={() => setPaused(!paused)}>
            {paused ? '▶ Resume' : '⏸ Pause'}
          </Button>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Custom Separator"
        description="Use custom separators between text repetitions."
        code={`<SpinningText separator=" ★ " repeat={3}>
  PREMIUM
</SpinningText>`}
      >
        <div className="flex justify-center py-8">
          <SpinningText separator=" ★ " repeat={3} radius={90} fontSize={13} className="text-[var(--warning)] font-bold uppercase">
            PREMIUM
          </SpinningText>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
