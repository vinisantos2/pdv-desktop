import { useEffect, useState } from "react";

import { writeFile } from "@tauri-apps/plugin-fs";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { downloadDir, join } from "@tauri-apps/api/path";
import {
  buscarInformacoesApp,
  existeAtualizacao,
} from "../../../../../services/versionService";
import type { VersionInfo } from "../../../../../types/VersionInfo";
import { VERSAO_APP } from "../../../../../constanst/app";
import { toast } from "sonner";

export function useSobreApp() {
  const [app, setApp] = useState<VersionInfo | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [baixando, setBaixando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [erro, setErro] = useState("");
  const [downloadConcluido, setDownloadConcluido] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const resultado = await buscarInformacoesApp();
        setApp(resultado);
      } catch (error) {
        console.error("Erro ao buscar versão:", error);
      } finally {
        setCarregando(false);
      }
    }

    void carregar();
  }, []);

  const temAtualizacao = app
    ? existeAtualizacao(VERSAO_APP, app.versao)
    : false;

  async function baixarAtualizacao() {
    if (!app?.urlDownload || baixando || downloadConcluido) return;

    setBaixando(true);
    setProgresso(0);
    setErro("");

    try {
      const resposta = await tauriFetch(app.urlDownload);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      if (!resposta.body) {
        throw new Error("O servidor não retornou o arquivo.");
      }

      const tamanhoTotal = Number(resposta.headers.get("content-length") || 0);

      const leitor = resposta.body.getReader();
      const partes: Uint8Array[] = [];
      let tamanhoRecebido = 0;

      while (true) {
        const { done, value } = await leitor.read();

        if (done) break;

        partes.push(value);
        tamanhoRecebido += value.length;

        if (tamanhoTotal > 0) {
          setProgresso(
            Math.min(99, Math.round((tamanhoRecebido / tamanhoTotal) * 100)),
          );
        }
      }

      const arquivo = new Uint8Array(tamanhoRecebido);
      let posicao = 0;

      for (const parte of partes) {
        arquivo.set(parte, posicao);
        posicao += parte.length;
      }

      const pastaDownloads = await downloadDir();
      const caminho = await join(pastaDownloads, "VS-Tech-PDV-Atualizacao.exe");
      await writeFile(caminho, arquivo);
      toast.success("Arquivo salvo na pasta download")

      setProgresso(100);
      setDownloadConcluido(true);
    } catch (error) {
      console.error("Erro no download:", error);
      setErro(
        "Não foi possível baixar o instalador. Verifique sua conexão e o link.",
      );
    } finally {
      setBaixando(false);
    }
  }

  return {
    app,
    carregando,
    temAtualizacao,
    baixarAtualizacao,
    baixando,
    progresso,
    erro,
    downloadConcluido,
    versaoAtual: VERSAO_APP,
  };
}
