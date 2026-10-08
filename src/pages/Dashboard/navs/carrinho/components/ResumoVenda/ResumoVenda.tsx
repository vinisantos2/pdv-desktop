import type { ItemVenda } from "../../../../../../types/ItemVenda";
import "./resumoVenda.css";

interface ResumoVendaProps {
  itens: ItemVenda[];
  abrirModal: () => void;
}

export default function ResumoVenda({ itens, abrirModal }: ResumoVendaProps) {
  const totalProdutos = itens.length;

  const quantidadeItens = itens.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  const subtotal = itens.reduce(
    (total, item) => total + Number(item.valor) * item.quantidade,
    0,
  );

  const total = subtotal;

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function abriFinalizarVenda() {
    if (itens.length > 0) {
      abrirModal();
    }
  }
  return (
    <section className="resumo-venda">
      {/* =====================================================
          CABEÇALHO
          ===================================================== */}

      <div className="resumo-venda-header">
        <div>
          <h2>Resumo da venda</h2>

          <span>{totalProdutos} itens</span>
        </div>
      </div>

      {/* =====================================================
          VALORES
          ===================================================== */}

      <div className="resumo-venda-valores">
        <div className="resumo-venda-total">
          <span>Total</span>

          <strong>{formatarMoeda(total)}</strong>
        </div>
      </div>

      <button
        type="button"
        onClick={abriFinalizarVenda}
        className="resumo-venda-finalizar"
      >
        Finalizar venda
        <span>F2</span>
      </button>
    </section>
  );
}
