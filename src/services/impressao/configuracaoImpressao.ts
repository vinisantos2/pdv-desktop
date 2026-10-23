import { load } from "@tauri-apps/plugin-store";

import {
  print_thermal_printer,
  title,
  subtitle,
  text,
  line,
  feed,
  cut,
  ENCODE,
  TEXT_ALIGN,
  TEXT_SIZE,
  type PrintJobRequest,
} from "tauri-plugin-thermal-printer";

export type LarguraPapel = "Mm58" | "Mm80";

export interface ConfiguracaoImpressao {
  impressora: string;
  larguraPapel: LarguraPapel;
  fonte: "normal" | "grande";
  imprimirAutomaticamente: boolean;
  mostrarPrevia: boolean;
  cortarPapel: boolean;
}

interface DadosComprovante {
  empresa: {
    nome: string;
    cnpj?: string;
  };
  venda: {
    id: string;
    data: string;
    dataPagamento?: string | null;
    clienteNome?: string;
    itens: {
      quantidade: number;
      descricao: string;
      valor: number;
    }[];
    total: number;
    formaPagamento: string;
    statusPagamento: string;
  };
}

export const CONFIGURACAO_PADRAO: ConfiguracaoImpressao = {
  impressora: "",
  larguraPapel: "Mm80",
  fonte: "normal",
  imprimirAutomaticamente: false,
  mostrarPrevia: true,
  cortarPapel: true,
};

const ARQUIVO_CONFIG = "configuracoes-impressao.json";
const CHAVE_CONFIG = "impressao";

export async function carregarConfiguracao(): Promise<ConfiguracaoImpressao> {
  const store = await load(ARQUIVO_CONFIG, {
    autoSave: false,
  });

  const salva = await store.get<ConfiguracaoImpressao>(CHAVE_CONFIG);

  return {
    ...CONFIGURACAO_PADRAO,
    ...(salva ?? {}),
  };
}

export async function salvarConfiguracao(
  configuracao: ConfiguracaoImpressao,
): Promise<void> {
  const store = await load(ARQUIVO_CONFIG, {
    autoSave: false,
  });

  await store.set(CHAVE_CONFIG, configuracao);
  await store.save();
}

function moeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export async function imprimirComprovante(
  dados: DadosComprovante,
): Promise<void> {
  const config = await carregarConfiguracao();

  if (!config.impressora.trim()) {
    throw new Error("Selecione uma impressora nas configurações de impressão.");
  }

  const secoes: PrintJobRequest["sections"] = [
    title(dados.empresa.nome.toUpperCase()),
  ];

  if (dados.empresa.cnpj) {
    secoes.push(text(`CNPJ: ${dados.empresa.cnpj}`));
  }

  secoes.push(
    line("="),
    subtitle("COMPROVANTE DE VENDA"),
    text(`Venda: ${dados.venda.id}`),
    text(`Data: ${dados.venda.data}`),
  );

  if (dados.venda.dataPagamento) {
    secoes.push(text(`Pagamento: ${dados.venda.dataPagamento}`));
  }

  if (dados.venda.clienteNome) {
    secoes.push(text(`Cliente: ${dados.venda.clienteNome}`));
  }

  secoes.push(line("-"), text("ITENS"));

  for (const item of dados.venda.itens) {
    const subtotal = item.quantidade * item.valor;

    secoes.push(
      text(`${item.quantidade}x ${item.descricao}`),
      text(`   ${moeda(item.valor)} un.  Total: ${moeda(subtotal)}`),
    );
  }

  secoes.push(
    line("="),
    text(`TOTAL: ${moeda(dados.venda.total)}`, {
      bold: true,
      size: config.fonte === "grande" ? TEXT_SIZE.DOUBLE : TEXT_SIZE.NORMAL,
    }),
    line("-"),
    text(`Pagamento: ${dados.venda.formaPagamento}`),
    text(`Status: ${dados.venda.statusPagamento}`),
    line("-"),
    text("Obrigado pela sua compra!", { align: TEXT_ALIGN.CENTER }),
    text("Volte sempre!", { align: TEXT_ALIGN.CENTER }),
    text("Comprovante sem valor fiscal.", {
      align: TEXT_ALIGN.CENTER,
    }),
    feed(3),
  );

  if (config.cortarPapel) {
    secoes.push(cut());
  }

  const trabalho: PrintJobRequest = {
    printer: config.impressora,
    paper_size: config.larguraPapel,
    options: {
      code_page: 6,
      encode: ENCODE.WINDOWS_1252,
      use_gbk: false,
    },
    sections: secoes,
  };

  await print_thermal_printer(trabalho);
}
