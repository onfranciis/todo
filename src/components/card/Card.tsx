import { useEffect, useState } from "react";
import "./Card.scss";
import { IList, Mode, handleToolsArg } from "../../types";
import Tools from "./Tools";
import useStorage from "../../hooks/useStorage";

interface ICardProps {
  Data: IList[];
  Index: number;
  setList: (data: IList[]) => void;
}

const Card = ({ Data, Index, setList }: ICardProps) => {
  const { updateList, getList } = useStorage();
  const [targetIndex, setTargetIndex] = useState(Index);
  const [selected, setSelected] = useState(false);
  const [mode, setMode] = useState<Mode>("Preview");
  const [titleInput, setTitleInput] = useState(
    Data[selected ? targetIndex : Index]?.Title
  );
  const [bodyInput, setBodyInput] = useState(
    Data[selected ? targetIndex : Index]?.Body
  );

  const updateCard = () => {
    const originalIndex = getList().findIndex(
      (list) => list.Id == Data[targetIndex].Id
    );

    const updatedItem: IList = {
      ...Data[targetIndex],
      Title: titleInput,
      Body: bodyInput,
    };

    const modifiedData = getList()
      .slice(0, originalIndex)
      .concat([updatedItem])
      .concat(getList().slice(originalIndex + 1));

    updateList(modifiedData);
    setList(getList());
    setMode("Preview");
  };

  const handleTools = (type: handleToolsArg) => {
    if (type == "Prev") {
      if (targetIndex !== 0) {
        const newTargetIndex = targetIndex - 1;

        setTargetIndex(newTargetIndex);
        setTitleInput(Data[newTargetIndex].Title);
        setBodyInput(Data[newTargetIndex].Title);
      }
    } else if (type == "Next") {
      if (targetIndex !== Data.length - 1) {
        const newTargetIndex = targetIndex + 1;

        setTargetIndex(newTargetIndex);
        setTitleInput(Data[newTargetIndex].Title);
        setBodyInput(Data[newTargetIndex].Body);
      }
    } else if (type == "Copy") {
      navigator.clipboard.writeText(
        Data[selected ? targetIndex : Index]?.Body.trim()
      );
    } else if (type == "Update") {
      updateCard();
    }
  };

  useEffect(() => {
    setTargetIndex(Index);
  }, [selected]);

  useEffect(() => {
    setTitleInput(Data[targetIndex].Title);
    setBodyInput(Data[targetIndex].Body);
  }, [mode]);

  return (
    <div
      className={`PreviewParent ${selected && "Preview"}`}
      onClick={() => {
        setSelected(false);
        setMode("Preview");
      }}
    >
      <div
        className={`Card ${selected && "Preview"}`}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(true);
        }}
      >
        <div>
          <Tools
            handleTools={handleTools}
            Data={Data}
            mode={mode}
            selected={selected}
            setMode={setMode}
            targetIndex={targetIndex}
          />

          <div className="group">
            {mode == "Preview" ? (
              <p className="title">
                {Data[selected ? targetIndex : Index]?.Title}
              </p>
            ) : (
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="group">
          {mode == "Preview" ? (
            <pre className="body">
              {Data[selected ? targetIndex : Index]?.Body.trim()}{" "}
            </pre>
          ) : (
            <textarea
              cols={20}
              rows={5}
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

Card.defaultProps = {
  Data: {
    Title: "Untitled",
    Body: "Nothing was added!",
  },
};

export default Card;
