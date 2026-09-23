import "./listaCliente.css"
import type { Cliente } from "../../../../../types/Cliente";

interface Props {
  clientesFiltrados: Cliente[];
  novoCliente: () => void;
  editarCliente: (cliente: Cliente) => void;
  desativarCliente: (id: string) => void;
}

export default function ListaCliente({
  clientesFiltrados,
  novoCliente,
  editarCliente,
  desativarCliente,
}: Props) {
  if (clientesFiltrados.length === 0) {
    return (
      <div className="clientes-vazio">
        <span>👥</span>

        <h3>Nenhum cliente encontrado</h3>

        <p>
          Cadastre seu primeiro cliente para começar.
        </p>

        <button
          type="button"
          onClick={novoCliente}
        >
          Cadastrar cliente
        </button>
      </div>
    );
  }

  return (
    <div className="tabela-clientes">

      {/* HEADER */}
      <div className="tabela-clientes-header">
        <span>Nome</span>
        <span>Telefone</span>
        <span>Endereço</span>
        <span>Status</span>
        <span>Ações</span>
      </div>

      {/* CLIENTES */}
      {clientesFiltrados.map((cliente) => (
        <div
          className="tabela-cliente"
          key={cliente.id}
        >
          <strong>
            {cliente.nome}
          </strong>

          <span>
            {cliente.telefone || "-"}
          </span>

          <span>
            {cliente.endereco || "-"}
          </span>

          <span>
            <span
              className={
                cliente.ativo
                  ? "status-ativo"
                  : "status-inativo"
              }
            >
              {cliente.ativo
                ? "Ativo"
                : "Inativo"}
            </span>
          </span>

          {/* AÇÕES */}
          <div className="acoes-cliente">

            <button
              type="button"
              onClick={() =>
                editarCliente(cliente)
              }
            >
              Editar
            </button>

            {cliente.ativo && (
              <button
                type="button"
                onClick={() =>
                  desativarCliente(cliente.id)
                }
              >
                Desativar
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

