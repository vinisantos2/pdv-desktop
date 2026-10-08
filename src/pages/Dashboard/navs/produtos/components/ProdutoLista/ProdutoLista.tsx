import type { Produto } from "../../../../../../types/Produto";

import Loading from "../../../../../../components/loading/Loading";
import ImagemSelect from "../../../../../../components/imgemSelect/ImagemSelect";

import "./produtoLista.css";

interface ProdutoListaProps {
  onSelecionar: (produto: Produto) => void;
  onExcluir: (produto: Produto) => void;
  carregando: boolean;
  produtosFiltrados: Produto[];
}

function ProdutoLista({
  onSelecionar,
  onExcluir,
  carregando,
  produtosFiltrados,
}: ProdutoListaProps) {

  if (carregando) {
    return <Loading />;
  }

  return (
    <section className="produtos-lista">

      {/* CABEÇALHO DA TABELA */}
      <table className="produtos-tabela produtos-tabela-header">
        <thead>
          <tr>
            <th className="col-imagem">Imagem</th>
            <th className="col-codigo">Código</th>
            <th className="col-descricao">Descrição</th>
            <th className="col-preco">Preço</th>
            <th className="col-estoque">Estoque</th>
            <th className="col-acoes">Ações</th>
          </tr>
        </thead>
      </table>

      {/* CORPO COM SCROLL */}
      <div className="produtos-tabela-scroll">

        <table className="produtos-tabela">

          <tbody>
            {produtosFiltrados.length > 0 ? (

              produtosFiltrados.map((produto) => (

                <tr key={produto.codigoBarras}>

                  {/* IMAGEM */}
                  <td className="col-imagem">

                    {produto.imagemPatch ? (
                      <ImagemSelect
                        altura={45}
                        largura={45}
                        editavel={false}
                        imagemInicial={produto.imagemPatch}
                      />
                    ) : (
                      <div className="produto-sem-imagem">
                        Sem imagem
                      </div>
                    )}

                  </td>

                  {/* CÓDIGO */}
                  <td className="col-codigo">
                    <span className="produto-codigo">
                      {produto.codigoBarras}
                    </span>
                  </td>

                  {/* DESCRIÇÃO */}
                  <td className="col-descricao">
                    <span
                      className="produto-descricao"
                      title={produto.descricao}
                    >
                      {produto.descricao}
                    </span>
                  </td>

                  {/* PREÇO */}
                  <td className="col-preco">
                    <span className="produto-preco">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                  </td>

                  {/* ESTOQUE */}
                  <td className="col-estoque">

                    <span
                      className={
                        produto.estoque > 0
                          ? "produto-estoque"
                          : "produto-estoque produto-estoque-zero"
                      }
                    >
                      {produto.estoque}
                    </span>

                  </td>

                  {/* AÇÕES */}
                  <td className="col-acoes">

                    <div className="produto-acoes">

                      <button
                        type="button"
                        className="btn-editar-produto"
                        onClick={() => onSelecionar(produto)}
                        title="Editar produto"
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        className="btn-excluir-produto"
                        onClick={() => onExcluir(produto)}
                        title="Excluir produto"
                      >
                        🗑️
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan={6}
                  className="produtos-sem-registros"
                >
                  Nenhum produto encontrado.
                </td>
              </tr>

            )}
          </tbody>

        </table>

      </div>

    </section>
  );
}

export default ProdutoLista;