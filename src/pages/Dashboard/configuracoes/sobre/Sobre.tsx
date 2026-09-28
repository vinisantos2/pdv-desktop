import { useEffect, useState } from "react";
import type { VersionInfo } from "../../../../types/VersionInfo";
import {
  buscarInformacoesApp,
  existeAtualizacao,
} from "../../../../services/versionService";
import { VERSAO_APP } from "../../../../constanst/app";

import "./sobre.css";

export default function SobreApp() {
  const [app, setApp] = useState<VersionInfo | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resultado = await buscarInformacoesApp();

        setApp(resultado);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

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

  const temAtualizacao = existeAtualizacao(VERSAO_APP, app.versao);

  return (
    <div className="sobre-app">
      <div className="sobre-app-card">
        {/* CABEÇALHO */}
        <div className="sobre-app-header">
          <div className="sobre-app-logo">
            <span>PDV</span>
          </div>

          <div>
            <h1>PDV Desktop</h1>

            <p>Sistema de Ponto de Venda</p>
          </div>
        </div>

        {/* VERSÃO */}
        <div className="sobre-app-versao">
          <span className="sobre-app-label">Versão instalada</span>

          <strong>{VERSAO_APP}</strong>
        </div>

        {/* STATUS */}
        {!temAtualizacao ? (
          <div className="sobre-app-status atual">
            <div className="status-icon">✓</div>

            <div>
              <strong>Aplicativo atualizado</strong>

              <p>Você está utilizando a versão mais recente.</p>
            </div>
          </div>
        ) : (
          <div className="sobre-app-status atualizacao">
            <div className="status-icon">↑</div>

            <div className="status-conteudo">
              <span className="status-badge">NOVA VERSÃO</span>

              <strong>Versão {app.versao} disponível</strong>

              <p>{app.mensagem}</p>

              <a
                className="btn-atualizar"
                href={app.urlDownload}
                target="_blank"
                rel="noopener noreferrer"
              >
                Atualizar aplicativo
              </a>
            </div>
          </div>
        )}

        {/* INFORMAÇÕES */}
        <div className="sobre-app-info">
          <div className="info-item">
            <span>Versão atual</span>
            <strong>{VERSAO_APP}</strong>
          </div>

          <div className="info-item">
            <span>Última versão</span>
            <strong>{app.versao}</strong>
          </div>

          <div className="info-item">
            <span>Lançamento</span>
            <strong>
              {app.dataLancamento?.toDate
                ? app.dataLancamento.toDate().toLocaleDateString("pt-BR")
                : "--"}
            </strong>
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="sobre-app-footer">
          <span>© {new Date().getFullYear()} VS-Tech</span>

          <span>PDV Desktop</span>
        </div>
      </div>
    </div>
  );
}
