import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  Timestamp,
  Transaction,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "../firebase/config";
import type { Venda } from "../types/Venda";
import type { ItemVenda } from "../types/ItemVenda";
import type { Produto } from "../types/Produto";

// =========================================================
// CRIAR VENDA
// =========================================================

export async function criarVenda(
  empresaId: string,
  total: number,
  formaPagamento: Venda["formaPagamento"],
  itensVenda: ItemVenda[],
  clienteId?: string,
  clienteNome?: string,
): Promise<Venda> {
  if (itensVenda.length === 0) {
    throw new Error("Nenhum item na venda.");
  }

  if (formaPagamento === "fiado" && !clienteId) {
    throw new Error("É necessário selecionar um cliente.");
  }

  const vendaRef = doc(collection(db, "empresas", empresaId, "vendas"));

  const venda: Venda = {
    id: vendaRef.id,
    data: Timestamp.now(),
    total,
    formaPagamento,
    itens: itensVenda,
    statusPagamento: formaPagamento === "fiado" ? "pendente" : "pago",
    ...(clienteId && {
      clienteId,
      clienteNome,
    }),
  };

  await runTransaction(db, async (transaction) => {
    const produtos = await buscarProdutosVenda(
      empresaId,
      itensVenda,
      transaction,
    );

    validarEstoque(itensVenda, produtos);

    transaction.set(vendaRef, venda);

    baixarEstoque(empresaId, itensVenda, produtos, transaction);
  });

  return venda;
}

async function buscarProdutosVenda(
  empresaId: string,
  itens: ItemVenda[],
  transaction: Transaction,
): Promise<Map<string, Produto>> {
  const produtos = new Map<string, Produto>();

  for (const item of itens) {
    if (produtos.has(item.codigoBarras)) continue;

    const ref = doc(db, "empresas", empresaId, "produtos", item.codigoBarras);

    const snapshot = await transaction.get(ref);

    if (!snapshot.exists()) {
      throw new Error(`Produto não encontrado: ${item.codigoBarras}`);
    }

    produtos.set(item.codigoBarras, snapshot.data() as Produto);
  }

  return produtos;
}

function validarEstoque(itens: ItemVenda[], produtos: Map<string, Produto>) {
  for (const item of itens) {
    const produto = produtos.get(item.codigoBarras);

    if (!produto) {
      throw new Error(`Produto não encontrado: ${item.descricao}`);
    }

    if (produto.estoque < item.quantidade) {
      throw new Error(`Estoque insuficiente para ${produto.descricao}.`);
    }
  }
}

function baixarEstoque(
  empresaId: string,
  itens: ItemVenda[],
  produtos: Map<string, Produto>,
  transaction: Transaction,
) {
  for (const item of itens) {
    const produto = produtos.get(item.codigoBarras);

    if (!produto) continue;

    const ref = doc(db, "empresas", empresaId, "produtos", item.codigoBarras);

    transaction.update(ref, {
      estoque: produto.estoque - item.quantidade,
    });
  }
}

// =========================================================
// BUSCAR VENDAS DE HOJE
// =========================================================

export async function buscarVendasHoje(uid: string): Promise<Venda[]> {
  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);

  const fim = new Date();
  fim.setHours(23, 59, 59, 999);

  const inicioTimestamp = Timestamp.fromDate(inicio);
  const fimTimestamp = Timestamp.fromDate(fim);

  const vendasRef = collection(db, "empresas", uid, "vendas");

  const q = query(
    vendasRef,
    where("data", ">=", inicioTimestamp),
    where("data", "<=", fimTimestamp),
    orderBy("data", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Venda);
}

// =========================================================
// BUSCAR ÚLTIMAS VENDAS
// =========================================================

export async function buscarUltimasVendas(
  uid: string,
  quantidade: number = 5,
): Promise<Venda[]> {
  const vendasRef = collection(db, "empresas", uid, "vendas");

  const q = query(vendasRef, orderBy("data", "desc"), limit(quantidade));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Venda);
}

// =========================================================
// RESUMO DAS VENDAS DE HOJE
// =========================================================

export async function buscarResumoVendasHoje(uid: string) {
  const vendas = await buscarVendasHoje(uid);

  const quantidade = vendas.length;

  const faturamento = vendas.reduce((total, venda) => total + venda.total, 0);

  return {
    quantidade,
    faturamento,
  };
}

// =========================================================
// LISTAR VENDAS
// =========================================================

export async function listarVendas(empresaId: string): Promise<Venda[]> {
  const vendasRef = collection(db, "empresas", empresaId, "vendas");

  const q = query(vendasRef, orderBy("data", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Venda[];
}

export async function listarVendasFiadas(empresaId: string): Promise<Venda[]> {
  const vendasRef = collection(db, "empresas", empresaId, "vendas");

  const q = query(
    vendasRef,
    where("formaPagamento", "==", "fiado"),
    where("statusPagamento", "==", "pendente"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Venda[];
}

export async function registrarPagamentoFiado(
  empresaId: string,
  vendas: Venda[],
): Promise<void> {
  if (!vendas.length) {
    throw new Error("Nenhuma venda foi selecionada.");
  }

  const batch = writeBatch(db);

  const dataPagamento = Timestamp.now();

  vendas.forEach((venda) => {
    const vendaRef = doc(db, "empresas", empresaId, "vendas", venda.id);

    batch.update(vendaRef, {
      statusPagamento: "pago",
      dataPagamento,
    });
  });

  await batch.commit();
}
