import { useMemo, useState } from "react";

import "./produtoLista.css";
import type { Produto } from "../../../../../types/Produto";
import Loading from "../../../../../components/loading/Loading";
import ImagemSelect from "../../../../../components/imgemSelect/ImagemSelect";

interface ProdutoListaProps {
  produtos: Produto[];
  onSelecionar: (produto: Produto) => void;
  onExcluir: (produto: Produto) => void;
  carregando: boolean;
}

function ProdutoLista({
  produtos,
  onSelecionar,
  carregando,
}: ProdutoListaProps) {
  // =========================
  // PESQUISAS
  // =========================

  const [buscaCodigo, setBuscaCodigo] = useState("");

  const [buscaDescricao, setBuscaDescricao] = useState("");

  // =========================
  // FILTRAR PRODUTOS
  // =========================

  const produtosFiltrados = useMemo(() => {
    const codigo = buscaCodigo.trim().toLowerCase();
    const descricao = buscaDescricao.trim().toLowerCase();

    return produtos.filter((produto) => {
      const correspondeCodigo =
        !codigo || produto.codigoBarras.toLowerCase().includes(codigo);

      const correspondeDescricao =
        !descricao || produto.descricao.toLowerCase().includes(descricao);

      return correspondeCodigo && correspondeDescricao;
    });
  }, [produtos, buscaCodigo, buscaDescricao]);

  // =========================
  // RENDER
  // =========================

  if (carregando) return <Loading />;

  return (
    <section className="produtos-lista">
      {/* =========================
          HEADER
      ========================= */}
      <div className="lista-header">
        <h2>Produtos cadastrados</h2>

        <div className="lista-pesquisas">
          {/* CÓDIGO */}

          <input
            type="text"
            value={buscaCodigo}
            onChange={(e) => setBuscaCodigo(e.target.value)}
            placeholder="Código de barras..."
          />

          {/* DESCRIÇÃO */}

          <input
            type="text"
            value={buscaDescricao}
            onChange={(e) => setBuscaDescricao(e.target.value)}
            placeholder="Descrição..."
          />
        </div>
      </div>

      {/* =========================
          TABELA
      ========================= */}

      <div className="produtos-tabela">
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Código</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Estoque</th>
            </tr>
          </thead>

          <tbody>
            {produtosFiltrados.map((produto, index) => (
              <tr
                key={`${produto.codigoBarras}-${index}`}
                onClick={() => onSelecionar(produto)}
              >
                <td>
                  {produto.imagemPatch ? (
                    <ImagemSelect
                      altura={50}
                      largura={50}
                      editavel={false}
                      imagemInicial={produto.imagemPatch}
                    />
                  ) : (
                    <div className="produto-lista-sem-imagem">Sem imagem</div>
                  )}
                </td>

                <td>{produto.codigoBarras}</td>

                <td>{produto.descricao}</td>

                <td>R$ {produto.preco.toFixed(2)}</td>

                <td>{produto.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* NENHUM RESULTADO */}

        {produtosFiltrados.length === 0 && (
          <div className="lista-vazia">Nenhum produto encontrado.</div>
        )}
      </div>
    </section>
  );
}

export default ProdutoLista;
