import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Tooltip from "@/components/tooltip";

describe("Tooltip Component", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("displays tooltip on hover", async () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");


    // Hover over the button
    await userEvent.hover(button);

    // Tooltip should be visible
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });
});
// 