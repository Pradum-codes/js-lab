
# Project Plan

This document outlines the roadmap for the editor, runtime, lesson system, and platform features for JsLab.

---

## Phase 2 — Editor Integration

### Goals
- Provide a professional coding experience.

### Tasks

- **Monaco Editor** — Integrate:
  - Syntax highlighting
  - Autocomplete
  - Themes
  - Formatting
  - TypeScript support

- **Editor Features** — Implement:
  - Reset code
  - Run code
  - Auto-save local state
  - Keyboard shortcuts

---

## Phase 3 — Sandbox Runtime

### Goals
- Execute JavaScript safely inside the browser.

### Tasks

- **Iframe Sandbox** — Build runtime engine using `sandbox="allow-scripts"` and isolated iframes.

- **Runtime Injection** — Generate runtime HTML dynamically for each run.

- **Console Capture** — Override `console.log`, `console.warn`, and `console.error` and send logs via `window.postMessage()`.

- **Error Handling** — Capture syntax errors, runtime errors, and async errors.

- **Reset Mechanism** — Recreate the iframe on every execution to avoid stale state and infinite loops.

---

## Phase 4 — Lesson System

### Goals
- Create structured educational content.

### Tasks

- **Lesson Schema** — Define lesson structure, for example:

```ts
type Lesson = {
  title: string;
  slug: string;
  theory: string; // Markdown
  starterCode: string;
};
```

- **Markdown Rendering** — Render `theory` using a Markdown parser.

- **Lesson Navigation** — Implement previous/next lesson navigation and a sidebar.

---

## Phase 5 — Output System

### Goals
- Improve debugging and learning visibility.

### Tasks

- **Console Panel** — Support logs, warnings, and errors.

- **DOM Preview** — Display rendered iframe output.

- **Tabs** — Provide Console, Preview, and Errors tabs.

---

## Phase 6 — Educational Features

### Goals
- Differentiate JsLab from generic playgrounds.

### Tasks

- **Interactive Challenges** — Support fill-in-the-blanks, debugging exercises, and coding challenges.

- **Validation System** — Create hidden tests for lessons.

- **Execution Visualization** — Visualize variable changes, function calls, and execution flow.
  - Potential tools: Babel Parser, Acorn, ESTree

---

## Phase 7 — Advanced Runtime

### Goals
- Expand beyond basic JavaScript execution.

### Tasks

- **HTML/CSS/JS Multi-Panel** — Support separate editors for HTML, CSS, and JavaScript.

- **NPM Support** — Consider future integration with Sandpack, ESBuild, WebContainers.

- **React Playground** — Allow rendering React components directly in the browser.

---

## Phase 8 — Platform Features

### Goals
- Add persistence and personalization.

### Tasks

- **Authentication** — Potential providers: GitHub, Google.

- **Progress Tracking** — Track completed lessons, solved challenges, and learning streaks.

- **Cloud Sync** — Store user progress.

---

## Phase 9 — Collaboration

### Goals
- Enable shared learning sessions.

### Tasks

- **Real-Time Collaboration** — Potential stack: WebSockets, Yjs, CRDTs.

- **Shared Sessions** — Support live editing, instructor mode, and spectator mode.

---

## Notes
- Keep each phase small and deliverable. Prioritize Phase 2 and Phase 3 for an MVP.


Allow:

live editing
instructor mode
spectator mode