import "./tabelaPadrao.css";

interface Coluna<T> {
  chave: keyof T;
  titulo: string;
  render?: (item: T) => React.ReactNode;
}

interface TabelaPadraoProps<T> {
  colunas: Coluna<T>[];
  dados: T[];
  onSelecionar?: (item: T) => void;
  mensagemVazia?: string;
}

export default function TabelaPadrao<T>({
  colunas,
  dados,
  onSelecionar,
  mensagemVazia = "Nenhum registro encontrado.",
}: TabelaPadraoProps<T>) {
  return (
    <div className="tabela-padrao">
      <table>
        <thead>
          <tr>
            {colunas.map((coluna) => (
              <th key={String(coluna.chave)}>{coluna.titulo}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dados.map((item, index) => (
            <tr key={index} onClick={() => onSelecionar?.(item)}>
              {colunas.map((coluna) => (
                <td key={String(coluna.chave)}>
                  {coluna.render
                    ? coluna.render(item)
                    : String(item[coluna.chave])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {dados.length === 0 && (
        <div className="tabela-padrao-vazia">{mensagemVazia}</div>
      )}
    </div>
  );
}
