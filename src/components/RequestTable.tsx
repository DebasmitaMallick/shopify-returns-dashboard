import type { ReturnExchangeRequest } from "../types";

interface Props {
  data: ReturnExchangeRequest[];
  onSelect: (r: ReturnExchangeRequest) => void;
}

export const RequestTable = ({ data, onSelect }: Props) => {
  if (!data.length)
    return <p className="text-gray-500 mt-6">No requests found</p>;

  return (
    <table className="w-full mt-4 border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Order</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Type</th>
          <th className="p-2">Status</th>
          <th className="p-2">Created</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr
            key={r.id}
            onClick={() => onSelect(r)}
            className="cursor-pointer hover:bg-gray-50"
          >
            <td className="p-2">{r.orderId}</td>
            <td className="p-2">{r.customerName}</td>
            <td className="p-2">{r.type}</td>
            <td className="p-2">{r.status}</td>
            <td className="p-2">{r.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
