import type { ItemVenda } from "../../../../../types/ItemVenda";
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
    <aside className="resumo-venda">
      <div className="resumo-header">
        <h2>Resumo da venda</h2>
        <span>Valores da venda atual</span>
      </div>

      <div className="resumo-informacoes">
        <div className="resumo-linha">
          <span>Total de produtos</span>
          <strong>{totalProdutos}</strong>
        </div>

        <div className="resumo-linha">
          <span>itens</span>
          <strong>{quantidadeItens}</strong>
        </div>

        <div className="resumo-linha">
          <span>Subtotal</span>
          <strong>{formatarMoeda(subtotal)}</strong>
        </div>
      </div>

      <div className="resumo-total">
        <span>Total da venda</span>
        <strong>{formatarMoeda(total)}</strong>
      </div>

      <div className="resumo-acoes">
        <button
          type="button"
          onClick={abriFinalizarVenda}
          className="btn-finalizar"
        >
          Finalizar Venda
          <span>F2</span>
        </button>

        <button type="button" className="btn-cancelar">
          Cancelar Venda
          <span>F3</span>
        </button>
      </div>
    </aside>
  );
}
