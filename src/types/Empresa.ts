export type Empresa = {
  id: string;
  nome: string;
  cnpj: string;
  logo?: string;
  ativo: boolean;
  criadoEm: Date;
  plano: string;
  ultimoAcesso: Date;
  versao: string;
  usuarios: string[];
};
