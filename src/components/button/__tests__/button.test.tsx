import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "..";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText("Primary")).toHaveClass(
      "bg-primary-2 text-white-1 hover:bg-primary-1"
    );

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toHaveClass(
      "bg-blue-500 text-white hover:bg-blue-600"
    );

    rerender(
      <Button variant="disabled" disabled>
        Disabled
      </Button>
    );
    expect(screen.getByText("Disabled")).toHaveClass(
      "!bg-gray-400 !hover:bg-gray-400 !text-gray-700 cursor-not-allowed"
    );
  });

  it("applies additional className correctly", () => {
    render(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByText("Custom Class")).toHaveClass("custom-class");
  });
});
