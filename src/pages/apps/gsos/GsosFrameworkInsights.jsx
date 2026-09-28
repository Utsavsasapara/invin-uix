import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Input } from 'invin-uix/ui/input';
import { Progress } from 'invin-uix/ui/progress';
import { PieChart, BarChart } from 'invin-uix/ui/chart';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from 'invin-uix/ui/accordion';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from 'invin-uix/ui/table';
import { 
  MagnifyingGlass,
  Download,
  ArrowLeft,
  CaretUpDown,
  X,
  CheckCircle,
  DotsThreeVertical,
  Info,
} from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const frameworkData = {
  'cis-v8': {
    code: 'CIS',
    name: 'CIS Controls v8.1',
    compliance: 16,
    color: '#3b82f6',
    stats: {
      totalAssessments: 240,
      totalControls: 153,
      controlsInProgress: 0,
      nonCompliant: 0,
    },
    statusDistribution: [
      { name: 'Not Assessed', value: 128, color: 'var(--muted-foreground)' },
      { name: 'Non Compliant', value: 0, color: 'var(--error)' },
      { name: 'Partially Compliant', value: 0, color: '#eab308' },
      { name: 'Compliant', value: 25, color: 'var(--ok)' },
      { name: 'Not Applicable', value: 0, color: '#6b7280' },
    ],
    domainBreakdown: [
      { name: 'Security Operations', notAssessed: 40, nonCompliant: 0, partial: 0, compliant: 5, notApplicable: 0 },
      { name: 'Network Security', notAssessed: 35, nonCompliant: 0, partial: 0, compliant: 8, notApplicable: 0 },
      { name: 'Identification & Authent...', notAssessed: 20, nonCompliant: 0, partial: 0, compliant: 12, notApplicable: 0 },
      { name: 'Asset Management', notAssessed: 15, nonCompliant: 0, partial: 0, compliant: 0, notApplicable: 0 },
      { name: 'Incident Response', notAssessed: 10, nonCompliant: 0, partial: 0, compliant: 0, notApplicable: 0 },
      { name: 'Human Resources Securi...', notAssessed: 8, nonCompliant: 0, partial: 0, compliant: 0, notApplicable: 0 },
    ],
    controls: [
      {
        id: '1',
        title: 'Inventory and Control of Enterprise Assets',
        passed: 0,
        total: 5,
        children: [
          { id: '1.1', title: 'Establish and Maintain Detailed Enterprise Asset Inventory', description: 'Establish and maintain an accurate, detailed, and up-to-date inventory of all enterprise assets...', status: 'Not Assessed', owner: '-' },
          { id: '1.2', title: 'Address Unauthorized Assets', description: 'Ensure that a process exists to address unauthorized assets on a weekly basis...', status: 'Not Assessed', owner: '-' },
          { id: '1.3', title: 'Utilize an Active Discovery Tool', description: 'Utilize an active discovery tool to identify assets connected to the enterprise network...', status: 'Not Assessed', owner: '-' },
          { id: '1.4', title: 'Use Dynamic Host Configuration Protocol (DHCP) Logging', description: 'Use DHCP logging on all DHCP servers or IP address management tools to update the enterprise asset inventory...', status: 'Not Assessed', owner: '-' },
          { id: '1.5', title: 'Use a Passive Asset Discovery Tool', description: 'Use a passive discovery tool to identify assets connected to the enterprise network...', status: 'Not Assessed', owner: '-' },
        ],
      },
      {
        id: '2',
        title: 'Inventory and Control of Software Assets',
        passed: 0,
        total: 7,
        children: [
          { id: '2.1', title: 'Establish and Maintain a Software Inventory', description: 'Establish and maintain a detailed inventory of all licensed software installed on enterprise assets...', status: 'Not Assessed', owner: '-' },
          { id: '2.2', title: 'Ensure Authorized Software is Currently Supported', description: 'Ensure that only currently supported software is designated as authorized...', status: 'Not Assessed', owner: '-' },
          { id: '2.3', title: 'Address Unauthorized Software', description: 'Ensure that unauthorized software is either removed or the inventory is updated...', status: 'Not Assessed', owner: '-' },
        ],
      },
      {
        id: '3',
        title: 'Data Protection',
        passed: 1,
        total: 14,
        children: [
          { id: '3.1', title: 'Establish and Maintain a Data Management Process', description: 'Establish and maintain a data management process. In the process, address data sensitivity, data owner, handling of data, data retention limits, and d...', status: 'Not Assessed', owner: '-' },
          { id: '3.2', title: 'Establish and Maintain a Data Inventory', description: 'Establish and maintain a data inventory, based on the enterprise\'s data management process. Inventory sensitive data, at a minimum. Review and update ...', status: 'Not Assessed', owner: '-' },
          { id: '3.3', title: 'Configure Data Access Control Lists', description: 'Configure data access control lists based on a user\'s need to know. Apply data access control lists, also known as access permissions, to local and r...', status: 'Compliant', owner: 'Admin' },
          { id: '3.4', title: 'Enforce Data Retention', description: 'Retain data according to the enterprise\'s data management process. Data retention must include both minimum and maximum timelines...', status: 'Not Assessed', owner: '-' },
          { id: '3.5', title: 'Securely Dispose of Data', description: 'Securely dispose of data as outlined in the enterprise\'s data management process...', status: 'Not Assessed', owner: '-' },
        ],
      },
      {
        id: '4',
        title: 'Secure Configuration of Enterprise Assets and Software',
        passed: 3,
        total: 12,
        children: [
          { id: '4.1', title: 'Establish and Maintain a Secure Configuration Process', description: 'Establish and maintain a secure configuration process for enterprise assets...', status: 'Compliant', owner: 'Admin' },
          { id: '4.2', title: 'Establish and Maintain a Secure Configuration Process for Network Infrastructure', description: 'Establish and maintain a secure configuration process for network devices...', status: 'Compliant', owner: 'Admin' },
          { id: '4.3', title: 'Configure Automatic Session Locking on Enterprise Assets', description: 'Configure automatic session locking on enterprise assets after a defined period of inactivity...', status: 'Compliant', owner: 'Admin' },
        ],
      },
      {
        id: '5',
        title: 'Account Management',
        passed: 6,
        total: 6,
        children: [
          { id: '5.1', title: 'Establish and Maintain an Inventory of Accounts', description: 'Establish and maintain an inventory of all accounts managed in the enterprise...', status: 'Compliant', owner: 'Admin' },
          { id: '5.2', title: 'Use Unique Passwords', description: 'Use unique passwords for all enterprise assets. Best practice implementation includes...', status: 'Compliant', owner: 'Admin' },
          { id: '5.3', title: 'Disable Dormant Accounts', description: 'Delete or disable any dormant accounts after a period of 45 days of inactivity...', status: 'Compliant', owner: 'Admin' },
        ],
      },
      {
        id: '6',
        title: 'Access Control Management',
        passed: 8,
        total: 8,
        children: [
          { id: '6.1', title: 'Establish an Access Granting Process', description: 'Establish and follow a process, preferably automated, for granting access to enterprise assets...', status: 'Compliant', owner: 'Admin' },
          { id: '6.2', title: 'Establish an Access Revoking Process', description: 'Establish and follow a process, preferably automated, for revoking access to enterprise assets...', status: 'Compliant', owner: 'Admin' },
        ],
      },
    ],
  },
};

