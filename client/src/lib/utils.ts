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
