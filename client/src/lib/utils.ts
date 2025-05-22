import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ok":
      return "var(--success)";
    case "degraded":
      return "var(--warning)";
    default:
      return "var(--muted-foreground)";
  }
};

export const getStatusBgColor = (status: string) => {
  switch (status) {
    case "ok":
      return "var(--success-background)";
    case "degraded":
      return "var(--warning-background)";
    default:
      return "var(--muted)";
  }
};
