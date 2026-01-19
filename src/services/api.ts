import { mockRequests } from "../data/mockRequests";
import type { RequestStatus, ReturnExchangeRequest } from "../types";

export const fetchRequestsByShop = async (
  shop: string
): Promise<ReturnExchangeRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRequests.filter((r) => r.shop === shop));
    }, 600);
  });
};

export const updateRequestStatus = async (
  id: string,
  status: RequestStatus
): Promise<void> => {
  return new Promise((resolve) => {
    console.log(`Updating request ${id} to status ${status}`);
    setTimeout(() => resolve(), 300);
  });
};