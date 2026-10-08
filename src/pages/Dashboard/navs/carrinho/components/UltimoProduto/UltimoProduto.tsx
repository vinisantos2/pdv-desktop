import type { Produto } from "../../../../../../types/Produto";
import "./ultimoProduto.css";

interface UltimoProdutoProps {
  produto: Produto | null;
  quantidade: number;
}

export default function UltimoProduto({
  produto,
  quantidade,
}: UltimoProdutoProps) {
  if (!produto) {
    return (
      <section className="ultimo-produto">
        <div className="ultimo-produto-header">
          <span className="ultimo-produto-icone">🔒</span>
          <h2>Último Produto Adicionado</h2>
        </div>

        <div className="ultimo-produto-vazio">
          <span>Nenhum produto adicionado ainda.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="ultimo-produto">
      <div className="ultimo-produto-header">
        <span className="ultimo-produto-icone">🔒</span>

        <h2>Último Produto Adicionado</h2>
      </div>

      <div className="ultimo-produto-conteudo">

        {/* IMAGEM */}
        <div className="ultimo-produto-imagem">
          {produto.imagemPatch ? (
            <img
              src={produto.imagemPatch}
              alt={produto.descricao}
            />
          ) : (
            <span>📦</span>
          )}
        </div>

        {/* PRODUTO */}
        <div className="ultimo-produto-info">
          <strong>{produto.descricao}</strong>

          <span>{produto.codigoBarras}</span>
        </div>

        {/* PREÇO */}
        <div className="ultimo-produto-dado">
          <span>Preço</span>

          <strong>
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </strong>
        </div>

        {/* ESTOQUE */}
        <div className="ultimo-produto-dado">
          <span>Estoque</span>

          <strong>{produto.estoque}</strong>
        </div>

        {/* ADICIONADO */}
        <div className="ultimo-produto-dado">
          <span>Adicionado</span>

          <strong>{quantidade} un.</strong>
        </div>

      </div>
    </section>
  );
}