// Default framework data if ID not found
const defaultFramework = frameworkData['cis-v8'];

// ─── Status Badge Component ──────────────────────────────────────────────────

function StatusBadge({ status }) {
  const variants = {
    'Not Assessed': { bg: 'var(--secondary)', color: 'var(--muted-foreground)', border: 'var(--border)' },
    'Non Compliant': { bg: 'color-mix(in srgb, var(--error) 15%, transparent)', color: 'var(--error)', border: 'var(--error)' },
    'Partially Compliant': { bg: 'color-mix(in srgb, #eab308 15%, transparent)', color: '#eab308', border: '#eab308' },
    'Compliant': { bg: 'color-mix(in srgb, var(--ok) 15%, transparent)', color: 'var(--ok)', border: 'var(--ok)' },
    'Not Applicable': { bg: 'var(--secondary)', color: '#6b7280', border: '#6b7280' },
  };

  const style = variants[status] || variants['Not Assessed'];

  return (
    <Badge 
      variant="outline" 
      size="sm"
      style={{ 
        backgroundColor: style.bg, 
        color: style.color,
        borderColor: style.border + '40',
      }}
    >
      {status}
    </Badge>
  );
}

// ─── Control Progress Ring ───────────────────────────────────────────────────

function ControlProgressRing({ passed, total }) {
  const percentage = total > 0 ? (passed / total) * 100 : 0;
  const isComplete = passed === total && total > 0;
  const color = isComplete ? 'var(--ok)' : 'var(--muted-foreground)';

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-5 h-5">
        <svg className="w-full h-full" viewBox="0 0 20 20">
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={`${percentage * 0.502} 100`}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
          />
        </svg>
        {isComplete && (
          <CheckCircle 
            className="absolute inset-0 m-auto" 
            style={{ width: 12, height: 12, color: 'var(--ok)' }} 
          />
        )}
      </div>
      <span className="text-[12px] text-[var(--muted-foreground)]">
        {passed}/{total} controls OK
      </span>
    </div>
  );
}

// ─── Main Framework Insights Component ───────────────────────────────────────

