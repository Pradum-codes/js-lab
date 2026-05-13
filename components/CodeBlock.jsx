import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function parseMeta(meta = "") {
  const tokens = meta.trim().split(/\s+/).filter(Boolean);
  return {
    live: tokens.includes("live"),
    editable: tokens.includes("editable"),
    runnable: tokens.includes("runnable"),
  };
}

export default function CodeBlock({ children }) {
  const codeProps = children?.props || {};
  const language = codeProps.className?.replace("language-", "") || "text";
  const { live, editable, runnable } = parseMeta(codeProps.metastring || "");
  const source = String(codeProps.children).replace(/\n$/, "");
  const normalizedLanguage = language === "js" ? "javascript" : language;

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span>{language}</span>
        <span className="code-block__badges">
          {live && <span className="code-block__badge">live</span>}
          {editable && <span className="code-block__badge">editable</span>}
          {runnable && <span className="code-block__badge">runnable</span>}
        </span>
      </div>
      <SyntaxHighlighter
        language={normalizedLanguage}
        style={oneLight}
        customStyle={{ margin: 0, padding: "0.9rem", background: "transparent" }}
        className="code-block__pre"
      >
        {source}
      </SyntaxHighlighter>
    </div>
  );
}
