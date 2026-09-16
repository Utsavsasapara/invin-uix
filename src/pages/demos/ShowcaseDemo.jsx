import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from 'invin-uix/ui/card';
import { Button, ButtonGroup } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Textarea } from 'invin-uix/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Switch } from 'invin-uix/ui/switch';
import { Slider } from 'invin-uix/ui/slider';
import { Badge } from 'invin-uix/ui/badge';
import { Avatar, AvatarFallback } from 'invin-uix/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from 'invin-uix/ui/alert';
import { Progress } from 'invin-uix/ui/progress';
import { Spinner } from 'invin-uix/ui/spinner';
import { Separator } from 'invin-uix/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'invin-uix/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'invin-uix/ui/accordion';
import { Label } from 'invin-uix/ui/label';
import { Tooltip } from 'invin-uix/ui/tooltip';
import { LIB_CONFIG } from 'invin-uix/lib-config';
import { 
  Bell, Gear, User, MagnifyingGlass, Plus, Trash, Check, X, 
  Warning, Info, CaretRight, House, ChartLine, Folder,
  DownloadSimple, PaperPlaneTilt, Copy, Heart, Star, Shield,
  Eye, Clock, TrendUp, TrendDown, Users, Database, Lock,
  FileText, CheckCircle, XCircle, WarningCircle
} from 'invin-uix/ui/icons';

