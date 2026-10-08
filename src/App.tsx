import { Toaster } from "sonner";
import Rotas from "./routes/Rotas";

export default function App() {
  return (
    <>
      <Rotas />
      <Toaster position="top-center" richColors />
    </>
  );
}
