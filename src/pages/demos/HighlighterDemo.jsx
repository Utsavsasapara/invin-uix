import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Highlighter } from 'invin-uix/ui/highlighter';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function HighlighterDemo() {
  const [key, setKey] = useState(0);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Highlighter"
      description="A hand-drawn style text annotation component using rough-notation. Supports multiple annotation types including highlight, underline, box, circle, strike-through, and more. Perfect for drawing attention to key content with a natural, sketchy feel."
      importCode={`import { Highlighter } from 'invin-uix/ui/highlighter';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'rough-notation', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Highlighter Playground"
        description="Customize the annotation effect with different types, colors, and settings."
        controls={[
          { name: 'action', label: 'Annotation Type', type: 'select', default: 'highlight', options: [
            { value: 'highlight', label: 'Highlight' },
            { value: 'underline', label: 'Underline' },
            { value: 'box', label: 'Box' },
            { value: 'circle', label: 'Circle' },
            { value: 'strike-through', label: 'Strike Through' },
            { value: 'crossed-off', label: 'Crossed Off' },
            { value: 'bracket', label: 'Bracket' },
          ]},
          { name: 'color', label: 'Color', type: 'text', default: '#ffd54f' },
          { name: 'strokeWidth', label: 'Stroke Width', type: 'select', default: '2', options: [
            { value: '1', label: '1px' },
            { value: '2', label: '2px' },
            { value: '3', label: '3px' },
            { value: '4', label: '4px' },
          ]},
          { name: 'animationDuration', label: 'Duration (ms)', type: 'select', default: '600', options: [
            { value: '300', label: '300ms (Fast)' },
            { value: '600', label: '600ms (Normal)' },
            { value: '1000', label: '1000ms (Slow)' },
            { value: '2000', label: '2000ms (Very Slow)' },
          ]},
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <span className="text-[32px] font-bold text-[var(--foreground)]">
              This is{' '}
              <Highlighter
                key={key + '-' + props.action + '-' + props.color}
                action={props.action}
                color={props.color}
                strokeWidth={Number(props.strokeWidth)}
                animationDuration={Number(props.animationDuration)}
                className="px-1"
              >
                annotated text
              </Highlighter>
              {' '}in a sentence.
            </span>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', required: true, default: '—', description: 'The text content to annotate' },
          { name: 'action', type: "'highlight' | 'underline' | 'box' | 'circle' | 'strike-through' | 'crossed-off' | 'bracket'", default: "'highlight'", description: 'Type of annotation effect' },
          { name: 'color', type: 'string', default: "'#ffd54f'", description: 'Color of the annotation' },
          { name: 'strokeWidth', type: 'number', default: '1.5', description: 'Width of the annotation stroke' },
          { name: 'animationDuration', type: 'number', default: '600', description: 'Duration of animation in milliseconds' },
          { name: 'iterations', type: 'number', default: '2', description: 'Number of iterations for rough drawing effect' },
          { name: 'padding', type: 'number', default: '2', description: 'Padding around the element' },
          { name: 'multiline', type: 'boolean', default: 'true', description: 'Whether to support multiline text' },
          { name: 'inView', type: 'boolean', default: 'false', description: 'Trigger animation only when element is in view' },
          { name: 'brackets', type: "BracketSide | BracketSide[]", default: "['left', 'right']", description: 'Which sides to show brackets on (only for bracket action)' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* All Annotation Types */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Annotation Types</h3>
        <p className="text-[var(--muted-foreground)]">
          Seven different hand-drawn annotation styles to choose from.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Highlight</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'highlight-' + key} action="highlight" color="#ffd54f">
                Highlighted text
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Underline</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'underline-' + key} action="underline" color="#4fc3f7">
                Underlined text
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Box</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'box-' + key} action="box" color="#81c784">
                Boxed text
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Circle</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'circle-' + key} action="circle" color="#ff8a65" padding={8}>
                Circled
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Strike Through</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'strike-' + key} action="strike-through" color="#ef5350">
                Strikethrough
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Crossed Off</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'crossed-' + key} action="crossed-off" color="#ba68c8">
                Crossed off
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Bracket (Both Sides)</Badge>
            <span className="text-[20px] font-semibold">
              <Highlighter key={'bracket-' + key} action="bracket" color="#7986cb" strokeWidth={2}>
                Bracketed text
              </Highlighter>
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Bracket Sides */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Bracket Positioning</h3>
        <p className="text-[var(--muted-foreground)]">
          The bracket annotation supports configurable sides: left, right, top, bottom, or combinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Left Only</Badge>
            <span className="text-[18px] font-semibold">
              <Highlighter key={'bracket-left-' + key} action="bracket" brackets="left" color="#7986cb" strokeWidth={2}>
                Left bracket
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Right Only</Badge>
            <span className="text-[18px] font-semibold">
              <Highlighter key={'bracket-right-' + key} action="bracket" brackets="right" color="#7986cb" strokeWidth={2}>
                Right bracket
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">Top & Bottom</Badge>
            <span className="text-[18px] font-semibold">
              <Highlighter key={'bracket-tb-' + key} action="bracket" brackets={['top', 'bottom']} color="#7986cb" strokeWidth={2}>
                Horizontal
              </Highlighter>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
            <Badge variant="secondary">All Sides</Badge>
            <span className="text-[18px] font-semibold">
              <Highlighter key={'bracket-all-' + key} action="bracket" brackets={['left', 'right', 'top', 'bottom']} color="#7986cb" strokeWidth={2}>
                All sides
              </Highlighter>
            </span>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* In View Trigger */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">In View Trigger</h3>
        <p className="text-[var(--muted-foreground)]">
          Animate annotations only when the element scrolls into view.
        </p>
      </div>

      <Card>
        <CardContent className="pt-4 space-y-3 text-center min-h-[100px] flex flex-col justify-center">
          <span className="text-[20px] font-semibold">
            <Highlighter key={'inview-' + key} action="highlight" color="#ffd54f" inView>
              This annotation triggers when scrolled into view
            </Highlighter>
          </span>
        </CardContent>
      </Card>

      <Separator variant="bold" />

      {/* Use Cases */}
      <PlaygroundSection
        title="Important Notice"
        description="Draw attention to critical information with a highlight."
        code={`<p>
  Please read our{' '}
  <Highlighter action="underline" color="#ef5350">
    terms and conditions
  </Highlighter>
  {' '}before proceeding.
</p>`}
      >
        <div className="text-center py-4">
          <p className="text-[20px] text-[var(--foreground)]">
            Please read our{' '}
            <Highlighter 
              key={'terms-' + key}
              action="underline"
              color="#ef5350"
              strokeWidth={2}
            >
              terms and conditions
            </Highlighter>
            {' '}before proceeding.
          </p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature Callout"
        description="Circle key features to make them stand out."
        code={`<Highlighter action="circle" color="#4fc3f7" padding={10}>
  24/7 monitoring
</Highlighter>`}
      >
        <div className="text-center py-4">
          <h2 className="text-[28px] font-bold text-[var(--foreground)]">
            We offer{' '}
            <Highlighter 
              key={'feature-' + key}
              action="circle"
              color="#4fc3f7"
              padding={10}
              strokeWidth={2}
            >
              24/7 monitoring
            </Highlighter>
          </h2>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Completed Items"
        description="Use strike-through or crossed-off for completed tasks."
        code={`<ul>
  <li><Highlighter action="strike-through">Setup project</Highlighter></li>
  <li><Highlighter action="crossed-off">Write tests</Highlighter></li>
  <li>Deploy to production</li>
</ul>`}
      >
        <div className="py-4">
          <ul className="text-[18px] space-y-2 text-left max-w-xs mx-auto">
            <li className="flex items-center gap-2">
              <span className="text-[var(--muted-foreground)]">✓</span>
              <Highlighter key={'task1-' + key} action="strike-through" color="#81c784">
                Setup project
              </Highlighter>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[var(--muted-foreground)]">✓</span>
              <Highlighter key={'task2-' + key} action="crossed-off" color="#81c784">
                Write tests
              </Highlighter>
            </li>
            <li className="flex items-center gap-2 text-[var(--foreground)]">
              <span className="text-[var(--muted-foreground)]">○</span>
              Deploy to production
            </li>
          </ul>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Brand Colors"
        description="Use brand accent colors for consistent styling."
        code={`<Highlighter action="box" color="var(--accent)">
  Invinsense XDR
</Highlighter>`}
      >
        <div className="text-center py-4">
          <span className="text-[24px] font-bold">
            Experience the power of{' '}
            <Highlighter 
              key={'brand-' + key}
              action="box"
              color="var(--accent)"
              strokeWidth={2}
            >
              Invinsense XDR
            </Highlighter>
          </span>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Custom Styling"
        description="Adjust stroke width and animation duration for different effects."
        code={`<Highlighter 
  action="underline" 
  color="#ffd54f"
  strokeWidth={4}
  animationDuration={1500}
>
  Thick, slow underline
</Highlighter>`}
      >
        <div className="text-center py-4">
          <span className="text-[24px] font-bold">
            <Highlighter 
              key={'custom-' + key}
              action="underline"
              color="#ffd54f"
              strokeWidth={4}
              animationDuration={1500}
            >
              Thick, slow underline
            </Highlighter>
          </span>
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