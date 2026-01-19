import React, { useState } from "react";
import type { RequestStatus, RequestType, ReturnExchangeRequest } from "../types";

interface Props {
  requests: ReturnExchangeRequest[];
  onUpdate: (id: string, status: RequestStatus) => void;
}

const RequestList: React.FC<Props> = ({ requests, onUpdate }) => {
  const [typeFilter, setTypeFilter] = useState<RequestType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = requests.filter((r) => {
    if (typeFilter !== "ALL" && r.type !== typeFilter) return false;
    if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
    if (search && !r.customerName.toLowerCase().includes(search.toLowerCase()) && !r.orderId.includes(search)) return false;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as RequestType | "ALL")} className="border p-1 rounded">
          <option value="ALL">All Types</option>
          <option value="RETURN">Return</option>
          <option value="EXCHANGE">Exchange</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as RequestStatus | "ALL")} className="border p-1 rounded">
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="border p-1 rounded flex-1"/>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Reason</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.orderId}</td>
              <td className="p-2">{r.customerName}</td>
              <td className="p-2">{r.type}</td>
              <td className="p-2">{r.reason}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2">{r.createdAt}</td>
              <td className="p-2 space-x-1">
                {r.status === 'PENDING' && (
                  <>
                    <button onClick={() => onUpdate(r.id, 'APPROVED')} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                    <button onClick={() => onUpdate(r.id, 'REJECTED')} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </>
                )}
                {r.status === 'APPROVED' && (
                  <button onClick={() => onUpdate(r.id, 'COMPLETED')} className="bg-blue-500 text-white px-2 py-1 rounded">Complete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <div className="mt-4 text-center text-gray-500">No requests found</div>}
    </div>
  );
};

export default RequestList;
