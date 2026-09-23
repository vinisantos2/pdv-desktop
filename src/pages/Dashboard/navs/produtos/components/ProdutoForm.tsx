import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import "./form.css";

import {
  atualizarProduto,
  salvarProduto,
} from "../../../../../services/produtoService";

import { useAuth } from "../../../../../contexts/AuthContext";

import type { Produto } from "../../../../../types/Produto";

import { uploadImagem } from "../../../../../services/imagemService/uploadImagemService";

import ImagemSelect from "../../../../../components/imgemSelect/ImagemSelect";
import imageCompression from "browser-image-compression";
import Loading from "../../../../../components/loading/Loading";

interface ProdutoFormProps {
  produtoSelecionado: Produto | null;
  onSalvo: () => void;
  limpar: () => void;
}

function ProdutoForm({
  produtoSelecionado,
  onSalvo,
  limpar,
}: ProdutoFormProps) {
  // =========================
  // DADOS DO PRODUTO
  // =========================

  const [codigoBarras, setCodigoBarras] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const { empresa } = useAuth();
  const [carregando, setCarregando] = useState(false);

  // =========================
  // IMAGEM
  // =========================

  const [imagemPatch, setImagemPatch] = useState("");

  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);

  // =========================
  // LIMPAR FORMULÁRIO
  // =========================

  function limparFormulario() {
    setCodigoBarras("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagemPatch("");
    setImagemArquivo(null);
    limpar();
  }

  // =========================
  // SALVAR PRODUTO
  // =========================

  async function handlerSalvarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!empresa?.id) {
      console.error("Empresa não encontrada.");
      return;
    }

    try {
      // =========================================
      // IMAGEM
      // =========================================

      setCarregando(true);

      let imagemUrl = imagemPatch;

      if (imagemArquivo) {
        const imagemSalvar = await imageCompression(imagemArquivo, {
          initialQuality: 0.5,
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: "image/webp",
        });

        const caminho =
          `empresas/${empresa.id}/produtos/` + `${codigoBarras.trim()}.webp`;

        imagemUrl = await uploadImagem(imagemSalvar, caminho);
      }

      // =========================================
      // PRODUTO
      // =========================================

      const produto: Produto = {
        codigoBarras: codigoBarras.trim(),
        descricao: descricao.trim(),
        preco: Number(preco),
        estoque: Number(estoque),
        imagemPatch: imagemUrl || undefined,
      };

      // =========================================
      // ATUALIZAR
      // =========================================

      if (produtoSelecionado) {
        await atualizarProduto(empresa.id, produto);
        console.log("Produto atualizado:", produto);
      } else {
        // =========================================
        // NOVO CADASTRO
        // =========================================

        await salvarProduto(empresa.id, produto);

        console.log("Produto cadastrado:", produto);
      }

      // =========================================
      // FINALIZA
      // =========================================

      onSalvo();

      limparFormulario();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setCarregando(false);
    }
  }

  // =========================
  // CARREGAR PRODUTO
  // =========================

  useEffect(() => {
    if (!produtoSelecionado) {
      limparFormulario();
      return;
    }

    setCodigoBarras(produtoSelecionado.codigoBarras);

    setDescricao(produtoSelecionado.descricao);

    setPreco(String(produtoSelecionado.preco));

    setEstoque(String(produtoSelecionado.estoque));

    setImagemPatch(produtoSelecionado.imagemPatch ?? "");

    // Não colocamos o File aqui.
    // O arquivo só existe quando o usuário
    // selecionar uma nova imagem.
    setImagemArquivo(null);
  }, [produtoSelecionado]);

  return (
    <form className="produto-formulario" onSubmit={handlerSalvarProduto}>
      {/* =========================
          HEADER
      ========================= */}

      <div className="form-header">
        <h2>{produtoSelecionado ? "Editar Produto" : "Novo Produto"}</h2>

        <p>Cadastre as informações do produto</p>
      </div>

      {/* =========================
          CONTEÚDO
      ========================= */}

      <div className="produto-form-conteudo">
        {/* =========================
            IMAGEM
        ========================= */}

        <div className="produto-imagem-area">
          <ImagemSelect
            imagemInicial={imagemPatch}
            onImagemSelecionada={setImagemArquivo}
          />
        </div>

        {/* =========================
            DADOS
        ========================= */}

        <div className="produto-dados">
          {/* CÓDIGO */}

          <div className="campo">
            <label htmlFor="codigoBarras">Código de barras</label>

            <input
              id="codigoBarras"
              type="text"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
            />
          </div>

          {/* DESCRIÇÃO */}

          <div className="campo">
            <label htmlFor="descricao">Descrição</label>

            <input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {/* PREÇO / ESTOQUE */}

          <div className="produto-dados-linha">
            <div className="campo campo-preco">
              <label htmlFor="preco">Preço</label>

              <input
                id="preco"
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>

            <div className="campo campo-estoque">
              <label htmlFor="estoque">Estoque</label>

              <input
                id="estoque"
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          AÇÕES
      ========================= */}

      {carregando && <Loading />}

      <div className="form-acoes">
        <button className="btn-limpar" type="button" onClick={limparFormulario}>
          Limpar
        </button>

        <button className="btn-salvar" type="submit">
          {produtoSelecionado ? "Atualizar produto" : "Salvar produto"}
        </button>
      </div>
    </form>
  );
}

export default ProdutoForm;