export default function KitchenSinkDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: '',
    subscribe: false,
    notifications: true,
    volume: [50],
  });
  const [progress, setProgress] = useState(65);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* ─── Page Header ─────────────────────────────────────────── */}
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">Component Showcase</h1>
        <p className="text-[13px] text-[var(--muted-foreground)] mt-1">
          Interactive demonstration of the invin-uix component library
        </p>
      </div>

      {/* ─── Metrics Overview ───────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Metrics Overview
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-[var(--muted-foreground)]">Total Users</span>
                <Users style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              </div>
              <p className="text-2xl font-semibold text-[var(--foreground)]">24,521</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendUp style={{ width: 12, height: 12, color: 'var(--ok)' }} />
                <span className="text-[11px] text-[var(--ok)]">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-[var(--muted-foreground)]">Revenue</span>
                <ChartLine style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              </div>
              <p className="text-2xl font-semibold text-[var(--foreground)]">$48,290</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendUp style={{ width: 12, height: 12, color: 'var(--ok)' }} />
                <span className="text-[11px] text-[var(--ok)]">+8.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-[var(--muted-foreground)]">Active Sessions</span>
                <Shield style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              </div>
              <p className="text-2xl font-semibold text-[var(--foreground)]">1,429</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendDown style={{ width: 12, height: 12, color: 'var(--warning)' }} />
                <span className="text-[11px] text-[var(--warning)]">-2.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-[var(--muted-foreground)]">Storage</span>
                <Database style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              </div>
              <p className="text-2xl font-semibold text-[var(--foreground)]">64.2 GB</p>
              <Progress value={64} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── Buttons & Actions ──────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Buttons & Actions
        </h2>
        <Card>
          <CardContent className="pt-5 pb-5 space-y-6">
            <div>
              <Label className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide">Variants</Label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide">With Icons</Label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Button leftIcon={<Plus style={{ width: 14, height: 14 }} />}>Add New</Button>
                <Button variant="outline" leftIcon={<DownloadSimple style={{ width: 14, height: 14 }} />}>Export</Button>
                <Button variant="ghost" size="icon"><Bell style={{ width: 16, height: 16 }} /></Button>
                <Button variant="ghost" size="icon"><Gear style={{ width: 16, height: 16 }} /></Button>
                <Button variant="ghost" size="icon"><MagnifyingGlass style={{ width: 16, height: 16 }} /></Button>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide">States</Label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <ButtonGroup>
                  <Button variant="outline" size="sm">Day</Button>
                  <Button variant="outline" size="sm">Week</Button>
                  <Button variant="outline" size="sm">Month</Button>
                </ButtonGroup>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-wide">Badges</Label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ok">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ─── Form Elements ──────────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Form Elements
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-[15px]">Contact Form</CardTitle>
              <CardDescription className="text-[12px]">Submit a support request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[12px]">Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[12px]">Email</Label>
                  <Input 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px]">Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[12px]">Message</Label>
                <Textarea 
                  placeholder="Describe your issue..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox 
                  id="subscribe" 
                  checked={formData.subscribe}
                  onCheckedChange={(c) => setFormData({...formData, subscribe: c})}
                />
                <Label htmlFor="subscribe" className="text-[12px]">Subscribe to updates</Label>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm" onClick={handleSubmit} loading={loading}>Submit</Button>
            </CardFooter>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-[15px]">Settings</CardTitle>
              <CardDescription className="text-[12px]">Configure preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium">Notifications</p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">Receive push alerts</p>
                </div>
                <Switch 
                  checked={formData.notifications}
                  onCheckedChange={(c) => setFormData({...formData, notifications: c})}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-[13px]">Volume</Label>
                  <span className="text-[12px] text-[var(--muted-foreground)]">{formData.volume}%</span>
                </div>
                <Slider 
                  value={formData.volume} 
                  onValueChange={(v) => setFormData({...formData, volume: v})}
                  max={100}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-[13px]">Progress</Label>
                  <span className="text-[12px] text-[var(--muted-foreground)]">{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                  <Button variant="outline" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── Alerts ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Alerts & Notifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Alert variant="info" icon={<Info style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This is an informational message.</AlertDescription>
          </Alert>

          <Alert variant="success" icon={<CheckCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Operation completed successfully.</AlertDescription>
          </Alert>

          <Alert variant="warning" icon={<WarningCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Please review before proceeding.</AlertDescription>
          </Alert>

          <Alert variant="destructive" icon={<XCircle style={{ width: 16, height: 16 }} />}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>An error occurred. Please try again.</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* ─── Loading States ─────────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Loading States
        </h2>
        <Card>
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-[11px] text-[var(--muted-foreground)] mt-2">Small</p>
              </div>
              <div className="text-center">
                <Spinner size="md" />
                <p className="text-[11px] text-[var(--muted-foreground)] mt-2">Medium</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-[11px] text-[var(--muted-foreground)] mt-2">Large</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <Spinner size="md" tip="Loading..." />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ─── Tabs & Accordion ───────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          Navigation Components
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px]">Tabs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4">
                  <p className="text-[13px] text-[var(--muted-foreground)]">
                    Account overview with summary of recent activity and quick actions.
                  </p>
                </TabsContent>
                <TabsContent value="analytics" className="pt-4">
                  <p className="text-[13px] text-[var(--muted-foreground)]">
                    Performance metrics and usage analytics over time.
                  </p>
                </TabsContent>
                <TabsContent value="reports" className="pt-4">
                  <p className="text-[13px] text-[var(--muted-foreground)]">
                    Generate and export reports in various formats.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px]">Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-[13px]">Getting Started</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[13px] text-[var(--muted-foreground)]">
                      Install via npm and import components as needed.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-[13px]">Customization</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[13px] text-[var(--muted-foreground)]">
                      Override CSS variables to match your brand colors.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-[13px]">Dark Mode</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-[13px] text-[var(--muted-foreground)]">
                      Built-in dark mode with automatic system detection.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── User List ──────────────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-4">
          User Directory
        </h2>
        <Card>
          <CardContent className="pt-0 pb-0 divide-y divide-[var(--border)]">
            {[
              { name: 'Alice Chen', role: 'Product Designer', initials: 'AC', status: 'Online' },
              { name: 'Bob Martinez', role: 'Frontend Engineer', initials: 'BM', status: 'Away' },
              { name: 'Carol White', role: 'Security Analyst', initials: 'CW', status: 'Offline' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-[12px]">{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[13px] font-medium text-[var(--foreground)]">{user.name}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={user.status === 'Online' ? 'ok' : user.status === 'Away' ? 'warning' : 'secondary'}
                    size="sm"
                  >
                    {user.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Tooltip content="Message">
                      <Button variant="ghost" size="icon-sm">
                        <PaperPlaneTilt style={{ width: 14, height: 14 }} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Profile">
                      <Button variant="ghost" size="icon-sm">
                        <User style={{ width: 14, height: 14 }} />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <section className="pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-[var(--muted-foreground)]">
            {LIB_CONFIG.name} v{LIB_CONFIG.version} · {LIB_CONFIG.componentCountDisplay} components
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<FileText style={{ width: 12, height: 12 }} />}>
              Documentation
            </Button>
            <Button size="sm" leftIcon={<Star style={{ width: 12, height: 12 }} />}>
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
