import { useState } from "react";
import "./carrinho.css";

import BuscaProduto from "./components/BuscaProduto/BuscaProduto";
import ProdutosRapidos from "./components/ProdutosRapidos/ProdutosRapidos";
import ResumoVenda from "./components/ResumoVenda/ResumoVenda";
import TabelaVenda from "./components/TabelaVenda/TabelaVenda";
import UltimoProduto from "./components/UltimoProduto/UltimoProduto";

import { useCarrinho } from "./hooks/useCarrinho";
import ModalFinalizarVenda from "./components/ModalFinalizarVenda/ModalFinalizarVenda";

import type { Venda } from "../../../../types/Venda";
import ComprovanteVenda from "../../../../components/comprovante/Comprovante";
import { useAuth } from "../../../../contexts/AuthContext";

export default function Carrinho() {
  const [modalAberto, setModalAberto] = useState(false);

  const [comprovanteVenda, setComprovanteVenda] = useState<Venda | null>(null);
  const { empresa } = useAuth();
  if (!empresa) return;

  const {
    produtos,
    produtosFiltrados,
    adicionarProduto,
    buscaCodigo,
    setBuscaCodigo,
    buscaNome,
    setBuscaNome,
    buscarPorCodigo,
    itensVenda,
    alterarQuantidade,
    carregando,
    removerItem,
    limparVenda,
    carregarProdutos,
    ultimoProduto,
    quantidadeUltimoProduto,
  } = useCarrinho();

  function finalizarVenda(venda?: Venda) {
    // Fecha o modal
    setModalAberto(false);

    // Limpa o carrinho
    limparVenda();

    // Se recebeu a venda, abre o comprovante
    if (venda) {
      setComprovanteVenda(venda);
    }
  }

  function fecharComprovante() {
    setComprovanteVenda(null);
  }

  return (
    <div className="carrinho-page">
      <div className="carrinho-busca">
        <BuscaProduto
          buscaCodigo={buscaCodigo}
          setBuscaCodigo={setBuscaCodigo}
          buscaNome={buscaNome}
          setBuscaNome={setBuscaNome}
          buscarPorCodigo={buscarPorCodigo}
        />
      </div>

      <ProdutosRapidos
        carregando={carregando}
        produtos={buscaNome.length > 0 ? produtosFiltrados : produtos}
        onAdicionarProduto={adicionarProduto}
      />

      <div className="carrinho-conteudo">
        <main className="carrinho-principal">
          <TabelaVenda
            itens={itensVenda}
            onAlterarQuantidade={alterarQuantidade}
            onRemoverItem={removerItem}
            onLimparVenda={limparVenda}
            adicionarProduto={adicionarProduto}
            produtos={produtos}
          />
        </main>

        <aside className="carrinho-lateral">
          <UltimoProduto
            produto={ultimoProduto}
            quantidade={quantidadeUltimoProduto}
          />

          <ResumoVenda
            abrirModal={() => setModalAberto(true)}
            itens={itensVenda}
          />
        </aside>
      </div>

      {modalAberto && (
        <ModalFinalizarVenda
          itens={itensVenda}
          onFechar={() => {
            carregarProdutos()
            setModalAberto(false);
           
          }}
          onVendaFinalizada={finalizarVenda}
          aberto={modalAberto}
        />
      )}

      {comprovanteVenda && (
        <ComprovanteVenda
          empresa={empresa}
          venda={comprovanteVenda}
          onVoltar={fecharComprovante}
        />
      )}
    </div>
  );
}
