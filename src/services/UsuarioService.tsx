import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, firebaseConfig } from "../firebase/config";
import type { Perfil, Usuario } from "../types/Usuario";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import { buscarEmpresa } from "./EmpresaService";

type DadosNovoUsuario = {
  nome: string;
  email: string;
  telefone: string;
  perfil: "admin" | "funcionario";
  senha: string;
};

const colecao = "usuarios";

export async function buscarUsuario(uid: string): Promise<Usuario | null> {
  const referencia = doc(db, colecao, uid);
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Usuario;
}

export async function criarUsuario(usuario: Usuario) {
  const referencia = doc(db, colecao, usuario.uid);

  await setDoc(referencia, {
    ...usuario,
    criadoEm: Timestamp.now(),
  });
}

export async function listarUsuariosDaEmpresa(
  empresaId: string,
): Promise<Usuario[]> {
  try {
    // Busca a empresa através do EmpresaService
    console.log(empresaId);
    const empresa = await buscarEmpresa(empresaId);

    // Lista de UIDs cadastrados na empresa
    const uids: string[] = empresa!.usuarios ?? [];
    console.log(uids);

    if (uids.length === 0) {
      return [];
    }

    // Busca os usuários
    const usuariosSnapshot = await getDocs(collection(db, "usuarios"));

    // Filtra somente os usuários da empresa
    const usuarios = usuariosSnapshot.docs
      .filter((usuarioDoc) => uids.includes(usuarioDoc.id))
      .map((usuarioDoc) => ({
        uid: usuarioDoc.id,
        ...usuarioDoc.data(),
      })) as Usuario[];

    return usuarios;
  } catch (error) {
    console.error("Erro ao listar usuários da empresa:", error);

    throw error;
  }
}

export async function cadastrarUsuario(
  empresaId: string,
  dados: DadosNovoUsuario,
) {
  // Cria uma segunda instância do Firebase
  // para não alterar o login do administrador
  const appSecundario =
    getApps().find((app) => app.name === "CadastroUsuario") ??
    initializeApp(firebaseConfig, "CadastroUsuario");

  const authSecundario = getAuth(appSecundario);

  try {
    // 1. Cria o usuário no Firebase Authentication
    const resultado = await createUserWithEmailAndPassword(
      authSecundario,
      dados.email,
      dados.senha,
    );

    const uid = resultado.user.uid;

    // 2. Cria o documento do usuário
    await setDoc(doc(db, "usuarios", uid), dados);

    // 3. Adiciona o UID na empresa
    await updateDoc(doc(db, "empresas", empresaId), {
      usuarios: arrayUnion(uid),
    });

    return {
      uid,
    };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    throw error;
  } finally {
    // Garante que a instância secundária
    // não permaneça autenticada
    await signOut(authSecundario);
  }
}

type DadosAtualizacaoUsuario = {
  nome: string;
  email: string;
  telefone: string;
  perfil: Perfil;
  ativo: boolean;
};

export async function atualizarUsuario(
  uid: string,
  dados: DadosAtualizacaoUsuario,
) {
  try {
    const usuarioRef = doc(db, "usuarios", uid);

    await updateDoc(usuarioRef, dados);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    throw error;
  }
}
