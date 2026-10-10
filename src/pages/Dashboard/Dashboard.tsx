import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import FooterDashBoard from "./components/FooterDashBoard/FooterDashboard";
import ModalAtualizacaoObrigatorio from "./components/ModalAtualizacaoObrigatorio/ModalAtualizacaoObrigatorio";

import { VERSAO_APP } from "../../constanst/app";
import {
  buscarInformacoesApp,
  existeAtualizacao,
} from "../../services/versionService";
import type { VersionInfo } from "../../types/VersionInfo";
import { ROTAS } from "../../constanst/rotas";

import "./dashboard.css";
import Loading from "../../components/loading/Loading";

export default function Dashboard() {
  const location = useLocation();

  const [app, setApp] = useState<VersionInfo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroConsulta, setErroConsulta] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarAtualizacao() {
      setCarregando(true);
      setErroConsulta(false);

      try {
        const informacoes = await buscarInformacoesApp();

        if (ativo) {
          setApp(informacoes);
        }
      } catch (error) {
        console.error("Erro ao verificar atualização:", error);

        if (ativo) {
          setErroConsulta(true);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    verificarAtualizacao();

    return () => {
      ativo = false;
    };
  }, []);

  const atualizacaoObrigatoria =
    app !== null &&
    app.obrigatoria === true &&
    existeAtualizacao(VERSAO_APP, app.versao);

  const rotaSobre = ROTAS.DASHBOARD.CONFIGURACOES.SOBRE;

  const estaNaTelaSobre =
    location.pathname === rotaSobre ||
    location.pathname.startsWith(`${rotaSobre}/`);

  // Enquanto verifica a versão, não libera as páginas do sistema.
  if (carregando) {
    return <Loading texto="    Verificando atualizações do PDV VS-Tech..." />;
  }

  // Não libera o sistema se não foi possível verificar a versão.
  if (erroConsulta) {
    return (
      <div className="dashboard-verificando">
        <p>Não foi possível verificar as atualizações.</p>
        <button onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-area">
        <main className="main-content">
          {atualizacaoObrigatoria && !estaNaTelaSobre ? (
            <ModalAtualizacaoObrigatorio
              versao={app.versao}
              mensagem={app.mensagem}
            />
          ) : (
            <Outlet />
          )}
        </main>

        <FooterDashBoard />
      </div>
    </div>
  );
}
