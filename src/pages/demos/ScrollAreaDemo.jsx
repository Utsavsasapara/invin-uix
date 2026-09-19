import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { ScrollArea, ScrollBar } from 'invin-uix/ui/scroll-area';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

const tags = Array.from({ length: 50 }, (_, i) => `tag-${String(i + 1).padStart(3, '0')}`);
const auditLogs = [
  { time: '09:45:12', user: 'admin@invin.io', action: 'Updated firewall rule', resource: 'FW-RULE-042' },
  { time: '09:43:08', user: 'ops@invin.io', action: 'Created new integration', resource: 'INT-SLACK-01' },
  { time: '09:40:55', user: 'admin@invin.io', action: 'Revoked API key', resource: 'KEY-8f2a1b' },
  { time: '09:38:22', user: 'analyst@invin.io', action: 'Exported report', resource: 'RPT-Q3-2024' },
  { time: '09:35:10', user: 'admin@invin.io', action: 'Modified user role', resource: 'USR-carol' },
  { time: '09:32:47', user: 'ops@invin.io', action: 'Deployed workflow', resource: 'WF-incident-triage' },
  { time: '09:30:01', user: 'system', action: 'Automated scan completed', resource: 'SCAN-daily-001' },
  { time: '09:28:15', user: 'analyst@invin.io', action: 'Closed incident', resource: 'INC-2847' },
  { time: '09:25:33', user: 'admin@invin.io', action: 'Added user to group', resource: 'GRP-soc-team' },
  { time: '09:22:08', user: 'ops@invin.io', action: 'Updated credentials', resource: 'CRED-aws-prod' },
  { time: '09:18:44', user: 'system', action: 'Certificate renewed', resource: 'CERT-api.invin.io' },
  { time: '09:15:20', user: 'admin@invin.io', action: 'Changed org settings', resource: 'ORG-main' },
];

export default function ScrollAreaDemo() {
  return (
    <ComponentPage
      name="Scroll Area"
      description="Custom-styled scrollable container with thin, auto-hiding scrollbars that match the design system. Works for both vertical and horizontal overflow."
      importCode={`import { ScrollArea, ScrollBar } from 'invin-uix/ui/scroll-area';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Scroll Area Playground"
        description="Experiment with different scroll area configurations."
        controls={[
          { name: 'height', type: 'number', label: 'Height (px)', default: 200, min: 100, max: 400 },
          { name: 'itemCount', type: 'number', label: 'Item Count', default: 15, min: 5, max: 30 },
        ]}
      >
        {(props) => (
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="w-full" style={{ height: props.height }}>
                <div className="p-4 space-y-2">
                  {Array.from({ length: props.itemCount }, (_, i) => (
                    <div key={i} className="py-2 px-3 rounded-md border border-[var(--border)] text-[var(--foreground)]">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'className', type: 'string', default: '—', description: 'Additional CSS classes' },
          { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'ScrollBar orientation' },
        ]}
      />

      <Separator />

      {/* ─── Vertical scroll ──────────────────────────────────── */}
      <PlaygroundSection
        title="Vertical scroll"
        description="A fixed-height container with vertical scrollbar — ideal for lists, logs, and feeds."
        code={`import { ScrollArea } from 'invin-uix/ui/scroll-area';

<ScrollArea className="h-[280px] w-full">
  <div className="p-4">
    <p className="font-semibold mb-3">Audit Log</p>
    <div className="space-y-2">
      {auditLogs.map((log, i) => (
        <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--border)]">
          <span className="text-[10px] font-mono text-[var(--muted-foreground)]">{log.time}</span>
          <div className="flex-1">
            <p className="text-label">{log.action}</p>
            <p className="text-caption text-[var(--muted-foreground)]">{log.user}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</ScrollArea>`}
      >
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[280px] w-full">
              <div className="p-4">
                <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)] mb-3">Audit Log</p>
                <div className="space-y-2">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
                      <span className="text-[10px] font-mono text-[var(--muted-foreground-faint)] shrink-0 mt-0.5">{log.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-label">{log.action}</p>
                        <p className="text-caption text-[var(--muted-foreground)]">{log.user} · {log.resource}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Horizontal scroll ────────────────────────────────── */}
      <PlaygroundSection
        title="Horizontal scroll"
        description="Horizontal overflow for tag lists, image galleries, or wide content."
        code={`import { ScrollArea, ScrollBar } from 'invin-uix/ui/scroll-area';
import { Badge } from 'invin-uix/ui/badge';

<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex gap-2 p-4">
    {tags.map((tag) => (
      <Badge key={tag} variant="secondary" size="sm" className="shrink-0">
        {tag}
      </Badge>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 p-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm" className="shrink-0">{tag}</Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Both directions ──────────────────────────────────── */}
      <PlaygroundSection
        title="Both directions"
        description="Scroll in both axes — useful for code blocks or data grids."
        code={`import { ScrollArea, ScrollBar } from 'invin-uix/ui/scroll-area';

<ScrollArea className="h-[200px] w-full">
  <div className="p-4 w-[800px]">
    <pre className="text-caption font-mono text-[var(--muted-foreground)] leading-relaxed">
      {codeContent}
    </pre>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[200px] w-full">
              <div className="p-4 w-[800px]">
                <pre className="text-caption font-mono text-[var(--muted-foreground)] leading-relaxed">{`// Example: large code block that overflows both axes
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: 'react-remove-scroll', replacement: path.join(libNodeModules, 'react-remove-scroll') },
      { find: 'react-remove-scroll-bar', replacement: path.join(libNodeModules, 'react-remove-scroll-bar') },
      { find: 'use-callback-ref', replacement: path.join(libNodeModules, 'use-callback-ref') },
    ],
  },
  server: {
    fs: { allow: ['.', '../../Invin-ui/invin-ui-poc'] },
    port: 5173,
    strictPort: true,
    hmr: { overlay: true },
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: { external: ['react', 'react-dom'] },
  },
});`}</pre>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
