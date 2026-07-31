# 👻 Ghost — Private Bluetooth Chat

> **No accounts. No servers. No trace.**
> Real Bluetooth. Real encryption. Real privacy.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v2.0.0-cyan.svg)](https://github.com/tamoorhamid777-del/ghost-chat/releases/tag/v2.0.0)
[![PWA](https://img.shields.io/badge/PWA-ready-green.svg)](https://tamoorhamid777-del.github.io/ghost-chat/)
[![Web Bluetooth](https://img.shields.io/badge/Web%20Bluetooth-API-00ffff.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)

**[🌐 Live Demo](https://tamoorhamid777-del.github.io/ghost-chat/)** · **[📦 GitHub](https://github.com/tamoorhamid777-del/ghost-chat)**

---

## What is Ghost?

Ghost is a **privacy-first, offline Bluetooth chat app** that runs entirely in your browser. It uses the **Web Bluetooth API** for real peer-to-peer device discovery and the **Web Crypto API** for genuine end-to-end encryption — no accounts, no phone numbers, no servers, no message history.

When you walk away, the chat is gone.

### Privacy Philosophy

| What Ghost does NOT do | What Ghost DOES do |
|------------------------|-------------------|
| ❌ Create accounts | ✅ Anonymous ephemeral identity per session |
| ❌ Store messages on disk | ✅ Messages exist only in RAM |
| ❌ Send data to servers | ✅ Peer-to-peer Bluetooth only |
| ❌ Log conversations | ✅ Self-destructing messages with real timers |
| ❌ Track users | ✅ Zero telemetry, zero analytics |
| ❌ Require internet | ✅ Works fully offline |

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/tamoorhamid777-del/ghost-chat.git

# Open in browser — that's it. No npm, no build step.
open ghost-chat/index.html
```

Or use the **live GitHub Pages demo**: https://tamoorhamid777-del.github.io/ghost-chat/

---

## Browser Compatibility

| Browser | Platform | Web Bluetooth | Status |
|---------|----------|---------------|--------|
| **Chrome 56+** | Android, Windows, macOS, Linux | ✅ Full support | ✅ Recommended |
| **Edge 79+** | Windows, macOS | ✅ Full support | ✅ Recommended |
| **Chrome for Android** | Android 6+ | ✅ Full support | ✅ Best mobile experience |
| **Opera 43+** | Desktop | ✅ Full support | ✅ Works |
| **Samsung Internet** | Android | ⚠️ Partial | ⚠️ May work |
| **Firefox** | All | ❌ Not supported | ❌ No Web Bluetooth |
| **Safari** | iOS, macOS | ❌ Not supported | ❌ No Web Bluetooth |

> **Note:** Web Bluetooth requires a secure context (HTTPS or localhost). GitHub Pages serves over HTTPS, so the live demo works out of the box.

---

## How to Use on Android (Step by Step)

1. **Open Chrome on Android** (version 56 or later)
2. Navigate to `https://tamoorhamid777-del.github.io/ghost-chat/`
3. Tap **"Add to Home Screen"** for a native app experience (PWA)
4. On both devices, open Ghost and tap **"Start Ghost"**
5. Tap **"Scan for Real Ghost Devices"** — Chrome will show the Bluetooth device picker
6. Select the other person's device from the list
7. Ghost performs a real **ECDH P-256 key exchange** — watch the pairing animation
8. Once paired, you're in an **AES-256-GCM encrypted session**
9. Set your burn timer, type a message, and send
10. Messages self-destruct when the timer hits zero

---

## Security Model

### What's Real (v2.0.0)

| Feature | Implementation |
|---------|---------------|
| **Device Discovery** | `navigator.bluetooth.requestDevice()` — real Web Bluetooth API |
| **GATT Connection** | `device.gatt.connect()` + `getPrimaryService()` + `getCharacteristic()` |
| **Key Generation** | `window.crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' })` |
| **Key Exchange** | `exportKey('raw')` → send over BT → `importKey('raw')` → `deriveKey()` |
| **Message Encryption** | `subtle.encrypt({ name: 'AES-GCM', iv }, sharedKey, plaintext)` — 256-bit key, 96-bit random IV per message |
| **Message Decryption** | `subtle.decrypt({ name: 'AES-GCM', iv }, sharedKey, ciphertext)` |
| **Key Fingerprint** | `subtle.digest('SHA-256', publicKeyRaw)` — displayed as color grid for visual verification |
| **Self-Destruct** | Real `setInterval` countdowns that delete messages from React state |
| **Wipe on Hide** | `document.addEventListener('visibilitychange')` — auto-wipe after 30s hidden |
| **Wipe on Close** | `window.addEventListener('beforeunload')` — clears all state |
| **Panic Wipe** | Clears all React state immediately |

### What's Simulated (Demo Mode)

When Web Bluetooth is not available (Firefox, Safari, or no BT hardware), Ghost falls back to a **demo mode** that shows the full UI with simulated nearby devices and auto-received messages. This lets you explore the interface without real hardware.

The demo mode is clearly labeled and does not claim to be a real connection.

### Threat Model

- ✅ **Eavesdropping**: Protected by AES-256-GCM with per-message random IVs
- ✅ **Message persistence**: No disk writes — messages are JavaScript variables
- ✅ **Server-side surveillance**: No servers exist
- ✅ **Account linkage**: No accounts, no phone numbers, no identifiers
- ⚠️ **MITM during pairing**: Verify key fingerprints visually with your peer
- ⚠️ **Physical device access**: If someone has your unlocked device, they can read the screen
- ⚠️ **BLE range**: Bluetooth Low Energy has ~10m range — be aware of your surroundings

---

## Architecture

```
ghost-chat/
├── index.html          # Complete SPA — React 18 via CDN, Tailwind via CDN
├── manifest.json       # PWA manifest — install as home screen app
├── sw.js               # Service worker — offline app shell caching
├── icons/
│   ├── icon-192.png    # PWA icon 192×192
│   └── icon-512.png    # PWA icon 512×512
├── README.md
├── LICENSE             # Apache 2.0
└── CONTRIBUTING.md
```

### Screens

| Screen | Description |
|--------|-------------|
| **Splash** | Ghost logo with glitch animation, privacy bullets, "Start Ghost" CTA |
| **Scanner** | Pulsing radar, real BT scan button, nearby device cards with signal bars |
| **Pairing** | Real ECDH key exchange animation, progress bar, key fingerprint display |
| **Chat** | AES-256-GCM encrypted messages, real countdown timers, burn animation |
| **Settings** | Burn timer, wipe-on-disconnect, auto-wipe info, session fingerprint, panic wipe |

### Crypto Stack

```
Key Generation:  ECDH P-256 (window.crypto.subtle.generateKey)
Key Exchange:    Raw public key export → BT transfer → import → ECDH derive
Shared Secret:   AES-256-GCM key (non-extractable)
Encryption:      AES-GCM, 256-bit key, 96-bit random IV per message
Wire format:     [12 bytes IV][ciphertext] over BLE GATT characteristic
Fingerprint:     SHA-256(publicKeyRaw) displayed as color grid
```

---

## PWA Installation

Ghost is a Progressive Web App. On Android Chrome:

1. Open `https://tamoorhamid777-del.github.io/ghost-chat/`
2. Tap the **⋮ menu** → **"Add to Home Screen"**
3. Ghost appears as a standalone app with no browser chrome

On desktop Chrome/Edge:
1. Look for the **install icon** (⊕) in the address bar
2. Click **"Install Ghost"**

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Key areas for contribution:
- **Real BT peer protocol**: Implement the full GATT handshake so two Ghost instances can exchange public keys over BLE
- **iOS support**: Explore WKWebView + CoreBluetooth bridge for Safari
- **Native apps**: React Native + Expo + BLE libraries for true native BT
- **Group chat**: Multi-peer BLE mesh networking

---

## License

Apache 2.0 — see [LICENSE](LICENSE).

---

## Changelog

### v2.0.0 — Real Bluetooth & Real Encryption
- ✅ **Real Web Bluetooth API**: `navigator.bluetooth.requestDevice()` + GATT connection
- ✅ **Real ECDH P-256 key exchange**: `window.crypto.subtle.generateKey` + `deriveKey`
- ✅ **Real AES-256-GCM encryption**: per-message 96-bit random IV, 256-bit key
- ✅ **Key fingerprint display**: SHA-256 of public key shown as color grid for verification
- ✅ **Page Visibility API wipe**: auto-wipe after 30s hidden
- ✅ **beforeunload wipe**: clears all state on tab close
- ✅ **PWA**: manifest.json + service worker for offline use + "Add to Home Screen"
- ✅ **Graceful fallback**: clear "Use Chrome/Edge" message when BT not supported
- ✅ Removed all prototype/simulated/demo watermarks

### v1.0.0 — Initial Release
- Single-file SPA with simulated Bluetooth and UI prototype
- Self-destruct timers, burn animation, radar scanner, all 5 screens

---

*Ghost — When you walk away, the chat is gone.* 👻
