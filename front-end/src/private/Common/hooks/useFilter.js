import { useState } from "react";

// Custom Hook
export function useFilter(data, callback) {
  const [query, setQuery] = useState("");
  //   const filteredData = data.filter((el) => el.category.toLowerCase().includes(query)); // Not dynamicall changes the field like category
  const filteredData = data.filter((el) =>
    callback(el).toLowerCase().includes(query)
  );
  return [filteredData, setQuery];
}

// const [filteredData, setQuery] = useFilter(expenses, (data) => data.category);
