import { useEffect, useMemo, useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { JSONViewer } from 'invin-uix/ui/json-viewer';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Button } from 'invin-uix/ui/button';
import { Textarea } from 'invin-uix/ui/textarea';
import { Separator } from 'invin-uix/ui/separator';

const LONG_MESSAGE =
  'The authentication service rejected 14 consecutive sign-in attempts for this account from a previously unseen network (203.0.113.9). The account was temporarily locked for 15 minutes and the owner was notified by email. No further action is needed unless the attempts continue after the lock expires.';

const EVENT = {
  id: 'evt_8f3a21',
  timestamp: '2026-10-20T09:41:07.000Z',
  severity: 'high',
  acknowledged: false,
  score: 87.5,
  assignee: null,
  source: { type: 'identity', host: 'idp-eu-1', ip: '203.0.113.9' },
  tags: ['brute-force', 'identity', 'eu'],
  message: LONG_MESSAGE,
  related: [
    { id: 'evt_8f3a19', severity: 'medium', count: 3 },
    { id: 'evt_8f3a20', severity: 'low', count: 11 },
  ],
};

const SAMPLES = {
  event: EVENT,
  response: {
    status: 200,
    data: {
      users: [
        { id: 1, name: 'Alice Johnson', roles: ['admin', 'analyst'], active: true },
        { id: 2, name: 'Bob Kim', roles: ['analyst'], active: true },
        { id: 3, name: 'Chandra Rao', roles: [], active: false },
      ],
      page: 1,
      total: 3,
    },
    meta: { requestId: 'req_41d9', durationMs: 42 },
  },
  array: [1, 'two', true, null, { three: 3 }, [4, 5]],
  string: LONG_MESSAGE,
};

const EXPANDED = [
  { value: 'false', label: 'false (root only)' },
  { value: '0', label: '0 (collapsed)' },
  { value: '2', label: '2 levels' },
  { value: '3', label: '3 levels' },
  { value: 'true', label: 'true (all)' },
];

const parseExpanded = (v) => (v === 'true' ? true : v === 'false' ? false : Number(v));

const circular = { name: 'parent', children: [] };
circular.children.push({ name: 'child', parent: circular });

const ALL_TYPES = {
  string: 'text',
  number: 42,
  float: 3.14,
  boolean: true,
  nothing: null,
  missing: undefined,
  nan: Number.NaN,
  infinity: Infinity,
  big: 9007199254740993n,
  symbol: Symbol('tag'),
  fn: function handler() {},
  date: new Date('2026-10-20T09:41:07.000Z'),
  empty: { object: {}, array: [] },
  circular,
};

