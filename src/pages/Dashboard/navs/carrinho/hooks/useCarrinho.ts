import { useEffect, useState } from "react";
import { useAuth } from "../../../../../contexts/AuthContext";
import { listarProdutos } from "../../../../../services/produtoService";
import type { Produto } from "../../../../../types/Produto";
import type { ItemVenda } from "../../../../../types/ItemVenda";

export function useCarrinho() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);

  const { empresa } = useAuth();

  useEffect(() => {
    carregarProdutos();
  }, [empresa?.id]);

  async function carregarProdutos() {
    try {
      if (!empresa?.id) return;

      const lista = await listarProdutos(empresa.id);

      setProdutos(lista);
    } catch (error) {
      console.error(error);
    }
  }

  function adicionarProduto(produto: Produto) {
    setItensVenda((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.codigoBarras === produto.codigoBarras,
      );

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.codigoBarras === produto.codigoBarras
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item,
        );
      }

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

  function removerItem(codigoBarras: string) {
    setItensVenda((itens) =>
      itens.filter((item) => item.codigoBarras !== codigoBarras),
    );
  }

  function limparVenda() {
    setItensVenda([]);
  }

  return {
    produtos,
    itensVenda,
    adicionarProduto,
    alterarQuantidade,
    removerItem,
    limparVenda,
  };
}
