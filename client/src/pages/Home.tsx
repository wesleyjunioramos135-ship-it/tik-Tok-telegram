import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Send, Lock, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Bridge Page</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Lock className="w-4 h-4 mr-2" />
                  Painel Admin
                </Button>
              </Link>
            )}
            {!isAuthenticated && !loading && (
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                Entrar
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <p className="text-sm font-semibold text-accent">
                Converta TikTok em Telegram
              </p>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Bridge Page Premium
            <span className="block text-accent">para Comunidades</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            Direcione seu tráfego do TikTok para grupos do Telegram de forma rápida, 
            segura e sem bloqueios. Design dark premium otimizado para conversão máxima.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {/* Feature 1 */}
          <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ultra Rápido
            </h3>
            <p className="text-foreground/60 text-sm">
              Carrega em menos de 1 segundo no navegador interno do TikTok
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              100% Seguro
            </h3>
            <p className="text-foreground/60 text-sm">
              Sem cloaking, sem redirecionamentos ocultos. Acesso direto ao Telegram
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
              <Send className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sem Bloqueios
            </h3>
            <p className="text-foreground/60 text-sm">
              Otimizado para não acionar avisos de risco em redes sociais
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl border border-accent/30 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Pronto para começar?
          </h2>
          <p className="text-foreground/60 mb-6">
            Crie seus links de ponte personalizados e comece a converter visitantes 
            do TikTok em membros do Telegram hoje mesmo.
          </p>
          {isAuthenticated && user?.role === "admin" ? (
            <Link href="/admin">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Ir para Painel Admin
              </Button>
            </Link>
          ) : (
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Começar Agora
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-foreground/50 text-sm">
          <p>© 2026 Bridge Page. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
