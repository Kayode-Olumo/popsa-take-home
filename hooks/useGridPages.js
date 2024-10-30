import { useState, useEffect } from "react";
import {
  initializePages,
  handleDragEnd,
} from "../components/DraggableImageGrid/utils/gridLogic";

export const useGridPages = (imgData) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(initializePages(imgData));
  }, [imgData]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newPages = handleDragEnd(result, pages);
    setPages(newPages);
  };

  return {
    pages,
    onDragEnd,
  };
};
