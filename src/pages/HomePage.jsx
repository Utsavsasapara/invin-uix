import { Link } from 'react-router-dom';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import {
  ArrowRight, BookOpen, Package, Shield, Lightning, Star,
  Cube, Palette, Code, Terminal, Sparkle, GridFour,
  ChartLine, Table, Calendar, Bell, Layout, TextT,
  ToggleLeft, CaretCircleDown, Stack, ChatCircle
} from 'invin-uix/ui/icons';
import { AppSwitcher, ACCENTS } from '../components/AppSwitcher.jsx';
import { ComponentStats, QuickActions } from '../components/ComponentShowcase.jsx';

// ─── Component previews for featured cards ────────────────────────────────────

const ButtonPreview = () => (
  <div className="flex gap-2">
    <div className="h-7 px-3 rounded-[var(--radius-md)] bg-[var(--accent)] flex items-center">
      <span className="text-[10px] font-medium text-white">Primary</span>
    </div>
    <div className="h-7 px-3 rounded-[var(--radius-md)] border border-[var(--border)] flex items-center">
      <span className="text-[10px] font-medium text-[var(--foreground)]">Outline</span>
    </div>
  </div>
);

const CardPreview = () => (
  <div className="w-24 p-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)]">
    <div className="h-2 w-12 rounded bg-[var(--secondary)] mb-1.5" />
    <div className="h-1.5 w-full rounded bg-[var(--secondary)]" />
    <div className="h-1.5 w-3/4 rounded bg-[var(--secondary)] mt-1" />
  </div>
);

const TablePreview = () => (
  <div className="w-28 rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden">
    <div className="h-4 bg-[var(--secondary)] flex items-center px-1 gap-1">
      <div className="h-1.5 w-6 rounded bg-[var(--muted-foreground)]" />
      <div className="h-1.5 w-8 rounded bg-[var(--muted-foreground)]" />
    </div>
    {[1, 2].map(i => (
      <div key={i} className="h-4 flex items-center px-1 gap-1 border-t border-[var(--border)]">
        <div className="h-1.5 w-6 rounded bg-[var(--secondary)]" />
        <div className="h-1.5 w-8 rounded bg-[var(--secondary)]" />
      </div>
    ))}
  </div>
);

const ChartPreview = () => (
  <div className="w-24 h-12 flex items-end gap-1">
    {[40, 65, 45, 80, 55, 70].map((h, i) => (
      <div
        key={i}
        className="flex-1 rounded-t bg-[var(--accent)]"
        style={{ height: `${h}%`, opacity: 0.3 + (i * 0.1) }}
      />
    ))}
  </div>
);

// ─── Featured components data ─────────────────────────────────────────────────

const featuredComponents = [
  {
    key: 'button',
    name: 'Button',
    description: '6 variants, 4 sizes, loading states, icon slots',
    path: '/components?demo=button',
    preview: <ButtonPreview />,
    tags: ['interactive', 'form'],
    isPopular: true
  },
  {
    key: 'card',
    name: 'Card',
    description: 'Flexible container with header, content, footer',
    path: '/components?demo=card',
    preview: <CardPreview />,
    tags: ['layout', 'display']
  },
  {
    key: 'data-table',
    name: 'Data Table',
    description: 'Sortable, filterable tables with pagination',
    path: '/components?demo=data-table',
    preview: <TablePreview />,
    tags: ['data', 'complex'],
    isNew: true
  },
  {
    key: 'chart',
    name: 'Charts',
    description: 'Line, bar, area, pie, radar, gauge charts',
    path: '/components?demo=chart',
    preview: <ChartPreview />,
    tags: ['data', 'visualization']
  }
];

// ─── Category cards ───────────────────────────────────────────────────────────

const componentCategories = [
  {
    key: 'display',
    label: 'Display',
    description: 'Button, Badge, Avatar, Card, Alert, Skeleton',
    icon: Cube,
    color: 'var(--accent)',
    bgColor: 'var(--accent-soft)',
    count: 12,
    path: '/components?category=display'
  },
  {
    key: 'form',
    label: 'Form & Input',
    description: 'Input, Select, Checkbox, Switch, TagInput, ColorPicker',
    icon: ToggleLeft,
    color: 'var(--ok)',
    bgColor: 'color-mix(in srgb, var(--ok) 15%, transparent)',
    count: 14,
    path: '/components?category=form'
  },
  {
    key: 'navigation',
    label: 'Navigation',
    description: 'Tabs, Menu, Breadcrumb, Pagination, Command',
    icon: Layout,
    color: 'var(--info)',
    bgColor: 'color-mix(in srgb, var(--info) 15%, transparent)',
    count: 5,
    path: '/components?category=navigation'
  },
  {
    key: 'feedback',
    label: 'Feedback',
    description: 'Progress, Toast, Tooltip, Error Boundary',
    icon: Bell,
    color: 'var(--warning)',
    bgColor: 'color-mix(in srgb, var(--warning) 15%, transparent)',
    count: 4,
    path: '/components?category=feedback'
  },
  {
    key: 'overlay',
    label: 'Overlay',
    description: 'Dialog, Drawer, Popover, Dropdown, Context Menu',
    icon: Stack,
    color: 'var(--error)',
    bgColor: 'color-mix(in srgb, var(--error) 15%, transparent)',
    count: 7,
    path: '/components?category=overlay'
  },
  {
    key: 'data',
    label: 'Data & Charts',
    description: 'Table, DataTable, Calendar, Charts, Timeline',
    icon: ChartLine,
    color: '#9752d9',
    bgColor: 'color-mix(in srgb, #9752d9 15%, transparent)',
    count: 14,
    path: '/components?category=data'
  }
];

