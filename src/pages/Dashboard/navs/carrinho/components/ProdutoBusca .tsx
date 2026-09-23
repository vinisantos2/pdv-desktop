import { useEffect, useRef, useState } from "react";
import "./produtoBusca.css";
import type { Produto } from "../../../../../types/Produto";
import ImagemSelect from "../../../../../components/imgemSelect/ImagemSelect";

interface ProdutoBuscaProps {
  produtos: Produto[];
  onSelecionarProduto: (produto: Produto) => void;
}

export default function ProdutoBusca({
  produtos,
  onSelecionarProduto,
}: ProdutoBuscaProps) {
  const [codigoBarras, setCodigoBarras] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [resultados, setResultados] = useState<Produto[]>([]);

  const inputCodigoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputCodigoRef.current?.focus();
  }, []);

  function buscarPorCodigo() {
    const codigo = codigoBarras.trim();
    if (!codigo) {
      return;
    }

    const produto = produtos.find((produto) => produto.codigoBarras === codigo);

    if (produto) {
      setImagem(produto.imagemPatch ? produto.imagemPatch : "");
      onSelecionarProduto(produto);
      setCodigoBarras("");
      setDescricao("");
      setResultados([]);
    }
  }

  function selecionarProduto(produto: Produto) {
    onSelecionarProduto(produto);
    setImagem(produto.imagemPatch ? produto.imagemPatch : "");
    setDescricao("");
    setCodigoBarras("");
    setResultados([]);
  }

  function buscarPorDescricao(valor: string) {
    setDescricao(valor);
    const termo = valor.trim().toLowerCase();

    if (!termo) {
      setResultados([]);
      return;
    }

    const encontrados = produtos
      .filter((produto) => produto.descricao.toLowerCase().includes(termo))
      .slice(0, 8);

    setResultados(encontrados);
  }

  return (
    <div className="produto-busca">
      <div className="produto-busca-esquerda">
        {/* IMAGEM */}
        <ImagemSelect
          altura={200}
          largura={150}
          editavel={false}
          imagemInicial={imagem}
        />
        {/* CÓDIGO DE BARRAS */}
        <div className="campo-busca">
          <label>Código de barras</label>
          <div className="input-wrapper">
            <input
              ref={inputCodigoRef}
              type="text"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  buscarPorCodigo();
                }
              }}
              placeholder="Digite ou passe o código de barras..."
            />

            <button type="button" onClick={buscarPorCodigo}>
              Enter
            </button>
          </div>
        </div>

        {/* BUSCA POR DESCRIÇÃO */}
        <div className="campo-busca campo-descricao">
          <label>Buscar por descrição</label>

          <div className="input-wrapper">
            <input
              type="text"
              value={descricao}
              onChange={(e) => buscarPorDescricao(e.target.value)}
              placeholder="Digite o nome do produto..."
            />

            <button type="button">F9</button>
          </div>

          {/* RESULTADOS */}
          {resultados.length > 0 && (
            <div className="produto-resultados">
              {resultados.map((produto) => (
                <button
                  type="button"
                  key={produto.codigoBarras}
                  className="produto-resultado"
                  onClick={() => selecionarProduto(produto)}
                >
                  <div className="produto-resultado-info">
                    <strong>{produto.descricao}</strong>

                    <span>Código: {produto.codigoBarras}</span>
                  </div>

                  <div className="produto-resultado-direita">
                    <span className="produto-preco">
                      R$ {Number(produto.preco).toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
