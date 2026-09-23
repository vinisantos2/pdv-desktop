import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { User } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";


import { auth } from "../firebase/config";

import { buscarEmpresaPorUsuario } from "../services/EmpresaService";
import { buscarUsuario } from "../services/UsuarioService";
import type { Usuario } from "../types/Usuario";
import type { Empresa } from "../types/Empresa";

type AuthContextData = {
  usuario: Usuario | null;
  empresa: Empresa | null;
  carregando: boolean;
};

const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        try {
          setCarregando(true);

          // Não está autenticado
          if (!user) {
            setUsuario(null);
            setEmpresa(null);
            return;
          }

          // Busca o usuário no Firestore
          const u = await buscarUsuario(user.uid);

          if (!u) {
            setUsuario(null);
            setEmpresa(null);
            return;
          }

          // Salva o usuário
          setUsuario(u);

          // Busca a empresa vinculada ao usuário
          const dadosEmpresa =
            await buscarEmpresaPorUsuario(u.uid);

          setEmpresa(dadosEmpresa);

        } catch (error) {
          console.error(
            "Erro ao carregar autenticação:",
            error
          );

          setUsuario(null);
          setEmpresa(null);

        } finally {
          setCarregando(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        empresa,
        carregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider"
    );
  }

  return context;
}