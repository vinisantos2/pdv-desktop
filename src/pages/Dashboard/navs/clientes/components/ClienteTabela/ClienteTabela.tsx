import type { Cliente } from "../../../../../../types/Cliente";
import "./clienteTabela.css";

interface ClientesTabelaProps {
  clientes: Cliente[];
  editarCliente: (cliente: Cliente) => void;
}

export default function ClientesTabela({
  clientes,
  editarCliente,
}: ClientesTabelaProps) {
  return (
    <div className="clientes-tabela-container">

      {/* HEADER FIXO */}
      <table className="clientes-tabela clientes-tabela-header">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Status</th>
            <th>Observação</th>
            <th>Ações</th>
          </tr>
        </thead>
      </table>

      {/* CORPO COM SCROLL */}
      <div className="clientes-tabela-scroll">
        <table className="clientes-tabela">
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>

                  <td>{cliente.telefone}</td>

                  <td>{cliente.endereco}</td>

                  <td>
                    <span
                      className={
                        cliente.ativo
                          ? "status ativo"
                          : "status inativo"
                      }
                    >
                      {cliente.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td>
                    {cliente.observacao || "—"}
                  </td>

                  <td>
                    <button
                      className="btn-editar-cliente"
                      onClick={() => editarCliente(cliente)}
                      title="Editar cliente"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="clientes-sem-registros"
                >
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}