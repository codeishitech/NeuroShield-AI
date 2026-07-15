import React, { useState } from "react";
import { 
  Settings, 
  Sliders, 
  Cpu, 
  BellRing, 
  Share2, 
  Terminal, 
  ShieldCheck, 
  FolderLock, 
  Zap, 
  BookOpen 
} from "lucide-react";

export default function AdminTab() {
  const [riskThreshold, setRiskThreshold] = useState(75);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [isSiemActive, setIsSiemActive] = useState(true);
  const [isMfaForced, setIsMfaForced] = useState(true);

  const technologies = [
    { name: "React", type: "Frontend" },
    { name: "Python", type: "AI Engine" },
    { name: "FastAPI", type: "Gateway API" },
    { name: "MongoDB", type: "DNA Database" },
    { name: "Scikit-learn", type: "Heuristics Clustering" },
    { name: "TensorFlow", type: "Neural Keyboard Dynamics" },
    { name: "JWT", type: "Secure Tokens" },
    { name: "Docker", type: "Enclave Sandbox" }
  ];

  const auditLogs = [
    { time: "11:02:14", action: "SIEM Connection Heartbeat", actor: "Splunk Integration", status: "success" },
    { time: "10:44:11", action: "Update Threshold: Risk Alarm", actor: "Admin (SEC_ID_04)", status: "success" },
    { time: "09:30:15", action: "Re-train Model: Keyboard-Biometric-v4", actor: "Auto-ML Pipeline", status: "success" },
    { time: "08:14:02", action: "API Authentication Token Rotated", actor: "SWIFT Daemon", status: "success" },
    { time: "07:00:00", action: "Daily System Health Check", actor: "NeuroShield Watcher", status: "success" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Model Parameters & Sliders */}
        <div className="glass-panel rounded-xl p-5 flex flex-col shadow-2xl justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Behaviour DNA Risk Threshold Controls
            </h4>
            <p className="text-slate-500 text-xs mb-4">Set alerts triggers and automatic mitigation sensitivities</p>
          </div>

          <div className="space-y-5 flex-1">
            
            {/* Risk threshold slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Global Insider Risk Limit</span>
                <span className="text-cyan-400 font-bold">{riskThreshold}% Score</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer h-1.5"
              />
              <p className="text-[10px] text-slate-500 leading-normal">
                Active sessions with calculated risk scores exceeding this threshold automatically initiate step-up security protocols (e.g., VPN socket block).
              </p>
            </div>

            {/* Confidence slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">AI Confidence Alarm Gate</span>
                <span className="text-cyan-400 font-bold">{confidenceThreshold}% Limit</span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 rounded-lg cursor-pointer h-1.5"
              />
              <p className="text-[10px] text-slate-500 leading-normal">
                Heuristic confidence gate. Higher thresholds reduce false-positives but may bypass complex, slower multi-stage infiltration behaviors.
              </p>
            </div>

            {/* Admin Toggles */}
            <div className="pt-4 border-t border-slate-900 space-y-3 text-xs">
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-300">Automatic Container Sandbox Isolation</div>
                  <div className="text-[10px] text-slate-500">Quarantine Docker pods automatically on high-risk Exfiltration alerts.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={isMfaForced}
                  onChange={(e) => setIsMfaForced(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer rounded bg-slate-900"
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-300">Live SIEM Sync (Splunk / Elastic)</div>
                  <div className="text-[10px] text-slate-500">Push high-fidelity Behaviour DNA scores into third-party log dashboards.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={isSiemActive}
                  onChange={(e) => setIsSiemActive(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer rounded bg-slate-900"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Right Side: Security Systems Integrations */}
        <div className="glass-panel rounded-xl p-5 flex flex-col shadow-2xl justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              SIEM & API Integration Nodes
            </h4>
            <p className="text-slate-500 text-xs mb-4">Audit active security operations endpoints</p>
          </div>

          <div className="space-y-3.5 flex-1">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-300">Splunk Cloud Gateway</div>
                <div className="text-[9px] text-slate-500 font-mono">ENDPOINT: https://siem.bank.internal/v1/log</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded">
                CONNECTED
              </span>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-300">Active Directory LDAP Bridge</div>
                <div className="text-[9px] text-slate-500 font-mono">ENDPOINT: ldap://ad.bank.internal:389</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 rounded">
                CONNECTED
              </span>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex justify-between items-center text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-300">IBM QRadar Logger</div>
                <div className="text-[9px] text-slate-500 font-mono">ENDPOINT: syslog://qradar-sys.bank.internal:514</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-900 text-slate-500 border border-slate-800 rounded">
                STANDBY
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Technologies & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Technologies Badge Deck */}
        <div className="glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              NeuroShield Platform Technology Stack
            </h4>
            <p className="text-slate-500 text-xs mb-4">Core software frameworks validated for bank hackathon compliance</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {technologies.map((tech) => (
              <div 
                key={tech.name} 
                className="p-2 bg-slate-900/50 border border-slate-800/80 rounded-lg hover:border-cyan-500/20 transition group text-center"
              >
                <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition">{tech.name}</div>
                <div className="text-[9px] text-slate-500 font-mono mt-0.5">{tech.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-sm text-white mb-1 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              SOC Administrative Audit Logs
            </h4>
            <p className="text-slate-500 text-xs mb-4">System action telemetry for cybersecurity compliance tracking</p>
          </div>

          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
            {auditLogs.map((log, idx) => (
              <div 
                key={idx}
                className="p-2.5 bg-slate-900/40 border border-slate-800/50 rounded-lg flex justify-between items-center text-[11px] font-mono"
              >
                <div className="flex gap-2.5 items-center">
                  <span className="text-slate-500 font-semibold">{log.time}</span>
                  <span className="text-slate-300 font-semibold">{log.action}</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-slate-500">{log.actor}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/30 px-1.5 py-0.2 rounded border border-emerald-500/10">
                    {log.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
