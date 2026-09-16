import { Button } from "@/components/ui/button";
import {
  Check,
  Clipboard,
  ExternalLink,
  Send,
  Shield,
  Sparkles,
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
const GUIDE_VIDEO_URL = "https://files.catbox.moe/p7cyje.mp4";

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

function isTikTokWebView(userAgent: string) {
  return /TikTok|musical_ly|Bytedance/i.test(userAgent);
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Alguns WebViews bloqueiam a Clipboard API; tenta o fallback abaixo.
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
  const [isTikTok, setIsTikTok] = useState(false);
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

    const inTikTok = isTikTokWebView(navigator.userAgent);
    setIsTikTok(inTikTok);

    // Instagram, Chrome, Safari e navegadores comuns seguem direto para o
    // endereço HTTPS oficial do Telegram. No TikTok, mantemos a orientação.
    if (!inTikTok) {
      const redirectTimer = window.setTimeout(() => {
        window.location.replace(link.telegramWebUrl);
      }, 300);
      return () => window.clearTimeout(redirectTimer);
    }
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
      <div className="min-h-screen bg-[#08131f] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-slate-400 mb-8">
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

  if (!isTikTok) {
    return (
      <div className="min-h-screen bg-[#08131f] text-white flex items-center justify-center p-6">
        <p className="text-center text-sm text-slate-400">
          Abrindo o Telegram…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#06111d] px-4 py-8 text-white sm:flex sm:items-center sm:justify-center">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(36,161,222,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(17,73,112,0.3),transparent_38%)]" />

      <main className="relative mx-auto w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1d2b]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="h-1.5 bg-gradient-to-r from-[#24A1DE] via-[#70d5ff] to-[#24A1DE]" />
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#9bdfff]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#24A1DE]/20">
                <Send className="h-4 w-4 text-[#24A1DE]" />
              </span>
              Telegram VIP
            </div>
            <span className="flex items-center gap-1 rounded-full border border-[#24A1DE]/30 bg-[#24A1DE]/10 px-3 py-1 text-[11px] text-[#9bdfff]">
              <Sparkles className="h-3 w-3" /> Acesso exclusivo
            </span>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {link.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {link.description}
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-[#24A1DE]/30 bg-gradient-to-br from-[#12344a] to-[#0c2232] p-4">
            <p className="text-center text-sm font-semibold text-white">
              Está no TikTok? Faça assim para entrar
            </p>
            <p className="mt-2 text-center text-xs leading-relaxed text-slate-300">
              Toque nos{" "}
              <strong className="text-[#9bdfff]">três pontinhos</strong> no topo
              e escolha{" "}
              <strong className="text-white">“Abrir no navegador”</strong> ou{" "}
              <strong className="text-white">“Abrir no Chrome”</strong>.
            </p>
          </div>

          {/* CTAs ficam antes da prévia do vídeo para o cliente encontrar a ação imediatamente. */}
          <div className="space-y-3">
            <Button
              asChild
              className="h-14 w-full rounded-2xl bg-[#24A1DE] text-base font-bold text-white shadow-[0_8px_24px_rgba(36,161,222,0.28)] transition-all hover:scale-[1.02] hover:bg-[#1a8fc7] active:scale-[0.98]"
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

            <Button
              type="button"
              variant="outline"
              onClick={handleCopyLink}
              className="h-12 w-full rounded-2xl border-white/15 bg-white/5 text-sm font-semibold text-slate-100 hover:bg-white/10 hover:text-white"
            >
              {copyState === "copied" ? (
                <>
                  <Check className="h-5 w-5 text-emerald-400" /> Link copiado!
                </>
              ) : copyState === "error" ? (
                "Não foi possível copiar"
              ) : (
                <>
                  <Clipboard className="h-5 w-5 text-[#9bdfff]" /> Copiar link
                </>
              )}
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span>Veja o passo a passo</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3 shadow-inner">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-300">
                Tutorial rápido
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#70d5ff]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#70d5ff]" />
                Reproduzindo
              </span>
            </div>
            <video
              src={GUIDE_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Vídeo ensinando a abrir a página no navegador"
              className="mx-auto block w-full max-w-[300px] rounded-xl"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-center text-xs text-slate-400">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <Zap className="mx-auto mb-1 h-4 w-4 text-[#24A1DE]" />
              Acesso rápido
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <Shield className="mx-auto mb-1 h-4 w-4 text-[#24A1DE]" />
              Link oficial
            </div>
          </div>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-500">
            Depois de abrir no Chrome, o Telegram será carregado
            automaticamente.
          </p>
        </div>
      </main>
    </div>
  );
}
