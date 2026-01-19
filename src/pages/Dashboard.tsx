import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StoreSelector } from "../components/StoreSelector";
import { Filters } from "../components/Filters";
import { RequestTable } from "../components/RequestTable";
import { RequestDetailsModal } from "../components/RequestDetailsModal";
import { useRequests } from "../hooks/useRequests";
import type { ReturnExchangeRequest } from "../types";
import { Pagination } from "../components/Pagination";

export const Dashboard = () => {
  const [shop, setShop] = useState("demo-store.myshopify.com");
  const { requests, loading, updateStatus } = useRequests(shop);
  const [selected, setSelected] = useState<ReturnExchangeRequest | null>(null);
  const [params, setParams] = useSearchParams();

  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = requests.filter((r) => {
    if (params.get("status") && r.status !== params.get("status")) return false;
    if (params.get("type") && r.type !== params.get("type")) return false;
    if (params.get("search")) {
      const q = params.get("search")!.toLowerCase();
      if (
        !r.orderId.toLowerCase().includes(q) &&
        !r.customerName.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedData = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop, params.toString()]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Returns & Exchanges Dashboard</h1>

      <StoreSelector value={shop} onChange={setShop} />

      <div className="mt-4">
        <Filters
          status={params.get("status") || ""}
          type={params.get("type") || ""}
          search={params.get("search") || ""}
          onChange={(k, v) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            v ? params.set(k, v) : params.delete(k);
            setParams(params);
          }}
        />
      </div>

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <>
          <RequestTable data={paginatedData} onSelect={setSelected} />
          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {selected && (
        <RequestDetailsModal
          request={selected}
          onClose={() => setSelected(null)}
          onUpdate={(id, status) => {
            updateStatus(id, status);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};
