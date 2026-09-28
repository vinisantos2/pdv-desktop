import { VERSAO_APP } from "../../constanst/app";
import "./rodape.css";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <span>© 2026 VS-Tech. Todos os direitos reservados.</span>

        <span className="rodape-separador">•</span>

        <span>PDV VS-Tech</span>

        <span className="rodape-separador">•</span>

        <span>Versão {VERSAO_APP}</span>
      </div>
    </footer>
  );
}
