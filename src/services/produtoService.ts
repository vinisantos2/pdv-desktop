import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";
import type { Produto } from "../types/Produto";

const produtosRef = (empresaId: string) =>
  collection(db, "empresas", empresaId, "produtos");

// =========================================================
// SALVAR PRODUTO
// =========================================================

export async function salvarProduto(
  empresaId: string,
  produto: Produto,
): Promise<Produto> {
  const ref = doc(produtosRef(empresaId), produto.codigoBarras);

  await setDoc(ref, produto);

  return produto;
}

// =========================================================
// LISTAR PRODUTOS
// =========================================================

export async function listarProdutos(empresaId: string): Promise<Produto[]> {
  const q = query(produtosRef(empresaId), orderBy("descricao"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Produto);
}

// =========================================================
// ATUALIZAR PRODUTO
// =========================================================

export async function atualizarProduto(
  empresaId: string,
  produto: Produto,
): Promise<boolean> {
  const ref = doc(produtosRef(empresaId), produto.codigoBarras);

  await updateDoc(ref, {
    descricao: produto.descricao,
    preco: produto.preco,
    estoque: produto.estoque,

    ...(produto.imagemPatch !== undefined && {
      imagemPatch: produto.imagemPatch,
    }),

    
  });

  return true;
}

// =========================================================
// EXCLUIR PRODUTO
// =========================================================

export async function excluirProduto(
  empresaId: string,
  codigo: string,
): Promise<boolean> {
  const ref = doc(produtosRef(empresaId), codigo);

  await deleteDoc(ref);

  return true;
}

// =========================================================
// BUSCAR POR CÓDIGO
// =========================================================

export async function buscarPorCodigo(
  empresaId: string,
  codigo: string,
): Promise<Produto | null> {
  const ref = doc(produtosRef(empresaId), codigo);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Produto;
}

// =========================================================
// BUSCAR POR CÓDIGO OU DESCRIÇÃO
// =========================================================

export async function buscarProdutos(
  empresaId: string,
  texto: string,
): Promise<Produto[]> {
  const q = query(produtosRef(empresaId), orderBy("descricao"));

  const snapshot = await getDocs(q);

  const textoNormalizado = texto.toLowerCase();

  return snapshot.docs
    .map((doc) => doc.data() as Produto)
    .filter(
      (produto) =>
        produto.codigoBarras.toLowerCase().includes(textoNormalizado) ||
        produto.descricao.toLowerCase().includes(textoNormalizado),
    );
}

// =========================================================
// BUSCAR POR DESCRIÇÃO
// =========================================================

export async function buscarPorDescricao(
  empresaId: string,
  descricao: string,
): Promise<Produto[]> {
  const q = query(produtosRef(empresaId), orderBy("descricao"), limit(10));

  const snapshot = await getDocs(q);

  const texto = descricao.toLowerCase();

  return snapshot.docs
    .map((doc) => doc.data() as Produto)
    .filter((produto) => produto.descricao.toLowerCase().includes(texto));
}

// =========================================================
// ESTOQUE BAIXO
// =========================================================

export async function estoqueBaixo(empresaId: string): Promise<Produto[]> {
  const q = query(
    produtosRef(empresaId),
    where("estoque", "<=", 5),
    orderBy("estoque"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Produto);
}
