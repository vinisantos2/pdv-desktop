import { useCallback, useEffect, useState } from "react";
import type { Produto } from "../../../../../types/Produto";
import { useAuth } from "../../../../../contexts/AuthContext";
import { excluirProduto, listarProdutos } from "../../../../../services/produtoService";

export function useProdutos() {
  // =========================
  // ESTADOS
  // =========================

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null,
  );

  const [carregando, setCarregando] = useState(false);

  const { empresa } = useAuth();

  const empresaId = empresa?.id;

  // =========================
  // CARREGAR PRODUTOS
  // =========================

  const carregarProdutos = useCallback(async () => {
    if (!empresaId) {
      return;
    }

    try {
      setCarregando(true);
      const lista = await listarProdutos(empresaId);
      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setCarregando(false);
    }
  }, [empresaId]);

  // =========================
  // CARREGAR AO ABRIR
  // =========================

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  // =========================
  // SELECIONAR PRODUTO
  // =========================

  function selecionarProduto(produto: Produto) {
    setProdutoSelecionado(produto);
  }

  // =========================
  // LIMPAR SELEÇÃO
  // =========================

  function limparSelecao() {
    setProdutoSelecionado(null);
  }

  // =========================
  // PRODUTO SALVO
  // =========================

  async function produtoSalvo() {
    setProdutoSelecionado(null);

    await carregarProdutos();
  }

  // =========================
  // EXCLUIR PRODUTO
  // =========================

  async function excluir(produto: Produto) {
    if (!empresaId) {
      return;
    }

    const confirmar = window.confirm(
      `Deseja realmente excluir "${produto.descricao}"?`,
    );

    if (!confirmar) {
      return;
    }

    try {
      setCarregando(true);

      await excluirProduto(empresaId, produto.codigoBarras);

      // Remove da lista imediatamente
      setProdutos((lista) =>
        lista.filter((item) => item.codigoBarras !== produto.codigoBarras),
      );

      // Se estava editando esse produto
      if (produtoSelecionado?.codigoBarras === produto.codigoBarras) {
        setProdutoSelecionado(null);
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);

      window.alert("Não foi possível excluir o produto.");
    } finally {
      setCarregando(false);
    }
  }

  // =========================
  // RETORNO
  // =========================

  return {
    produtos,
    produtoSelecionado,
    carregando,

    selecionarProduto,
    limparSelecao,
    produtoSalvo,
    excluir,
    carregarProdutos,
  };
}
