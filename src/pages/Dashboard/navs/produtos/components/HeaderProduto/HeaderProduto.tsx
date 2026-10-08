import InputPadrao from "../../../../../../components/input/InputPadrao";
import "./headerProduto.css";

interface HeaderProdutoProps {
  abrirNovoProduto: () => void;

  buscaCodigo: string;
  setBuscaCodigo: (valor: string) => void;

  buscaDescricao: string;
  setBuscaDescricao: (valor: string) => void;
}

export default function HeaderProduto({
  abrirNovoProduto,
  buscaCodigo,
  setBuscaCodigo,
  buscaDescricao,
  setBuscaDescricao,
}: HeaderProdutoProps) {
  return (
    <header className="produtos-header">

      {/* TOPO */}
      <div className="produtos-header-topo">

        <div className="produtos-titulo">
          <h1>Produtos</h1>
          <p>Cadastro e gerenciamento de produtos.</p>
        </div>

        <button
          type="button"
          className="btn-novo-produto"
          onClick={abrirNovoProduto}
        >
          + Novo produto
        </button>

      </div>

      {/* PESQUISA */}
      <div className="produtos-header-busca">

        <div className="produtos-lista-titulo">
          <h2>Produtos cadastrados</h2>
          <span>Pesquise por código ou descrição</span>
        </div>

        <div className="produtos-lista-pesquisas">

          <div className="produto-busca-codigo">
            <InputPadrao
              type="text"
              value={buscaCodigo}
              onChange={(e) => setBuscaCodigo(e.target.value)}
              placeholder="Código de barras..."
            />
          </div>

          <div className="produto-busca-descricao">
            <InputPadrao
              type="text"
              value={buscaDescricao}
              onChange={(e) => setBuscaDescricao(e.target.value)}
              placeholder="Descrição do produto..."
            />
          </div>

        </div>

      </div>

    </header>
  );
}