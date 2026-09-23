import "./inicio.css";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

import { listarProdutos } from "../../../../services/produtoService";
import {
  buscarResumoVendasHoje,
  buscarUltimasVendas,
} from "../../../../services/VendaService";

import type { Produto } from "../../../../types/Produto";
import type { Venda } from "../../../../types/Venda";

import DashboardCards from "./components/DashboardCards";
import AcessoRapido from "./components/AcessoRapido";
import UltimasVendas from "./components/UltimasVendas";
import EstoqueBaixo from "./components/EstoqueBaixo";
import Loading from "../../../../components/loading/Loading";

export default function Inicio() {
  const { usuario, empresa } = useAuth();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [ultimasVendas, setUltimasVendas] = useState<Venda[]>([]);
  const [vendasHoje, setVendasHoje] = useState(0);
  const [faturamentoHoje, setFaturamentoHoje] = useState(0);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!empresa?.id) return;
    setCarregando(true);
    carregarDashboard(empresa.id);
  }, [empresa?.id]);

  async function carregarDashboard(empresaId: string) {
    try {
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

  if (carregando) return <Loading />;
  return (
    <div className="dashboard">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <div>
          <h1>Olá, {usuario?.nome || "Usuário"}!</h1>

          <p>Bem-vindo ao {empresa?.nome || "seu PDV"}.</p>
        </div>

        <div className="dashboard-date">
          <span>Hoje</span>

          <strong>{new Date().toLocaleDateString("pt-BR")}</strong>
        </div>
      </header>

      {/* Indicadores */}
      <DashboardCards
        faturamentoHoje={faturamentoHoje}
        vendasHoje={vendasHoje}
        produtosCadastrados={produtos.length}
      />

      {/* Acesso rápido */}
      <AcessoRapido />

      {/* Conteúdo */}
      <section className="dashboard-content">
        <UltimasVendas vendas={ultimasVendas} />

        <EstoqueBaixo produtos={produtosEstoqueBaixo} />
      </section>
    </div>
  );
}
