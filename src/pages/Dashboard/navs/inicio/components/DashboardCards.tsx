import './dashBoardCard.css'
interface DashboardCardsProps {
  faturamentoHoje: number;
  vendasHoje: number;
  produtosCadastrados: number;
}

export default function DashboardCards({
  faturamentoHoje,
  vendasHoje,
  produtosCadastrados,
}: DashboardCardsProps) {
  const cards = [
    {
      icone: "🛒",
      titulo: "Vendas hoje",
      valor: `R$ ${faturamentoHoje.toFixed(2).replace(".", ",")}`,
    },
    {
      icone: "📊",
      titulo: "Quantidade de vendas",
      valor: vendasHoje,
    },
    {
      icone: "📦",
      titulo: "Produtos cadastrados",
      valor: produtosCadastrados,
    },
    {
      icone: "📒",
      titulo: "Fiados pendentes",
      valor: "R$ 0,00",
    },
  ];

  return (
    <section className="dashboard-cards">
      {cards.map((card) => (
        <div className="dashboard-card" key={card.titulo}>
          <div className="dashboard-card-icon">{card.icone}</div>

          <div className="dashboard-card-content">
            <span>{card.titulo}</span>

            <strong>{card.valor}</strong>
          </div>
        </div>
      ))}
    </section>
  );
}
