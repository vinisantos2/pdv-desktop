import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Usuario } from "../types/Usuario";

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
