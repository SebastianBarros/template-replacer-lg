import { useEffect, useState } from "react";

export const useGetTextFromFile = (path: string) => {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then(setText);
  }, []);
  return text;
};
