import "./downloadAtualizacao.css";

interface Props {
  baixarAtualizacao: () => void;
  baixando: boolean;
  progresso: number;
  erro: string;
  downloadConcluido: boolean;
}

export default function DownloadAtualizacao({
  baixarAtualizacao,
  baixando,
  progresso,
  erro,
  downloadConcluido,
}: Props) {
  return (
    <div className="download-atualizacao">
      <button
        onClick={baixarAtualizacao}
        disabled={baixando || downloadConcluido}
      >
        {baixando
          ? `Baixando... ${progresso}%`
          : downloadConcluido
            ? "Download concluído"
            : "Baixar atualização"}
      </button>

      {(baixando || downloadConcluido) && (
        <div
          className="download-progresso"
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="download-progresso-barra"
            style={{ width: `${progresso}%` }}
          />
        </div>
      )}

      {baixando && <p>Baixando atualização: {progresso}%</p>}

      {downloadConcluido && (
        <p className="download-sucesso">Instalador salvo na pasta Downloads.</p>
      )}

      {erro && <p className="download-erro">{erro}</p>}
    </div>
  );
}
