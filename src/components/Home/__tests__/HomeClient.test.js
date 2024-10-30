import { render, screen } from "@testing-library/react";
import HomeClient from "@/src/components/Home/HomeClient";
import CommonStrings from "@/src/utils/constants";

// Mock next/image since it's not available in test environment
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

describe("HomeClient", () => {
  it("renders the logo", () => {
    render(<HomeClient />);
    const logo = screen.getByAltText("Popsa");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "127");
    expect(logo).toHaveAttribute("height", "32");
  });

  it("displays the welcome message", () => {
    render(<HomeClient />);
    const heading = screen.getByRole("heading", {
      name: CommonStrings.mainPage.intro,
    });
    expect(heading).toBeInTheDocument();
  });

  it("contains a link to start the test", () => {
    render(<HomeClient />);
    const link = screen.getByRole("link", {
      name: CommonStrings.mainPage.link,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/gallerypage");
  });

  it("matches snapshot", () => {
    const { container } = render(<HomeClient />);
    expect(container).toMatchSnapshot();
  });
});
