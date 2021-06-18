import { useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { Cell } from "../state";
import "./code-cell.css";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles.bundle[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode: string[] = [
      `
        const show = (value) => {
          if (typeof value === "object") {
            document.querySelector("#root").innerHTML = JSON.stringify(value);
          } else {
            document.querySelector("#root").innerHTML = value;
          }
        };
      `,
    ];
    orderedCells.some((c) => {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      return c.id === cell.id;
    });

    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), cell.id, createBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.processing ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Processing...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
