import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  GridItem,
  StyledImage,
  EmptySlot,
} from "../DraggableImageGrid/styles/DraggableImageGrid.styles";
import Actions from "@/src/components/Actions/actions";

export const renderGridItem = (image, pageIndex, index) => {
  return (
    <Draggable
      key={`${pageIndex}-${index}`}
      draggableId={`${pageIndex}-${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <GridItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            cursor: "grab",
            opacity: snapshot.isDragging ? 0.5 : 1,
          }}
        >
          {image ? (
            <>
              <StyledImage
                src={image}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                data-testid={`image-${pageIndex}-${index}`}
                unoptimized="true"
              />
              <Actions />
            </>
          ) : (
            <EmptySlot data-testid={`empty-slot-${pageIndex}-${index}`}>
              Empty Slot
            </EmptySlot>
          )}
        </GridItem>
      )}
    </Draggable>
  );
};
