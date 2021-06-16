import { useEffect, useRef, useState } from "react";
import bundle from "../bundler";
import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  const handleEditorChange = (value: string | undefined): void => {
    if (value) {
      updateCell(cell.id, value);
    }
  };

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={handleEditorChange}
          />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
