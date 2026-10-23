import type { PlanoConfig } from "../../../../../../types/Plano";

type Props = {
  plano?: PlanoConfig;
  status?: string;
};
import "./atual.css"

export default function Atual({ plano, status }: Props) {
  return (
    <section className="plano-atual">
      <div className="plano-atual-conteudo">
        <div className="plano-info">
          <span className="plano-label">Seu plano atual</span>

          <h2>{plano?.nome ?? "Nenhum plano contratado"}</h2>

          <p>{plano?.descricao ?? "Escolha um plano para sua empresa."}</p>
        </div>

        {plano && (
          <div className="plano-preco">
            <strong>
              {plano.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <span>/ mês</span>
          </div>
        )}
      </div>

      <div className="plano-status">
        <span className="status-ponto" />
        {status === "ativo"
          ? "Plano ativo"
          : status === "pendente"
            ? "Pagamento pendente"
            : status === "cancelado"
              ? "Plano cancelado"
              : "Sem assinatura ativa"}
      </div>
    </section>
  );
}
