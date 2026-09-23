    import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    } from "firebase/firestore";

    import { db } from "../firebase/config";
    import type { Cliente } from "../types/Cliente";

    // =========================================================
    // REFERÊNCIA DA COLEÇÃO
    // =========================================================

    const clientesRef = (empresaId: string) =>
    collection(db, "empresas", empresaId, "clientes");

    // =========================================================
    // SALVAR CLIENTE
    // =========================================================

    export async function salvarCliente(
    empresaId: string,
    cliente: Cliente,
    ): Promise<Cliente> {
    const ref = doc(clientesRef(empresaId), cliente.id);

    await setDoc(ref, cliente);

    return cliente;
    }

    // =========================================================
    // LISTAR CLIENTES
    // =========================================================

    export async function listarClientes(empresaId: string): Promise<Cliente[]> {
    const q = query(clientesRef(empresaId), orderBy("nome"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data() as Cliente);
    }

    // =========================================================
    // ATUALIZAR CLIENTE
    // =========================================================

    export async function atualizarCliente(
    empresaId: string,
    cliente: Cliente,
    ): Promise<boolean> {
    const ref = doc(clientesRef(empresaId), cliente.id);

    await updateDoc(ref, {
        nome: cliente.nome,
        telefone: cliente.telefone ?? "",
        endereco: cliente.endereco ?? "",
        observacao: cliente.observacao ?? "",
        ativo: cliente.ativo,
    });

    return true;
    }

    // =========================================================
    // EXCLUIR CLIENTE
    // =========================================================

    export async function excluirCliente(
    empresaId: string,
    id: string,
    ): Promise<boolean> {
    const ref = doc(clientesRef(empresaId), id);

    await deleteDoc(ref);

    return true;
    }
