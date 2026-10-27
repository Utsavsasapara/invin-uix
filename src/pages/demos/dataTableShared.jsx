import { Badge } from 'invin-uix/ui/badge';

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK DATA — security/monitoring themed, shared across every DataTable demo page
// ═══════════════════════════════════════════════════════════════════════════════

export const incidents = [
  { id: 'INC-1001', title: 'Unauthorized SSH login attempt', severity: 'critical', status: 'open', category: 'Intrusion', assignee: 'Aditi Rao', department: 'SOC', affectedAssets: 3, riskScore: 92, createdAt: '2026-10-18' },
  { id: 'INC-1002', title: 'Malware signature detected on endpoint', severity: 'high', status: 'investigating', category: 'Malware', assignee: 'Marcus Webb', department: 'SOC', affectedAssets: 1, riskScore: 78, createdAt: '2026-10-18' },
  { id: 'INC-1003', title: 'Unusual outbound traffic volume', severity: 'medium', status: 'investigating', category: 'Network', assignee: 'Priya Nair', department: 'NetOps', affectedAssets: 5, riskScore: 61, createdAt: '2026-10-17' },
  { id: 'INC-1004', title: 'Failed MFA brute-force attempt', severity: 'high', status: 'open', category: 'Identity', assignee: 'Aditi Rao', department: 'SOC', affectedAssets: 1, riskScore: 84, createdAt: '2026-10-17' },
  { id: 'INC-1005', title: 'Expired TLS certificate on gateway', severity: 'low', status: 'resolved', category: 'Infrastructure', assignee: 'Marcus Webb', department: 'NetOps', affectedAssets: 1, riskScore: 22, createdAt: '2026-10-16' },
  { id: 'INC-1006', title: 'Privilege escalation on DB host', severity: 'critical', status: 'open', category: 'Access Control', assignee: 'Priya Nair', department: 'SOC', affectedAssets: 2, riskScore: 95, createdAt: '2026-10-16' },
  { id: 'INC-1007', title: 'Phishing email reported by employee', severity: 'medium', status: 'resolved', category: 'Phishing', assignee: 'Aditi Rao', department: 'SOC', affectedAssets: 1, riskScore: 48, createdAt: '2026-10-15' },
  { id: 'INC-1008', title: 'Ransomware behavior flagged by EDR', severity: 'critical', status: 'investigating', category: 'Malware', assignee: 'Marcus Webb', department: 'SOC', affectedAssets: 4, riskScore: 97, createdAt: '2026-10-15' },
  { id: 'INC-1009', title: 'Port scan from external IP', severity: 'low', status: 'closed', category: 'Network', assignee: 'Priya Nair', department: 'NetOps', affectedAssets: 1, riskScore: 18, createdAt: '2026-10-14' },
  { id: 'INC-1010', title: 'Anomalous data exfiltration pattern', severity: 'high', status: 'open', category: 'Data Loss', assignee: 'Aditi Rao', department: 'SOC', affectedAssets: 2, riskScore: 88, createdAt: '2026-10-14' },
];

export const assets = [
  { id: 'AST-01', name: 'web-prod-01', type: 'Server', department: 'Infrastructure', owner: 'Marcus Webb', ipAddress: '10.2.4.11', riskScore: 72, status: 'online' },
  { id: 'AST-02', name: 'db-prod-02', type: 'Server', department: 'Infrastructure', owner: 'Priya Nair', ipAddress: '10.2.4.18', riskScore: 88, status: 'online' },
  { id: 'AST-03', name: 'fw-edge-01', type: 'Network', department: 'NetOps', owner: 'Marcus Webb', ipAddress: '10.2.1.1', riskScore: 40, status: 'online' },
  { id: 'AST-04', name: 'laptop-aditi', type: 'Workstation', department: 'SOC', owner: 'Aditi Rao', ipAddress: '10.4.12.5', riskScore: 15, status: 'offline' },
  { id: 'AST-05', name: 'vpn-gateway', type: 'Network', department: 'NetOps', owner: 'Priya Nair', ipAddress: '10.2.1.9', riskScore: 55, status: 'online' },
  { id: 'AST-06', name: 's3-backup-bucket', type: 'Cloud', department: 'Infrastructure', owner: 'Marcus Webb', ipAddress: '—', riskScore: 30, status: 'online' },
  { id: 'AST-07', name: 'laptop-priya', type: 'Workstation', department: 'SOC', owner: 'Priya Nair', ipAddress: '10.4.12.9', riskScore: 12, status: 'online' },
  { id: 'AST-08', name: 'auth-service', type: 'Cloud', department: 'Infrastructure', owner: 'Aditi Rao', ipAddress: '10.2.9.3', riskScore: 66, status: 'online' },
];

