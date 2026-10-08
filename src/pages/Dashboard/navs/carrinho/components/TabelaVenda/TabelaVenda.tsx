import type { ItemVenda } from "../../../../../../types/ItemVenda";
import { Trash2 } from "lucide-react";

import "./tabelaVenda.css";
import type { Produto } from "../../../../../../types/Produto";

interface TabelaVendaProps {
  itens: ItemVenda[];

  onAlterarQuantidade: (codigoBarras: string, quantidade: number) => void;

  onRemoverItem: (codigoBarras: string) => void;

  onLimparVenda: () => void;
  adicionarProduto: (produto: Produto) => void;
  produtos: Produto[];
}

export default function TabelaVenda({
  itens,
  onAlterarQuantidade,
  onRemoverItem,
  onLimparVenda,
  adicionarProduto,
  produtos,
}: TabelaVendaProps) {
  function calcularTotalItem(item: ItemVenda) {
    return item.valor * item.quantidade;
  }

  return (
    <section className="tabela-venda">
      {/* Cabeçalho */}

      <div className="tabela-venda-header">
        <div>
          <h2>Itens da venda</h2>

          <span>
            {itens.length} {itens.length === 1 ? "item" : "itens"}
          </span>
        </div>

        {itens.length > 0 && (
          <button
            type="button"
            className="tabela-venda-limpar"
            onClick={onLimparVenda}
          >
            Limpar venda
          </button>
        )}
      </div>

      {/* Conteúdo */}

      {itens.length === 0 ? (
        <div className="tabela-venda-vazia">
          <span className="tabela-venda-vazia-icone">🛒</span>

          <strong>Nenhum produto adicionado</strong>

          <span>Escaneie um produto ou selecione um produto rápido.</span>
        </div>
      ) : (
        <div className="tabela-venda-scroll">
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Código</th>
                <th>Quantidade</th>
                <th>Valor unitário</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {itens.map((item) => (
                <tr key={item.codigoBarras}>
                  <td>
                    <div className="tabela-venda-produto">
                      <div className="tabela-venda-imagem">
                        {item.imagemPatch ? (
                          <img src={item.imagemPatch} alt={item.descricao} />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>

                      <span>{item.descricao}</span>
                    </div>
                  </td>

                  <td>
                    <span className="tabela-venda-codigo">
                      {item.codigoBarras}
                    </span>
                  </td>

                  <td>
                    <div className="tabela-venda-quantidade">
                      <button
                        type="button"
                        onClick={() =>
                          onAlterarQuantidade(
                            item.codigoBarras,
                            item.quantidade - 1,
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantidade}</span>

                      <button
                        type="button"
                        onClick={() => {
                          const produto = produtos.find(
                            (produto) =>
                              produto.codigoBarras === item.codigoBarras,
                          );
                          adicionarProduto(produto!);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>R$ {item.valor.toFixed(2).replace(".", ",")}</td>

                  <td>
                    <strong>
                      R$ {calcularTotalItem(item).toFixed(2).replace(".", ",")}
                    </strong>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="tabela-venda-remover"
                      onClick={() => onRemoverItem(item.codigoBarras)}
                      title="Remover produto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
