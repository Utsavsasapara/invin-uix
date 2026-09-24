import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { AnimatedThemeToggler } from 'invin-uix/ui/animated-theme-toggler';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { Label } from 'invin-uix/ui/label';
import { useTheme } from '../../useTheme.jsx';

export default function AnimatedThemeTogglerDemo() {
  const { dark, toggleDark } = useTheme();
  const [selectedVariant, setSelectedVariant] = useState('circle');

  const variants = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'rectangle', 'star'];

  return (
    <ComponentPage
      name="Animated Theme Toggler"
      description="A theme toggle button with View Transitions API support. Features 7 animated transition shapes that create visually stunning theme switches."
      importCode={`import { AnimatedThemeToggler } from 'invin-uix/ui/animated-theme-toggler';`}
      badges={[
        { label: 'Animation', variant: 'accent' },
        { label: 'View Transitions', variant: 'secondary' },
        { label: 'New', variant: 'ok' },
      ]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Theme Toggler Playground"
        description="Experiment with different configurations. Click the toggle to see the animated theme transition."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'circle',
            options: [
              { value: 'circle', label: 'Circle' },
              { value: 'square', label: 'Square' },
              { value: 'triangle', label: 'Triangle' },
              { value: 'diamond', label: 'Diamond' },
              { value: 'hexagon', label: 'Hexagon' },
              { value: 'rectangle', label: 'Rectangle' },
              { value: 'star', label: 'Star' },
            ],
          },
          {
            name: 'duration',
            type: 'select',
            label: 'Duration',
            default: '400',
            options: [
              { value: '200', label: 'Fast (200ms)' },
              { value: '400', label: 'Default (400ms)' },
              { value: '600', label: 'Slow (600ms)' },
              { value: '800', label: 'Very Slow (800ms)' },
            ],
          },
          {
            name: 'iconSize',
            type: 'select',
            label: 'Icon Size',
            default: '20',
            options: [
              { value: '16', label: 'Small (16px)' },
              { value: '20', label: 'Default (20px)' },
              { value: '24', label: 'Medium (24px)' },
              { value: '32', label: 'Large (32px)' },
            ],
          },
          { name: 'fromCenter', type: 'switch', label: 'From Center', default: false },
        ]}
      >
        {(props) => (
          <div className="flex flex-col items-center gap-4">
            <AnimatedThemeToggler
              variant={props.variant}
              duration={Number(props.duration)}
              iconSize={Number(props.iconSize)}
              fromCenter={props.fromCenter}
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            />
            <Badge variant={dark ? 'secondary' : 'outline'}>{dark ? 'Dark Mode' : 'Light Mode'}</Badge>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Live Demo */}
      <PlaygroundSection
        title="Live Demo"
        description="Click the toggle to see the animated theme transition. The animation expands from the button's position."
        code={`<AnimatedThemeToggler 
  variant="${selectedVariant}"
  theme={dark ? 'dark' : 'light'}
  onThemeChange={(t) => toggleDark(t === 'dark')}
/>`}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          <AnimatedThemeToggler
            variant={selectedVariant}
            theme={dark ? 'dark' : 'light'}
            onThemeChange={(t) => toggleDark(t === 'dark')}
            className="p-4 rounded-lg border-2 border-[var(--border)] hover:border-[var(--accent)]"
            iconSize={32}
          />
          <p className="text-[var(--muted-foreground)]">
            Current theme: <Badge variant={dark ? 'secondary' : 'outline'}>{dark ? 'Dark' : 'Light'}</Badge>
          </p>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Variant Selector */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Transition Variants</h3>
        <p className="text-[var(--muted-foreground)] text-sm">
          Select a variant and click the toggle above to see different transition shapes.
        </p>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={selectedVariant === variant ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Separator variant="bold" />

      {/* All Variants Grid */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">All Variants</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {variants.map((variant) => (
            <Card key={variant} className="text-center">
              <CardContent className="pt-4 space-y-3">
                <AnimatedThemeToggler
                  variant={variant}
                  theme={dark ? 'dark' : 'light'}
                  onThemeChange={(t) => toggleDark(t === 'dark')}
                  className="mx-auto"
                />
                <p className="text-xs text-[var(--muted-foreground)] capitalize">{variant}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'variant', type: "'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'rectangle' | 'star'", default: "'circle'", description: 'Shape of the transition animation' },
          { name: 'duration', type: 'number', default: '400', description: 'Animation duration in milliseconds' },
          { name: 'fromCenter', type: 'boolean', default: 'false', description: 'Expand from viewport center instead of button' },
          { name: 'theme', type: "'light' | 'dark'", default: '—', description: 'Controlled theme value' },
          { name: 'onThemeChange', type: '(theme) => void', default: '—', description: 'Called when theme is toggled' },
          { name: 'lightIcon', type: 'ReactNode', default: '<Sun />', description: 'Icon shown when in dark mode' },
          { name: 'darkIcon', type: 'ReactNode', default: '<Moon />', description: 'Icon shown when in light mode' },
          { name: 'iconSize', type: 'number', default: '20', description: 'Size of default icons in pixels' },
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes' },
        ]}
      />

      <Separator variant="bold" />

      {/* Duration Examples */}
      <PlaygroundSection
        title="Animation Duration"
        description="Control the speed of the transition animation."
        code={`<AnimatedThemeToggler duration={200} />  {/* Fast */}
<AnimatedThemeToggler duration={400} />  {/* Default */}
<AnimatedThemeToggler duration={800} />  {/* Slow */}`}
      >
        <div className="flex items-center gap-8 justify-center py-4">
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              duration={200}
              variant="circle"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
            <p className="text-xs text-[var(--muted-foreground)]">200ms</p>
          </div>
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              duration={400}
              variant="circle"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
            <p className="text-xs text-[var(--muted-foreground)]">400ms (default)</p>
          </div>
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              duration={800}
              variant="circle"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
            <p className="text-xs text-[var(--muted-foreground)]">800ms</p>
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* From Center Example */}
      <PlaygroundSection
        title="Transition Origin"
        description="The transition can expand from the button position or the center of the viewport."
        code={`{/* From button (default) */}
<AnimatedThemeToggler fromCenter={false} />

{/* From viewport center */}
<AnimatedThemeToggler fromCenter />`}
      >
        <div className="flex items-center gap-8 justify-center py-4">
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              fromCenter={false}
              variant="diamond"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
            <p className="text-xs text-[var(--muted-foreground)]">From Button</p>
          </div>
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              fromCenter
              variant="diamond"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
            <p className="text-xs text-[var(--muted-foreground)]">From Center</p>
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Custom Icons */}
      <PlaygroundSection
        title="Custom Icons"
        description="Replace the default Sun/Moon icons with custom ones."
        code={`<AnimatedThemeToggler 
  lightIcon={<span>☀️</span>}
  darkIcon={<span>🌙</span>}
/>`}
      >
        <div className="flex items-center gap-8 justify-center py-4">
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              lightIcon={<span className="text-2xl">☀️</span>}
              darkIcon={<span className="text-2xl">🌙</span>}
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
              className="p-2"
            />
            <p className="text-xs text-[var(--muted-foreground)]">Emoji Icons</p>
          </div>
          <div className="text-center space-y-2">
            <AnimatedThemeToggler
              lightIcon={<span className="text-lg font-bold">L</span>}
              darkIcon={<span className="text-lg font-bold">D</span>}
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
              className="p-2"
            />
            <p className="text-xs text-[var(--muted-foreground)]">Text Icons</p>
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Use Cases */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Use Cases</h3>
      </div>

      {/* Topbar Example */}
      <PlaygroundSection
        title="Topbar Theme Switch"
        description="Common placement in navigation bars."
        code={`<div className="flex items-center gap-2">
  <AnimatedThemeToggler variant="circle" />
  <UserMenu />
</div>`}
      >
        <div className="bg-[var(--secondary)] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">My App</span>
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler
                variant="circle"
                theme={dark ? 'dark' : 'light'}
                onThemeChange={(t) => toggleDark(t === 'dark')}
              />
              <Button variant="ghost" size="sm">Profile</Button>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      {/* Settings Card */}
      <PlaygroundSection
        title="Settings Panel"
        description="Theme toggle in a settings interface."
        code={`<Card>
  <CardContent className="flex items-center justify-between">
    <div>
      <p className="font-medium">Dark Mode</p>
      <p className="text-sm text-muted-foreground">
        Toggle dark mode on or off
      </p>
    </div>
    <AnimatedThemeToggler variant="diamond" />
  </CardContent>
</Card>`}
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--foreground)]">Dark Mode</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Toggle dark mode on or off
              </p>
            </div>
            <AnimatedThemeToggler
              variant="diamond"
              duration={500}
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(t) => toggleDark(t === 'dark')}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* Required CSS Note */}
      <Card className="border-[var(--border)] bg-[var(--card)]">
        <CardContent className="pt-4">
          <h4 className="font-semibold text-[var(--foreground)] mb-2">Required CSS</h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Add this CSS to your global styles for the View Transitions API animation:
          </p>
          <pre className="bg-[var(--secondary)] border border-[var(--border)] p-3 rounded text-xs overflow-x-auto text-[var(--foreground)]">
{`::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html[data-theme-vt="active"]::view-transition-group(root) {
  animation-duration: var(--theme-toggle-vt-duration);
}`}
          </pre>
        </CardContent>
      </Card>

      <Separator variant="bold" />

      {/* Browser Support */}
      <Card>
        <CardContent className="pt-4">
          <h4 className="font-semibold text-[var(--foreground)] mb-2">Browser Support</h4>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            The View Transitions API is supported in modern browsers. For unsupported browsers, the component falls back to instant theme switching.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="ok">Chrome 111+</Badge>
            <Badge variant="ok">Edge 111+</Badge>
            <Badge variant="ok">Opera 97+</Badge>
            <Badge variant="secondary">Safari (fallback)</Badge>
            <Badge variant="secondary">Firefox (fallback)</Badge>
          </div>
        </CardContent>
      </Card>

    </ComponentPage>
  );
}
