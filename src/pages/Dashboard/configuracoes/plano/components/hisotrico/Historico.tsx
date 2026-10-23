import type { Pagamento } from "../../../../../../types/Pagamento";

type Props = {
  pagamentos: Pagamento[];
};

function formatarData(data: Pagamento["data"]) {
  return data.toDate().toLocaleDateString("pt-BR");
}

function formatarValor(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

import './historic.css'
export default function Historico({ pagamentos }: Props) {
  return (
    <section className="plano-historico">
      <div className="plano-recursos-header">
        <div>
          <h2>Histórico de pagamentos</h2>
          <p>Consulte os pagamentos da sua assinatura.</p>
        </div>
      </div>

      <div className="pagamentos-tabela">
        <div className="pagamento-linha pagamento-titulo">
          <span>Data</span>
          <span>Descrição</span>
          <span>Valor</span>
          <span>Status</span>
        </div>

        {pagamentos.length === 0 ? (
          <p className="pagamentos-vazio">Nenhum pagamento registrado.</p>
        ) : (
          pagamentos.map((pagamento) => (
            <div className="pagamento-linha" key={pagamento.id}>
              <span>{formatarData(pagamento.data)}</span>
              <span>{pagamento.descricao}</span>
              <strong>{formatarValor(pagamento.valor)}</strong>

              <span
                className={`pagamento-status ${
                  pagamento.status === "pago" ? "pago" : "pendente"
                }`}
              >
                {pagamento.status === "pago" ? "Pago" : "Pendente"}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
