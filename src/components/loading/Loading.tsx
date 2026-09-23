import "./loading.css";

interface LoadingProps {
  texto?: string;
}

export default function Loading({ texto = "Carregando..." }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <span>{texto}</span>
    </div>
  );
}
