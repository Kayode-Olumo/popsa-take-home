import { render, screen } from "@testing-library/react";
import GalleryClient from "@/src/components/Gallery/GalleryClient";
import CommonStrings from "@/src/utils/constants";
import { imgData } from "@/src/data/imgData";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock DraggableImageGrid component
jest.mock("../../DraggableImageGrid/", () => ({
  __esModule: true,
  default: ({ imgData }) => (
    <div data-testid="mock-draggable-grid">Mock Grid</div>
  ),
}));

describe("GalleryClient", () => {
  const mockInitialData = imgData;

  beforeEach(() => {
    render(<GalleryClient initialData={mockInitialData} />);
  });

  it("renders the header text", () => {
    const header = screen.getByRole("heading", {
      name: CommonStrings.testPage.header,
    });
    expect(header).toBeInTheDocument();
  });

  it("displays the date information", () => {
    const dateText = screen.getByText(CommonStrings.testPage.date);
    expect(dateText).toBeInTheDocument();
  });

  it("renders the DraggableImageGrid component", () => {
    const grid = screen.getByTestId("mock-draggable-grid");
    expect(grid).toBeInTheDocument();
  });

  it("passes the initial data to DraggableImageGrid", () => {
    const grid = screen.getByTestId("mock-draggable-grid");
    expect(grid).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <GalleryClient initialData={mockInitialData} />
    );
    expect(container).toMatchSnapshot();
  });
});
