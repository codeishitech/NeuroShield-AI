export interface SecurityAlert {
  id: string;
  title: string;
  employeeName: string;
  employeeId: string;
  department: string;
  role: string;
  riskScore: number;
  aiConfidence: number;
  timestamp: string;
  category: "Exfiltration" | "Privilege Escalation" | "Credential Misuse" | "Suspicious Login" | "Anomalous Command" | "Malware";
  status: "active" | "investigating" | "resolved" | "quarantined";
  recommendedAction: string;
  location: string;
  appInvolved: string;
  downloadSize?: string;
  device?: string;
  browser?: string;
  typingSimilarity?: number;
  mouseSimilarity?: number;
  reasoningPoints: { metric: string; penalty: number; note: string }[];
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  description: string;
  employeeName: string;
  severity: "critical" | "high" | "medium" | "low";
  iconName: string;
  category: string;
}

export interface BehaviourBaseline {
  employeeName: string;
  employeeId: string;
  department: string;
  role: string;
  trustScore: number;
  normalLoginTime: string;
  avgSessionDuration: string;
  typingSpeed: number; // in WPM
  mousePattern: string; // e.g., "Sinuous/Smooth"
  freqApps: string[];
  normalDownloadSize: string;
  typicalLocations: string[];
  preferredDevice: string;
  commonFiles: string[];
}

export interface EvolutionPoint {
  week: string;
  baselineScore: number;
  deviantScore: number;
  anomaliesDetected: number;
  notes: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: "employee" | "device" | "server" | "database";
  status: "safe" | "anomaly" | "critical";
  x: number;
  y: number;
  pulse?: boolean;
}

export interface NetworkLink {
  source: string;
  target: string;
  status: "normal" | "suspicious";
}
