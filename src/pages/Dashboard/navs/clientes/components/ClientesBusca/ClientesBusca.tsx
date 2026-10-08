import type { Dispatch, SetStateAction } from "react";
import InputPadrao from "../../../../../../components/input/InputPadrao";

import "./clientesBusca.css";

type FiltroStatus = "ativos" | "inativos" | "todos";

interface ClientesBuscaProps {
  busca: string;
  setBusca: Dispatch<SetStateAction<string>>;

  filtroStatus: FiltroStatus;
  setFiltroStatus: Dispatch<SetStateAction<FiltroStatus>>;
}

export default function ClientesBusca({
  busca,
  setBusca,
  filtroStatus,
  setFiltroStatus,
}: ClientesBuscaProps) {
  return (
    <div className="clientes-busca">
      <div className="clientes-busca-input">
        <InputPadrao
          placeholder="Buscar por nome, telefone ou endereço..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <select
        value={filtroStatus}
        onChange={(e) =>
          setFiltroStatus(e.target.value as "ativos" | "inativos" | "todos")
        }
        className="clientes-filtro"
      >
        <option value="todos">Todos os status</option>
        <option value="ativos">Ativos</option>
        <option value="inativos">Inativos</option>
      </select>
    </div>
  );
}
