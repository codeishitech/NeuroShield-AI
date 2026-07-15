import { SecurityAlert, LiveEvent, BehaviourBaseline, EvolutionPoint, NetworkNode, NetworkLink } from "./types";

export const rahulBaseline: BehaviourBaseline = {
  employeeName: "Rahul Sharma",
  employeeId: "EMP-88241",
  department: "Core Banking Infrastructure",
  role: "Lead Systems Engineer (SWIFT Gateway admin)",
  trustScore: 94,
  normalLoginTime: "09:00 AM - 06:30 PM (IST)",
  avgSessionDuration: "8.2 Hours",
  typingSpeed: 64, // WPM
  mousePattern: "Fluid Sinuous Jitter (Human standard, low linear-correlation)",
  freqApps: ["SSH Terminal", "git-scm", "K8s Dashboard", "Jenkins Console", "Slack", "SWIFT API Router"],
  normalDownloadSize: "450 MB / day",
  typicalLocations: ["Mumbai Core Subnet (10.12.94.x)", "Bangalore Remote Secure Subnet (10.14.2.x)"],
  preferredDevice: "Corporate MacBook Pro 16\" (Asset-ID: MB-9902)",
  commonFiles: [".json configuration parameters", "SWIFT ledger schemas", ".yaml cluster deployments"]
};

