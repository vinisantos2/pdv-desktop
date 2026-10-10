import type { VersionInfo } from "../../../../../../types/VersionInfo";

import "./informacoesVersao.css";

interface Props {
  versaoAtual: string;
  app: VersionInfo;
}

export default function InformacoesVersao({
  versaoAtual,
  app,
}: Props) {
  const dataLancamento = app.dataLancamento?.toDate
    ? app.dataLancamento.toDate().toLocaleDateString("pt-BR")
    : "--";

  return (
    <div className="sobre-app-info">
      <div className="info-item">
        <span>Versão atual</span>
        <strong>{versaoAtual}</strong>
      </div>

      <div className="info-item">
        <span>Última versão</span>
        <strong>{app.versao}</strong>
      </div>

      <div className="info-item">
        <span>Lançamento</span>
        <strong>{dataLancamento}</strong>
      </div>
    </div>
  );
}