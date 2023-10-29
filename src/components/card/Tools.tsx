import { IList, Mode, handleToolsArg } from "../../types";
import {
  FaPen,
  FaChevronLeft,
  FaChevronRight,
  FaRegCopy,
} from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./Card.scss";

interface ITools {
  selected: boolean;
  mode: Mode;
  targetIndex: number;
  Data: IList[];
  setMode: (data: Mode) => void;
  handleTools: (data: handleToolsArg) => void;
}

const Tools = ({
  selected,
  mode,
  targetIndex,
  Data,
  setMode,
  handleTools,
}: ITools) => {
  return (
    <div className={`Tools ${selected && "Preview"}`}>
      <button
        onClick={() => handleTools("Copy")}
        title="Copy this list to your clipboard"
        className="Empty"
      >
        <FaRegCopy />
      </button>

      {mode == "Preview" ? (
        <button onClick={() => setMode("Edit")} title="Modify this list">
          <FaPen />
        </button>
      ) : (
        <button onClick={() => handleTools("Update")} title="Save this changes">
          <FaSave />
        </button>
      )}

      <button onClick={() => handleTools("Prev")} title="Previous list">
        <FaChevronLeft />
      </button>

      <p>{`${targetIndex + 1}/${Data.length}`}</p>

      <button onClick={() => handleTools("Next")} title="Next list">
        <FaChevronRight />
      </button>

      <button
        onClick={() => handleTools("Copy")}
        title="Copy this list to your clipboard"
      >
        <FaRegCopy />
      </button>

      <button
        onClick={() => handleTools("Delete")}
        title="Delete this list"
        className="Delete"
      >
        <MdDeleteOutline />
      </button>
    </div>
  );
};

export default Tools;
