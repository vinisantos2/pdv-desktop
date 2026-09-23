import "./paginaNaoEncontrada.css"
export default function PaginaNaoEncontrada() {
  return (
    <div className="pagina-404">
      <div className="pagina-404-conteudo">
        <span className="pagina-404-codigo">404</span>

        <h1>Página não encontrada</h1>

        <p>
          A página que você está procurando não existe
          ou foi removida.
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}