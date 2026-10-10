import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { VERSAO_APP } from "../../../../constanst/app";
import type { VersionInfo } from "../../../../types/VersionInfo";

import {
  buscarInformacoesApp,
  existeAtualizacao,
} from "../../../../services/versionService";

import "./footerDashBoard.css";
import { ROTAS } from "../../../../constanst/rotas";

export default function FooterDashBoard() {
  const navigate = useNavigate();

  const [app, setApp] = useState<VersionInfo | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarAtualizacao() {
      try {
        const informacoes = await buscarInformacoesApp();
        setApp(informacoes);
      } catch (error) {
        console.error("Erro ao consultar atualização:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarAtualizacao();
  }, []);

  const atualizacaoDisponivel =
    app != null && existeAtualizacao(VERSAO_APP, app.versao);

  return (
    <footer className="footer-dashboard">
      <div className="footer-dashboard-info">
        <span>© 2026 VS-Tech. Todos os direitos reservados.</span>

        <span className="footer-separador">•</span>

        <span>PDV VS-Tech</span>

        <span className="footer-separador">•</span>

        <span>Versão {VERSAO_APP}</span>
      </div>

      <div className="footer-dashboard-acoes">
        {carregando ? (
          <span className="footer-status">Verificando atualizações...</span>
        ) : atualizacaoDisponivel ? (
          <button
            className="footer-atualizacao disponivel"
            onClick={() => navigate(ROTAS.DASHBOARD.CONFIGURACOES.SOBRE)}
            title="Ver detalhes da atualização"
          >
            <span className="footer-status-indicador" />
            Nova versão: {app?.versao}
          </button>
        ) : app ? (
          <span className="footer-status atualizado">
            <span className="footer-status-indicador" />
            Sistema atualizado
          </span>
        ) : (
          <span className="footer-status">
            Não foi possível verificar atualizações
          </span>
        )}

        <button
          type="button"
          className="footer-sobre-btn"
          onClick={() => navigate(ROTAS.DASHBOARD.CONFIGURACOES.SOBRE)}
        >
          Sobre o sistema
          <span aria-hidden="true"> →</span>
        </button>
      </div>
    </footer>
  );
}
