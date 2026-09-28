import {
  doc,
  getDoc,
} from "firebase/firestore";
import type { VersionInfo } from "../types/VersionInfo";
import { db } from "../firebase/config";



const CONFIG_COLLECTION = "config";
const APP_DOCUMENT = "app";

export async function buscarInformacoesApp(): Promise<VersionInfo | null> {
  try {
    const referencia = doc(
      db,
      CONFIG_COLLECTION,
      APP_DOCUMENT
    );

    const snapshot = await getDoc(referencia);

    if (!snapshot.exists()) {
      console.warn("Configuração do aplicativo não encontrada.");
      return null;
    }

    return snapshot.data() as VersionInfo;

  } catch (error) {
    console.error(
      "Erro ao buscar informações do aplicativo:",
      error
    );

    throw error;
  }
}

export function existeAtualizacao(
  versaoAtual: string,
  versaoDisponivel: string
): boolean {

  const atual = versaoAtual.split(".").map(Number);
  const disponivel = versaoDisponivel.split(".").map(Number);

  const tamanho = Math.max(
    atual.length,
    disponivel.length
  );

  for (let i = 0; i < tamanho; i++) {

    const numeroAtual = atual[i] ?? 0;
    const numeroDisponivel = disponivel[i] ?? 0;

    if (numeroDisponivel > numeroAtual) {
      return true;
    }

    if (numeroDisponivel < numeroAtual) {
      return false;
    }
  }

  return false;
}