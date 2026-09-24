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
      description="An animated number counter with spring physics. Perfect for KPIs, statistics, and dashboards. Supports count up/down directions and decimal places."
      importCode={`import { NumberTicker } from 'invin-uix/ui/number-ticker';`}
      badges={[{ label: 'Animation', variant: 'accent' }, { label: 'Motion', variant: 'secondary' }]}
    >

      {/* Interactive Playground */}
      <InteractiveDemo
        title="Number Ticker Playground"
        description="Experiment with different values and formatting options."
        controls={[
          { name: 'value', label: 'Value', type: 'number', default: 100 },
          { name: 'direction', label: 'Direction', type: 'select', default: 'up', options: [
            { value: 'up', label: 'Count Up' },
            { value: 'down', label: 'Count Down' },
          ]},
          { name: 'decimalPlaces', label: 'Decimal Places', type: 'number', default: 0 },
          { name: 'delay', label: 'Delay (s)', type: 'number', default: 0 },
        ]}
      >
        {(props) => (
          <div className="space-y-4 w-full text-center">
            <NumberTicker
              key={key}
              value={props.value}
              direction={props.direction}
              decimalPlaces={props.decimalPlaces}
              delay={props.delay}
              className="text-[48px] font-bold text-[var(--foreground)]"
            />
            <Button variant="outline" size="sm" onClick={resetAnimation}>
              <ArrowClockwise style={{ width: 14, height: 14 }} /> Replay Animation
            </Button>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* Props Table */}
      <PropsTable
        props={[
          { name: 'value', type: 'number', required: true, default: '—', description: 'The target number to animate to' },
          { name: 'startValue', type: 'number', default: '0', description: 'The starting value for the animation' },
          { name: 'direction', type: "'up' | 'down'", default: "'up'", description: 'Count up from startValue or down from value' },
          { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (seconds)' },
          { name: 'decimalPlaces', type: 'number', default: '0', description: 'Number of decimal places to show' },
          { name: 'className', type: 'string', default: '—', description: 'CSS classes for styling' },
        ]}
      />

      <Separator variant="bold" />

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-[var(--foreground)] font-[700]">Examples</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Count Up */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Count Up</Badge>
            <NumberTicker key={`up-${key}`} value={100} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Basic counter</p>
          </CardContent>
        </Card>

        {/* Count Down */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Count Down</Badge>
            <NumberTicker key={`down-${key}`} value={100} direction="down" className="text-[36px] font-bold text-[var(--ok)] block" />
            <p className="text-[var(--muted-foreground)] text-sm">Countdown from 100</p>
          </CardContent>
        </Card>

        {/* With Decimals */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Decimals</Badge>
            <NumberTicker key={`dec-${key}`} value={5.67} decimalPlaces={2} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Two decimal places</p>
          </CardContent>
        </Card>

        {/* Large Number */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Large Number</Badge>
            <NumberTicker key={`large-${key}`} value={9847} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">With locale formatting</p>
          </CardContent>
        </Card>

        {/* With Delay */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Delayed</Badge>
            <NumberTicker key={`delay-${key}`} value={500} delay={1} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">1 second delay</p>
          </CardContent>
        </Card>

        {/* Custom Start Value */}
        <Card>
          <CardContent className="pt-4 space-y-3 text-center">
            <Badge variant="secondary">Custom Start</Badge>
            <NumberTicker key={`start-${key}`} value={1000} startValue={500} className="text-[36px] font-bold block" />
            <p className="text-[var(--muted-foreground)] text-sm">Starts from 500</p>
          </CardContent>
        </Card>
      </div>

      <Separator variant="bold" />

      {/* KPI Dashboard Example */}
      <PlaygroundSection
        title="KPI Dashboard"
        description="Real-world usage in a security operations dashboard."
        code={`<div className="grid grid-cols-4 gap-4">
  <NumberTicker value={247} className="text-4xl font-bold text-error" />
  <NumberTicker value={1823} className="text-4xl font-bold text-warning" />
  <NumberTicker value={45892} className="text-4xl font-bold text-ok" />
  <NumberTicker value={99.9} decimalPlaces={1} />
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
              <NumberTicker key={`kpi4-${key}`} value={99.9} decimalPlaces={1} className="text-[32px] font-bold block" />
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Uptime %</p>
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
