import { Button } from "@/components/ui/button";
import {
  Check,
  Clipboard,
  ExternalLink,
  MoreVertical,
  Send,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

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

type CopyState = "idle" | "copied" | "error";

const TELEGRAM_DOMAIN = "agiuavipp";
const TELEGRAM_WEB_URL = `https://t.me/${TELEGRAM_DOMAIN}`;

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

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Alguns WebViews negam a Clipboard API; tenta o método compatível abaixo.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  } finally {
    document.body.removeChild(textArea);
  }

  return copied;
}

export default function BridgePage({ slug }: BridgePageProps) {
  const link = BRIDGE_LINKS[slug];
  const [copyState, setCopyState] = useState<CopyState>("idle");

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

  async function handleCopyLink() {
    const copied = await copyToClipboard(
      link?.telegramWebUrl ?? TELEGRAM_WEB_URL
    );
    setCopyState(copied ? "copied" : "error");
    window.setTimeout(() => setCopyState("idle"), 2500);
  }

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
      {/* Indicador fixo: aponta para o menu do navegador interno, sem tentar clicar nele. */}
      <div className="fixed top-3 right-3 z-20 flex flex-col items-center gap-1 rounded-xl border border-[#24A1DE]/50 bg-[#101116]/95 px-3 py-2 text-center shadow-xl backdrop-blur">
        <span className="text-[11px] font-semibold leading-tight text-white">
          Abra o menu
        </span>
        <MoreVertical className="h-7 w-7 animate-pulse text-[#24A1DE]" />
        <span className="text-2xl leading-none text-[#24A1DE]">↗</span>
      </div>

      <div className="w-full max-w-md pt-16">
        {/* Guia visual em loop: substitui vídeo externo e funciona mesmo sem carregar mídia. */}
        <section
          aria-labelledby="browser-guide-title"
          className="mb-4 overflow-hidden rounded-2xl border border-[#24A1DE]/40 bg-[#101116]/95 p-5 shadow-xl"
        >
          <div className="mb-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#24A1DE]">
              TikTok ou Instagram
            </p>
            <h2 id="browser-guide-title" className="mt-1 text-xl font-bold">
              Abra no navegador para continuar
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Para acessar o grupo oficial no Telegram sem travamentos do app.
            </p>
          </div>

          <div className="relative mx-auto mb-4 h-24 max-w-xs rounded-xl border border-white/10 bg-black/40 p-3">
            <div className="flex items-start justify-between text-xs text-gray-400">
              <span>1. Toque nos três pontinhos</span>
              <MoreVertical className="h-6 w-6 animate-bounce text-[#24A1DE]" />
            </div>
            <div className="absolute right-12 top-9 h-8 w-8 animate-pulse rounded-full border-2 border-[#24A1DE]" />
            <div className="absolute right-14 top-16 text-2xl text-[#24A1DE]">
              ↗
            </div>
            <div className="absolute bottom-2 left-3 right-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-[slide-guide_2.4s_ease-in-out_infinite] rounded-full bg-[#24A1DE]" />
            </div>
          </div>

          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <div className="rounded-lg bg-white/5 p-3">
              <strong className="text-[#24A1DE]">Passo 1</strong>
              <p className="mt-1 text-gray-300">
                Toque nos três pontinhos (...) no topo da tela.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <strong className="text-[#24A1DE]">Passo 2</strong>
              <p className="mt-1 text-gray-300">
                Selecione “Abrir no navegador” ou “Abrir no Chrome”.
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-[#24A1DE]/20 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#24A1DE] to-[#1a7aa8]">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">{link.title}</h1>
            <p className="text-gray-400">{link.description}</p>
          </div>

          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="h-5 w-5 text-[#24A1DE]" />
              <span>Acesso instantâneo ao grupo</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-[#24A1DE]" />
              <span>100% seguro e confiável</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Send className="h-5 w-5 text-[#24A1DE]" />
              <span>Link oficial do Telegram</span>
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
              aria-label="Clique aqui para abrir o Telegram"
            >
              <ExternalLink className="h-5 w-5" />
              Clique aqui para entrar
            </a>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCopyLink}
            className="mt-3 w-full border-[#24A1DE]/50 py-5 font-semibold text-[#24A1DE] hover:bg-[#24A1DE]/10"
          >
            {copyState === "copied" ? (
              <>
                <Check className="h-5 w-5" /> Copiado!
              </>
            ) : copyState === "error" ? (
              "Não foi possível copiar"
            ) : (
              <>
                <Clipboard className="h-5 w-5" /> Copiar link do canal
              </>
            )}
          </Button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Se estiver no TikTok ou Instagram, abra primeiro no navegador e
            depois toque no botão acima.
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>🔒 Conexão segura | ⚡ Carregamento rápido | ✅ Verificado</p>
        </div>
      </div>
    </div>
  );
}