export const orgTree = [
  {
    id: 'dept-soc', name: 'Security Operations', role: 'Department', headcount: 12,
    children: [
      { id: 'team-triage', name: 'Triage Team', role: 'Team', headcount: 5, children: [
        { id: 'user-aditi', name: 'Aditi Rao', role: 'Senior Analyst', headcount: 1 },
        { id: 'user-marcus', name: 'Marcus Webb', role: 'Analyst', headcount: 1 },
      ]},
      { id: 'team-ir', name: 'Incident Response', role: 'Team', headcount: 7, children: [
        { id: 'user-priya', name: 'Priya Nair', role: 'IR Lead', headcount: 1 },
      ]},
    ],
  },
  {
    id: 'dept-netops', name: 'Network Operations', role: 'Department', headcount: 8,
    children: [
      { id: 'team-mon', name: 'Monitoring', role: 'Team', headcount: 4 },
    ],
  },
];

export const SEVERITIES = ['critical', 'high', 'medium', 'low'];
export const EVENT_TYPES = ['Login Attempt', 'File Access', 'Network Scan', 'Config Change', 'Process Spawn'];

export const bigLogData = Array.from({ length: 1000 }, (_, i) => ({
  id: `LOG-${String(i + 1).padStart(5, '0')}`,
  event: EVENT_TYPES[i % EVENT_TYPES.length],
  source: `host-${(i % 40) + 1}`,
  severity: SEVERITIES[i % SEVERITIES.length],
  timestamp: `2026-10-${String((i % 20) + 1).padStart(2, '0')} ${String(i % 24).padStart(2, '0')}:00`,
}));

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED CELL RENDERERS
// ═══════════════════════════════════════════════════════════════════════════════

const SEVERITY_VARIANT = { critical: 'destructive', high: 'warning', medium: 'info', low: 'secondary' };
const STATUS_VARIANT = { open: 'destructive', investigating: 'warning', resolved: 'success', closed: 'secondary', online: 'success', offline: 'secondary' };

export function SeverityBadge({ value }) {
  return <Badge variant={SEVERITY_VARIANT[value] || 'secondary'} size="sm">{value}</Badge>;
}

export function StatusBadge({ value }) {
  return <Badge variant={STATUS_VARIANT[value] || 'secondary'} size="sm">{value}</Badge>;
}

export function incidentColumns(extra = {}) {
  return [
    { id: 'id', header: 'ID', accessor: 'id', sortable: true, width: '110px', ...extra.id },
    { id: 'title', header: 'Title', accessor: 'title', sortable: true, ...extra.title },
    { id: 'severity', header: 'Severity', accessor: 'severity', sortable: true, cell: ({ value }) => <SeverityBadge value={value} />, ...extra.severity },
    { id: 'status', header: 'Status', accessor: 'status', sortable: true, cell: ({ value }) => <StatusBadge value={value} />, ...extra.status },
    { id: 'assignee', header: 'Assignee', accessor: 'assignee', sortable: true, ...extra.assignee },
    { id: 'department', header: 'Department', accessor: 'department', sortable: true, ...extra.department },
  ];
}
