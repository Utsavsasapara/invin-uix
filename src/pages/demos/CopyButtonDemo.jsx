import { useEffect, useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { CopyButton } from 'invin-uix/ui/copy-button';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Input } from 'invin-uix/ui/input';
import { Separator } from 'invin-uix/ui/separator';
import { Switch } from 'invin-uix/ui/switch';
import { Badge } from 'invin-uix/ui/badge';

const SNIPPET = `import { CopyButton } from 'invin-uix/ui/copy-button';

<CopyButton value="npm install invin-uix" />`;

// ─── Local helpers ────────────────────────────────────────────────────────────

const simulateFetch = async () => {
  await new Promise((res) => setTimeout(res, 1500));
  return `https://signed-url.example.com/file?token=${Date.now()}`;
};

const ClipboardSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="2" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
);

const CheckSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/**
 * While `active`, makes the Clipboard API reject so the error state can be seen on demand.
 * The real clipboard is put back when switched off or unmounted.
 */
function useSimulatedClipboardFailure(active) {
  useEffect(() => {
    if (!active) return undefined;
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Clipboard access blocked (simulated)')) },
      configurable: true,
    });
    return () => {
      if (original) Object.defineProperty(navigator, 'clipboard', original);
      else delete navigator.clipboard;
    };
  }, [active]);
}

