import { Button } from "@/components/ui/button";
import { Zap, Shield, Send } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#24A1DE] to-[#1a7aa8] flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Bridge Page</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin")}
            className="gap-2"
          >
            🔐 Painel Admin
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-[#24A1DE]/10 border border-[#24A1DE]/20">
            <span className="text-sm font-medium text-[#24A1DE]">Converta TikTok em Telegram</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Bridge Page Premium
            <br />
            para Comunidades
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Direcione seu tráfego do TikTok para grupos do Telegram de forma rápida, segura e sem bloqueios. 
            Design dark premium otimizado para máxima conversão.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-[#24A1DE] hover:bg-[#1a7aa8] text-white"
              onClick={() => navigate("/exemplo")}
            >
              Ver Exemplo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/admin")}
            >
              Gerenciar Links
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 rounded-lg border border-border/40 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#24A1DE]/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#24A1DE]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ultra Rápido</h3>
            <p className="text-gray-400">
              Carrega em menos de 1 segundo no browser interno do TikTok. Otimizado para máxima performance.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#24A1DE]/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#24A1DE]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
            <p className="text-gray-400">
              Sem cloaking, sem redirecionamentos ocultos. Acesso direto ao Telegram, totalmente transparente.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border/40 bg-card/50 backdrop-blur hover:bg-card/80 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#24A1DE]/10 flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-[#24A1DE]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sem Bloqueios</h3>
            <p className="text-gray-400">
              Otimizado para não acionar avisos de risco em redes sociais. Design premium que transmite confiança.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-lg border border-[#24A1DE]/20 bg-gradient-to-r from-[#24A1DE]/10 to-transparent p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Crie seus links de bridge page em segundos e comece a converter visitantes do TikTok em membros do Telegram.
          </p>
          <Button 
            size="lg" 
            className="bg-[#24A1DE] hover:bg-[#1a7aa8] text-white"
            onClick={() => navigate("/admin")}
          >
            Acessar Painel Admin
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20 py-8">
        <div className="container max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Bridge Page © 2026 - Converta TikTok em Telegram com estilo</p>
        </div>
      </footer>
    </div>
  );
}
