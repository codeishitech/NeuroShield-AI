import React from "react";
import { 
  LayoutDashboard, 
  Dna, 
  Share2, 
  AlertOctagon, 
  FileText, 
  Settings, 
  ShieldCheck, 
  Terminal 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  systemRiskScore: number;
}

export default function Sidebar({ activeTab, setActiveTab, systemRiskScore }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "SOC Dashboard", icon: LayoutDashboard },
    { id: "employee-dna", label: "Behaviour DNA Profile", icon: Dna },
    { id: "risk-topology", label: "AI Risk & Topology", icon: Share2 },
    { id: "alerts", label: "Security Alerts", icon: AlertOctagon, badge: 3 },
    { id: "incident-reporting", label: "Incident Reporting", icon: FileText },
    { id: "admin-settings", label: "Model Admin Portal", icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-950/75 backdrop-blur-md border-r border-slate-800/60 flex flex-col h-screen fixed left-0 top-0 text-slate-300 z-30 shadow-2xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="p-2 bg-cyan-950/50 border border-cyan-500/40 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-white leading-tight tracking-tight">
            NEURO<span className="text-cyan-400 font-medium">SHIELD</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-400 tracking-wider">AI AGENT ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-3 px-2">
          Security Operations
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                isActive 
                  ? "bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]" 
                  : "hover:bg-slate-900/60 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4.5 h-4.5 transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-white"
                }`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 font-bold font-mono rounded-full ${
                  item.badge > 0 ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse" : "bg-slate-800 text-slate-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Threat Level Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50 backdrop-blur-md">
        <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400 font-medium">System Risk Score</span>
            <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
              systemRiskScore > 75 
                ? "bg-red-950/40 text-red-400 border border-red-500/20" 
                : systemRiskScore > 40 
                ? "bg-amber-950/40 text-amber-400 border border-amber-500/20" 
                : "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20"
            }`}>
              {systemRiskScore}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                systemRiskScore > 75 ? "bg-red-500" : systemRiskScore > 40 ? "bg-amber-500" : "bg-emerald-500"
              }`}
              style={{ width: `${systemRiskScore}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-[9px] font-mono text-slate-500">
            <span>Threat status:</span>
            <span className={systemRiskScore > 75 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
              {systemRiskScore > 75 ? "ELEVATED ALERT" : "STANDARD TRACKING"}
            </span>
          </div>
        </div>
        <div className="mt-3 text-center text-[10px] font-mono text-slate-600">
          NeuroShield AI v4.2.8
        </div>
      </div>
    </div>
  );
}
