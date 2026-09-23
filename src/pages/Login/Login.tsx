import { useNavigate } from "react-router-dom";

import "./login.css";
import { useState, type FormEvent } from "react";
import { fazerLogin } from "../../services/authService";
import { ROTAS } from "../../constanst/rotas";
import Loading from "../../components/loading/Loading";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    if (!email.trim()) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!senha) {
      setErro("Digite sua senha.");
      return;
    }

    try {
      setCarregando(true);

      await fazerLogin(email.trim(), senha);

      // Login realizado
      navigate(ROTAS.DASHBOARD.INDEX, {
        replace: true,
      });
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErro("E-mail ou senha inválidos.");
      } else if (error.code === "auth/invalid-email") {
        setErro("Digite um e-mail válido.");
      } else if (error.code === "auth/too-many-requests") {
        setErro("Muitas tentativas. Tente novamente mais tarde.");
      } else {
        setErro("Não foi possível fazer login. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">PDV</div>

          <h1>
            Seu negócio,
            <br />
            mais simples.
          </h1>

          <p>
            Gerencie suas vendas, produtos e clientes de forma rápida e
            eficiente.
          </p>
        </div>

        <span className="brand-version">PDV • v1.0.0</span>
      </section>

      <section className="login-form-section">
        <div className="login-card">
          <div className="login-header">
            <h2>Bem-vindo!</h2>

            <p>Entre na sua conta para continuar.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={carregando}
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Senha</label>

                <button type="button">Esqueceu a senha?</button>
              </div>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                disabled={carregando}
              />
            </div>

            {erro && <div className="login-error">{erro}</div>}

            <button
              className="login-button"
              type="submit"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="login-footer">
            © 2026 PDV. Todos os direitos reservados.
          </p>

          {carregando && <Loading />}
        </div>
      </section>
    </main>
  );
}
