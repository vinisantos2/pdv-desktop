import "./usuariosBusca.css";

type Props = {
  busca: string;
  onBuscaChange: (valor: string) => void;
};

export default function UsuariosBusca({
  busca,
  onBuscaChange,
}: Props) {
  return (
    <div className="usuarios-toolbar">
      <div className="usuarios-busca">
        <span>⌕</span>

        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar por nome, e-mail ou telefone..."
        />
      </div>
    </div>
  );
}