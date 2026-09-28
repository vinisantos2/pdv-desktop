export const ROTAS = {
  LOGIN: "/",

  DASHBOARD: {
    INDEX: "/Dashboard",

    INICIO: "/Dashboard/Inicio",

    PRODUTOS: "/Dashboard/Produtos",

    CARRINHO: "/Dashboard/Carrinho",

    CLIENTES: "/Dashboard/Clientes",

    FIADOS: {
      INDEX: "/Dashboard/Fiados",
      DETALHES: "/Dashboard/Fiados/Detalhes",
    },

    RELATORIOS: "/Dashboard/Relatorios",

    CONFIGURACOES: {
      EMPRESA: "/Dashboard/Configuracoes/Empresa",

      USUARIOS: "/Dashboard/Configuracoes/Usuarios",

      PLANO: "/Dashboard/Configuracoes/Plano",

      PERMISSOES: "/Dashboard/Configuracoes/Permissoes",

      SOBRE: "/Dashboard/Configuracoes/Sobre",
    },
  },
} as const;