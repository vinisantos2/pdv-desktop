import type { Timestamp } from "firebase/firestore";

export type Usuario = {
  uid: string;
  nome: string;
  email: string;
  telefone: string;
  empresaId: string;
  perfil: Perfil;
  ativo: boolean;
  ultimoAcesso: Timestamp;
  criadoEm: Date;
};
export type Perfil = "admin" | "funcionario";
