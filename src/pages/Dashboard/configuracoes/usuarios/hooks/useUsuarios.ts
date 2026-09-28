import { useCallback, useEffect, useState } from "react";
import type { Perfil, Usuario } from "../../../../../types/Usuario";
import {
  atualizarUsuario,
  cadastrarUsuario,
  listarUsuariosDaEmpresa,
} from "../../../../../services/UsuarioService";
import { useAuth } from "../../../../../contexts/AuthContext";

export default function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const { empresa } = useAuth();
  const empresaId = empresa!.id;

  /**
   * BUSCAR USUÁRIOS
   */
  const carregarUsuarios = useCallback(async () => {
    if (!empresaId) {
      setUsuarios([]);
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const resultado = await listarUsuariosDaEmpresa(empresaId);

      setUsuarios(resultado);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);

      setErro("Não foi possível carregar os usuários.");
    } finally {
      setCarregando(false);
    }
  }, [empresaId]);

  /**
   * CADASTRAR USUÁRIO
   */
  const criarUsuario = async (dados: {
    nome: string;
    email: string;
    telefone: string;
    perfil: Perfil;
    senha: string;
    ativo: boolean;
  }): Promise<boolean> => {
    try {
      setSalvando(true);
      setErro(null);
      await cadastrarUsuario(empresaId, dados);
      await carregarUsuarios();
      return true;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErro("Não foi possível cadastrar o usuário.");
      return false;
    } finally {
      setSalvando(false);
    }
  };

  /**
   * ATUALIZAR USUÁRIO
   */
  const editarUsuario = async (
    uid: string,
    dados: {
      nome: string;
      email: string;
      telefone: string;
      perfil: Perfil;
      ativo: boolean;
    },
  ): Promise<boolean> => {
    try {
      setSalvando(true);
      setErro(null);
      await atualizarUsuario(uid, dados);
      await carregarUsuarios();
      return true;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setErro("Não foi possível atualizar o usuário.");

      return false;
    } finally {
      setSalvando(false);
    }
  };

  /**
   * CARREGA AO ABRIR
   */
  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  return {
    usuarios,

    carregando,
    salvando,
    erro,

    carregarUsuarios,
    criarUsuario,
    editarUsuario,
  };
}
