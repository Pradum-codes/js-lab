import CodeBlock from "./components/CodeBlock";

export function useMDXComponents(components) {
  return {
    pre: CodeBlock,
    ...components,
  };
}
