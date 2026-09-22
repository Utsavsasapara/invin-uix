import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { TextAnimate } from 'invin-uix/ui/text-animate';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function TextAnimateDemo() {
  const [key, setKey] = useState(0);
  const [animationKeys, setAnimationKeys] = useState({
    fadeIn: 0,
    blurIn: 0,
    blurInUp: 0,
    slideUp: 0,
    slideLeft: 0,
    scaleUp: 0,
  });

  const resetAnimation = () => setKey(prev => prev + 1);
  const resetSingleAnimation = (name) => {
    setAnimationKeys(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  return (
    <ComponentPage
      name="Text Animate"
      description="A text animation component that animates text using a variety of different animations. Split by text, word, character, or line. Supports 10 animation presets with viewport detection."
      importCode={`import { TextAnimate } from 'invin-uix/ui/text-animate';`}
      badges={[{ label: 'Animation', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Text Animation Playground"
        description="Experiment with different animation presets and split modes."
        controls={[
          {
            name: 'animation',
            label: 'Animation',
            type: 'select',
            default: 'fadeIn',
            options: [
              { value: 'fadeIn', label: 'Fade In' },
              { value: 'blurIn', label: 'Blur In' },
              { value: 'blurInUp', label: 'Blur In Up' },
              { value: 'blurInDown', label: 'Blur In Down' },
              { value: 'slideUp', label: 'Slide Up' },
              { value: 'slideDown', label: 'Slide Down' },
              { value: 'slideLeft', label: 'Slide Left' },
              { value: 'slideRight', label: 'Slide Right' },
              { value: 'scaleUp', label: 'Scale Up' },
              { value: 'scaleDown', label: 'Scale Down' },
            ]
          },
          {
            name: 'by',
            label: 'Split By',
            type: 'select',
            default: 'word',
            options: [
              { value: 'text', label: 'Text (whole)' },
              { value: 'word', label: 'Word' },
              { value: 'character', label: 'Character' },
              { value: 'line', label: 'Line' },
            ]
          },
          {
            name: 'as',
            label: 'Element',
            type: 'select',
            default: 'p',
            options: [
              { value: 'p', label: '<p>' },
              { value: 'h1', label: '<h1>' },
              { value: 'h2', label: '<h2>' },
              { value: 'h3', label: '<h3>' },
              { value: 'span', label: '<span>' },
              { value: 'div', label: '<div>' },
            ]
          },
          { name: 'once', label: 'Animate Once', type: 'boolean', default: true },
          { name: 'startOnView', label: 'Start on View', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full">
            <TextAnimate
              key={key}
              animation={props.animation}
              by={props.by}
              as={props.as}
              once={props.once}
              startOnView={props.startOnView}
              className="text-[24px] font-semibold text-[var(--foreground)]"
            >
              Security Operations Center
            </TextAnimate>
            <Button variant="outline" size="sm" onClick={resetAnimation}>
              <ArrowClockwise style={{ width: 14, height: 14 }} /> Replay Animation
            </Button>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text content to animate' },
          { name: 'animation', type: 'AnimationVariant', default: "'fadeIn'", description: 'Animation preset: fadeIn, blurIn, blurInUp, blurInDown, slideUp, slideDown, slideLeft, slideRight, scaleUp, scaleDown' },
          { name: 'by', type: "'text' | 'word' | 'character' | 'line'", default: "'word'", description: 'How to split the text for staggered animation' },
          { name: 'as', type: 'ElementType', default: "'p'", description: 'HTML element to render: p, h1, h2, h3, h4, h5, h6, span, div, article, section, li' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (seconds)' },
          { name: 'duration', type: 'number', default: '0.3', description: 'Duration of the animation (seconds)' },
          { name: 'startOnView', type: 'boolean', default: 'true', description: 'Start animation when element enters viewport' },
          { name: 'once', type: 'boolean', default: 'false', description: 'Animate only once (won\'t replay on re-enter)' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for the container element' },
          { name: 'segmentClassName', type: 'string', default: '—', description: 'CSS classes for each animated segment' },
          { name: 'variants', type: 'Variants', default: '—', description: 'Custom motion variants (overrides animation preset)' },
          { name: 'accessible', type: 'boolean', default: 'true', description: 'Enable screen reader support with sr-only text' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Animation Presets ───────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Animation Presets</h3>
        <p className="text-[var(--muted-foreground)]">
          10 built-in animation variants. Click "Replay" to see each animation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fade In */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">fadeIn</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('fadeIn')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.fadeIn} animation="fadeIn" by="word" startOnView={false} className="text-[18px] font-medium">
              Fade in with upward motion
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Blur In */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">blurIn</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('blurIn')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.blurIn} animation="blurIn" by="word" startOnView={false} className="text-[18px] font-medium">
              Blur in from fuzzy to sharp
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Blur In Up */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">blurInUp</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('blurInUp')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.blurInUp} animation="blurInUp" by="word" startOnView={false} className="text-[18px] font-medium">
              Blur in with upward motion
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Slide Up */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">slideUp</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('slideUp')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.slideUp} animation="slideUp" by="word" startOnView={false} className="text-[18px] font-medium">
              Slide up from below
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Slide Left */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">slideLeft</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('slideLeft')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.slideLeft} animation="slideLeft" by="word" startOnView={false} className="text-[18px] font-medium">
              Slide in from the right
            </TextAnimate>
          </CardContent>
        </Card>

        {/* Scale Up */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">scaleUp</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetSingleAnimation('scaleUp')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TextAnimate key={animationKeys.scaleUp} animation="scaleUp" by="word" startOnView={false} className="text-[18px] font-medium">
              Scale up with spring bounce
            </TextAnimate>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Split Modes ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Split by Word"
        description="Each word animates separately with staggered timing. Best for titles and headings."
        code={`<TextAnimate animation="blurInUp" by="word">
  Threat Detection Active
</TextAnimate>`}
      >
        <TextAnimate 
          key={`word-${key}`}
          animation="blurInUp" 
          by="word" 
          startOnView={false}
          className="text-[24px] font-bold text-[var(--foreground)]"
        >
          Threat Detection Active
        </TextAnimate>
      </PlaygroundSection>

      <PlaygroundSection
        title="Split by Character"
        description="Each character animates individually. Creates a typewriter-like effect."
        code={`<TextAnimate animation="fadeIn" by="character" duration={1}>
  SECURITY ALERT
</TextAnimate>`}
      >
        <TextAnimate 
          key={`char-${key}`}
          animation="fadeIn" 
          by="character" 
          duration={1}
          startOnView={false}
          className="text-[28px] font-mono font-bold tracking-wider text-[var(--error)]"
        >
          SECURITY ALERT
        </TextAnimate>
      </PlaygroundSection>

      <PlaygroundSection
        title="Split by Line"
        description="Multi-line text where each line animates as a block."
        code={`<TextAnimate animation="slideUp" by="line" as="div">
  {"Line one: System status\\nLine two: All clear\\nLine three: No threats detected"}
</TextAnimate>`}
      >
        <TextAnimate 
          key={`line-${key}`}
          animation="slideUp" 
          by="line"
          as="div"
          startOnView={false}
          className="text-[16px] text-[var(--muted-foreground)] leading-relaxed"
        >
          {"Line one: System status\nLine two: All clear\nLine three: No threats detected"}
        </TextAnimate>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Real-World Examples ─────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Real-World Examples</h3>
      </div>

      <PlaygroundSection
        title="Hero Section"
        description="Large animated headline for landing pages and dashboards."
        code={`<TextAnimate 
  animation="blurInUp" 
  by="word" 
  as="h1"
  className="text-[48px] font-bold"
>
  Welcome to Invinsense
</TextAnimate>`}
      >
        <div className="py-8 text-center">
          <TextAnimate 
            key={`hero-${key}`}
            animation="blurInUp" 
            by="word"
            as="h1"
            startOnView={false}
            className="text-[36px] md:text-[48px] font-bold text-[var(--foreground)] leading-tight"
          >
            Welcome to Invinsense
          </TextAnimate>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="KPI Metric Label"
        description="Animated labels for dashboard metrics and KPI cards."
        code={`<TextAnimate animation="slideUp" by="word" delay={0.2}>
  Active Threats Detected
</TextAnimate>`}
      >
        <Card>
          <CardContent className="py-6 text-center">
            <TextAnimate 
              key={`kpi-label-${key}`}
              animation="slideUp" 
              by="word"
              delay={0.2}
              startOnView={false}
              className="text-[14px] text-[var(--muted-foreground)] uppercase tracking-wider"
            >
              Active Threats Detected
            </TextAnimate>
            <p className="text-[48px] font-bold text-[var(--error)] mt-2">247</p>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Message"
        description="Animated status updates and notifications."
        code={`<TextAnimate animation="scaleUp" by="word">
  ✓ All systems operational
</TextAnimate>`}
      >
        <div className="flex items-center justify-center py-4">
          <TextAnimate 
            key={`status-${key}`}
            animation="scaleUp" 
            by="word"
            startOnView={false}
            className="text-[18px] font-medium text-[var(--ok)]"
          >
            ✓ All systems operational
          </TextAnimate>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Accessibility ────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Accessibility</h3>
        <p className="text-[var(--muted-foreground)]">
          The component includes built-in accessibility features:
        </p>
        <ul className="list-disc list-inside text-[var(--muted-foreground)] space-y-1">
          <li>Screen reader text via <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">aria-label</code></li>
          <li>Hidden visual segments for assistive tech via <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">aria-hidden</code></li>
          <li>Full text in <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">sr-only</code> class for consistent reading</li>
          <li>Set <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">accessible={false}</code> to disable</li>
        </ul>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={resetAnimation}>
          <ArrowClockwise style={{ width: 16, height: 16 }} /> Replay All Animations
        </Button>
      </div>

    </ComponentPage>
  );
}
