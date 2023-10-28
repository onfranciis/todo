import "../styles/App.scss";
import { useState } from "react";
import Card from "./card/Card";
import Search from "./search/Search";
import NewCard from "./card/NewCard";
import New from "./new/New";
import useStorage from "../hooks/useStorage";
import { TbError404 } from "react-icons/tb";
import { LuLayoutList } from "react-icons/lu";

function App() {
  const { getList } = useStorage();
  const [searchInput, setSearchInput] = useState("");
  const [displayNew, setDisplayNew] = useState(false);
  const [list, setList] = useState(getList());

  const filterList = () => {
    return list.filter((list) => {
      return (
        list?.Body?.toLowerCase().includes(searchInput.toLowerCase().trim()) ||
        list?.Title?.toLowerCase().trim().includes(searchInput?.toLowerCase())
      );
    });
  };

  return (
    <div className="App">
      <h1>Todo</h1>

      <Search Input={searchInput} setInput={setSearchInput} />

      <div className="Cards">
        <NewCard setDisplay={setDisplayNew} />

        {filterList().map((list, index) => (
          <Card
            Data={filterList()}
            key={list.Time}
            Index={index}
            setList={setList}
          />
        ))}
      </div>

      {filterList().length == 0 && getList().length !== 0 && (
        <div className="notFound">
          <TbError404 />
          <p className="sub">No list with this search term was found</p>
        </div>
      )}

      {getList().length == 0 && (
        <div className="notFound">
          <LuLayoutList />
          <p className="sub">You haven't created any list yet</p>
        </div>
      )}

      <New
        setDisplayNew={setDisplayNew}
        DisplayNew={displayNew}
        setList={setList}
      />
    </div>
  );
}

export default App;