export default function GsosFrameworkInsights() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('control');
  const [openAccordions, setOpenAccordions] = useState(['3']); // Open Data Protection by default

  // Get framework data (fallback to default)
  const framework = frameworkData[id] || defaultFramework;

  // Chart data
  const statusChartData = framework.statusDistribution.map(item => ({
    name: item.name,
    value: item.value,
    fill: item.color,
  }));

  const totalControls = framework.statusDistribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6 space-y-6">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <div>
        <p className="text-[12px] text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">🏠 Home</span> › 
          <span className="text-[var(--accent)]"> Compliance</span> › 
          <span className="text-[var(--accent)]"> Frameworks</span> › Insights
        </p>
        <h1 className="text-[24px] font-bold text-[var(--foreground)] mt-1">
          Framework Insights
        </h1>
      </div>

      {/* ─── Framework Header ─────────────────────────────────── */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Framework Info */}
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-[14px] font-bold"
              style={{ backgroundColor: framework.color }}
            >
              {framework.code}
            </div>
            <div>
              <h2 className="text-[18px] font-semibold">{framework.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={framework.compliance} className="w-24 h-1.5" />
                <span className="text-[14px] font-bold text-[var(--accent)]">{framework.compliance}%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Total Assessments</p>
              <p className="text-[20px] font-bold">{framework.stats.totalAssessments}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Total Controls</p>
              <p className="text-[20px] font-bold">{framework.stats.totalControls}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Controls in Progress</p>
              <p className="text-[20px] font-bold">{framework.stats.controlsInProgress}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Non Compliant Controls</p>
              <p className="text-[20px] font-bold">{framework.stats.nonCompliant}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── Compliance Insights Section ──────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold">Compliance Insights</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant={activeTab === 'control' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('control')}
            >
              Control Status
            </Button>
            <Button 
              variant={activeTab === 'test' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('test')}
            >
              Test Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[14px]">Status Distribution</CardTitle>
                <Info style={{ width: 14, height: 14, color: 'var(--muted-foreground)' }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                {/* Donut Chart */}
                <div className="relative">
                  <PieChart
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={70}
                    height={180}
                    width={180}
                    showLegend={false}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-[var(--muted-foreground)]">Total:</span>
                    <span className="text-[20px] font-bold">{totalControls}</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {framework.statusDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Domain Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[14px]">Domain Breakdown</CardTitle>
                  <p className="text-[11px] text-[var(--muted-foreground)]">Top 7 of 13 domains</p>
                </div>
                <Button variant="link" size="sm" className="text-[var(--accent)]">
                  Full Mode
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {framework.domainBreakdown.map((domain) => {
                  const total = domain.notAssessed + domain.nonCompliant + domain.partial + domain.compliant + domain.notApplicable;
                  return (
                    <div key={domain.name} className="flex items-center gap-3">
                      <span className="text-[11px] text-[var(--muted-foreground)] w-40 truncate">{domain.name}</span>
                      <div className="flex-1 h-4 bg-[var(--secondary)] rounded overflow-hidden flex">
                        {domain.notAssessed > 0 && (
                          <div 
                            className="h-full" 
                            style={{ width: `${(domain.notAssessed / total) * 100}%`, backgroundColor: 'var(--muted-foreground)' }}
                          />
                        )}
                        {domain.compliant > 0 && (
                          <div 
                            className="h-full" 
                            style={{ width: `${(domain.compliant / total) * 100}%`, backgroundColor: 'var(--ok)' }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 text-[10px] text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[var(--muted-foreground)]"></span> Not Assessed</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[var(--error)]"></span> Non Compliant</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#eab308]"></span> Partially Compliant</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[var(--ok)]"></span> Compliant</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#6b7280]"></span> Not Applicable</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Search & Export Bar ──────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <MagnifyingGlass 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" 
            style={{ width: 16, height: 16 }} 
          />
          <Input
            placeholder="Search controls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[280px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download style={{ width: 14, height: 14 }} />
            Export
          </Button>
          <Button variant="ghost" size="icon-sm">
            <CaretUpDown style={{ width: 16, height: 16 }} />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <X style={{ width: 16, height: 16 }} />
          </Button>
        </div>
      </div>

      {/* ─── Controls Accordion ───────────────────────────────── */}
      <Accordion 
        type="multiple" 
        value={openAccordions}
        onValueChange={setOpenAccordions}
      >
        {framework.controls.map((control) => (
          <AccordionItem 
            key={control.id} 
            value={control.id}
            className={`border border-[var(--border)] rounded-lg mb-2 overflow-hidden ${
              openAccordions.includes(control.id) ? 'border-l-2 border-l-[var(--accent)]' : ''
            }`}
          >
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="text-[14px] font-medium">
                  {control.id} {control.title}
                </span>
                <ControlProgressRing passed={control.passed} total={control.total} />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--secondary)]">
                    <TableHead className="w-1/2">CONTROL</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>OWNER</TableHead>
                    <TableHead className="w-16">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {control.children.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            <span className="text-[var(--accent)]">{child.id}</span> {child.title}
                          </p>
                          <p className="text-[11px] text-[var(--muted-foreground)] mt-1 line-clamp-2">
                            {child.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={child.status} />
                      </TableCell>
                      <TableCell className="text-[var(--muted-foreground)]">
                        {child.owner}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon-sm">
                          <DotsThreeVertical style={{ width: 16, height: 16 }} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
