import { Timestamp } from "firebase/firestore";
import type { ItemVenda } from "./ItemVenda";

export type Venda = {
  id: string;
  data: Timestamp;
  total: number;
  formaPagamento: "dinheiro" | "pix" | "cartao" | "fiado";
  // Cliente da venda fiada
  clienteId?: string;
  clienteNome?: string;
  // Controle do pagamento
  statusPagamento: "pendente" | "pago";
  dataPagamento?: Timestamp;
  itens: ItemVenda[];
};
