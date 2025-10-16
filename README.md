# 🚀 Cypress Parallel Browsers

## The Challenge
Run two Cypress browser instances **simultaneously** to test real-time collaboration - not sequentially, but two actual browsers at the exact same time.

## What This Does
A real-time text editor with WebSocket sync, tested by two Cypress browsers running in parallel. When Alice types, Bob sees it instantly, proving real concurrent testing works.

## The Solution
Two separate Cypress processes spawned programmatically:
- **Cypress #1**: Alice (Electron browser)
- **Cypress #2**: Bob (Chrome browser)
- Both run at the exact same time, not sequentially

## Quick Start

### Install
```bash
npm install
```

### Run

**Start the server:**
```bash
npm start
```

**Run parallel tests (requires server running):**
```bash
npm test
```

**Run everything (server + tests):**
```bash
npm run demo
```

## Test Credentials
- **User 1:** username: `user1`, password: `SecurePass123!@#`
- **User 2:** username: `user2`, password: `StrongPass456$%^`

## How It Works
1. Server starts with Socket.io for real-time communication
2. Script spawns two Cypress processes simultaneously
3. Alice logs in and types a message
4. Bob logs in at the same time and sees Alice's message
5. Bob responds, Alice sees it in real-time
6. Both tests verify synchronization worked

## Architecture
```
┌─────────────────┐     ┌─────────────────┐
│  Cypress #1     │     │  Cypress #2     │
│  (Alice)        │     │  (Bob)          │
│  Electron       │     │  Chrome         │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────┬───────────────┘
                 │
         ┌───────▼────────┐
         │  Node.js       │
         │  Server        │
         │  (Socket.io)   │
         └────────────────┘
```

## Video Output
Tests automatically record videos saved in `cypress/videos/`:
- `dual-browsers-HD.mp4` - Both browsers side-by-side (if merged)

## Key Achievement
**True parallel Cypress testing** - not session switching, not different test runs, but two actual Cypress instances running simultaneously, proving real-time features work under concurrent load.

## Tech Stack
- TypeScript
- Express + Socket.io
- Cypress
- Node.js process spawning

## License
MIT
