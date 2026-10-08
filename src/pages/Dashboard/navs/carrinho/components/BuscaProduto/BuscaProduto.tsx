
import InputPadrao from "../../../../../../components/input/InputPadrao";

import "./buscaProduto.css";

interface BuscaProdutoProps {
  buscaCodigo: string;
  setBuscaCodigo: React.Dispatch<React.SetStateAction<string>>;

  buscaNome: string;
  setBuscaNome: React.Dispatch<React.SetStateAction<string>>;

  buscarPorCodigo: (codigo?: string) => void;
}

export default function BuscaProduto({
  buscaCodigo,
  setBuscaCodigo,
  buscaNome,
  setBuscaNome,
  buscarPorCodigo,
}: BuscaProdutoProps) {
  function handleCodigoKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      buscarPorCodigo();
    }
  }



  return (
    <div className="busca-produto">
      {/* Código de barras */}

      <div className="busca-produto-codigo">
        <div className="busca-produto-icone">▥</div>

        <div className="busca-produto-input">
          <InputPadrao
            type="text"
            value={buscaCodigo}
            onChange={(event) => setBuscaCodigo(event.target.value)}
            onKeyDown={handleCodigoKeyDown}
            placeholder="Digite o código de barras ou escaneie..."
            autoFocus
          />
        </div>
      </div>

      {/* Busca por nome */}

      <div className="busca-produto-nome">
        <div className="busca-produto-icone">🔎</div>

        <div className="busca-produto-input">
          <InputPadrao
            type="text"
            value={buscaNome}
            onChange={(event) => setBuscaNome(event.target.value)}
            placeholder="Buscar produto por nome..."
          />
        </div>
      </div>
    </div>
  );
}
