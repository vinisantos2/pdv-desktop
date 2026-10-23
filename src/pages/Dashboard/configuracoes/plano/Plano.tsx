import Loading from "../../../../components/loading/Loading";
import { useAuth } from "../../../../contexts/AuthContext";
import { PLANOS } from "../../../../types/Plano";

import Atual from "./components/atual/Atual";
import Historico from "./components/hisotrico/Historico";
import Recursos from "./components/recursos/Recursos";

import "./plano.css";

export default function Plano() {
  const { empresa, carregando } = useAuth();

  if (carregando) {
    return <Loading />;
  }

  if (!empresa) {
    return (
      <div className="plano-page">
        <p>Não foi possível carregar os dados da empresa.</p>
      </div>
    );
  }

  const plano = empresa.plano ? PLANOS[empresa.plano] : undefined;

  return (
    <div className="plano-page">
      <header className="plano-header">
        <div>
          <h1>Plano e pagamento</h1>
          <p>Gerencie seu plano, assinatura e pagamentos.</p>
        </div>
      </header>

      <Atual plano={plano} status={empresa.status} />

      {plano && <Recursos recursos={plano.recursos} />}

      <Historico pagamentos={empresa.pagamentos ?? []} />
    </div>
  );
}
