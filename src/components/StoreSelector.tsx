interface Props {
  value: string;
  onChange: (shop: string) => void;
}

const stores = [
  "demo-store.myshopify.com",
  "fashion-hub.myshopify.com",
];

export const StoreSelector = ({ value, onChange }: Props) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border px-3 py-2 rounded"
  >
    {stores.map((store) => (
      <option key={store} value={store}>
        {store}
      </option>
    ))}
  </select>
);
