import { Button } from "@/components/ui/button";
import { ExternalLink, Send, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

interface BridgePageProps {
  slug: string;
}

interface BridgeLink {
  slug: string;
  title: string;
  description: string;
  telegramWebUrl: string;
  isActive: boolean;
}

const TELEGRAM_DOMAIN = "agiuavipp";
const TELEGRAM_WEB_URL = `https://t.me/${TELEGRAM_DOMAIN}`;
const GUIDE_VIDEO_URL = "https://files.catbox.moe/p7cyje.mp4";

// Dados de exemplo - em produção, isso viria de uma API
const BRIDGE_LINKS: Record<string, BridgeLink> = {
  default: {
    slug: "default",
    title: "Grupo VIP Exclusivo",
    description:
      "Acesse nosso grupo exclusivo no Telegram com conteúdo premium, dicas diárias e suporte direto.",
    telegramWebUrl: TELEGRAM_WEB_URL,
    isActive: true,
  },
  exemplo: {
    slug: "exemplo",
    title: "Grupo VIP Exclusivo",
    description:
      "Acesse nosso grupo exclusivo no Telegram com conteúdo premium, dicas diárias e suporte direto.",
    telegramWebUrl: TELEGRAM_WEB_URL,
    isActive: true,
  },
  youtubevip: {
    slug: "youtubevip",
    title: "Canal YouTube VIP",
    description:
      "Membros do Telegram recebem acesso exclusivo a vídeos, tutoriais e lives privadas.",
    telegramWebUrl: TELEGRAM_WEB_URL,
    isActive: true,
  },
  comunidade: {
    slug: "comunidade",
    title: "Comunidade Premium",
    description:
      "Junte-se à nossa comunidade de mais de 10 mil membros ativos no Telegram.",
    telegramWebUrl: TELEGRAM_WEB_URL,
    isActive: true,
  },
};

export default function BridgePage({ slug }: BridgePageProps) {
  const link = BRIDGE_LINKS[slug];

  useEffect(() => {
    if (!link || !link.isActive) {
      return;
    }

    document.title = link.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", link.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", link.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", link.description);
  }, [link]);

  if (!link || !link.isActive) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">
            Link não encontrado ou desativado
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#24A1DE] hover:bg-[#1a7aa8] text-white"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#24A1DE]/20 bg-card/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#24A1DE] to-[#1a7aa8]">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">{link.title}</h1>
            <p className="text-gray-400">{link.description}</p>
          </div>

          <div className="mb-6 rounded-xl border border-[#24A1DE]/30 bg-black/20 p-3 text-center">
            <p className="mb-3 text-sm font-semibold text-white">
              Veja como abrir no navegador
            </p>
            <div
              className="mx-auto overflow-hidden rounded-xl"
              style={{ maxWidth: "300px", margin: "15px auto" }}
            >
              <video
                src={GUIDE_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label="Vídeo demonstrando como abrir esta página no navegador"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              Se você estiver no TikTok ou Instagram, assista ao vídeo e toque
              nos três pontinhos para escolher “Abrir no navegador” ou “Abrir no
              Chrome”.
            </p>
          </div>

          <div className="mb-7 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-5 w-5 text-[#24A1DE]" />
              <span>Acesso rápido ao grupo</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-[#24A1DE]" />
              <span>Link oficial e seguro</span>
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-[#24A1DE] py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1a7aa8] hover:shadow-xl hover:shadow-[#24A1DE]/50 active:scale-95"
          >
            <a
              href={link.telegramWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Clique aqui para entrar no Telegram"
            >
              <ExternalLink className="h-5 w-5" />
              Clique aqui para entrar
            </a>
          </Button>

          <p className="mt-5 text-center text-xs text-gray-500">
            Já está no Chrome ou no navegador? Toque no botão para continuar.
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>🔒 Conexão segura | ⚡ Carregamento rápido | ✅ Verificado</p>
        </div>
      </div>
    </div>
  );
}
