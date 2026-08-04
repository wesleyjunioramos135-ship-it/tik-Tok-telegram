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

function BridgePageRouter() {
  return (
    <Route path="/:slug">
      {(params) => <BridgePage slug={params.slug} />}
    </Route>
  );
}

function Router() {
  return (
    <Switch>
      {/* Main route - shows Bridge Page with default Telegram link */}
      <Route path={"/"}>
        {() => <BridgePage slug="default" />}
      </Route>
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/404"} component={BridgeNotFound} />
      {/* Dynamic bridge page route */}
      <BridgePageRouter />
      {/* Final fallback route */}
      <Route component={BridgeNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
