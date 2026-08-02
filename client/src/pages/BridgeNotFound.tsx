import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function BridgeNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
          {/* Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-destructive/20 to-destructive/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 right-2 w-20 h-20 bg-destructive/20 rounded-full blur-2xl" />
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-destructive/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center shadow-lg">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Error Code */}
            <div className="text-6xl font-bold text-accent mb-2">404</div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Link não encontrado
            </h1>

            {/* Description */}
            <p className="text-foreground/70 text-base leading-relaxed mb-8">
              Desculpe, o link que você está procurando não existe ou está desativado. 
              Verifique se a URL está correta.
            </p>

            {/* CTA Button */}
            <Link href="/">
              <button className="w-full btn-telegram-glow flex items-center justify-center gap-2 mb-4">
                <Home className="w-5 h-5" />
                Voltar ao Início
              </button>
            </Link>

            {/* Secondary Info */}
            <p className="text-xs text-foreground/50 mt-6">
              Se você acredita que isto é um erro, entre em contato com o suporte.
            </p>
          </div>

          {/* Footer Accent */}
          <div className="h-1 bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
