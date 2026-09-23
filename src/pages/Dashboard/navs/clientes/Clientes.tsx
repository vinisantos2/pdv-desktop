import "./clientes.css";
import ModalCliente from "./components/ModalCLiente";
import ListaCliente from "./components/ListaCliente";
import { useClientes } from "./hooks/useClientes";
export default function Clientes() {
  const {
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
  } = useClientes();
  return (
    <div className="clientes-container">
      {/* HEADER */}
      <div className="clientes-header">
        <div>
          <h1>Clientes</h1>
          <p> Gerencie os clientes do seu estabelecimento </p>
        </div>
        <button
          type="button"
          className="btn-novo-cliente"
          onClick={novoCliente}
        >
          + Novo cliente
        </button>
      </div>
      {/* BUSCA */}
      <div className="clientes-filtros">
        <input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          value={filtroStatus}
          onChange={(e) =>
            setFiltroStatus(e.target.value as "ativos" | "inativos" | "todos")
          }
        >
          <option value="ativos">Ativos</option>
          <option value="inativos">Inativos</option>
          <option value="todos">Todos</option>
        </select>
      </div>
      {/* LISTA */}
      <div className="clientes-card">
        {/* CABEÇALHO DA LISTA */}
        <div className="clientes-card-header">
          <div>
            <h2>Lista de clientes</h2>
            <span>
              {clientesFiltrados.length}
              {clientesFiltrados.length === 1 ? "cliente" : "clientes"}
            </span>
          </div>
        </div>
        {/* CLIENTES */}
        <ListaCliente
          clientesFiltrados={clientesFiltrados}
          novoCliente={novoCliente}
          editarCliente={editarCliente}
          desativarCliente={desativarCliente}
        />
      </div>
      {/* MODAL */}
      {modalAberto && (
        <ModalCliente
          cliente={clienteEditando}
          onSalvar={salvarCliente}
          onFechar={fecharModal}
        />
      )}
    </div>
  );
}
