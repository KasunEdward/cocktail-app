import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IconButton from "..";

const MockIcon = vi.fn().mockImplementation(({ size, color, className }) => (
  <svg
    data-testid="mock-icon"
    width={size}
    height={size}
    fill={color}
    className={className}
  />
));

describe("IconButton Component", () => {
  it("renders correctly with icon", () => {
    render(<IconButton icon={MockIcon} />);

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<IconButton icon={MockIcon} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
