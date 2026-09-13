import { useState } from 'react';
import { ComponentPage, PlaygroundSection, PropsTable, InteractiveDemo } from '../../components/PlaygroundSection.jsx';
import { 
  Form, 
  FormField, 
  FormSection, 
  FormActions, 
  FormMessage,
  useFormValidation,
  validation,
  composeValidators,
} from 'invin-uix/ui/form';
import { Input } from 'invin-uix/ui/input';
import { Textarea } from 'invin-uix/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from 'invin-uix/ui/select';
import { Checkbox } from 'invin-uix/ui/checkbox';
import { Switch } from 'invin-uix/ui/switch';
import { Button } from 'invin-uix/ui/button';
import { Label } from 'invin-uix/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from 'invin-uix/ui/card';
import { Separator } from 'invin-uix/ui/separator';
import { Badge } from 'invin-uix/ui/badge';

export default function FormDemo() {
  const [submitResult, setSubmitResult] = useState(null);
  
  // Simple form with useFormValidation hook
  const loginForm = useFormValidation({
    initialValues: { email: '', password: '' },
    validators: {
      email: composeValidators(
        validation.required('Email is required'),
        validation.email('Please enter a valid email')
      ),
      password: composeValidators(
        validation.required('Password is required'),
        validation.minLength(8, 'Password must be at least 8 characters')
      ),
    },
    onSubmit: async (values) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitResult({ success: true, data: values });
    },
  });

  // Registration form
  const registerForm = useFormValidation({
    initialValues: { 
      firstName: '', 
      lastName: '', 
      email: '', 
      role: '',
      bio: '',
      notifications: false,
    },
    validators: {
      firstName: validation.required('First name is required'),
      lastName: validation.required('Last name is required'),
      email: composeValidators(
        validation.required('Email is required'),
        validation.email('Invalid email format')
      ),
      role: validation.required('Please select a role'),
    },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registration successful!\n\n' + JSON.stringify(values, null, 2));
    },
  });

  return (
    <ComponentPage
      name="Form"
      description="Form components for building accessible forms with built-in validation. Includes Form, FormField, FormSection, FormActions, FormMessage, and useFormValidation hook with common validators."
      importCode={`import { 
  Form, FormField, FormSection, FormActions, FormMessage,
  useFormValidation, validation, composeValidators 
} from 'invin-uix/ui/form';`}
    >

      {/* ─── Interactive Playground ─────────────────────────────── */}
      <InteractiveDemo
        title="Form Field Playground"
        description="Experiment with FormField configurations."
        controls={[
          { name: 'required', type: 'boolean', label: 'Required', default: false },
          { name: 'showError', type: 'boolean', label: 'Show Error', default: false },
          { name: 'showDescription', type: 'boolean', label: 'Show Description', default: false },
        ]}
      >
        {(props) => (
          <Form className="max-w-sm">
            <FormField 
              name="email" 
              label="Email Address" 
              required={props.required}
              error={props.showError ? "This field has an error" : undefined}
              description={props.showDescription ? "We'll never share your email" : undefined}
            >
              <Input type="email" placeholder="you@example.com" />
            </FormField>
          </Form>
        )}
      </InteractiveDemo>
      <Separator variant="bold" />

      {/* ─── Components Overview ────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { name: 'Form', desc: 'Form wrapper with disabled context' },
          { name: 'FormField', desc: 'Label + control + error wrapper' },
          { name: 'FormSection', desc: 'Fieldset grouping with title' },
          { name: 'FormActions', desc: 'Button container with alignment' },
          { name: 'FormMessage', desc: 'Form-level success/error/info' },
          { name: 'useFormValidation', desc: 'Lightweight validation hook' },
        ].map(c => (
          <Card key={c.name}>
            <CardContent className="py-3">
              <p className="font-mono text-sm text-[var(--accent)]">{c.name}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator variant="bold" />

      {/* ─── Basic FormField ────────────────────────────────────── */}
      <PlaygroundSection
        title="FormField"
        description="Wraps a form control with label, description, and error message. Automatically handles accessibility attributes."
        code={`<Form>
  <FormField name="email" label="Email" required>
    <Input type="email" placeholder="you@example.com" />
  </FormField>
  
  <FormField 
    name="bio" 
    label="Bio" 
    description="Tell us about yourself"
  >
    <Textarea placeholder="..." />
  </FormField>
  
  <FormField 
    name="username" 
    label="Username" 
    error="Username is already taken"
  >
    <Input value="admin" />
  </FormField>
</Form>`}
      >
        <Form className="space-y-4 max-w-sm">
          <FormField name="email" label="Email Address" required>
            <Input type="email" placeholder="you@example.com" />
          </FormField>
          
          <FormField 
            name="bio" 
            label="Bio" 
            description="Brief description about yourself"
          >
            <Textarea placeholder="I'm a software engineer..." />
          </FormField>
          
          <FormField 
            name="username" 
            label="Username" 
            error="Username is already taken"
          >
            <Input defaultValue="admin" />
          </FormField>
        </Form>
      </PlaygroundSection>

      {/* ─── FormSection ────────────────────────────────────────── */}
      <PlaygroundSection
        title="FormSection"
        description="Group related fields with a title and description using semantic fieldset/legend."
        code={`<FormSection 
  title="Personal Information" 
  description="Your basic details"
>
  <FormField name="firstName" label="First Name">
    <Input />
  </FormField>
  <FormField name="lastName" label="Last Name">
    <Input />
  </FormField>
</FormSection>`}
      >
        <Form className="max-w-md">
          <FormSection 
            title="Personal Information" 
            description="Your basic details for the profile"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField name="firstName" label="First Name">
                <Input placeholder="John" />
              </FormField>
              <FormField name="lastName" label="Last Name">
                <Input placeholder="Doe" />
              </FormField>
            </div>
          </FormSection>
        </Form>
      </PlaygroundSection>

      {/* ─── Loading State ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Loading State"
        description="Use the loading prop on Form to disable all fields and show a loading indicator during submission."
        code={`const [isLoading, setIsLoading] = useState(false);

<Form loading={isLoading} onSubmit={handleSubmit}>
  <FormField name="email" label="Email">
    <Input type="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>`}
      >
        <div className="flex gap-6">
          <Card className="max-w-xs flex-1">
            <CardContent className="pt-4">
              <p className="text-xs text-[var(--muted-foreground)] mb-3">Normal</p>
              <Form>
                <FormField name="email" label="Email">
                  <Input type="email" placeholder="you@example.com" />
                </FormField>
                <FormActions>
                  <Button size="sm">Submit</Button>
                </FormActions>
              </Form>
            </CardContent>
          </Card>
          <Card className="max-w-xs flex-1">
            <CardContent className="pt-4">
              <p className="text-xs text-[var(--muted-foreground)] mb-3">Loading (disabled + faded)</p>
              <Form loading>
                <FormField name="email" label="Email">
                  <Input type="email" placeholder="you@example.com" defaultValue="test@example.com" />
                </FormField>
                <FormActions>
                  <Button size="sm" loading>Submit</Button>
                </FormActions>
              </Form>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── FormActions ────────────────────────────────────────── */}
      <PlaygroundSection
        title="FormActions"
        description="Container for form buttons with alignment options: start, end (default), center, between."
        code={`<FormActions align="end">
  <Button variant="outline" type="button">Cancel</Button>
  <Button type="submit">Save</Button>
</FormActions>

<FormActions align="between">
  <Button variant="ghost">Reset</Button>
  <Button>Submit</Button>
</FormActions>`}
      >
        <div className="space-y-6">
          <Card>
            <CardContent className="py-3">
              <p className="text-xs text-[var(--muted-foreground)] mb-2">align="end" (default)</p>
              <FormActions align="end">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </FormActions>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3">
              <p className="text-xs text-[var(--muted-foreground)] mb-2">align="between"</p>
              <FormActions align="between">
                <Button variant="ghost" size="sm">Reset to Defaults</Button>
                <Button size="sm">Submit</Button>
              </FormActions>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── Error Prop Usage ─────────────────────────────────────── */}
      <PlaygroundSection
        title="Error Prop Usage"
        description="When using FormField, pass error to FormField only — not to the child component. This avoids duplicate error messages."
        code={`{/* ✅ CORRECT - error goes to FormField */}
<FormField name="email" label="Email" error={errors.email}>
  <Input type="email" />
</FormField>

{/* ❌ WRONG - duplicate error messages! */}
<FormField name="email" label="Email" error={errors.email}>
  <Input type="email" error={errors.email} />
</FormField>

{/* ✅ Standalone usage (without FormField) */}
<Label>Email</Label>
<Input type="email" error={errors.email} />`}
      >
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-4">
              <Badge variant="success" className="mb-3">✓ Correct</Badge>
              <Form>
                <FormField name="email" label="Email" error="Invalid email address">
                  <Input type="email" placeholder="you@example.com" />
                </FormField>
              </Form>
              <p className="text-xs text-[var(--muted-foreground)] mt-2">Error passed to FormField only</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <Badge variant="destructive" className="mb-3">✗ Wrong</Badge>
              <Form>
                <FormField name="email2" label="Email" error="Invalid email address">
                  <Input type="email" placeholder="you@example.com" error="Invalid email address" />
                </FormField>
              </Form>
              <p className="text-xs text-[var(--muted-foreground)] mt-2">Error passed to both — duplicate!</p>
            </CardContent>
          </Card>
        </div>
      </PlaygroundSection>

      {/* ─── FormMessage ────────────────────────────────────────── */}
      <PlaygroundSection
        title="FormMessage"
        description="Display form-level messages for success, error, or info states."
        code={`<FormMessage type="error">
  Invalid credentials. Please try again.
</FormMessage>

<FormMessage type="success">
  Profile updated successfully!
</FormMessage>

<FormMessage type="info">
  Changes will be saved automatically.
</FormMessage>`}
      >
        <div className="space-y-3 max-w-md">
          <FormMessage type="error">
            Invalid credentials. Please check your email and password.
          </FormMessage>
          <FormMessage type="success">
            Profile updated successfully!
          </FormMessage>
          <FormMessage type="info">
            Changes will be saved automatically.
          </FormMessage>
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── useFormValidation ──────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">useFormValidation Hook</h3>
        <p className="text-[var(--muted-foreground)]">Lightweight form validation with built-in validators.</p>
      </div>

      <PlaygroundSection
        title="Login Form with Validation"
        description="Complete form with email and password validation using useFormValidation hook."
        code={`const { values, errors, isSubmitting, handleSubmit, handleChange } = 
  useFormValidation({
    initialValues: { email: '', password: '' },
    validators: {
      email: composeValidators(
        validation.required('Email is required'),
        validation.email('Invalid email format')
      ),
      password: composeValidators(
        validation.required('Password is required'),
        validation.minLength(8, 'Min 8 characters')
      ),
    },
    onSubmit: async (values) => {
      await loginUser(values);
    },
  });

<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email" error={errors.email}>
    <Input value={values.email} onChange={handleChange} />
  </FormField>
  <FormField name="password" label="Password" error={errors.password}>
    <Input type="password" value={values.password} onChange={handleChange} />
  </FormField>
  <Button type="submit" loading={isSubmitting}>Sign In</Button>
</Form>`}
      >
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-base">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {submitResult?.success && (
              <FormMessage type="success" className="mb-4">
                Login successful! Welcome back.
              </FormMessage>
            )}
            <Form onSubmit={loginForm.handleSubmit}>
              <FormField 
                name="email" 
                label="Email" 
                error={loginForm.errors.email}
                required
              >
                <Input 
                  type="email" 
                  name="email"
                  value={loginForm.values.email} 
                  onChange={loginForm.handleChange}
                  placeholder="you@example.com"
                />
              </FormField>
              
              <FormField 
                name="password" 
                label="Password" 
                error={loginForm.errors.password}
                required
              >
                <Input 
                  type="password"
                  name="password" 
                  value={loginForm.values.password} 
                  onChange={loginForm.handleChange}
                  placeholder="••••••••"
                />
              </FormField>
              
              <FormActions>
                <Button type="submit" loading={loginForm.isSubmitting} className="w-full">
                  Sign In
                </Button>
              </FormActions>
            </Form>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Built-in Validators ────────────────────────────────── */}
      <PlaygroundSection
        title="Built-in Validators"
        description="Common validation rules available out of the box."
        code={`// Available validators
validation.required('Field is required')
validation.email('Invalid email')
validation.minLength(8, 'Min 8 characters')
validation.maxLength(100, 'Max 100 characters')
validation.pattern(/^[A-Z]/, 'Must start with uppercase')
validation.min(0, 'Must be positive')
validation.max(100, 'Max value is 100')

// Compose multiple validators
const validatePassword = composeValidators(
  validation.required(),
  validation.minLength(8),
  validation.pattern(/[A-Z]/, 'Need uppercase'),
  validation.pattern(/[0-9]/, 'Need number'),
);`}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: 'required', desc: 'Non-empty value' },
            { name: 'email', desc: 'Valid email format' },
            { name: 'minLength', desc: 'Minimum characters' },
            { name: 'maxLength', desc: 'Maximum characters' },
            { name: 'pattern', desc: 'Regex matching' },
            { name: 'min', desc: 'Minimum number' },
            { name: 'max', desc: 'Maximum number' },
            { name: 'compose', desc: 'Chain validators' },
          ].map(v => (
            <Badge key={v.name} variant="secondary" className="justify-start py-2">
              <span className="font-mono text-[var(--accent)]">{v.name}</span>
            </Badge>
          ))}
        </div>
      </PlaygroundSection>

      <Separator variant="bold" />

      {/* ─── Complete Registration Form ─────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-[var(--foreground)] font-[700]">Complete Example</h3>
        <p className="text-[var(--muted-foreground)]">Full registration form with sections, validation, and all form components.</p>
      </div>

      <PlaygroundSection
        title="Registration Form"
        description="Multi-section form with various input types and validation."
        code={`// See source code for full implementation`}
      >
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="text-base">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form onSubmit={registerForm.handleSubmit}>
              <FormSection title="Personal Details">
                <div className="grid grid-cols-2 gap-4">
                  <FormField 
                    name="firstName" 
                    label="First Name" 
                    error={registerForm.errors.firstName}
                    required
                  >
                    <Input 
                      name="firstName"
                      value={registerForm.values.firstName} 
                      onChange={registerForm.handleChange}
                    />
                  </FormField>
                  <FormField 
                    name="lastName" 
                    label="Last Name"
                    error={registerForm.errors.lastName}
                    required
                  >
                    <Input 
                      name="lastName"
                      value={registerForm.values.lastName} 
                      onChange={registerForm.handleChange}
                    />
                  </FormField>
                </div>
                
                <FormField 
                  name="email" 
                  label="Email" 
                  error={registerForm.errors.email}
                  required
                >
                  <Input 
                    type="email"
                    name="email"
                    value={registerForm.values.email} 
                    onChange={registerForm.handleChange}
                    placeholder="you@company.com"
                  />
                </FormField>

                <FormField 
                  name="role" 
                  label="Role"
                  error={registerForm.errors.role}
                  required
                >
                  <Select 
                    value={registerForm.values.role}
                    onValueChange={(value) => registerForm.setValue('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </FormSection>

              <FormSection title="Additional Info" description="Optional details">
                <FormField 
                  name="bio" 
                  label="Bio" 
                  description="Brief description (max 200 characters)"
                >
                  <Textarea 
                    name="bio"
                    value={registerForm.values.bio} 
                    onChange={registerForm.handleChange}
                    placeholder="Tell us about yourself..."
                    maxLength={200}
                  />
                </FormField>

                <FormField name="notifications">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Email notifications</Label>
                    <Switch 
                      id="notifications"
                      checked={registerForm.values.notifications}
                      onCheckedChange={(checked) => registerForm.setValue('notifications', checked)}
                    />
                  </div>
                </FormField>
              </FormSection>

              <FormActions align="between">
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={registerForm.reset}
                >
                  Reset
                </Button>
                <Button type="submit" loading={registerForm.isSubmitting}>
                  Create Account
                </Button>
              </FormActions>
            </Form>
          </CardContent>
        </Card>
      </PlaygroundSection>

      {/* ─── Disabled Form ──────────────────────────────────────── */}
      <PlaygroundSection
        title="Disabled Form"
        description="All fields automatically disabled when Form has disabled prop (useful during submission)."
        code={`<Form disabled={isSubmitting}>
  <FormField name="email" label="Email">
    <Input />
  </FormField>
  {/* All fields inside are automatically disabled */}
</Form>`}
      >
        <Form disabled className="max-w-sm">
          <FormField name="email" label="Email">
            <Input placeholder="you@example.com" />
          </FormField>
          <FormField name="password" label="Password">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormActions>
            <Button disabled>Submitting...</Button>
          </FormActions>
        </Form>
      </PlaygroundSection>

    </ComponentPage>
  );
}
