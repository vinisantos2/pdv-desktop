import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import "./modalProduto.css";


import { toast } from "sonner";
import type { Produto } from "../../../../../../types/Produto";
import { useAuth } from "../../../../../../contexts/AuthContext";
import imageCompression from "browser-image-compression";
import { uploadImagem } from "../../../../../../services/imagemService/uploadImagemService";
import { atualizarProduto, salvarProduto } from "../../../../../../services/produtoService";
import ImagemSelect from "../../../../../../components/imgemSelect/ImagemSelect";
import InputPadrao from "../../../../../../components/input/InputPadrao";
import Loading from "../../../../../../components/loading/Loading";

interface ProdutoFormProps {
  produtoSelecionado: Produto | null;
  onSalvo: () => void;
  limpar: () => void;
  onFechar: () => void;
}

function ModalProdutos({
  produtoSelecionado,
  onSalvo,
  limpar,
  onFechar,
}: ProdutoFormProps) {
  const [codigoBarras, setCodigoBarras] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  const { empresa } = useAuth();

  const [carregando, setCarregando] = useState(false);

  /* =========================================================
     IMAGEM
  ========================================================= */

  const [imagemPatch, setImagemPatch] = useState("");
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);

  /* =========================================================
     LIMPAR
  ========================================================= */

  function limparFormulario() {
    setCodigoBarras("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    setImagemPatch("");
    setImagemArquivo(null);

    limpar();
  }

  /* =========================================================
     SALVAR
  ========================================================= */

  async function handlerSalvarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /* =====================================================
       VALIDAÇÕES
    ===================================================== */

    if (!empresa?.id) {
      toast.error("Empresa não encontrada.");
      return;
    }

    if (!codigoBarras.trim()) {
      toast.error("Informe o código de barras.");
      return;
    }

    if (!descricao.trim()) {
      toast.error("Informe a descrição do produto.");
      return;
    }

    if (!preco || Number(preco) < 0) {
      toast.error("Informe um preço válido.");
      return;
    }

    if (estoque === "" || Number(estoque) < 0) {
      toast.error("Informe um estoque válido.");
      return;
    }

    try {
      setCarregando(true);

      /* =====================================================
         IMAGEM
      ===================================================== */

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

      /* =====================================================
         PRODUTO
      ===================================================== */

      const produto: Produto = {
        codigoBarras: codigoBarras.trim(),
        descricao: descricao.trim(),
        preco: Number(preco),
        estoque: Number(estoque),
      };

      if (imagemUrl) {
        produto.imagemPatch = imagemUrl;
      }
      /* =====================================================
         SALVAR / ATUALIZAR
      ===================================================== */

      if (produtoSelecionado) {
        await atualizarProduto(empresa.id, produto);

        toast.success("Produto atualizado com sucesso!");
      } else {
        await salvarProduto(empresa.id, produto);

        toast.success("Produto cadastrado com sucesso!");
      }

      /* =====================================================
         FINALIZA
      ===================================================== */

      onSalvo();

      limparFormulario();

      onFechar();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);

      toast.error(
        produtoSelecionado
          ? "Não foi possível atualizar o produto."
          : "Não foi possível cadastrar o produto.",
      );
    } finally {
      setCarregando(false);
    }
  }

  /* =========================================================
     CARREGAR PRODUTO
  ========================================================= */

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
    setImagemArquivo(null);
  }, [produtoSelecionado]);

  return (
    <div className="produto-modal-overlay">
      <form className="produto-modal" onSubmit={handlerSalvarProduto}>
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="produto-modal-header">
          <div>
            <h2>{produtoSelecionado ? "Editar produto" : "Novo produto"}</h2>

            <span>Cadastre as informações do produto</span>
          </div>

          <button
            type="button"
            className="produto-modal-fechar"
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        {/* =================================================
            CONTEÚDO
        ================================================= */}

        <div className="produto-modal-conteudo">
          {/* IMAGEM */}

          <div className="produto-imagem-area">
            <ImagemSelect
              imagemInicial={imagemPatch}
              onImagemSelecionada={setImagemArquivo}
            />
          </div>

          {/* DADOS */}

          <div className="produto-dados">
            <InputPadrao
              id="codigoBarras"
              name="codigoBarras"
              label="Código de barras"
              type="text"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
            />

            <InputPadrao
              id="descricao"
              name="descricao"
              label="Descrição"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <div className="produto-dados-linha">
              <InputPadrao
                id="preco"
                name="preco"
                label="Preço"
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />

              <InputPadrao
                id="estoque"
                name="estoque"
                label="Estoque"
                type="number"
                min="0"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {carregando && <Loading />}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="produto-modal-footer">
          <button
            type="button"
            className="btn-limpar"
            onClick={limparFormulario}
            disabled={carregando}
          >
            Limpar
          </button>

          <button
            type="button"
            className="btn-cancelar"
            onClick={onFechar}
            disabled={carregando}
          >
            Cancelar
          </button>

          <button type="submit" className="btn-salvar" disabled={carregando}>
            {produtoSelecionado ? "Atualizar produto" : "Salvar produto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalProdutos;
