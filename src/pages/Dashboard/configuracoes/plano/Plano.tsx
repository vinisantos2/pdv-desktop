import "./plano.css";

export default function Plano() {
  return (
    <div className="plano-page">

      {/* CABEÇALHO */}
      <div className="plano-header">
        <div>
          <h1>Plano e pagamento</h1>

          <p>
            Gerencie seu plano, assinatura e pagamentos.
          </p>
        </div>
      </div>

      {/* PLANO ATUAL */}
      <div className="plano-atual">

        <div className="plano-atual-conteudo">

          <div className="plano-info">
            <span className="plano-label">
              Seu plano atual
            </span>

            <h2>Plano Profissional</h2>

            <p>
              Tenha acesso completo às ferramentas do seu PDV.
            </p>
          </div>

          <div className="plano-preco">
            <strong>
              R$ 49,90
            </strong>

            <span>
              / mês
            </span>
          </div>

        </div>

        <div className="plano-status">
          <span className="status-ponto" />
          Plano ativo
        </div>

      </div>

      {/* INFORMAÇÕES */}
      <div className="plano-grid">

        <div className="plano-card">

          <div className="plano-card-header">
            <div>
              <h3>Próxima cobrança</h3>

              <p>
                Sua assinatura será renovada automaticamente.
              </p>
            </div>
          </div>

          <div className="cobranca-info">

            <strong>
              25 de outubro de 2026
            </strong>

            <span>
              R$ 49,90
            </span>

          </div>

          <button className="btn-plano">
            Gerenciar assinatura
          </button>

        </div>

        <div className="plano-card">

          <div className="plano-card-header">
            <div>
              <h3>Forma de pagamento</h3>

              <p>
                Método utilizado na sua assinatura.
              </p>
            </div>
          </div>

          <div className="pagamento-info">

            <div className="cartao-icon">
              💳
            </div>

            <div>
              <strong>
                Cartão de crédito
              </strong>

              <span>
                •••• •••• •••• 4582
              </span>
            </div>

          </div>

          <button className="btn-plano secundario">
            Alterar pagamento
          </button>

        </div>

      </div>

      {/* RECURSOS */}
      <div className="plano-recursos">

        <div className="plano-recursos-header">
          <div>
            <h2>Recursos do seu plano</h2>

            <p>
              Veja o que está disponível para sua empresa.
            </p>
          </div>
        </div>

        <div className="recursos-lista">

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Produtos ilimitados
            </span>
          </div>

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Controle de vendas
            </span>
          </div>

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Cadastro de clientes
            </span>
          </div>

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Controle de fiados
            </span>
          </div>

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Relatórios
            </span>
          </div>

          <div className="recurso">
            <span className="recurso-check">
              ✓
            </span>

            <span>
              Usuários e funcionários
            </span>
          </div>

        </div>

      </div>

      {/* HISTÓRICO */}
      <div className="plano-historico">

        <div className="plano-recursos-header">
          <div>
            <h2>Histórico de pagamentos</h2>

            <p>
              Consulte os pagamentos realizados pela sua empresa.
            </p>
          </div>
        </div>

        <div className="pagamentos-tabela">

          <div className="pagamento-linha pagamento-titulo">
            <span>Data</span>
            <span>Descrição</span>
            <span>Valor</span>
            <span>Status</span>
          </div>

          <div className="pagamento-linha">
            <span>25/09/2026</span>
            <span>Plano Profissional</span>
            <strong>R$ 49,90</strong>

            <span className="pagamento-status">
              Pago
            </span>
          </div>

          <div className="pagamento-linha">
            <span>25/08/2026</span>
            <span>Plano Profissional</span>
            <strong>R$ 49,90</strong>

            <span className="pagamento-status">
              Pago
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}