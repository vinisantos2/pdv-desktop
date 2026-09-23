export const ROTAS = {
  LOGIN: "/",
  DASHBOARD: {
    INDEX: "/Dashboard",
    INICIO: "Dashboard/navs/Inicio",
    PRODUTOS: "/Dashboard/Produtos",
    CARRINHO: "/Dashboard/Carrinho",
    CLIENTES: "/Dashboard/Clientes",
    FIADOS: {
      INDEX: "/Dashboard/Fiados",
      DETALHES: "/Dashboard/Fiados/Detalhes",
    },
    CONFIGURACOES: "/Dashboard/Configuracoes",
    RELATORIOS: "/Dashboard/Relatorios",
  },
} as const;
