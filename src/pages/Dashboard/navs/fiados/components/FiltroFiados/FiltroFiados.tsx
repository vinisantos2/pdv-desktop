import './filtroFiados.css'
interface FiltroFiadosProps {
  busca: string;
  setBusca: (valor: string) => void;
}

export default function FiltroFiados({ busca, setBusca }: FiltroFiadosProps) {
  return (
    <div className="filtro-fiados">
      <div className="filtro-fiados-input">
        <span>🔎</span>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        {busca && (
          <button type="button" onClick={() => setBusca("")}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
