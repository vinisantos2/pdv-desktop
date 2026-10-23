import { useCallback, useEffect, useState } from "react";
import { buscarEmpresa } from "../../../../../services/EmpresaService";
import { PLANOS } from "../../../../../types/Plano";
import { useAuth } from "../../../../../contexts/AuthContext";

export default function usePlano() {
  const { empresa } = useAuth();
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const empresaId = empresa?.id;

  const carregar = useCallback(async () => {
    if (!empresaId) {
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
    } catch (error) {
      console.error("Erro ao carregar plano:", error);
      setErro("Não foi possível carregar os dados do plano.");
    } finally {
      setCarregando(false);
    }
  }, [empresaId]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  const plano = empresa?.plano ? PLANOS[empresa.plano] : undefined;

  const pagamentos = [...(empresa?.pagamentos ?? [])].sort(
    (a, b) => b.data.toMillis() - a.data.toMillis(),
  );

  return {
    empresa,
    plano,
    pagamentos,
    carregando,
    erro,
    recarregar: carregar,
  };
}
