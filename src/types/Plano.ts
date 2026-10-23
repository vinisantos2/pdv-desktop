export type TipoPlano = "basic" | "premium" | "profissional" | "teste";

export type PlanoConfig = {
  nome: string;
  preco: number;
  descricao: string;
  recursos: string[];
};

export const PLANOS: Record<TipoPlano, PlanoConfig> = {
  basic: {
    nome: "Basic",
    preco: 29.9,
    descricao: "Recursos essenciais para o seu negócio.",
    recursos: [
      "Cadastro de produtos",
      "Controle de vendas",
      "Cadastro de clientes",
    ],
  },

  premium: {
    nome: "Premium",
    preco: 39.9,
    descricao: "Mais recursos para gerenciar sua empresa.",
    recursos: [
      "Produtos ilimitados",
      "Controle de vendas",
      "Cadastro de clientes",
      "Controle de fiados",
      "Relatórios",
    ],
  },

  profissional: {
    nome: "Profissional",
    preco: 49.9,
    descricao: "Acesso completo às ferramentas do seu PDV.",
    recursos: [
      "Produtos ilimitados",
      "Controle de vendas",
      "Cadastro de clientes",
      "Controle de fiados",
      "Relatórios",
      "Usuários e funcionários",
    ],
  },
  teste: {
    nome: "Teste",
    preco: 0.0,
    descricao: "Acesso completo às ferramentas do seu PDV.",
    recursos: [
      "Produtos ilimitados",
      "Controle de vendas",
      "Cadastro de clientes",
      "Controle de fiados",
      "Relatórios",
      "Usuários e funcionários",
    ],
  },
};
