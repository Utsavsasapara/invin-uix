import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Text3DFlip } from 'invin-uix/ui/text-3d-flip';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function Text3DFlipDemo() {
  return (
    <ComponentPage
      name="Text 3D Flip"
      description="A text animation that flips each letter in 3D with a staggered animation on hover. Creates a dramatic kinetic typography effect perfect for headlines and navigation."
      importCode={`import { Text3DFlip } from 'invin-uix/ui/text-3d-flip';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }, { label: '3D', variant: 'outline' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Text 3D Flip Playground"
        description="Customize the 3D flip effect with different directions and stagger options."
        controls={[
          { name: 'rotateDirection', label: 'Rotation Direction', type: 'select', default: 'top', options: [
            { value: 'top', label: 'Top' },
            { value: 'right', label: 'Right' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
          ]},
          { name: 'staggerFrom', label: 'Stagger From', type: 'select', default: 'first', options: [
            { value: 'first', label: 'First' },
            { value: 'last', label: 'Last' },
            { value: 'center', label: 'Center' },
            { value: 'random', label: 'Random' },
          ]},
          { name: 'staggerDuration', label: 'Stagger (s)', type: 'number', default: 0.05 },
        ]}
      >
        {(props) => (
          <div className="text-center py-8">
            <Text3DFlip
              rotateDirection={props.rotateDirection}
              staggerFrom={props.staggerFrom}
              staggerDuration={props.staggerDuration}
              className="text-[48px] font-bold text-[var(--foreground)]"
            >
              HOVER ME
            </Text3DFlip>
            <p className="text-sm text-[var(--muted-foreground)] mt-4">Hover over the text to see the 3D flip effect</p>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'React.ReactNode', required: true, default: '—', description: 'Text content to animate' },
          { name: 'as', type: 'ElementType', default: "'p'", description: 'HTML element to render as' },
          { name: 'rotateDirection', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Direction of the 3D rotation' },
          { name: 'staggerDuration', type: 'number', default: '0.05', description: 'Delay between each character (seconds)' },
          { name: 'staggerFrom', type: "'first' | 'last' | 'center' | 'random' | number", default: "'first'", description: 'Where to start the stagger effect' },
          { name: 'transition', type: 'ValueAnimationTransition', default: "{ type: 'spring', damping: 30, stiffness: 300 }", description: 'Motion transition config' },
          { name: 'className', type: 'string', default: '—', description: 'Container class name' },
          { name: 'textClassName', type: 'string', default: '—', description: 'Class name for front text face' },
          { name: 'flipTextClassName', type: 'string', default: '—', description: 'Class name for flipped text face' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Rotation Directions ─────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Rotation Directions</h3>
        <p className="text-[var(--muted-foreground)]">
          Four rotation directions for different 3D flip effects. Hover over each to compare.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="secondary" className="mb-3">Top</Badge>
            <Text3DFlip rotateDirection="top" className="text-[24px] font-bold">
              FLIP
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="secondary" className="mb-3">Right</Badge>
            <Text3DFlip rotateDirection="right" className="text-[24px] font-bold">
              FLIP
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="secondary" className="mb-3">Bottom</Badge>
            <Text3DFlip rotateDirection="bottom" className="text-[24px] font-bold">
              FLIP
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="secondary" className="mb-3">Left</Badge>
            <Text3DFlip rotateDirection="left" className="text-[24px] font-bold">
              FLIP
            </Text3DFlip>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Stagger From Options ─────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Stagger From Options</h3>
        <p className="text-[var(--muted-foreground)]">
          Control where the stagger animation starts from.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="outline" className="mb-3">First</Badge>
            <Text3DFlip staggerFrom="first" className="text-[20px] font-bold">
              STAGGER
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="outline" className="mb-3">Last</Badge>
            <Text3DFlip staggerFrom="last" className="text-[20px] font-bold">
              STAGGER
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="outline" className="mb-3">Center</Badge>
            <Text3DFlip staggerFrom="center" className="text-[20px] font-bold">
              STAGGER
            </Text3DFlip>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Badge variant="outline" className="mb-3">Random</Badge>
            <Text3DFlip staggerFrom="random" className="text-[20px] font-bold">
              STAGGER
            </Text3DFlip>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Hero Headline"
        description="Create an attention-grabbing hero headline."
        code={`<h1>
  <Text3DFlip className="text-5xl font-bold">
    INVINSENSE
  </Text3DFlip>
</h1>`}
      >
        <div className="text-center py-8 bg-gradient-to-br from-[var(--background)] to-[var(--secondary)] rounded-lg">
          <Text3DFlip className="text-[48px] md:text-[64px] font-bold text-[var(--foreground)]">
            INVINSENSE
          </Text3DFlip>
          <p className="text-[var(--muted-foreground)] mt-2">Hover to flip</p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Accent Color"
        description="Style the flipped face with a different color."
        code={`<Text3DFlip 
  textClassName="text-foreground"
  flipTextClassName="text-accent"
>
  SECURITY
</Text3DFlip>`}
      >
        <div className="text-center py-6">
          <Text3DFlip 
            textClassName="text-[var(--foreground)]"
            flipTextClassName="text-[var(--accent)]"
            className="text-[36px] font-bold"
          >
            SECURITY
          </Text3DFlip>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Hover to see the accent color</p>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Stagger Variations"
        description="Different stagger timings create unique effects."
        code={`<Text3DFlip staggerDuration={0.02}>Fast</Text3DFlip>
<Text3DFlip staggerDuration={0.1}>Slow</Text3DFlip>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-4 text-center">
              <Badge variant="secondary" className="mb-3">Fast (0.02s)</Badge>
              <Text3DFlip staggerDuration={0.02} className="text-[28px] font-bold">
                RAPID FLIP
              </Text3DFlip>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Badge variant="secondary" className="mb-3">Slow (0.1s)</Badge>
              <Text3DFlip staggerDuration={0.1} className="text-[28px] font-bold">
                WAVE FLIP
              </Text3DFlip>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Navigation Links"
        description="Use for interactive navigation elements."
        code={`<nav className="flex gap-6">
  <Text3DFlip>HOME</Text3DFlip>
  <Text3DFlip>PRODUCTS</Text3DFlip>
  <Text3DFlip>CONTACT</Text3DFlip>
</nav>`}
      >
        <nav className="flex gap-8 justify-center py-4">
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            HOME
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            PRODUCTS
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            SOLUTIONS
          </Text3DFlip>
          <Text3DFlip className="text-[18px] font-semibold text-[var(--foreground)]">
            CONTACT
          </Text3DFlip>
        </nav>
      </PlaygroundSection>

      <PlaygroundSection
        title="Multi-Word Text"
        description="Works with multi-word text, preserving spaces between words."
        code={`<Text3DFlip>CYBER SECURITY</Text3DFlip>`}
      >
        <div className="text-center py-6">
          <Text3DFlip className="text-[32px] font-bold text-[var(--foreground)]">
            CYBER SECURITY
          </Text3DFlip>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Tips ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Short Text Works Best</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Use with single words or short phrases. Long text can look overwhelming 
                with the staggered animation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Hardware Accelerated</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Uses CSS 3D transforms for smooth 60fps animations with minimal CPU usage.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Unicode Support</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Uses Intl.Segmenter for proper grapheme splitting, handling emojis and 
                complex scripts correctly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">Screen Reader Safe</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Includes hidden text for screen readers. Visual animation is purely 
                decorative enhancement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

    </ComponentPage>
  );
}
