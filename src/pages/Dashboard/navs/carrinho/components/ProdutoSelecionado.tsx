export default function ProdutoSelecionado() {
  return (
    <div className="produto-selecionado">

      <div className="produto-selecionado-header">
        Último produto inserido
      </div>

      <div className="produto-detalhes">

        <div>
          <span>Código</span>
          <strong>7894900011517</strong>
        </div>

        <div>
          <span>Descrição</span>
          <strong>Coca-Cola Lata 350ml</strong>
        </div>

        <div>
          <span>Preço</span>
          <strong>R$ 5,00</strong>
        </div>

        <div>
          <span>Estoque</span>
          <strong>120</strong>
        </div>

      </div>

      <div className="quantidade-produto">
        <button>-</button>

        <span>1</span>

        <button>+</button>
      </div>

      <button className="btn-adicionar">
        Adicionar à venda
        <span>Enter</span>
      </button>

    </div>
  );
}