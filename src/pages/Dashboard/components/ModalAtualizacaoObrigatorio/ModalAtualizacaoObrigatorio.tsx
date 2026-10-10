import { useNavigate } from "react-router-dom";
import { ROTAS } from "../../../../constanst/rotas";
import "./modalAtualizacaoObrigatorio.css";

type Props = {
  versao: string;
  mensagem?: string;
};

export default function ModalAtualizacaoObrigatorio({
  versao,
  mensagem,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="modal-atualizacao-overlay">
      <section
        className="modal-atualizacao-obrigatorio"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-atualizacao-titulo"
        aria-describedby="modal-atualizacao-descricao"
      >
        <div className="modal-atualizacao-icone">!</div>

        <h2 id="modal-atualizacao-titulo">Atualização obrigatória</h2>

        <p id="modal-atualizacao-descricao">
          Uma nova versão do PDV VS-Tech é necessária para continuar utilizando
          o sistema.
        </p>

        <div className="modal-atualizacao-versao">
          <span>Nova versão disponível</span>
          <strong>{versao}</strong>
        </div>

        {mensagem && (
          <div className="modal-atualizacao-mensagem">{mensagem}</div>
        )}

        <p className="modal-atualizacao-aviso">
          Acesse a tela Sobre para consultar as informações e realizar a
          atualização do sistema.
        </p>

        <button
          type="button"
          className="modal-atualizacao-botao"
          onClick={() => navigate(ROTAS.DASHBOARD.CONFIGURACOES.SOBRE)}
        >
          Ver atualização
        </button>
      </section>
    </div>
  );
}
