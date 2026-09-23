import "./ultimasVendas.css";
import type { Venda } from "../../../../../types/Venda";

interface UltimasVendasProps {
  vendas: Venda[];
}

export default function UltimasVendas({ vendas }: UltimasVendasProps) {
  const vendasFitradas = vendas.filter(
    (item) => item.formaPagamento !== "fiado",
  );
  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h2>Últimas vendas</h2>

        <p>Movimentações recentes</p>
      </div>
      {vendas.length === 0 ? (
        <div className="empty-state">
          <span>🛒</span>

          <strong>Nenhuma venda realizada</strong>

          <small>As vendas realizadas aparecerão aqui.</small>
        </div>
      ) : (
        <div className="vendas-lista">
          {vendasFitradas.map((venda) => (
            <div className="venda-item" key={venda.id}>
              <strong>{venda.data.toDate().toLocaleString("pt-BR")}</strong>

              <span>R$ {venda.total.toFixed(2).replace(".", ",")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
