import { IList, Mode, handleToolsArg } from "../../types";
import {
  FaPen,
  FaChevronLeft,
  FaChevronRight,
  FaRegCopy,
} from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
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
      {mode == "Preview" ? (
        <button onClick={() => setMode("Edit")}>
          <FaPen />
        </button>
      ) : (
        <button onClick={() => handleTools("Update")}>
          <FaSave />
        </button>
      )}

      <button onClick={() => handleTools("Prev")}>
        <FaChevronLeft />
      </button>

      <p>{`${targetIndex + 1}/${Data.length}`}</p>

      <button onClick={() => handleTools("Next")}>
        <FaChevronRight />
      </button>

      <button onClick={() => handleTools("Copy")}>
        <FaRegCopy />
      </button>
    </div>
  );
};

export default Tools;
