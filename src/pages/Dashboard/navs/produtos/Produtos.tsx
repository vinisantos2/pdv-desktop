import "./produtos.css";

import ProdutoForm from "./components/ProdutoForm";
import ProdutoLista from "./components/ProdutoLista";
import { useProdutos } from "./hooks/useProdutos";

function Produtos() {
  const {
    produtos,
    produtoSelecionado,
    carregando,
    selecionarProduto,
    limparSelecao,
    produtoSalvo,
    excluir,
  } = useProdutos();

  return (
    <div className="produtos">
      {/* =========================
          HEADER
      ========================= */}

      <header className="produtos-header">
        <div>
          <h1>Produtos</h1>

          <p>Cadastro e gerenciamento de produtos</p>
        </div>
      </header>

      {/* =========================
          CONTEÚDO
      ========================= */}

      <main className="produtos-conteudo">
        {/* FORMULÁRIO */}

        <ProdutoForm
          produtoSelecionado={produtoSelecionado}
          onSalvo={produtoSalvo}
          limpar={limparSelecao}
        />

        {/* LISTA */}

        <ProdutoLista
          produtos={produtos}
          onSelecionar={selecionarProduto}
          onExcluir={excluir}
          carregando={carregando}
        />
      </main>
    </div>
  );
}

export default Produtos;
