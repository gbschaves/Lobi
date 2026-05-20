import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./routes/index.jsx";
import ImoveisPage from "./routes/imoveis.jsx";
import ImobiliariasPage from "./routes/imobiliarias.jsx";
import CorretoresPage from "./routes/corretores.jsx";
import PropostasPage from "./routes/propostas.jsx";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina nao encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A pagina que voce esta procurando nao existe.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/imoveis" element={<ImoveisPage />} />
        <Route path="/imobiliarias" element={<ImobiliariasPage />} />
        <Route path="/corretores" element={<CorretoresPage />} />
        <Route path="/propostas" element={<PropostasPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
