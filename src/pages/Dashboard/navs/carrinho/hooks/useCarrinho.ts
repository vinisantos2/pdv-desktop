import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../../../../contexts/AuthContext";
import { listarProdutos } from "../../../../../services/produtoService";

import type { Produto } from "../../../../../types/Produto";
import type { ItemVenda } from "../../../../../types/ItemVenda";
import { toast } from "sonner";

export function useCarrinho() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);
  const [ultimoProduto, setUltimoProduto] = useState<Produto | null>(null);
  const [quantidadeUltimoProduto, setQuantidadeUltimoProduto] = useState(0);
  const [carregando, setCarregando] = useState(false);

  // =========================================================
  // BUSCAS
  // =========================================================

  const [buscaCodigo, setBuscaCodigo] = useState("");
  const [buscaNome, setBuscaNome] = useState("");

  const { empresa } = useAuth();

  // =========================================================
  // CARREGAR PRODUTOS
  // =========================================================

  useEffect(() => {
    carregarProdutos();
  }, [empresa?.id]);

  async function carregarProdutos() {
    setCarregando(true);
    try {
      if (!empresa?.id) return;

      const lista = await listarProdutos(empresa.id);

      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setCarregando(false);
    }
  }

  // =========================================================
  // BUSCA POR CÓDIGO
  // =========================================================

  function buscarPorCodigo(codigo?: string) {
    const codigoBusca = (codigo ?? buscaCodigo).trim();

    if (!codigoBusca) return;

    const produto = produtos.find(
      (produto) => produto.codigoBarras.trim() === codigoBusca,
    );

    if (!produto) {
      toast.error("Produto não encontrado");
      return;
    }

    if (produto.estoque === 0) {
      toast.error("Produto sem estoque");
      return;
    }

    adicionarProduto(produto);

    setBuscaCodigo("");
  }

  // =========================================================
  // BUSCA POR NOME
  // =========================================================

  const produtosFiltrados = useMemo(() => {
    const termo = buscaNome.trim().toLowerCase();

    if (!termo) {
      return [];
    }

    return produtos.filter((produto) =>
      produto.descricao.toLowerCase().includes(termo),
    );
  }, [produtos, buscaNome]);

  // =========================================================
  // SELECIONAR PRODUTO DA BUSCA
  // =========================================================

  function selecionarProduto(produto: Produto) {
    adicionarProduto(produto);

    setBuscaNome("");
    setBuscaCodigo("");
  }

  // =========================================================
  // ADICIONAR PRODUTO
  // =========================================================

  function adicionarProduto(produto: Produto) {
    setUltimoProduto(produto);

    setItensVenda((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.codigoBarras === produto.codigoBarras,
      );

      if (itemExistente) {
        // Já atingiu o estoque máximo
        if (itemExistente.quantidade >= produto.estoque) {
          toast.error("Estoque insuficiente");
          return itensAtuais;
        }

        const novaQuantidade = itemExistente.quantidade + 1;

        setQuantidadeUltimoProduto(novaQuantidade);

        return itensAtuais.map((item) =>
          item.codigoBarras === produto.codigoBarras
            ? {
                ...item,
                quantidade: novaQuantidade,
              }
            : item,
        );
      }

      // Produto ainda não está no carrinho
      if (produto.estoque <= 0) {
        return itensAtuais;
      }

      setQuantidadeUltimoProduto(1);

      return [
        ...itensAtuais,
        {
          codigoBarras: produto.codigoBarras,
          descricao: produto.descricao,
          idVenda: "",
          valor: produto.preco,
          quantidade: 1,
          imagemPatch: produto.imagemPatch,
        },
      ];
    });
  }
  // =========================================================
  // ALTERAR QUANTIDADE
  // =========================================================

  function alterarQuantidade(codigoBarras: string, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(codigoBarras);
      return;
    }

    setItensVenda((itens) =>
      itens.map((item) =>
        item.codigoBarras === codigoBarras
          ? {
              ...item,
              quantidade,
            }
          : item,
      ),
    );
  }

  // =========================================================
  // REMOVER ITEM
  // =========================================================

  function removerItem(codigoBarras: string) {
    setItensVenda((itens) =>
      itens.filter((item) => item.codigoBarras !== codigoBarras),
    );
  }

  // =========================================================
  // LIMPAR VENDA
  // =========================================================

  function limparVenda() {
    setItensVenda([]);

    setBuscaCodigo("");
    setBuscaNome("");
  }

  // =========================================================
  // LIMPAR BUSCAS
  // =========================================================

  function limparBusca() {
    setBuscaCodigo("");
    setBuscaNome("");
  }

  // =========================================================
  // RETORNO
  // =========================================================

  return {
    // Produtos
    produtos,
    produtosFiltrados,

    // Venda
    itensVenda,
    ultimoProduto,
    quantidadeUltimoProduto,

    // Busca
    buscaCodigo,
    setBuscaCodigo,

    buscaNome,
    setBuscaNome,

    buscarPorCodigo,

    selecionarProduto,

    limparBusca,
    carregando,

    // Carrinho
    adicionarProduto,
    alterarQuantidade,
    removerItem,
    limparVenda,
  };
}
