import React, { useState, useCallback } from 'react';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Button } from 'invin-uix/ui/button';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'invin-uix/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';
import { Slider } from 'invin-uix/ui/slider';
import { Code, Eye, Copy, Check, Terminal, Lightbulb } from 'invin-uix/ui/icons';

/**
 * CodeBlock — Syntax-highlighted code display with copy button
 */
function CodeBlock({ code, language = 'jsx', showLineNumbers = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  const lines = code.trim().split('\n');

  return (
    <div className="relative group">
      {/* Copy button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <Check style={{ width: 14, height: 14, color: 'var(--ok)' }} />
        ) : (
          <Copy style={{ width: 14, height: 14 }} />
        )}
      </Button>

      {/* Language badge */}
      <Badge 
        variant="secondary" 
        size="sm" 
        className="absolute top-2 left-3 text-[10px] uppercase tracking-wider"
      >
        {language}
      </Badge>

      {/* Code content */}
      <pre className="pt-10 pb-4 px-4 text-[13px] overflow-x-auto font-mono leading-relaxed bg-[var(--background)] rounded-b-[var(--radius-lg)]">
        <code className="text-[var(--foreground)]">
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none text-[var(--muted-foreground-faint)] w-8 text-right pr-4 shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1">{highlightSyntax(line)}</span>
              </div>
            ))
          ) : (
            lines.map((line, i) => (
              <div key={i}>{highlightSyntax(line)}</div>
            ))
          )}
        </code>
      </pre>
    </div>
  );
}

/**
 * Simple syntax highlighting for JSX code
 */
