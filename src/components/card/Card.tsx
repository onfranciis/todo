import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegCopy } from "react-icons/fa6";
import "./Card.scss";

interface ICardProps {
  Data: { Title: string; Body: string }[];
  Index: number;
}

const Card = ({ Data, Index }: ICardProps) => {
  const [targetIndex, setTargetIndex] = useState(Index);
  const [selected, setSelected] = useState(false);

  const Iterate = (type: "Prev" | "Next") => {
    if (type == "Prev") {
      if (targetIndex !== 0) {
        setTargetIndex(targetIndex - 1);
      }
    } else if (type == "Next") {
      if (targetIndex !== Data.length - 1) {
        setTargetIndex(targetIndex + 1);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      Data[selected ? targetIndex : Index]?.Body.trim()
    );
  };

  useEffect(() => {
    setTargetIndex(Index);
  }, [selected]);

  return (
    <div
      className={`PreviewParent ${selected && "Preview"}`}
      onClick={() => setSelected(false)}
    >
      <div
        className={`Card ${selected && "Preview"}`}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(true);
        }}
      >
        <div>
          <p className="title">{Data[selected ? targetIndex : Index]?.Title}</p>

          <div className={`Tools ${selected && "Preview"}`}>
            <button onClick={() => Iterate("Prev")}>
              <FaChevronLeft />
            </button>

            <p>{`${targetIndex + 1}/${Data.length}`}</p>

            <button onClick={() => Iterate("Next")}>
              <FaChevronRight />
            </button>

            <button onClick={handleCopy}>
              <FaRegCopy />
            </button>
          </div>
        </div>

        <pre className="body">
          {Data[selected ? targetIndex : Index]?.Body.trim()}{" "}
        </pre>
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
