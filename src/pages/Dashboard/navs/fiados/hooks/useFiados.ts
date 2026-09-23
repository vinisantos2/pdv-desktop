import { useEffect, useState } from "react";
import { useAuth } from "../../../../../contexts/AuthContext";
import type { Venda } from "../../../../../types/Venda";
import { listarVendasFiadas } from "../../../../../services/VendaService";

export interface ClienteFiado {
  clienteId: string;
  clienteNome: string;
  vendas: Venda[];
  totalDevedor: number;
}

export default function useFiados() {
  const { empresa } = useAuth();

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!empresa?.id) return;

    carregarFiados(empresa.id);
  }, [empresa?.id]);

  async function carregarFiados(empresaId: string) {
    try {
      setCarregando(true);

      const vendasFiadas = await listarVendasFiadas(empresaId);

      setVendas(vendasFiadas);
    } catch (error) {
      console.error("Erro ao carregar fiados:", error);
    } finally {
      setCarregando(false);
    }
  }

  return {
    vendas,
    busca,
    setBusca,
    carregando,
  };
}