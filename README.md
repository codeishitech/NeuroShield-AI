# NeuroShield AI 🛡️🧬

NeuroShield AI is an enterprise-grade **Behaviour DNA cybersecurity command center and Security Operations Center (SOC) dashboard** specifically engineered for high-security banking environments to detect and mitigate insider threats.

The platform provides security analysts with real-time, high-fidelity monitoring of employee activity by establishing and tracking a cognitive and biometric "Behavior DNA" fingerprint. This makes it possible to detect session hijacking, credential theft, automated scripting, and rogue insider actions that traditional, static rule-based firewalls and SIEMs miss.

---

## 🌌 Core Philosophy & Concept: Behaviour DNA

Conventional security tools focus on access boundaries and network rules. Once inside, an actor with legitimate credentials is often trusted implicitly. **NeuroShield AI** continuously validates identity using **behavioural biometrics and cognitive profiling**:

1. **Typing Cadence Dynamics**: Standardizes keystroke dynamics, measuring dwell-time (the duration a key is held down) and flight-time (the interval between keys) to distinguish human-level input from automated macro tools or terminal-injection scripts.
2. **Mouse Vector Patterns**: Analyzes curvature, speed profile, and linear correlation of pointer movements. Human patterns are fluid and sinuous, while automated bots move in jagged, zero-jitter linear paths.
3. **Temporal Alignment**: Identifies departures from standard operational maintenance windows (e.g., executing schema updates or massive ledger transfers at 2:14 AM).
4. **Geographic Velocity Verification**: Detects impossible physical travel (e.g., a login from Moscow VPN 40 minutes after an active session in Mumbai).
5. **App & Command Affinity**: Monitors abnormal access shifts—such as a database analyst reading root container directories or SWIFT gateway ledger schemas outside their team's standard scope.

---

## 🕹️ Dashboard Experience & Key Modules

NeuroShield AI is organized as a single-page, multi-tabbed Command Rail system that mirrors active SOC environments:

### 📊 1. Tactical Security Overview
- **Core Security Metrics**: High-contrast, glowing widgets detailing total monitored accounts, active sessions, identified high-risk staff, today's critical alerts, and real-time AI detection confidence.
- **Threat Activity Timeline**: A visual chart showcasing anomalies and exfiltration triggers over a 24-hour cycle.
- **Interactive Security Map**: Visualizes the origin of network requests, exposing high-risk connection nodes (e.g., VPNs, off-shore hosting proxies) with radar sweep animations.
- **Live Activity Feed**: A rolling list of atomic actions taken across the network, categorized by severity (Critical, High, Medium, Low) and operation type.

### 🧬 2. Behaviour DNA Profiling
- **DNA Baseline Checklist**: A tabular overview of an individual's verified characteristics (normal login hours, typing velocity, device assets, frequent apps).
- **Radar Mapping Diagram**: A Recharts-powered radar visualization comparing the employee's standard baseline biometric template against active session metrics to show exact deviation vectors.
- **Dynamic Evolution Chart**: Monitors the employee's erosion of trust over weeks, tracking behavioral divergence as a leading indicator of insider intent.

### 🕸️ 3. Interactive Risk Topology
- **Interactive Canvas Network Graph**: Custom canvas-rendered interactive mapping showing employees, authenticated client devices, database instances, and gateway routers.
- **Visual Alert Nodes**: Threat levels are colour-coded in real-time, with critical pathways pulsing to highlight potential horizontal movement and data exfiltration channels.
- **Topology Controls**: Allows analysts to toggle node gravity, highlight specific threats, and inspect relational links.

### 🚨 4. Threat Alerts Center
- **Granular Filter Rails**: Switch between active, investigating, quarantined, and resolved alerts seamlessly.
- **Critical & Warning Panels**: High-impact alerts detailing exfiltration, privilege escalation, credential misuse, and suspicious API routes with comprehensive risk scores.
- **AI Recommendation Guides**: Prescribes instant containment procedures (e.g., token invalidation, local container isolation, step-up MFA).

### 📂 5. Forensic Incident Dossier & Analyst Terminal
- **Formal Exportable Dossier**: Generates complete, print-friendly investigative folders (PDF/Print) listing evidentiary timelines, biometric scores, and cryptographic hash verification logs.
- **AI Analyst Copilot**: A secure terminal allowing analysts to converse with an AI companion to query indicators of compromise, run behavioural diagnostics, and execute containment operations.

### ⚙️ 6. SOC Administration & Model Fine-Tuning
- **Hyperparameter Sliders**: Adjust model parameters dynamically (Sensitivity thresholds, Biometric weightings, Geographic velocity filters).
- **Security Integration Controls**: Provision API routes for external SWIFT Gateways, active directory syncs, and SIEM connectors.
- **Live Audit Console**: Transparent, read-only terminal stream tracking administrative adjustments, rule compiles, and model retraining cycles.

---

## 🎨 Visual Identity & UI Style Guide

NeuroShield AI adopts a highly polished, aesthetic **Cyberpunk-Military Command** design system:

- **Theme**: Premium dark glassmorphism (`glass-panel`) paired with a high-contrast off-white and deep charcoal palette.
- **Negative Space**: Generous margins, clean borders, and distinct content hierarchies that eliminate visual clutter.
- **Typography**: Space Grotesk/Outfit displays for technical, cyber-accented headings combined with JetBrains Mono for monospaced telemetry data.
- **Atmospheric Glows**: Subtle, ambient cyan, emerald, and crimson background gradients that represent the active, breathing threat gateway environment without inducing fatigue.

---

## 🛠️ Architecture & Tech Stack

NeuroShield AI is constructed using a robust full-stack architecture running behind a reverse proxy:

- **Frontend**: Single-Page Application (SPA) utilizing **React 19**, **Vite**, and **TypeScript**.
- **Styling**: **Tailwind CSS v4** for responsive, utility-first layout styling.
- **Interactive Graphs & Charts**: Custom canvas rendering and **Recharts** (Line, Area, Radar, Bar, Pie charts).
- **Backend**: **Express.js** API proxy server.
- **Build System**: Unified Vite pipeline with **esbuild** compiling the backend TypeScript entry-point to self-contained CommonJS (`dist/server.cjs`) to guarantee reliable and fast container execution.

### Installation & Local Development

1. Ensure [Node.js](https://nodejs.org) is installed.
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   This spins up the Express server on port `3000` (which automatically integrates the Vite middleware proxy in development mode).
4. Access the dashboard in your browser at `http://localhost:3000`.

### Building for Production

Compile and bundle the production client assets and server code:
```bash
npm run build
```
The output is written to `/dist`, and the standalone Express server is compiled into `/dist/server.cjs` for immediate deployment.

To start the production server:
```bash
npm run start
```
