import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable } from '../../components/PlaygroundSection.jsx';
import { FilterBuilder } from 'invin-uix/ui/filter-builder';
import { Card, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Separator } from 'invin-uix/ui/separator';

/* ─── Fields ────────────────────────────────────────────────────────────── */

const ALERT_FIELDS = [
  {
    name: 'severity',
    label: 'Severity',
    type: 'select',
    options: ['critical', 'high', 'medium', 'low', 'informational'],
  },
  { name: 'source', label: 'Source', type: 'text' },
  { name: 'asset', label: 'Asset', type: 'text' },
  { name: 'count', label: 'Count', type: 'number' },
  { name: 'created', label: 'Created', type: 'date' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'suppressed', label: 'Suppressed' },
    ],
  },
  { name: 'acknowledged', label: 'Acknowledged', type: 'boolean' },
  { name: 'ip', label: 'IP Address', type: 'text', operators: ['is', 'is not', 'starts with', 'ends with'] },
];

const INITIAL_RULES = {
  type: 'group',
  id: 'demo-root',
  combinator: 'and',
  rules: [
    { type: 'condition', id: 'c-sev', field: 'severity', operator: 'is', value: 'critical' },
    { type: 'condition', id: 'c-status', field: 'status', operator: 'is', value: 'open' },
  ],
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function RuleCount({ rules }) {
  let conditions = 0;
  let groups = 0;
  function walk(group) {
    for (const r of group.rules) {
      if (r.type === 'condition') conditions++;
      else { groups++; walk(r); }
    }
  }
  walk(rules);
  return (
    <span className="text-sm text-[var(--muted-foreground)]">
      {conditions} condition{conditions !== 1 ? 's' : ''}{groups > 0 ? `, ${groups} group${groups !== 1 ? 's' : ''}` : ''}
    </span>
  );
}

function JsonPreview({ value }) {
  return (
    <pre className="max-h-48 overflow-auto rounded-[var(--radius-md)] bg-[var(--muted)] p-3 text-xs text-[var(--foreground)] font-mono">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

/* ─── Sections ──────────────────────────────────────────────────────────── */

function BasicExample() {
  const [rules, setRules] = useState(INITIAL_RULES);
  return (
    <PlaygroundSection title="Basic usage" description="Controlled FilterBuilder with a pre-seeded rule set. Change any field, operator or value to see the JSON tree update below.">
      <div className="space-y-4 w-full">
        <FilterBuilder fields={ALERT_FIELDS} value={rules} onChange={setRules} />
        <Separator />
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Rule Tree</span>
            <RuleCount rules={rules} />
          </div>
          <JsonPreview value={rules} />
        </div>
      </div>
    </PlaygroundSection>
  );
}

function UncontrolledExample() {
  return (
    <PlaygroundSection
      title="Uncontrolled"
      description="No value prop — FilterBuilder manages its own state. Useful for one-shot forms where you only need the final value."
    >
      <FilterBuilder
        fields={ALERT_FIELDS}
        defaultValue={{
          type: 'group',
          id: 'uc-root',
          combinator: 'or',
          rules: [
            { type: 'condition', id: 'uc-c1', field: 'source', operator: 'contains', value: 'EDR' },
          ],
        }}
        onChange={(v) => console.log('uncontrolled onChange', v)}
      />
    </PlaygroundSection>
  );
}

function NestedGroupsExample() {
  const [rules, setRules] = useState({
    type: 'group',
    id: 'ng-root',
    combinator: 'and',
    rules: [
      { type: 'condition', id: 'ng-c1', field: 'severity', operator: 'is', value: 'critical' },
      {
        type: 'group',
        id: 'ng-g1',
        combinator: 'or',
        rules: [
          { type: 'condition', id: 'ng-c2', field: 'source', operator: 'contains', value: 'EDR' },
          { type: 'condition', id: 'ng-c3', field: 'source', operator: 'contains', value: 'Firewall' },
        ],
      },
    ],
  });
  return (
    <PlaygroundSection
      title="Nested groups"
      description="maxDepth={1} (default) lets you add one level of nested AND/OR groups. Use maxDepth={0} to disable groups, or a higher value for deeper nesting."
    >
      <FilterBuilder fields={ALERT_FIELDS} value={rules} onChange={setRules} maxDepth={1} />
    </PlaygroundSection>
  );
}

function NoGroupsExample() {
  return (
    <PlaygroundSection
      title="Conditions only (maxDepth=0)"
      description="Pass maxDepth={0} to suppress the 'Add group' button — simple flat filters only."
    >
      <FilterBuilder fields={ALERT_FIELDS} maxDepth={0} />
    </PlaygroundSection>
  );
}

function DisabledExample() {
  return (
    <PlaygroundSection
      title="Disabled"
      description="All controls — AND/OR toggle, selects, inputs, add and remove buttons — are inactive."
    >
      <FilterBuilder
        fields={ALERT_FIELDS}
        value={INITIAL_RULES}
        disabled
      />
    </PlaygroundSection>
  );
}

function FieldTypesExample() {
  const [rules, setRules] = useState({
    type: 'group',
    id: 'ft-root',
    combinator: 'and',
    rules: [
      { type: 'condition', id: 'ft-text',    field: 'source',       operator: 'contains', value: 'EDR' },
      { type: 'condition', id: 'ft-num',     field: 'count',        operator: 'between',  value: ['10', '100'] },
      { type: 'condition', id: 'ft-date',    field: 'created',      operator: 'is between', value: ['2024-01-01', '2024-12-31'] },
      { type: 'condition', id: 'ft-select',  field: 'status',       operator: 'is',       value: 'open' },
      { type: 'condition', id: 'ft-bool',    field: 'acknowledged', operator: 'is true',  value: '' },
      { type: 'condition', id: 'ft-empty',   field: 'asset',        operator: 'is empty', value: '' },
    ],
  });
  return (
    <PlaygroundSection
      title="Field types"
      description="Each field type gets a tailored value input. Text → text field. Number → number field (two for 'between'). Date → date picker (two for 'is between'). Select → dropdown. Boolean → no value input. Nullary operators (is empty / is not empty) also suppress the value input."
    >
      <FilterBuilder fields={ALERT_FIELDS} value={rules} onChange={setRules} maxDepth={0} />
    </PlaygroundSection>
  );
}

function CustomLabelsExample() {
  return (
    <PlaygroundSection
      title="Custom labels"
      description="Use addConditionLabel and addGroupLabel to rename the action buttons."
    >
      <FilterBuilder
        fields={ALERT_FIELDS}
        addConditionLabel="Add rule"
        addGroupLabel="Add rule group"
      />
    </PlaygroundSection>
  );
}

function EmptyFieldsExample() {
  return (
    <PlaygroundSection
      title="Empty state"
      description="Default state with no defaultValue: one empty condition row ready to fill in."
    >
      <FilterBuilder fields={ALERT_FIELDS} />
    </PlaygroundSection>
  );
}

/* ─── Props ─────────────────────────────────────────────────────────────── */

const PROPS = [
  { name: 'fields', type: 'FieldDef[]', required: true, description: 'Schema for the field picker and operator list.' },
  { name: 'value', type: 'RuleGroup', required: false, description: 'Controlled value. Pair with onChange.' },
  { name: 'onChange', type: '(rules: RuleGroup) => void', required: false, description: 'Called on every change.' },
  { name: 'defaultValue', type: 'RuleGroup', required: false, description: 'Uncontrolled initial value. Ignored when value is provided.' },
  { name: 'maxDepth', type: 'number', default: '1', description: 'Max group nesting depth. 0 = no nested groups.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all controls.' },
  { name: 'addConditionLabel', type: 'string', default: "'Add condition'", description: 'Label for the add-condition button.' },
  { name: 'addGroupLabel', type: 'string', default: "'Add group'", description: 'Label for the add-group button.' },
  { name: 'className', type: 'string', required: false, description: 'Extra CSS classes on the root div.' },
];

const FIELD_DEF_PROPS = [
  { name: 'name', type: 'string', required: true, description: 'Identifier — matches RuleCondition.field.' },
  { name: 'label', type: 'string', required: true, description: 'Display name in the field dropdown.' },
  { name: 'type', type: "'text' | 'number' | 'date' | 'select' | 'boolean'", required: true, description: 'Determines operators and value input.' },
  { name: 'options', type: "Array<string | { value, label }>", required: false, description: 'Options for select-type fields.' },
  { name: 'operators', type: 'string[]', required: false, description: 'Override default operators for this field.' },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function FilterBuilderDemo() {
  return (
    <ComponentPage
      title="Filter Builder"
      badge={<Badge variant="accent">New</Badge>}
      description="AND/OR rule builder with schema-driven field definitions, type-appropriate inputs, and one level of nested group support. Outputs a RuleGroup JSON tree."
    >
      <BasicExample />
      <FieldTypesExample />
      <NestedGroupsExample />
      <NoGroupsExample />
      <UncontrolledExample />
      <DisabledExample />
      <CustomLabelsExample />
      <EmptyFieldsExample />

      <PlaygroundSection title="Props">
        <PropsTable props={PROPS} />
      </PlaygroundSection>

      <PlaygroundSection title="FieldDef">
        <PropsTable props={FIELD_DEF_PROPS} />
      </PlaygroundSection>
    </ComponentPage>
  );
}
