import DownloadAtualizacao from "../DownloadAtualizacao/DownloadAtualizacao";

interface Props {
  versao: string;
  mensagem: string;
  baixarAtualizacao: () => void;
  baixando: boolean;
  progresso: number;
  erro: string;
  downloadConcluido: boolean;
}

export default function StatusAtualizacao({
  versao,
  mensagem,
  baixarAtualizacao,
  baixando,
  progresso,
  erro,
  downloadConcluido,
}: Props) {
  return (
    <div className="sobre-app-status atualizacao">
      <div className="status-icon">↑</div>

      <div className="status-conteudo">
        <span className="status-badge">NOVA VERSÃO</span>

        <strong>Versão {versao} disponível</strong>

        <p>{mensagem}</p>

        <DownloadAtualizacao
          baixarAtualizacao={baixarAtualizacao}
          baixando={baixando}
          progresso={progresso}
          erro={erro}
          downloadConcluido={downloadConcluido}
        />
      </div>
    </div>
  );
}
