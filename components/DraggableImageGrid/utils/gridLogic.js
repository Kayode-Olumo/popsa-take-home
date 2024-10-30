export const reorderArray = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const handleOverflow = (pages, pageIndex) => {
  if (pageIndex >= pages.length) return pages;

  const newPages = [...pages];
  const currentPage = newPages[pageIndex];

  if (currentPage.images.length <= 4) return newPages;

  const overflow = currentPage.images[4];
  currentPage.images = currentPage.images.slice(0, 4);

  if (pageIndex === newPages.length - 1) {
    newPages.push({
      title: `Page ${pageIndex + 2}`,
      images: [overflow, null, null, null],
    });
  } else {
    newPages[pageIndex + 1].images.unshift(overflow);
    return handleOverflow(newPages, pageIndex + 1);
  }

  return newPages;
};

export const cleanEmptyPages = (pages) => {
  if (pages.length === 0) return pages;
  if (!pages[pages.length - 1].images.every((img) => img === null))
    return pages;
  return cleanEmptyPages(pages.slice(0, -1));
};

export const handleDragEnd = (result, pages) => {
  if (!result.destination) return pages;

  const sourcePageIndex = parseInt(result.source.droppableId.split("-")[1]);
  const destinationPageIndex = parseInt(
    result.destination.droppableId.split("-")[1]
  );

  let newPages = JSON.parse(JSON.stringify(pages));

  if (sourcePageIndex === destinationPageIndex) {
    newPages[sourcePageIndex].images = reorderArray(
      newPages[sourcePageIndex].images,
      result.source.index,
      result.destination.index
    );
  } else {
    const sourceItem = newPages[sourcePageIndex].images[result.source.index];

    newPages[sourcePageIndex].images = [
      ...newPages[sourcePageIndex].images.filter(
        (_, i) => i !== result.source.index
      ),
      null,
    ];

    newPages[destinationPageIndex].images.splice(
      result.destination.index,
      0,
      sourceItem
    );

    newPages = handleOverflow(newPages, destinationPageIndex);
  }

  return cleanEmptyPages(newPages);
};
