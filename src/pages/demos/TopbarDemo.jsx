import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Topbar } from 'invin-uix/ui/topbar';
import { Button } from 'invin-uix/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from 'invin-uix/ui/avatar';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { Bell, MagnifyingGlass, Gear, List } from 'invin-uix/ui/icons';

export default function TopbarDemo() {
  return (
    <ComponentPage
      name="Topbar"
      description="Sticky header with glassmorphism background, backdrop blur, and left/center/right content slots. Uses topbar-specific tokens for height, background, and blur."
      importCode={`import { Topbar } from 'invin-uix/ui/topbar';`}
    >
      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Topbar Playground"
        description="Experiment with Topbar layouts."
        controls={[]}
      >
        {() => (
          <div className="w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
            <Topbar className="!sticky !relative"
              left={<span className="text-[var(--foreground)] font-[700]">Invinsense</span>}
              right={
                <>
                  <Button variant="ghost" size="icon-sm"><Bell style={{ width: 16, height: 16 }} /></Button>
                  <Avatar size="sm"><AvatarFallback>U</AvatarFallback></Avatar>
                </>
              }
            />
          </div>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'left', type: 'ReactNode', default: '—', description: 'Content aligned to the left (title, breadcrumb)' },
          { name: 'center', type: 'ReactNode', default: '—', description: 'Content centered absolutely (search bar)' },
          { name: 'right', type: 'ReactNode', default: '—', description: 'Content aligned to the right (actions, avatar)' },
          { name: 'children', type: 'ReactNode', default: '—', description: 'Falls into right slot if no right prop provided' },
          { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
        ]}
      />

      <Separator variant="bold" />
      <PlaygroundSection
        title="Basic — Right Slot (default)"
        description="Children go to the right slot by default. Useful for action buttons."
        code={`<Topbar>
  <Button variant="ghost" size="icon-sm"><MagnifyingGlass /></Button>
  <Button variant="ghost" size="icon-sm"><Bell /></Button>
  <Avatar size="sm"><AvatarFallback>U</AvatarFallback></Avatar>
</Topbar>`}
      >
        <div className="w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
          <Topbar className="!sticky !relative">
            <Button variant="ghost" size="icon-sm"><MagnifyingGlass style={{ width: 16, height: 16 }} /></Button>
            <Button variant="ghost" size="icon-sm"><Bell style={{ width: 16, height: 16 }} /></Button>
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=topbar" /><AvatarFallback>U</AvatarFallback></Avatar>
          </Topbar>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Left + Right"
        description="Title on the left, actions on the right."
        code={`<Topbar
  left={<h1 className="text-page-title">Dashboard</h1>}
  right={
    <>
      <Button variant="outline" size="sm">Export</Button>
      <Button size="sm">New Project</Button>
    </>
  }
/>`}
      >
        <div className="w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
          <Topbar className="!sticky !relative"
            left={<h1 className="text-[var(--foreground)] font-[700] tracking-[-0.02em]">Dashboard</h1>}
            right={
              <>
                <Button variant="outline" size="sm">Export</Button>
                <Button size="sm">New Project</Button>
              </>
            }
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Left + Center + Right"
        description="Three content zones: branding left, search center, user right."
        code={`<Topbar
  left={<span className="font-bold">Invin</span>}
  center={
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] text-label">
      <MagnifyingGlass /> Search...
    </div>
  }
  right={
    <>
      <Badge count={3}><Button variant="ghost" size="icon-sm"><Bell /></Button></Badge>
      <Avatar size="sm"><AvatarFallback>U</AvatarFallback></Avatar>
    </>
  }
/>`}
      >
        <div className="w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
          <Topbar className="!sticky !relative"
            left={<span className="text-[var(--foreground)] font-[700]">Invin</span>}
            center={
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] text-[var(--muted-foreground)] cursor-pointer hover:bg-[var(--secondary)]">
                <MagnifyingGlass style={{ width: 14, height: 14 }} /> Search...
              </div>
            }
            right={
              <>
                <Badge count={3} size="sm">
                  <Button variant="ghost" size="icon-sm"><Bell style={{ width: 16, height: 16 }} /></Button>
                </Badge>
                <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=topbar2" /><AvatarFallback>U</AvatarFallback></Avatar>
              </>
            }
          />
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="With Mobile List Trigger"
        description="Common pattern: hamburger menu on left for mobile, title + actions."
        code={`<Topbar
  left={
    <>
      <Button variant="ghost" size="icon-sm" className="lg:hidden"><List /></Button>
      <h1 className="text-page-title">Settings</h1>
    </>
  }
  right={
    <Button variant="ghost" size="icon-sm"><Gear /></Button>
  }
/>`}
      >
        <div className="w-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)]">
          <Topbar className="!sticky !relative"
            left={
              <>
                <Button variant="ghost" size="icon-sm"><List style={{ width: 16, height: 16 }} /></Button>
                <h1 className="text-[var(--foreground)] font-[700] tracking-[-0.02em]">Settings</h1>
              </>
            }
            right={
              <Button variant="ghost" size="icon-sm"><Gear style={{ width: 16, height: 16 }} /></Button>
            }
          />
        </div>
      </PlaygroundSection>
    </ComponentPage>
  );
}
