import { useState } from "react";

import { useProdutos } from "./hooks/useProdutos";

import ProdutoLista from "./components/ProdutoLista/ProdutoLista";

import HeaderProduto from "./components/HeaderProduto/HeaderProduto";
import ModalProdutos from "./components/ModalProdutos/ModalProdutos";
import "./produtos.css";

function Produtos() {
  const {
    produtos,
    produtoSelecionado,
    carregando,
    buscaCodigo,
    buscaDescricao,
    produtosFiltrados,

    setBuscaCodigo,
    setBuscaDescricao,
    selecionarProduto,
    limparSelecao,
    produtoSalvo,
    excluir,
  } = useProdutos();

  const [modalAberto, setModalAberto] = useState(false);

  function abrirNovoProduto() {
    limparSelecao();
    setModalAberto(true);
  }

  function editarProduto(produto: (typeof produtos)[number]) {
    selecionarProduto(produto);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    limparSelecao();
  }

  return (
    <div className="produtos-page">
      <HeaderProduto
        abrirNovoProduto={abrirNovoProduto}
        buscaCodigo={buscaCodigo}
        setBuscaCodigo={setBuscaCodigo}
        buscaDescricao={buscaDescricao}
        setBuscaDescricao={setBuscaDescricao}
      />

      <main className="produtos-content">
        <ProdutoLista
          produtosFiltrados={produtosFiltrados}
          onSelecionar={editarProduto}
          onExcluir={excluir}
          carregando={carregando}
        />
      </main>

      {modalAberto && (
        <ModalProdutos
          produtoSelecionado={produtoSelecionado}
          onSalvo={produtoSalvo}
          limpar={limparSelecao}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}

export default Produtos;
