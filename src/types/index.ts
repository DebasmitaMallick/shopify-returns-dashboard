export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED";

export type RequestType = "RETURN" | "EXCHANGE";

export interface Product {
  name: string;
  quantity: number;
}

export interface ReturnExchangeRequest {
  id: string;
  shop: string;
  orderId: string;
  customerName: string;
  type: RequestType;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  products: Product[];
  notes?: string;
}
