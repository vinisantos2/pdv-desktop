import type { Pagamento } from "./Pagamento";
import type { TipoPlano } from "./Plano";

export type StatusEmpresa = "ativo" | "inativo" | "cancelado";

export type Empresa = {
  id: string;
  nome: string;
  cnpj: string;
  logo?: string;
  status: StatusEmpresa;
  criadoEm: Date;
  plano: TipoPlano;
  ultimoAcesso: Date;
  versao: string;
  usuarios: string[];
  pagamentos?: Pagamento[];
};
