import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo, DemoGrid, DemoCard } from '../../components/PlaygroundSection.jsx';
import { SearchInput } from 'invin-uix/ui/search-input';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';

export default function SearchInputDemo() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const mockItems = [
    { id: 1, name: 'Dashboard', category: 'Pages' },
    { id: 2, name: 'Button', category: 'Components' },
    { id: 3, name: 'Card', category: 'Components' },
    { id: 4, name: 'Input', category: 'Components' },
    { id: 5, name: 'Settings', category: 'Pages' },
    { id: 6, name: 'Profile', category: 'Pages' },
    { id: 7, name: 'Alert', category: 'Components' },
    { id: 8, name: 'Modal', category: 'Components' },
  ];

  const handleSearch = (query) => {
    setSearchValue(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <ComponentPage
      name="SearchInput"
      description="Enhanced search input with debounce support, loading state, clear button, and keyboard navigation. Perfect for search bars, command palettes, and filter inputs."
      importCode={`import { SearchInput } from 'invin-uix/ui/search-input';`}
      badges={[{ label: 'New', variant: 'accent' }]}
    >

      {/* ─── Interactive Playground ────────────────────────────── */}
      <InteractiveDemo
        title="Interactive Playground"
        description="Experiment with SearchInput props. Try typing to see the clear button."
        controls={[
          { name: 'placeholder', label: 'Placeholder', type: 'text', default: 'Search...' },
          { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
          { name: 'loading', label: 'Loading', type: 'boolean', default: false },
          { name: 'debounce', label: 'Debounce (ms)', type: 'number', default: 0, min: 0, max: 1000, step: 100 },
        ]}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <SearchInput
              placeholder={props.placeholder}
              disabled={props.disabled}
              loading={props.loading}
              debounce={props.debounce}
              onChange={(val) => console.log('Changed:', val)}
              onSearch={(val) => console.log('Search:', val)}
            />
          </div>
        )}
      </InteractiveDemo>

      <Separator />

      {/* ─── Props Table ────────────────────────────────────────── */}
      <PropsTable
        props={[
          { name: 'value', type: 'string', default: "''", description: 'Controlled input value' },
          { name: 'defaultValue', type: 'string', default: "''", description: 'Default value (uncontrolled)' },
          { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Callback on input change' },
          { name: 'onSearch', type: '(value: string) => void', default: '—', description: 'Callback when Enter is pressed' },
          { name: 'onClear', type: '() => void', default: '—', description: 'Callback when clear button is clicked' },
          { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Input placeholder text' },
          { name: 'debounce', type: 'number', default: '0', description: 'Debounce delay in milliseconds for onChange' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
          { name: 'showClear', type: 'boolean', default: 'true', description: 'Show clear button when has value' },
          { name: 'error', type: 'string', default: '—', description: 'Error message (red border + message below)' },
          { name: 'success', type: 'string', default: '—', description: 'Success message (green border + message below)' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input size' },
        ]}
      />

      <Separator variant="bold" />

      {/* ─── Basic SearchInput ──────────────────────────────────── */}
      <PlaygroundSection
        title="Basic SearchInput"
        description="Standard search input with magnifying glass icon and clear button."
        code={`const [query, setQuery] = useState('');

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search components..."
/>

// With search callback
<SearchInput
  placeholder="Search..."
  onSearch={(query) => console.log('Searching:', query)}
/>`}
      >
        <div className="w-full max-w-md space-y-4">
          <SearchInput placeholder="Search components..." />
          <SearchInput placeholder="Search with Enter key..." onSearch={(q) => alert(`Searching: ${q}`)} />
        </div>
      </PlaygroundSection>

      {/* ─── With Loading State ─────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Show a spinner while fetching search results. The spinner appears on the right side."
        code={`const [loading, setLoading] = useState(false);

<SearchInput
  loading={loading}
  onChange={async (query) => {
    setLoading(true);
    await fetchResults(query);
    setLoading(false);
  }}
/>`}
      >
        <div className="w-full max-w-md space-y-4">
          <SearchInput
            placeholder="Type to search..."
            loading={isLoading}
            value={searchValue}
            onChange={handleSearch}
          />
          {results.length > 0 && (
            <Card>
              <CardContent className="py-2">
                {results.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                    <span className="text-caption">{item.name}</span>
                    <Badge variant="secondary" size="sm">{item.category}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </PlaygroundSection>

      {/* ─── Sizes ──────────────────────────────────────────────── */}
      <PlaygroundSection
        title="Sizes"
        description="Available in small, medium (default), and large sizes."
        code={`<SearchInput size="sm" placeholder="Small search..." />
<SearchInput size="md" placeholder="Medium search..." />
<SearchInput size="lg" placeholder="Large search..." />`}
      >
        <div className="w-full max-w-md space-y-4">
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Small</p>
            <SearchInput size="sm" placeholder="Small search..." />
          </div>
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Medium (default)</p>
            <SearchInput size="md" placeholder="Medium search..." />
          </div>
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Large</p>
            <SearchInput size="lg" placeholder="Large search..." />
          </div>
        </div>
      </PlaygroundSection>

      {/* ─── With Debounce ──────────────────────────────────────── */}
      <PlaygroundSection
        title="With Debounce"
        description="Debounce the onChange callback to reduce API calls during typing."
        code={`<SearchInput
  debounce={300}
  onChange={(query) => {
    // Called 300ms after user stops typing
    fetchResults(query);
  }}
/>`}
      >
        <div className="w-full max-w-md">
          <SearchInput
            placeholder="Type to search (300ms debounce)..."
            debounce={300}
            onChange={(val) => console.log('Debounced:', val)}
          />
          <p className="text-[11px] text-[var(--muted-foreground)] mt-2">
            Open console to see debounced onChange calls
          </p>
        </div>
      </PlaygroundSection>

      {/* ─── States ─────────────────────────────────────────────── */}
      <PlaygroundSection
        title="States"
        description="Different input states: default, disabled, and with pre-filled value."
        code={`<SearchInput placeholder="Default state" />
<SearchInput placeholder="Disabled" disabled />
<SearchInput defaultValue="Pre-filled value" />`}
      >
        <div className="w-full max-w-md space-y-4">
          <SearchInput placeholder="Default state" />
          <SearchInput placeholder="Disabled state" disabled />
          <SearchInput defaultValue="Pre-filled value" />
        </div>
      </PlaygroundSection>

      {/* ─── Error & Success States ─────────────────────────────── */}
      <PlaygroundSection
        title="Error & Success States"
        description="Validation feedback with colored borders and messages below the input."
        code={`<SearchInput 
  error="Search query is too short" 
  placeholder="Enter at least 3 characters..."
/>

<SearchInput 
  success="Found 24 results" 
  defaultValue="dashboard"
/>`}
      >
        <div className="w-full max-w-md space-y-4">
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Error state</p>
            <SearchInput 
              error="Search query is too short" 
              placeholder="Enter at least 3 characters..."
            />
          </div>
          <div>
            <p className="text-caption text-[var(--muted-foreground)] mb-2">Success state</p>
            <SearchInput 
              success="Found 24 results" 
              defaultValue="dashboard"
            />
          </div>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Use Cases ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Use Cases</h3>
        <p className="text-[var(--muted-foreground)]">Common patterns for search functionality.</p>
      </div>

      <DemoGrid columns={2}>
        <DemoCard
          title="Header Search Bar"
          description="Global search in the navigation header."
        >
          <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 flex items-center gap-4">
            <span className="text-caption font-semibold text-[var(--foreground)]">Logo</span>
            <SearchInput placeholder="Search everything..." className="flex-1" />
          </div>
        </DemoCard>

        <DemoCard
          title="Table Filter"
          description="Quick filter for data tables."
        >
          <div className="w-full space-y-2">
            <SearchInput placeholder="Filter rows..." size="sm" />
            <div className="text-[11px] text-[var(--muted-foreground)]">
              Showing 24 of 156 results
            </div>
          </div>
        </DemoCard>
      </DemoGrid>

    </ComponentPage>
  );
}
