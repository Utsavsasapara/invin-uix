import { ComponentPage, PlaygroundSection, InteractiveDemo, PropsTable } from '../../components/PlaygroundSection.jsx';
import { HoverCard, HoverCardTrigger, HoverCardContent } from 'invin-uix/ui/hover-card';
import { Avatar, AvatarImage, AvatarFallback } from 'invin-uix/ui/avatar';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';
import { Calendar, MapPin, Link, FileText, Package, Star, Clock, Users } from 'invin-uix/ui/icons';

export default function HoverCardDemo() {
  return (
    <ComponentPage
      name="Hover Card"
      description="A floating card that appears when hovering over a trigger element. Ideal for previewing user profiles, link descriptions, product details, or any supplementary content."
      importCode={`import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow } from 'invin-uix/ui/hover-card';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Hover Card Playground"
        description="Hover over the trigger to see the card. Adjust settings to customize behavior."
        controls={[
          {
            name: 'size',
            type: 'select',
            label: 'Size',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small (192px)' },
              { value: 'md', label: 'Medium (256px)' },
              { value: 'lg', label: 'Large (320px)' },
              { value: 'xl', label: 'Extra Large (384px)' },
            ],
          },
          {
            name: 'side',
            type: 'select',
            label: 'Side',
            default: 'bottom',
            options: [
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            label: 'Align',
            default: 'center',
            options: [
              { value: 'start', label: 'Start' },
              { value: 'center', label: 'Center' },
              { value: 'end', label: 'End' },
            ],
          },
          {
            name: 'showArrow',
            type: 'boolean',
            label: 'Show Arrow',
            default: true,
          },
        ]}
      >
        {(props) => (
          <div className="flex items-center justify-center p-12">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Hover over me</Button>
              </HoverCardTrigger>
              <HoverCardContent 
                size={props.size} 
                side={props.side} 
                align={props.align}
                showArrow={props.showArrow}
              >
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/100?u=demo" />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-label font-semibold">Demo User</h4>
                    <p className="text-caption text-muted-foreground">This is a hover card preview with customizable size and position.</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Badge variant="secondary" size="sm">Preview</Badge>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
      </InteractiveDemo>

      {/* ─── Props Tables ─────────────────────────────────────────── */}
      <PropsTable
        title="HoverCard Props"
        description="Root component that manages hover state."
        props={[
          { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state' },
          { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state (uncontrolled)' },
          { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback when open state changes' },
          { name: 'openDelay', type: 'number', default: '700', description: 'Delay in ms before opening' },
          { name: 'closeDelay', type: 'number', default: '300', description: 'Delay in ms before closing' },
        ]}
      />

      <PropsTable
        title="HoverCardContent Props"
        description="The floating content panel."
        props={[
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Width preset (192px, 256px, 320px, 384px)' },
          { name: 'showArrow', type: 'boolean', default: 'false', description: 'Show arrow pointer' },
          { name: 'width', type: 'string | number', default: '—', description: 'Custom width (overrides size)' },
          { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", description: 'Preferred side' },
          { name: 'sideOffset', type: 'number', default: '4', description: 'Distance from trigger (px)' },
          { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment along side' },
          { name: 'avoidCollisions', type: 'boolean', default: 'true', description: 'Flip/shift to stay visible' },
        ]}
      />

      <Separator variant="bold" className="my-8" />

      {/* ─── Size Variants ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Size Variants"
        description="Four size presets for different content amounts."
        code={`<HoverCardContent size="sm">Small</HoverCardContent>
<HoverCardContent size="md">Medium (default)</HoverCardContent>
<HoverCardContent size="lg">Large</HoverCardContent>
<HoverCardContent size="xl">Extra Large</HoverCardContent>`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          {['sm', 'md', 'lg', 'xl'].map((size) => (
            <HoverCard key={size}>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="sm">{size.toUpperCase()}</Button>
              </HoverCardTrigger>
              <HoverCardContent size={size} showArrow>
                <p className="text-label font-medium mb-1">Size: {size}</p>
                <p className="text-caption text-muted-foreground">
                  {size === 'sm' && 'Compact card for brief content (192px)'}
                  {size === 'md' && 'Default size for most use cases (256px)'}
                  {size === 'lg' && 'Larger card for detailed content (320px)'}
                  {size === 'xl' && 'Extra wide for images and rich content (384px)'}
                </p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Arrow Options ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Arrow Pointer"
        description="Add a visual pointer connecting the card to its trigger."
        code={`// Using showArrow prop
<HoverCardContent showArrow>
  Content with arrow
</HoverCardContent>

// Without arrow (default)
<HoverCardContent>
  Content without arrow
</HoverCardContent>`}
      >
        <div className="flex gap-4 items-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">With Arrow</Button>
            </HoverCardTrigger>
            <HoverCardContent showArrow>
              <p className="text-caption">Arrow pointer included</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Without Arrow</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-caption">No arrow pointer</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </PlaygroundSection>

      {/* ─── Delay Customization ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom Delays"
        description="Control how quickly the hover card opens and closes."
        code={`// Fast response (200ms open, 100ms close)
<HoverCard openDelay={200} closeDelay={100}>
  ...
</HoverCard>

// Instant open
<HoverCard openDelay={0}>
  ...
</HoverCard>

// Slow close (lingers for 1 second)
<HoverCard closeDelay={1000}>
  ...
</HoverCard>`}
      >
        <div className="flex gap-4 items-center">
          <HoverCard openDelay={0}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm">Instant</Button>
            </HoverCardTrigger>
            <HoverCardContent size="sm" showArrow>
              <p className="text-caption">Opens immediately (0ms delay)</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm">Fast</Button>
            </HoverCardTrigger>
            <HoverCardContent size="sm" showArrow>
              <p className="text-caption">200ms open, 100ms close</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard openDelay={700} closeDelay={300}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm">Default</Button>
            </HoverCardTrigger>
            <HoverCardContent size="sm" showArrow>
              <p className="text-caption">700ms open, 300ms close (default)</p>
            </HoverCardContent>
          </HoverCard>

          <HoverCard closeDelay={1000}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm">Sticky</Button>
            </HoverCardTrigger>
            <HoverCardContent size="sm" showArrow>
              <p className="text-caption">Lingers for 1 second after mouse leaves</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" className="my-8" />

      {/* ─── Use Cases ─────────────────────────────────────────── */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold text-[var(--foreground)]">Real-World Use Cases</h3>
        <p className="text-caption text-[var(--muted-foreground)]">Common patterns and implementations</p>
      </div>

      {/* User Profile Preview */}
      <PlaygroundSection
        title="User Profile Preview"
        description="Show user information when hovering over a username or avatar."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#" className="text-primary underline">@johndoe</a>
  </HoverCardTrigger>
  <HoverCardContent size="lg" showArrow>
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="..." />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="font-semibold">John Doe</h4>
        <p className="text-sm text-muted-foreground">Software Engineer</p>
        <div className="flex gap-2">
          <Badge>Pro</Badge>
          <span className="text-xs">Joined Dec 2023</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <p className="text-label">
          Created by{' '}
          <HoverCard>
            <HoverCardTrigger asChild>
              <a href="#" className="text-primary underline underline-offset-2 font-medium">@sarah_dev</a>
            </HoverCardTrigger>
            <HoverCardContent size="lg" showArrow>
              <div className="flex gap-3">
                <Avatar size="lg">
                  <AvatarImage src="https://i.pravatar.cc/100?u=sarah" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-label font-semibold">Sarah Chen</h4>
                    <Badge variant="accent" size="sm">Pro</Badge>
                  </div>
                  <p className="text-caption text-muted-foreground">Senior Software Engineer at Invin</p>
                  <div className="flex items-center gap-3 pt-2 text-caption text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> San Francisco
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Joined Dec 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-4 pt-2 text-caption">
                    <span><strong>2.4k</strong> followers</span>
                    <span><strong>182</strong> following</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {' '}on July 15, 2026.
        </p>
      </PlaygroundSection>

      {/* Link Preview */}
      <PlaygroundSection
        title="Link Preview"
        description="Show a preview of the linked content before navigating."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <a href="#">Documentation Link</a>
  </HoverCardTrigger>
  <HoverCardContent size="lg" showArrow>
    <div className="space-y-2">
      <h4 className="font-semibold">Page Title</h4>
      <p className="text-sm text-muted-foreground">Page description...</p>
      <Badge>Category</Badge>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <div className="flex flex-col gap-3">
          <p className="text-label">
            Check out our{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <a href="#" className="text-primary underline underline-offset-2 inline-flex items-center gap-1">
                  <Link size={12} />
                  Getting Started Guide
                </a>
              </HoverCardTrigger>
              <HoverCardContent size="lg" showArrow>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    <h4 className="text-label font-semibold">Getting Started</h4>
                  </div>
                  <p className="text-caption text-muted-foreground">
                    Learn how to install and configure Invin UI in your React project. Covers installation, theming, and basic component usage.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="info" size="sm">Documentation</Badge>
                    <span className="text-caption text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> 5 min read
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            {' '}for installation instructions.
          </p>

          <p className="text-label">
            See the{' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <a href="#" className="text-primary underline underline-offset-2 inline-flex items-center gap-1">
                  <Link size={12} />
                  Component Library
                </a>
              </HoverCardTrigger>
              <HoverCardContent size="lg" showArrow>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-primary" />
                    <h4 className="text-label font-semibold">Component Library</h4>
                  </div>
                  <p className="text-caption text-muted-foreground">
                    Browse 60+ production-ready components with full TypeScript support, accessibility features, and customizable theming.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="success" size="sm">62 Components</Badge>
                    <Badge variant="secondary" size="sm">TypeScript</Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            {' '}for all available components.
          </p>
        </div>
      </PlaygroundSection>

      {/* Product Preview */}
      <PlaygroundSection
        title="Product Card Preview"
        description="E-commerce style hover preview with image and details."
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="ghost">View Product</Button>
  </HoverCardTrigger>
  <HoverCardContent size="xl" showArrow>
    <img src="..." alt="Product" className="rounded" />
    <h4>Product Name</h4>
    <p className="text-muted-foreground">Description</p>
    <p className="text-lg font-bold">$99.99</p>
  </HoverCardContent>
</HoverCard>`}
      >
        <div className="flex gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" className="h-auto py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded" />
                  <span>Pro Dashboard</span>
                </div>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent size="xl" showArrow>
              <div className="space-y-3">
                <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Pro Dashboard</span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-label font-semibold">Pro Dashboard Template</h4>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} weight="fill" />
                      <span className="text-caption">4.9</span>
                    </div>
                  </div>
                  <p className="text-caption text-muted-foreground mt-1">
                    Full-featured admin dashboard with analytics, charts, and 20+ page templates.
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-primary">$79</p>
                    <div className="flex items-center gap-1 text-caption text-muted-foreground">
                      <Users size={12} /> 1.2k sales
                    </div>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" className="h-auto py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded" />
                  <span>UI Kit</span>
                </div>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent size="xl" showArrow>
              <div className="space-y-3">
                <div className="w-full h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">UI Kit</span>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-label font-semibold">Complete UI Kit</h4>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} weight="fill" />
                      <span className="text-caption">4.8</span>
                    </div>
                  </div>
                  <p className="text-caption text-muted-foreground mt-1">
                    500+ components, 50+ sections, dark mode support, and Figma file included.
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-primary">$149</p>
                    <div className="flex items-center gap-1 text-caption text-muted-foreground">
                      <Users size={12} /> 3.8k sales
                    </div>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </PlaygroundSection>

      {/* Team Member Cards */}
      <PlaygroundSection
        title="Team Member Tooltips"
        description="Quick team member info on avatar hover."
        code={`<HoverCard openDelay={200}>
  <HoverCardTrigger asChild>
    <Avatar clickable>...</Avatar>
  </HoverCardTrigger>
  <HoverCardContent size="sm">
    <p className="font-medium">Name</p>
    <p className="text-muted-foreground">Role</p>
  </HoverCardContent>
</HoverCard>`}
      >
        <div className="flex items-center -space-x-2">
          {[
            { name: 'Alex Kim', role: 'Product Manager', initials: 'AK', id: 'alex' },
            { name: 'Jordan Lee', role: 'Lead Designer', initials: 'JL', id: 'jordan' },
            { name: 'Sam Wilson', role: 'Senior Engineer', initials: 'SW', id: 'sam' },
            { name: 'Taylor Brown', role: 'DevOps Engineer', initials: 'TB', id: 'taylor' },
          ].map((member) => (
            <HoverCard key={member.id} openDelay={200}>
              <HoverCardTrigger asChild>
                <Avatar clickable bordered className="ring-2 ring-background">
                  <AvatarImage src={`https://i.pravatar.cc/100?u=${member.id}`} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent size="sm" showArrow>
                <p className="text-label font-medium">{member.name}</p>
                <p className="text-caption text-muted-foreground">{member.role}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </PlaygroundSection>

    </ComponentPage>
  );
}
