import "./modalClientes.css";
import { useState } from "react";
import type { Cliente } from "../../../../../types/Cliente";
interface ModalClienteProps {
  cliente: Cliente | null;
  onSalvar: (cliente: Cliente) => void | Promise<void>;
  onFechar: () => void;
}
export default function ModalCliente({
  cliente,
  onSalvar,
  onFechar,
}: ModalClienteProps) {
  const [nome, setNome] = useState(cliente?.nome ?? "");
  const [telefone, setTelefone] = useState(cliente?.telefone ?? "");
  const [endereco, setEndereco] = useState(cliente?.endereco ?? "");
  const [observacao, setObservacao] = useState(cliente?.observacao ?? "");
  const [ativo, setAtivo] = useState(cliente?.ativo ?? true);
  function salvar() {
    if (!nome.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }
    const novoCliente: Cliente = {
      id: cliente?.id ?? crypto.randomUUID(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      endereco: endereco.trim(),
      observacao: observacao.trim(),
      ativo,
    };
    onSalvar(novoCliente);
  }
  return (
    <div className="cliente-modal-overlay">
      {" "}
      <div className="cliente-modal">
        {" "}
        {/* HEADER */}{" "}
        <div className="cliente-modal-header">
          {" "}
          <div>
            {" "}
            <h2> {cliente ? "Editar cliente" : "Novo cliente"} </h2>{" "}
            <span> Preencha os dados do cliente </span>{" "}
          </div>{" "}
          <button type="button" onClick={onFechar}>
            {" "}
            ×{" "}
          </button>{" "}
        </div>{" "}
        {/* FORMULÁRIO */}{" "}
        <div className="cliente-form">
          {" "}
          {/* NOME */}{" "}
          <div className="campo">
            {" "}
            <label>Nome *</label>{" "}
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do cliente"
              autoFocus
            />{" "}
          </div>{" "}
          {/* TELEFONE */}{" "}
          <div className="campo">
            {" "}
            <label>Telefone</label>{" "}
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
            />{" "}
          </div>{" "}
          {/* ENDEREÇO */}{" "}
          <div className="campo">
            {" "}
            <label>Endereço</label>{" "}
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Endereço do cliente"
            />{" "}
          </div>{" "}
          {/* OBSERVAÇÃO */}{" "}
          <div className="campo">
            {" "}
            <label>Observação</label>{" "}
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Alguma observação..."
              rows={3}
            />{" "}
          </div>{" "}
          {/* STATUS */}{" "}
          <div className="campo-status">
            {" "}
            <div>
              {" "}
              <label>Status do cliente</label>{" "}
              <span> {ativo ? "Cliente ativo" : "Cliente inativo"} </span>{" "}
            </div>{" "}
            <button
              type="button"
              className={`switch ${ativo ? "ativo" : ""}`}
              onClick={() => setAtivo(!ativo)}
              aria-label="Alterar status do cliente"
            >
              {" "}
              <span />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {/* FOOTER */}{" "}
        <div className="cliente-modal-footer">
          {" "}
          <button type="button" className="btn-cancelar" onClick={onFechar}>
            {" "}
            Cancelar{" "}
          </button>{" "}
          <button type="button" className="btn-salvar" onClick={salvar}>
            {" "}
            Salvar cliente{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
