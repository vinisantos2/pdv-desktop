import "./sobreFooter.css";

export default function SobreFooter() {
  return (
    <div className="sobre-app-footer">
      <span>© {new Date().getFullYear()} VS-Tech</span>
      <span>PDV Desktop</span>
    </div>
  );
}