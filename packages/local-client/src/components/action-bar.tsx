import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div>
      <button
        className="button is-primary is-small"
        aria-label="Move Up"
        onClick={() => moveCell(cellId, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        aria-label="Move Down"
        onClick={() => moveCell(cellId, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        aria-label="Delete Cell"
        onClick={() => deleteCell(cellId)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
