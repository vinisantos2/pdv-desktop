import "./inicio.css";

import UltimasVendas from "./components/UltimasVendas/UltimasVendas";
import EstoqueBaixo from "./components/EstoqueBaixo";
import Loading from "../../../../components/loading/Loading";

import useInicio from "./hooks/useInicio";
import HeaderInicio from "./components/HeaderInicio/HeaderInicio";

export default function Inicio() {
  const {
    usuario,
    empresa,
  
    ultimasVendas,
    
    produtosEstoqueBaixo,
    carregando,
  } = useInicio();

  if (carregando) {
    return <Loading />;
  }

  return (
    <div className="dashboard">
      <HeaderInicio empresa={empresa} usuario={usuario} />

      {/* =========================
          CONTEÚDO PRINCIPAL
      ========================= */}
      <section className="dashboard-content">
        <main className="dashboard-main">
          <UltimasVendas vendas={ultimasVendas} />
        </main>

        <aside className="dashboard-side">
          <EstoqueBaixo produtos={produtosEstoqueBaixo} />
        </aside>
      </section>
    </div>
  );
}
