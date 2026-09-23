import "./carrinho.css";

import TabelaVenda from "./components/TabelaVenda";
import ResumoVenda from "./components/ResumoVenda";
import { useCarrinho } from "./hooks/useCarrinho";
import { useState } from "react";
import ModalFinalizarVenda from "./components/ModalFinalizarVenda";
import type { Venda } from "../../../../types/Venda";
import ComprovanteVenda from "../../../../components/comprovante/Comprovante";
import { useAuth } from "../../../../contexts/AuthContext";
import ProdutoBusca from "./components/ProdutoBusca ";

export default function Carrinho() {
  const {
    produtos,
    itensVenda,
    adicionarProduto,
    alterarQuantidade,
    removerItem,
    limparVenda,
  } = useCarrinho();

  const [modalAberto, setModalAberto] = useState(false);

  const [comprovanteVenda, setComprovanteVenda] = useState<Venda | null>(null);

  const { empresa } = useAuth();

  function finalizarVenda(venda?: Venda) {
    // Fecha o modal
    setModalAberto(false);

    // Limpa o carrinho
    limparVenda();

    // Se recebeu uma venda, significa que o cliente
    // escolheu "Finalizar e imprimir"
    if (venda) {
      setComprovanteVenda(venda);
    }
  }

  return (
    <div className="carrinho-page">
      {/* ÁREA SUPERIOR */}
      <div className="carrinho-top">
        <ProdutoBusca
          produtos={produtos}
          onSelecionarProduto={adicionarProduto}
        />

        <ResumoVenda
          abrirModal={() => setModalAberto(true)}
          itens={itensVenda}
        />
      </div>

      {/* TABELA */}
      <div className="carrinho-main">
        <TabelaVenda
          itens={itensVenda}
          onAlterarQuantidade={alterarQuantidade}
          onRemoverItem={removerItem}
          onLimparVenda={limparVenda}
        />
      </div>

      {/* MODAL DE FINALIZAÇÃO */}
      {modalAberto && (
        <ModalFinalizarVenda
          aberto={modalAberto}
          itens={itensVenda}
          onFechar={() => setModalAberto(false)}
          onVendaFinalizada={finalizarVenda}
        />
      )}

      {/* COMPROVANTE */}
      {comprovanteVenda && empresa && (
        <ComprovanteVenda
          empresa={empresa}
          venda={comprovanteVenda}
          onVoltar={() => setComprovanteVenda(null)}
        />
      )}
    </div>
  );
}
