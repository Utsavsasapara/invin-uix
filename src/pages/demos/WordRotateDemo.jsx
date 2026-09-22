import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { WordRotate } from 'invin-uix/ui/word-rotate';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function WordRotateDemo() {
  const [key, setKey] = useState(0);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Word Rotate"
      description="A word cycling animation that rotates through an array of words with smooth transitions. Supports slide, fade, and blur variants. Perfect for dynamic headlines and taglines."
      importCode={`import { WordRotate } from 'invin-uix/ui/word-rotate';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Word Rotate Playground"
        description="Experiment with different word sets and timing options."
        controls={[
          { name: 'duration', label: 'Duration (s)', type: 'number', default: 2.5 },
          { name: 'variant', label: 'Variant', type: 'select', default: 'default', options: [
            { value: 'default', label: 'Default (Slide Up)' },
            { value: 'slide-down', label: 'Slide Down' },
            { value: 'fade', label: 'Fade' },
            { value: 'blur', label: 'Blur' },
          ]},
        ]}
      >
        {(props) => (
          <div className="text-center py-4">
            <span className="text-[32px] font-semibold text-[var(--foreground)]">
              We provide{' '}
              <WordRotate
                key={`${key}-${props.variant}`}
                words={['Security', 'Protection', 'Monitoring', 'Intelligence']}
                duration={props.duration}
                variant={props.variant}
                className="text-[var(--accent)]"
              />
            </span>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'words', type: 'string[]', required: true, default: '—', description: 'Array of words to cycle through' },
          { name: 'duration', type: 'number', default: '2.5', description: 'Time each word is displayed (seconds)' },
          { name: 'variant', type: "'default' | 'slide-up' | 'slide-down' | 'fade' | 'blur'", default: "'default'", description: 'Animation transition style' },
          { name: 'pauseOnHover', type: 'boolean', default: 'false', description: 'Pause rotation when hovered' },
          { name: 'animatePresenceMode', type: "'sync' | 'wait' | 'popLayout'", default: "'wait'", description: 'AnimatePresence mode for transition' },
          { name: 'initial', type: 'TargetAndTransition', default: '—', description: 'Custom initial animation state (overrides variant)' },
          { name: 'animate', type: 'TargetAndTransition', default: '—', description: 'Custom animate state (overrides variant)' },
          { name: 'exit', type: 'TargetAndTransition', default: '—', description: 'Custom exit animation state (overrides variant)' },
          { name: 'transition', type: 'Transition', default: '—', description: 'Custom transition configuration' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Variant Examples ──────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Animation Variants</h3>
        <p className="text-[var(--muted-foreground)]">
          Four built-in transition styles for different effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Default (Slide Up)</Badge>
            <WordRotate
              words={['Slide', 'Up', 'Effect']}
              variant="default"
              duration={2}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Slide Down</Badge>
            <WordRotate
              words={['Slide', 'Down', 'Effect']}
              variant="slide-down"
              duration={2}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Fade</Badge>
            <WordRotate
              words={['Fade', 'In', 'Out']}
              variant="fade"
              duration={2}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Blur</Badge>
            <WordRotate
              words={['Blur', 'Focus', 'Sharp']}
              variant="blur"
              duration={2}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Hero Headline"
        description="Dynamic headline for landing pages."
        code={`<h1>
  Protect your business from{' '}
  <WordRotate 
    words={['cyber attacks', 'data breaches', 'malware', 'ransomware']}
    className="text-accent"
  />
</h1>`}
      >
        <div className="text-center py-6">
          <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--foreground)]">
            Protect your business from{' '}
            <WordRotate
              words={['cyber attacks', 'data breaches', 'malware', 'ransomware']}
              className="text-[var(--accent)]"
              duration={2.5}
            />
          </h1>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Indicator"
        description="Cycling through system status messages with fade effect."
        code={`<WordRotate 
  words={['Scanning...', 'Analyzing...', 'Monitoring...']}
  variant="fade"
  duration={1.5}
/>`}
      >
        <Card>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--ok)] animate-pulse" />
            <WordRotate
              words={['Scanning network...', 'Analyzing traffic...', 'Monitoring endpoints...']}
              variant="fade"
              duration={1.5}
              className="text-[var(--muted-foreground)]"
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature Highlights"
        description="Showcasing product features dynamically with blur effect."
        code={`<span>
  Invinsense offers{' '}
  <WordRotate 
    words={['Real-time Monitoring', 'AI-Powered Detection', 'Automated Response']} 
    variant="blur"
  />
</span>`}
      >
        <div className="text-center py-4">
          <span className="text-[20px] text-[var(--foreground)]">
            Invinsense offers{' '}
            <WordRotate
              words={['Real-time Monitoring', 'AI-Powered Detection', 'Automated Response', '24/7 Support']}
              variant="blur"
              className="font-semibold text-[var(--accent)]"
              duration={2}
            />
          </span>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
