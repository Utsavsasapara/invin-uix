import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, useAccordion } from 'invin-uix/ui/accordion';
import { Button } from 'invin-uix/ui/button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';
import { User, Bell, Shield, Gear, EnvelopeSimple, CreditCard, Package, CaretDown } from 'invin-uix/ui/icons';
import { useState, useEffect } from 'react';

// Loading State Demo Component
function LoadingStateDemo() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  // Simulate async data fetch when accordion opens
  const handleOpenChange = (value) => {
    if (value === 'async-content') {
      setLoading(true);
      setData(null);
      // Simulate API call
      setTimeout(() => {
        setData({
          title: 'User Activity Report',
          items: ['42 active sessions', '128 API calls today', '3 new sign-ups']
        });
        setLoading(false);
      }, 1500);
    }
  };
  
  return (
    <div className="w-full">
      <Accordion type="single" collapsible onValueChange={handleOpenChange}>
        <AccordionItem value="async-content" variant="bordered">
          <AccordionTrigger>Load Analytics Data</AccordionTrigger>
          <AccordionContent loading={loading} loadingLines={4}>
            {data && (
              <div className="space-y-2">
                <p className="font-medium">{data.title}</p>
                <ul className="text-sm space-y-1">
                  {data.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="instant" variant="bordered">
          <AccordionTrigger>Instant Content (no loading)</AccordionTrigger>
          <AccordionContent>This content loads immediately without a loading state.</AccordionContent>
        </AccordionItem>
      </Accordion>
      <p className="text-xs text-[var(--muted-foreground)] mt-2">
        Open the first item to see the loading skeleton for 1.5 seconds.
      </p>
    </div>
  );
}

export default function AccordionDemo() {
  return (
    <ComponentPage
      name="Accordion"
      description="Expandable content sections. Single or multiple open at once. Four visual variants. Also includes Collapsible for single-section expand/collapse."
      importCode={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'invin-uix/ui/accordion';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Accordion Playground"
        description="Experiment with different accordion configurations."
        controls={[
          {
            name: 'type',
            type: 'select',
            label: 'Type',
            default: 'single',
            options: [
              { value: 'single', label: 'Single' },
              { value: 'multiple', label: 'Multiple' },
            ],
          },
          {
            name: 'variant',
            type: 'select',
            label: 'Variant',
            default: 'default',
            options: [
              { value: 'default', label: 'Default' },
              { value: 'bordered', label: 'Bordered' },
              { value: 'filled', label: 'Filled' },
              { value: 'ghost', label: 'Ghost' },
            ],
          },
          { name: 'collapsible', type: 'boolean', label: 'Collapsible', default: true },
        ]}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <Accordion 
              type={props.type} 
              collapsible={props.collapsible} 
              defaultValue={props.type === 'multiple' ? ['item-1'] : 'item-1'}
            >
              <AccordionItem value="item-1" variant={props.variant}>
                <AccordionTrigger>What is Invin UI?</AccordionTrigger>
                <AccordionContent>A production-ready React component library with 40+ components.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" variant={props.variant}>
                <AccordionTrigger>How do I install it?</AccordionTrigger>
                <AccordionContent>Run pnpm add invin-uix and import tokens.css in your entry file.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" variant={props.variant}>
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes, built on Radix UI with full keyboard support and ARIA labels.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </InteractiveDemo>

      <Separator variant="bold" />

      <PropsTable
        props={[
          { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'single = only one open at a time, multiple = any number open' },
          { name: 'value', type: 'string | string[]', default: '—', description: 'Controlled open item(s)' },
          { name: 'defaultValue', type: 'string | string[]', default: '—', description: 'Uncontrolled default open item(s)' },
          { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow closing all items (only for type="single")' },
          { name: 'showControls', type: 'boolean', default: 'false', description: 'Show expand/collapse all button (requires type="multiple")' },
          { name: 'expandLabel', type: 'string', default: "'Expand all'", description: 'Label for expand all button' },
          { name: 'collapseLabel', type: 'string', default: "'Collapse all'", description: 'Label for collapse all button' },
          { name: 'onValueChange', type: '(value) => void', default: '—', description: 'Callback when open items change' },
        ]}
      />

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">AccordionItem Props</h4>
        <PropsTable
          props={[
            { name: 'value', type: 'string', default: '—', description: 'Required. Unique identifier for this item' },
            { name: 'variant', type: "'default' | 'bordered' | 'filled' | 'ghost'", default: "'default'", description: 'Visual style variant' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable this item' },
          ]}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">AccordionTrigger Props</h4>
        <PropsTable
          props={[
            { name: 'icon', type: 'ReactNode', default: '—', description: 'Icon to display before the title' },
            { name: 'badge', type: 'number | string', default: '—', description: 'Badge content (numbers > 99 show as "99+")' },
            { name: 'badgeVariant', type: "'default' | 'secondary' | 'destructive' | 'outline'", default: "'secondary'", description: 'Badge color variant' },
            { name: 'subtitle', type: 'ReactNode', default: '—', description: 'Description text below the title' },
            { name: 'chevronPosition', type: "'left' | 'right'", default: "'right'", description: 'Position of chevron indicator' },
            { name: 'hideChevron', type: 'boolean', default: 'false', description: 'Hide the chevron indicator' },
          ]}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-[var(--foreground)] font-[600] text-sm mb-2">AccordionContent Props</h4>
        <PropsTable
          props={[
            { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loader instead of content' },
            { name: 'loadingLines', type: 'number', default: '3', description: 'Number of skeleton lines when loading' },
          ]}
        />
      </div>

      <Separator variant="bold" />

      {/* ─── Default ────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Default (single)"
        description="Only one item open at a time. Chevron rotates on open."
        code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Invin UI?</AccordionTrigger>
    <AccordionContent>A component library for React...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>pnpm add invin-uix</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Invin UI?</AccordionTrigger>
              <AccordionContent>A production-ready React component library with 40+ components, design tokens, dark/light themes, and 5 accent colours.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I install it?</AccordionTrigger>
              <AccordionContent>Run <code className="font-mono bg-[var(--secondary)] px-1 py-0.5 rounded text-[11px]">pnpm add invin-uix</code> and import tokens.css in your entry file.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
              <AccordionContent>Yes — all components have 'use client' and work in both App Router and Pages Router.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── Multiple ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Multiple"
        description="Multiple items can be open simultaneously."
        code={`<Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
  <AccordionItem value="item-1">...</AccordionItem>
  <AccordionItem value="item-2">...</AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Design Tokens</AccordionTrigger>
              <AccordionContent>Colours, typography, spacing, borders, and motion — all as CSS variables.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Tailwind Preset</AccordionTrigger>
              <AccordionContent>A preset that maps tokens to Tailwind utilities. Import once in tailwind.config.js.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Icons</AccordionTrigger>
              <AccordionContent>1400+ Lucide icons re-exported plus 26 custom product SVGs.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="Four visual styles: default (border-bottom), bordered (outlined card), filled (surface bg), ghost (no border)."
        code={`<AccordionItem value="..." variant="bordered">...</AccordionItem>
<AccordionItem value="..." variant="filled">...</AccordionItem>
<AccordionItem value="..." variant="ghost">...</AccordionItem>`}
      >
        <div className="space-y-6 w-full">
          <div>
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em] mb-2">Bordered</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="b1" variant="bordered">
                <AccordionTrigger>Bordered item</AccordionTrigger>
                <AccordionContent>Content inside a bordered card-like container.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b2" variant="bordered">
                <AccordionTrigger>Another bordered item</AccordionTrigger>
                <AccordionContent>Each item is visually distinct.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em] mb-2">Filled</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="f1" variant="filled">
                <AccordionTrigger>Filled item</AccordionTrigger>
                <AccordionContent>Surface-hover background for a subtle filled look.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="f2" variant="filled">
                <AccordionTrigger>Another filled item</AccordionTrigger>
                <AccordionContent>Works well on clean backgrounds.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em] mb-2">Ghost</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="g1" variant="ghost">
                <AccordionTrigger>Ghost item</AccordionTrigger>
                <AccordionContent>No visual container — minimal styling.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="g2" variant="ghost">
                <AccordionTrigger>Another ghost item</AccordionTrigger>
                <AccordionContent>Best for nested accordions or inline usage.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── With Icons ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Icons"
        description="Add icons before titles for visual hierarchy in settings or navigation."
        code={`import { User, Bell, Shield } from 'invin-uix/ui/icons';

<Accordion type="single" collapsible>
  <AccordionItem value="account">
    <AccordionTrigger icon={<User weight="bold" />}>
      Account Settings
    </AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible defaultValue="account">
            <AccordionItem value="account" variant="bordered">
              <AccordionTrigger icon={<User weight="bold" />}>Account Settings</AccordionTrigger>
              <AccordionContent>Manage your profile, email, and password.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="notifications" variant="bordered">
              <AccordionTrigger icon={<Bell weight="bold" />}>Notifications</AccordionTrigger>
              <AccordionContent>Configure email, push, and SMS alerts.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="security" variant="bordered">
              <AccordionTrigger icon={<Shield weight="bold" />}>Security</AccordionTrigger>
              <AccordionContent>Two-factor authentication and session management.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── With Badges ────────────────────────────────────────── */}
      <PlaygroundSection
        title="With Badges"
        description="Show counts or status indicators. Numbers > 99 auto-truncate to '99+'."
        code={`<AccordionTrigger badge={12}>Inbox</AccordionTrigger>
<AccordionTrigger badge={3} badgeVariant="destructive">Errors</AccordionTrigger>
<AccordionTrigger badge="New">Updates</AccordionTrigger>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="inbox" variant="bordered">
              <AccordionTrigger icon={<EnvelopeSimple weight="bold" />} badge={12}>
                Inbox
              </AccordionTrigger>
              <AccordionContent>You have 12 unread messages.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="errors" variant="bordered">
              <AccordionTrigger badge={3} badgeVariant="destructive">
                System Errors
              </AccordionTrigger>
              <AccordionContent>3 critical errors need immediate attention.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="updates" variant="bordered">
              <AccordionTrigger badge="New" badgeVariant="default">
                Updates Available
              </AccordionTrigger>
              <AccordionContent>New features ready to install.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="overflow" variant="bordered">
              <AccordionTrigger badge={150}>
                All Notifications
              </AccordionTrigger>
              <AccordionContent>Badge shows "99+" for numbers over 99.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── With Subtitles ─────────────────────────────────────── */}
      <PlaygroundSection
        title="With Subtitles"
        description="Add descriptions below titles for complex settings panels."
        code={`<AccordionTrigger 
  icon={<Shield />}
  subtitle="Configure 2FA, session timeouts, and IP restrictions"
>
  Advanced Security
</AccordionTrigger>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible defaultValue="security">
            <AccordionItem value="security" variant="bordered">
              <AccordionTrigger 
                icon={<Shield weight="bold" />}
                subtitle="Configure 2FA, session timeouts, and IP restrictions"
              >
                Advanced Security
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>• Two-factor authentication (SMS, Authenticator app)</p>
                  <p>• Session timeout: 30 minutes</p>
                  <p>• IP allowlist: 3 addresses configured</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing" variant="bordered">
              <AccordionTrigger 
                icon={<CreditCard weight="bold" />}
                subtitle="Payment methods, invoices, and subscription details"
                badge="Pro"
              >
                Billing & Subscription
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>• Plan: Professional ($29/month)</p>
                  <p>• Next billing: August 15, 2026</p>
                  <p>• Payment: •••• 4242</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show skeleton placeholders while content loads asynchronously."
        code={`const [loading, setLoading] = useState(true);

<AccordionContent loading={loading} loadingLines={4}>
  {data && <div>{data.content}</div>}
</AccordionContent>`}
      >
        <LoadingStateDemo />
      </PlaygroundSection>

      {/* ─── Expand/Collapse All ────────────────────────────────── */}
      <PlaygroundSection
        title="Expand/Collapse All"
        description="Built-in controls for FAQ pages. Requires type='multiple'."
        code={`<Accordion 
  type="multiple" 
  showControls 
  expandLabel="Show all answers"
  collapseLabel="Hide all answers"
>
  <AccordionItem value="q1">...</AccordionItem>
  <AccordionItem value="q2">...</AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion 
            type="multiple" 
            showControls 
            expandLabel="Show all answers"
            collapseLabel="Hide all answers"
          >
            <AccordionItem value="q1" variant="bordered">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>We accept Visa, Mastercard, American Express, and PayPal.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" variant="bordered">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>Standard shipping takes 5-7 business days. Express is 2-3 days.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" variant="bordered">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>30-day returns on all unused items with original packaging.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" variant="bordered">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>Yes, we ship to over 50 countries worldwide.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      {/* ─── Chevron Position ───────────────────────────────────── */}
      <PlaygroundSection
        title="Chevron Position"
        description="Place chevron on left, right (default), or hide it entirely."
        code={`<AccordionTrigger chevronPosition="left">Left chevron</AccordionTrigger>
<AccordionTrigger chevronPosition="right">Right chevron</AccordionTrigger>
<AccordionTrigger hideChevron>No chevron</AccordionTrigger>`}
      >
        <div className="w-full space-y-4">
          <div>
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em] mb-2">Left Chevron</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="left1" variant="filled">
                <AccordionTrigger chevronPosition="left">Navigation item 1</AccordionTrigger>
                <AccordionContent>Content for navigation style with left chevron.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="left2" variant="filled">
                <AccordionTrigger chevronPosition="left">Navigation item 2</AccordionTrigger>
                <AccordionContent>Works well for sidebar navigation patterns.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <p className="text-[10px] text-[var(--muted-foreground-faint)] uppercase tracking-[0.05em] mb-2">Hidden Chevron</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="hidden1" variant="ghost">
                <AccordionTrigger hideChevron>Click to expand (no chevron)</AccordionTrigger>
                <AccordionContent>For minimal UI where expand/collapse is implied.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── Nested Accordions ──────────────────────────────────── */}
      <PlaygroundSection
        title="Nested Accordions"
        description="Multi-level navigation for category trees or documentation."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="category">
    <AccordionTrigger>Category</AccordionTrigger>
    <AccordionContent>
      <Accordion type="single" collapsible>
        <AccordionItem value="subcategory" variant="ghost">
          <AccordionTrigger chevronPosition="left">
            Subcategory
          </AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible defaultValue="electronics">
            <AccordionItem value="electronics" variant="bordered">
              <AccordionTrigger icon={<Package weight="bold" />}>Electronics</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="phones" variant="ghost">
                    <AccordionTrigger chevronPosition="left">Phones & Tablets</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-6 space-y-1 text-sm">
                        <li>• iPhone 15 Pro</li>
                        <li>• Samsung Galaxy S24</li>
                        <li>• iPad Air</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="laptops" variant="ghost">
                    <AccordionTrigger chevronPosition="left">Laptops</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-6 space-y-1 text-sm">
                        <li>• MacBook Pro</li>
                        <li>• Dell XPS</li>
                        <li>• ThinkPad X1</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="clothing" variant="bordered">
              <AccordionTrigger icon={<Package weight="bold" />}>Clothing</AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="mens" variant="ghost">
                    <AccordionTrigger chevronPosition="left">Men's</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-6 space-y-1 text-sm">
                        <li>• Shirts</li>
                        <li>• Pants</li>
                        <li>• Jackets</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="womens" variant="ghost">
                    <AccordionTrigger chevronPosition="left">Women's</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-6 space-y-1 text-sm">
                        <li>• Dresses</li>
                        <li>• Tops</li>
                        <li>• Accessories</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use cases</h3>
        <p className="text-[var(--foreground)] text-[var(--muted-foreground)]">Common patterns.</p>
      </div>

      <PlaygroundSection
        title="FAQ section"
        description="Classic FAQ layout with single-open accordion."
        code={`<Accordion type="single" collapsible>
  <AccordionItem value="q1" variant="bordered">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1" variant="bordered">
              <AccordionTrigger>Is there a free tier?</AccordionTrigger>
              <AccordionContent>Yes — the library is open source and free for all projects.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" variant="bordered">
              <AccordionTrigger>Can I customise the theme?</AccordionTrigger>
              <AccordionContent>Absolutely. Override CSS variables or use data-accent to switch between 5 colour palettes.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" variant="bordered">
              <AccordionTrigger>What frameworks are supported?</AccordionTrigger>
              <AccordionContent>React 18+ and Next.js (App Router and Pages Router). All components use 'use client'.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PlaygroundSection>

      <PlaygroundSection
        title="Settings sections"
        description="Multiple open sections for settings groups."
        code={`<Accordion type="multiple" defaultValue={["general"]}>
  <AccordionItem value="general">
    <AccordionTrigger>General</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="security">
    <AccordionTrigger>Security</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Card className="w-full">
          <CardContent className="py-4">
            <Accordion type="multiple" defaultValue={["general"]}>
              <AccordionItem value="general">
                <AccordionTrigger>General <Badge variant="secondary" size="sm" className="ml-2">3 settings</Badge></AccordionTrigger>
                <AccordionContent>Display name, email, timezone configuration.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="notifications">
                <AccordionTrigger>Notifications <Badge variant="secondary" size="sm" className="ml-2">5 settings</Badge></AccordionTrigger>
                <AccordionContent>Email, push, SMS notification preferences.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="security">
                <AccordionTrigger>Security <Badge variant="secondary" size="sm" className="ml-2">2 settings</Badge></AccordionTrigger>
                <AccordionContent>Two-factor authentication, session management.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </PlaygroundSection>

    </ComponentPage>
  );
}
