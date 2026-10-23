type Props = {
  recursos: string[];
};

import './recursos.css'

export default function Recursos({ recursos }: Props) {
  return (
    <section className="plano-recursos">
      <div className="plano-recursos-header">
        <div>
          <h2>Recursos do seu plano</h2>
          <p>Veja o que está disponível para sua empresa.</p>
        </div>
      </div>

      <div className="recursos-lista">
        {recursos.map((recurso) => (
          <div className="recurso" key={recurso}>
            <span className="recurso-check">✓</span>
            <span>{recurso}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
