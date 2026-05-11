# JsLab

Interactive JavaScript learning platform with live browser-based code execution.

JsLab allows users to learn JavaScript by reading theory and immediately experimenting with real code in a live sandboxed environment. The platform is designed to teach both core JavaScript concepts and browser APIs through direct interaction.

---

# Features

- Interactive JavaScript lessons
- Live code execution in the browser
- DOM manipulation support
- Real-time preview panel
- Console output capture
- Runtime error visualization
- Monaco editor integration
- Sandboxed execution using iframe
- No backend required for code execution

---

# Project Goals

JsLab is focused on making JavaScript learning practical and exploratory rather than passive.

Users should be able to:

- Read theory
- Modify code examples
- Observe behavior instantly
- Experiment safely
- Understand browser internals visually

---

## Tech Stack

| Layer            | Technology      |
| ---------------- | --------------- |
| Framework        | Next.js         |
| Language         | TypeScript      |
| Styling          | TailwindCSS     |
| State Management | Zustand         |
| Editor           | Monaco Editor   |
| Execution Engine | iframe sandbox  |
| Content Format   | Markdown (MDX) + JSON |


## Core Architecture
```txt
User Code
    ↓
Monaco Editor
    ↓
iframe Sandbox
    ↓
Browser Execution
    ↓
Console/Error Capture
    ↓
Output Panel
```

### References
- [MDX](https://mdxjs.com)
- [Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Javscript Tutorial](https://javascript.info)

### Example Folder for lessons
```txt
content/
 └── lessons/
      ├── variables.mdx
      ├── functions.mdx
      ├── dom-events.mdx
      └── promises.mdx
```
### Dynamic Routing
```js
app/lesson/[slug]/page.tsx
```
then
```js
const lesson = await getLesson(slug);
```
Render dynamically.

### How To Load Lessons

Use:
```js
import fs from "fs";
import path from "path";
```
Read MDX files from filesystem.
Example:
```js
const filePath = path.join(
  process.cwd(),
  "content",
  "lessons",
  `${slug}.mdx`
);

const source = fs.readFileSync(filePath, "utf-8");
```
How To Render Code Blocks Interactively
This is where MDX becomes powerful.
You override markdown rendering:
```js
const components = {
  pre: CustomCodeBlock
};
```
Now every code block can become:
```txt
runnable
editable
executable
```