export const defaultAlerts: SecurityAlert[] = [
  {
    id: "AL-77401",
    title: "Critical Insider Threat: SWIFT Database Mirroring",
    employeeName: "Rahul Sharma",
    employeeId: "EMP-88241",
    department: "Core Banking Infrastructure",
    role: "Lead Systems Engineer",
    riskScore: 95,
    aiConfidence: 98,
    timestamp: "02:14:10 AM (Today)",
    category: "Exfiltration",
    status: "active",
    recommendedAction: "Immediately invalidate active tokens for EMP-88241. Revoke the client IP session on gateway and trigger local container quarantine. Notify security directors.",
    location: "Moscow, Russian Federation VPN (Anomalous, Baseline: Mumbai)",
    appInvolved: "SWIFT API Router (Core DB)",
    downloadSize: "14.2 GB compressed backup (.tar.gz)",
    device: "Secured Linux Shell (unregistered MAC address)",
    browser: "Command-Line curl/7.81.0",
    typingSimilarity: 12, // extremely different (automated scripting)
    mouseSimilarity: 5,   // zero movement (direct terminal injection)
    reasoningPoints: [
      { metric: "Anomalous Login Time", penalty: 20, note: "Accessed database at 02:14 AM. Baseline is standard business hours." },
      { metric: "Geographic Velocity Anomaly", penalty: 25, note: "Logged in from Moscow VPN 40 minutes after active session from Mumbai office." },
      { metric: "Extreme Download Size Deviation", penalty: 20, note: "Exceeded 14.2 GB download. Baseline average is 450 MB/day." },
      { metric: "Unregistered Device Signature", penalty: 20, note: "Bypassed standard MacBook Pro Asset to log in using root console terminal." },
      { metric: "Typing Cadence Deviation", penalty: 15, note: "Keystroke dynamics show 120 WPM with perfect 0ms dwell-time variance (Automation script)." }
    ]
  },
  {
    id: "AL-77402",
    title: "Privilege Escalation: Root Sudoers Overwrite",
    employeeName: "Rahul Sharma",
    employeeId: "EMP-88241",
    department: "Core Banking Infrastructure",
    role: "Lead Systems Engineer",
    riskScore: 89,
    aiConfidence: 92,
    timestamp: "02:08:45 AM (Today)",
    category: "Privilege Escalation",
    status: "investigating",
    recommendedAction: "Revert SWIFT system config updates in Docker orchestration pipeline. Audit active Kubernetes security contexts.",
    location: "Moscow, Russian Federation VPN",
    appInvolved: "SWIFT Ledger gateway",
    device: "Corporate MacBook Pro 16\" (Vessel Endpoint)",
    browser: "SSH daemon shell",
    reasoningPoints: [
      { metric: "Sudo Policy Violation", penalty: 30, note: "Attempted to modify /etc/sudoers file inside secure transaction runtime." },
      { metric: "Out of Hours Admin Command", penalty: 25, note: "Admin tasks executed during severe sleep hours." },
      { metric: "Abnormal Application Focus", penalty: 34, note: "Switched focus to highly classified ledger container namespaces." }
    ]
  },
  {
    id: "AL-77403",
    title: "Suspicious Login: Session Hijack Indicator",
    employeeName: "Ananya Roy",
    employeeId: "EMP-94022",
    department: "Wealth Management Operations",
    role: "Operations Director",
    riskScore: 78,
    aiConfidence: 85,
    timestamp: "03:45:11 AM (Today)",
    category: "Suspicious Login",
    status: "active",
    recommendedAction: "Enforce Step-Up Multifactor Authentication on the next session. Flag user for review.",
    location: "Frankfurt, Germany VPN",
    appInvolved: "Investment Portfolio Manager",
    device: "iPad Pro",
    browser: "Safari Mobile",
    reasoningPoints: [
      { metric: "Unusual Device Signature", penalty: 40, note: "Logged in using mobile browser. Baseline is strictly desktop Chrome." },
      { metric: "VPN IP Address Detected", penalty: 38, note: "IP ranges flag as commercial hosting provider node." }
    ]
  },
  {
    id: "AL-77404",
    title: "Credential Misuse: Concurrent Access Spikes",
    employeeName: "Vikram Mehta",
    employeeId: "EMP-30310",
    department: "Global Treasury Services",
    role: "Treasury Auditor",
    riskScore: 68,
    aiConfidence: 77,
    timestamp: "11:22:19 AM (Today)",
    category: "Credential Misuse",
    status: "investigating",
    recommendedAction: "Invalidate the secondary concurrent session. Contact employee to verify location.",
    location: "Singapore & Mumbai (Concurrent)",
    appInvolved: "Global Funds Router",
    device: "Windows Desktop Core",
    browser: "Chrome v120",
    reasoningPoints: [
      { metric: "Concurrent Login Locations", penalty: 68, note: "Simultaneous sessions from locations over 4,000 miles apart within 10 minutes." }
    ]
  },
  {
    id: "AL-77405",
    title: "Unusual File Access: Decryption Keys Download",
    employeeName: "Sarah Jenkins",
    employeeId: "EMP-10294",
    department: "Retail Loans Division",
    role: "Database Analyst",
    riskScore: 62,
    aiConfidence: 80,
    timestamp: "09:44:02 AM (Today)",
    category: "Anomalous Command",
    status: "resolved",
    recommendedAction: "Review decryption log metrics. Session is completed, local device audited.",
    location: "London Office (On-Premises)",
    appInvolved: "Active Directory & Vault Service",
    device: "Windows Laptop",
    browser: "Internal App v2",
    reasoningPoints: [
      { metric: "Sensitive Folder Read", penalty: 42, note: "Accessed vault subfolders containing active production private keys." },
      { metric: "Departmental Deviation", penalty: 20, note: "Analyst is assigned to Retail Loans, not security. File access lacks business alignment." }
    ]
  },
  {
    id: "AL-77406",
    title: "Malware Detected: CryptoMiner Daemon",
    employeeName: "Rajesh Patel",
    employeeId: "EMP-00481",
    department: "Quantitative Modeling Group",
    role: "Algorithms Developer",
    riskScore: 82,
    aiConfidence: 96,
    timestamp: "04:12:30 AM (Yesterday)",
    category: "Malware",
    status: "quarantined",
    recommendedAction: "Device is isolated automatically. Wipe system and restore developer workstation image.",
    location: "Mumbai (On-Premises)",
    appInvolved: "GPU Research Cluster Node #4",
    device: "Ubuntu Workstation 24.04",
    browser: "Process background shell",
    reasoningPoints: [
      { metric: "Malicious Hash Detected", penalty: 50, note: "Binary execution matches active Monero miner hash list." },
      { metric: "Unusual CPU Surge", penalty: 32, note: "Constant 100% utilization on core banking algorithms pipeline." }
    ]
  }
];

