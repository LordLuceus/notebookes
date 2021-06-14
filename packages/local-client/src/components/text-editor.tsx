import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(
    "# Click inside the editor to enable edit mode."
  );

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  });

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
        <button onClick={() => setEditing(false)} style={{ opacity: 0 }}>
          Preview Mode
        </button>
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
