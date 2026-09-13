import { useState, useEffect } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Progress, CircularProgress, SemiCircleProgress } from 'invin-uix/ui/progress';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';

export default function ProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-increment for live demos
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 2);
      setBuffer(prev => Math.min(100, prev >= 100 ? 20 : prev + 3));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  // Simulate file upload
  const startUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsUploading(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <ComponentPage
      name="Progress"
      description="Linear, circular, and semi-circle progress indicators with indeterminate mode, value labels, stripes, and buffer support. Built on Radix UI Progress primitive."
      importCode={`import { Progress, CircularProgress, SemiCircleProgress } from 'invin-uix/ui/progress';`}
    >
      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Progress Playground"
        description="Experiment with different progress bar configurations."
        controls={[
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'default',
            options: [
              { value: 'default', label: 'Default (accent)' },
              { value: 'success', label: 'Success (green)' },
              { value: 'warning', label: 'Warning (amber)' },
              { value: 'destructive', label: 'Destructive (red)' },
              { value: 'info', label: 'Info (blue)' },
            ],
          },
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'xs', label: 'XS (4px)' },
              { value: 'sm', label: 'SM (6px)' },
              { value: 'md', label: 'MD (8px)' },
              { value: 'lg', label: 'LG (12px)' },
              { value: 'xl', label: 'XL (16px)' },
            ],
          },
          { name: 'value', type: 'number', label: 'Value', default: 65, min: 0, max: 100 },
          { name: 'showValue', type: 'boolean', label: 'Show Value', default: false },
          { name: 'striped', type: 'boolean', label: 'Striped', default: false },
          { name: 'animated', type: 'boolean', label: 'Animated Stripes', default: false },
          { name: 'indeterminate', type: 'boolean', label: 'Indeterminate', default: false },
        ]}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <Progress
              value={props.indeterminate ? undefined : props.value}
              size={props.size}
              variant={props.variant}
              showValue={props.showValue}
              striped={props.striped}
              animated={props.animated}
              indeterminate={props.indeterminate}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'number (0–100)', default: '0', description: 'Current progress percentage' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Bar height' },
          { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: 'Fill colour' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Enable indeterminate animation for unknown duration' },
          { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage label' },
          { name: 'labelPosition', type: "'inside' | 'right' | 'top'", default: "'right'", description: 'Position of value label' },
          { name: 'formatValue', type: '(value) => string', default: 'v => `${v}%`', description: 'Custom value formatter' },
          { name: 'striped', type: 'boolean', default: 'false', description: 'Add diagonal stripes' },
          { name: 'animated', type: 'boolean', default: 'false', description: 'Animate stripes (requires striped)' },
          { name: 'bufferValue', type: 'number', default: '—', description: 'Buffer/secondary indicator (0-100)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="5 size variants from xs (4px) to xl (16px). Use xs for inline indicators, xl for prominent progress."
        code={`<Progress value={60} size="xs" />
<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />
<Progress value={60} size="xl" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">XS (4px)</p>
            <Progress value={60} size="xs" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">SM (6px)</p>
            <Progress value={60} size="sm" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">MD (8px) — default</p>
            <Progress value={60} size="md" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">LG (12px)</p>
            <Progress value={60} size="lg" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">XL (16px)</p>
            <Progress value={60} size="xl" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Colour variants"
        description="Semantic colours for different states: success for completed tasks, warning for approaching limits, destructive for critical states."
        code={`<Progress value={80} variant="default" />
<Progress value={80} variant="success" />
<Progress value={50} variant="warning" />
<Progress value={30} variant="destructive" />
<Progress value={60} variant="info" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Default (accent)</p>
            <Progress value={80} variant="default" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Success — completed tasks, healthy status</p>
            <Progress value={80} variant="success" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Warning — approaching limit, needs attention</p>
            <Progress value={75} variant="warning" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Destructive — critical, over limit</p>
            <Progress value={90} variant="destructive" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Info — neutral information</p>
            <Progress value={60} variant="info" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Indeterminate Mode ─────────────────────────────────── */}
      <PlaygroundSection
        title="Indeterminate mode"
        description="For tasks with unknown duration — page loads, API calls, form submissions. The bar animates continuously."
        code={`<Progress indeterminate />
<Progress indeterminate variant="success" />
<Progress indeterminate size="lg" variant="info" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Default — loading page content</p>
            <Progress indeterminate />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Success — processing complete soon</p>
            <Progress indeterminate variant="success" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Large info — fetching data</p>
            <Progress indeterminate size="lg" variant="info" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Show Value Labels ──────────────────────────────────── */}
      <PlaygroundSection
        title="Value labels"
        description="Display the percentage with different positions. Use 'top' for forms, 'right' for inline, 'inside' for prominent bars."
        code={`<Progress value={65} showValue />
<Progress value={42} showValue labelPosition="top" />
<Progress value={78} showValue labelPosition="inside" size="xl" />
<Progress value={72} showValue formatValue={(v) => \`\${(v / 100 * 10).toFixed(1)} GB\`} />`}
      >
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Right (default)</p>
            <Progress value={65} showValue />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Top — with label above</p>
            <Progress value={42} showValue labelPosition="top" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Inside — embedded in bar</p>
            <Progress value={78} showValue labelPosition="inside" size="xl" variant="success" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Custom formatter — show as GB</p>
            <Progress 
              value={72} 
              showValue 
              formatValue={(v) => `${(v / 100 * 10).toFixed(1)} GB`}
            />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Striped & Animated ─────────────────────────────────── */}
      <PlaygroundSection
        title="Striped & animated"
        description="Striped pattern shows active processes. Animated stripes indicate ongoing activity like file uploads or data sync."
        code={`<Progress value={65} striped size="lg" />
<Progress value={65} striped animated size="lg" />
<Progress value={80} striped animated variant="success" size="lg" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Static stripes</p>
            <Progress value={65} striped size="lg" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Animated stripes — active upload/process</p>
            <Progress value={65} striped animated size="lg" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Success with animated stripes</p>
            <Progress value={80} striped animated variant="success" size="lg" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Warning with animated stripes</p>
            <Progress value={50} striped animated variant="warning" size="lg" />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Buffer Indicator ──────────────────────────────────── */}
      <PlaygroundSection
        title="Buffer indicator"
        description="Shows buffered content for video playback or streaming downloads. The faded portion indicates buffered data."
        code={`<Progress value={progress} bufferValue={buffer} size="sm" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em]">Video playback — played vs buffered</p>
            <div className="flex justify-between text-[length:var(--text-caption)] text-[var(--muted-foreground)] mb-1">
              <span>Playing: {Math.round(progress)}%</span>
              <span>Buffered: {Math.round(buffer)}%</span>
            </div>
            <Progress value={progress} bufferValue={buffer} size="sm" />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Circular Progress Section ──────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Circular Progress</h3>
        <p className="text-[var(--muted-foreground)]">Ring/donut style for dashboards, stats, and loading spinners.</p>
      </div>

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">CircularProgress Props</h4>
        <PropsTable
          props={[
            { name: 'value', type: 'number (0–100)', default: '0', description: 'Current progress percentage' },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Circle size (20px to 72px)' },
            { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: 'Stroke colour' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Enable spinning animation' },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage in center' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Custom center content' },
          ]}
        />
      </div>

      {/* ─── Circular Sizes ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Circular sizes"
        description="5 sizes from xs (20px) to xl (72px). Use xs in buttons, md for cards, xl for dashboards."
        code={`<CircularProgress value={60} size="xs" />
<CircularProgress value={60} size="md" />
<CircularProgress value={60} size="xl" />`}
      >
        <div className="flex items-end gap-6">
          {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
            <div key={s} className="text-center">
              <CircularProgress value={60} size={s} />
              <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">{s}</p>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Circular Variants ──────────────────────────────────── */}
      <PlaygroundSection
        title="Circular variants"
        description="All colour variants with value display."
        code={`<CircularProgress value={70} variant="success" showValue size="lg" />`}
      >
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-center">
            <CircularProgress value={70} size="lg" variant="default" showValue />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">Default</p>
          </div>
          <div className="text-center">
            <CircularProgress value={85} size="lg" variant="success" showValue />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">Success</p>
          </div>
          <div className="text-center">
            <CircularProgress value={65} size="lg" variant="warning" showValue />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">Warning</p>
          </div>
          <div className="text-center">
            <CircularProgress value={45} size="lg" variant="destructive" showValue />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">Destructive</p>
          </div>
          <div className="text-center">
            <CircularProgress value={55} size="lg" variant="info" showValue />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">Info</p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Circular Indeterminate ─────────────────────────────── */}
      <PlaygroundSection
        title="Circular indeterminate (spinner)"
        description="Loading spinner for buttons, cards, and page sections. Spins continuously."
        code={`<CircularProgress indeterminate size="sm" />
<CircularProgress indeterminate size="lg" variant="success" />`}
      >
        <div className="flex items-center gap-6">
          <div className="text-center">
            <CircularProgress indeterminate size="xs" />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">XS</p>
          </div>
          <div className="text-center">
            <CircularProgress indeterminate size="sm" />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">SM</p>
          </div>
          <div className="text-center">
            <CircularProgress indeterminate size="md" variant="info" />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">MD info</p>
          </div>
          <div className="text-center">
            <CircularProgress indeterminate size="lg" variant="success" />
            <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-2 uppercase tracking-[0.05em]">LG success</p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Circular with Children ─────────────────────────────── */}
      <PlaygroundSection
        title="Custom center content"
        description="Render custom content in the center for dashboard widgets, KPI displays, or status indicators."
        code={`<CircularProgress value={72} size="xl" variant="warning">
  <div className="text-center">
    <p className="text-lg font-bold">72%</p>
    <p className="text-xs text-muted">Used</p>
  </div>
</CircularProgress>`}
      >
        <div className="flex items-center gap-8 flex-wrap">
          <CircularProgress value={72} size="xl" variant="warning">
            <div className="text-center">
              <p className="text-lg font-bold">72%</p>
              <p className="text-[10px] text-[var(--muted-foreground)]">Storage</p>
            </div>
          </CircularProgress>
          <CircularProgress value={92} size="xl" variant="success">
            <div className="text-center">
              <p className="text-lg font-bold">92</p>
              <p className="text-[10px] text-[var(--muted-foreground)]">Score</p>
            </div>
          </CircularProgress>
          <CircularProgress value={progress} size="xl" variant="info">
            <div className="text-center">
              <p className="text-lg font-bold">{Math.round(progress)}%</p>
              <p className="text-[10px] text-[var(--muted-foreground)]">Syncing</p>
            </div>
          </CircularProgress>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Semi-Circle Progress Section ───────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Semi-Circle Progress (Gauge)</h3>
        <p className="text-[var(--muted-foreground)]">Half-circle gauges for speedometers, CPU usage, and KPI widgets.</p>
      </div>

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">SemiCircleProgress Props</h4>
        <PropsTable
          props={[
            { name: 'value', type: 'number (0–100)', default: '0', description: 'Current progress percentage' },
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Gauge size (60px to 200px width)' },
            { name: 'variant', type: "'default' | 'success' | 'warning' | 'destructive' | 'info'", default: "'default'", description: 'Stroke colour' },
            { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage in center' },
            { name: 'label', type: 'string', default: '—', description: 'Label below the gauge' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Custom center content' },
          ]}
        />
      </div>

      {/* ─── Semi-Circle Sizes ──────────────────────────────────── */}
      <PlaygroundSection
        title="Semi-circle sizes"
        description="5 sizes from xs (60px) to xl (200px). Use smaller sizes for cards, larger for dashboards."
        code={`<SemiCircleProgress value={75} size="xs" showValue />
<SemiCircleProgress value={75} size="md" showValue />
<SemiCircleProgress value={75} size="xl" showValue />`}
      >
        <div className="flex items-end gap-6 flex-wrap">
          {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => (
            <div key={s} className="text-center">
              <SemiCircleProgress value={75} size={s} showValue />
              <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-1 uppercase tracking-[0.05em]">{s}</p>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Semi-Circle Variants ───────────────────────────────── */}
      <PlaygroundSection
        title="Semi-circle variants"
        description="All colour variants with labels for clear context."
        code={`<SemiCircleProgress value={80} variant="success" showValue label="Health" />`}
      >
        <div className="flex items-center gap-6 flex-wrap">
          <SemiCircleProgress value={70} variant="default" showValue label="Default" />
          <SemiCircleProgress value={92} variant="success" showValue label="Healthy" />
          <SemiCircleProgress value={68} variant="warning" showValue label="Warning" />
          <SemiCircleProgress value={35} variant="destructive" showValue label="Critical" />
          <SemiCircleProgress value={55} variant="info" showValue label="Info" />
        </div>
      </PlaygroundSection>

      {/* ─── Semi-Circle with Custom Content ────────────────────── */}
      <PlaygroundSection
        title="Gauge with custom content"
        description="Render custom values for speedometers, resource usage, or score displays."
        code={`<SemiCircleProgress value={72} size="lg" variant="warning" label="CPU Usage">
  <span className="text-xl font-bold">72%</span>
</SemiCircleProgress>`}
      >
        <div className="flex items-center gap-8 flex-wrap">
          <SemiCircleProgress value={72} size="lg" variant="warning" label="CPU Usage">
            <span className="text-xl font-bold">72%</span>
          </SemiCircleProgress>
          <SemiCircleProgress value={45} size="lg" variant="success" label="Memory">
            <span className="text-xl font-bold">4.5 GB</span>
          </SemiCircleProgress>
          <SemiCircleProgress value={progress} size="lg" variant="info" label="Speed">
            <span className="text-xl font-bold">{Math.round(progress * 1.2)}</span>
          </SemiCircleProgress>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--muted-foreground)]">Common real-world patterns.</p>
      </div>

      <PlaygroundSection
        title="File upload"
        description="Animated striped bar shows active upload progress. Variant changes to success on completion."
        code={`<Progress 
  value={uploadProgress} 
  striped={isUploading && uploadProgress < 100}
  animated={isUploading && uploadProgress < 100}
  variant={uploadProgress >= 100 ? 'success' : 'default'}
  showValue
  size="lg"
/>`}
      >
        <Card className="w-full max-w-sm">
          <CardContent className="py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[500]">quarterly-report.pdf</p>
                <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)]">
                  {isUploading ? `${(uploadProgress / 100 * 3.8).toFixed(1)} MB / 3.8 MB` : 'Ready to upload'}
                </p>
              </div>
              <Badge variant={uploadProgress >= 100 ? 'success' : isUploading ? 'default' : 'outline'}>
                {uploadProgress >= 100 ? 'Complete' : isUploading ? 'Uploading' : 'Pending'}
              </Badge>
            </div>
            <Progress 
              value={uploadProgress} 
              striped={isUploading && uploadProgress < 100}
              animated={isUploading && uploadProgress < 100}
              variant={uploadProgress >= 100 ? 'success' : 'default'}
              showValue
              size="lg"
            />
            {!isUploading && uploadProgress < 100 && (
              <Button size="sm" onClick={startUpload}>Start Upload</Button>
            )}
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Project task dashboard"
        description="Multiple tasks with semantic colours showing completion status."
        code={`{tasks.map(t => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <span>{t.label}</span>
      <span>{t.value}%</span>
    </div>
    <Progress value={t.value} variant={t.variant} size="sm" />
  </div>
))}`}
      >
        <Card className="w-full max-w-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Q3 Security Initiatives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Vulnerability remediation', value: 100, variant: 'success' },
              { label: 'Compliance audit', value: 85, variant: 'success' },
              { label: 'Penetration testing', value: 60, variant: 'default' },
              { label: 'Security training', value: 35, variant: 'warning' },
              { label: 'Incident response plan', value: 15, variant: 'destructive' },
            ].map(t => (
              <div key={t.label} className="space-y-1">
                <div className="flex justify-between text-[length:var(--text-caption)]">
                  <span>{t.label}</span>
                  <span className="text-[var(--muted-foreground)] tabular-nums">{t.value}%</span>
                </div>
                <Progress value={t.value} variant={t.variant} size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Storage quota widget"
        description="Circular progress showing capacity usage with warning threshold."
        code={`<CircularProgress value={78} size="xl" variant="warning">
  <div className="text-center">
    <p className="text-2xl font-bold">7.8</p>
    <p className="text-xs">GB used</p>
  </div>
</CircularProgress>`}
      >
        <div className="flex gap-6 flex-wrap">
          <Card className="w-full max-w-xs">
            <CardContent className="py-6 flex flex-col items-center gap-4">
              <CircularProgress value={78} size="xl" variant="warning">
                <div className="text-center">
                  <p className="text-2xl font-bold">7.8</p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">GB used</p>
                </div>
              </CircularProgress>
              <div className="text-center">
                <p className="font-[500]">Cloud Storage</p>
                <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)]">7.8 GB of 10 GB used</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full max-w-xs">
            <CardContent className="py-6 flex flex-col items-center gap-4">
              <SemiCircleProgress value={45} size="lg" variant="success" label="API Calls">
                <div className="text-center">
                  <span className="text-xl font-bold">45</span>
                </div>
              </SemiCircleProgress>
              <div className="text-center">
                <p className="font-[500]">Daily API Limit</p>
                <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)]">45 of 100 calls used</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="System monitor dashboard"
        description="Multiple semi-circle gauges for server monitoring or system performance."
        code={`<SemiCircleProgress value={72} size="md" variant="warning" label="CPU">
  <span className="text-lg font-bold">72%</span>
</SemiCircleProgress>`}
      >
        <div className="flex gap-4 flex-wrap">
          <Card className="flex-1 min-w-[140px]">
            <CardContent className="py-4 flex flex-col items-center">
              <SemiCircleProgress value={72} size="md" variant="warning">
                <span className="text-lg font-bold">72%</span>
              </SemiCircleProgress>
              <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)] mt-1">CPU</p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[140px]">
            <CardContent className="py-4 flex flex-col items-center">
              <SemiCircleProgress value={45} size="md" variant="success">
                <span className="text-lg font-bold">45%</span>
              </SemiCircleProgress>
              <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)] mt-1">Memory</p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[140px]">
            <CardContent className="py-4 flex flex-col items-center">
              <SemiCircleProgress value={88} size="md" variant="destructive">
                <span className="text-lg font-bold">88%</span>
              </SemiCircleProgress>
              <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)] mt-1">Disk</p>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[140px]">
            <CardContent className="py-4 flex flex-col items-center">
              <SemiCircleProgress value={23} size="md" variant="info">
                <span className="text-lg font-bold">23%</span>
              </SemiCircleProgress>
              <p className="text-[length:var(--text-caption)] text-[var(--muted-foreground)] mt-1">Network</p>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
