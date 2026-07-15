import React, { useState, useEffect } from "react";
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  BrainCircuit, 
  Radar, 
  MapPin, 
  Clock, 
  Maximize2,
  Lock,
  ArrowRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from "recharts";
import { SecurityAlert, LiveEvent } from "../types";

interface OverviewTabProps {
  alerts: SecurityAlert[];
  events: LiveEvent[];
  onInvestigateAlert: (alertId: string) => void;
}

// Recharts colors
const COLORS = ["#06b6d4", "#3b82f6", "#ef4444", "#eab308", "#10b981", "#8b5cf6"];

const timelineData = [
  { hour: "00:00", attacks: 1 },
  { hour: "02:00", attacks: 4 },
  { hour: "04:00", attacks: 2 },
  { hour: "06:00", attacks: 0 },
  { hour: "08:00", attacks: 1 },
  { hour: "10:00", attacks: 3 },
  { hour: "12:00", attacks: 5 },
  { hour: "14:00", attacks: 2 },
  { hour: "16:00", attacks: 4 },
  { hour: "18:00", attacks: 2 },
  { hour: "20:00", attacks: 1 },
  { hour: "22:00", attacks: 3 }
];

const categoryData = [
  { name: "Exfiltration", value: 30 },
  { name: "Privilege Escalation", value: 25 },
  { name: "Credential Misuse", value: 20 },
  { name: "Suspicious Login", value: 15 },
  { name: "Malware", value: 10 }
];

const departmentRiskData = [
  { dept: "Core Banking", risk: 85 },
  { dept: "Wealth Mgmt", risk: 42 },
  { dept: "Global Treasury", risk: 65 },
  { dept: "Retail Loans", risk: 28 },
  { dept: "Human Resources", risk: 14 }
];

