import { Cell } from "../state";
import ActionBar from "./action-bar";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type === "code") {
    child = (
      <>
        <ActionBar cellId={cell.id} />
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <ActionBar cellId={cell.id} />
        <TextEditor cell={cell} />
      </>
    );
  }

  return <section>{child}</section>;
};

export default CellListItem;
