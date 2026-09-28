import { useState } from "react";

import UsuariosHeader from "./components/UsuariosHeader/UsuariosHeader";
import UsuariosResumo from "./components/UsuariosResumo/UsuariosResumo";
import UsuariosBusca from "./components/UsuariosBusca/UsuariosBusca";
import UsuariosTabela from "./components/UsuariosTabela/UsuariosTabela";
import ModalUsuario from "./components/ModalUsuario/ModalUsuario";

import "./usuarios.css";
import useUsuarios from "./hooks/useUsuarios";

import type { Usuario } from "../../../../types/Usuario";

export default function Usuarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");

  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const { usuarios, carregando, salvando, erro, criarUsuario, editarUsuario } =
    useUsuarios();

  /*
   * FILTRO
   */
  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nome} ${usuario.email} ${usuario.telefone ?? ""}`
      .toLowerCase()
      .includes(busca.toLowerCase()),
  );

  /*
   * RESUMO
   */
  const totalUsuarios = usuarios.length;

  const usuariosAtivos = usuarios.filter((usuario) => usuario.ativo).length;

  const usuariosInativos = usuarios.filter((usuario) => !usuario.ativo).length;

  /*
   * NOVO USUÁRIO
   */
  const abrirNovoUsuario = () => {
    setUsuarioEditando(null);
    setModalAberto(true);
  };

  /*
   * EDITAR USUÁRIO
   */
  const abrirEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModalAberto(true);
  };

  /*
   * FECHAR MODAL
   */
  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioEditando(null);
  };

  /*
   * SALVAR
   */
  const handleSalvarUsuario = async (dados: {
    nome: string;
    email: string;
    telefone: string;
    perfil: "admin" | "funcionario";
    senha?: string;
    ativo?: boolean;
  }): Promise<boolean> => {
    if (usuarioEditando) {
      return await editarUsuario(usuarioEditando.uid, {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        perfil: dados.perfil,
        ativo: dados.ativo ?? true,
      });
    }

    if (!dados.senha) {
      return false;
    }

    return await criarUsuario({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      perfil: dados.perfil,
      senha: dados.senha,
      ativo: true,
    });
  };

  return (
    <div className="usuarios-page">
      <UsuariosHeader onNovoUsuario={abrirNovoUsuario} />

      <UsuariosResumo
        total={totalUsuarios}
        ativos={usuariosAtivos}
        inativos={usuariosInativos}
      />

      <div className="usuarios-container">
        <UsuariosBusca busca={busca} onBuscaChange={setBusca} />

        {erro && <div className="usuarios-erro">{erro}</div>}

        {carregando ? (
          <div className="usuarios-carregando">Carregando usuários...</div>
        ) : (
          <UsuariosTabela
            usuarios={usuariosFiltrados}
            onEditar={abrirEditarUsuario}
          />
        )}
      </div>

      {modalAberto && (
        <ModalUsuario
          usuario={usuarioEditando}
          salvando={salvando}
          erro={erro}
          onFechar={fecharModal}
          onSalvar={handleSalvarUsuario}
        />
      )}
    </div>
  );
}
