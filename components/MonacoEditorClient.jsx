"use client";

import Editor from "@monaco-editor/react";

export default function MonacoEditorClient({
  value = "// Start typing...",
  language = "javascript",
  height = 320,
  onChange,
}) {
  return (
    <div style={{ height, border: "1px solid #dcdcdc", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "0.45rem 0.7rem", borderBottom: "1px solid #dcdcdc", fontSize: 12 }}>
        {language}
      </div>
      <Editor
        defaultLanguage={language}
        value={value}
        onChange={(nextValue) => onChange?.(nextValue ?? "")}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
        height="calc(100% - 30px)"
      />
    </div>
  );
}
