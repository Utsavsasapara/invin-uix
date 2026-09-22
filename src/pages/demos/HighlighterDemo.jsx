import { useState, useRef } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Highlighter } from 'invin-uix/ui/highlighter';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function HighlighterDemo() {
  const [key, setKey] = useState(0);
  const manualRef = useRef(null);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Highlighter"
      description="An animated text highlighting component that sweeps a colored background across text. Supports multiple trigger modes and directional animations, perfect for drawing attention to key content."
      importCode={`import { Highlighter } from 'invin-uix/ui/highlighter';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Highlighter Playground"
        description="Customize the highlight effect with different colors and directions."
        controls={[
          { name: 'highlightColor', label: 'Highlight Color', type: 'text', default: 'hsl(45, 100%, 60%)' },
          { name: 'direction', label: 'Direction', type: 'select', default: 'ltr', options: [
            { value: 'ltr', label: 'Left to Right' },
            { value: 'rtl', label: 'Right to Left' },
            { value: 'ttb', label: 'Top to Bottom' },
            { value: 'btt', label: 'Bottom to Top' },
          ]},
          { name: 'trigger', label: 'Trigger', type: 'select', default: 'hover', options: [
            { value: 'auto', label: 'Auto (on mount)' },
            { value: 'hover', label: 'On Hover' },
            { value: 'inView', label: 'In View' },
          ]},
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <span className="text-[32px] font-bold text-[var(--foreground)]">
              This is{' '}
              <Highlighter
                key={`${key}-${props.direction}-${props.trigger}`}
                highlightColor={props.highlightColor}
                direction={props.direction}
                trigger={props.trigger}
                className="px-1"
              >
                highlighted text
              </Highlighter>
              {' '}in a sentence.
            </span>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to highlight' },
          { name: 'highlightColor', type: 'string', default: "'hsl(45, 100%, 60%)'", description: 'Color of the highlight (CSS color)' },
          { name: 'direction', type: "'ltr' | 'rtl' | 'ttb' | 'btt'", default: "'ltr'", description: 'Direction of the highlight animation' },
          { name: 'trigger', type: "'auto' | 'hover' | 'inView' | 'manual'", default: "'inView'", description: 'How to trigger the animation' },
          { name: 'animateOnce', type: 'boolean', default: 'true', description: 'Only animate once when in view' },
          { name: 'inViewThreshold', type: 'number', default: '0.5', description: 'IntersectionObserver threshold (0-1)' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (seconds)' },
          { name: 'transition', type: 'Transition', default: "{ type: 'spring', duration: 0.8 }", description: 'Animation transition config' },
          { name: 'as', type: "'span' | 'p' | 'h1' | ... | 'mark'", default: "'span'", description: 'HTML element to render' },
          { name: 'onAnimationStart', type: '() => void', default: '—', description: 'Callback when animation starts' },
          { name: 'onAnimationComplete', type: '() => void', default: '—', description: 'Callback when animation ends' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Direction Examples ─────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Animation Directions</h3>
        <p className="text-[var(--muted-foreground)]">
          Four directions for the highlight sweep effect. Hover over each to see the animation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Left to Right</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter trigger="hover" direction="ltr" highlightColor="hsl(45, 100%, 60%)">
                Hover to highlight
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Right to Left</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter trigger="hover" direction="rtl" highlightColor="hsl(200, 100%, 60%)">
                Hover to highlight
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Top to Bottom</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter trigger="hover" direction="ttb" highlightColor="hsl(120, 60%, 50%)">
                Hover to highlight
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Bottom to Top</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter trigger="hover" direction="btt" highlightColor="hsl(280, 80%, 60%)">
                Hover to highlight
              </Highlighter>
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Trigger Modes ─────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Trigger Modes</h3>
        <p className="text-[var(--muted-foreground)]">
          Different ways to trigger the highlight animation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Auto (on mount)</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={`auto-${key}`} trigger="auto" highlightColor="hsl(45, 100%, 60%)">
                Highlights automatically
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">In View</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={`inview-${key}`} trigger="inView" highlightColor="hsl(200, 100%, 60%)">
                Highlights when visible
              </Highlighter>
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Important Notice"
        description="Draw attention to critical information."
        code={`<p>
  Please read our{' '}
  <Highlighter highlightColor="hsl(0, 80%, 70%)" trigger="inView">
    terms and conditions
  </Highlighter>
  {' '}before proceeding.
</p>`}
      >
        <div className="text-center py-4">
          <p className="text-[20px] text-[var(--foreground)]">
            Please read our{' '}
            <Highlighter 
              key={`terms-${key}`}
              highlightColor="hsl(0, 80%, 70%)" 
              trigger="inView"
              className="px-1"
            >
              terms and conditions
            </Highlighter>
            {' '}before proceeding.
          </p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature Callout"
        description="Highlight key features or benefits."
        code={`<h2>
  We offer{' '}
  <Highlighter highlightColor="hsl(120, 60%, 60%)" trigger="hover">
    24/7 security monitoring
  </Highlighter>
</h2>`}
      >
        <div className="text-center py-4">
          <h2 className="text-[28px] font-bold text-[var(--foreground)]">
            We offer{' '}
            <Highlighter 
              highlightColor="hsl(120, 60%, 60%)" 
              trigger="hover"
              className="px-1"
            >
              24/7 security monitoring
            </Highlighter>
          </h2>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Brand Colors"
        description="Use brand colors for consistent styling."
        code={`<Highlighter highlightColor="var(--accent)" trigger="hover">
  Invinsense XDR
</Highlighter>`}
      >
        <div className="text-center py-4">
          <span className="text-[24px] font-bold">
            Experience the power of{' '}
            <Highlighter 
              highlightColor="var(--accent)" 
              trigger="hover"
              className="px-2"
            >
              Invinsense XDR
            </Highlighter>
          </span>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Manual Control"
        description="Programmatically trigger the animation via ref."
        code={`const ref = useRef(null);

<Highlighter ref={ref} trigger="manual">
  Controlled highlight
</Highlighter>
<Button onClick={() => ref.current?.animate()}>
  Animate
</Button>`}
      >
        <div className="text-center space-y-4 py-4">
          <span className="text-[24px] font-bold">
            <Highlighter 
              ref={manualRef}
              trigger="manual"
              highlightColor="hsl(45, 100%, 60%)"
              className="px-1"
            >
              Programmatic control
            </Highlighter>
          </span>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => manualRef.current?.animate()}>
              Animate
            </Button>
            <Button variant="outline" size="sm" onClick={() => manualRef.current?.reset()}>
              Reset
            </Button>
          </div>
        </div>
      </PlaygroundSection>

      <div className="flex justify-center pt-4">
        <Button onClick={resetAnimation}>
          <ArrowClockwise style={{ width: 16, height: 16 }} /> Reset All Animations
        </Button>
      </div>

    </ComponentPage>
  );
}
