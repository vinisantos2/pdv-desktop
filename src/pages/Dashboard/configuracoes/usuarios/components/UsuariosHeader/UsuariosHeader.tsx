import "./usuariosHeader.css";

type Props = {
  onNovoUsuario: () => void;
};

export default function UsuariosHeader({ onNovoUsuario }: Props) {
  return (
    <div className="usuarios-header">
      <div>
        <h1>Usuários</h1>

        <p>Gerencie os usuários que possuem acesso ao seu PDV.</p>
      </div>

      <button className="btn-novo-usuario" onClick={onNovoUsuario}>
        <span>+</span>
        Novo usuário
      </button>
    </div>
  );
}
