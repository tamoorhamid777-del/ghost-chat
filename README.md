# 👻 Ghost — Private Bluetooth Chat

> **No accounts. No servers. No trace.**

Ghost is a privacy-first, offline Bluetooth chat app prototype delivered as a single self-contained HTML file. Open it in any browser — no installation, no build step, no backend.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00ffff?style=flat-square&logo=github)](https://tamoorhamid777-del.github.io/ghost-chat/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-v1.0.0-green?style=flat-square)](https://github.com/tamoorhamid777-del/ghost-chat/releases/tag/v1.0.0)

---

## 🔒 Privacy Philosophy

Ghost is built on a simple principle: **the best data protection is no data at all.**

- **Zero identity** — No accounts, no phone numbers, no usernames. Each session generates an anonymous ephemeral ID.
- **Zero servers** — Peer-to-peer Bluetooth only. No cloud, no relay servers, no internet required.
- **Zero history** — Messages exist only in RAM. When the session ends, everything is gone.
- **Self-destructing messages** — Every message has a burn timer (10s / 1min / 1hr / On Read). When the timer hits zero, the message burns with a visual animation and is permanently deleted from memory.

---

## 🚀 How to Use

### Option 1: Live Demo (GitHub Pages)
Open directly in your browser — no installation needed:

**[https://tamoorhamid777-del.github.io/ghost-chat/](https://tamoorhamid777-del.github.io/ghost-chat/)**

### Option 2: Clone & Open Locally
```bash
git clone https://github.com/tamoorhamid777-del/ghost-chat.git
cd ghost-chat
open index.html   # macOS
# or
xdg-open index.html   # Linux
# or just double-click index.html in your file manager
```

That's it. No `npm install`. No build step. No dependencies to manage.

---

## 📱 Screens

### 1. Splash / Onboarding
```
┌─────────────────────────────┐
│                             │
│         👻 GHOST            │
│      ─────────────          │
│  No accounts. No servers.   │
│         No trace.           │
│                             │
│  👁 Zero identity           │
│  🖥 No servers              │
│  🔥 Self-destructing msgs   │
│                             │
│    [ ▶ Start Ghost ]        │
└─────────────────────────────┘
```
Full-screen dark background with animated ghost logo (glitch effect + scan lines). Three privacy bullet points. "Start Ghost" CTA button.

### 2. Nearby Devices Scanner
```
┌─────────────────────────────┐
│  📡 Bluetooth Scanner       │
│  Nearby Devices             │
│                             │
│      ◉ ─ ─ ─ ─ ─           │
│    ◉   ◉ ─ ─ ─             │  ← Pulsing radar rings
│  ◉       ◉ ─ ─             │
│                             │
│  ● Scanning....             │
│                             │
│  ┌─────────────────────┐   │
│  │ 👻 Ghost-7F3A  ▂▄▆  │   │
│  │ Phone · -67 dBm     │   │
│  │              Tap →  │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 👻 Ghost-2B9C  ▂▄   │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```
Animated radar with concentric pulsing rings. Devices appear progressively with signal strength bars. "PROTOTYPE · Simulated Bluetooth" watermark.

### 3. Pairing / Handshake
```
┌─────────────────────────────┐
│                             │
│           🔓 → 🔒           │
│                             │
│  Establishing Encrypted     │
│       Tunnel...             │
│                             │
│  ████████████░░░░  75%      │
│                             │
│  ✓ Generating key pair      │
│  ✓ Exchanging public keys   │
│  ✓ Deriving shared secret   │
│  ○ Establishing tunnel      │
│                             │
│  🔒 E2E Encrypted · Session │
│     Only · No Logs          │
└─────────────────────────────┘
```
Animated key exchange, progress bar, step-by-step encryption checklist. Lock icon animates from unlocked → locked. Auto-advances to chat after 2.8s.

### 4. Chat Screen
```
┌─────────────────────────────┐
│ ← 👻 Ghost-7F3A  🔒 E2E    │
│─────────────────────────────│
│                             │
│  ┌──────────────────┐       │
│  │ hey, you there?  │       │  ← Received (gray)
│  │ 🔥 58s           │       │
│  └──────────────────┘       │
│                             │
│       ┌──────────────────┐  │
│       │ yeah, I'm here!  │  │  ← Sent (cyan)
│       │ 🔥 9s ← blinking │  │
│       └──────────────────┘  │
│                             │
│  Session only — no msgs saved│
│─────────────────────────────│
│  🔥 Burn after: [10s]✓[1m][1h][Read]│
│  ┌──────────────────┐ [→]  │
│  │ Type a message...│      │
│  └──────────────────┘      │
└─────────────────────────────┘
```
Real countdown timers on every message. When timer hits 0: burn animation (red flash → fade → disappear). Mock received messages auto-appear every 4-10 seconds.

### 5. Settings
```
┌─────────────────────────────┐
│  ⚙ Configuration            │
│  Settings                   │
│                             │
│  🔥 Default Burn Timer      │
│  [10s]✓  [1 min]            │
│  [1 hr]  [On Read]          │
│                             │
│  ⚡ Wipe on Disconnect  [●] │
│                             │
│  ✓ No account required      │
│  ✓ No message storage       │
│  ✓ No network calls         │
│  ✓ Session keys             │
│                             │
│  ┌─────────────────────┐   │
│  │  ⚠ PANIC WIPE       │   │  ← Red button
│  └─────────────────────┘   │
│                             │
│  v1.0.0 · Apache 2.0        │
│  github.com/...             │
└─────────────────────────────┘
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0a` | App background |
| Surface | `#111111` | Cards, panels |
| Accent | `#00ffff` | Encryption, security, active states |
| Warning | `#ff3333` | Burn timers, panic wipe |
| Text | `#e0e0e0` | Primary text |
| Muted | `#666666` | Secondary text |
| Font | JetBrains Mono | All text (monospace) |

---

## 🔐 Security Notes

### What's Simulated (Prototype)
- **Bluetooth discovery** — Device IDs are randomly generated in JavaScript. No real Bluetooth API is used.
- **Key exchange** — The ECDH animation is visual only. No real cryptographic operations occur.
- **Peer connection** — There is no real peer-to-peer connection. The "received" messages are mock data.
- **Burn timers** — The countdown and burn animation are real JavaScript `setInterval` timers that genuinely delete messages from React state.

### What Would Be Real in a Native App
- **Web Bluetooth API** — Chrome/Edge support `navigator.bluetooth` for real BLE device discovery and GATT communication.
- **SubtleCrypto API** — Browser-native `window.crypto.subtle` provides real ECDH key exchange and AES-256-GCM encryption.
- **No persistent storage** — The prototype correctly uses zero `localStorage`, zero `sessionStorage`, zero cookies — all state is in React memory only.
- **Wipe on disconnect** — The "wipe on disconnect" toggle genuinely clears all React state when triggered.
- **Panic wipe** — The panic button genuinely clears all session state and resets the scanner.

### Threat Model (Production Design)
```
Attacker                    Ghost Defense
─────────────────────────── ──────────────────────────────
Network eavesdropping    →  No network traffic (BT only)
Server breach            →  No servers exist
Account compromise       →  No accounts exist
Device seizure           →  No persistent storage
Traffic analysis         →  Session-only ephemeral IDs
Metadata collection      →  Zero telemetry, zero analytics
```

---

## 🛠 Technical Stack

- **React 18** via unpkg CDN — SPA with hooks (useState, useEffect, useRef, useCallback)
- **Tailwind CSS** via CDN — Utility-first styling with custom config
- **JetBrains Mono** via Google Fonts — Monospace typography
- **Pure CSS animations** — Radar pulse, glitch, burn fade, scan lines, key exchange
- **Zero build step** — Open `index.html` directly in any modern browser
- **Zero dependencies** — No npm, no node_modules, no bundler

---

## 📁 Repository Structure

```
ghost-chat/
├── index.html        ← The entire app (single file)
├── README.md         ← This file
├── LICENSE           ← Apache 2.0
└── CONTRIBUTING.md   ← How to contribute
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Quick start:
1. Fork the repo
2. Edit `index.html`
3. Open in browser to test
4. Submit a PR

---

## 📄 License

Apache 2.0 — see [LICENSE](LICENSE).

---

## 🌐 Live Demo

**[https://tamoorhamid777-del.github.io/ghost-chat/](https://tamoorhamid777-del.github.io/ghost-chat/)**

---

*Ghost — When you walk away, the chat is gone.* 👻
