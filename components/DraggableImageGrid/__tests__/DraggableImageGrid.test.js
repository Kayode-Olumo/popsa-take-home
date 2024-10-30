import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableImageGrid from "../index";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock Actions component
jest.mock("../../Actions/actions", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-actions">Actions</div>,
}));

describe("DraggableImageGrid", () => {
  const mockImgData = [
    {
      title: "Front Print",
      images: [
        "https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
      ],
    },
    {
      title: "Page 2",
      images: [
        "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
        "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
      ],
    },
    {
      title: "Page 3",
      images: [
        "https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
        "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
      ],
    },
  ];

  const renderWithDragDropContext = (component) => {
    return render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {component}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  it("renders the grid with correct number of images", () => {
    renderWithDragDropContext(<DraggableImageGrid imgData={mockImgData} />);
    const images = screen.getAllByRole("img");
    const totalImages = mockImgData.reduce(
      (count, page) => count + page.images.length,
      0
    );
    expect(images).toHaveLength(totalImages);
  });

  it("renders Actions component for each image", () => {
    renderWithDragDropContext(<DraggableImageGrid imgData={mockImgData} />);
    const actions = screen.getAllByTestId("mock-actions");
    expect(actions).toHaveLength(3);
  });

  it("displays correct image sources", () => {
    renderWithDragDropContext(<DraggableImageGrid imgData={mockImgData} />);

    mockImgData.forEach((page, pageIndex) => {
      page.images.forEach((imageSrc, imageIndex) => {
        if (imageSrc) {
          // For actual images
          const image = screen.getByTestId(`image-${pageIndex}-${imageIndex}`);
          expect(image).toHaveAttribute("src", imageSrc);
        } else {
          // For empty slots
          const emptySlot = screen.getByTestId(
            `empty-slot-${pageIndex}-${imageIndex}`
          );
          expect(emptySlot).toHaveTextContent("Empty Slot");
        }
      });
    });
  });

  it("renders empty slots when needed", () => {
    renderWithDragDropContext(<DraggableImageGrid imgData={mockImgData} />);
    const emptySlots = screen.getAllByText("Empty Slot");
    // Each page should have 4 slots total, so empty slots should be 4 minus the number of images
    const expectedEmptySlots = mockImgData.reduce(
      (count, page) => count + (4 - page.images.length),
      0
    );
    expect(emptySlots).toHaveLength(expectedEmptySlots);
  });

  it("matches snapshot", () => {
    const { container } = renderWithDragDropContext(
      <DraggableImageGrid imgData={mockImgData} />
    );
    expect(container).toMatchSnapshot();
  });
});
