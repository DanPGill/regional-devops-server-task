import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Connections from "./connections";

const mockData = [
  {
    region: "us-east",
    status: "ok",
    timestamp: "2025-01-01T00:00:00Z",
    stats: {
      server: {
        active_connections: 100,
      },
    },
  },
  {
    region: "eu-west",
    status: "degraded",
    timestamp: "2025-01-01T00:00:00Z",
    stats: {
      server: {
        active_connections: 200,
      },
    },
  },
  {
    region: "ap-south",
    status: "ok",
    timestamp: "2025-01-01T00:00:00Z",
    stats: {
      server: {},
    },
  },
];

describe("Connections component", () => {
  it("renders total active connections correctly", () => {
    render(<Connections data={mockData} />);
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  it("displays the correct number of regions", () => {
    render(<Connections data={mockData} />);
    expect(screen.getByText(/Across 3 regions/i)).toBeInTheDocument();
  });

  it("renders without crashing with empty data", () => {
    render(<Connections data={[]} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText(/Across 0 regions/i)).toBeInTheDocument();
  });
});
