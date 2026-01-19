import { useEffect, useState } from "react";
import { fetchRequestsByShop, updateRequestStatus } from "../services/api";
import type { RequestStatus, ReturnExchangeRequest } from "../types";

export const useRequests = (shop: string) => {
  const [requests, setRequests] = useState<ReturnExchangeRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchRequestsByShop(shop).then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, [shop]);

  const updateStatus = async (id: string, status: RequestStatus) => {
    await updateRequestStatus(id, status);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return { requests, loading, updateStatus };
};
