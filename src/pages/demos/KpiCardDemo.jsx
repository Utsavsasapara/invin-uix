import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { KpiCard } from 'invin-uix/ui/kpi-card';
import { Progress } from 'invin-uix/ui/progress';
import { Separator } from 'invin-uix/ui/separator';
import {
  Users, CreditCard, Pulse, WarningCircle, TrendUp,
  Shield, Lightning, Clock, Link, GitBranch, ChartLine,
} from 'invin-uix/ui/icons';

export default function KpiCardDemo() {
  return (
    <ComponentPage
      name="KPI Card"
      description="Key Performance Indicator cards for dashboards. Displays a metric label, value, description, and optional trend indicator. Supports variants, accent highlighting, loading state, and custom children."
      importCode={`import { KpiCard } from 'invin-uix/ui/kpi-card';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="KPI Card Playground"
        description="Experiment with KPI Card configurations."
        controls={[
          { name: 'label', type: 'text', label: 'Label', default: 'WORKFLOWS', placeholder: 'Enter label' },
          { name: 'value', type: 'text', label: 'Value', default: '11', placeholder: 'Enter value' },
          { name: 'description', type: 'text', label: 'Description', default: 'Across the organization', placeholder: 'Enter description' },
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'bordered', label: 'Bordered' },
              { value: 'filled', label: 'Filled' },
            ]
          },
          { name: 'accent', type: 'boolean', label: 'Accent Value', default: false },
          { name: 'selected', type: 'boolean', label: 'Selected', default: false },
          { name: 'loading', type: 'boolean', label: 'Loading', default: false },
        ]}
      >
        {(props) => (
          <KpiCard 
            label={props.label}
            value={props.value}
            description={props.description}
            accent={props.accent}
            selected={props.selected}
            loading={props.loading}
            variant={props.variant}
            icon={<GitBranch style={{ width: 16, height: 16 }} />} 
          />
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'label', type: 'string', default: '—', description: 'Metric label (e.g. "WORKFLOWS", "Total Users")', required: true },
          { name: 'value', type: 'string', default: '—', description: 'Big number display value', required: true },
          { name: 'description', type: 'string', default: '—', description: 'Subtitle text below value' },
          { name: 'trend', type: "{ value: string; direction: 'up' | 'down' | 'neutral' }", default: '—', description: 'Trend indicator with value and direction' },
          { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon in top-right corner' },
          { name: 'variant', type: "'default' | 'bordered' | 'filled'", default: "'default'", description: 'Visual style variant' },
          { name: 'accent', type: 'boolean', default: 'false', description: 'Display value in accent color' },
          { name: 'selected', type: 'boolean', default: 'false', description: 'Active/selected state (accent border + glow)' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loading state' },
          { name: 'onClick', type: 'function', default: '—', description: 'Click handler (adds pointer cursor)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic Usage ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic Usage"
        description="Simple KPI card with label, value, and description. Perfect for dashboard overview metrics."
        code={`<KpiCard 
  label="WORKFLOWS" 
  value="11" 
  description="Across the organization"
  icon={<GitBranch size={16} />} 
/>`}
      >
        <KpiCard 
          label="WORKFLOWS" 
          value="11" 
          description="Across the organization"
          icon={<GitBranch style={{ width: 16, height: 16 }} />} 
        />
      </PlaygroundSection>

      {/* ─── Dashboard Overview ─────────────────────────────────── */}
      <PlaygroundSection
        title="Dashboard Overview"
        description="Real-world dashboard pattern. Use description for context, accent to highlight important metrics."
        code={`<KpiCard 
  label="WORKFLOWS" 
  value="11" 
  description="Across the organization"
  icon={<GitBranch size={16} />} 
/>
<KpiCard 
  label="EXECUTIONS (30D)" 
  value="5" 
  description="Manual + triggered runs"
  icon={<Lightning size={16} />} 
/>
<KpiCard 
  label="INTEGRATIONS" 
  value="18" 
  description="All currently active"
  accent
  icon={<Link size={16} />} 
/>
<KpiCard 
  label="USERS" 
  value="4" 
  description="3 admins · 1 viewer"
  icon={<Users size={16} />} 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <KpiCard 
            label="WORKFLOWS" 
            value="11" 
            description="Across the organization"
            icon={<GitBranch style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="EXECUTIONS (30D)" 
            value="5" 
            description="Manual + triggered runs"
            icon={<Lightning style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="INTEGRATIONS" 
            value="18" 
            description="All currently active"
            accent
            icon={<Link style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="USERS" 
            value="4" 
            description="3 admins · 1 viewer"
            icon={<Users style={{ width: 16, height: 16 }} />} 
          />
        </div>
      </PlaygroundSection>

      {/* ─── Trend Indicator ──────────────────────────────────── */}
      <PlaygroundSection
        title="Trend Indicator"
        description="Use the trend prop for metrics with change indicators. Direction controls color: up (green), down (red), neutral (muted)."
        code={`<KpiCard 
  label="Total Revenue" 
  value="$45,231" 
  trend={{ value: "+20.1% from last month", direction: "up" }}
  icon={<CreditCard size={16} />} 
/>
<KpiCard 
  label="Active Now" 
  value="573" 
  trend={{ value: "+19% from yesterday", direction: "up" }}
  icon={<Pulse size={16} />} 
/>
<KpiCard 
  label="Churn Rate" 
  value="2.4%" 
  trend={{ value: "+0.3% increase", direction: "down" }}
  icon={<ChartLine size={16} />} 
/>
<KpiCard 
  label="Balance" 
  value="$0" 
  trend={{ value: "No change", direction: "neutral" }}
  icon={<TrendUp size={16} />} 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <KpiCard 
            label="Total Revenue" 
            value="$45,231" 
            trend={{ value: "+20.1% from last month", direction: "up" }}
            icon={<CreditCard style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="Active Now" 
            value="573" 
            trend={{ value: "+19% from yesterday", direction: "up" }}
            icon={<Pulse style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="Churn Rate" 
            value="2.4%" 
            trend={{ value: "+0.3% increase", direction: "down" }}
            icon={<ChartLine style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="Balance" 
            value="$0" 
            trend={{ value: "No change", direction: "neutral" }}
            icon={<TrendUp style={{ width: 16, height: 16 }} />} 
          />
        </div>
      </PlaygroundSection>

      {/* ─── Variants ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="Three visual styles: default (standard), bordered (thicker border emphasis), filled (subtle background)."
        code={`<KpiCard 
  label="DEFAULT" 
  value="1,234" 
  description="Standard card style"
  variant="default" 
  icon={<TrendUp size={16} />} 
/>
<KpiCard 
  label="BORDERED" 
  value="5,678" 
  description="Thicker border emphasis"
  variant="bordered" 
  icon={<TrendUp size={16} />} 
/>
<KpiCard 
  label="FILLED" 
  value="9,012" 
  description="Subtle background fill"
  variant="filled" 
  icon={<TrendUp size={16} />} 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <KpiCard 
            label="DEFAULT" 
            value="1,234" 
            description="Standard card style"
            variant="default" 
            icon={<TrendUp style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="BORDERED" 
            value="5,678" 
            description="Thicker border emphasis"
            variant="bordered" 
            icon={<TrendUp style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="FILLED" 
            value="9,012" 
            description="Subtle background fill"
            variant="filled" 
            icon={<TrendUp style={{ width: 16, height: 16 }} />} 
          />
        </div>
      </PlaygroundSection>

      {/* ─── Accent & Selected ────────────────────────────────── */}
      <PlaygroundSection
        title="Accent & Selected States"
        description="Use accent to highlight active metrics with accent-colored value. Use selected for clickable selection patterns with accent border + glow."
        code={`<KpiCard 
  label="NORMAL" 
  value="100" 
  description="Default value color"
  icon={<Shield size={16} />} 
/>
<KpiCard 
  label="ACCENT" 
  value="200" 
  description="Highlighted with accent"
  accent
  icon={<Shield size={16} />} 
/>
<KpiCard 
  label="SELECTED" 
  value="300" 
  description="Active selection state"
  selected
  icon={<Shield size={16} />} 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <KpiCard 
            label="NORMAL" 
            value="100" 
            description="Default value color"
            icon={<Shield style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="ACCENT" 
            value="200" 
            description="Highlighted with accent"
            accent
            icon={<Shield style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="SELECTED" 
            value="300" 
            description="Active selection state"
            selected
            icon={<Shield style={{ width: 16, height: 16 }} />} 
          />
        </div>
      </PlaygroundSection>

      {/* ─── Loading State ────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show skeleton placeholders while data is being fetched. Works with all variants."
        code={`<KpiCard label="" value="" loading />
<KpiCard label="" value="" loading variant="bordered" />
<KpiCard label="" value="" loading variant="filled" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <KpiCard label="" value="" loading />
          <KpiCard label="" value="" loading variant="bordered" />
          <KpiCard label="" value="" loading variant="filled" />
        </div>
      </PlaygroundSection>

      {/* ─── With Children ────────────────────────────────────── */}
      <PlaygroundSection
        title="With Children"
        description="Add extra content below the card using children — progress bars, sparklines, or custom elements."
        code={`<KpiCard 
  label="STORAGE USED" 
  value="7.2 GB" 
  description="72% of 10 GB"
  icon={<Shield size={16} />}
>
  <Progress value={72} size="sm" className="mt-2" />
</KpiCard>

<KpiCard 
  label="API CALLS" 
  value="12,847" 
  trend={{ value: "+5.2% from last week", direction: "up" }}
  icon={<Lightning size={16} />}
>
  <Progress value={48} size="sm" className="mt-2" />
</KpiCard>

<KpiCard 
  label="UPTIME" 
  value="99.98%" 
  description="Last 30 days"
  icon={<Clock size={16} />}
>
  <Progress value={99.98} size="sm" variant="gradient" className="mt-2" />
</KpiCard>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <KpiCard 
            label="STORAGE USED" 
            value="7.2 GB" 
            description="72% of 10 GB"
            icon={<Shield style={{ width: 16, height: 16 }} />}
          >
            <Progress value={72} size="sm" className="mt-2" />
          </KpiCard>
          <KpiCard 
            label="API CALLS" 
            value="12,847" 
            trend={{ value: "+5.2% from last week", direction: "up" }}
            icon={<Lightning style={{ width: 16, height: 16 }} />}
          >
            <Progress value={48} size="sm" className="mt-2" />
          </KpiCard>
          <KpiCard 
            label="UPTIME" 
            value="99.98%" 
            description="Last 30 days"
            icon={<Clock style={{ width: 16, height: 16 }} />}
          >
            <Progress value={99.98} size="sm" variant="gradient" className="mt-2" />
          </KpiCard>
        </div>
      </PlaygroundSection>

      {/* ─── Clickable Cards ──────────────────────────────────── */}
      <PlaygroundSection
        title="Clickable Cards"
        description="Add onClick handler for interactive cards. Cursor changes to pointer automatically."
        code={`<KpiCard 
  label="VIEW DETAILS" 
  value="Click me" 
  description="Opens detail panel"
  onClick={() => handleClick()}
  icon={<Link size={16} />} 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <KpiCard 
            label="VIEW DETAILS" 
            value="Click me" 
            description="Opens detail panel"
            onClick={() => alert('Card clicked!')}
            icon={<Link style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="SELECTED METRIC" 
            value="Active" 
            description="Currently viewing"
            selected
            onClick={() => alert('Selected card clicked!')}
            icon={<Link style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="ACCENT METRIC" 
            value="Highlighted" 
            description="Important value"
            accent
            onClick={() => alert('Accent card clicked!')}
            icon={<Link style={{ width: 16, height: 16 }} />} 
          />
        </div>
      </PlaygroundSection>

      {/* ─── SOC Dashboard ────────────────────────────────────── */}
      <PlaygroundSection
        title="Security Operations Center"
        description="Real-world SOC dashboard combining descriptions, trends, and progress indicators."
        code={`<KpiCard 
  label="OPEN INCIDENTS" 
  value="7" 
  trend={{ value: "-2 from yesterday", direction: "down" }}
  icon={<WarningCircle size={16} />} 
/>
<KpiCard 
  label="MTTR" 
  value="4.2h" 
  trend={{ value: "-18% improvement", direction: "up" }}
  icon={<Clock size={16} />} 
/>
<KpiCard 
  label="BLOCKED THREATS" 
  value="1,247" 
  trend={{ value: "+156 today", direction: "up" }}
  icon={<Shield size={16} />} 
/>
<KpiCard 
  label="COMPLIANCE" 
  value="94%" 
  description="SOC 2 Type II"
  icon={<TrendUp size={16} />}
>
  <Progress value={94} size="sm" variant="gradient" className="mt-2" />
</KpiCard>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <KpiCard 
            label="OPEN INCIDENTS" 
            value="7" 
            trend={{ value: "-2 from yesterday", direction: "down" }}
            icon={<WarningCircle style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="MTTR" 
            value="4.2h" 
            trend={{ value: "-18% improvement", direction: "up" }}
            icon={<Clock style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="BLOCKED THREATS" 
            value="1,247" 
            trend={{ value: "+156 today", direction: "up" }}
            icon={<Shield style={{ width: 16, height: 16 }} />} 
          />
          <KpiCard 
            label="COMPLIANCE" 
            value="94%" 
            description="SOC 2 Type II"
            icon={<TrendUp style={{ width: 16, height: 16 }} />}
          >
            <Progress value={94} size="sm" variant="gradient" className="mt-2" />
          </KpiCard>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
