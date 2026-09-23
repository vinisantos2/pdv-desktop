import './estoqueBaixo.css'
import type { Produto } from "../../../../../types/Produto";

interface EstoqueBaixoProps {
  produtos: Produto[];
}

export default function EstoqueBaixo({ produtos }: EstoqueBaixoProps) {
  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <h2>Estoque baixo</h2>

        <p>Produtos que precisam de atenção</p>
      </div>
      {produtos.length === 0 ? (
        <div className="empty-state">
          <span>📦</span>

          <strong>Nenhum produto com estoque baixo</strong>

          <small>Todos os produtos estão com estoque adequado.</small>
        </div>
      ) : (
        <div className="estoque-lista">
          {produtos.map((produto) => (
            <div className="estoque-item" key={produto.codigoBarras}>
              <div>
                <strong>{produto.descricao}</strong>

                <small>Estoque atual</small>
              </div>

              <span>{produto.estoque} un.</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
