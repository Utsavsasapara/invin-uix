import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Combobox } from 'invin-uix/ui/combobox';
import { Badge } from 'invin-uix/ui/badge';
import { Label } from 'invin-uix/ui/label';
import { Separator } from 'invin-uix/ui/separator';
import { Users, Globe, Shield, Lightning, Database, Cloud } from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const frameworks = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue', description: 'The progressive JavaScript framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building web apps' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity' },
  { value: 'next', label: 'Next.js', description: 'The React framework for the web' },
  { value: 'nuxt', label: 'Nuxt', description: 'The intuitive Vue framework' },
  { value: 'remix', label: 'Remix', description: 'Full stack web framework' },
  { value: 'astro', label: 'Astro', description: 'The web framework for content sites' },
  { value: 'qwik', label: 'Qwik', description: 'Instant-loading web apps' },
];

const countries = [
  { value: 'us', label: 'United States', icon: <span>🇺🇸</span> },
  { value: 'uk', label: 'United Kingdom', icon: <span>🇬🇧</span> },
  { value: 'de', label: 'Germany', icon: <span>🇩🇪</span> },
  { value: 'fr', label: 'France', icon: <span>🇫🇷</span> },
  { value: 'jp', label: 'Japan', icon: <span>🇯🇵</span> },
  { value: 'in', label: 'India', icon: <span>🇮🇳</span> },
  { value: 'br', label: 'Brazil', icon: <span>🇧🇷</span> },
  { value: 'au', label: 'Australia', icon: <span>🇦🇺</span> },
  { value: 'ca', label: 'Canada', icon: <span>🇨🇦</span> },
  { value: 'sg', label: 'Singapore', icon: <span>🇸🇬</span> },
];

const integrations = [
  { value: 'slack', label: 'Slack', icon: <Cloud style={{ width: 14, height: 14 }} />, description: 'Team messaging' },
  { value: 'jira', label: 'Jira', icon: <Database style={{ width: 14, height: 14 }} />, description: 'Issue tracking' },
  { value: 'pagerduty', label: 'PagerDuty', icon: <Shield style={{ width: 14, height: 14 }} />, description: 'Incident management' },
  { value: 'datadog', label: 'Datadog', icon: <Lightning style={{ width: 14, height: 14 }} />, description: 'Monitoring & analytics' },
  { value: 'splunk', label: 'Splunk', icon: <Database style={{ width: 14, height: 14 }} />, description: 'Log management' },
  { value: 'crowdstrike', label: 'CrowdStrike', icon: <Shield style={{ width: 14, height: 14 }} />, description: 'Endpoint protection' },
  { value: 'okta', label: 'Okta', icon: <Users style={{ width: 14, height: 14 }} />, description: 'Identity provider' },
  { value: 'github', label: 'GitHub', icon: <Globe style={{ width: 14, height: 14 }} />, description: 'Code hosting' },
];

const teamMembers = [
  { value: 'alice', label: 'Alice Johnson', description: 'Security Engineer' },
  { value: 'bob', label: 'Bob Smith', description: 'SOC Analyst' },
  { value: 'carol', label: 'Carol Davis', description: 'DevOps Lead' },
  { value: 'david', label: 'David Lee', description: 'Product Manager' },
  { value: 'emma', label: 'Emma Wilson', description: 'Frontend Engineer' },
  { value: 'frank', label: 'Frank Chen', description: 'Backend Engineer' },
];

// ─── Demo ────────────────────────────────────────────────────────────────────

