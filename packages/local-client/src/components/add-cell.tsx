import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>
        New Code Cell
      </button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>
        New Text Cell
      </button>
    </div>
  );
};

export default AddCell;