// ─── Quick start steps ────────────────────────────────────────────────────────

const quickStartSteps = [
  {
    step: 1,
    title: 'Install',
    code: 'npm install invin-uix',
    description: 'Add the package to your project'
  },
  {
    step: 2,
    title: 'Import styles',
    code: `@import "tailwindcss";
@import "invin-uix/tokens.css";
@source "../node_modules/invin-uix/dist";`,
    description: 'Add to your main CSS file'
  },
  {
    step: 3,
    title: 'Set theme',
    code: `document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-accent', 'xdr');`,
    description: 'Configure theme and accent'
  },
  {
    step: 4,
    title: 'Use components',
    code: `import { Button } from 'invin-uix/ui/button';
import { Card } from 'invin-uix/ui/card';`,
    description: 'Import what you need'
  }
];

// ─── Features list ────────────────────────────────────────────────────────────

const features = [
  {
    icon: Palette,
    title: '7 Product Accents',
    description: 'XDR, SOAR, GSOS, AI Firewall, OT, Decoys, ITSM — each with matching colors'
  },
  {
    icon: Sparkle,
    title: 'Dark + Light Themes',
    description: 'Flip data-theme and every token updates. No per-component overrides.'
  },
  {
    icon: Code,
    title: 'Tailwind v4 Native',
    description: 'Zero config needed. Import tokens.css and you get all utilities.'
  },
  {
    icon: Package,
    title: 'Tree-Shakeable',
    description: 'Import only what you use. Dead code elimination built-in.'
  },
  {
    icon: TextT,
    title: 'Geist Fonts Included',
    description: 'Geist Sans + Mono bundled. No external font dependencies.'
  },
  {
    icon: GridFour,
    title: '59+ Components',
    description: 'From Button to Flow Builder. Everything you need for product UIs.'
  }
];

// ─── Mini preview component ───────────────────────────────────────────────────

