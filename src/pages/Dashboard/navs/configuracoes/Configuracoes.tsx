import "./configuracoes.css";
import { useEffect, useRef, useState } from "react";


import { useAuth } from "../../../../contexts/AuthContext";
import { atualizarEmpresa, buscarEmpresa } from "../../../../services/EmpresaService";
import type { Empresa } from "../../../../types/Empresa";
import { uploadImagem } from "../../../../services/imagemService/uploadImagemService";

export default function Configuracoes() {
  const { empresa } = useAuth();

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [logo, setLogo] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const inputLogoRef = useRef<HTMLInputElement | null>(null);

  const empresaId = empresa?.id;

  useEffect(() => {
    if (empresaId) {
      carregarEmpresa();
    }
  }, [empresaId]);

  async function carregarEmpresa() {
    if (!empresaId) return;

    try {
      setCarregando(true);

      const empresa = await buscarEmpresa(empresaId);

      if (empresa) {
        setNome(empresa.nome ?? "");
        setCnpj(empresa.cnpj ?? "");
        setLogo(empresa.logo ?? "");
      }
    } catch (error) {
      console.error("Erro ao carregar empresa:", error);
    } finally {
      setCarregando(false);
    }
  }

  function selecionarLogo() {
    inputLogoRef.current?.click();
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    const preview = URL.createObjectURL(arquivo);

    setLogo(preview);
  }

  function removerLogo() {
    setLogo("");

    if (inputLogoRef.current) {
      inputLogoRef.current.value = "";
    }
  }

  async function salvar() {
    if (!empresaId) return;

    try {
      setSalvando(true);

      let logoUrl = logo;

      /**
       * Se logo for blob: significa que o usuário
       * selecionou uma imagem nova.
       */
      if (logo.startsWith("blob:")) {
        const arquivo = inputLogoRef.current?.files?.[0];

        if (arquivo) {
          logoUrl = await uploadImagem(
            arquivo,
            `empresas/${empresaId}/logo/logo.jpg`,
          );
        }
      }

      const dados: Partial<Empresa> = {
        nome: nome.trim(),
        cnpj: cnpj.trim(),
        ...(logoUrl ? { logo: logoUrl } : {}),
      };

      await atualizarEmpresa(empresaId, dados);

      alert("Empresa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);

      alert("Não foi possível salvar as alterações.");
    } finally {
      setSalvando(false);
    }
  }

  if (!empresaId || carregando) {
    return (
      <div className="empresa-loading">
        <div className="empresa-spinner" />

        <span>Carregando dados da empresa...</span>
      </div>
    );
  }

  return (
    <div className="empresa-page">
      <div className="empresa-header">
        <div>
          <h1>Minha empresa</h1>

          <p>Configure os dados da sua empresa</p>
        </div>
      </div>

      <div className="empresa-card">
        <div className="empresa-card-header">
          <h2>Informações da empresa</h2>

          <p>Informe os dados principais da sua empresa.</p>
        </div>

        <div className="empresa-form">
          <div className="empresa-field">
            <label htmlFor="nome">Nome da empresa</label>

            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Minha Empresa"
            />
          </div>

          <div className="empresa-field">
            <label htmlFor="cnpj">CNPJ</label>

            <input
              id="cnpj"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="empresa-field">
            <div className="empresa-logo-label">
              <label>Logo</label>

              <span>Opcional</span>
            </div>

            <input
              ref={inputLogoRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              hidden
            />

            <button
              type="button"
              className="empresa-logo-input"
              onClick={selecionarLogo}
            >
              {logo ? (
                <img src={logo} alt="Logo da empresa" />
              ) : (
                <div className="empresa-logo-placeholder">
                  <span className="empresa-logo-icon">+</span>

                  <strong>Selecionar logo</strong>

                  <small>Clique para selecionar uma imagem</small>
                </div>
              )}
            </button>

            {logo && (
              <button
                type="button"
                className="empresa-remover-logo"
                onClick={removerLogo}
              >
                Remover logo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="empresa-actions">
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
    </div>
  );
}
