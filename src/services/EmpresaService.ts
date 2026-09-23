
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { Empresa } from "../types/Empresa";

const empresasRef = collection(db, "empresas");

/**
 * Cria uma nova empresa
 */
export async function criarEmpresa(
  empresa: Omit<Empresa, "id" | "criadoEm" | "ultimoAcesso">,
): Promise<string> {
  const docRef = await addDoc(empresasRef, {
    ...empresa,
    criadoEm: serverTimestamp(),
    ultimoAcesso: serverTimestamp(),
  });

  return docRef.id;
}

export async function buscarEmpresaPorUsuario(uid: string) {
  const q = query(
    collection(db, "empresas"),
    where("usuarios", "array-contains", uid),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  } as Empresa;
}

export async function buscarEmpresa(
  empresaId: string,
): Promise<Empresa | null> {
  try {
    const referencia = doc(db, "empresas", empresaId);

    const snapshot = await getDoc(referencia);

    if (!snapshot.exists()) {
      return null;
    }

    console.log("Snapshot: " + snapshot);

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Empresa;
  } catch (error) {
    console.error("Erro ao buscar empresa:", error);
    throw error;
  }
}

export async function atualizarEmpresa(
  empresaId: string,
  dados: Partial<Empresa>,
): Promise<void> {
  try {
    const referencia = doc(db, "empresas", empresaId);

    await setDoc(referencia, dados, {
      merge: true,
    });
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    throw error;
  }
}

export async function ativarLicencaEmpresa(chave: string) {
  const usuario = auth.currentUser;

  if (!usuario) {
    throw new Error("Usuário não autenticado.");
  }

  const chaveNormalizada = chave.trim();

  if (!chaveNormalizada) {
    throw new Error("Informe a chave da licença.");
  }

  // A chave é o ID do documento da empresa
  const empresaRef = doc(db, "empresas", chaveNormalizada);

  const empresaSnap = await getDoc(empresaRef);

  if (!empresaSnap.exists()) {
    throw new Error("Licença não encontrada.");
  }

  // Vincula o usuário à empresa
  await updateDoc(empresaRef, {
    ativo: true,
    usuarios: arrayUnion(usuario.uid),
    ultimoAcesso: serverTimestamp(),
  });

  return {
    empresaId: empresaSnap.id,
  };
}

export async function buscarLicencaPorUsuario(
  uid: string,
): Promise<Empresa | null> {
  const referencia = collection(db, "empresas");

  const consulta = query(referencia, where("empresas", "array-contains", uid));

  const snapshot = await getDocs(consulta);

  if (snapshot.empty) {
    return null;
  }

  const documento = snapshot.docs[0];

  return {
    id: documento.id,
    ...documento.data(),
  } as Empresa;
}
