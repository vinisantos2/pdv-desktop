import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../firebase/config";

/**
 * Faz upload de uma imagem para o Firebase Storage
 */
export async function uploadImagem(
  arquivo: File,
  caminho: string,
): Promise<string> {
  if (!arquivo) {
    throw new Error("Nenhuma imagem foi selecionada.");
  }

  const arquivoRef = ref(storage, caminho);

  await uploadBytes(arquivoRef, arquivo);

  return await getDownloadURL(arquivoRef);
}

/**
 * Exclui uma imagem do Firebase Storage
 */
export async function deletarImagem(caminho: string): Promise<void> {
  const arquivoRef = ref(storage, caminho);

  await deleteObject(arquivoRef);
}