export const liveEvents: LiveEvent[] = [
  {
    id: "EV-001",
    timestamp: "02:14:10 AM",
    description: "Database backup downloaded: 14.2 GB SWIFT transactions (Emp: Rahul Sharma)",
    employeeName: "Rahul Sharma",
    severity: "critical",
    iconName: "Download",
    category: "Exfiltration"
  },
  {
    id: "EV-002",
    timestamp: "02:12:05 AM",
    description: "Database copy command executed inside SWIFT container sandbox (Emp: Rahul Sharma)",
    employeeName: "Rahul Sharma",
    severity: "critical",
    iconName: "Terminal",
    category: "Anomalous Command"
  },
  {
    id: "EV-003",
    timestamp: "02:08:45 AM",
    description: "Sudoers config file overwrite attempted inside production server (Emp: Rahul Sharma)",
    employeeName: "Rahul Sharma",
    severity: "high",
    iconName: "Lock",
    category: "Privilege Escalation"
  },
  {
    id: "EV-004",
    timestamp: "02:05:11 AM",
    description: "Successful login via Moscow, RU VPN node (Anomalous) - Device unregistered (Emp: Rahul Sharma)",
    employeeName: "Rahul Sharma",
    severity: "high",
    iconName: "LogIn",
    category: "Suspicious Login"
  },
  {
    id: "EV-005",
    timestamp: "01:58:32 AM",
    description: "USB Mass Storage device connected to corporate endpoint (Emp: Rajesh Patel)",
    employeeName: "Rajesh Patel",
    severity: "medium",
    iconName: "Usb",
    category: "Hardware"
  },
  {
    id: "EV-006",
    timestamp: "01:44:12 AM",
    description: "Failed login attempt (3/5) to SWIFT gateway API router (Emp: Rahul Sharma)",
    employeeName: "Rahul Sharma",
    severity: "medium",
    iconName: "AlertTriangle",
    category: "Authentication"
  },
  {
    id: "EV-007",
    timestamp: "01:10:02 AM",
    description: "VPN server connection established using Commercial Cloud proxy (Emp: Ananya Roy)",
    employeeName: "Ananya Roy",
    severity: "medium",
    iconName: "Globe",
    category: "Network"
  },
  {
    id: "EV-008",
    timestamp: "01:00:15 AM",
    description: "Password change request validated via automated phone callback (Emp: Vikram Mehta)",
    employeeName: "Vikram Mehta",
    severity: "low",
    iconName: "Key",
    category: "Identity"
  },
  {
    id: "EV-009",
    timestamp: "12:54:21 AM",
    description: "Routine system diagnostics run completed (Security Node Core-7)",
    employeeName: "System Daemon",
    severity: "low",
    iconName: "Shield",
    category: "Audit"
  }
];

export const weeklyEvolution: EvolutionPoint[] = [
  { week: "Week 25", baselineScore: 98, deviantScore: 98, anomaliesDetected: 0, notes: "Complete behavior alignment. Standard coding and gateway maintenance hours." },
  { week: "Week 26", baselineScore: 97, deviantScore: 95, anomaliesDetected: 1, notes: "Brief remote login from out-of-boundary region (Bangalore subnet) during travel. Confirmed safe." },
  { week: "Week 27", baselineScore: 96, deviantScore: 94, anomaliesDetected: 0, notes: "Adaptability matrix updated: Registered MacBook Pro 16 as primary asset. Typographical rhythm stable." },
  { week: "Week 28", baselineScore: 95, deviantScore: 92, anomaliesDetected: 2, notes: "Minor deviation: Executed several complex docker configurations outside standard maintenance windows." },
  { week: "Week 29", baselineScore: 94, deviantScore: 78, anomaliesDetected: 5, notes: "Erosion of Trust: Initiated downloads of database schema parameters. Occasional off-hour scripts." },
  { week: "Week 30", baselineScore: 94, deviantScore: 12, anomaliesDetected: 14, notes: "Severe Degradation: Extreme out-of-hours commands executed, database exfiltration trigger, keyboard dynamic matches script execution." }
];

export const initialNodes: NetworkNode[] = [
  { id: "node-rahul", label: "Rahul Sharma (EMP-88241)", type: "employee", status: "critical", x: 300, y: 150, pulse: true },
  { id: "node-macbook", label: "Corporate MacBook Pro", type: "device", status: "safe", x: 150, y: 150 },
  { id: "node-terminal", label: "Root Linux Console (Unregistered)", type: "device", status: "critical", x: 450, y: 100, pulse: true },
  { id: "node-swift-db", label: "SWIFT Core Database Server", type: "database", status: "critical", x: 600, y: 220 },
  { id: "node-ledger", label: "SWIFT Transaction Ledger", type: "server", status: "anomaly", x: 450, y: 280 },
  { id: "node-gateway", label: "Core Bank Gateway Router", type: "server", status: "safe", x: 200, y: 280 },
  { id: "node-active-directory", label: "Active Directory controller", type: "server", status: "safe", x: 100, y: 220 },
  { id: "node-auditor", label: "Global Treasury Services Node", type: "database", status: "safe", x: 320, y: 350 }
];

export const initialLinks: NetworkLink[] = [
  { source: "node-rahul", target: "node-macbook", status: "normal" },
  { source: "node-rahul", target: "node-terminal", status: "suspicious" },
  { source: "node-terminal", target: "node-swift-db", status: "suspicious" },
  { source: "node-terminal", target: "node-ledger", status: "suspicious" },
  { source: "node-macbook", target: "node-gateway", status: "normal" },
  { source: "node-gateway", target: "node-active-directory", status: "normal" },
  { source: "node-ledger", target: "node-auditor", status: "normal" },
  { source: "node-swift-db", target: "node-ledger", status: "suspicious" }
];
