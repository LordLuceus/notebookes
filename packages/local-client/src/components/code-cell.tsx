import { useEffect, useRef, useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const handleEditorChange = (value: string | undefined): void => {
    if (value) {
      setInput(value);
    }
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="// Welcome to NotebookES!"
            onChange={handleEditorChange}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
