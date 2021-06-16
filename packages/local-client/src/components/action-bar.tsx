import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div>
      <button onClick={() => moveCell(cellId, "up")}>Move up</button>
      <button onClick={() => moveCell(cellId, "down")}>Move down</button>
      <button onClick={() => deleteCell(cellId)}>Delete</button>
    </div>
  );
};

export default ActionBar;
