import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { NumberTicker } from 'invin-uix/ui/number-ticker';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { ArrowClockwise } from 'invin-uix/ui/icons';

export default function NumberTickerDemo() {
  const [key, setKey] = useState(0);
  const resetAnimation = () => setKey(prev => prev + 1);

  return (
    <ComponentPage
      name="Number Ticker"
      description="An animated number counter with spring physics. Perfect for KPIs, statistics, and dashboards. Supports count up/down, formatting, and custom prefixes/suffixes."
      importCode={`import { NumberTicker } from 'invin-uix/ui/number-ticker';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Number Ticker Playground"
        description="Experiment with different values and formatting options."
        controls={[
          { name: 'value', label: 'Value', type: 'number', default: 1234 },
          { name: 'direction', label: 'Direction', type: 'select', default: 'up', options: [
            { value: 'up', label: 'Count Up' },
            { value: 'down', label: 'Count Down' },
          ]},
          { name: 'decimalPlaces', label: 'Decimal Places', type: 'number', default: 0 },
          { name: 'useLocale', label: 'Use Locale Formatting', type: 'boolean', default: true },
          { name: 'compactNotation', label: 'Compact Notation', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full text-center">
            <NumberTicker
              key={key}
              value={props.value}
              direction={props.direction}
              decimalPlaces={props.decimalPlaces}
              useLocale={props.useLocale}
              compactNotation={props.compactNotation}
              className="text-[48px] font-bold text-[var(--foreground)]"
            />
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
          { name: 'value', type: 'number', required: true, default: '—', description: 'The number to animate to' },
          { name: 'direction', type: "'up' | 'down'", default: "'up'", description: 'Count up from 0 or down from value' },
          { name: 'duration', type: 'number', default: '2', description: 'Animation duration in seconds' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (seconds)' },
          { name: 'startOnView', type: 'boolean', default: 'true', description: 'Start when element enters viewport' },
          { name: 'decimalPlaces', type: 'number', default: '0', description: 'Number of decimal places to show' },
          { name: 'useLocale', type: 'boolean', default: 'true', description: 'Format with locale separators (1,234)' },
          { name: 'locale', type: 'string', default: "'en-US'", description: 'Locale for number formatting' },
          { name: 'compactNotation', type: 'boolean', default: 'false', description: 'Use compact notation (1.2K, 3.4M)' },
          { name: 'prefix', type: 'string', default: '—', description: 'Text before the number' },
          { name: 'suffix', type: 'string', default: '—', description: 'Text after the number' },
          { name: 'formatter', type: '(value: number) => string', default: '—', description: 'Custom formatting function' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Examples ───────────────────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Count Up */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Count Up</Badge>
            <NumberTicker key={`up-${key}`} value={9847} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Total Incidents</p>
          </CardContent>
        </Card>

        {/* Count Down */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Count Down</Badge>
            <NumberTicker key={`down-${key}`} value={42} direction="down" className="text-[36px] font-bold text-[var(--ok)] block" />
            <p className="text-[var(--muted-foreground)] text-sm">Seconds Remaining</p>
          </CardContent>
        </Card>

        {/* Currency */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Currency</Badge>
            <NumberTicker key={`curr-${key}`} value={1234567.89} prefix="$" decimalPlaces={2} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Revenue</p>
          </CardContent>
        </Card>

        {/* Percentage */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Percentage</Badge>
            <NumberTicker key={`perc-${key}`} value={99.7} suffix="%" decimalPlaces={1} className="text-[36px] font-bold text-[var(--ok)] block" />
            <p className="text-[var(--muted-foreground)] text-sm">Uptime</p>
          </CardContent>
        </Card>

        {/* Compact Notation */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Compact</Badge>
            <NumberTicker key={`compact-${key}`} value={2450000} compactNotation className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Total Users</p>
          </CardContent>
        </Card>

        {/* Large Number */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Large Number</Badge>
            <NumberTicker key={`large-${key}`} value={15000000} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Events Processed</p>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* ─── KPI Dashboard Example ─────────────────────────────── */}
      <PlaygroundSection
        title="KPI Dashboard"
        description="Real-world usage in a security operations dashboard."
        code={`<div className="grid grid-cols-4 gap-4">
  <NumberTicker value={247} className="text-4xl font-bold text-error" />
  <NumberTicker value={1823} className="text-4xl font-bold text-warning" />
  <NumberTicker value={45892} className="text-4xl font-bold text-ok" />
  <NumberTicker value={99.9} suffix="%" decimalPlaces={1} />
</div>`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 text-center">
              <NumberTicker key={`kpi1-${key}`} value={247} className="text-[32px] font-bold text-[var(--error)] block" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Critical Alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <NumberTicker key={`kpi2-${key}`} value={1823} className="text-[32px] font-bold text-[var(--warning)] block" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Warnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <NumberTicker key={`kpi3-${key}`} value={45892} className="text-[32px] font-bold text-[var(--ok)] block" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Events Resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <NumberTicker key={`kpi4-${key}`} value={99.9} suffix="%" decimalPlaces={1} className="text-[32px] font-bold block" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">System Uptime</p>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      <div className="flex justify-center pt-4">
        <Button onClick={resetAnimation}>
          <ArrowClockwise style={{ width: 16, height: 16 }} /> Replay All Animations
        </Button>
      </div>

    </ComponentPage>
  );
}
