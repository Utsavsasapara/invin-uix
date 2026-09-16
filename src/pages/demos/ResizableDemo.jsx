import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'invin-uix/ui/resizable';
import { Separator } from 'invin-uix/ui/separator';

function PanelContent({ label, className }) {
  return (
    <div className={`flex items-center justify-center h-full text-label font-[500] text-[var(--muted-foreground)] ${className || ''}`}>
      {label}
    </div>
  );
}

export default function ResizableDemo() {
  return (
    <ComponentPage
      name="Resizable Panels"
      description="Split-pane layout with draggable resize handles. Supports horizontal and vertical directions, min/max constraints, grip handles, and localStorage persistence."
      importCode={`import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from 'invin-uix/ui/resizable';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Resizable Playground"
        description="Experiment with Resizable panels."
        controls={[
          { name: 'direction', type: 'select', label: 'Direction', default: 'horizontal', options: [{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }] },
          { name: 'withHandle', type: 'boolean', label: 'With Grip Handle', default: true },
        ]}
      >
        {(props) => (
          <div className="w-full border border-[var(--border)] rounded-xl overflow-hidden h-[200px]">
            <ResizablePanelGroup direction={props.direction}>
              <ResizablePanel defaultSize={40} minSize={20}>
                <PanelContent label="Panel A (40%)" className="bg-[var(--secondary)]/50" />
              </ResizablePanel>
              <ResizableHandle withHandle={props.withHandle} />
              <ResizablePanel defaultSize={60} minSize={20}>
                <PanelContent label="Panel B (60%)" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">ResizablePanelGroup</p>
        <PropsTable
          props={[
            { name: 'direction', type: "'horizontal' | 'vertical'", default: '—', description: 'Split direction (required)' },
            { name: 'storageKey', type: 'string', default: '—', description: 'Persist sizes to localStorage' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">ResizablePanel</p>
        <PropsTable
          props={[
            { name: 'defaultSize', type: 'number (%)', default: '50', description: 'Initial size percentage' },
            { name: 'minSize', type: 'number (%)', default: '10', description: 'Minimum size percentage' },
            { name: 'maxSize', type: 'number (%)', default: '90', description: 'Maximum size percentage' },
            { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow collapsing to 0' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">ResizableHandle</p>
        <PropsTable
          props={[
            { name: 'withHandle', type: 'boolean', default: 'false', description: 'Show grip dots indicator' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable resizing' },
          ]}
        />
      </div>

      <Separator />

      {/* ─── Horizontal ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Horizontal split"
        description="Two panels side by side. Drag the handle to resize."
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[200px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={20}>
              <PanelContent label="Sidebar (35%)" className="bg-[var(--secondary)]/50" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} minSize={30}>
              <PanelContent label="Content (65%)" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PlaygroundSection>

      {/* ─── Vertical ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Vertical split"
        description="Stacked panels — drag the handle up/down."
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[300px]">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40} minSize={15}>
              <PanelContent label="Top panel (40%)" className="bg-[var(--secondary)]/50" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} minSize={20}>
              <PanelContent label="Bottom panel (60%)" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PlaygroundSection>

      {/* ─── Three panels ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Three panels"
        description="Multiple panels with independent resize handles."
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[200px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={10} maxSize={40}>
              <PanelContent label="Nav" className="bg-[var(--secondary)]/50" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={55} minSize={25}>
              <PanelContent label="Main Content" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
              <PanelContent label="Details" className="bg-[var(--secondary)]/50" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PlaygroundSection>

      {/* ─── Nested ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Nested layout"
        description="Combine horizontal and vertical splits for complex layouts (e.g. IDE-style)."
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[320px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <PanelContent label="Explorer" className="bg-[var(--secondary)]/50" />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                  <PanelContent label="Editor" />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={15}>
                  <PanelContent label="Terminal" className="bg-[var(--secondary)]/50" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PlaygroundSection>

      {/* ─── With real content ────────────────────────────────── */}
      <PlaygroundSection
        title="Email client layout"
        description="A realistic use case — inbox list on the left, message preview on the right."
      >
        <div className="border border-[var(--border)] rounded-xl overflow-hidden h-[280px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <div className="h-full overflow-auto p-3 space-y-1">
                {['Security Alert: Failed login attempt', 'Weekly digest — Jul 8–12', 'Invoice #INV-2847 paid', 'New team member: Carol D.', 'Scan report ready', 'Compliance audit reminder'].map((subject, i) => (
                  <div key={i} className={`px-3 py-2 rounded-md cursor-pointer text-label transition-colors ${i === 0 ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'hover:bg-[var(--secondary)] text-[var(--muted-foreground)]'}`}>
                    <p className="font-[500] truncate">{subject}</p>
                    <p className="text-[10px] text-[var(--muted-foreground-faint)] mt-0.5">Jul {12 - i}</p>
                  </div>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65} minSize={35}>
              <div className="h-full p-4 space-y-3">
                <h3 className="text-label font-[600]">Security Alert: Failed login attempt</h3>
                <p className="text-caption text-[var(--muted-foreground)]">From: system@invin.io · Jul 12, 09:45 AM</p>
                <p className="text-label text-[var(--muted-foreground)] leading-relaxed">
                  A failed login attempt was detected from IP 192.168.1.45. The account was temporarily locked after 5 consecutive failures. Please review the audit log for details.
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
