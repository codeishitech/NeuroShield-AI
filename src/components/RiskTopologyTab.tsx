import React, { useEffect, useRef, useState } from "react";
import { 
  Network, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertOctagon, 
  ShieldAlert, 
  Terminal, 
  MousePointer, 
  MapPin, 
  Check, 
  BrainCircuit, 
  TrendingUp, 
  HelpCircle,
  Clock,
  Laptop,
  Database
} from "lucide-react";
import { NetworkNode, NetworkLink } from "../types";
import { initialNodes, initialLinks } from "../data";

interface RiskTopologyTabProps {
  currentRiskScore: number;
}

export default function RiskTopologyTab({ currentRiskScore }: RiskTopologyTabProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);
  const [links, setLinks] = useState<NetworkLink[]>(initialLinks);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(initialNodes[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Animate the network nodes inside a canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 700;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    // Node coordinate bounds & physics
    let particles: { x: number; y: number; progress: number; linkIdx: number; speed: number }[] = [];

    // Animation frame ticks
    let ticks = 0;
    const render = () => {
      ticks++;
      ctx.clearRect(0, 0, width, height);

      // Draw background grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.02)";
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Slightly wander nodes over time for fluid organic movement
      if (isPlaying) {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            // Anchor node positions slightly to center baseline
            const dx = (node.x - width / 2) * 0.0001;
            const dy = (node.y - height / 2) * 0.0001;
            
            // Random brownian wander
            const wanderX = (Math.sin(ticks * 0.01 + node.y) * 0.15) - dx;
            const wanderY = (Math.cos(ticks * 0.01 + node.x) * 0.15) - dy;
            
            return {
              ...node,
              x: Math.max(20, Math.min(width - 20, node.x + wanderX)),
              y: Math.max(20, Math.min(height - 20, node.y + wanderY))
            };
          })
        );
      }

      // Draw Connection Links
      links.forEach((link, linkIdx) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (!sourceNode || !targetNode) return;

        const isSuspicious = link.status === "suspicious";
        
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);

        if (isSuspicious) {
          ctx.strokeStyle = "rgba(239, 68, 68, 0.55)";
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 4]); // animated dash line
          ctx.lineDashOffset = -ticks * 0.35;
        } else {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]); // Reset line dash

        // Draw flowing data packets (particle flows)
        if (isPlaying && Math.random() < 0.015 && particles.length < 25) {
          particles.push({
            x: sourceNode.x,
            y: sourceNode.y,
            progress: 0,
            linkIdx,
            speed: isSuspicious ? 0.015 : 0.008
          });
        }
      });

      // Update and draw flowing packets
      particles.forEach((p, idx) => {
        const link = links[p.linkIdx];
        if (!link) {
          particles.splice(idx, 1);
          return;
        }
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (!sourceNode || !targetNode) {
          particles.splice(idx, 1);
          return;
        }

        p.progress += p.speed;
        if (p.progress >= 1) {
          particles.splice(idx, 1);
          return;
        }

        const currX = sourceNode.x + (targetNode.x - sourceNode.x) * p.progress;
        const currY = sourceNode.y + (targetNode.y - sourceNode.y) * p.progress;

        ctx.fillStyle = link.status === "suspicious" ? "#f87171" : "#22d3ee";
        ctx.beginPath();
        ctx.arc(currX, currY, link.status === "suspicious" ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Glow tail representation
        ctx.fillStyle = link.status === "suspicious" ? "rgba(239, 68, 68, 0.15)" : "rgba(6, 182, 212, 0.1)";
        ctx.beginPath();
        ctx.arc(currX, currY, link.status === "suspicious" ? 9 : 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Network Nodes
      nodes.forEach((node) => {
        const isCritical = node.status === "critical";
        const isAnomaly = node.status === "anomaly";
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;

        // Pulse warning halo for threats
        if ((isCritical || node.pulse) && isPlaying) {
          const pulseRadius = 15 + Math.sin(ticks * 0.06) * 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = isCritical ? "rgba(239, 68, 68, 0.12)" : "rgba(234, 179, 8, 0.12)";
          ctx.fill();
        }

        // Selection ring
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? "#06b6d4" : "rgba(6, 182, 212, 0.5)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = isCritical 
          ? "#ef4444" 
          : isAnomaly 
          ? "#eab308" 
          : "#0891b2";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Title label below node
        ctx.fillStyle = isSelected ? "#ffffff" : "#94a3b8";
        ctx.font = isSelected ? "bold 10px var(--font-mono)" : "9px var(--font-mono)";
        ctx.textAlign = "center";
        
        // Label text
        const typeChar = node.type === "employee" ? "👤" : node.type === "database" ? "📂" : node.type === "device" ? "💻" : "🛡️";
        ctx.fillText(`${typeChar} ${node.label}`, node.x, node.y + 22);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [nodes, links, selectedNode, hoveredNode, isPlaying]);

  // Click handler to select node on canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Find if node clicked
    const clicked = nodes.find((node) => {
      const dist = Math.hypot(node.x - clickX, node.y - clickY);
      return dist <= 24; // margin tolerance
    });

    if (clicked) {
      setSelectedNode(clicked);
    }
  };

  // Mouse move handler for tooltips
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const moveY = e.clientY - rect.top;

    const hovered = nodes.find((node) => {
      const dist = Math.hypot(node.x - moveX, node.y - moveY);
      return dist <= 24;
    });

    setHoveredNode(hovered || null);
  };

  const handleResetGraph = () => {
    setNodes(initialNodes);
    setLinks(initialLinks);
    setSelectedNode(initialNodes[0]);
  };

  return (
    <div className="space-y-6">
      
      {/* Topology Dashboard splitting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Dynamic Canvas Network Graph */}
        <div className="lg:col-span-2 glass-panel rounded-xl flex flex-col shadow-2xl relative overflow-hidden">
          {/* Header toolbar */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <span className="font-display font-extrabold text-sm text-white uppercase tracking-wider">AI Anomaly Node & Attack Path Visualization</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-md text-xs font-mono">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:text-white text-slate-400 transition" 
                title={isPlaying ? "Pause physics simulation" : "Play physics simulation"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <span className="text-slate-700">|</span>
              <button 
                onClick={handleResetGraph}
                className="p-1 hover:text-white text-slate-400 transition"
                title="Reset network structure"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700">|</span>
              <span className="text-[10px] text-cyan-400 animate-pulse">8 DEPLOYED NODES</span>
            </div>
          </div>

          {/* Interactive Stage Canvas */}
          <div className="relative flex-1 bg-slate-950 min-h-[360px]">
            <canvas 
              ref={canvasRef} 
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              className="w-full h-full block cursor-crosshair"
            />

            {/* Hover tooltip indicator */}
            {hoveredNode && (
              <div 
                className="absolute bg-slate-900/95 border border-slate-800 px-3 py-2 rounded shadow-2xl text-xs font-mono text-slate-300 z-40 pointer-events-none"
                style={{ left: `${hoveredNode.x + 12}px`, top: `${hoveredNode.y - 12}px` }}
              >
                <div className="font-bold text-white uppercase text-[10px]">{hoveredNode.label}</div>
                <div className="text-[9px] mt-0.5 text-slate-500">TYPE: {hoveredNode.type.toUpperCase()}</div>
                <div className="text-[9px] mt-0.5 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    hoveredNode.status === "critical" ? "bg-red-500" : hoveredNode.status === "anomaly" ? "bg-amber-500" : "bg-cyan-500"
                  }`}></span>
                  Status: <span className="font-bold">{hoveredNode.status.toUpperCase()}</span>
                </div>
              </div>
            )}

            {/* Float helper controls */}
            <div className="absolute top-4 left-4 p-3 bg-slate-950/90 border border-slate-800 rounded-lg text-[9px] font-mono text-slate-500 space-y-1 backdrop-blur-sm z-20 pointer-events-none">
              <div className="font-semibold text-slate-300 uppercase text-[10px] mb-1">Graph Legend</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
                <span>Corporate Asset / Compliant Session</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <span>Anomalous Node (Heuristics flag)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-500 animate-pulse"></span>
                <span className="text-red-400 font-bold">Infiltration / Exfiltration Path</span>
              </div>
              <div className="text-[8px] text-slate-600 mt-1.5">Click any node to inspect telemetry.</div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Risk Comparison Panel */}
        <div className="glass-panel rounded-xl p-5 shadow-2xl flex flex-col justify-between">
          <div className="pb-3 border-b border-slate-900 mb-4">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              AI Session Behaviour DNA Analyser
            </h4>
            <p className="text-slate-500 text-xs mt-0.5">Analysing employee active session EMP-88241</p>
          </div>

          {/* Comparatives Grid */}
          <div className="flex-1 space-y-3">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              Baseline vs. Current Session Comparison
            </div>

            {/* Comparison Item 1 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono">Normal Login Hours</div>
                <div className="text-emerald-400 font-bold mt-0.5">09:00 AM - 06:30 PM</div>
              </div>
              <div className="p-2 bg-red-950/20 border border-red-950/30 rounded-lg">
                <div className="text-[10px] text-red-500/80 font-mono">Active Session Login</div>
                <div className="text-red-400 font-bold mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-pulse" />
                  02:14:10 AM (+20)
                </div>
              </div>
            </div>

            {/* Comparison Item 2 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono">Typical Geographic IP</div>
                <div className="text-emerald-400 font-bold mt-0.5">Mumbai Subnet</div>
              </div>
              <div className="p-2 bg-red-950/20 border border-red-950/30 rounded-lg">
                <div className="text-[10px] text-red-500/80 font-mono">Active Session IP</div>
                <div className="text-red-400 font-bold mt-0.5 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 animate-pulse" />
                  Moscow VPN (+20)
                </div>
              </div>
            </div>

            {/* Comparison Item 3 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono">Authorized Hardware</div>
                <div className="text-emerald-400 font-bold mt-0.5">MacBook Asset MB-99</div>
              </div>
              <div className="p-2 bg-red-950/20 border border-red-950/30 rounded-lg">
                <div className="text-[10px] text-red-500/80 font-mono">Active Terminal</div>
                <div className="text-red-400 font-bold mt-0.5 flex items-center gap-1 truncate">
                  <Laptop className="w-3 h-3 animate-pulse" />
                  Linux Console (+25)
                </div>
              </div>
            </div>

            {/* Comparison Item 4 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono">Keyboard Rhythm</div>
                <div className="text-emerald-400 font-bold mt-0.5">64 WPM (dwell: 82ms)</div>
              </div>
              <div className="p-2 bg-red-950/20 border border-red-950/30 rounded-lg">
                <div className="text-[10px] text-red-500/80 font-mono">Active Keystrokes</div>
                <div className="text-red-400 font-bold mt-0.5 flex items-center gap-1">
                  <Terminal className="w-3 h-3 animate-pulse" />
                  120 WPM (dwell: 0ms) (+15)
                </div>
              </div>
            </div>

            {/* Comparison Item 5 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 font-mono">Normal Download Size</div>
                <div className="text-emerald-400 font-bold mt-0.5">450 MB average</div>
              </div>
              <div className="p-2 bg-red-950/20 border border-red-950/30 rounded-lg">
                <div className="text-[10px] text-red-500/80 font-mono">Active Download size</div>
                <div className="text-red-400 font-bold mt-0.5 flex items-center gap-1">
                  <Database className="w-3 h-3 animate-pulse" />
                  14.2 GB backup (+20)
                </div>
              </div>
            </div>

            {/* Penalty calculation recap */}
            <div className="p-3 bg-red-950/15 border border-red-500/30 rounded-lg mt-3">
              <div className="flex justify-between text-xs text-red-400 font-bold">
                <span>AI Anomaly Similarity Matrix</span>
                <span>12% MATCH (Extreme)</span>
              </div>
              <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-1.5">
                <div className="bg-red-500 h-full w-[12%]"></div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-red-500/10">
                <span className="text-xs text-slate-300 font-semibold uppercase flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Total Risk Score
                </span>
                <span className="text-lg font-display font-extrabold text-red-400">{currentRiskScore} (Critical)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
