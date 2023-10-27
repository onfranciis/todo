const useStorage = () => {
  const getList = () => {
    const items = window.localStorage.getItem("items") || "[]";

    if (items) {
      return JSON.parse(items);
    } else {
      return [];
    }
  };

  const updateList = (array: object[]) => {
    window.localStorage.setItem("items", JSON.stringify(array));
  };

  return { getList, updateList };
};

export default useStorage;
