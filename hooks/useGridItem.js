import { useCallback } from "react";

export const useGridItem = () => {
  const getItemStyle = useCallback(
    (draggableStyle, isDragging) => ({
      ...draggableStyle,
      cursor: "grab",
      opacity: isDragging ? 0.5 : 1,
    }),
    []
  );

  return {
    getItemStyle,
  };
};
