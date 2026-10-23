import "./empresa.css";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../../../contexts/AuthContext";
import {
  atualizarEmpresa,
  buscarEmpresa,
} from "../../../../services/EmpresaService";
import type { Empresa as EmpresaType } from "../../../../types/Empresa";
import { uploadImagem } from "../../../../services/imagemService/uploadImagemService";
import DetalhesPlano from "./components/DetalhesPlano";

export default function Empresa() {
  const { empresa } = useAuth();

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [logo, setLogo] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const inputLogoRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<string | null>(null);

  const empresaId = empresa?.id;
  const plano = empresa?.plano || "Não definido";

  useEffect(() => {
    if (!empresaId) {
      setCarregando(false);
      return;
    }

    async function carregarEmpresa() {
      try {
        setCarregando(true);

        const dadosEmpresa = await buscarEmpresa(empresaId!);

        if (dadosEmpresa) {
          setNome(dadosEmpresa.nome ?? "");
          setCnpj(dadosEmpresa.cnpj ?? "");
          setLogo(dadosEmpresa.logo ?? "");
        }
      } catch (error) {
        console.error("Erro ao carregar empresa:", error);
        alert("Não foi possível carregar os dados da empresa.");
      } finally {
        setCarregando(false);
      }
    }

    void carregarEmpresa();

    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
    };
  }, [empresaId]);

  function selecionarLogo() {
    inputLogoRef.current?.click();
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem válido.");
      event.target.value = "";
      return;
    }

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
    }

    const preview = URL.createObjectURL(arquivo);
    previewRef.current = preview;
    setLogo(preview);
  }

  function removerLogo() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    setLogo("");

    if (inputLogoRef.current) {
      inputLogoRef.current.value = "";
    }
  }

  async function salvar() {
    if (!empresaId) return;

    if (!nome.trim()) {
      alert("Informe o nome da empresa.");
      return;
    }

    try {
      setSalvando(true);

      let logoUrl = logo;

      if (logo.startsWith("blob:")) {
        const arquivo = inputLogoRef.current?.files?.[0];

        if (!arquivo) {
          throw new Error("Selecione novamente a imagem da empresa.");
        }

        logoUrl = await uploadImagem(
          arquivo,
          `empresas/${empresaId}/logo/logo.jpg`,
        );
      }

      const dados: Partial<EmpresaType> = {
        nome: nome.trim(),
        cnpj: cnpj.trim(),
        logo: logoUrl,
      };

      await atualizarEmpresa(empresaId, dados);

      setLogo(logoUrl);

      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }

      alert("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      alert("Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="empresa-loading">
        <div className="empresa-spinner" />
        <span>Carregando dados da empresa...</span>
      </div>
    );
  }

  if (!empresaId) {
    return (
      <div className="empresa-loading">
        Nenhuma empresa vinculada ao usuário.
      </div>
    );
  }

  return (
    <main className="empresa-page">
      <header className="empresa-header">
        <div className="empresa-header-icon">🏢</div>

        <div>
          <h1>Minha empresa</h1>
          <p>Gerencie as informações e consulte seu plano contratado.</p>
        </div>
      </header>

      <div className="empresa-layout">
        <section className="empresa-card">
          <div className="empresa-card-header">
            <div>
              <span className="empresa-section-eyebrow">DADOS CADASTRAIS</span>
              <h2>Informações da empresa</h2>
              <p>Atualize os dados de identificação do estabelecimento.</p>
            </div>
          </div>

          <div className="empresa-form">
            <div className="empresa-field">
              <label htmlFor="empresa-nome">Nome da empresa</label>
              <input
                id="empresa-nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Minha Empresa"
              />
            </div>

            <div className="empresa-field">
              <label htmlFor="empresa-cnpj">CNPJ</label>
              <input
                id="empresa-cnpj"
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="empresa-field">
              <div className="empresa-logo-label">
                <label>Logotipo da empresa</label>
                <span>Opcional</span>
              </div>

              <input
                ref={inputLogoRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleLogoChange}
                hidden
              />

              <div className="empresa-logo-area">
                <button
                  type="button"
                  className="empresa-logo-input"
                  onClick={selecionarLogo}
                  aria-label="Selecionar logotipo"
                >
                  {logo ? (
                    <img src={logo} alt="Logotipo da empresa" />
                  ) : (
                    <div className="empresa-logo-placeholder">
                      <span className="empresa-logo-icon">+</span>
                      <strong>Adicionar logotipo</strong>
                      <small>PNG, JPG ou WebP</small>
                    </div>
                  )}
                </button>

                <div className="empresa-logo-info">
                  <strong>Identidade visual</strong>
                  <p>
                    Use o logotipo do estabelecimento para identificá-lo no
                    sistema.
                  </p>

                  <button
                    type="button"
                    className="empresa-btn-secundario"
                    onClick={selecionarLogo}
                  >
                    {logo ? "Trocar imagem" : "Selecionar imagem"}
                  </button>

                  {logo && (
                    <button
                      type="button"
                      className="empresa-remover-logo"
                      onClick={removerLogo}
                    >
                      Remover logotipo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="empresa-card-footer">
            <span>Confira os dados antes de salvar.</span>

            <button
              type="button"
              className="empresa-btn-salvar"
              onClick={salvar}
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <span className="empresa-spinner-button" />
                  Salvando...
                </>
              ) : (
                "Salvar alterações"
              )}
            </button>
          </div>
        </section>

        <DetalhesPlano plano={empresa.plano} />
      </div>
    </main>
  );
}
