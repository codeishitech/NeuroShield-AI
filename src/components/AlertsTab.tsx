import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  BrainCircuit, 
  MapPin, 
  FileCheck 
} from "lucide-react";
import { SecurityAlert } from "../types";

interface AlertsTabProps {
  alerts: SecurityAlert[];
  onInvestigateAlert: (alertId: string) => void;
}

export default function AlertsTab({ alerts, onInvestigateAlert }: AlertsTabProps) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      alert.employeeId.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return alert.status === filter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Filters and Search row */}
      <div className="glass-panel rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4 shadow-2xl">
        <div className="flex flex-wrap gap-2">
          {["all", "active", "investigating", "quarantined", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition ${
                filter === status 
                  ? "bg-cyan-950/50 text-cyan-400 border border-cyan-500/40" 
                  : "bg-slate-900 text-slate-400 border border-transparent hover:bg-slate-800 hover:text-white"
              }`}
            >
              {status} ({alerts.filter(a => status === "all" || a.status === status).length})
            </button>
          ))}
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Employee or Alert type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Grid of Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.riskScore >= 80;
          return (
            <div 
              key={alert.id}
              className={`glass-panel rounded-xl p-5 flex flex-col justify-between transition duration-300 hover:border-slate-600 shadow-2xl relative overflow-hidden group ${
                isCritical 
                  ? "border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.12)]" 
                  : "border-slate-700/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              }`}
            >
              {/* Alert Ribbon */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${
                alert.status === "active" 
                  ? "bg-red-500" 
                  : alert.status === "investigating" 
                  ? "bg-amber-500" 
                  : alert.status === "quarantined" 
                  ? "bg-indigo-500" 
                  : "bg-emerald-500"
              }`}></div>

              <div>
                {/* Card Top */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{alert.category}</span>
                    <h4 className="font-display font-extrabold text-sm text-white mt-1 leading-snug group-hover:text-cyan-400 transition">
                      {alert.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      alert.status === "active" 
                        ? "bg-red-950/40 text-red-400 border border-red-500/20" 
                        : alert.status === "investigating" 
                        ? "bg-amber-950/40 text-amber-400 border border-amber-500/20" 
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {alert.status}
                    </span>
                    <div className="text-xs font-mono font-bold text-red-400 mt-1.5">{alert.riskScore} RISK</div>
                  </div>
                </div>

                {/* Staff metadata */}
                <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg my-4 space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Employee: <strong>{alert.employeeName}</strong></span>
                    <span className="font-mono text-slate-500 text-[10px]">{alert.employeeId}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Dept: {alert.department}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-600" />
                      {alert.location}
                    </span>
                  </div>
                </div>

                {/* AI reasoning bullets */}
                <div className="text-xs space-y-1.5 font-mono text-slate-400">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                    AI Heuristic Analysis Reasoning:
                  </div>
                  <ul className="list-disc pl-4 space-y-1">
                    {alert.reasoningPoints.slice(0, 2).map((point) => (
                      <li key={point.metric} className="leading-snug">
                        <span className="text-slate-300 font-bold">{point.metric}:</span> {point.note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer action items */}
              <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500">AI Confidence:</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{alert.aiConfidence}%</span>
                </div>
                <button
                  onClick={() => onInvestigateAlert(alert.id)}
                  className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-xs font-display hover:text-white hover:border-cyan-500/40 text-slate-400 font-bold rounded-lg transition duration-200 flex items-center gap-1"
                >
                  Investigate
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="md:col-span-2 py-12 text-center bg-slate-950/40 border border-slate-800 rounded-xl">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto opacity-60 mb-2" />
            <h5 className="font-display font-semibold text-white">No Flagged Alerts</h5>
            <p className="text-slate-500 text-xs mt-1">All monitored employee sessions match baseline Behaviour DNA templates.</p>
          </div>
        )}
      </div>

    </div>
  );
}
