import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { TextReveal } from 'invin-uix/ui/text-reveal';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

export default function TextRevealDemo() {
  return (
    <ComponentPage
      name="Text Reveal"
      description="A scroll-based text reveal component that progressively reveals text word-by-word as the user scrolls. Perfect for hero sections, storytelling, and landing pages."
      importCode={`import { TextReveal } from 'invin-uix/ui/text-reveal';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }, { label: 'Scroll', variant: 'outline' }]}
    >

      {/* ─── Note about scroll ─────────────────────────────────── */}
      <Card className="bg-[var(--accent)]/10 border-[var(--accent)]/30">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">📜</span>
            <div>
              <p className="font-medium text-[var(--foreground)]">Scroll-based Animation</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                This component animates based on scroll position. For the best experience, 
                view the live demos below which are positioned within scrollable containers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator variant="bold" />

      {/* ─── Props Table ─────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'children', type: 'string', required: true, default: '—', description: 'The text to reveal' },
          { name: 'dimColor', type: 'string', default: "'rgba(0,0,0,0.2)'", description: 'Color of unrevealed text' },
          { name: 'revealColor', type: 'string', default: "'rgb(0,0,0)'", description: 'Color of revealed text' },
          { name: 'scrollStart', type: 'number', default: '0', description: 'Scroll offset to start reveal (0-1)' },
          { name: 'scrollEnd', type: 'number', default: '1', description: 'Scroll offset to end reveal (0-1)' },
          { name: 'as', type: "'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'", default: "'p'", description: 'HTML element to render' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for container' },
          { name: 'wordClassName', type: 'string', default: '—', description: 'CSS classes for individual words' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Live Demo ─────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Live Demo</h3>
        <p className="text-[var(--muted-foreground)]">
          Scroll within the container below to see the text reveal effect.
        </p>
      </div>

      {/* Scrollable container for demo */}
      <div className="relative h-[500px] overflow-y-auto rounded-lg border border-[var(--border)] bg-gradient-to-b from-[var(--background)] to-[var(--secondary)]">
        <div className="h-[1500px] relative">
          {/* Spacer for scroll room */}
          <div className="h-[300px]" />
          
          {/* Sticky text reveal */}
          <div className="sticky top-1/3 px-8 py-12">
            <TextReveal
              className="text-[24px] md:text-[32px] font-bold leading-relaxed text-center max-w-3xl mx-auto"
              dimColor="var(--muted-foreground-faint)"
              revealColor="var(--foreground)"
            >
              Invinsense provides next-generation cybersecurity solutions that protect your organization from evolving threats with AI-powered detection and automated response capabilities.
            </TextReveal>
          </div>
          
          {/* More scroll room */}
          <div className="h-[600px]" />
        </div>
      </div>

      <Separator variant="bold" />

      {/* ─── Usage Examples ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic Usage"
        description="Wrap your text in TextReveal within a scrollable container."
        code={`<div className="min-h-[300vh]">
  <div className="sticky top-1/2">
    <TextReveal>
      This text will reveal as you scroll down the page.
    </TextReveal>
  </div>
</div>`}
      >
        <div className="py-4 text-center">
          <Badge variant="outline">See live demo above</Badge>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Dark Mode Example"
        description="Customize colors for dark backgrounds."
        code={`<TextReveal 
  dimColor="rgba(255, 255, 255, 0.15)" 
  revealColor="#ffffff"
>
  Light text on dark background
</TextReveal>`}
      >
        <div className="h-[300px] overflow-y-auto rounded-lg bg-gray-900">
          <div className="h-[800px] relative">
            <div className="h-[100px]" />
            <div className="sticky top-1/3 px-6 py-8">
              <TextReveal
                dimColor="rgba(255, 255, 255, 0.15)"
                revealColor="#ffffff"
                className="text-[20px] font-semibold text-center"
              >
                Advanced threat detection powered by artificial intelligence and machine learning algorithms.
              </TextReveal>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="As Heading"
        description="Use semantic heading elements."
        code={`<TextReveal as="h1" className="text-4xl font-bold">
  Hero Headline
</TextReveal>`}
      >
        <div className="h-[250px] overflow-y-auto rounded-lg border border-[var(--border)]">
          <div className="h-[600px] relative">
            <div className="h-[80px]" />
            <div className="sticky top-1/3 px-6 py-4">
              <TextReveal
                as="h2"
                dimColor="var(--muted-foreground-faint)"
                revealColor="var(--foreground)"
                className="text-[28px] font-bold text-center"
              >
                Security Operations Reimagined
              </TextReveal>
            </div>
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Tips ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Usage Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">📌 Sticky Positioning</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Use <code className="text-xs bg-[var(--secondary)] px-1 rounded">position: sticky</code> to keep 
                the text visible while the user scrolls through the reveal effect.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">📏 Container Height</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                The scroll distance determines reveal speed. Taller containers = slower, 
                more dramatic reveals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">🎨 Color Contrast</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Ensure good contrast between <code className="text-xs bg-[var(--secondary)] px-1 rounded">dimColor</code> and 
                <code className="text-xs bg-[var(--secondary)] px-1 rounded">revealColor</code> for visual impact.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="font-medium text-[var(--foreground)] mb-2">♿ Accessibility</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Screen readers receive the full text immediately via a visually hidden element.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

    </ComponentPage>
  );
}
