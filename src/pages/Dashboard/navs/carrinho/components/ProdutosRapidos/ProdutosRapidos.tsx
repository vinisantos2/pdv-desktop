import Loading from "../../../../../../components/loading/Loading";
import type { Produto } from "../../../../../../types/Produto";

import "./produtosRapidos.css";

interface ProdutosRapidosProps {
  produtos: Produto[];
  onAdicionarProduto: (produto: Produto) => void;
  carregando: boolean;
}

export default function ProdutosRapidos({
  produtos,
  onAdicionarProduto,
  carregando,
}: ProdutosRapidosProps) {
  if (carregando) return <Loading />;
  return (
    <section className="produtos-rapidos">
      <div className="produtos-rapidos-header">
        <h2>Produtos rápidos</h2>
      </div>

      <div className="produtos-rapidos-lista">
        {produtos.map((produto) => {
          const semEstoque = produto.estoque <= 0;

          return (
            <button
              key={produto.codigoBarras}
              type="button"
              className={`produto-rapido ${
                semEstoque ? "produto-sem-estoque" : ""
              }`}
              onClick={() => onAdicionarProduto(produto)}
              disabled={semEstoque}
            >
              <div className="produto-rapido-imagem">
                {produto.imagemPatch ? (
                  <img src={produto.imagemPatch} alt={produto.descricao} />
                ) : (
                  <span>📦</span>
                )}
              </div>

              <div className="produto-rapido-info">
                <span className="produto-rapido-descricao">
                  {produto.descricao}
                </span>

                <strong className="produto-rapido-preco">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </strong>

                <span className="produto-rapido-estoque">
                  Estoque: {produto.estoque}
                </span>

                {semEstoque && (
                  <span className="produto-rapido-indisponivel">
                    Sem estoque
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
