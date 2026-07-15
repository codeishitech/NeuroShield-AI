import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import OverviewTab from "./components/OverviewTab";
import EmployeeProfileTab from "./components/EmployeeProfileTab";
import RiskTopologyTab from "./components/RiskTopologyTab";
import AlertsTab from "./components/AlertsTab";
import IncidentReportTab from "./components/IncidentReportTab";
import AdminTab from "./components/AdminTab";

import { defaultAlerts, liveEvents, weeklyEvolution, rahulBaseline } from "./data";
import { SecurityAlert, LiveEvent } from "./types";
import { ShieldAlert, LogOut, Terminal, Clock, Settings, User } from "lucide-react";

export default function App() {
  const [inDashboard, setInDashboard] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [alerts, setAlerts] = useState<SecurityAlert[]>(defaultAlerts);
  const [events, setEvents] = useState<LiveEvent[]>(liveEvents);
  
  // Investigation focus trigger
  const [focusedAlertId, setFocusedAlertId] = useState<string>("AL-77401");
  const [systemRiskScore, setSystemRiskScore] = useState<number>(84);

  const handleEnterDashboard = () => {
    setInDashboard(true);
  };

  const handleExitDashboard = () => {
    setInDashboard(false);
  };

  const handleInvestigateAlert = (alertId: string) => {
    setFocusedAlertId(alertId);
    
    // Auto-update risk context based on focused alert
    const targetAlert = alerts.find(a => a.id === alertId);
    if (targetAlert) {
      setSystemRiskScore(targetAlert.riskScore);
    }
    
    // Router redirect directly to reporting panel
    setActiveTab("incident-reporting");
  };

  // Render sub-components based on active tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <OverviewTab 
            alerts={alerts} 
            events={events} 
            onInvestigateAlert={handleInvestigateAlert} 
          />
        );
      case "employee-dna":
        return (
          <EmployeeProfileTab 
            baseline={rahulBaseline} 
            evolution={weeklyEvolution} 
          />
        );
      case "risk-topology":
        return (
          <RiskTopologyTab 
            currentRiskScore={systemRiskScore} 
          />
        );
      case "alerts":
        return (
          <AlertsTab 
            alerts={alerts} 
            onInvestigateAlert={handleInvestigateAlert} 
          />
        );
      case "incident-reporting":
        return (
          <IncidentReportTab 
            alerts={alerts} 
            baseline={rahulBaseline} 
            activeAlertId={focusedAlertId} 
          />
        );
      case "admin-settings":
        return <AdminTab />;
      default:
        return (
          <OverviewTab 
            alerts={alerts} 
            events={events} 
            onInvestigateAlert={handleInvestigateAlert} 
          />
        );
    }
  };

  // 1. If not yet in the Security portal, show the beautiful Landing page
  if (!inDashboard) {
    return (
      <LandingPage 
        onEnterDashboard={handleEnterDashboard} 
        recentEvents={events} 
      />
    );
  }

  // 2. Main SOC Dashboard view with Sidebar and main content layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans select-none cyber-grid relative overflow-hidden">
      
      {/* Abstract background sci-fi glows */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Sidebar Command Rail */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemRiskScore={systemRiskScore} 
      />

      {/* Primary Dashboard Panel */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen relative overflow-hidden z-10">
        
        {/* Global Security Header */}
        <header className="p-5 border-b border-slate-800/60 bg-slate-950/65 backdrop-blur-md flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              {activeTab.replace("-", " ")}
            </h2>
            <span className="text-[10px] font-mono bg-slate-900 border border-slate-800/80 text-slate-400 px-2 py-0.5 rounded uppercase">
              NODE: SOC-GATEWAY-EAST-02
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Server health summary pill */}
            <div className="hidden sm:flex items-center gap-4 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Core Synced
              </span>
              <span className="text-slate-800">|</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SIEM Splunk Active
              </span>
            </div>

            {/* Logout / Exit button */}
            <button
              onClick={handleExitDashboard}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
              title="Return to Welcome Screen"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Exit Portal</span>
            </button>
          </div>
        </header>

        {/* Tab Stage Content rendering */}
        <main className="flex-1 p-6 relative z-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>

        {/* Global telemetry bottom bar footer */}
        <footer className="p-4 border-t border-slate-900/80 bg-slate-950/40 text-center text-[10px] font-mono text-slate-600 flex justify-between items-center relative z-10 px-6">
          <span>CLASSIFICATION: HIGH SECURITY // BANK SYSTEM RESTRICTED</span>
          <span>© {new Date().getFullYear()} NEUROSHIELD AI PLATFORM</span>
        </footer>

      </div>
    </div>
  );
}
