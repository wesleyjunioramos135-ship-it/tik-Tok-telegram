import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, AlertCircle, Send } from "lucide-react";

interface BridgePageProps {
  slug: string;
}

export default function BridgePage({ slug }: BridgePageProps) {
  const { data: link, isLoading, error } = trpc.bridgeLinks.getBySlug.useQuery(
    { slug },
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (link) {
      document.title = link.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", link.description || link.title);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", link.title);
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          link.description || link.title
        );
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute("content", window.location.href);
      }
    }
  }, [link]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-foreground/60">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-xl p-8 border border-border">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              Link não encontrado
            </h1>
            <p className="text-center text-foreground/60 mb-6">
              Desculpe, o link que você está procurando não existe ou está desativado.
            </p>
            <a
              href="/"
              className="block text-center py-2 px-4 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleOpenTelegram = () => {
    window.open(link.telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
          {/* Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-accent/20 to-accent/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 right-2 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            {/* Avatar/Icon Placeholder */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                <Send className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-3">
              {link.title}
            </h1>

            {/* Description */}
            {link.description && (
              <p className="text-foreground/70 text-base leading-relaxed mb-8">
                {link.description}
              </p>
            )}

            {/* CTA Button */}
            <button
              onClick={handleOpenTelegram}
              className="btn-telegram-glow btn-telegram-pulse w-full mb-4"
            >
              Acessar Grupo no Telegram
            </button>

            {/* Secondary Info */}
            <p className="text-xs text-foreground/50 mt-6">
              Você será redirecionado para o Telegram
            </p>
          </div>

          {/* Footer Accent */}
          <div className="h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-foreground/40">
            Seguro • Sem redirecionamentos • Acesso direto
          </p>
        </div>
      </div>
    </div>
  );
}
