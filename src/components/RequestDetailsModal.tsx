import { useToast } from "../context/ToastContext";
import type { RequestStatus, ReturnExchangeRequest } from "../types";

interface Props {
  request: ReturnExchangeRequest;
  onClose: () => void;
  onUpdate: (id: string, status: RequestStatus) => void;
}

export const RequestDetailsModal = ({ request, onClose, onUpdate }: Props) => {
  const { addToast } = useToast(); 

  const handleUpdate = async (status: RequestStatus) => {
    onUpdate(request.id, status);

    let message = "";
    switch (status) {
      case "APPROVED":
        message = `Request ${request.orderId} approved!`;
        break;
      case "REJECTED":
        message = `Request ${request.orderId} rejected.`;
        break;
      case "COMPLETED":
        message = `Request ${request.orderId} marked as completed!`;
        break;
    }
    addToast(message, status === "REJECTED" ? "error" : "success");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold">{request.orderId}</h2>
        <p className="text-sm text-gray-500">{request.customerName}</p>

        <div className="mt-4 space-y-1">
          <p><b>Type:</b> {request.type}</p>
          <p><b>Reason:</b> {request.reason}</p>
          <p><b>Status:</b> {request.status}</p>
        </div>

        <h3 className="mt-4 font-semibold">Products</h3>
        <ul className="list-disc ml-5">
          {request.products.map((p) => (
            <li key={p.name}>{p.name} × {p.quantity}</li>
          ))}
        </ul>

        <div className="flex justify-end gap-2 mt-6">
          {request.status === "PENDING" && (
            <>
              <button
                onClick={() => handleUpdate("APPROVED")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdate("REJECTED")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </>
          )}
          {request.status === "APPROVED" && (
            <button
              onClick={() => handleUpdate("COMPLETED")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Complete
            </button>
          )}
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
