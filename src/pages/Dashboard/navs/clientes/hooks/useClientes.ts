import { useEffect, useMemo, useState } from "react";

import type { Cliente } from "../../../../../types/Cliente";
import { useAuth } from "../../../../../contexts/AuthContext";

import {
  listarClientes,
  salvarCliente as salvarClienteService,
  atualizarCliente,
} from "../../../../../services/ClienteService";

export function useClientes() {
  const { empresa } = useAuth();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<
    "ativos" | "inativos" | "todos"
  >("ativos");

  // =========================================================
  // CARREGAR CLIENTES
  // =========================================================

  useEffect(() => {
    async function carregarClientes() {
      if (!empresa?.id) return;

      try {
        const lista = await listarClientes(empresa.id);

        setClientes(lista);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    }

    carregarClientes();
  }, [empresa?.id]);

  // =========================================================
  // FILTRAR CLIENTES
  // =========================================================

  const clientesFiltrados = useMemo(() => {
    const texto = busca.trim().toLowerCase();

    return clientes.filter((cliente) => {
      // FILTRO DE STATUS
      if (filtroStatus === "ativos" && !cliente.ativo) {
        return false;
      }

      if (filtroStatus === "inativos" && cliente.ativo) {
        return false;
      }

      // FILTRO DE BUSCA
      if (!texto) {
        return true;
      }

      return (
        cliente.nome.toLowerCase().includes(texto) ||
        cliente.telefone?.toLowerCase().includes(texto)
      );
    });
  }, [clientes, busca, filtroStatus]);

  // =========================================================
  // NOVO CLIENTE
  // =========================================================

  function novoCliente() {
    setClienteEditando(null);
    setModalAberto(true);
  }

  // =========================================================
  // EDITAR CLIENTE
  // =========================================================

  function editarCliente(cliente: Cliente) {
    setClienteEditando(cliente);
    setModalAberto(true);
  }

  // =========================================================
  // SALVAR CLIENTE
  // =========================================================

  async function salvarCliente(cliente: Cliente) {
    if (!empresa?.id) return;

    try {
      if (clienteEditando) {
        await atualizarCliente(empresa.id, cliente);

        setClientes((lista) =>
          lista.map((item) => (item.id === cliente.id ? cliente : item)),
        );
      } else {
        await salvarClienteService(empresa.id, cliente);

        setClientes((lista) => [...lista, cliente]);
      }

      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  }

  // =========================================================
  // DESATIVAR CLIENTE
  // =========================================================

  async function desativarCliente(id: string) {
    if (!empresa?.id) return;

    const cliente = clientes.find((item) => item.id === id);

    if (!cliente) return;

    try {
      const clienteAtualizado: Cliente = {
        ...cliente,
        ativo: false,
      };

      await atualizarCliente(empresa.id, clienteAtualizado);

      setClientes((lista) =>
        lista.map((item) => (item.id === id ? clienteAtualizado : item)),
      );
    } catch (error) {
      console.error("Erro ao desativar cliente:", error);
    }
  }

 
  // =========================================================
  // FECHAR MODAL
  // =========================================================

  function fecharModal() {
    setModalAberto(false);
    setClienteEditando(null);
  }

  return {
    clientes,
    clientesFiltrados,
    busca,
    setBusca,
    filtroStatus,
    setFiltroStatus,
    modalAberto,
    clienteEditando,
    novoCliente,
    editarCliente,
    salvarCliente,
    desativarCliente,
    fecharModal,
  };
}
