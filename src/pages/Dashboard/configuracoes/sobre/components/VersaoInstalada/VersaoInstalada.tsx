import "./versaoInstalada.css";

interface Props {
  versao: string;
}

export default function VersaoInstalada({ versao }: Props) {
  return (
    <div className="sobre-app-versao">
      <span className="sobre-app-label">Versão instalada</span>
      <strong>{versao}</strong>
    </div>
  );
}
