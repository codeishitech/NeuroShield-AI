import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Sparkles, 
  Printer, 
  Terminal, 
  Send, 
  AlertOctagon, 
  BrainCircuit, 
  Activity, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  Copy,
  ChevronDown
} from "lucide-react";
import { SecurityAlert, BehaviourBaseline } from "../types";

interface IncidentReportTabProps {
  alerts: SecurityAlert[];
  baseline: BehaviourBaseline;
  activeAlertId: string;
}

interface AIChatMessage {
  role: "user" | "analyst";
  content: string;
}

export default function IncidentReportTab({ alerts, baseline, activeAlertId }: IncidentReportTabProps) {
  const [selectedAlertId, setSelectedAlertId] = useState<string>(activeAlertId || alerts[0]?.id || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any | null>(null);

  // Chat interface state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<AIChatMessage[]>([
    { role: "analyst", content: "System diagnostics logged. I am the NeuroShield AI SOC Threat Analyst node. Query me regarding Rahul Sharma's active Behaviour DNA anomaly or ask for system containment playbooks." }
  ]);
  const [isChatSending, setIsChatSending] = useState(false);

  const currentAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  // Auto-generate initial report when tab mounts or alert selection changes
  useEffect(() => {
    if (currentAlert) {
      handleGenerateAIReport();
    }
  }, [selectedAlertId]);

  const handleGenerateAIReport = async () => {
    if (!currentAlert) return;
    setIsGenerating(true);
    setReportData(null);

    try {
      const res = await fetch("/api/analyze-threat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alert: currentAlert,
          employeeData: baseline
        })
      });
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatSending) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
    setIsChatSending(true);

    try {
      const res = await fetch("/api/query-analyst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMsg,
          history: chatHistory
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: "analyst", content: data.reply || "Diagnostic error: Core node timed out." }]);
    } catch (err) {
      console.error("Error routing chat:", err);
      setChatHistory(prev => [...prev, { role: "analyst", content: "Error: Could not establish secure socket tunnel with the neural backend." }]);
    } finally {
      setIsChatSending(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Selector Row */}
      <div className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Target Incident Target Selection</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300 font-semibold font-display">Select Active Case:</span>
            <div className="relative">
              <select
                value={selectedAlertId}
                onChange={(e) => setSelectedAlertId(e.target.value)}
                className="appearance-none bg-slate-900 border border-slate-800 rounded-lg pl-3 pr-8 py-1.5 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                {alerts.map((a) => (
                  <option key={a.id} value={a.id}>{a.id} – {a.employeeName} ({a.category})</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleGenerateAIReport}
            disabled={isGenerating}
            className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            Regenerate
          </button>
          <button
            onClick={handlePrint}
            disabled={!reportData}
            className="flex-1 sm:flex-none px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-display rounded-lg transition flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Printer className="w-3.5 h-3.5" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* Main Split: Left: Formal Dossier (Printable) | Right: Interactive AI Analyst Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Formal Dossier (Printable) (col-span-7) */}
        <div className="lg:col-span-7 glass-panel rounded-xl overflow-hidden shadow-2xl print:border-none print:shadow-none" id="dossier-print-container">
          {/* Dossier Header */}
          <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 flex justify-between items-center text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300 uppercase tracking-widest font-bold">
              <FileText className="w-4 h-4 text-cyan-400" />
              Incident Audit Dossier
            </span>
            <span className="text-red-400 font-bold">CLASSIFIED – INTERNAL BANK USE ONLY</span>
          </div>

          {/* Dossier Content Sheet */}
          <div className="p-6 space-y-6 bg-slate-950 text-slate-300 print:text-black print:bg-white">
            
            {/* Header Stamp */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-900 pb-4 gap-4 print:border-slate-300">
              <div className="space-y-1">
                <h1 className="text-xl font-display font-extrabold text-white tracking-tight print:text-black">
                  NEUROSHIELD AI SECURITY RECONNAISSANCE
                </h1>
                <p className="text-slate-500 text-xs font-mono">INCIDENT CONTROL ID: {currentAlert.id}</p>
                <p className="text-slate-500 text-[10px] font-mono">GENERATED AT: {new Date().toLocaleString()}</p>
              </div>
              <div className="p-2.5 bg-red-950/20 border border-red-500/30 rounded-lg text-center shrink-0 print:border-red-500">
                <div className="text-[9px] font-mono text-red-400 tracking-wider font-bold">THREAT INDEX</div>
                <div className="text-2xl font-display font-bold text-red-400">{currentAlert.riskScore}%</div>
                <div className="text-[8px] font-mono text-slate-500">CRITICAL LEVEL</div>
              </div>
            </div>

            {/* Core Summary section */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider print:text-slate-700">
                1. Executive Case Summary
              </h3>
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg text-xs leading-relaxed text-slate-300 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                <strong>Incident Trigger:</strong> {currentAlert.title}. Flagged by NeuroShield heuristics at <strong>{currentAlert.timestamp}</strong>. Active session actor matches credentials belonging to employee <strong>{currentAlert.employeeName}</strong> (Role: {currentAlert.role}, Department: {currentAlert.department}). Session was initiated from an anomalous terminal routed through <strong>{currentAlert.location}</strong>.
              </div>
            </div>

            {/* AI Explanation Result Box */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider print:text-slate-700 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-cyan-400 print:hidden" />
                2. AI Neural Assessment Explanation
              </h3>
              {isGenerating ? (
                <div className="p-8 bg-slate-900/20 border border-slate-800/50 rounded-lg flex flex-col items-center justify-center text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                  <div className="text-xs font-mono text-cyan-400 animate-pulse uppercase tracking-wider">
                    Querying NeuroShield AI Core Node...
                  </div>
                  <div className="text-[10px] text-slate-500 max-w-sm">
                    Re-evaluating keystroke velocities, comparing geolocational network hops, and building the forensic report payload.
                  </div>
                </div>
              ) : reportData ? (
                <div className="p-4 bg-slate-900/30 border border-cyan-950/40 rounded-lg text-xs leading-relaxed text-slate-300 border-l-2 border-l-cyan-500 print:bg-white print:border-slate-300 print:text-black">
                  <p className="whitespace-pre-line">{reportData.explanation}</p>
                  
                  {reportData.evidenceSummary && (
                    <div className="mt-4 pt-4 border-t border-slate-900 print:border-slate-200">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase print:text-slate-700">Forensics Summary Evidence:</div>
                      <p className="whitespace-pre-line mt-1 text-slate-400 print:text-slate-800">{reportData.evidenceSummary}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-slate-900/20 border border-slate-800/80 rounded-lg text-xs text-slate-500 text-center py-6">
                  Click 'Regenerate' to refresh AI Neural Assessment.
                </div>
              )}
            </div>

            {/* Suggested Response / Playbook Actions */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider print:text-slate-700">
                3. Suggested SOC Containment Response Playbook
              </h3>
              {reportData?.recommendedAction ? (
                <div className="p-4 bg-red-950/10 border border-red-500/20 rounded-lg text-xs leading-relaxed text-red-300 print:bg-red-50 print:text-red-900 print:border-red-200">
                  <div className="whitespace-pre-line">{reportData.recommendedAction}</div>
                </div>
              ) : (
                <div className="p-4 bg-red-950/5 border border-red-950/20 rounded-lg text-xs leading-relaxed text-red-400">
                  1. Immediately terminate active web and API tokens associated with employee credentials.<br />
                  2. Push whitelisted multi-factor challenge prompt to primary registered mobile device.<br />
                  3. Invalidate active session tunnel in Moscow routing registry.<br />
                  4. Escalate file access flags to legal division audit locks.
                </div>
              )}
            </div>

            {/* Evidence Signoff footer */}
            <div className="pt-6 border-t border-slate-900 flex justify-between text-[10px] font-mono text-slate-500 print:border-slate-300 print:text-slate-700">
              <div>REPORT ENGINE: NEUROSHIELD CORE v4</div>
              <div>ASSESSMENT VALIDITY: {reportData?.aiConfidence || currentAlert.aiConfidence}% CONCURRENT MATCH</div>
            </div>

          </div>
        </div>

        {/* Right Side: Interactive AI Analyst Chat Terminal (col-span-5) */}
        <div className="lg:col-span-5 glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col h-[580px] print:hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center text-xs font-mono">
            <span className="flex items-center gap-2 text-white">
              <Terminal className="w-4 h-4 text-cyan-400" />
              SOC Interactive AI Analyst Terminal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Chat Messages Scrolling Stage */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/90 text-xs font-mono">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg max-w-[90%] leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 ml-auto" 
                    : "bg-slate-900/80 border border-slate-800 text-slate-300"
                }`}
              >
                <div className="text-[9px] text-slate-500 font-bold uppercase mb-1">
                  {msg.role === "user" ? "SOC SECURITY OPERATOR" : "NEUROSHIELD AI THREAT AGENT"}
                </div>
                <div className="whitespace-pre-line">{msg.content}</div>
              </div>
            ))}

            {isChatSending && (
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-400 flex items-center gap-2 max-w-[80%]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span className="animate-pulse">AI is computing Behaviour DNA correlations...</span>
              </div>
            )}
          </div>

          {/* Quick suggestions query chips */}
          <div className="p-3 border-t border-slate-900 bg-slate-950/40 flex flex-wrap gap-1.5">
            <button
              onClick={() => setChatInput("Explain Rahul Sharma's typing speed deviation inside SWIFT gateway.")}
              className="text-[9px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-400 rounded-md transition"
            >
              Analyze typing deviation
            </button>
            <button
              onClick={() => setChatInput("Generate immediate container lock down commands for EMP-88241.")}
              className="text-[9px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-400 rounded-md transition"
            >
              Quarantine commands
            </button>
            <button
              onClick={() => setChatInput("What are the risk indexes of Core Banking vs Wealth Management departments?")}
              className="text-[9px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-400 rounded-md transition"
            >
              Department Risk comparison
            </button>
          </div>

          {/* Input field */}
          <form onSubmit={handleSendChat} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Query the AI analyst (e.g. 'Audit EMP-88241')..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isChatSending}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/40"
            />
            <button
              type="submit"
              disabled={isChatSending || !chatInput.trim()}
              className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
