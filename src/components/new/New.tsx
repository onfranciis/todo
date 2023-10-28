import "./New.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import useStorage from "../../hooks/useStorage";
import { IList } from "../../types";

interface INewProps {
  DisplayNew: boolean;
  setDisplayNew: (data: boolean) => void;
  setList: (data: IList[]) => void;
}

const New = ({ setDisplayNew, DisplayNew, setList }: INewProps) => {
  const { updateList, getList } = useStorage();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id == "title") {
      setTitle(e.target.value);
    } else if (e.target.id == "body") {
      setBody(e.target.value);
    }
  };

  const handleSubmit = () => {
    const list = getList() as IList[];

    if (title.trim() !== "" || body.trim() !== "") {
      list.push({
        Title: title.trim(),
        Body: body.trim(),
        Time: Date.now().toLocaleString("en-US"),
        Id: uuid(),
      });

      updateList(list);
      setList(getList());
      setTitle("");
      setBody("");
    }

    setDisplayNew(false);
  };

  useEffect(() => {
    if (DisplayNew) titleRef.current?.focus();
  }, [DisplayNew]);

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
          ref={titleRef}
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

        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default New;
