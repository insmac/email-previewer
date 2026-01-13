import Editor, { Monaco } from "@monaco-editor/react";

interface EmailEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export function EmailEditor({ value, onChange }: EmailEditorProps) {
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
      jsxFactory: "React.createElement",
      reactNamespace: "React",
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
    });

    // Disable diagnostics for validation
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        path="email.tsx"
        value={value}
        beforeMount={handleEditorWillMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
          fontFamily: "Geist Mono, monospace",
        }}
        onChange={onChange}
      />
    </div>
  );
}
