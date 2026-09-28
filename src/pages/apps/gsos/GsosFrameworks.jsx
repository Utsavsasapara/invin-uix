import { useNavigate } from 'react-router-dom';
import { Card } from 'invin-uix/ui/card';
import { Badge } from 'invin-uix/ui/badge';
import { Button } from 'invin-uix/ui/button';
import { Progress } from 'invin-uix/ui/progress';
import { 
  Plus,
  Download,
  ArrowRight,
} from 'invin-uix/ui/icons';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const summaryStats = {
  frameworks: 13,
  totalControls: 1955,
  passed: 126,
  pending: 1829,
  avgCompliance: 5.8,
};

const frameworksData = [
  { 
    id: 'cis-v8',
    code: 'CIS', 
    name: 'CIS Controls v8.1', 
    type: 'Compliance',
    compliance: 16,
    controls: { passed: 25, total: 153 },
    color: '#3b82f6',
  },
  { 
    id: 'csa-ccm',
    code: 'CSA', 
    name: 'CSA CCM v4', 
    type: 'Compliance',
    compliance: 13,
    controls: { passed: 23, total: 178 },
    color: '#8b5cf6',
  },
  { 
    id: 'gdpr',
    code: 'GDPR', 
    name: 'GDPR', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 123 },
    color: '#06b6d4',
  },
  { 
    id: 'dpdpa',
    code: 'INDI', 
    name: 'India DPDPA 2023', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 119 },
    color: '#f97316',
  },
  { 
    id: 'iso-22301',
    code: 'ISO', 
    name: 'ISO 22301:2019', 
    type: 'Compliance',
    compliance: 18,
    controls: { passed: 10, total: 57 },
    color: '#10b981',
  },
  { 
    id: 'iso-27001',
    code: 'ISO', 
    name: 'ISO 27001:2022', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 123 },
    color: '#10b981',
  },
  { 
    id: 'iso-27701',
    code: 'ISO', 
    name: 'ISO 27701', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 55 },
    color: '#10b981',
  },
  { 
    id: 'nist-csf',
    code: 'NIST', 
    name: 'NIST CSF 2.0', 
    type: 'Compliance',
    compliance: 5,
    controls: { passed: 5, total: 106 },
    color: '#ef4444',
  },
  { 
    id: 'pci-dss',
    code: 'PCI', 
    name: 'PCI DSS v4.0.1', 
    type: 'Compliance',
    compliance: 20,
    controls: { passed: 51, total: 259 },
    color: '#eab308',
  },
  { 
    id: 'rbi-2023',
    code: 'RBI', 
    name: 'RBI Master Direction 2023', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 174 },
    color: '#ec4899',
  },
  { 
    id: 'sama-bcm',
    code: 'SAMA', 
    name: 'SAMA Business Continuity Management Framework', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 73 },
    color: '#14b8a6',
  },
  { 
    id: 'sama-csf',
    code: 'SAMA', 
    name: 'SAMA Cyber Security Framework', 
    type: 'Compliance',
    compliance: 4,
    controls: { passed: 12, total: 276 },
    color: '#14b8a6',
  },
  { 
    id: 'soc2',
    code: 'SOC', 
    name: 'SOC 2 Type II', 
    type: 'Compliance',
    compliance: 0,
    controls: { passed: 0, total: 259 },
    color: '#6366f1',
  },
];

// ─── Framework Card Component ────────────────────────────────────────────────

function FrameworkCard({ framework, onClick }) {
  const complianceColor = framework.compliance > 15 
    ? 'var(--ok)' 
    : framework.compliance > 0 
      ? 'var(--accent)' 
      : 'var(--muted-foreground)';

  return (
    <Card 
      className="cursor-pointer hover:border-[var(--accent)] transition-all"
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Badge */}
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
              style={{ backgroundColor: framework.color }}
            >
              {framework.code}
            </div>
            {/* Title */}
            <div>
              <h3 className="text-[14px] font-semibold text-[var(--foreground)] line-clamp-1">
                {framework.name}
              </h3>
              <p className="text-[11px] text-[var(--muted-foreground)]">{framework.type}</p>
            </div>
          </div>
          {/* Download */}
          <Button variant="ghost" size="icon-sm">
            <Download style={{ width: 14, height: 14 }} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <Progress 
            value={framework.compliance} 
            className="h-1.5"
            style={{ 
              '--progress-foreground': complianceColor,
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[var(--muted-foreground)]">
            ◎ {framework.controls.passed} / {framework.controls.total} controls
          </span>
          <span 
            className="text-[14px] font-bold"
            style={{ color: complianceColor }}
          >
            {framework.compliance}%
          </span>
        </div>

        {/* Insights Link */}
        <div className="mt-3 pt-3 border-t border-[var(--border)]">
          <button className="text-[12px] text-[var(--accent)] font-medium flex items-center gap-1 hover:underline">
            Insights <ArrowRight style={{ width: 12, height: 12 }} />
          </button>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Frameworks Component ───────────────────────────────────────────────

export default function GsosFrameworks() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <div>
        <p className="text-[12px] text-[var(--muted-foreground)]">
          <span className="text-[var(--accent)]">🏠 Home</span> › 
          <span className="text-[var(--accent)]"> Compliance</span> › Frameworks
        </p>
        <h1 className="text-[24px] font-bold text-[var(--foreground)] mt-1">
          Frameworks
        </h1>
      </div>

      {/* ─── Summary Section ──────────────────────────────────── */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title & Description */}
          <div>
            <h2 className="text-[16px] font-semibold text-[var(--foreground)]">
              Enrolled Frameworks
            </h2>
            <p className="text-[12px] text-[var(--muted-foreground)] mt-1">
              Compliance posture across all enrolled frameworks
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--muted-foreground)]"></span>
              <span className="text-[12px] text-[var(--muted-foreground)]">Frameworks:</span>
              <span className="text-[12px] font-semibold">{summaryStats.frameworks}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--foreground)]"></span>
              <span className="text-[12px] text-[var(--muted-foreground)]">Total Controls:</span>
              <span className="text-[12px] font-semibold">{summaryStats.totalControls}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ok)]"></span>
              <span className="text-[12px] text-[var(--muted-foreground)]">Passed:</span>
              <span className="text-[12px] font-semibold text-[var(--ok)]">{summaryStats.passed}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>
              <span className="text-[12px] text-[var(--muted-foreground)]">Pending:</span>
              <span className="text-[12px] font-semibold text-[#eab308]">{summaryStats.pending}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              <span className="text-[12px] text-[var(--muted-foreground)]">Avg Compliance:</span>
              <span className="text-[12px] font-semibold text-[var(--accent)]">{summaryStats.avgCompliance}%</span>
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="mt-4">
          <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)]">
            <Plus style={{ width: 14, height: 14 }} />
            Enroll Framework
          </Button>
        </div>
      </Card>

      {/* ─── Frameworks Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworksData.map((framework) => (
          <FrameworkCard 
            key={framework.id}
            framework={framework}
            onClick={() => navigate(`/apps/gsos-demo/frameworks/${framework.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
