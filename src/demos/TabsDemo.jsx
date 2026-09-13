import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'invin-uix/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from 'invin-uix/ui/card';
import { Input } from 'invin-uix/ui/input';
import { Button } from 'invin-uix/ui/button';
import { Label } from 'invin-uix/ui/label';
import { Badge } from 'invin-uix/ui/badge';
import { 
  User, 
  Lock, 
  Settings, 
  Bell, 
  Mail,
  FileText,
  Send,
  Inbox,
  CreditCard,
  Shield
} from 'invin-uix/ui/icons';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo, DemoGrid, DemoCard } from '../components/PlaygroundSection';

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('account');
  const [animation, setAnimation] = useState('slide');
  
  return (
    <ComponentPage
      name="Tabs"
      description="A set of layered sections of content displayed one at a time. Supports icons, badges, multiple variants, and smooth animations."
      importCode="import { Tabs, TabsList, TabsTrigger, TabsContent } from 'invin-uix/ui/tabs';"
      badges={[
        { label: 'Radix UI', variant: 'secondary' },
        { label: 'Accessible', variant: 'accent' }
      ]}
    >
      {/* Basic Usage */}
      <PlaygroundSection
        title="Basic Usage"
        description="Simple tabs with default underline style."
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Manage your account settings here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password here.</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Configure your preferences.</p>
  </TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="account" className="w-full max-w-lg">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" type="email" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--muted-foreground)]">
                  Settings panel content goes here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PlaygroundSection>

      {/* Variants */}
      <PlaygroundSection
        title="Variants"
        description="Three visual styles: default (underline), pill, and enclosed."
        code={`{/* Default - underline */}
<TabsList variant="default">
  <TabsTrigger variant="default" value="tab1">Tab 1</TabsTrigger>
</TabsList>

{/* Pill - rounded */}
<TabsList variant="pill">
  <TabsTrigger variant="pill" value="tab1">Tab 1</TabsTrigger>
</TabsList>

{/* Enclosed - boxed */}
<TabsList variant="enclosed">
  <TabsTrigger variant="enclosed" value="tab1">Tab 1</TabsTrigger>
</TabsList>`}
      >
        <div className="space-y-8 w-full max-w-lg">
          {/* Default */}
          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Default (underline)</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="default">
                <TabsTrigger variant="default" value="tab1">Overview</TabsTrigger>
                <TabsTrigger variant="default" value="tab2">Analytics</TabsTrigger>
                <TabsTrigger variant="default" value="tab3">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Pill */}
          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Pill</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="pill">
                <TabsTrigger variant="pill" value="tab1">Overview</TabsTrigger>
                <TabsTrigger variant="pill" value="tab2">Analytics</TabsTrigger>
                <TabsTrigger variant="pill" value="tab3">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Enclosed */}
          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Enclosed</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="enclosed">
                <TabsTrigger variant="enclosed" value="tab1">Overview</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab2">Analytics</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab3">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </PlaygroundSection>

      {/* Sizes */}
      <PlaygroundSection
        title="Sizes"
        description="Three sizes available: sm, md (default), and lg."
        code={`<TabsList size="sm">...</TabsList>
<TabsList size="md">...</TabsList>
<TabsList size="lg">...</TabsList>`}
      >
        <div className="space-y-6 w-full max-w-lg">
          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Small</p>
            <Tabs defaultValue="tab1">
              <TabsList size="sm" variant="enclosed">
                <TabsTrigger variant="enclosed" value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Medium (default)</p>
            <Tabs defaultValue="tab1">
              <TabsList size="md" variant="enclosed">
                <TabsTrigger variant="enclosed" value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Large</p>
            <Tabs defaultValue="tab1">
              <TabsList size="lg" variant="enclosed">
                <TabsTrigger variant="enclosed" value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger variant="enclosed" value="tab3">Tab 3</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </PlaygroundSection>

      {/* With Icons */}
      <PlaygroundSection
        title="With Icons"
        description="Add icons to tabs using the icon prop."
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account" icon={<User />}>
      Account
    </TabsTrigger>
    <TabsTrigger value="password" icon={<Lock />}>
      Password
    </TabsTrigger>
    <TabsTrigger value="settings" icon={<Settings />}>
      Settings
    </TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="space-y-6 w-full max-w-lg">
          {/* Default with icons */}
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account" icon={<User />}>Account</TabsTrigger>
              <TabsTrigger value="password" icon={<Lock />}>Password</TabsTrigger>
              <TabsTrigger value="settings" icon={<Settings />}>Settings</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Pill with icons */}
          <Tabs defaultValue="account">
            <TabsList variant="pill">
              <TabsTrigger variant="pill" value="account" icon={<User />}>Account</TabsTrigger>
              <TabsTrigger variant="pill" value="password" icon={<Lock />}>Password</TabsTrigger>
              <TabsTrigger variant="pill" value="settings" icon={<Settings />}>Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </PlaygroundSection>

      {/* With Badges */}
      <PlaygroundSection
        title="With Badges"
        description="Show notification counts or status indicators with the badge prop."
        code={`<Tabs defaultValue="inbox">
  <TabsList>
    <TabsTrigger value="inbox" badge={12}>Inbox</TabsTrigger>
    <TabsTrigger value="drafts" badge={3}>Drafts</TabsTrigger>
    <TabsTrigger value="sent">Sent</TabsTrigger>
    {/* Numbers > 99 show as "99+" */}
    <TabsTrigger value="all" badge={150}>All</TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="space-y-6 w-full max-w-lg">
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox" badge={12}>Inbox</TabsTrigger>
              <TabsTrigger value="drafts" badge={3}>Drafts</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="all" badge={150}>All</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Badge variants */}
          <div className="space-y-2">
            <p className="text-caption text-[var(--muted-foreground)]">Badge Variants</p>
            <Tabs defaultValue="default">
              <TabsList variant="pill">
                <TabsTrigger variant="pill" value="default" badge={5} badgeVariant="secondary">Secondary</TabsTrigger>
                <TabsTrigger variant="pill" value="accent" badge={3} badgeVariant="accent">Accent</TabsTrigger>
                <TabsTrigger variant="pill" value="destructive" badge={2} badgeVariant="destructive">Destructive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </PlaygroundSection>

      {/* Icons + Badges Combined */}
      <PlaygroundSection
        title="Icons & Badges Combined"
        description="Combine icons and badges for rich tab headers."
        code={`<Tabs defaultValue="inbox">
  <TabsList>
    <TabsTrigger value="inbox" icon={<Inbox />} badge={12}>
      Inbox
    </TabsTrigger>
    <TabsTrigger value="drafts" icon={<FileText />} badge={3}>
      Drafts
    </TabsTrigger>
    <TabsTrigger value="sent" icon={<Send />}>
      Sent
    </TabsTrigger>
    <TabsTrigger value="alerts" icon={<Bell />} badge={5} badgeVariant="destructive">
      Alerts
    </TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <Tabs defaultValue="inbox" className="w-full max-w-2xl">
          <TabsList>
            <TabsTrigger value="inbox" icon={<Inbox />} badge={12}>Inbox</TabsTrigger>
            <TabsTrigger value="drafts" icon={<FileText />} badge={3}>Drafts</TabsTrigger>
            <TabsTrigger value="sent" icon={<Send />}>Sent</TabsTrigger>
            <TabsTrigger value="alerts" icon={<Bell />} badge={5} badgeVariant="destructive">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <Card>
              <CardContent className="pt-4">
                <p className="text-[var(--muted-foreground)]">You have 12 unread messages.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="drafts">
            <Card>
              <CardContent className="pt-4">
                <p className="text-[var(--muted-foreground)]">You have 3 draft messages.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sent">
            <Card>
              <CardContent className="pt-4">
                <p className="text-[var(--muted-foreground)]">Your sent messages will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="alerts">
            <Card>
              <CardContent className="pt-4">
                <p className="text-[var(--error)]">You have 5 urgent alerts!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PlaygroundSection>

      {/* Content Animations */}
      <PlaygroundSection
        title="Content Animations"
        description="Choose from different animation styles for tab content transitions."
        code={`{/* Slide animation (default) */}
<TabsContent value="tab1" animation="slide">...</TabsContent>

{/* Fade animation */}
<TabsContent value="tab2" animation="fade">...</TabsContent>

{/* Scale animation */}
<TabsContent value="tab3" animation="scale">...</TabsContent>

{/* No animation */}
<TabsContent value="tab4" animation="none">...</TabsContent>`}
      >
        <div className="space-y-4 w-full max-w-lg">
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={animation === 'slide' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setAnimation('slide')}
            >
              Slide
            </Button>
            <Button 
              variant={animation === 'fade' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setAnimation('fade')}
            >
              Fade
            </Button>
            <Button 
              variant={animation === 'scale' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setAnimation('scale')}
            >
              Scale
            </Button>
            <Button 
              variant={animation === 'none' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setAnimation('none')}
            >
              None
            </Button>
          </div>
          
          <Tabs defaultValue="billing" className="w-full">
            <TabsList variant="enclosed">
              <TabsTrigger variant="enclosed" value="billing" icon={<CreditCard />}>Billing</TabsTrigger>
              <TabsTrigger variant="enclosed" value="security" icon={<Shield />}>Security</TabsTrigger>
              <TabsTrigger variant="enclosed" value="notifications" icon={<Bell />}>Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="billing" animation={animation}>
              <Card>
                <CardHeader>
                  <CardTitle>Billing</CardTitle>
                  <CardDescription>Manage your billing information and payment methods.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)]">Your current plan: Pro ($29/month)</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" animation={animation}>
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Configure your security settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)]">Two-factor authentication is enabled.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" animation={animation}>
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)]">Email notifications are enabled.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="text-caption text-[var(--muted-foreground)]">
            Current animation: <Badge variant="secondary">{animation}</Badge> — Click tabs to see the animation
          </p>
        </div>
      </PlaygroundSection>

      {/* Disabled State */}
      <PlaygroundSection
        title="Disabled Tabs"
        description="Tabs can be individually disabled."
        code={`<TabsTrigger value="disabled" disabled>
  Disabled
</TabsTrigger>`}
      >
        <Tabs defaultValue="active" className="w-full max-w-lg">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="another">Another</TabsTrigger>
          </TabsList>
        </Tabs>
      </PlaygroundSection>

      {/* Controlled */}
      <PlaygroundSection
        title="Controlled"
        description="Use value and onValueChange for controlled behavior."
        code={`const [activeTab, setActiveTab] = useState('account');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
</Tabs>

<p>Active tab: {activeTab}</p>`}
      >
        <div className="space-y-4 w-full max-w-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="pill">
              <TabsTrigger variant="pill" value="account">Account</TabsTrigger>
              <TabsTrigger variant="pill" value="password">Password</TabsTrigger>
              <TabsTrigger variant="pill" value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 items-center">
            <p className="text-caption text-[var(--muted-foreground)]">Active tab:</p>
            <Badge variant="accent">{activeTab}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setActiveTab('account')}>
              Go to Account
            </Button>
            <Button size="sm" variant="outline" onClick={() => setActiveTab('password')}>
              Go to Password
            </Button>
            <Button size="sm" variant="outline" onClick={() => setActiveTab('settings')}>
              Go to Settings
            </Button>
          </div>
        </div>
      </PlaygroundSection>

      {/* Props Reference */}
      <PropsTable
        title="TabsList Props"
        props={[
          { name: 'variant', type: "'default' | 'pill' | 'enclosed'", default: "'default'", description: 'Visual style variant' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the tabs' },
        ]}
      />

      <PropsTable
        title="TabsTrigger Props"
        props={[
          { name: 'value', type: 'string', required: true, description: 'Unique value for the tab' },
          { name: 'variant', type: "'default' | 'pill' | 'enclosed'", default: "'default'", description: 'Should match TabsList variant' },
          { name: 'icon', type: 'ReactNode', description: 'Icon to display before the label' },
          { name: 'badge', type: 'number | string', description: 'Badge content (numbers > 99 show as "99+")' },
          { name: 'badgeVariant', type: "'default' | 'secondary' | 'destructive' | 'outline' | 'accent'", default: "'secondary'", description: 'Badge color variant' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the tab is disabled' },
        ]}
      />

      <PropsTable
        title="TabsContent Props"
        props={[
          { name: 'value', type: 'string', required: true, description: 'Must match a TabsTrigger value' },
          { name: 'animation', type: "'fade' | 'slide' | 'scale' | 'none'", default: "'slide'", description: 'Animation style for content transition' },
          { name: 'forceMount', type: 'boolean', default: 'false', description: 'Force content to stay mounted' },
        ]}
      />
    </ComponentPage>
  );
}