export default function CopyButtonDemo() {
  const [copyCount, setCopyCount] = useState(0);
  const [lastCopied, setLastCopied] = useState('');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [lastError, setLastError] = useState('');
  useSimulatedClipboardFailure(simulateFailure);

  return (
    <ComponentPage
      name="CopyButton"
      description="A button that copies text to the clipboard and confirms it. Idle, copied and failed states, a feedback timeout, a fallback for non-secure contexts, and screen reader announcements."
      importCode={`import { CopyButton } from 'invin-uix/ui/copy-button';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Change the props and click the button, then paste somewhere to check what was copied."
        controls={[
          { name: 'value', label: 'Value to copy', type: 'text', default: 'npm install invin-uix' },
          { name: 'label', label: 'Label', type: 'text', default: 'Copy' },
          { name: 'copiedLabel', label: 'Copied label', type: 'text', default: 'Copied!' },
          {
            name: 'variant',
            label: 'Variant',
            type: 'select',
            default: 'outline',
            options: [
              { value: 'default', label: 'Default (filled)' },
              { value: 'primary', label: 'Primary (alias for Default)' },
              { value: 'outline', label: 'Outline' },
              { value: 'secondary', label: 'Secondary' },
              { value: 'ghost', label: 'Ghost' },
            ],
          },
          {
            name: 'size',
            label: 'Size',
            type: 'select',
            default: 'md',
            options: [
              { value: 'sm', label: 'Small' },
              { value: 'md', label: 'Medium' },
              { value: 'lg', label: 'Large' },
              { value: 'icon', label: 'Icon' },
              { value: 'icon-sm', label: 'Icon Small' },
            ],
          },
          { name: 'timeout', label: 'Feedback timeout (ms)', type: 'number', default: 2000, min: 0, max: 5000, step: 250 },
          { name: 'showLabel', label: 'Show label', type: 'boolean', default: true },
          { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <CopyButton
            value={props.value}
            label={props.label}
            copiedLabel={props.copiedLabel}
            variant={props.variant}
            size={props.size}
            timeout={props.timeout}
            showLabel={props.showLabel}
            disabled={props.disabled}
          />
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'string', default: '—', description: 'Text to copy to the clipboard. Required unless getValue is provided; omitting both is a silent no-op.' },
          { name: 'getValue', type: '() => string | Promise<string>', default: '—', description: 'Async getter called on click to resolve the text to copy. Takes precedence over value when both are provided. Shows a loading spinner and disables the button while pending.' },
          { name: 'label', type: 'string', default: "'Copy'", description: 'Label shown while idle. Also the accessible name while idle' },
          { name: 'copiedLabel', type: 'string', default: "'Copied!'", description: 'Label shown after a successful copy' },
          { name: 'errorLabel', type: 'string', default: "'Failed'", description: 'Label shown when the copy fails' },
          { name: 'timeout', type: 'number', default: '2000', description: 'How long the copied / failed feedback stays visible (ms)' },
          { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show the text label next to the icon' },
          { name: 'variant', type: "'default' | 'primary' | 'outline' | 'ghost' | 'secondary'", default: "'outline'", description: "Visual variant. 'default' and 'primary' both produce the filled primary style." },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon-sm' | 'icon'", default: "'md'", description: 'Button size' },
          { name: 'onCopy', type: '(value: string) => void', default: '—', description: 'Called when the copy succeeds' },
          { name: 'onCopyError', type: '(error: Error) => void', default: '—', description: 'Called when the copy fails' },
          { name: 'announcement', type: 'CopyButtonAnnouncement', default: '—', description: "Override screen reader text for i18n. Fields: copied (live region on success), error (live region on failure), copiedName (aria-label on success), errorName (aria-label on failure)." },
          { name: 'icons', type: 'CopyButtonIcons', default: '—', description: "Override the icon for one or more states: idle, copied, error, loading. Custom icons control their own sizing; default Phosphor icons are used for unspecified states." },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
          { name: 'className', type: 'string', default: '—', description: 'CSS class(es) applied to the button element. The aria-live region is a sibling, not a child, so className does not affect it.' },
          { name: 'aria-label', type: 'string', default: 'current action', description: "Overrides the accessible name in every state (default: the label, then 'Copied', then 'Copy failed')" },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic usage"
        description="Pass the text to copy. Click and the icon and label confirm it, then reset after two seconds."
        code={`<CopyButton value="npm install invin-uix" />`}
      >
        <CopyButton value="npm install invin-uix" />
      </PlaygroundSection>

      {/* ─── Variants ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Variants"
        description="The Button variants. On a filled button the whole fill turns green (or red); on the others the icon and border are tinted and the label keeps its own colour."
        code={`<CopyButton value={text} variant="default" />
<CopyButton value={text} variant="outline" />
<CopyButton value={text} variant="secondary" />
<CopyButton value={text} variant="ghost" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton value="default variant" variant="default" />
          <CopyButton value="outline variant" variant="outline" />
          <CopyButton value="secondary variant" variant="secondary" />
          <CopyButton value="ghost variant" variant="ghost" />
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Three text sizes and two square icon sizes."
        code={`<CopyButton value={text} size="sm" />
<CopyButton value={text} size="md" />
<CopyButton value={text} size="lg" />
<CopyButton value={text} size="icon" showLabel={false} />
<CopyButton value={text} size="icon-sm" showLabel={false} />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton value="small" size="sm" />
          <CopyButton value="medium" size="md" />
          <CopyButton value="large" size="lg" />
          <CopyButton value="icon" size="icon" showLabel={false} />
          <CopyButton value="icon small" size="icon-sm" showLabel={false} />
        </div>
      </PlaygroundSection>

      {/* ─── Disabled state ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled state"
        description="A disabled CopyButton is not focusable, does not respond to clicks, and cannot copy. Use it when the value is unavailable or the action is not permitted in the current context."
        code={`<CopyButton value={text} disabled />
<CopyButton value={text} disabled variant="default" />
<CopyButton value={text} disabled showLabel={false} size="icon" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton value="disabled outline" disabled />
          <CopyButton value="disabled filled" disabled variant="default" />
          <CopyButton value="disabled ghost" disabled variant="ghost" />
          <CopyButton value="disabled icon" disabled showLabel={false} size="icon" />
        </div>
      </PlaygroundSection>

      {/* ─── Icon only ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Icon only, in a code block"
        description="The common case: a ghost icon button in the corner of a snippet. The accessible name stays 'Copy' even though the text is hidden."
        code={`<div className="relative rounded-lg border border-[var(--border)] bg-[var(--secondary)]">
  <pre className="p-4 pr-12 text-sm"><code>{snippet}</code></pre>
  <CopyButton
    value={snippet}
    showLabel={false}
    size="icon-sm"
    variant="ghost"
    className="absolute right-2 top-2"
  />
</div>`}
      >
        <div className="relative w-full max-w-lg rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)]">
          <pre className="p-4 pr-12 text-[13px] font-mono overflow-x-auto"><code>{SNIPPET}</code></pre>
          <CopyButton value={SNIPPET} showLabel={false} size="icon-sm" variant="ghost" className="absolute right-2 top-2" />
        </div>
      </PlaygroundSection>

      {/* ─── Custom icons ────────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom icons"
        description="Replace the default Phosphor icons with any icon set. Pass ReactNode for each state. Useful when the host project uses a different icon library."
        code={`// Define your own icons — any ReactNode works (Lucide, HeroIcons, inline SVG…)
const ClipboardSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="2" width="6" height="4" rx="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  </svg>
);
const CheckSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

<CopyButton
  value="custom icons example"
  icons={{ idle: <ClipboardSvg />, copied: <CheckSvg /> }}
/>`}
      >
        <CopyButton
          value="custom icons example"
          icons={{ idle: <ClipboardSvg />, copied: <CheckSvg /> }}
        />
      </PlaygroundSection>

      {/* ─── Custom labels ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom labels and timeout"
        description="Rename every state and change how long the feedback stays. Here it stays for five seconds."
        code={`<CopyButton
  value={inviteLink}
  label="Copy invite link"
  copiedLabel="Link copied"
  errorLabel="Could not copy"
  timeout={5000}
/>`}
      >
        <CopyButton
          value="https://example.com/invite/9f3a1c"
          label="Copy invite link"
          copiedLabel="Link copied"
          errorLabel="Could not copy"
          timeout={5000}
        />
      </PlaygroundSection>

      {/* ─── In a field ─────────────────────────────────────────── */}
      <PlaygroundSection
        title="Next to a read-only field"
        description="An API key with an icon button. Pass a specific label so assistive tech hears 'Copy API key'."
        code={`<div className="flex items-center gap-2">
  <Input readOnly value={apiKey} className="font-mono" />
  <CopyButton value={apiKey} label="Copy API key" showLabel={false} size="icon" />
</div>`}
      >
        <div className="flex w-full max-w-md items-center gap-2">
          <Input readOnly value="iuix_live_7c2e91d4a8b3" className="font-mono" aria-label="API key" />
          <CopyButton value="iuix_live_7c2e91d4a8b3" label="Copy API key" showLabel={false} size="icon" />
        </div>
      </PlaygroundSection>

      {/* ─── Callbacks ──────────────────────────────────────────── */}
      <PlaygroundSection
        title="Callbacks"
        description="onCopy receives the copied value; onCopyError receives an Error. Switch on the simulated failure to see the red state and the error callback."
        code={`<CopyButton
  value={token}
  onCopy={(value) => track('token_copied', { length: value.length })}
  onCopyError={(error) => console.warn(error.message)}
/>`}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <CopyButton
              value="session-token-4f81"
              label="Copy token"
              onCopy={(value) => {
                setCopyCount((n) => n + 1);
                setLastCopied(value);
                setLastError('');
              }}
              onCopyError={(error) => setLastError(error.message)}
            />
            <label className="flex items-center gap-2 text-caption text-[var(--muted-foreground)]">
              <Switch checked={simulateFailure} onCheckedChange={setSimulateFailure} aria-label="Simulate clipboard failure" />
              Simulate clipboard failure
            </label>
          </div>
          <Card>
            <CardContent className="py-3 space-y-1 text-caption">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Successful copies</span>
                <Badge variant="secondary" size="sm">{copyCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Last copied</span>
                <span className="font-mono">{lastCopied || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Last error</span>
                <span className="font-mono text-[var(--error)]">{lastError || '—'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Localization (announcement prop) ───────────────────── */}
      <PlaygroundSection
        title="Localization (announcement prop)"
        description="Translate the screen reader announcements independently of the visible labels. The visible copiedLabel/errorLabel changes what sighted users see; announcement changes what screen readers hear."
        code={`<CopyButton
  value={text}
  copiedLabel="Copié !"
  errorLabel="Échec"
  announcement={{copied: 'Copié dans le presse-papier',
    error: "Échec de la copie",
    copiedName: 'Copié',
    errorName: 'Échec',}}
/>`}
      >
        <CopyButton
          value="Bonjour le monde"
          label="Copier"
          copiedLabel="Copié !"
          errorLabel="Échec"
          announcement={{copied: 'Copié dans le presse-papier',
            error: "Échec de la copie",
            copiedName: 'Copié',
            errorName: 'Échec',}}
        />
      </PlaygroundSection>

      {/* ─── Async value (getValue) ─────────────────────────────── */}
      <PlaygroundSection
        title="Async value (getValue)"
        description="Use getValue when the text to copy must be generated or fetched on click — a signed URL, a one-time token, or any server-computed value. The button shows a loading spinner while waiting and returns to idle if the fetch fails."
        code={`<CopyButton
  getValue={async () => {
    const res = await api.getSignedUrl(fileId);
    return res.url;
  }}
  label="Copy signed URL"
  copiedLabel="URL copied"
/>`}
      >
        <CopyButton
          getValue={simulateFetch}
          label="Copy signed URL"
          copiedLabel="URL copied"
          errorLabel="Fetch failed"
        />
      </PlaygroundSection>

      {/* ─── Accessibility notes ────────────────────────────────── */}
      <PlaygroundSection
        title="Accessibility"
        description="What assistive technology gets from the button."
        code={`// accessible name: "Copy" → "Copied" → "Copy failed" (or your own aria-label)
// a visually hidden aria-live="polite" region announces
//   "Copied to clipboard" / "Copy failed"
// it sits outside the <button>, because a button's children are presentational
<CopyButton value={text} aria-label="Copy deployment ID" />`}
      >
        <CopyButton value="deploy-2026-10-20-a" aria-label="Copy deployment ID" label="Copy deployment ID" />
      </PlaygroundSection>

    </ComponentPage>
  );
}
