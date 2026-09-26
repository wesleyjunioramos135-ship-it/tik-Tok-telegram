import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import BridgePage from "@/pages/BridgePage";
import BridgeNotFound from "@/pages/BridgeNotFound";
import AdminDashboard from "@/pages/AdminDashboard";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Mude para false para reativar o site completo novamente.
const SITE_OFFLINE = true;

function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06111d] px-6 text-white">
      <section className="w-full max-w-md rounded-3xl border border-[#24A1DE]/20 bg-[#0b1d2b] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#24A1DE]/15 text-3xl">
          🔒
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#70d5ff]">
          Temporariamente indisponível
        </p>
        <h1 className="text-3xl font-bold">Site offline</h1>
        <p className="mt-4 leading-relaxed text-slate-400">
          Esta página está temporariamente desativada. Tente novamente mais
          tarde.
        </p>
      </section>
    </main>
  );
}

function BridgePageRouter() {
  return (
    <Route path="/:slug">{params => <BridgePage slug={params.slug} />}</Route>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <BridgePage slug="default" />}</Route>
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={BridgeNotFound} />
      <BridgePageRouter />
      <Route component={BridgeNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {SITE_OFFLINE ? <OfflinePage /> : <Router />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
