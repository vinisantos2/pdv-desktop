import "./usuariosResumo.css";

type Props = {
  total: number;
  ativos: number;
  inativos: number;
};

export default function UsuariosResumo({
  total,
  ativos,
  inativos,
}: Props) {
  return (
    <div className="usuarios-resumo">

      <div className="usuario-card">
        <div>
          <span className="usuario-card-label">
            Total de usuários
          </span>

          <strong>{total}</strong>
        </div>

        <div className="usuario-card-icon">
          👥
        </div>
      </div>

      <div className="usuario-card">
        <div>
          <span className="usuario-card-label">
            Usuários ativos
          </span>

          <strong>{ativos}</strong>
        </div>

        <div className="usuario-card-icon">
          ✓
        </div>
      </div>

      <div className="usuario-card">
        <div>
          <span className="usuario-card-label">
            Usuários inativos
          </span>

          <strong>{inativos}</strong>
        </div>

        <div className="usuario-card-icon">
          ○
        </div>
      </div>

    </div>
  );
}