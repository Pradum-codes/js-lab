"use client";

import { useEffect, useMemo, useState } from "react";
import MonacoEditorClient from "@/components/MonacoEditorClient";

function createRuntimeHtml(sourceCode) {
  const escapedCode = JSON.stringify(sourceCode);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin: 0; padding: 12px; font-family: ui-sans-serif, system-ui, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const send = (type, value) => {
        window.parent.postMessage({ source: "jslab-sandbox", type, value }, "*");
      };

      ["log", "warn", "error"].forEach((method) => {
        const original = console[method];
        console[method] = (...args) => {
          send(method, args.map((item) => {
            if (typeof item === "string") return item;
            try { return JSON.stringify(item); } catch { return String(item); }
          }).join(" "));
          original.apply(console, args);
        };
      });

      window.onerror = function (message, source, line, column) {
        send("error", String(message) + " (" + line + ":" + column + ")");
      };

      window.onunhandledrejection = function (event) {
        const reason = event && event.reason ? event.reason : "Unhandled promise rejection";
        send("error", String(reason));
      };

      try {
        new Function(${escapedCode})();
      } catch (error) {
        send("error", error && error.message ? error.message : String(error));
      }
    </script>
  </body>
</html>`;
}

export default function LessonPlayground({ starterCode = "" }) {
  const initialCode = useMemo(() => starterCode || 'console.log("Start coding...");', [starterCode]);
  const [code, setCode] = useState(initialCode);
  const [executedCode, setExecutedCode] = useState(initialCode);
  const [logs, setLogs] = useState([]);
  const [frameKey, setFrameKey] = useState(0);

  useEffect(() => {
    function handleMessage(event) {
      const payload = event.data;
      if (!payload || payload.source !== "jslab-sandbox") {
        return;
      }

      setLogs((prev) => [...prev, { type: payload.type, value: payload.value }]);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function runCode() {
    setLogs([]);
    setExecutedCode(code);
    setFrameKey((key) => key + 1);
  }

  function resetCode() {
    setCode(initialCode);
    setExecutedCode(initialCode);
    setLogs([]);
    setFrameKey((key) => key + 1);
  }

  return (
    <section className="playground">
      <div className="playground__header">
        <h3>Sandbox</h3>
        <div className="playground__actions">
          <button type="button" className="button button--ghost" onClick={resetCode}>
            Reset
          </button>
          <button type="button" className="button button--primary" onClick={runCode}>
            Run
          </button>
        </div>
      </div>

      <MonacoEditorClient value={code} onChange={setCode} height={300} />

      <div className="playground__output">
        <div className="playground__panel">
          <h4>Preview</h4>
          <iframe
            key={frameKey}
            className="playground__frame"
            srcDoc={createRuntimeHtml(executedCode)}
            sandbox="allow-scripts"
            title="Lesson output"
          />
        </div>

        <div className="playground__panel">
          <h4>Console</h4>
          <div className="playground__console">
            {logs.length === 0 ? (
              <p>No logs yet. Click Run to execute code.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`log log--${log.type}`}>
                  [{log.type}] {log.value}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
