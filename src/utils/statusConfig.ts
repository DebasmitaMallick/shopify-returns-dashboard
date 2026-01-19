import type { RequestStatus } from "../types";

export const STATUS_CONFIG: Record<RequestStatus, {
  label: string;
  color: string;
}> = {
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  APPROVED: { label: "Approved", color: "bg-green-100 text-green-800" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800" },
  COMPLETED: { label: "Completed", color: "bg-blue-100 text-blue-800" },
};
