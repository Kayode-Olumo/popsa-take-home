"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  GridItem,
  StyledImage,
  EmptySlot,
  PageContainer,
  Container,
  Grid,
  Header,
  Title,
} from "./styles/DraggableImageGrid.styles";
import Actions from "@/src/components/Actions/actions";

// Move pure functions to a separate utils file
export const initializePages = (imgData) => {
  return imgData.map((page) => ({
    ...page,
    images: [
      ...(Array.isArray(page.images) ? page.images : []),
      ...new Array(
        4 - (Array.isArray(page.images) ? page.images.length : 0)
      ).fill(null),
    ],
  }));
};

const DraggableImageGrid = ({ imgData }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(initializePages(imgData));
  }, [imgData]);

  const reorderArray = (array, startIndex, endIndex) => {
    const result = Array.from(array);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourcePageIndex = parseInt(result.source.droppableId.split("-")[1]);
    const destinationPageIndex = parseInt(
      result.destination.droppableId.split("-")[1]
    );

    const newPages = JSON.parse(JSON.stringify(pages));

    if (sourcePageIndex === destinationPageIndex) {
      // Moving within the same page
      newPages[sourcePageIndex].images = reorderArray(
        newPages[sourcePageIndex].images,
        result.source.index,
        result.destination.index
      );
    } else {
      // Moving between pages
      const sourceItem = newPages[sourcePageIndex].images[result.source.index];

      // Remove from source and rebalance with nulls
      newPages[sourcePageIndex].images = [
        ...newPages[sourcePageIndex].images.filter(
          (_, i) => i !== result.source.index
        ),
        null,
      ];

      // Add to destination
      newPages[destinationPageIndex].images.splice(
        result.destination.index,
        0,
        sourceItem
      );

      // Handle cascading overflow recursively
      const handleOverflow = (pageIndex) => {
        if (pageIndex >= newPages.length) return;

        const currentPage = newPages[pageIndex];
        if (currentPage.images.length <= 4) return;

        const overflow = currentPage.images[4];
        currentPage.images = currentPage.images.slice(0, 4);

        if (pageIndex === newPages.length - 1) {
          // Create new page if at the end
          newPages.push({
            title: `Page ${pageIndex + 2}`,
            images: [overflow, null, null, null],
          });
        } else {
          // Insert at start of next page and handle its potential overflow
          newPages[pageIndex + 1].images.unshift(overflow);
          handleOverflow(pageIndex + 1);
        }
      };

      handleOverflow(destinationPageIndex);
    }

    // Remove empty pages at the end recursively
    const cleanEmptyPages = (pages) => {
      if (pages.length === 0) return pages;
      if (!pages[pages.length - 1].images.every((img) => img === null))
        return pages;
      return cleanEmptyPages(pages.slice(0, -1));
    };

    setPages(cleanEmptyPages(newPages));
  };

  const renderGridItem = (image, pageIndex, index) => {
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
              <StyledImage
                src={image}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                data-testid={`image-${pageIndex}-${index}`}
                unoptimized={true}
              />
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

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {pages.map((page, pageIndex) => (
          <PageContainer key={pageIndex}>
            <Header>
              <Title>{page.title}</Title>
              <Actions />
            </Header>
            <Droppable
              droppableId={`page-${pageIndex}`}
              direction="horizontal"
              type="GRID_ITEM"
              isDropDisabled={false}
            >
              {(provided, snapshot) => (
                <Grid {...provided.droppableProps} ref={provided.innerRef}>
                  {page.images.map((image, index) =>
                    renderGridItem(image, pageIndex, index)
                  )}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </PageContainer>
        ))}
      </DragDropContext>
    </Container>
  );
};

export default DraggableImageGrid;
