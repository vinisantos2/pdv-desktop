import './clienteHeader.css'
interface ClientesHeaderProps {
  abrirNovoCliente: () => void;
}

export default function ClientesHeader({
  abrirNovoCliente,
}: ClientesHeaderProps) {
  return (
    <div className="clientes-header">

      <div>
        <h1>Clientes</h1>

        <p>
          Gerencie os clientes cadastrados no sistema.
        </p>
      </div>

      <button
        className="btn-primary"
        onClick={()=>abrirNovoCliente()}
      >
        + Novo Cliente
      </button>

    </div>
  );
}