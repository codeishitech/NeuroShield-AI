import React, { useEffect, useRef } from "react";
import { ShieldCheck, ArrowRight, Zap, RefreshCw, AlertTriangle } from "lucide-react";
import { LiveEvent } from "../types";

interface LandingPageProps {
  onEnterDashboard: () => void;
  recentEvents: LiveEvent[];
}

export default function LandingPage({ onEnterDashboard, recentEvents }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 450;
    };
    window.addEventListener("resize", handleResize);

    // Nodes for illustration
    const nodes: { x: number; y: number; label: string; type: string; pulse: number; speed: number }[] = [
      { x: width * 0.15, y: height * 0.2, label: "Core SWIFT DB", type: "database", pulse: 0, speed: 0.05 },
      { x: width * 0.15, y: height * 0.8, label: "Customer Accounts Core", type: "database", pulse: 1, speed: 0.03 },
      { x: width * 0.5, y: height * 0.5, label: "AI Behaviour DNA Core", type: "ai", pulse: 2, speed: 0.07 },
      { x: width * 0.85, y: height * 0.25, label: "Mumbai Remote Host", type: "terminal", pulse: 0.5, speed: 0.04 },
      { x: width * 0.85, y: height * 0.75, label: "External VPN Proxy", type: "terminal", pulse: 1.5, speed: 0.06 },
    ];

    // Data packets flying along lines
    const packets: { from: number; to: number; progress: number; speed: number; color: string }[] = [];

    // Main render loop
    let ticks = 0;
    const render = () => {
      ticks++;
      ctx.clearRect(0, 0, width, height);

      // Draw background sci-fi grid
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connecting path lines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.6)";
      ctx.lineWidth = 1.5;
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i !== j && (i === 2 || j === 2)) {
            // Draw lines from all outer nodes to AI core
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        });
      });

      // Spawn random packets
      if (Math.random() < 0.06 && packets.length < 15) {
        const from = Math.floor(Math.random() * nodes.length);
        const to = 2; // always route to or from AI core
        const color = from === 4 ? "rgba(239, 68, 68, 0.8)" : "rgba(6, 182, 212, 0.8)";
        packets.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.012, color });
      }

      // Draw and update packets
      packets.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(idx, 1);
          return;
        }
        const nFrom = nodes[p.from];
        const nTo = nodes[p.to];
        const x = nFrom.x + (nTo.x - nFrom.x) * p.progress;
        const y = nFrom.y + (nTo.y - nFrom.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Packet tail trail
        ctx.fillStyle = p.color.replace("0.8", "0.2");
        ctx.beginPath();
        const prevProgress = Math.max(0, p.progress - 0.08);
        const prevX = nFrom.x + (nTo.x - nFrom.x) * prevProgress;
        const prevY = nFrom.y + (nTo.y - nFrom.y) * prevProgress;
        ctx.moveTo(x, y);
        ctx.lineTo(prevX, prevY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = p.color.replace("0.8", "0.3");
        ctx.stroke();
      });

      // Draw human silhouette overlay representation at center AI Core
      const silhouetteX = width * 0.5;
      const silhouetteY = height * 0.5;

      // Draw biometric radar circle around AI Core
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(silhouetteX, silhouetteY, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(silhouetteX, silhouetteY, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Scanline crossing
      const scanY = (ticks % 200) / 200 * 220 + (silhouetteY - 110);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(silhouetteX - 110, scanY);
      ctx.lineTo(silhouetteX + 110, scanY);
      ctx.stroke();

      // Draw Nodes
      nodes.forEach((n) => {
        n.pulse += n.speed;
        const radius = n.type === "ai" ? 18 : 10;
        const glow = Math.sin(n.pulse) * 4 + 4;

        // Draw outer glowing halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + glow, 0, Math.PI * 2);
        ctx.fillStyle = n.type === "ai" 
          ? "rgba(6, 182, 212, 0.12)" 
          : n.type === "database" 
          ? "rgba(59, 130, 246, 0.1)" 
          : "rgba(239, 68, 68, 0.12)";
        ctx.fill();

        // Draw node center
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = n.type === "ai" 
          ? "#0891b2" 
          : n.type === "database" 
          ? "#2563eb" 
          : "#dc2626";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = "#94a3b8";
        ctx.font = "10px var(--font-mono)";
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y - radius - 10);
      });

      // Human Biometric silhouette schematic (stylized SVG-like lines drawn via arc/paths)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      // Head
      ctx.arc(silhouetteX, silhouetteY - 25, 12, 0, Math.PI * 2);
      // Neck
      ctx.moveTo(silhouetteX, silhouetteY - 13);
      ctx.lineTo(silhouetteX, silhouetteY + 10);
      // Left Shoulder/Arm
      ctx.moveTo(silhouetteX, silhouetteY - 5);
      ctx.lineTo(silhouetteX - 25, silhouetteY + 5);
      ctx.lineTo(silhouetteX - 35, silhouetteY + 30);
      // Right Shoulder/Arm
      ctx.moveTo(silhouetteX, silhouetteY - 5);
      ctx.lineTo(silhouetteX + 25, silhouetteY + 5);
      ctx.lineTo(silhouetteX + 35, silhouetteY + 30);
      // Body
      ctx.moveTo(silhouetteX, silhouetteY + 10);
      ctx.lineTo(silhouetteX - 15, silhouetteY + 45);
      ctx.moveTo(silhouetteX, silhouetteY + 10);
      ctx.lineTo(silhouetteX + 15, silhouetteY + 45);
      ctx.stroke();

      // Overlay text inside Core node
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px var(--font-mono)";
      ctx.fillText("NEURO CORE", silhouetteX, silhouetteY + 60);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden cyber-grid">
      
      {/* Decorative high-tech top-bar elements */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-slate-900/80 bg-slate-950/65 backdrop-blur-sm z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span className="font-display font-bold text-sm text-white uppercase tracking-wider">NEUROSHIELD CORE NETWORK</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SIEM SYNC ACTIVE
          </span>
          <span>SECURE PROTOCOL v44.1</span>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-12 pt-28 pb-16 relative z-10">
        
        {/* Left Hand: App Context & Value Proposition */}
        <div className="flex-1 text-left space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-full">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-cyan-400">
              Enterprise Banking Edition
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            AI Behaviour DNA <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              for Banking Security
            </span>
          </h2>

          <p className="text-slate-400 text-base leading-relaxed">
            Detect sophisticated insider threats, credential leaks, and data exfiltration before bank data is compromised. NeuroShield AI maps employee behavior signatures into multi-dimensional <strong>Behaviour DNA templates</strong>, continuously validating active session integrity in real-time.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onEnterDashboard}
              className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-display rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0 group"
              id="btn-open-soc"
            >
              Open Security Dashboard
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <a
              href="#live-monitor"
              className="px-6 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-white font-medium font-display rounded-lg transition-all text-center"
            >
              Learn Core Concept
            </a>
          </div>

          {/* Bullet metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
            <div>
              <div className="text-2xl font-bold font-display text-white">99.4%</div>
              <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">Detection Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-cyan-400">&lt;2.4s</div>
              <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">AI Analysis Lag</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-emerald-400">0ms</div>
              <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">MFA Latency</div>
            </div>
          </div>
        </div>

        {/* Right Hand: High-Fidelity Canvas Illustration */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="w-full bg-slate-950/85 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative glow-cyan">
            {/* Window header */}
            <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                ACTIVE SECURITY OBSERVATION STAGE
              </span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
              </div>
            </div>

            {/* Canvas itself */}
            <div className="bg-slate-950 relative">
              <canvas ref={canvasRef} className="w-full block" />
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-800/80 text-xs font-mono text-slate-400 text-center divide-x divide-slate-800 bg-slate-950">
              <div className="p-2.5">
                <div className="text-slate-500 text-[9px] uppercase">Heuristics</div>
                <div className="text-white font-semibold">Active Engine</div>
              </div>
              <div className="p-2.5">
                <div className="text-slate-500 text-[9px] uppercase">Models Active</div>
                <div className="text-cyan-400 font-semibold">6 Biometric</div>
              </div>
              <div className="p-2.5">
                <div className="text-slate-500 text-[9px] uppercase">Anomaly Indexes</div>
                <div className="text-amber-400 font-semibold">14 Anomalies</div>
              </div>
              <div className="p-2.5">
                <div className="text-slate-500 text-[9px] uppercase">Global Threat Level</div>
                <div className="text-red-400 font-bold">HIGH RISK</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Threat Monitor Preview Strip */}
      <div id="live-monitor" className="bg-slate-950/90 border-t border-slate-900 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="font-display font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Live Threat Monitor Preview
              </h3>
              <p className="text-slate-400 text-xs mt-1">Real-time alerts processed from internal bank system logs</p>
            </div>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              STREAMING EVENT LOGS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentEvents.slice(0, 3).map((event) => (
              <div 
                key={event.id}
                className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between hover:border-slate-700 transition duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{event.category}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                      event.severity === "critical" 
                        ? "bg-red-950/40 text-red-400 border border-red-500/20" 
                        : event.severity === "high" 
                        ? "bg-amber-950/40 text-amber-400 border border-amber-500/20" 
                        : "bg-blue-950/40 text-blue-400 border border-blue-500/20"
                    }`}>
                      {event.severity}
                    </span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed font-semibold group-hover:text-white">
                    {event.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800/40">
                  <span>Audited Agent: {event.employeeName}</span>
                  <span>{event.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
