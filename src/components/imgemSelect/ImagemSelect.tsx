import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import "./imagemSelect.css";

interface ImagemSelectProps {
  imagemInicial?: string | null;
  largura?: number;
  altura?: number;
  editavel?: boolean;
  circular?: boolean;
  textoBotao?: string;
  placeholder?: string;
  onImagemSelecionada?: (arquivo: File) => void;
}

export default function ImagemSelect({
  imagemInicial = null,
  largura = 120,
  altura = 120,
  editavel = true,
  circular = false,
  textoBotao = "Alterar imagem",
  placeholder = "Sem imagem",
  onImagemSelecionada,
}: ImagemSelectProps) {
  const [preview, setPreview] = useState<string | null>(imagemInicial);

  useEffect(() => {
    setPreview(imagemInicial ?? null);
  }, [imagemInicial]);

  function handleImagem(e: ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];

    if (!arquivo) return;

    const url = URL.createObjectURL(arquivo);

    setPreview(url);

    onImagemSelecionada?.(arquivo);
  }

  return (
    <div className="imagem-select">
      <div
        className={`imagem-select-preview ${
          circular ? "imagem-select-circular" : ""
        }`}
        style={{
          width: largura,
          height: altura,
          borderRadius: circular ? "50%" : 12,
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview da imagem" />
        ) : (
          <div className="imagem-select-placeholder">
            <span>{placeholder}</span>
          </div>
        )}
      </div>

      {editavel && (
        <>
          <label htmlFor="imagem-select-input" className="imagem-select-botao">
            {textoBotao}
          </label>

          <input
            id="imagem-select-input"
            type="file"
            accept="image/*"
            onChange={handleImagem}
            hidden
          />
        </>
      )}
    </div>
  );
}
