import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/config";
import { buscarUsuario } from "./UsuarioService";

export async function fazerLogin(email: string, senha: string) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha);

  const user = resultado.user;

  const usuario = await buscarUsuario(user.uid);

  return {
    user,
    usuario,
    primeiroAcesso: usuario === null,
  };
}

export async function alterarSenha(novaSenha: string) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  await updatePassword(user, novaSenha);
}

export async function fazerLogout() {
  await signOut(auth);
}

export async function criarConta(email: string, senha: string, nome: string) {
  const credencial = await createUserWithEmailAndPassword(auth, email, senha);

  await updateProfile(credencial.user, {
    displayName: nome,
  });

  return credencial.user;
}
