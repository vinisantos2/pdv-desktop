import { useEffect, useState } from "react";
import { listarProdutos } from "../../../../../services/produtoService";
import {
  buscarResumoVendasHoje,
  buscarUltimasVendas,
} from "../../../../../services/VendaService";
import { useAuth } from "../../../../../contexts/AuthContext";
import type { Produto } from "../../../../../types/Produto";
import type { Venda } from "../../../../../types/Venda";

export default function useInicio() {
  const { usuario, empresa } = useAuth();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [ultimasVendas, setUltimasVendas] = useState<Venda[]>([]);
  const [vendasHoje, setVendasHoje] = useState(0);
  const [faturamentoHoje, setFaturamentoHoje] = useState(0);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!empresa?.id) return;

    carregarDashboard(empresa.id);
  }, [empresa?.id]);

  async function carregarDashboard(empresaId: string) {
    try {
      setCarregando(true);

      const [listaProdutos, resumoVendas, vendas] = await Promise.all([
        listarProdutos(empresaId),
        buscarResumoVendasHoje(empresaId),
        buscarUltimasVendas(empresaId, 5),
      ]);

      setProdutos(listaProdutos);
      setVendasHoje(resumoVendas.quantidade);
      setFaturamentoHoje(resumoVendas.faturamento);
      setUltimasVendas(vendas);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setCarregando(false);
    }
  }

  const produtosEstoqueBaixo = produtos.filter(
    (produto) => produto.estoque < 6,
  );

  return {
    usuario,
    empresa,
    produtos,
    ultimasVendas,
    vendasHoje,
    faturamentoHoje,
    produtosEstoqueBaixo,
    carregando,
  };
}
