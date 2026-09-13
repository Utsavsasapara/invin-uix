import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo, DemoGrid, DemoCard } from '../../components/PlaygroundSection.jsx';
import { TagInput, TagList } from 'invin-uix/ui/tag-input';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';

// Helper to create tag objects
const createTags = (labels) => labels.map((label, i) => ({ id: `tag-${i}-${label}`, label }));

// Sample suggestions
const techSuggestions = [
  'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Remix',
  'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java',
  'Node.js', 'Deno', 'Bun', 'GraphQL', 'REST', 'tRPC',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes'
];

export default function TagInputDemo() {
  const [tags, setTags] = useState(createTags(['React', 'TypeScript', 'Tailwind']));
  const [manyTags, setManyTags] = useState(createTags([
    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Remix',
    'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go', 'Rust'
  ]));
  const [emailTags, setEmailTags] = useState(createTags(['john@example.com']));
  const [reorderTags, setReorderTags] = useState(createTags(['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']));
  const [suggestionTags, setSuggestionTags] = useState([]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Please enter a valid email';
  };

  return (
    <ComponentPage
      name="TagInput"
      description="Multi-value input for tags with autocomplete, drag-to-reorder, overflow handling, and keyboard navigation. Includes TagList for display-only scenarios."
      importCode={`import { TagInput, TagList } from 'invin-uix/ui/tag-input';`}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with TagInput features. Try keyboard navigation (arrow keys), drag-to-reorder, and autocomplete."
        controls={[
          { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Add tag...' },
          { name: 'maxVisibleTags', label: 'Max Visible Tags', type: 'number', default: 0, min: 0, max: 20 },
          { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
          { name: 'reorderable', label: 'Reorderable', type: 'boolean', default: false },
          { name: 'copyable', label: 'Copyable', type: 'boolean', default: false },
          { name: 'clearable', label: 'Clearable', type: 'boolean', default: false },
        ]}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <TagInput
              value={tags}
              onChange={setTags}
              placeholder={props.placeholder}
              maxVisibleTags={props.maxVisibleTags || undefined}
              disabled={props.disabled}
              reorderable={props.reorderable}
              copyable={props.copyable}
              clearable={props.clearable}
            />
            <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
              {tags.length} tags • Arrow keys to navigate • Drag to reorder
            </p>
          </div>
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'Tag[]', default: '[]', description: 'Array of tag objects {id, label, color?}' },
          { name: 'onChange', type: '(tags: Tag[]) => void', default: '—', description: 'Callback when tags change' },
          { name: 'maxVisibleTags', type: 'number', default: '—', description: 'Show N tags + "+X more" badge' },
          { name: 'maxHeight', type: 'number | string', default: '—', description: 'Scrollable container after this height' },
          { name: 'suggestions', type: 'string[]', default: '[]', description: 'Autocomplete suggestions dropdown' },
          { name: 'reorderable', type: 'boolean', default: 'false', description: 'Enable drag-to-reorder tags' },
          { name: 'copyable', type: 'boolean', default: 'false', description: 'Show copy-all tags button' },
          { name: 'clearable', type: 'boolean', default: 'false', description: 'Show clear-all tags button' },
          { name: 'max', type: 'number', default: '—', description: 'Maximum number of tags allowed' },
          { name: 'validate', type: '(input, tags) => string | undefined', default: '—', description: 'Validation function' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
          { name: 'error', type: 'string', default: '—', description: 'Error message (red border + message)' },
          { name: 'success', type: 'string', default: '—', description: 'Success message (green border + message)' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Max Visible Tags ───────────────────────────────────── */}
      <PlaygroundSection
        title="Max Visible Tags (+X more)"
        description="Limit visible tags to prevent layout overflow. Click '+X more' to expand."
        code={`<TagInput
  value={manyTags}
  onChange={setManyTags}
  maxVisibleTags={5}
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={manyTags}
            onChange={setManyTags}
            maxVisibleTags={5}
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Showing 5 of {manyTags.length} tags
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Max Height (Scrollable) ────────────────────────────── */}
      <PlaygroundSection
        title="Max Height (Scrollable)"
        description="Container becomes scrollable after reaching max height. Great for many tags in limited space."
        code={`<TagInput
  value={manyTags}
  onChange={setManyTags}
  maxHeight={80}
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={manyTags}
            onChange={setManyTags}
            maxHeight={80}
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Scrollable container with max-height: 80px
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Autocomplete Suggestions ───────────────────────────── */}
      <PlaygroundSection
        title="Autocomplete Suggestions"
        description="Show dropdown suggestions while typing. Use arrow keys to navigate, Enter to select."
        code={`<TagInput
  value={tags}
  onChange={setTags}
  suggestions={['React', 'Vue', 'Angular', ...]}
  placeholder="Type to search..."
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={suggestionTags}
            onChange={setSuggestionTags}
            suggestions={techSuggestions}
            placeholder="Type to search technologies..."
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Try typing "re" or "java" to see filtered suggestions
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Drag to Reorder ────────────────────────────────────── */}
      <PlaygroundSection
        title="Drag to Reorder"
        description="Drag tags to change their order. Useful when tag order represents priority."
        code={`<TagInput
  value={tags}
  onChange={setTags}
  reorderable
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={reorderTags}
            onChange={setReorderTags}
            reorderable
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Drag tags to reorder • Order: {reorderTags.map(t => t.label).join(' → ')}
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Copyable ───────────────────────────────────────────── */}
      <PlaygroundSection
        title="Copyable"
        description="Add a copy button to copy all tags as comma-separated text to clipboard."
        code={`<TagInput
  value={tags}
  onChange={setTags}
  copyable
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={createTags(['React', 'TypeScript', 'Node.js'])}
            onChange={() => {}}
            copyable
            readOnly
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Click the copy icon to copy tags to clipboard
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Keyboard Navigation ────────────────────────────────── */}
      <PlaygroundSection
        title="Keyboard Navigation"
        description="Navigate between tags using arrow keys. Press Delete or Backspace to remove focused tag."
        code={`// Keyboard shortcuts:
// ← → : Navigate between tags
// Delete/Backspace: Remove focused tag
// Escape: Return to input
// ↑ ↓ : Navigate suggestions`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={createTags(['Navigate', 'With', 'Arrow', 'Keys'])}
            onChange={() => {}}
            placeholder="Press ← to start navigating..."
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Type something, then press ← to navigate to tags
          </p>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Long Tags with Tooltip ─────────────────────────────── */}
      <PlaygroundSection
        title="Long Tags (Truncated with Tooltip)"
        description="Long tag text is truncated with ellipsis. Hover to see full text in tooltip."
        code={`<TagInput
  value={[
    { id: '1', label: 'This is a very long tag name' },
    { id: '2', label: 'Another extremely long tag label' },
  ]}
/>`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={createTags([
              'Short',
              'This is a very long tag that will be truncated',
              'Another extremely long tag label that shows tooltip'
            ])}
            onChange={() => {}}
            readOnly
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Hover over truncated tags to see full text
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── With Validation ────────────────────────────────────── */}
      <PlaygroundSection
        title="With Validation"
        description="Custom validation for specific formats like email addresses."
        code={`const validateEmail = (value) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(value) ? undefined : 'Invalid email';
};

<TagInput validate={validateEmail} />`}
      >
        <div className="w-full max-w-md">
          <TagInput
            value={emailTags}
            onChange={setEmailTags}
            placeholder="Add email address..."
            validate={validateEmail}
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Try typing an invalid email to see validation
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── Error & Success States ─────────────────────────────── */}
      <PlaygroundSection
        title="Error & Success States"
        description="External validation feedback with colored borders and messages."
        code={`<TagInput error="Please add at least one tag" />
<TagInput success="Tags validated successfully" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Error state</p>
            <TagInput
              value={[]}
              onChange={() => {}}
              error="Please add at least one tag"
              placeholder="Required tags..."
            />
          </div>
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Success state</p>
            <TagInput
              value={createTags(['React', 'TypeScript'])}
              onChange={() => {}}
              success="Tags validated successfully"
            />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── TagList (Display Only) ─────────────────────────────── */}
      <PlaygroundSection
        title="TagList (Display Only)"
        description="Use TagList when you only need to display tags without input. Supports maxVisibleTags too."
        code={`<TagList
  tags={tags}
  maxVisibleTags={5}
/>

<TagList
  tags={tags}
  onRemove={(tag) => handleRemove(tag)}
/>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Static display with overflow</p>
            <TagList 
              tags={createTags(['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'K8s', 'AWS'])} 
              maxVisibleTags={4}
            />
          </div>
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Removable tags</p>
            <TagList
              tags={tags}
              onRemove={(tag) => setTags(tags.filter(t => t.id !== tag.id))}
            />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Combined Features ──────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Combined Features</h3>
        <p className="text-[var(--muted-foreground)]">All features working together for production use.</p>
      </div>

      <DemoGrid columns={1}>
        <DemoCard
          title="Full-Featured Tag Input"
          description="All features: suggestions, reorder, copy, clear, overflow."
        >
          <div className="w-full">
            <TagInput
              value={manyTags}
              onChange={setManyTags}
              suggestions={techSuggestions}
              maxVisibleTags={6}
              maxHeight={120}
              reorderable
              copyable
              clearable
              max={20}
              placeholder="Type to add or search..."
            />
            <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
              {manyTags.length}/20 tags • Drag to reorder • Type to search suggestions
            </p>
          </div>
        </DemoCard>
      </DemoGrid>

    </ComponentPage>
  );
}
