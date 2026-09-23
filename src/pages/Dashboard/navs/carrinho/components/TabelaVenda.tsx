import type { ItemVenda } from "../../../../../types/ItemVenda";
import "./tabelaVenda.css";

interface TabelaVendaProps {
  itens: ItemVenda[];
  onAlterarQuantidade: (codigoBarras: string, quantidade: number) => void;
  onRemoverItem: (codigoBarras: string) => void;
  onLimparVenda: () => void;
}

export default function TabelaVenda({
  itens,
  onAlterarQuantidade,
  onRemoverItem,
  onLimparVenda,
}: TabelaVendaProps) {
  return (
    <div className="tabela-container">
      <div className="tabela-header">
        <div>
          <h2>Itens da venda</h2>
          <span>
            {itens.length === 0
              ? "Nenhum produto adicionado"
              : `${itens.length} produto(s) adicionado(s)`}
          </span>
        </div>

        <button
          className="btn-limpar-tabela"
          type="button"
          onClick={onLimparVenda}
          disabled={itens.length === 0}
        >
          Limpar venda
        </button>
      </div>

      <div className="tabela-scroll">
        <table className="tabela-venda">
          <thead>
            <tr>
              <th>#</th>
              <th>Código</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unit.</th>
              <th>Subtotal</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {itens.length === 0 ? (
              <tr>
                <td colSpan={7} className="tabela-vazia">
                  Nenhum produto na venda
                </td>
              </tr>
            ) : (
              itens.map((item, index) => {
                const valorUnitario = Number(item.valor);

                const subtotal = valorUnitario * item.quantidade;

                return (
                  <tr key={item.codigoBarras}>
                    <td>{index + 1}</td>

                    <td>{item.codigoBarras}</td>

                    <td className="descricao-produto">{item.descricao}</td>

                    <td>
                      <div className="quantidade-tabela">
                        <button
                          type="button"
                          onClick={() =>
                            onAlterarQuantidade(
                              item.codigoBarras,
                              item.quantidade - 1,
                            )
                          }
                        >
                          -
                        </button>

                        <span>{item.quantidade}</span>

                        <button
                          type="button"
                          onClick={() =>
                            onAlterarQuantidade(
                              item.codigoBarras,
                              item.quantidade + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>R$ {valorUnitario.toFixed(2)}</td>

                    <td className="subtotal">R$ {subtotal.toFixed(2)}</td>

                    <td>
                      <button
                        type="button"
                        className="btn-remover-item"
                        onClick={() => onRemoverItem(item.codigoBarras)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