/** A feed that adds an event every few seconds: what you open stays open when the data changes */
function LiveFeed() {
  const [events, setEvents] = useState(() => [{ id: 1, level: 'info', text: 'Collector started' }]);
  useEffect(() => {
    const t = setInterval(() => {
      setEvents((current) => {
        const n = current.length + 1;
        return [{ id: n, level: n % 3 === 0 ? 'warn' : 'info', text: `Event ${n}` }, ...current].slice(0, 6);
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);
  return <JSONViewer data={{ updatedAt: events.length, events }} defaultExpanded={2} className="w-full" />;
}

const SAMPLE_INPUT = '{"hello": "world", "list": [1, 2, {"deep": true}], "n": null}';

function TryIt() {
  const [text, setText] = useState(SAMPLE_INPUT);
  const parsed = useMemo(() => {
    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, [text]);
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Textarea
          aria-label="JSON input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] font-mono"
          spellCheck={false}
        />
        <p className="text-caption text-[var(--muted-foreground)]" role="status">
          {parsed.ok ? 'Valid JSON' : `Not valid JSON: ${parsed.error}`}
        </p>
      </div>
      <Card>
        <CardContent className="p-4">
          {parsed.ok ? (
            <JSONViewer data={parsed.value} defaultExpanded copyable />
          ) : (
            <p className="text-body text-[var(--muted-foreground)]">Fix the JSON to see the tree.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function JSONViewerDemo() {
  const [key, setKey] = useState(0);
  const [lastCopiedPath, setLastCopiedPath] = useState('');

  return (
    <ComponentPage
      name="JSONViewer"
      description="A collapsible, syntax-coloured tree for JSON and other data. Zero dependencies, colours from the design tokens, with expand depth, string truncation, item counts, line numbers and copy-on-hover."
      importCode={`import { JSONViewer } from 'invin-uix/ui/json-viewer';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Open and close nodes, copy values, cut long strings. The expand depth is read on first render, so changing it remounts the viewer."
        controls={[
          {
            name: 'sample',
            label: 'Data',
            type: 'select',
            default: 'event',
            options: [
              { value: 'event', label: 'Security event' },
              { value: 'response', label: 'API response' },
              { value: 'array', label: 'Mixed array' },
              { value: 'string', label: 'A long string' },
            ],
          },
          { name: 'defaultExpanded', label: 'defaultExpanded', type: 'select', default: 'false', options: EXPANDED },
          { name: 'maxStringLength', label: 'maxStringLength (0 = off)', type: 'number', default: 80, min: 0, max: 400, step: 10 },
          { name: 'indent', label: 'indent', type: 'number', default: 2, min: 0, max: 8, step: 1 },
          { name: 'copyable', label: 'copyable', type: 'boolean', default: true },
          { name: 'copyFeedbackDuration', label: 'copyFeedbackDuration (ms)', type: 'number', default: 2000, min: 0, max: 5000, step: 250 },
          { name: 'lineNumbers', label: 'lineNumbers', type: 'boolean', default: false },
          { name: 'showItemCount', label: 'showItemCount', type: 'boolean', default: true },
        ]}
      >
        {(props) => (
          <div className="w-full">
            <JSONViewer
              key={`${props.sample}-${props.defaultExpanded}`}
              data={SAMPLES[props.sample]}
              defaultExpanded={parseExpanded(props.defaultExpanded)}
              maxStringLength={props.maxStringLength}
              indent={props.indent}
              copyable={props.copyable}
              lineNumbers={props.lineNumbers}
              showItemCount={props.showItemCount}
              copyFeedbackDuration={props.copyFeedbackDuration}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'data', type: 'unknown', default: '—', description: 'The value to display (required)' },
          { name: 'defaultExpanded', type: 'boolean | number', default: 'false', description: 'How deep to open on first render: true = all, false or 1 = root only, a number = that many levels, 0 = collapsed' },
          { name: 'maxStringLength', type: 'number', default: '200', description: 'Strings longer than this are cut with a show more link; 0 never cuts' },
          { name: 'copyable', type: 'boolean', default: 'false', description: 'Show a copy button on each value (on hover or focus)' },
          { name: 'lineNumbers', type: 'boolean', default: 'false', description: 'Number the visible rows' },
          { name: 'indent', type: 'number', default: '2', description: 'Characters per indent level (also used when copying)' },
          { name: 'showItemCount', type: 'boolean', default: 'true', description: 'Show the item count of objects and arrays' },
          { name: 'className', type: 'string', default: '—', description: 'CSS class(es) on the root div. Use to set max-height, overflow, border, and padding.' },
          { name: 'expandedPaths', type: 'readonly string[]', default: '—', description: 'Paths to force open regardless of defaultExpanded (e.g. "source", "users[0]"). User can still toggle other nodes.' },
          { name: 'onExpandChange', type: '(path: string, expanded: boolean) => void', default: '—', description: 'Called when the user opens or closes a node. Pair with expandedPaths for controlled state.' },
          { name: 'onCopy', type: '(value: unknown, path: string) => void', default: '—', description: "Called when a copy succeeds. path is '' for the root." },
          { name: 'onCopyError', type: '(error: Error, path: string) => void', default: '—', description: 'Called when a copy fails.' },
          { name: 'renderValue', type: '(params: JSONViewerRenderValueParams) => ReactNode', default: '—', description: 'Override how leaf values render. Return params.defaultContent to keep the default for unchanged values.' },
          { name: 'labels', type: 'JSONViewerLabels', default: '—', description: 'Override UI strings for i18n: showMore, showLess, copied, copyError.' },
          { name: 'copyFeedbackDuration', type: 'number', default: '2000', description: 'How long the copy check/cross icon stays visible in ms.' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Basic usage"
        description="The root is open and everything below it is collapsed. Click anywhere on an object or array line to open it, or Tab to it and press Enter."
        code={`<JSONViewer data={{ name: 'Alice', age: 28, roles: ['admin', 'user'] }} />`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <JSONViewer data={{ name: 'Alice', age: 28, roles: ['admin', 'user'] }} />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Expand depth ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Expand depth"
        description="defaultExpanded: false (or 1) shows the root's contents, a number opens that many levels, true opens everything and 0 collapses even the root."
        code={`<JSONViewer data={event} defaultExpanded={0} />
<JSONViewer data={event} defaultExpanded={2} />
<JSONViewer data={event} defaultExpanded />`}
      >
        <div className="grid w-full gap-4 lg:grid-cols-3">
          {[0, 2, true].map((depth) => (
            <Card key={String(depth)}>
              <CardContent className="space-y-2 p-4">
                <p className="text-caption text-[var(--muted-foreground)]">defaultExpanded={String(depth)}</p>
                <JSONViewer data={EVENT} defaultExpanded={depth} maxStringLength={40} />
              </CardContent>
            </Card>
          ))}
        </div>
      </PlaygroundSection>

      {/* ─── Controlled expand ─────────────────────────────────── */}
      <PlaygroundSection
        title="Controlled expand (expandedPaths)"
        description="Pass expandedPaths to keep specific paths open regardless of defaultExpanded. The user can still open and close other nodes freely. Use onExpandChange to observe or persist what the user opens."
        code={`<JSONViewer
  data={event}
  expandedPaths={['source']}
  onExpandChange={(path, expanded) =>
    console.log('toggled', path, expanded)
  }
/>`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <JSONViewer
              data={EVENT}
              expandedPaths={['source']}
              onExpandChange={(path, expanded) => console.log('toggled:', path, expanded)}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── renderValue ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Custom value rendering (renderValue)"
        description="Override how any leaf value renders. Return params.defaultContent to keep the default. Useful for making URLs clickable, formatting timestamps, or highlighting specific paths."
        code={`<JSONViewer
  data={event}
  defaultExpanded
  renderValue={({ value, type, defaultContent }) => {
    // Make http strings into clickable links
    if (type === 'string' && typeof value === 'string' && value.startsWith('http')) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer"
          className="text-[var(--accent-text)] underline hover:opacity-80">
          {defaultContent}
        </a>
      );
    }
    return defaultContent;
  }}
/>`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <JSONViewer
              data={{ apiUrl: 'https://api.example.com/events', name: 'Alice', score: 87.5, active: true, id: null }}
              defaultExpanded
              renderValue={({ value, type, defaultContent }) => {
                if (type === 'string' && typeof value === 'string' && value.startsWith('http')) {
                  return (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-text)] underline hover:opacity-80"
                    >
                      {defaultContent}
                    </a>
                  );
                }
                return defaultContent;
              }}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Long strings ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Long strings"
        description="Past maxStringLength a string is cut, with a show more link that opens the whole text in place. Newlines and quotes are shown escaped, so a value stays on one line."
        code={`<JSONViewer data={logEvent} maxStringLength={100} defaultExpanded />`}
      >
        <Card className="w-full max-w-2xl">
          <CardContent className="p-4">
            <JSONViewer
              data={{ message: LONG_MESSAGE, stack: 'Error: boom\n    at run (app.js:10:5)\n    at main (app.js:2:1)' }}
              maxStringLength={100}
              defaultExpanded
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Line numbers ───────────────────────────────────────── */}
      <PlaygroundSection
        title="Line numbers and indent"
        description="Line numbers count the rows you can see, so collapsing a node renumbers the rest. They cannot be selected, so copying text does not pick them up."
        code={`<JSONViewer data={parsedEvent} defaultExpanded lineNumbers indent={4} />`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <JSONViewer data={EVENT.source} defaultExpanded lineNumbers indent={4} />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Copy ───────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Copy on hover"
        description="Hover a row (or Tab into it) to reveal its copy button. A string copies as it is, a number or boolean as text, an object or array as indented JSON, and the root copies the whole document. Each button is named after its path."
        code={`<JSONViewer data={apiResponse} defaultExpanded={2} copyable onCopy={(value, path) => console.log('Copied:', path)} />`}
      >
        <div className="w-full max-w-2xl space-y-3">
          <Card>
            <CardContent className="p-4">
              <JSONViewer
                data={SAMPLES.response}
                defaultExpanded={2}
                copyable
                onCopy={(_, path) => setLastCopiedPath(path || 'root')}
              />
            </CardContent>
          </Card>
          {lastCopiedPath && (
            <p className="text-caption text-[var(--muted-foreground)]">
              Last copied: <span className="font-mono text-[var(--foreground)]">{lastCopiedPath}</span>
            </p>
          )}
        </div>
      </PlaygroundSection>

      {/* ─── Localization (labels) ─────────────────────────────── */}
      <PlaygroundSection
        title="Localization (labels)"
        description="Override any UI string via labels. All fields are optional — unspecified ones fall back to English. Applies to show more/less links on long strings and copy feedback announcements."
        code={`<JSONViewer
  data={logEvent}
  maxStringLength={60}
  defaultExpanded
  copyable
  labels={{
    showMore: 'voir plus',
    showLess: 'voir moins',
    copied: 'Copié dans le presse-papier',
    copyError: 'Échec de la copie',
  }}
/>`}
      >
        <Card className="w-full max-w-2xl">
          <CardContent className="p-4">
            <JSONViewer
              data={{ message: LONG_MESSAGE, source: 'idp-eu-1', severity: 'high' }}
              maxStringLength={60}
              defaultExpanded
              copyable
              labels={{
                showMore: 'voir plus',
                showLess: 'voir moins',
                copied: 'Copié dans le presse-papier',
                copyError: 'Échec de la copie',
              }}
            />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Scrolling panel ────────────────────────────────────── */}
      <PlaygroundSection
        title="In a scrolling panel"
        description="Size and border it with className; the viewer itself has no fixed height."
        code={`<JSONViewer
  data={apiResponse}
  defaultExpanded
  className="max-h-[260px] overflow-auto rounded-lg border border-[var(--border)] p-4"
/>`}
      >
        <JSONViewer
          data={SAMPLES.response}
          defaultExpanded
          className="max-h-[260px] w-full max-w-2xl overflow-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-4"
        />
      </PlaygroundSection>

      {/* ─── Types ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Every type, and data that is not JSON"
        description="undefined, NaN, Infinity, bigint, symbols, functions, dates, empty containers and a circular reference all get a readable form instead of being dropped or throwing."
        code={`// circular reference example
const circular = { name: 'parent', children: [] };
circular.children.push({ name: 'child', parent: circular });

<JSONViewer
  data={{ nothing: null, missing: undefined, nan: NaN, big: 9007199254740993n, date: new Date(), circular }}
  defaultExpanded
/>`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <JSONViewer data={ALL_TYPES} defaultExpanded />
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Live ───────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Live data"
        description="A new event arrives every few seconds. What you open or close is remembered by path, so the tree does not collapse under you while the data changes."
        code={`// data changes; open nodes stay open
<JSONViewer data={{ updatedAt, events }} defaultExpanded={2} />`}
      >
        <Card className="w-full max-w-xl">
          <CardContent className="p-4">
            <LiveFeed key={key} />
            <div className="pt-3">
              <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
                Restart feed
              </Button>
            </div>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Try it ─────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Try your own JSON"
        description="Edit the text; the tree updates as long as it parses."
        code={`const parsed = JSON.parse(text);
<JSONViewer data={parsed} defaultExpanded copyable />`}
      >
        <TryIt />
      </PlaygroundSection>

    </ComponentPage>
  );
}
