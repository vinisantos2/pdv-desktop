import { useClientes } from "./hooks/useClientes";
import "./clientes.css";
import ClientesHeader from "./components/ClienteHeader/ClientesHeader";
import ClientesBusca from "./components/ClientesBusca/ClientesBusca";
import ClientesTabela from "./components/ClienteTabela/ClienteTabela";
import ModalCliente from "./components/ModalCLiente/ModalCLiente";

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
    fecharModal,
  } = useClientes();

  return (
    <div className="clientes-page">
      <ClientesHeader abrirNovoCliente={novoCliente} />

      <div className="clientes-content">
        <ClientesBusca
          busca={busca}
          setBusca={setBusca}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
        />

        <ClientesTabela editarCliente={editarCliente} clientes={clientesFiltrados} />
      </div>

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
