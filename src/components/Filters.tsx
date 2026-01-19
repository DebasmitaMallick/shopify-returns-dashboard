interface Props {
  status: string;
  type: string;
  search: string;
  onChange: (key: string, value: string) => void;
}

export const Filters = ({ status, type, search, onChange }: Props) => (
  <div className="flex gap-3 flex-wrap">
    <select value={type} onChange={(e) => onChange("type", e.target.value)}
      className="border p-2 rounded">
      <option value="">All Types</option>
      <option value="RETURN">Return</option>
      <option value="EXCHANGE">Exchange</option>
    </select>

    <select value={status} onChange={(e) => onChange("status", e.target.value)}
      className="border p-2 rounded">
      <option value="">All Status</option>
      <option value="PENDING">Pending</option>
      <option value="APPROVED">Approved</option>
      <option value="REJECTED">Rejected</option>
      <option value="COMPLETED">Completed</option>
    </select>

    <input
      value={search}
      onChange={(e) => onChange("search", e.target.value)}
      placeholder="Search Order / Customer"
      className="border p-2 rounded flex-1"
    />
  </div>
);
