import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { TypingAnimation } from 'invin-uix/ui/typing-animation';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function TypingAnimationDemo() {
  const [key, setKey] = useState(0);
  const [demoKeys, setDemoKeys] = useState({
    cursor1: 0,
    cursor2: 0,
    cursor3: 0,
    speed1: 0,
    speed2: 0,
  });

  const resetAnimation = () => setKey(prev => prev + 1);
  const resetDemo = (name) => {
    setDemoKeys(prev => ({ ...prev, [name]: prev[name] + 1 }));
  };

  return (
    <ComponentPage
      name="Typing Animation"
      description="A typewriter effect that types characters one by one. Supports multiple words with automatic cycling, customizable cursor styles, speed controls, and viewport detection."
      importCode={`import { TypingAnimation } from 'invin-uix/ui/typing-animation';`}
      badges={[{ label: 'Animation', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Typing Animation Playground"
        description="Experiment with different cursor styles, speeds, and element types."
        controls={[
          {
            name: 'cursorStyle',
            label: 'Cursor Style',
            type: 'select',
            default: 'line',
            options: [
              { value: 'line', label: 'Line |' },
              { value: 'block', label: 'Block ▌' },
              { value: 'underscore', label: 'Underscore _' },
            ]
          },
          {
            name: 'as',
            label: 'Element',
            type: 'select',
            default: 'span',
            options: [
              { value: 'span', label: '<span>' },
              { value: 'p', label: '<p>' },
              { value: 'h1', label: '<h1>' },
              { value: 'h2', label: '<h2>' },
              { value: 'div', label: '<div>' },
            ]
          },
          { name: 'showCursor', label: 'Show Cursor', type: 'boolean', default: true },
          { name: 'blinkCursor', label: 'Blink Cursor', type: 'boolean', default: true },
          { name: 'loop', label: 'Loop', type: 'boolean', default: false },
          { name: 'startOnView', label: 'Start on View', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full">
            <TypingAnimation
              key={key}
              cursorStyle={props.cursorStyle}
              as={props.as}
              showCursor={props.showCursor}
              blinkCursor={props.blinkCursor}
              loop={props.loop}
              startOnView={props.startOnView}
              className="text-[24px] font-semibold text-[var(--foreground)]"
            >
              Security Operations Center
            </TypingAnimation>
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
          { name: 'children', type: 'string', default: '—', description: 'Text to type (use this or words)' },
          { name: 'words', type: 'string[]', default: '—', description: 'Array of words to cycle through' },
          { name: 'duration', type: 'number', default: '100', description: 'Typing speed (ms per character)' },
          { name: 'typeSpeed', type: 'number', default: '—', description: 'Override typing speed' },
          { name: 'deleteSpeed', type: 'number', default: '—', description: 'Delete speed (default: half of typeSpeed)' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before starting (ms)' },
          { name: 'pauseDelay', type: 'number', default: '1000', description: 'Pause after typing word (ms)' },
          { name: 'loop', type: 'boolean', default: 'false', description: 'Loop continuously' },
          { name: 'as', type: 'ElementType', default: "'span'", description: 'HTML element to render' },
          { name: 'startOnView', type: 'boolean', default: 'true', description: 'Start when element enters viewport' },
          { name: 'showCursor', type: 'boolean', default: 'true', description: 'Show cursor' },
          { name: 'blinkCursor', type: 'boolean', default: 'true', description: 'Enable cursor blinking' },
          { name: 'cursorStyle', type: "'line' | 'block' | 'underscore'", default: "'line'", description: 'Cursor character style' },
          { name: 'cursorColor', type: 'string', default: '—', description: 'Cursor color (CSS value)' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for container' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Cursor Styles ───────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Cursor Styles</h3>
        <p className="text-[var(--muted-foreground)]">
          Three cursor styles available: line, block, and underscore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">line</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetDemo('cursor1')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TypingAnimation 
              key={demoKeys.cursor1} 
              cursorStyle="line" 
              startOnView={false}
              className="text-[18px] font-medium"
            >
              Line cursor
            </TypingAnimation>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">block</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetDemo('cursor2')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TypingAnimation 
              key={demoKeys.cursor2} 
              cursorStyle="block" 
              startOnView={false}
              className="text-[18px] font-medium"
            >
              Block cursor
            </TypingAnimation>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">underscore</Badge>
              <Button variant="ghost" size="icon-sm" onClick={() => resetDemo('cursor3')}>
                <ArrowClockwise style={{ width: 14, height: 14 }} />
              </Button>
            </div>
            <TypingAnimation 
              key={demoKeys.cursor3} 
              cursorStyle="underscore" 
              startOnView={false}
              className="text-[18px] font-medium"
            >
              Underscore
            </TypingAnimation>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Multiple Words ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Multiple Words"
        description="Cycle through an array of words with automatic typing and deleting."
        code={`<TypingAnimation 
  words={['Developer', 'Designer', 'Creator']}
  loop
/>`}
      >
        <div className="text-[24px]">
          I'm a{' '}
          <TypingAnimation
            key={`words-${key}`}
            words={['Security Analyst', 'SOC Engineer', 'Threat Hunter']}
            loop
            startOnView={false}
            className="text-[var(--accent)] font-semibold"
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Speed Controls"
        description="Control typing speed with duration, typeSpeed, and deleteSpeed props."
        code={`<TypingAnimation duration={50}>Fast typing</TypingAnimation>
<TypingAnimation duration={200}>Slow typing</TypingAnimation>`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant="outline">Fast (50ms)</Badge>
            <TypingAnimation
              key={demoKeys.speed1}
              duration={50}
              startOnView={false}
              className="text-[18px]"
            >
              Quick response time
            </TypingAnimation>
            <Button variant="ghost" size="icon-sm" onClick={() => resetDemo('speed1')}>
              <ArrowClockwise style={{ width: 14, height: 14 }} />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Slow (150ms)</Badge>
            <TypingAnimation
              key={demoKeys.speed2}
              duration={150}
              startOnView={false}
              className="text-[18px]"
            >
              Dramatic reveal
            </TypingAnimation>
            <Button variant="ghost" size="icon-sm" onClick={() => resetDemo('speed2')}>
              <ArrowClockwise style={{ width: 14, height: 14 }} />
            </Button>
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Real-World Examples ─────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Real-World Examples</h3>
      </div>

      <PlaygroundSection
        title="Hero Headline"
        description="Large animated headline for landing pages."
        code={`<TypingAnimation 
  as="h1" 
  className="text-[48px] font-bold"
>
  Welcome to Invinsense
</TypingAnimation>`}
      >
        <div className="py-6 text-center">
          <TypingAnimation
            key={`hero-${key}`}
            as="h1"
            startOnView={false}
            duration={80}
            className="text-[36px] md:text-[48px] font-bold text-[var(--foreground)]"
          >
            Welcome to Invinsense
          </TypingAnimation>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Command Prompt"
        description="Terminal-style typing effect with block cursor."
        code={`<div className="font-mono bg-black p-4 rounded">
  <span className="text-gray-500">$ </span>
  <TypingAnimation cursorStyle="block" duration={60}>
    npm install invin-uix
  </TypingAnimation>
</div>`}
      >
        <div className="font-mono bg-[#1a1a1a] text-[#00ff00] p-4 rounded-lg">
          <span className="text-[#666]">$ </span>
          <TypingAnimation
            key={`cmd-${key}`}
            cursorStyle="block"
            duration={60}
            startOnView={false}
            cursorColor="#00ff00"
          >
            npm install invin-uix
          </TypingAnimation>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Messages"
        description="Cycling status messages for dashboards."
        code={`<TypingAnimation 
  words={['Scanning...', 'Analyzing...', 'Complete!']}
  className="text-[var(--ok)]"
  loop
/>`}
      >
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-[14px] text-[var(--muted-foreground)] mb-2">System Status</p>
            <TypingAnimation
              key={`status-${key}`}
              words={['Scanning network...', 'Analyzing threats...', 'System secure ✓']}
              startOnView={false}
              loop
              pauseDelay={1500}
              className="text-[20px] font-medium text-[var(--ok)]"
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Search Placeholder"
        description="Animated placeholder suggestions."
        code={`<TypingAnimation 
  words={['Search assets...', 'Search threats...', 'Search logs...']}
  loop
  className="text-muted"
/>`}
      >
        <div className="relative">
          <div className="flex items-center border border-[var(--border)] rounded-lg px-4 py-3 bg-[var(--background)]">
            <span className="text-[var(--muted-foreground)] mr-2">🔍</span>
            <TypingAnimation
              key={`search-${key}`}
              words={['Search assets...', 'Search threats...', 'Search vulnerabilities...', 'Search logs...']}
              startOnView={false}
              loop
              duration={70}
              className="text-[var(--muted-foreground)]"
            />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Accessibility ────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Accessibility</h3>
        <ul className="list-disc list-inside text-[var(--muted-foreground)] space-y-1">
          <li>Cursor is marked with <code className="text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">aria-hidden="true"</code></li>
          <li>Text content is visible and accessible as it types</li>
          <li>Consider providing static alternatives for critical content</li>
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
