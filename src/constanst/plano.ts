export type PlanoId = "teste" | "basic" | "premium";

export interface Plano {
  id: PlanoId;
  nome: string;
  descricao: string;
  recursos: string[];
}

export const PLANOS: Record<PlanoId, Plano> = {
  teste: {
    id: "teste",
    nome: "Teste",
    descricao: "Conheça as funcionalidades do PDV.",
    recursos: [
      "Cadastro de produtos",
      "Registro de vendas",
      "Consulta de vendas",
    ],
  },

  basic: {
    id: "basic",
    nome: "Basic",
    descricao: "Para pequenos estabelecimentos.",
    recursos: [
      "Cadastro de produtos",
      "Registro de vendas",
      "Controle de estoque",
      "Cadastro de clientes",
      "Relatórios básicos",
    ],
  },

  premium: {
    id: "premium",
    nome: "Premium",
    descricao: "Mais recursos para gerenciar seu negócio.",
    recursos: [
      "Todos os recursos do Basic",
      "Controle de vendas fiadas",
      "Relatórios avançados",
      "Gerenciamento de usuários",
      "Histórico de vendas",
    ],
  },
};

export function buscarPlano(plano?: string | null): Plano | null {
  if (!plano) return null;

  const id = plano.trim().toLowerCase();

  if (id in PLANOS) {
    return PLANOS[id as PlanoId];
  }

  return null;
}
