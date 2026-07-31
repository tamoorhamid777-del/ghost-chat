# Contributing to Ghost

Thank you for your interest in contributing to Ghost! 👻

## Philosophy

Ghost is a privacy-first project. Every contribution must uphold the core principles:
- **No data collection** — never add analytics, telemetry, or tracking
- **No external dependencies** — keep it a single self-contained HTML file
- **No persistent storage** — never use localStorage, sessionStorage, or cookies
- **No servers** — the app must work fully offline

## How to Contribute

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/ghost-chat.git
cd ghost-chat
```

### 2. Make Changes
Edit `index.html` directly. The entire app is in one file:
- React components are in the `<script type="text/babel">` block
- CSS animations and styles are in the `<style>` block
- Tailwind config is in the `tailwind.config` script block

### 3. Test Locally
```bash
open index.html   # macOS
xdg-open index.html   # Linux
```

Test all 5 screens:
- [ ] Splash → click "Start Ghost"
- [ ] Scanner → devices appear progressively, click one
- [ ] Pairing → animation plays, auto-advances
- [ ] Chat → send messages, verify burn timers count down and delete messages
- [ ] Settings → toggle wipe-on-disconnect, test panic wipe

### 4. Submit a PR
- Keep PRs focused on one change
- Describe what you changed and why
- Confirm you tested all 5 screens

## What We Welcome

- 🐛 Bug fixes
- 🎨 Design improvements (within the dark/cyan design system)
- ♿ Accessibility improvements (ARIA labels, keyboard navigation)
- 📱 Mobile responsiveness fixes
- 🔒 Security improvements to the privacy model
- 📖 Documentation improvements

## What We Don't Accept

- ❌ External API calls or server communication
- ❌ localStorage / sessionStorage / cookies
- ❌ Analytics or telemetry
- ❌ Additional CDN dependencies (keep it minimal)
- ❌ Breaking the single-file constraint

## Code Style

- Use React hooks (useState, useEffect, useCallback, useRef)
- Keep components pure and functional
- Use Tailwind utility classes for layout, custom CSS for animations
- JetBrains Mono font for all text
- Color palette: `#0a0a0a` bg, `#00ffff` accent, `#ff3333` warning

## Questions?

Open an issue on GitHub: https://github.com/tamoorhamid777-del/ghost-chat/issues

---

*Ghost — When you walk away, the chat is gone.* 👻
