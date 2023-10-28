import "../styles/App.scss";
import { useState } from "react";
import Card from "./card/Card";
import Search from "./search/Search";
import NewCard from "./card/NewCard";
import New from "./new/New";
import useStorage from "../hooks/useStorage";
import { IList } from "../types";

function App() {
  const { getList } = useStorage();
  const [searchInput, setSearchInput] = useState("");
  const [displayNew, setDisplayNew] = useState(false);
  const lists = getList() as IList[];

  const filterList = () => {
    return lists.filter((list) => {
      return (
        list?.Body?.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
        list?.Title?.toLowerCase().trim().includes(searchInput?.toLowerCase())
      );
    });
  };

  return (
    <div className="App">
      <Search Input={searchInput} setInput={setSearchInput} />

      <div className="Cards">
        <NewCard setDisplay={setDisplayNew} />

        {filterList().map((list, index) => (
          <Card Data={filterList()} key={list.Time} Index={index} />
        ))}
      </div>

      <New setDisplayNew={setDisplayNew} DisplayNew={displayNew} />
    </div>
  );
}

export default App;
