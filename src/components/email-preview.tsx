"use client";

import React, { useEffect, useState } from "react";
import { render } from "@react-email/render";
import * as ReactEmailComponents from "@react-email/components";
import { transform } from "sucrase";

interface EmailPreviewProps {
  code: string;
}

export function EmailPreview({ code }: EmailPreviewProps) {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateHtml = async () => {
      try {
        if (!code.trim()) {
          setHtml("");
          return;
        }

        // Transpile TSX to JS
        const compiledCode = transform(code, {
          transforms: ["typescript", "jsx", "imports"],
          production: false,
        }).code;

        // Mock require and exports
        const exports: { default?: React.ComponentType } = {};

        const requireMock = (moduleName: string) => {
          if (moduleName === "@react-email/components")
            return ReactEmailComponents;
          if (moduleName === "react") return React;
          // Add more mocks if needed
          throw new Error(`Module '${moduleName}' not found`);
        };

        // Execute the code
        // We use new Function to create a scope
        const run = new Function("exports", "require", "React", compiledCode);
        run(exports, requireMock, React);

        const EmailComponent = exports.default;

        if (!EmailComponent) {
          throw new Error(
            "No default export found. Please export a component as default."
          );
        }

        const renderedHtml = await render(<EmailComponent />, {
          pretty: true,
        });

        setHtml(renderedHtml);
        setError(null);
      } catch (err: unknown) {
        console.error("Preview Error:", err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    // Debounce execution to avoid too many renders
    const timer = setTimeout(generateHtml, 800);
    return () => clearTimeout(timer);
  }, [code]);

  if (error) {
    return (
      <div className="p-4 text-red-500 font-mono text-sm h-full overflow-auto bg-[#1e1e1e] border-l border-[#333]">
        <h3 className="font-bold mb-2 text-red-400">
          Compilation/Runtime Error:
        </h3>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white relative">
      <iframe
        srcDoc={html}
        className="w-full h-full border-0 absolute inset-0"
        title="Email Preview"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  );
}
