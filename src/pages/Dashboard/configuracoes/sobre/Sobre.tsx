import InformacoesVersao from "./components/InformacoesVersao/InformacoesVersao";
import SobreHeader from "./components/SobreHeader/SobreHeader";
import StatusAtualizacao from "./components/StatusAtualizacao/StatusAtualizacao";
import VersaoInstalada from "./components/VersaoInstalada/VersaoInstalada";
import { useSobreApp } from "./hooks/useSobreApp";

import "./sobre.css";
import SobreFooter from "./SobreFooter/SobreFooter";

export default function SobreApp() {
  const {
    app,
    carregando,
    temAtualizacao,
    baixarAtualizacao,
    baixando,
    progresso,
    erro,
    downloadConcluido,
    versaoAtual,
  } = useSobreApp();

  if (carregando) {
    return (
      <div className="sobre-app">
        <div className="sobre-app-loading">
          <div className="sobre-app-spinner" />
          <span>Verificando versão...</span>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="sobre-app">
        <div className="sobre-app-card">
          <div className="sobre-app-erro-icon">!</div>
          <h2>Não foi possível carregar</h2>
          <p>Não foi possível obter as informações da versão do aplicativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sobre-app">
      <div className="sobre-app-card">
        <SobreHeader />

        <VersaoInstalada versao={versaoAtual} />

        {temAtualizacao ? (
          <StatusAtualizacao
            versao={app.versao}
            mensagem={app.mensagem}
            baixarAtualizacao={baixarAtualizacao}
            baixando={baixando}
            progresso={progresso}
            erro={erro}
            downloadConcluido={downloadConcluido}
          />
        ) : (
          <div className="sobre-app-status atual">
            <div className="status-icon">✓</div>

            <div>
              <strong>Aplicativo atualizado</strong>
              <p>Você está utilizando a versão mais recente.</p>
            </div>
          </div>
        )}

        <InformacoesVersao versaoAtual={versaoAtual} app={app} />

        <SobreFooter />
      </div>
    </div>
  );
}