function MiniShellPreview() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden bg-[var(--background)]">
      {/* Mini topbar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b border-[var(--border)]"
        style={{ background: 'var(--topbar)' }}
      >
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-[var(--accent)]" />
          <span className="text-[10px] font-semibold text-[var(--foreground)]">Product</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-4 w-4 rounded bg-[var(--secondary)]" />
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Mini sidebar */}
        <div className="w-12 border-r border-[var(--border)] p-2 space-y-2" style={{ background: 'var(--sidebar)' }}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`h-6 rounded-[4px] ${i === 1 ? 'bg-[var(--accent-soft)]' : 'bg-[var(--secondary)]'}`}
            />
          ))}
        </div>

        {/* Mini content */}
        <div className="flex-1 p-3 space-y-2">
          <div className="flex gap-2">
            {['--ok', '--warning', '--error'].map(c => (
              <div key={c} className="flex-1 h-12 rounded-[var(--radius-md)] border border-[var(--border)] p-2">
                <div className="h-1.5 w-6 rounded-full" style={{ background: `var(${c})` }} />
                <div className="h-2 w-full rounded bg-[var(--secondary)] mt-2" />
              </div>
            ))}
          </div>
          <div className="h-16 rounded-[var(--radius-md)] border border-[var(--border)] p-2">
            <div className="h-2 w-20 rounded bg-[var(--secondary)]" />
            <div className="flex gap-1 mt-2">
              {[40, 65, 45, 80, 55].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[var(--accent)]"
                  style={{ height: `${h * 0.3}px`, opacity: 0.4 + (i * 0.12) }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accent dots */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-[var(--border)]">
        <span className="text-[9px] text-[var(--muted-foreground)]">Accents:</span>
        {ACCENTS.slice(0, 7).map(a => (
          <span
            key={a.key}
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: a.color }}
            title={a.label}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" size="sm">invin-uix</Badge>
              <Badge variant="outline" size="sm">v1.3.0</Badge>
              <Badge variant="info" size="sm">React 19</Badge>
              <Badge variant="info" size="sm">Tailwind v4</Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] tracking-[-0.02em] leading-tight">
                One library.<br />
                One shell.<br />
                <span className="text-[var(--accent)]">Seven accents.</span>
              </h1>
              <p className="text-body text-[var(--muted-foreground)] leading-relaxed max-w-md">
                A comprehensive React component library for building Invinsense product modules.
                Consistent design language across all products — only the accent changes.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/components">
                <Button>
                  Browse Components
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Button>
              </Link>
              <Link to="/components?demo=getting-started">
                <Button variant="outline">
                  <BookOpen style={{ width: 14, height: 14 }} />
                  Getting Started
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { value: '59+', label: 'Components' },
                { value: '7', label: 'Accents' },
                { value: '1500+', label: 'Icons' }
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-caption text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:pl-4">
            <MiniShellPreview />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Featured Components ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightning style={{ width: 18, height: 18, color: 'var(--accent)' }} />
            <h2 className="text-label font-semibold text-[var(--foreground)] uppercase tracking-wide">
              Featured Components
            </h2>
          </div>
          <Link to="/components" className="text-caption text-[var(--accent)] hover:underline flex items-center gap-1">
            View all <ArrowRight style={{ width: 12, height: 12 }} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredComponents.map(comp => (
            <Link key={comp.key} to={comp.path} className="block no-underline group">
              <Card hover className="h-full overflow-hidden">
                {/* Preview */}
                <div className="h-24 bg-[var(--secondary)]/30 border-b border-[var(--border)] flex items-center justify-center">
                  {comp.preview}
                </div>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-body font-semibold text-[var(--foreground)]">{comp.name}</p>
                    {comp.isNew && <Badge variant="info" size="sm" className="text-[9px]">New</Badge>}
                    {comp.isPopular && <Star style={{ width: 12, height: 12, color: 'var(--warning)' }} />}
                  </div>
                  <p className="text-[11px] text-[var(--muted-foreground)] mt-1">{comp.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Component Categories ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-label font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentCategories.map(cat => (
            <Link key={cat.key} to={cat.path} className="block no-underline group">
              <Card hover className="h-full">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="h-10 w-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                      style={{ background: cat.bgColor }}
                    >
                      <cat.icon style={{ width: 20, height: 20, color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-body font-semibold text-[var(--foreground)]">{cat.label}</p>
                        <Badge variant="secondary" size="sm">{cat.count}</Badge>
                      </div>
                      <p className="text-[11px] text-[var(--muted-foreground)] mt-1">{cat.description}</p>
                    </div>
                    <ArrowRight
                      style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Quick Start ─────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal style={{ width: 18, height: 18, color: 'var(--muted-foreground)' }} />
          <h2 className="text-label font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
            Quick Start
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStartSteps.map(step => (
            <Card key={step.step} className="relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="text-3xl font-bold text-[var(--secondary)]">{step.step}</span>
              </div>
              <CardContent className="pt-4 pb-4 pr-12">
                <p className="text-caption font-semibold text-[var(--foreground)] mb-2">{step.title}</p>
                <pre className="text-[11px] font-mono text-[var(--muted-foreground)] whitespace-pre-wrap break-all bg-[var(--secondary)]/50 rounded-[var(--radius-md)] p-2">
                  {step.code}
                </pre>
                <p className="text-[10px] text-[var(--muted-foreground)] mt-2">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Features Grid ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-label font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
          What's Included
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] space-y-2"
            >
              <div className="flex items-center gap-2">
                <feature.icon style={{ width: 16, height: 16, color: 'var(--accent)' }} />
                <p className="text-caption font-semibold text-[var(--foreground)]">{feature.title}</p>
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── Explore More ────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-label font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">
          Explore
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/components?demo=ui-guide" className="no-underline">
            <Card hover className="h-full">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                    <BookOpen style={{ width: 24, height: 24, color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-body font-semibold text-[var(--foreground)]">UI Guide</p>
                    <p className="text-caption text-[var(--muted-foreground)] mt-1">
                      Core principles, the 24 Laws, token reference, typography scale, motion guidelines.
                    </p>
                    <p className="text-caption text-[var(--accent)] mt-2 font-medium">Read the guide →</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/apps/soar-dashboard" className="no-underline">
            <Card hover className="h-full">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[color-mix(in_srgb,var(--info)_15%,transparent)] flex items-center justify-center shrink-0">
                    <Shield style={{ width: 24, height: 24, color: 'var(--info)' }} />
                  </div>
                  <div>
                    <p className="text-body font-semibold text-[var(--foreground)]">SOAR Demo App</p>
                    <p className="text-caption text-[var(--muted-foreground)] mt-1">
                      A full product module: workflow builder, alert feed, integrations, AI assistant.
                    </p>
                    <p className="text-caption text-[var(--accent)] mt-2 font-medium">Open demo →</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────────────────────── */}
      <section className="text-center py-8">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Ready to build?</h2>
          <p className="text-caption text-[var(--muted-foreground)]">
            Start building beautiful, consistent product interfaces with invin-uix.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/components">
              <Button>
                Get Started
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
