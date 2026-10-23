import type { Timestamp } from "firebase/firestore";

export type StatusPagamento = "pendente" | "pago";

export type Pagamento = {
  id: string;
  data: Timestamp;
  descricao: string;
  valor: number;
  status: StatusPagamento;
};