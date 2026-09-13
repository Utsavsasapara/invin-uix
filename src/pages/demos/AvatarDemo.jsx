import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from 'invin-uix/ui/avatar';
import { NotificationBadge } from 'invin-uix/ui/badge';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

export default function AvatarDemo() {
  return (
    <ComponentPage
      name="Avatar"
      description="User image with automatic fallback to initials. Supports 5 sizes, circle/square shapes, borders, clickable state, loading skeleton, custom fallback colors, and composable patterns (stacked groups, status badges)."
      importCode={`import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from 'invin-uix/ui/avatar';`}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with Avatar props in real-time."
        controls={[
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            default: 'md',
            options: [
              { value: 'xs', label: 'XS (24px)' },
              { value: 'sm', label: 'SM (32px)' },
              { value: 'md', label: 'MD (40px)' },
              { value: 'lg', label: 'LG (48px)' },
              { value: 'xl', label: 'XL (64px)' },
            ]
          },
          {
            name: 'shape',
            label: 'Shape',
            type: 'select',
            default: 'circle',
            options: [
              { value: 'circle', label: 'Circle' },
              { value: 'square', label: 'Square' },
            ]
          },
          { name: 'bordered', label: 'Bordered', type: 'boolean', default: false },
          { name: 'clickable', label: 'Clickable', type: 'boolean', default: false },
          { name: 'initials', label: 'Initials', type: 'text', default: 'JD' },
          { name: 'showImage', label: 'Show Image', type: 'boolean', default: true },
        ]}
      >
        {(props) => (
          <Avatar size={props.size} shape={props.shape} bordered={props.bordered} clickable={props.clickable}>
            {props.showImage && <AvatarImage src="https://i.pravatar.cc/100?u=demo" alt="Demo user" />}
            <AvatarFallback>{props.initials}</AvatarFallback>
          </Avatar>
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">Avatar</p>
        <PropsTable
          props={[
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Preset size (24px to 64px)' },
            { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Shape of the avatar' },
            { name: 'bordered', type: 'boolean', default: 'false', description: 'Add visible border around avatar' },
            { name: 'clickable', type: 'boolean', default: 'false', description: 'Add hover ring and pointer cursor for interactive avatars' },
            { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">AvatarImage</p>
        <PropsTable
          props={[
            { name: 'src', type: 'string', default: '—', description: 'Image URL' },
            { name: 'alt', type: 'string', default: '—', description: 'Alt text for accessibility' },
            { name: 'showSkeleton', type: 'boolean', default: 'false', description: 'Show pulsing skeleton while image loads' },
            { name: 'onLoadingStatusChange', type: "(status: 'loading' | 'loaded' | 'error') => void", default: '—', description: 'Callback when image loading state changes' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">AvatarFallback</p>
        <PropsTable
          props={[
            { name: 'delayMs', type: 'number', default: '0', description: 'Delay before showing fallback (prevents flash if image loads fast)' },
            { name: 'color', type: 'string', default: '—', description: 'Custom background color for fallback' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Initials, emoji, or icon to show' },
          ]}
        />
      </div>
      <div className="space-y-4">
        <p className="text-[var(--muted-foreground)] font-[600] uppercase tracking-[0.05em] text-[var(--muted-foreground-faint)]">AvatarGroup</p>
        <PropsTable
          props={[
            { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Applied to all avatars and the +N chip' },
            { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Applied to all avatars' },
            { name: 'max', type: 'number', default: '—', description: 'Show this many, collapse the rest into a +N chip' },
            { name: 'children', type: 'ReactNode', default: '—', description: 'Avatar elements' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Five presets: xs (24px), sm (32px), md (40px, default), lg (48px), xl (64px)."
        code={`<Avatar size="xs">...</Avatar>
<Avatar size="sm">...</Avatar>
<Avatar size="md">...</Avatar>
<Avatar size="lg">...</Avatar>
<Avatar size="xl">...</Avatar>`}
      >
        <div className="flex items-end gap-4">
          <Avatar size="xs"><AvatarImage src="https://i.pravatar.cc/100?u=a1" alt="User" /><AvatarFallback>XS</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=a2" alt="User" /><AvatarFallback>SM</AvatarFallback></Avatar>
          <Avatar><AvatarImage src="https://i.pravatar.cc/100?u=a3" alt="User" /><AvatarFallback>MD</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarImage src="https://i.pravatar.cc/100?u=a4" alt="User" /><AvatarFallback>LG</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarImage src="https://i.pravatar.cc/100?u=a5" alt="User" /><AvatarFallback>XL</AvatarFallback></Avatar>
        </div>
      </PlaygroundSection>

      {/* ─── Shapes ─────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Shapes"
        description="Circle (default) or square with rounded corners."
        code={`<Avatar shape="circle">...</Avatar>
<Avatar shape="square">...</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Avatar size="lg" shape="circle"><AvatarImage src="https://i.pravatar.cc/100?u=sh1" alt="User" /><AvatarFallback>CR</AvatarFallback></Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Circle</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg" shape="square"><AvatarImage src="https://i.pravatar.cc/100?u=sh2" alt="User" /><AvatarFallback>SQ</AvatarFallback></Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Square</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg" shape="circle"><AvatarFallback>JD</AvatarFallback></Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Circle fallback</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg" shape="square"><AvatarFallback>AB</AvatarFallback></Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Square fallback</p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Bordered ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Bordered"
        description="Add a visible border around the avatar for better definition on busy backgrounds."
        code={`<Avatar bordered>
  <AvatarImage src="..." alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="lg" bordered><AvatarImage src="https://i.pravatar.cc/100?u=b1" alt="User" /><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar size="lg" bordered shape="square"><AvatarImage src="https://i.pravatar.cc/100?u=b2" alt="User" /><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar size="lg" bordered><AvatarFallback>CD</AvatarFallback></Avatar>
          <Avatar size="lg" bordered shape="square"><AvatarFallback>EF</AvatarFallback></Avatar>
        </div>
      </PlaygroundSection>

      {/* ─── Clickable ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Clickable"
        description="Use the clickable prop for interactive avatars. Adds hover ring and pointer cursor automatically."
        code={`<Avatar clickable onClick={() => console.log('clicked')}>
  <AvatarImage src="..." alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar clickable onClick={() => alert('Profile clicked!')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=click1" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar size="lg" clickable onClick={() => alert('Large avatar clicked!')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=click2" alt="User" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar shape="square" clickable onClick={() => alert('Square avatar clicked!')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=click3" alt="User" />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Avatar clickable>
            <AvatarFallback>EF</AvatarFallback>
          </Avatar>
          <span className="text-[var(--muted-foreground)] text-sm">← hover and click these</span>
        </div>
      </PlaygroundSection>

      {/* ─── Loading Skeleton ───────────────────────────────────── */}
      <PlaygroundSection
        title="Loading Skeleton"
        description="Show a pulsing skeleton while the image loads. Useful for slow network conditions."
        code={`<Avatar>
  <AvatarImage src="..." alt="User" showSkeleton />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/100?u=skel1" alt="User" showSkeleton />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">With skeleton</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg" shape="square">
              <AvatarImage src="https://i.pravatar.cc/100?u=skel2" alt="User" showSkeleton />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Square with skeleton</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg">
              {/* Invalid URL to show skeleton then fallback */}
              <AvatarImage src="" alt="User" showSkeleton />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <p className="text-[10px] text-[var(--muted-foreground)]">Error → Fallback</p>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Fallbacks ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Fallbacks"
        description="When image is unavailable, the fallback shows. Use initials, emoji, or custom colors."
        code={`// Initials
<Avatar><AvatarFallback>JD</AvatarFallback></Avatar>

// Custom color
<Avatar><AvatarFallback color="var(--accent)">AB</AvatarFallback></Avatar>

// Emoji
<Avatar><AvatarFallback>🎉</AvatarFallback></Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback color="var(--accent)">CD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback color="var(--ok)">EF</AvatarFallback></Avatar>
          <Avatar><AvatarFallback color="var(--error)">GH</AvatarFallback></Avatar>
          <Avatar><AvatarFallback color="var(--info)">IJ</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>🎉</AvatarFallback></Avatar>
        </div>
      </PlaygroundSection>

      {/* ─── AvatarGroup ────────────────────────────────────────── */}
      <PlaygroundSection
        title="AvatarGroup (stacked)"
        description="AvatarGroup overlaps its children and adds the background ring. Set max to collapse into a +N chip."
        code={`<AvatarGroup size="sm" max={3}>
  <Avatar><AvatarImage src="..." /><AvatarFallback>U1</AvatarFallback></Avatar>
  <Avatar><AvatarImage src="..." /><AvatarFallback>U2</AvatarFallback></Avatar>
  ...
</AvatarGroup>

// Square shape
<AvatarGroup size="sm" shape="square" max={3}>
  ...
</AvatarGroup>`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <AvatarGroup size="sm">
              <Avatar><AvatarImage src="https://i.pravatar.cc/100?u=s1" alt="User 1" /><AvatarFallback>U1</AvatarFallback></Avatar>
              <Avatar><AvatarImage src="https://i.pravatar.cc/100?u=s2" alt="User 2" /><AvatarFallback>U2</AvatarFallback></Avatar>
              <Avatar><AvatarImage src="https://i.pravatar.cc/100?u=s3" alt="User 3" /><AvatarFallback>U3</AvatarFallback></Avatar>
            </AvatarGroup>
            <span className="text-[var(--muted-foreground)] text-sm">3 users</span>
          </div>
          <div className="flex items-center gap-4">
            <AvatarGroup size="sm" max={3}>
              {['s1','s2','s3','s4','s5','s6','s7'].map(u => (
                <Avatar key={u}><AvatarImage src={`https://i.pravatar.cc/100?u=grp${u}`} alt={u} /><AvatarFallback>{u.toUpperCase()}</AvatarFallback></Avatar>
              ))}
            </AvatarGroup>
            <span className="text-[var(--muted-foreground)] text-sm">7 users, max 3</span>
          </div>
          <div className="flex items-center gap-4">
            <AvatarGroup size="sm" shape="square" max={4}>
              {['sq1','sq2','sq3','sq4','sq5','sq6'].map(u => (
                <Avatar key={u}><AvatarImage src={`https://i.pravatar.cc/100?u=grp${u}`} alt={u} /><AvatarFallback>{u.toUpperCase()}</AvatarFallback></Avatar>
              ))}
            </AvatarGroup>
            <span className="text-[var(--muted-foreground)] text-sm">6 users, square, max 4</span>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── With Status Badge ──────────────────────────────────── */}
      <PlaygroundSection
        title="With Status Badge"
        description="Wrap an Avatar in NotificationBadge dot mode to show online/offline status."
        code={`import { NotificationBadge } from 'invin-uix/ui/badge';

<NotificationBadge dot color="var(--ok)">
  <Avatar size="sm">
    <AvatarImage src="..." />
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>
</NotificationBadge>`}
      >
        <div className="flex items-center gap-4">
          <NotificationBadge dot color="var(--ok)">
            <Avatar size="sm"><AvatarImage src="https://i.pravatar.cc/100?u=st1" alt="Sarah" /><AvatarFallback>SC</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge dot color="var(--ok)">
            <Avatar><AvatarImage src="https://i.pravatar.cc/100?u=st2" alt="John" /><AvatarFallback>JR</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge dot color="var(--degraded)">
            <Avatar size="sm"><AvatarFallback>LP</AvatarFallback></Avatar>
          </NotificationBadge>
          <NotificationBadge dot color="var(--muted-foreground-faint)">
            <Avatar size="sm" shape="square"><AvatarFallback>MC</AvatarFallback></Avatar>
          </NotificationBadge>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns in real applications.</p>
      </div>

      <PlaygroundSection
        title="User list item"
        description="Avatar + name + role in a settings or team page."
        code={`<div className="flex items-center gap-3">
  <Avatar size="sm">
    <AvatarImage src="..." alt="Sarah Connor" />
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>
  <div>
    <p className="font-medium">Sarah Connor</p>
    <p className="text-muted">Engineer</p>
  </div>
</div>`}
      >
        <Card>
          <CardContent className="py-3">
            <div className="space-y-3">
              {[
                { name: 'Sarah Connor', role: 'Engineer', img: 'u=team10', color: 'var(--accent)' },
                { name: 'John Reese', role: 'Designer', img: 'u=team11', color: 'var(--ok)' },
                { name: 'Lisa Park', role: 'Marketing', img: 'u=team12', color: 'var(--info)' },
                { name: 'Mike Chen', role: 'Product', img: 'u=team13', color: 'var(--degraded)' },
              ].map(m => (
                <div key={m.name} className="flex items-center gap-3">
                  <Avatar size="sm"><AvatarImage src={`https://i.pravatar.cc/100?${m.img}`} alt={m.name} /><AvatarFallback color={m.color}>{m.name[0]}{m.name.split(' ')[1][0]}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-[var(--foreground)] font-[500]">{m.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Comment thread"
        description="Avatar with timestamp and message body."
        code={`<div className="flex gap-3">
  <Avatar size="sm">
    <AvatarImage src="..." alt="Alice" />
    <AvatarFallback>A</AvatarFallback>
  </Avatar>
  <div>
    <span className="font-medium">Alice</span>
    <span className="text-muted">2 min ago</span>
    <p>Looks great! Ship it.</p>
  </div>
</div>`}
      >
        <Card>
          <CardContent className="py-3">
            <div className="space-y-4">
              {[
                { name: 'Alice', time: '2 min ago', msg: 'Looks great! Ship it.', img: 'u=c1' },
                { name: 'Bob', time: '5 min ago', msg: 'Can we add a hover state to the cards?', img: 'u=c2' },
                { name: 'Carol', time: '10 min ago', msg: 'Updated the token values in colour.css.', img: 'u=c3' },
              ].map(c => (
                <div key={c.name} className="flex gap-3">
                  <Avatar size="sm"><AvatarImage src={`https://i.pravatar.cc/100?${c.img}`} alt={c.name} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--foreground)] font-[500]">{c.name}</span>
                      <span className="text-[10px] text-[var(--muted-foreground-faint)]">{c.time}</span>
                    </div>
                    <p className="text-[var(--foreground)] text-[var(--muted-foreground)] mt-0.5">{c.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      <PlaygroundSection
        title="Account dropdown trigger"
        description="Clickable avatar as a trigger for a user menu. Uses the clickable prop for built-in hover state."
        code={`<Avatar size="sm" clickable onClick={() => openMenu()}>
  <AvatarImage src="..." alt="You" />
  <AvatarFallback>ME</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="sm" clickable onClick={() => alert('Open account menu')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=me" alt="You" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <Avatar clickable onClick={() => alert('Open account menu')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=me2" alt="You" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <Avatar shape="square" clickable onClick={() => alert('Open account menu')}>
            <AvatarImage src="https://i.pravatar.cc/100?u=me3" alt="You" />
            <AvatarFallback>SQ</AvatarFallback>
          </Avatar>
          <span className="text-[var(--muted-foreground)] text-sm">← hover and click</span>
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
