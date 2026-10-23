import { useEffect, useState } from "react";
import {
  list_thermal_printers,
  print_thermal_printer,
  ENCODE,
  title,
  text,
  line,
  feed,
  cut,
  type PrintJobRequest,
} from "tauri-plugin-thermal-printer";

import "./impressora.css";
import {
  carregarConfiguracao,
  CONFIGURACAO_PADRAO,
  salvarConfiguracao,
  type ConfiguracaoImpressao,
} from "../../../../services/impressao/configuracaoImpressao";

interface Impressora {
  name: string;
  identifier: string;
  interface_type: string;
  status: string;
}

export default function Impressora() {
  const [config, setConfig] =
    useState<ConfiguracaoImpressao>(CONFIGURACAO_PADRAO);

  const [impressoras, setImpressoras] = useState<Impressora[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function iniciar() {
      console.log("[Impressão] Iniciando carregamento...");

      try {
        const configSalva = await carregarConfiguracao();
        console.log("[Impressão] Configuração carregada:", configSalva);

        console.log("[Impressão] Chamando list_thermal_printers...");

        const lista = await list_thermal_printers();

        console.log("[Impressão] Resultado:", lista);
        console.log("[Impressão] JSON:", JSON.stringify(lista, null, 2));
        console.log("[Impressão] É array?", Array.isArray(lista));
        console.log("[Impressão] Quantidade:", lista?.length);

        setConfig(configSalva);
        setImpressoras(Array.isArray(lista) ? (lista as Impressora[]) : []);
      } catch (erro) {
        console.error("[Impressão] Erro completo:", erro);

        setMensagem(
          `Não foi possível carregar: ${
            erro instanceof Error ? erro.message : String(erro)
          }`,
        );
      } finally {
        console.log("[Impressão] Carregamento finalizado.");
        setCarregando(false);
      }
    }

    void iniciar();
  }, []);

  function atualizar<K extends keyof ConfiguracaoImpressao>(
    campo: K,
    valor: ConfiguracaoImpressao[K],
  ) {
    setConfig((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function salvar() {
    setProcessando(true);
    setMensagem("");

    try {
      await salvarConfiguracao(config);
      setMensagem("Configurações salvas com sucesso.");
    } catch (erro) {
      setMensagem(`Erro ao salvar: ${String(erro)}`);
    } finally {
      setProcessando(false);
    }
  }

  async function testarImpressao() {
    if (!config.impressora) {
      setMensagem("Selecione uma impressora antes de testar.");
      return;
    }

    setProcessando(true);
    setMensagem("");

    try {
      const trabalho: PrintJobRequest = {
        printer: config.impressora,
        paper_size: config.larguraPapel,
        options: {
          code_page: 0,
          encode: ENCODE.ACCENT_REMOVER,
          use_gbk: false,
        },
        sections: [
          title("TESTE DE IMPRESSAO"),
          line("="),
          text("PDV - Teste da impressora"),
          text(`Papel: ${config.larguraPapel === "Mm58" ? "58 mm" : "80 mm"}`),
          text(`Data: ${new Date().toLocaleString("pt-BR")}`),
          line("="),
          text("Se esta mensagem estiver legivel,"),
          text("o teste basico foi impresso."),
          feed(3),
          ...(config.cortarPapel ? [cut()] : []),
        ],
      };

      await print_thermal_printer(trabalho);
      setMensagem("Comando de impressão enviado com sucesso.");
    } catch (erro) {
      setMensagem(`Falha na impressão: ${String(erro)}`);
    } finally {
      setProcessando(false);
    }
  }

  if (carregando) {
    return <div className="config-impressao">Carregando configurações...</div>;
  }

  return (
    <main className="config-impressao">
      <header className="config-impressao__header">
        <div>
          <h1>Configurações de impressão</h1>
          <p>Configure a impressora térmica dos comprovantes.</p>
        </div>
        <span className="config-impressao__icone">▤</span>
      </header>

      <section className="config-card">
        <h2>Impressora</h2>
        <p className="config-descricao">
          Selecione uma impressora instalada no Windows.
        </p>

        <label htmlFor="impressora">Impressora disponível</label>
        <select
          id="impressora"
          value={config.impressora}
          onChange={(e) => atualizar("impressora", e.target.value)}
        >
          <option value="">Selecione uma impressora</option>
          {impressoras.map((impressora) => (
            <option key={impressora.identifier} value={impressora.name}>
              {impressora.name} — {impressora.interface_type}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="botao-secundario"
          onClick={async () => {
            try {
              setImpressoras((await list_thermal_printers()) as Impressora[]);
              setMensagem("Lista de impressoras atualizada.");
            } catch (erro) {
              setMensagem(`Erro ao buscar impressoras: ${String(erro)}`);
            }
          }}
        >
          Atualizar lista
        </button>

        {impressoras.length === 0 && (
          <p className="config-aviso">
            Nenhuma impressora encontrada. Confira se a Oasis está instalada no
            Windows e conectada por USB.
          </p>
        )}
      </section>

      <section className="config-card">
        <h2>Papel e formatação</h2>

        <label htmlFor="papel">Largura do papel</label>
        <select
          id="papel"
          value={config.larguraPapel}
          onChange={(e) =>
            atualizar("larguraPapel", e.target.value as "Mm58" | "Mm80")
          }
        >
          <option value="Mm58">58 mm</option>
          <option value="Mm80">80 mm</option>
        </select>

        <label htmlFor="fonte">Tamanho da fonte</label>
        <select
          id="fonte"
          value={config.fonte}
          onChange={(e) =>
            atualizar("fonte", e.target.value as "normal" | "grande")
          }
        >
          <option value="normal">Normal</option>
          <option value="grande">Grande</option>
        </select>

        <p className="config-descricao">
          A largura escolhida também determina a formatação do comprovante. A
          opção de fonte será aplicada quando integrarmos a impressão das
          vendas.
        </p>
      </section>

      <section className="config-card">
        <h2>Comportamento</h2>

        <label className="config-opcao">
          <input
            type="checkbox"
            checked={config.imprimirAutomaticamente}
            onChange={(e) =>
              atualizar("imprimirAutomaticamente", e.target.checked)
            }
          />
          <span>
            <strong>Imprimir após finalizar a venda</strong>
            <small>Ativa a impressão automática nas vendas.</small>
          </span>
        </label>

        <label className="config-opcao">
          <input
            type="checkbox"
            checked={config.mostrarPrevia}
            onChange={(e) => atualizar("mostrarPrevia", e.target.checked)}
          />
          <span>
            <strong>Exibir pré-visualização</strong>
            <small>Preferência para a tela do comprovante.</small>
          </span>
        </label>

        <label className="config-opcao">
          <input
            type="checkbox"
            checked={config.cortarPapel}
            onChange={(e) => atualizar("cortarPapel", e.target.checked)}
          />
          <span>
            <strong>Cortar papel ao final</strong>
            <small>Funciona se o modelo oferecer cortador automático.</small>
          </span>
        </label>
      </section>

      {mensagem && (
        <div className="config-mensagem" role="status">
          {mensagem}
        </div>
      )}

      <footer className="config-acoes">
        <button
          type="button"
          className="botao-secundario"
          onClick={testarImpressao}
          disabled={processando || !config.impressora}
        >
          {processando ? "Aguarde..." : "Testar impressão"}
        </button>

        <button
          type="button"
          className="botao-principal"
          onClick={salvar}
          disabled={processando}
        >
          Salvar configurações
        </button>
      </footer>
    </main>
  );
}
