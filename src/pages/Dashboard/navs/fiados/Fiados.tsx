import "./fiados.css";
import Loading from "../../../../components/loading/Loading";
import FiltroFiados from "./components/FiltroFiados";
import ListaFiado from "./components/ListaFiados";
import useFiados from "./hooks/useFiados";

export default function Fiados() {
  const { vendas, carregando, busca, setBusca } = useFiados();

  if (carregando) return <Loading />;

  return (
    <div className="fiados-container">
      {/* HEADER */}
      <header className="fiados-header">
        <div>
          <h1>Fiados</h1>

          <p>Gerencie as vendas fiadas dos seus clientes</p>
        </div>
      </header>
      <FiltroFiados busca={busca} setBusca={setBusca} />
      <ListaFiado vendas={vendas} />
    </div>
  );
}
