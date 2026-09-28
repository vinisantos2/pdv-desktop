import { useEffect, useState } from "react";

import "./modalUsuario.css";

import type {
  Perfil,
  Usuario,
} from "../../../../../../types/Usuario";

export type DadosFormulario = {
  nome: string;
  email: string;
  telefone: string;
  perfil: Perfil;
  senha?: string;
  ativo: boolean;
};

type Props = {
  onFechar: () => void;

  usuario?: Usuario | null;

  onSalvar: (
    dados: DadosFormulario
  ) => Promise<boolean>;

  salvando?: boolean;

  erro?: string | null;
};

export default function ModalUsuario({
  onFechar,
  usuario,
  onSalvar,
  salvando = false,
  erro: erroExterno,
}: Props) {
  const editando = !!usuario;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [perfil, setPerfil] =
    useState<Perfil>("funcionario");

  const [senha, setSenha] = useState("");

  const [ativo, setAtivo] = useState(true);

  const [erro, setErro] = useState("");

  /**
   * PREENCHE FORMULÁRIO
   */
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome ?? "");
      setEmail(usuario.email ?? "");
      setTelefone(usuario.telefone ?? "");
      setPerfil(
        usuario.perfil ?? "funcionario"
      );

      setAtivo(usuario.ativo ?? true);

      setSenha("");
    } else {
      setNome("");
      setEmail("");
      setTelefone("");
      setPerfil("funcionario");

      setAtivo(true);

      setSenha("");
    }

    setErro("");
  }, [usuario]);

  /**
   * SALVAR
   */
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErro("");

    if (!nome.trim()) {
      setErro("Informe o nome do usuário.");
      return;
    }

    if (!email.trim()) {
      setErro("Informe o e-mail do usuário.");
      return;
    }

    /*
     * Senha obrigatória somente
     * quando estiver criando.
     */
    if (!editando) {
      if (!senha || senha.length < 6) {
        setErro(
          "A senha deve possuir pelo menos 6 caracteres."
        );

        return;
      }
    }

    const sucesso = await onSalvar({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      perfil,
      senha: editando
        ? undefined
        : senha,
      ativo,
    });

    if (sucesso) {
      onFechar();
    }
  };

  return (
    <div
      className="modal-usuario-overlay"
      onClick={onFechar}
    >
      <div
        className="modal-usuario"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* HEADER */}
        <div className="modal-usuario-header">
          <div>
            <h2>
              {editando
                ? "Editar usuário"
                : "Novo usuário"}
            </h2>

            <p>
              {editando
                ? "Atualize os dados e permissões do usuário."
                : "Crie um novo acesso ao sistema."}
            </p>
          </div>

          <button
            type="button"
            className="modal-usuario-fechar"
            onClick={onFechar}
            disabled={salvando}
          >
            ×
          </button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit}>
          <div className="modal-usuario-body">

            {/* ERRO */}
            {(erro || erroExterno) && (
              <div className="modal-usuario-erro">
                {erro || erroExterno}
              </div>
            )}

            {/* NOME */}
            <div className="modal-usuario-campo">
              <label htmlFor="nome">
                Nome
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
                placeholder="Nome completo"
                required
                disabled={salvando}
              />
            </div>

            {/* EMAIL */}
            <div className="modal-usuario-campo">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="usuario@email.com"
                required
                disabled={
                  editando || salvando
                }
              />

              {editando && (
                <span className="modal-usuario-ajuda">
                  O e-mail não pode ser alterado
                  por aqui.
                </span>
              )}
            </div>

            {/* TELEFONE */}
            <div className="modal-usuario-campo">
              <label htmlFor="telefone">
                Telefone
              </label>

              <input
                id="telefone"
                type="tel"
                value={telefone}
                onChange={(e) =>
                  setTelefone(e.target.value)
                }
                placeholder="(00) 00000-0000"
                disabled={salvando}
              />
            </div>

            {/* PERFIL */}
            <div className="modal-usuario-campo">
              <label htmlFor="perfil">
                Perfil
              </label>

              <select
                id="perfil"
                value={perfil}
                onChange={(e) =>
                  setPerfil(
                    e.target.value as Perfil
                  )
                }
                disabled={salvando}
              >
                <option value="funcionario">
                  Funcionário
                </option>

                <option value="admin">
                  Administrador
                </option>
              </select>
            </div>

            {/* STATUS */}
            {editando && (
              <div className="modal-usuario-campo">
                <label htmlFor="ativo">
                  Status
                </label>

                <select
                  id="ativo"
                  value={ativo ? "ativo" : "inativo"}
                  onChange={(e) =>
                    setAtivo(
                      e.target.value === "ativo"
                    )
                  }
                  disabled={salvando}
                >
                  <option value="ativo">
                    Ativo
                  </option>

                  <option value="inativo">
                    Inativo
                  </option>
                </select>
              </div>
            )}

            {/* SENHA */}
            {!editando && (
              <div className="modal-usuario-campo">
                <label htmlFor="senha">
                  Senha
                </label>

                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                  placeholder="Digite uma senha"
                  required
                  minLength={6}
                  disabled={salvando}
                />

                <span className="modal-usuario-ajuda">
                  A senha deve possuir pelo menos
                  6 caracteres.
                </span>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-usuario-footer">
            <button
              type="button"
              className="btn-modal-cancelar"
              onClick={onFechar}
              disabled={salvando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-modal-salvar"
              disabled={salvando}
            >
              {salvando
                ? "Salvando..."
                : editando
                  ? "Salvar alterações"
                  : "Criar usuário"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}