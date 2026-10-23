import { buscarPlano } from "../../../../../constanst/plano";
import "./detalhesPlano.css";

interface DetalhesPlanoProps {
  plano?: string | null;
}

export default function DetalhesPlano({
  plano: planoAtual,
}: DetalhesPlanoProps) {
  const plano = buscarPlano(planoAtual);

  if (!plano) {
    return (
      <aside className="detalhes-plano">
        <div className="detalhes-plano-topo">
          <span className="detalhes-plano-icone">✦</span>
          <span className="detalhes-plano-label">PLANO CONTRATADO</span>
        </div>

        <h2>Plano não identificado</h2>

        <p className="detalhes-plano-descricao">
          Não foi possível identificar o plano associado a esta empresa.
        </p>

        <div className="detalhes-plano-aviso">
          Consulte o administrador do sistema para verificar seu plano.
        </div>
      </aside>
    );
  }

  return (
    <aside className="detalhes-plano">
      <div className="detalhes-plano-topo">
        <span className="detalhes-plano-icone">✦</span>

        <span className="detalhes-plano-label">SEU PLANO</span>
      </div>

      <div className="detalhes-plano-titulo">
        <h2>{plano.nome}</h2>
        <span className={`detalhes-plano-badge plano-${plano.id}`}>
          {plano.nome}
        </span>
      </div>

      <p className="detalhes-plano-descricao">{plano.descricao}</p>

      <div className="detalhes-plano-divisor" />

      <div className="detalhes-plano-recursos-header">
        <h3>O que está incluído</h3>
        <span>{plano.recursos.length} recursos</span>
      </div>

      <ul className="detalhes-plano-lista">
        {plano.recursos.map((recurso) => (
          <li key={recurso}>
            <span className="detalhes-plano-check">✓</span>
            <span>{recurso}</span>
          </li>
        ))}
      </ul>

      <div className="detalhes-plano-aviso">
        <span>ⓘ</span>
        <p>
          Os recursos são definidos pelo plano contratado. Esta tela é somente
          para consulta.
        </p>
      </div>
    </aside>
  );
}
