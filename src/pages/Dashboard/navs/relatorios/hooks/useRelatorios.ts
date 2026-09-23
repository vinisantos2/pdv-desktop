import { useEffect, useMemo, useState } from "react";
import type { Venda } from "../../../../../types/Venda";
import { listarVendas } from "../../../../../services/VendaService";

export type FormaPagamentoFiltro =
  | ""
  | "dinheiro"
  | "pix"
  | "cartao"
  | "fiado";

interface UseRelatoriosProps {
  empresaId: string;
}

export default function useRelatorios({
  empresaId,
}: UseRelatoriosProps) {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const [formaPagamento, setFormaPagamento] =
    useState<FormaPagamentoFiltro>("");

  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregarVendas() {
      if (!empresaId) {
        setVendas([]);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);

        const resultado = await listarVendas(empresaId);

        setVendas(resultado);
      } catch (error) {
        console.error("Erro ao carregar vendas:", error);
        setVendas([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarVendas();
  }, [empresaId]);

  const vendasFiltradas = useMemo(() => {
    return vendas.filter((venda) => {
      /*
       * FILTRO POR DATA
       */
      const dataVenda = venda.data.toDate();

      if (dataInicial) {
        const inicio = new Date(
          `${dataInicial}T00:00:00`
        );

        if (dataVenda < inicio) {
          return false;
        }
      }

      if (dataFinal) {
        const fim = new Date(
          `${dataFinal}T23:59:59`
        );

        if (dataVenda > fim) {
          return false;
        }
      }

      /*
       * FILTRO POR FORMA DE PAGAMENTO
       */
      if (
        formaPagamento &&
        venda.formaPagamento !== formaPagamento
      ) {
        return false;
      }

      /*
       * FILTRO POR BUSCA
       */
      if (busca.trim()) {
        const termo = busca
          .toLowerCase()
          .trim();

        const cliente =
          venda.clienteNome?.toLowerCase() || "";

        const idVenda =
          venda.id?.toLowerCase() || "";

        if (
          !cliente.includes(termo) &&
          !idVenda.includes(termo)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    vendas,
    dataInicial,
    dataFinal,
    formaPagamento,
    busca,
  ]);

  function limparFiltros() {
    setDataInicial("");
    setDataFinal("");
    setFormaPagamento("");
    setBusca("");
  }

  return {
    vendas,
    vendasFiltradas,
    carregando,

    dataInicial,
    setDataInicial,

    dataFinal,
    setDataFinal,

    formaPagamento,
    setFormaPagamento,

    busca,
    setBusca,

    limparFiltros,
  };
}