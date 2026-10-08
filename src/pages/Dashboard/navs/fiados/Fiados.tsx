import "./fiados.css";

import Loading from "../../../../components/loading/Loading";

import FiltroFiados from "./components/FiltroFiados/FiltroFiados";

import useFiados from "./hooks/useFiados";
import ListaFiado from "./components/ListaFiados/ListaFiados";

export default function Fiados() {
  const {
    vendas,
    carregando,
    busca,
    setBusca,
  } = useFiados();

  if (carregando) {
    return <Loading />;
  }

  return (
    <div className="fiados-page">

      {/* HEADER */}

      <header className="fiados-header">
        <div className="fiados-titulo">
          <h1>Fiados</h1>

          <p>
            Gerencie as vendas fiadas dos seus clientes.
          </p>
        </div>
      </header>

      {/* CONTEÚDO */}

      <main className="fiados-content">

        <FiltroFiados
          busca={busca}
          setBusca={setBusca}
        />

        <ListaFiado
          vendas={vendas}
        />

      </main>

    </div>
  );
}