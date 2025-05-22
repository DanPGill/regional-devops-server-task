import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ok":
      return "#10b981";
    case "degraded":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
};

export const getStatusBgColor = (status: string) => {
  switch (status) {
    case "ok":
      return "#d1fae5";
    case "degraded":
      return "#fef3c7";
    default:
      return "#f3f4f6";
  }
};