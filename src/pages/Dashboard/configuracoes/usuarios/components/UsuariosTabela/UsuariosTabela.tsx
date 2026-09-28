import type { Usuario } from "../../../../../../types/Usuario";

import "./usuariosTabela.css";

type Props = {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
};

export default function UsuariosTabela({
  usuarios,
  onEditar,
}: Props) {
  return (
    <div className="usuarios-tabela">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Perfil</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.uid}>
              <td>{usuario.nome}</td>

              <td>{usuario.email}</td>

              <td>
                {usuario.telefone || "-"}
              </td>

              <td>
                {usuario.perfil === "admin"
                  ? "Administrador"
                  : "Funcionário"}
              </td>

              <td>
                <span
                  className={
                    usuario.ativo
                      ? "status-ativo"
                      : "status-inativo"
                  }
                >
                  {usuario.ativo
                    ? "Ativo"
                    : "Inativo"}
                </span>
              </td>

              <td className="usuario-acoes">
                <div className="menu-usuario">
                  <button
                    type="button"
                    onClick={() =>
                      onEditar(usuario)
                    }
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}