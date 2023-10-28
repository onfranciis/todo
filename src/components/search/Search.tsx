import { ChangeEvent } from "react";
import "./Search.scss";

interface ISearchProp {
  setInput: (data: string) => void;
  Input: string;
}

const Search = ({ setInput, Input }: ISearchProp) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="Search">
      <input
        type="search"
        placeholder="Search your notes..."
        value={Input}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