function highlightSyntax(line) {
  // This is a simplified highlighter - in production you'd use a library like Prism or Shiki
  return line
    .split(/(<[^>]+>|'[^']*'|"[^"]*"|`[^`]*`|{[^}]*}|\/\/.*$)/g)
    .map((part, i) => {
      if (!part) return null;
      
      // Comments
      if (part.startsWith('//')) {
        return <span key={i} className="text-[var(--muted-foreground)]">{part}</span>;
      }
      // Strings
      if (/^['"`]/.test(part)) {
        return <span key={i} className="text-[var(--ok)]">{part}</span>;
      }
      // JSX tags
      if (part.startsWith('<')) {
        return <span key={i} className="text-[var(--accent)]">{part}</span>;
      }
      // Braces/expressions
      if (part.startsWith('{')) {
        return <span key={i} className="text-[var(--warning)]">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
}

/**
 * PlaygroundSection — Enhanced demo section with preview, code, and optional tips
 */
export function PlaygroundSection({ 
  title, 
  description, 
  code, 
  tip,
  children,
  defaultView = 'preview',
  showLineNumbers = false,
  layout = 'default' // 'default' | 'split' | 'stacked'
}) {
  const [activeView, setActiveView] = useState(defaultView);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [code]);

  // Split layout - preview and code side by side
  if (layout === 'split' && code) {
    return (
      <div className="space-y-3">
        <div>
          <h3 className="text-label font-semibold text-[var(--foreground)]">{title}</h3>
          {description && (
            <p className="text-caption text-[var(--muted-foreground)] mt-0.5">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Preview */}
          <Card className="h-full">
            <div className="px-4 py-2 border-b border-[var(--border)] flex items-center gap-2">
              <Eye style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              <span className="text-[11px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide">
                Preview
              </span>
            </div>
            <CardContent className="pt-5 pb-5">
              {children}
            </CardContent>
          </Card>

          {/* Code */}
          <Card className="h-full overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
                <span className="text-[11px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide">
                  Code
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopyCode}
                aria-label={copied ? 'Copied' : 'Copy code'}
              >
                {copied ? (
                  <Check style={{ width: 14, height: 14, color: 'var(--ok)' }} />
                ) : (
                  <Copy style={{ width: 14, height: 14 }} />
                )}
              </Button>
            </div>
            <pre className="p-4 text-[13px] overflow-x-auto font-mono text-[var(--foreground)] leading-relaxed max-h-[400px] overflow-y-auto">
              <code>{code.trim()}</code>
            </pre>
          </Card>
        </div>

        {tip && <TipBlock tip={tip} />}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-label font-semibold text-[var(--foreground)]">{title}</h3>
        {description && (
          <p className="text-caption text-[var(--muted-foreground)] mt-0.5">{description}</p>
        )}
      </div>

      <Card className="overflow-visible">
        {/* Tabs Header */}
        {code && (
          <div className="px-4 py-2 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant={activeView === 'preview' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('preview')}
                className="h-7 text-[11px] gap-1.5"
              >
                <Eye style={{ width: 12, height: 12 }} />
                Preview
              </Button>
              <Button
                variant={activeView === 'code' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('code')}
                className="h-7 text-[11px] gap-1.5"
              >
                <Code style={{ width: 12, height: 12 }} />
                Code
              </Button>
            </div>
            
            {activeView === 'code' && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleCopyCode}
                aria-label={copied ? 'Copied' : 'Copy code'}
              >
                {copied ? (
                  <Check style={{ width: 14, height: 14, color: 'var(--ok)' }} />
                ) : (
                  <Copy style={{ width: 14, height: 14 }} />
                )}
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        {code ? (
          activeView === 'preview' ? (
            <CardContent className="pt-5 pb-5 overflow-visible">
              {children}
            </CardContent>
          ) : (
            <div className="bg-[var(--background)]">
              <pre className="p-4 text-[13px] overflow-x-auto font-mono text-[var(--foreground)] leading-relaxed max-h-[500px] overflow-y-auto">
                <code>
                  {showLineNumbers ? (
                    code.trim().split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="select-none text-[var(--muted-foreground-faint)] w-8 text-right pr-4 shrink-0">
                          {i + 1}
                        </span>
                        <span className="flex-1">{line}</span>
                      </div>
                    ))
                  ) : (
                    code.trim()
                  )}
                </code>
              </pre>
            </div>
          )
        ) : (
          /* No code provided - just show children */
          <CardContent className="pt-5 pb-5 overflow-visible">
            {children}
          </CardContent>
        )}
      </Card>

      {tip && <TipBlock tip={tip} />}
    </div>
  );
}

/**
 * TipBlock — Contextual tips and best practices
 */
function TipBlock({ tip }) {
  return (
    <div className="flex gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--accent-soft)] border border-[var(--accent)]/20">
      <Lightbulb style={{ width: 16, height: 16, color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
      <p className="text-caption text-[var(--foreground)]">{tip}</p>
    </div>
  );
}

/**
 * PropsTable — Enhanced props documentation table
 */
export function PropsTable({ props: propsList, title = "Props" }) {
  if (!propsList || propsList.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Terminal style={{ width: 16, height: 16, color: 'var(--muted-foreground)' }} />
        <h3 className="text-label font-semibold text-[var(--foreground)]">{title}</h3>
        <Badge variant="secondary" size="sm">{propsList.length}</Badge>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-caption">
            <thead>
              <tr className="bg-[var(--secondary)]/50">
                <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">
                  Prop
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">
                  Default
                </th>
                <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {propsList.map((p, i) => (
                <tr 
                  key={i} 
                  className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--secondary)]/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-[var(--accent)] font-mono text-[12px] bg-[var(--accent-soft)] px-1.5 py-0.5 rounded">
                      {p.name}
                    </code>
                    {p.required && (
                      <Badge variant="destructive" size="sm" className="ml-2 text-[9px]">Required</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <code className="font-mono text-[11px] text-[var(--muted-foreground)] bg-[var(--secondary)] px-1.5 py-0.5 rounded">
                      {p.type}
                    </code>
                  </td>
                  <td className="py-3 px-4 font-mono text-[12px] text-[var(--muted-foreground)]">
                    {p.default || <span className="text-[var(--muted-foreground-faint)]">—</span>}
                  </td>
                  <td className="py-3 px-4 text-[var(--muted-foreground)] max-w-md">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/**
 * ComponentPage — Full page layout for a single component demo
 */
export function ComponentPage({ name, description, importCode, badges = [], children }) {
  const [importCopied, setImportCopied] = useState(false);

  const handleCopyImport = useCallback(async () => {
    if (!importCode) return;
    try {
      await navigator.clipboard.writeText(importCode.trim());
      setImportCopied(true);
      setTimeout(() => setImportCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [importCode]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[var(--foreground)] font-[700] tracking-[-0.02em] text-xl">
            {name}
          </h2>
          {badges.map((badge, i) => (
            <Badge key={i} variant={badge.variant || 'secondary'} size="sm">
              {badge.label}
            </Badge>
          ))}
        </div>
        {description && (
          <p className="text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Import */}
      {importCode && (
        <Card className="overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--border)] flex items-center justify-between bg-[var(--secondary)]/30">
            <div className="flex items-center gap-2">
              <Terminal style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              <span className="text-[11px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide">
                Import
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopyImport}
              aria-label={importCopied ? 'Copied' : 'Copy import'}
            >
              {importCopied ? (
                <Check style={{ width: 14, height: 14, color: 'var(--ok)' }} />
              ) : (
                <Copy style={{ width: 14, height: 14 }} />
              )}
            </Button>
          </div>
          <CardContent className="py-4 px-4 bg-[var(--background)]">
            <pre className="text-[13px] font-mono text-[var(--foreground)] overflow-x-auto">
              <code>{importCode}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Demo Sections */}
      <div className="space-y-10">
        {children}
      </div>
    </div>
  );
}

/**
 * InteractiveDemo — Component with live prop controls (Enhanced UI)
 */
export function InteractiveDemo({ 
  title, 
  description,
  controls,
  children,
  code
}) {
  const [props, setProps] = useState(() => {
    const initial = {};
    controls?.forEach(c => {
      initial[c.name] = c.default;
    });
    return initial;
  });

  const updateProp = (name, value) => {
    setProps(prev => ({ ...prev, [name]: value }));
  };

  // Group controls by type for better organization
  const selectControls = controls?.filter(c => c.type === 'select') || [];
  const booleanControls = controls?.filter(c => c.type === 'boolean') || [];
  const otherControls = controls?.filter(c => c.type !== 'select' && c.type !== 'boolean') || [];

  return (
    <div className="space-y-4">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/30" />
        <div className="pl-2">
          <h3 className="text-[15px] font-semibold text-[var(--foreground)] flex items-center gap-2">
            {title}
            <Badge variant="accent" size="sm" className="font-normal">Interactive</Badge>
          </h3>
          {description && (
            <p className="text-caption text-[var(--muted-foreground)] mt-1 max-w-2xl">{description}</p>
          )}
        </div>
      </div>

      {/* Main playground container */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] overflow-visible">
        
        {/* Preview Panel */}
        <div className="relative overflow-visible rounded-t-[var(--radius-lg)]">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--secondary)]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent)]/10">
                <Eye style={{ width: 12, height: 12, color: 'var(--accent)' }} />
              </div>
              <span className="text-[12px] text-[var(--foreground)] font-medium">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--ok)]" />
              <span className="text-[10px] text-[var(--muted-foreground)]">Live</span>
            </div>
          </div>
          
          {/* Preview content with pattern background */}
          <div 
            className="relative min-h-[200px] flex items-center justify-center p-8 overflow-visible"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)
              `,
              backgroundSize: '24px 24px',
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.02] via-transparent to-[var(--accent)]/[0.02]" />
            
            {/* Component render */}
            <div className="relative z-10 w-full flex items-center justify-center overflow-visible" key={JSON.stringify(props)}>
              {typeof children === 'function' ? children(props) : children}
            </div>
          </div>
        </div>

        {/* Controls Panel - Below Preview */}
        {controls && controls.length > 0 && (
          <div className="border-t border-[var(--border)] bg-[var(--background)]">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--secondary)]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--foreground)]/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--foreground)]">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </div>
                <span className="text-[12px] text-[var(--foreground)] font-medium">
                  Controls
                </span>
              </div>
              <Badge variant="secondary" size="sm" className="text-[10px]">
                {controls.length}
              </Badge>
            </div>

            {/* Controls content - Grid layout */}
            <div className="p-4">
              {/* Select controls in a row */}
              {selectControls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {selectControls.map(control => (
                    <ControlInput
                      key={control.name}
                      control={control}
                      value={props[control.name]}
                      onChange={(value) => updateProp(control.name, value)}
                    />
                  ))}
                </div>
              )}

              {/* Boolean controls in a row */}
              {booleanControls.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {booleanControls.map(control => (
                    <ControlInput
                      key={control.name}
                      control={control}
                      value={props[control.name]}
                      onChange={(value) => updateProp(control.name, value)}
                    />
                  ))}
                </div>
              )}

              {/* Other controls in a row */}
              {otherControls.length > 0 && (
                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${(selectControls.length > 0 || booleanControls.length > 0) ? 'mt-4 pt-4 border-t border-[var(--border)]' : ''}`}>
                  {otherControls.map(control => (
                    <ControlInput
                      key={control.name}
                      control={control}
                      value={props[control.name]}
                      onChange={(value) => updateProp(control.name, value)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SelectControl — Uses library's Select component
 */
function SelectControl({ name, label, value, options, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
        {label || name}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger size="sm" className="w-full">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * ControlInput — Individual control input based on type (Enhanced)
 */
function ControlInput({ control, value, onChange }) {
  const { name, type, options, label, description } = control;

  // Boolean toggle - compact pill style for side-by-side layout
  if (type === 'boolean') {
    return (
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border transition-all
          ${value 
            ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]' 
            : 'bg-[var(--secondary)]/50 border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)]'
          }
        `}
      >
        <span 
          className={`
            w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors
            ${value ? 'bg-[var(--accent)]' : 'bg-[var(--secondary)] border border-[var(--border)]'}
          `}
        >
          {value && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
        <span className="text-[13px] font-medium whitespace-nowrap">
          {label || name}
        </span>
      </button>
    );
  }

  // Select dropdown - using custom component for better styling
  if (type === 'select') {
    return (
      <SelectControl
        name={name}
        label={label}
        value={value}
        options={options}
        onChange={onChange}
      />
    );
  }

  // Text input
  if (type === 'text') {
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
          {label || name}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={control.placeholder}
          className="w-full h-9 px-3 text-[13px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all"
        />
      </div>
    );
  }

  // Number input as slider
  if (type === 'number') {
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide flex items-center justify-between">
          {label || name}
          <span className="text-[var(--accent)] font-mono">{value}</span>
        </label>
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={control.min || 0}
          max={control.max || 100}
          step={control.step || 1}
        />
      </div>
    );
  }

  // Color input
  if (type === 'color') {
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
          {label || name}
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-9 h-9 rounded-[var(--radius-md)] border border-[var(--border)] cursor-pointer p-0.5"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 h-9 px-3 text-[13px] font-mono rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>
    );
  }

  return null;
}

/**
 * DemoGrid — Grid layout for multiple component examples
 */
export function DemoGrid({ children, columns = 3 }) {
  const colsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${colsClass} gap-4`}>
      {children}
    </div>
  );
}

/**
 * DemoCard — Individual demo card within a grid
 */
export function DemoCard({ title, description, children }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-4 pb-4 space-y-3">
        {title && (
          <p className="text-caption font-semibold text-[var(--foreground)]">{title}</p>
        )}
        <div className="flex items-center justify-center py-4">
          {children}
        </div>
        {description && (
          <p className="text-[11px] text-[var(--muted-foreground)]">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export { CodeBlock, TipBlock };
