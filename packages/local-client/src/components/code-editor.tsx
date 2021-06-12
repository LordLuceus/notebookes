import "./code-editor.css";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";

interface CodeEditorProps {
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    if (editorRef.current) {
      const unformatted = editorRef.current.getValue();
      const formatted = prettier
        .format(unformatted, {
          parser: "babel",
          plugins: [parser],
          semi: true,
          singleQuote: false,
          useTabs: false,
          tabWidth: 2
        })
        .replace(/\n$/, "");
      editorRef.current.setValue(formatted);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={initialValue}
        onChange={onChange}
        onMount={onMount}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
