import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'invin-uix/ui/accordion';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Button } from 'invin-uix/ui/button';
import { Badge } from 'invin-uix/ui/badge';
import { 
  User, 
  Lock, 
  Settings, 
  Bell, 
  CreditCard,
  Shield,
  HelpCircle,
  FileText,
  Mail,
  Globe,
  Folder,
  File,
  AlertTriangle,
  CheckCircle
} from 'invin-uix/ui/icons';
import { ComponentPage, PlaygroundSection, PropsTable } from '../components/PlaygroundSection';

export default function AccordionDemo() {
  const [singleValue, setSingleValue] = useState('item-1');
  const [loadingDemo, setLoadingDemo] = useState(true);

  // Simulate async loading
  useEffect(() => {
    const timer = setTimeout(() => setLoadingDemo(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ComponentPage
      name="Accordion"
      description="A vertically stacked set of interactive headings that reveal or hide associated content sections. Supports icons, badges, subtitles, expand/collapse all, loading states, and nested accordions."
      importCode="import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'invin-uix/ui/accordion';"
      badges={[
        { label: 'Radix UI', variant: 'secondary' },
        { label: 'Accessible', variant: 'accent' }
      ]}
    >
      {/* Basic Usage */}
      <PlaygroundSection
        title="Basic Usage"
        description="Simple accordion with collapsible items."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern for accordions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match your design system and supports multiple variants.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default with smooth expand/collapse transitions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* Expand All / Collapse All */}
      <PlaygroundSection
        title="Expand All / Collapse All"
        description="For FAQ pages or documentation with many items. Users can quickly scan all content or collapse everything."
        tip="Use this when you have 5+ accordion items. Users often want to Ctrl+F search across all content."
        code={`<Accordion type="multiple" showControls>
  <AccordionItem value="faq-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  ...
</Accordion>

// Custom labels
<Accordion 
  type="multiple" 
  showControls 
  expandLabel="Show all answers"
  collapseLabel="Hide all answers"
>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="multiple" showControls defaultValue={['faq-1']}>
            <AccordionItem value="faq-1">
              <AccordionTrigger icon={<HelpCircle />}>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger icon={<HelpCircle />}>Can I change my username?</AccordionTrigger>
              <AccordionContent>
                Yes, go to Settings → Account → Edit Profile. Username changes are allowed once every 30 days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger icon={<HelpCircle />}>How do I delete my account?</AccordionTrigger>
              <AccordionContent>
                Navigate to Settings → Account → Danger Zone → Delete Account. This action is irreversible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger icon={<HelpCircle />}>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we use industry-standard encryption (AES-256) and comply with GDPR, SOC 2, and HIPAA regulations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5">
              <AccordionTrigger icon={<HelpCircle />}>How do I contact support?</AccordionTrigger>
              <AccordionContent>
                Use the chat widget in the bottom right, email support@example.com, or call 1-800-EXAMPLE.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* With Badges */}
      <PlaygroundSection
        title="With Badges"
        description="Show counts or status indicators. Perfect for admin panels, notification centers, or task lists."
        code={`<AccordionTrigger badge={12}>Inbox</AccordionTrigger>
<AccordionTrigger badge={3} badgeVariant="destructive">
  System Errors
</AccordionTrigger>
<AccordionTrigger badge="New">Updates</AccordionTrigger>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible defaultValue="inbox">
            <AccordionItem value="inbox" variant="bordered">
              <AccordionTrigger icon={<Mail />} badge={12}>
                Inbox
              </AccordionTrigger>
              <AccordionContent>
                You have 12 unread messages. Click to view your inbox.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="errors" variant="bordered">
              <AccordionTrigger icon={<AlertTriangle />} badge={3} badgeVariant="destructive">
                System Errors
              </AccordionTrigger>
              <AccordionContent>
                3 critical errors require your attention. Review logs for details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="completed" variant="bordered">
              <AccordionTrigger icon={<CheckCircle />} badge={47}>
                Completed Tasks
              </AccordionTrigger>
              <AccordionContent>
                47 tasks completed this week. Great progress!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="updates" variant="bordered">
              <AccordionTrigger icon={<Bell />} badge="New">
                Updates Available
              </AccordionTrigger>
              <AccordionContent>
                New features have been released. Check the changelog.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* With Subtitle */}
      <PlaygroundSection
        title="With Subtitle"
        description="Add descriptions below the title for complex settings or when users need more context."
        code={`<AccordionTrigger 
  icon={<Shield />}
  subtitle="Configure 2FA, session timeouts, and IP restrictions"
>
  Advanced Security Settings
</AccordionTrigger>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible defaultValue="security">
            <AccordionItem value="account" variant="filled">
              <AccordionTrigger 
                icon={<User />}
                subtitle="Profile info, email, and password"
              >
                Account Settings
              </AccordionTrigger>
              <AccordionContent>
                Manage your profile information, change your email address, and update your password.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security" variant="filled">
              <AccordionTrigger 
                icon={<Shield />}
                subtitle="2FA, sessions, login history, and IP restrictions"
              >
                Security & Privacy
              </AccordionTrigger>
              <AccordionContent>
                Enable two-factor authentication, manage active sessions, review login history, and configure IP allowlists.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing" variant="filled">
              <AccordionTrigger 
                icon={<CreditCard />}
                subtitle="Payment methods, invoices, and subscription"
                badge="Pro"
              >
                Billing & Plans
              </AccordionTrigger>
              <AccordionContent>
                Update payment methods, download invoices, and manage your subscription plan.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* Loading State */}
      <PlaygroundSection
        title="Loading State"
        description="Show skeleton placeholders while content is being fetched. Useful for lazy-loaded or API-driven content."
        tip="Use loading state when accordion content comes from an API call or database query."
        code={`const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData().then(() => setLoading(false));
}, []);

<AccordionContent loading={loading} loadingLines={4}>
  {data && <div>{data.content}</div>}
</AccordionContent>`}
      >
        <div className="w-full max-w-lg space-y-4">
          <Accordion type="single" collapsible defaultValue="loading-demo">
            <AccordionItem value="loading-demo" variant="bordered">
              <AccordionTrigger icon={<FileText />}>
                API Response Data
              </AccordionTrigger>
              <AccordionContent loading={loadingDemo} loadingLines={4}>
                <div className="space-y-2">
                  <p>This content was loaded from an API!</p>
                  <p className="text-[var(--muted-foreground)]">
                    In a real app, this would be fetched when the accordion opens.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {
              setLoadingDemo(true);
              setTimeout(() => setLoadingDemo(false), 2000);
            }}
          >
            Reload Data
          </Button>
        </div>
      </PlaygroundSection>

      {/* Nested Accordions */}
      <PlaygroundSection
        title="Nested Accordions"
        description="Multi-level navigation for categorized content, file explorers, or documentation structures."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="category">
    <AccordionTrigger>Category</AccordionTrigger>
    <AccordionContent>
      <Accordion type="single" collapsible>
        <AccordionItem value="subcategory" variant="ghost">
          <AccordionTrigger chevronPosition="left">
            Subcategory
          </AccordionTrigger>
          <AccordionContent>Items...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible defaultValue="documents">
            <AccordionItem value="documents" variant="bordered">
              <AccordionTrigger icon={<Folder />}>Documents</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="work" variant="ghost">
                    <AccordionTrigger chevronPosition="left" icon={<Folder />}>
                      Work
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                          <File style={{ width: 16, height: 16 }} />
                          <span>report-2024.pdf</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                          <File style={{ width: 16, height: 16 }} />
                          <span>presentation.pptx</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="personal" variant="ghost">
                    <AccordionTrigger chevronPosition="left" icon={<Folder />}>
                      Personal
                    </AccordionTrigger>
                    <AccordionContent className="pl-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                          <File style={{ width: 16, height: 16 }} />
                          <span>vacation-photos.zip</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="downloads" variant="bordered">
              <AccordionTrigger icon={<Folder />}>Downloads</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <File style={{ width: 16, height: 16 }} />
                    <span>installer.exe</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <File style={{ width: 16, height: 16 }} />
                    <span>dataset.csv</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* Variants */}
      <PlaygroundSection
        title="Variants"
        description="Four visual styles to match different UI contexts."
        code={`<AccordionItem variant="default">...</AccordionItem>
<AccordionItem variant="bordered">...</AccordionItem>
<AccordionItem variant="filled">...</AccordionItem>
<AccordionItem variant="ghost">...</AccordionItem>`}
      >
        <div className="w-full max-w-lg space-y-6">
          {[
            { variant: 'default', label: 'Default (underline)' },
            { variant: 'bordered', label: 'Bordered' },
            { variant: 'filled', label: 'Filled' },
            { variant: 'ghost', label: 'Ghost' },
          ].map(({ variant, label }) => (
            <div key={variant} className="space-y-2">
              <p className="text-caption text-[var(--muted-foreground)]">{label}</p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" variant={variant}>
                  <AccordionTrigger>First item</AccordionTrigger>
                  <AccordionContent>Content for the first item.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" variant={variant}>
                  <AccordionTrigger>Second item</AccordionTrigger>
                  <AccordionContent>Content for the second item.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </PlaygroundSection>

      {/* Chevron Position */}
      <PlaygroundSection
        title="Chevron Position"
        description="Position the chevron on the left (common for file trees) or hide it entirely."
        code={`<AccordionTrigger chevronPosition="left">Left</AccordionTrigger>
<AccordionTrigger chevronPosition="right">Right (default)</AccordionTrigger>
<AccordionTrigger hideChevron>Hidden</AccordionTrigger>`}
      >
        <div className="w-full max-w-lg space-y-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="right" variant="filled">
              <AccordionTrigger chevronPosition="right">Chevron on right (default)</AccordionTrigger>
              <AccordionContent>Standard accordion style.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="left" variant="filled">
              <AccordionTrigger chevronPosition="left">Chevron on left</AccordionTrigger>
              <AccordionContent>Common for file trees and navigation.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="hidden" variant="filled">
              <AccordionTrigger hideChevron>No chevron</AccordionTrigger>
              <AccordionContent>Minimal style when expand/collapse is obvious.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* Props Reference */}
      <PropsTable
        title="Accordion Props"
        props={[
          { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Single or multiple items open' },
          { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow closing all (single mode)' },
          { name: 'showControls', type: 'boolean', default: 'false', description: 'Show expand/collapse all button' },
          { name: 'expandLabel', type: 'string', default: "'Expand all'", description: 'Expand button label' },
          { name: 'collapseLabel', type: 'string', default: "'Collapse all'", description: 'Collapse button label' },
          { name: 'value', type: 'string | string[]', description: 'Controlled open item(s)' },
          { name: 'defaultValue', type: 'string | string[]', description: 'Initially open item(s)' },
          { name: 'onValueChange', type: '(value) => void', description: 'Callback when items change' },
        ]}
      />

      <PropsTable
        title="AccordionItem Props"
        props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier' },
          { name: 'variant', type: "'default' | 'bordered' | 'filled' | 'ghost'", default: "'default'", description: 'Visual style' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item' },
        ]}
      />

      <PropsTable
        title="AccordionTrigger Props"
        props={[
          { name: 'icon', type: 'ReactNode', description: 'Icon before title' },
          { name: 'badge', type: 'number | string', description: 'Badge content' },
          { name: 'badgeVariant', type: "'default' | 'secondary' | 'destructive' | 'outline'", default: "'secondary'", description: 'Badge color' },
          { name: 'subtitle', type: 'ReactNode', description: 'Description below title' },
          { name: 'chevronPosition', type: "'left' | 'right'", default: "'right'", description: 'Chevron position' },
          { name: 'hideChevron', type: 'boolean', default: 'false', description: 'Hide chevron' },
        ]}
      />

      <PropsTable
        title="AccordionContent Props"
        props={[
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loader' },
          { name: 'loadingLines', type: 'number', default: '3', description: 'Number of skeleton lines' },
        ]}
      />
    </ComponentPage>
  );
}