export default function ComboboxDemo() {
  const [single, setSingle] = useState(null);
  const [multi, setMulti] = useState([]);
  const [tags, setTags] = useState(['slack', 'github']);
  const [created, setCreated] = useState([]);
  const [asyncResults, setAsyncResults] = useState(frameworks);
  const [asyncLoading, setAsyncLoading] = useState(false);
  // State for interactive playground
  const [playgroundSingle, setPlaygroundSingle] = useState(null);
  const [playgroundMulti, setPlaygroundMulti] = useState([]);
  // State for "With icons" demo
  const [country, setCountry] = useState(null);

  const handleAsyncSearch = (query) => {
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncResults(frameworks.filter(f => f.label.toLowerCase().includes(query.toLowerCase())));
      setAsyncLoading(false);
    }, 500);
  };

  return (
    <ComponentPage
      name="Combobox"
      description="Searchable select with type-ahead filtering, keyboard navigation, single or multi-select mode, async loading, and creatable options. The power of a Select with the usability of an autocomplete."
      importCode={`import { Combobox } from 'invin-uix/ui/combobox';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Combobox Playground"
        description="Experiment with Combobox configurations."
        controls={[
          { name: 'size', type: 'select', label: 'Size', default: 'md', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
          { name: 'multiple', type: 'boolean', label: 'Multiple', default: false },
          { name: 'disabled', type: 'boolean', label: 'Disabled', default: false },
          { name: 'error', type: 'boolean', label: 'Error', default: false },
        ]}
      >
        {(props) => (
          <div className="max-w-xs">
            <Combobox
              options={frameworks.slice(0, 6)}
              size={props.size}
              multiple={props.multiple}
              disabled={props.disabled}
              error={props.error}
              placeholder="Select a framework..."
              fullWidth
              // Single mode state
              value={props.multiple ? undefined : playgroundSingle}
              onChange={props.multiple ? undefined : (v) => setPlaygroundSingle(v)}
              // Multi mode state
              values={props.multiple ? playgroundMulti : undefined}
              onValuesChange={props.multiple ? (v) => setPlaygroundMulti(v) : undefined}
            />
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'options', type: 'ComboboxOption[]', default: '[]', description: 'Available options ({value, label, description?, icon?, disabled?})' },
          { name: 'value', type: 'string | null', default: '—', description: 'Selected value (single mode)' },
          { name: 'onChange', type: '(value, option) => void', default: '—', description: 'Change callback (single mode)' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'Enable multi-select' },
          { name: 'values', type: 'string[]', default: '[]', description: 'Selected values (multi mode)' },
          { name: 'onValuesChange', type: '(values, options) => void', default: '—', description: 'Change callback (multi mode)' },
          { name: 'searchPlaceholder', type: 'string', default: "'Search...'", description: 'Search input placeholder' },
          { name: 'creatable', type: 'boolean', default: 'false', description: 'Allow creating new options' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
          { name: 'onSearch', type: '(query) => void', default: '—', description: 'Async search callback' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset' },
          { name: 'maxSelections', type: 'number', default: '—', description: 'Max items in multi mode' },
          { name: 'error', type: 'boolean', default: 'false', description: 'Error styling' },
        ]}
      />

      <Separator />

      {/* ─── Single select ────────────────────────────────────── */}
      <PlaygroundSection
        title="Single select"
        description="Basic searchable dropdown. Type to filter, arrow keys to navigate, Enter to select."
      >
        <div className="max-w-xs space-y-2">
          <Label>Framework</Label>
          <Combobox
            options={frameworks}
            value={single}
            onChange={(v) => setSingle(v)}
            placeholder="Choose a framework..."
            fullWidth
          />
          {single && <p className="text-caption text-[var(--muted-foreground)]">Selected: {single}</p>}
        </div>
      </PlaygroundSection>

      {/* ─── With icons ───────────────────────────────────────── */}
      <PlaygroundSection
        title="With icons"
        description="Options can include icons — rendered inline in both the trigger and dropdown."
      >
        <div className="max-w-xs space-y-2">
          <Label>Country</Label>
          <Combobox
            options={countries}
            placeholder="Select country..."
            fullWidth
            value={country}
            onChange={(v) => setCountry(v)}
          />
          {country && <p className="text-caption text-[var(--muted-foreground)]">Selected: {country}</p>}
        </div>
      </PlaygroundSection>

      {/* ─── Multi select ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Multi-select with tags"
        description="Select multiple items — shown as removable tags. Use Backspace to remove the last tag."
      >
        <div className="max-w-sm space-y-2">
          <Label>Assign team members</Label>
          <Combobox
            options={teamMembers}
            multiple
            values={multi}
            onValuesChange={(v) => setMulti(v)}
            placeholder="Search people..."
            fullWidth
          />
          {multi.length > 0 && (
            <p className="text-caption text-[var(--muted-foreground)]">{multi.length} selected</p>
          )}
        </div>
      </PlaygroundSection>

      {/* ─── Integrations (icons + descriptions + max) ────────── */}
      <PlaygroundSection
        title="Integrations picker (max 3)"
        description="Multi-select with icons, descriptions, and a max selection limit."
      >
        <div className="max-w-sm space-y-2">
          <Label>Connect integrations</Label>
          <Combobox
            options={integrations}
            multiple
            values={tags}
            onValuesChange={setTags}
            maxSelections={3}
            placeholder="Add integrations..."
            fullWidth
          />
          <p className="text-[10px] text-[var(--muted-foreground-faint)]">{tags.length}/3 selected</p>
        </div>
      </PlaygroundSection>

      {/* ─── Creatable ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Creatable"
        description="Type a value not in the list → option to create it appears. Great for tags and labels."
      >
        <div className="max-w-sm space-y-2">
          <Label>Tags</Label>
          <Combobox
            options={[
              ...['bug', 'feature', 'enhancement', 'documentation', 'security'].map(t => ({ value: t, label: t })),
              ...created.map(t => ({ value: t, label: t })),
            ]}
            multiple
            creatable
            onCreate={(val) => setCreated(prev => [...prev, val])}
            placeholder="Add tags..."
            fullWidth
          />
          {created.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {created.map(t => <Badge key={t} variant="secondary" size="sm">+ {t}</Badge>)}
            </div>
          )}
        </div>
      </PlaygroundSection>

      {/* ─── Async search ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Async search"
        description="Results load from an API as you type. Shows a loading spinner during fetch."
      >
        <div className="max-w-xs space-y-2">
          <Label>Search frameworks (500ms delay)</Label>
          <Combobox
            options={asyncResults}
            onSearch={handleAsyncSearch}
            loading={asyncLoading}
            placeholder="Type to search..."
            fullWidth
          />
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Three size presets: sm, md, lg."
      >
        <div className="space-y-3 max-w-xs">
          {(['sm', 'md', 'lg']).map((s) => (
            <div key={s} className="space-y-1">
              <Label className="text-[10px] uppercase text-[var(--muted-foreground-faint)]">{s}</Label>
              <Combobox
                options={frameworks.slice(0, 5)}
                size={s}
                placeholder={`Size: ${s}`}
                fullWidth
              />
            </div>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── States ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="States"
        description="Disabled and error states."
      >
        <div className="space-y-3 max-w-xs">
          <div className="space-y-1">
            <Label>Disabled</Label>
            <Combobox options={frameworks} disabled placeholder="Can't interact" fullWidth />
          </div>
          <div className="space-y-1">
            <Label>Error</Label>
            <Combobox options={frameworks} error placeholder="Selection required" fullWidth />
          </div>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
