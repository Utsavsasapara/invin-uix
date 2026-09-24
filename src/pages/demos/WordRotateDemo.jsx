import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { WordRotate } from 'invin-uix/ui/word-rotate';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

// Custom animation configs for advanced users
const customBounceConfig = {
  initial: { opacity: 0, y: -50, scale: 0.5 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.5 },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

const customRotate3DConfig = {
  initial: { opacity: 0, rotateX: -90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: 90 },
  transition: { duration: 0.5, ease: 'easeInOut' }
};

const customSlideScaleConfig = {
  initial: { opacity: 0, x: -100, scale: 0.8 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 100, scale: 0.8 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

export default function WordRotateDemo() {
  const [key, setKey] = useState(0);

  return (
    <ComponentPage
      name="Word Rotate"
      description="A word cycling animation that rotates through an array of words with smooth transitions. Choose from built-in animation variants or create custom animations."
      importCode={`import { WordRotate } from 'invin-uix/ui/word-rotate';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Word Rotate Playground"
        description="Experiment with different word sets, timing, and animation variants."
        controls={[
          { name: 'duration', label: 'Duration (ms)', type: 'number', default: 2500 },
          { name: 'variant', label: 'Variant', type: 'select', default: 'slide-up', options: [
            { value: 'slide-up', label: 'Slide Up' },
            { value: 'slide-down', label: 'Slide Down' },
            { value: 'fade', label: 'Fade' },
            { value: 'blur', label: 'Blur' },
            { value: 'scale', label: 'Scale' },
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

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'words', type: 'string[]', required: true, default: '-', description: 'Array of words to cycle through' },
          { name: 'duration', type: 'number', default: '2500', description: 'Time each word is displayed (milliseconds)' },
          { name: 'variant', type: "'slide-up' | 'slide-down' | 'fade' | 'blur' | 'scale'", default: "'slide-up'", description: 'Animation variant preset' },
          { name: 'animationConfig', type: 'WordRotateAnimationConfig', default: '-', description: 'Custom animation config with initial, animate, exit, and transition properties. Overrides variant when provided.' },
          { name: 'className', type: 'string', default: '-', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Variant Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Animation Variants</h3>
        <p className="text-[var(--muted-foreground)]">
          Five built-in animation presets for common use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">slide-up</Badge>
            <WordRotate
              words={['Slide', 'Up', 'Effect']}
              variant="slide-up"
              duration={2000}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">slide-down</Badge>
            <WordRotate
              words={['Slide', 'Down', 'Effect']}
              variant="slide-down"
              duration={2000}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">fade</Badge>
            <WordRotate
              words={['Fade', 'In', 'Out']}
              variant="fade"
              duration={2000}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">blur</Badge>
            <WordRotate
              words={['Blur', 'Focus', 'Sharp']}
              variant="blur"
              duration={2000}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">scale</Badge>
            <WordRotate
              words={['Scale', 'Zoom', 'Grow']}
              variant="scale"
              duration={2000}
              className="text-[24px] font-bold"
            />
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Custom Animation Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Custom Animations (animationConfig)</h3>
        <p className="text-[var(--muted-foreground)]">
          For advanced users who want full control over animations. Use <code className="bg-[var(--muted)] px-1 rounded">animationConfig</code> to define custom initial, animate, exit, and transition properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Custom: Bounce</Badge>
            <WordRotate
              words={['Bouncy', 'Spring', 'Elastic']}
              animationConfig={customBounceConfig}
              duration={2000}
              className="text-[24px] font-bold text-[var(--accent)]"
            />
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Custom: 3D Rotate</Badge>
            <div style={{ perspective: '1000px' }}>
              <WordRotate
                words={['Rotate', 'Flip', 'Turn']}
                animationConfig={customRotate3DConfig}
                duration={2000}
                className="text-[24px] font-bold text-[var(--accent)]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardContent className="pt-4 space-y-3 text-center min-h-[120px] flex flex-col justify-center">
            <Badge variant="secondary">Custom: Slide + Scale</Badge>
            <WordRotate
              words={['Slide', 'Scale', 'Combo']}
              animationConfig={customSlideScaleConfig}
              duration={2000}
              className="text-[24px] font-bold text-[var(--accent)]"
            />
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* Code Example for Custom Config */}
      <PlaygroundSection
        title="Custom Animation Config"
        description="Define your own animation with full control over Framer Motion properties."
        code={`// Define custom animation config
const customBounceConfig = {
  initial: { opacity: 0, y: -50, scale: 0.5 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.5 },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

<WordRotate 
  words={['Custom', 'Animation', 'Effect']}
  animationConfig={customBounceConfig}
  duration={2000}
/>`}
      >
        <div className="text-center py-6">
          <span className="text-[28px] font-bold text-[var(--foreground)]">
            Create{' '}
            <WordRotate
              words={['unique', 'stunning', 'custom']}
              animationConfig={customBounceConfig}
              className="text-[var(--accent)]"
              duration={2000}
            />
            {' '}animations
          </span>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Use Cases */}
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
              duration={2500}
            />
          </h1>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Status Indicator"
        description="Cycling through system status messages with fade variant."
        code={`<WordRotate 
  words={['Scanning...', 'Analyzing...', 'Monitoring...']}
  variant="fade"
  duration={1500}
/>`}
      >
        <Card>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[var(--ok)] animate-pulse" />
            <WordRotate
              words={['Scanning network...', 'Analyzing traffic...', 'Monitoring endpoints...']}
              variant="fade"
              duration={1500}
              className="text-[var(--muted-foreground)]"
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Feature Highlights"
        description="Showcasing product features dynamically with blur variant."
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
              duration={2000}
            />
          </span>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
