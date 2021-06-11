import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
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

ReactDOM.render(<App />, document.querySelector("#root"));
