import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const initialize = async () => {
    await esbuild.initialize({
      wasmURL: "https://unpkg.com/esbuild-wasm@0.12.6/esbuild.wasm"
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  const handleEditorChange = (value: string | undefined): void => {
    if (value) {
      setInput(value);
    }
  };

  return (
    <div>
      <CodeEditor
        initialValue="// Welcome to NotebookES!"
        onChange={handleEditorChange}
      />
      <button onClick={onClick}>Submit</button>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
