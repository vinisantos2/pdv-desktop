import { useEffect } from "react";
import type { ItemVenda } from "../../../../../../types/ItemVenda";
import "./resumoVenda.css";

interface ResumoVendaProps {
  itens: ItemVenda[];
  abrirModal: () => void;
}

export default function ResumoVenda({
  itens,
  abrirModal,
}: ResumoVendaProps) {

  const totalProdutos = itens.length;

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

  function abrirFinalizarVenda() {
    if (itens.length > 0) {
      abrirModal();
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    console.log(event)
    if (event.key === "F2") {
      event.preventDefault();
      abrirFinalizarVenda();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itens.length]);

  return (
    <section className="resumo-venda">

      <div className="resumo-venda-header">
        <div>
          <h2>Resumo da venda</h2>

          <span>{totalProdutos} itens</span>
        </div>
      </div>

      <div className="resumo-venda-valores">
        <div className="resumo-venda-total">
          <span>Total</span>

          <strong>{formatarMoeda(total)}</strong>
        </div>
      </div>

      <button
        type="button"
        onClick={abrirFinalizarVenda}
        className="resumo-venda-finalizar"
      >
        Finalizar venda
        <span>F2</span>
      </button>

    </section>
  );
}