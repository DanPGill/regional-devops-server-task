import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Status from "./status";

const allRegionsOperational = [
  { region: "us-east", status: "ok", timestamp: "2025-01-01T00:00:00Z" },
  { region: "eu-west", status: "ok", timestamp: "2025-01-01T00:00:00Z" },
];

const someRegionsDegraded = [
  { region: "us-east", status: "ok", timestamp: "2025-01-01T00:00:00Z" },
  { region: "eu-west", status: "degraded", timestamp: "2025-01-01T00:00:00Z" },
];

describe("Status component", () => {
  it("shows all systems operational message when all statuses are ok", () => {
    render(<Status data={allRegionsOperational} />);
    expect(screen.getByText(/All Systems Operational/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Degraded Performance Detected/i),
    ).not.toBeInTheDocument();
  });

  it("shows degraded performance message when any status is not ok", () => {
    render(<Status data={someRegionsDegraded} />);
    expect(
      screen.getByText(/Degraded Performance Detected/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/All Systems Operational/i),
    ).not.toBeInTheDocument();
  });

  it("shows all systems operational message when data is empty", () => {
    render(<Status data={[]} />);
    expect(screen.getByText(/All Systems Operational/i)).toBeInTheDocument();
  });
});