export default function OverviewTab({ alerts, events, onInvestigateAlert }: OverviewTabProps) {
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [scrollingEvents, setScrollingEvents] = useState<LiveEvent[]>(events);

  // Automatically append events periodically to simulate live telemetry streaming
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollingEvents((prev) => {
        const first = prev[0];
        const updated = [...prev.slice(1), {
          ...first,
          id: `EV-NEW-${Math.random()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }];
        return updated;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [events]);

  const activeAlert = alerts[activeAlertIndex] || alerts[0];

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">Monitored</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-white">8,420</div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">8,100 active on-prem</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">Active Sessions</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-white">1,294</div>
            <div className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              98.1% Session trust index
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between border-red-500/30 hover:border-red-500/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">High Risk Staff</span>
            <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-red-400">3</div>
            <div className="text-[9px] font-mono text-red-500 mt-0.5">EMP-88241 extreme match</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">Today's Alerts</span>
            <span className="text-red-400 text-xs font-bold bg-red-950/30 px-1.5 py-0.5 rounded border border-red-500/20">6</span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-white">6</div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">1 unresolved critical</div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">Detection Rate</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-white">99.4%</div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">AI heuristics baseline</div>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">AI Confidence</span>
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-bold font-display text-cyan-400">95.8%</div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">F1 score threshold</div>
          </div>
        </div>
      </div>

      {/* Main Row: Tactical Map & scrolling logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1 & 2: Tactical Map with Login Locations */}
        <div className="lg:col-span-2 glass-panel rounded-xl flex flex-col shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex justify-between items-center text-xs">
            <span className="font-display font-bold text-slate-300 uppercase flex items-center gap-2">
              <Radar className="w-4 h-4 text-cyan-400" />
              World Map – Login Geolocation Telemetry
            </span>
            <span className="text-slate-500 font-mono text-[10px]">COORDINATE INDEX SYSTEM</span>
          </div>

          {/* SVG High-Tech Radar Map */}
          <div className="flex-1 bg-slate-950 flex items-center justify-center p-6 relative min-h-[320px]">
            {/* Ambient circular radar rings overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-[100px] h-[100px] border border-cyan-500/20 rounded-full animate-pulse"></div>
              <div className="w-[220px] h-[220px] border border-cyan-500/10 rounded-full absolute"></div>
              <div className="w-[360px] h-[360px] border border-cyan-500/5 rounded-full absolute"></div>
            </div>

            <svg viewBox="0 0 800 400" className="w-full h-full text-slate-700 opacity-80 z-10" id="world-map-svg">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Stylized schematic continents outline */}
              <path 
                d="M100,100 L180,100 L230,150 L200,200 L170,200 L150,250 L120,240 L100,180 Z" 
                fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" strokeDasharray="3,3" 
              />
              <path 
                d="M250,220 L300,250 L320,320 L290,340 L260,300 L250,250 Z" 
                fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" strokeDasharray="3,3" 
              />
              <path 
                d="M380,80 L480,70 L550,110 L520,170 L470,180 L440,240 L410,240 L390,160 Z" 
                fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" strokeDasharray="3,3" 
              />
              <path 
                d="M560,120 L640,110 L680,160 L620,200 L580,210 Z" 
                fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" strokeDasharray="3,3" 
              />
              <path 
                d="M590,240 L640,240 L660,280 L620,300 Z" 
                fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" strokeDasharray="3,3" 
              />

              {/* Glowing lines connecting locations */}
              {/* Mumbai -> Moscow (ANOMALY) */}
              <path 
                d="M 520,200 Q 480,130 450,100" 
                fill="none" stroke="rgba(239, 68, 68, 0.55)" strokeWidth="1.5" strokeDasharray="5,3" 
              />
              {/* Mumbai -> Singapore */}
              <path 
                d="M 520,200 Q 560,210 590,220" 
                fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="1" 
              />
              {/* Mumbai -> London */}
              <path 
                d="M 520,200 Q 450,120 390,110" 
                fill="none" stroke="rgba(6, 182, 212, 0.35)" strokeWidth="1" 
              />

              {/* Location markers */}
              {/* 1. Mumbai Core Base (Safe) */}
              <g transform="translate(520,200)">
                <circle r="12" fill="rgba(16, 185, 129, 0.15)" />
                <circle r="6" fill="#10b981" />
                <text x="12" y="4" fill="#ffffff" fontSize="9" fontFamily="var(--font-mono)">MUMBAI HQ</text>
              </g>

              {/* 2. Singapore Node (Safe) */}
              <g transform="translate(590,220)">
                <circle r="4" fill="#06b6d4" />
                <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">SG_NODE</text>
              </g>

              {/* 3. London Node (Safe) */}
              <g transform="translate(390,110)">
                <circle r="4" fill="#06b6d4" />
                <text x="-48" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">LON_NODE</text>
              </g>

              {/* 4. Frankfurt Node (Safe) */}
              <g transform="translate(420,125)">
                <circle r="4" fill="#06b6d4" />
                <text x="8" y="3" fill="#94a3b8" fontSize="8" fontFamily="var(--font-mono)">FRA_NODE</text>
              </g>

              {/* 5. Moscow VPN Node (CRITICAL THREAT) */}
              <g transform="translate(450,100)">
                <circle r="22" fill="rgba(239, 68, 68, 0.2)" className="animate-ping" />
                <circle r="8" fill="#ef4444" className="pulse-red" />
                <circle r="3" fill="#ffffff" />
                <text x="12" y="-4" fill="#ef4444" fontWeight="bold" fontSize="9" fontFamily="var(--font-mono)">MOSCOW VPN (ANOMALY)</text>
              </g>
            </svg>

            {/* Float HUD on the map */}
            <div className="absolute bottom-4 left-4 p-3 bg-slate-950/90 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-400 space-y-1 backdrop-blur-sm z-20">
              <div className="font-semibold text-white uppercase text-[11px] mb-1">GPS Telemetry Indicators</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Baseline Session (Mumbai Core Subnet)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Whitelisted Secure Node (SGP / FRA / LON)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-red-400 font-bold">Unauthenticated Route (RU VPN Node)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Timeline */}
        <div className="glass-panel rounded-xl p-4 flex flex-col h-[400px] shadow-2xl">
          <div className="pb-3 border-b border-slate-800 flex justify-between items-center mb-3">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Live Security Activity Feed
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 border border-emerald-500/20 rounded">
              REAL-TIME
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {scrollingEvents.map((event) => (
              <div 
                key={event.id}
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all duration-200 ${
                  event.severity === "critical" 
                    ? "bg-red-950/20 border-red-950 text-red-300 hover:bg-red-950/30" 
                    : event.severity === "high" 
                    ? "bg-amber-950/15 border-amber-950 text-amber-300 hover:bg-amber-950/25" 
                    : "bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] font-bold px-1 py-0.2 rounded ${
                    event.severity === "critical" 
                      ? "bg-red-500/20 text-red-400" 
                      : event.severity === "high" 
                      ? "bg-amber-500/20 text-amber-400" 
                      : "bg-slate-800 text-slate-400"
                  }`}>
                    {event.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{event.timestamp}</span>
                </div>
                <p className="leading-snug">{event.description}</p>
                <div className="mt-1.5 text-[10px] text-slate-500 flex justify-between">
                  <span>ID: {event.id}</span>
                  <span className="text-cyan-500 font-medium">User: {event.employeeName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 2: Threat Statistics & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Threats Detected over Time */}
        <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Threat Activity Timeline</h4>
            <p className="text-slate-500 text-xs mb-4">Total anomalies and exfiltration triggers over 24 hrs</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(13, 18, 30, 0.95)", border: "1px solid rgba(51, 65, 85, 0.5)", borderRadius: "8px", backdropFilter: "blur(6px)" }}
                  labelClassName="text-slate-400 font-mono text-xs"
                />
                <Line 
                  type="monotone" 
                  dataKey="attacks" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, strokeWidth: 1.5, fill: "#020617" }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Alert Categories Pie */}
        <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Alert Category Breakdown</h4>
            <p className="text-slate-500 text-xs mb-4">Proportion of high-risk metrics flagged</p>
          </div>
          <div className="h-56 flex items-center justify-between">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "rgba(13, 18, 30, 0.95)", border: "1px solid rgba(51, 65, 85, 0.5)", borderRadius: "8px", backdropFilter: "blur(6px)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-36 space-y-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-slate-300 truncate w-20">{entry.name}</span>
                  <span className="text-slate-500 font-bold ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Department Risk Heatmap/Bar */}
        <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1">Departmental Risk Matrix</h4>
            <p className="text-slate-500 text-xs mb-4">Average employee anomaly rating by bank sector</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentRiskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="dept" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(13, 18, 30, 0.95)", border: "1px solid rgba(51, 65, 85, 0.5)", borderRadius: "8px", backdropFilter: "blur(6px)" }} />
                <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                  {departmentRiskData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.risk > 75 ? "#ef4444" : entry.risk > 40 ? "#eab308" : "#06b6d4"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Critical Alert Spotlight Callout */}
      <div className="bg-red-950/15 border border-red-500/30 rounded-xl p-5 glow-red flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-400 bg-red-950/50 px-2 py-0.5 border border-red-500/20 rounded uppercase">
                Critical Threat Unresolved
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {activeAlert.id}</span>
            </div>
            <h4 className="font-display font-bold text-base text-white mt-1">
              {activeAlert.title} (Emp: {activeAlert.employeeName})
            </h4>
            <p className="text-slate-400 text-xs mt-1 max-w-2xl leading-relaxed">
              Anomaly detected inside {activeAlert.appInvolved} at {activeAlert.timestamp}. The actor exfiltrated {activeAlert.downloadSize || "N/A"} from a geotagged {activeAlert.location} using an uncharacteristic typing dynamic.
            </p>
          </div>
        </div>
        <button
          onClick={() => onInvestigateAlert(activeAlert.id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-400 text-slate-950 font-bold text-xs font-display rounded-lg transition-all duration-300 flex items-center gap-1.5 shrink-0 self-stretch md:self-auto justify-center"
        >
          Investigate Alert
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
