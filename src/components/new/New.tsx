import { ChangeEvent, useState } from "react";
import "./New.scss";

interface INewProps {
  DisplayNew: boolean;
  setDisplayNew: (data: boolean) => void;
}

const New = ({ setDisplayNew, DisplayNew }: INewProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id == "title") {
      setTitle(e.target.value);
    } else if (e.target.id == "body") {
      setBody(e.target.value);
    }
  };

  return (
    <div
      className="NewParent"
      onClick={() => setDisplayNew(false)}
      style={{ display: DisplayNew ? "flex" : "none" }}
    >
      <div className="New" onClick={(e) => e.stopPropagation()}>
        <input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />

        <textarea
          id="body"
          cols={30}
          rows={10}
          placeholder="Lorem Ipsum..."
          value={body}
          onChange={handleChange}
        ></textarea>

        <button>Add</button>
      </div>
    </div>
  );
};

export default New;
