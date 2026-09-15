import { Button } from "@/components/ui/button";
import {
  Check,
  Clipboard,
  ExternalLink,
  MoreVertical,
  Send,
  Shield,
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

type Platform = "android" | "ios" | "other";
type CopyState = "idle" | "copied" | "error";

const TELEGRAM_DOMAIN = "agiuavipp";
const TELEGRAM_WEB_URL = `https://t.me/${TELEGRAM_DOMAIN}`;
const ANDROID_INTENT_URL =
  `intent://t.me/${TELEGRAM_DOMAIN}` +
  "#Intent;scheme=https;package=com.android.chrome;" +
  `S.browser_fallback_url=${encodeURIComponent(TELEGRAM_WEB_URL)};end;`;
const IOS_SAFARI_URL = `x-safari-https://t.me/${TELEGRAM_DOMAIN}`;

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

function getPlatform(userAgent: string): Platform {
  if (/Android/i.test(userAgent)) {
    return "android";
  }
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "ios";
  }
  return "other";
}

function isInAppBrowser(userAgent: string) {
  return /TikTok|musical_ly|Bytedance|Instagram|FBAN|FBAV|Facebook|Messenger|Snapchat|Pinterest/i.test(
    userAgent
  );
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Alguns navegadores internos negam a Clipboard API; usa o fallback abaixo.
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
  const [isInApp, setIsInApp] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");

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

    const userAgent = navigator.userAgent;
    const inApp = isInAppBrowser(userAgent);
    setIsInApp(inApp);
    setPlatform(getPlatform(userAgent));

    // Fora de TikTok, Instagram, Facebook e outros WebViews, o HTTPS segue
    // diretamente para o Telegram sem exigir uma ação extra.
    if (!inApp) {
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

  function handleOpenInBrowser() {
    if (platform === "android") {
      window.location.href = ANDROID_INTENT_URL;
      return;
    }

    if (platform === "ios") {
      window.location.href = IOS_SAFARI_URL;
      return;
    }

    window.location.href = link.telegramWebUrl;
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

  // Mantém uma tela mínima enquanto o User-Agent é identificado e antes do
  // redirecionamento automático em navegador normal.
  if (!isInApp) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <p className="text-center text-sm text-muted-foreground">
          Abrindo o Telegram…
        </p>
      </div>
    );
  }

  const platformName = platform === "ios" ? "iPhone" : "Android";

  return (
    <div className="min-h-screen bg-[#151711] px-4 py-8 text-[#20211d] sm:flex sm:items-center sm:justify-center">
      <main className="mx-auto w-full max-w-md rounded-[28px] bg-[#fffef8] p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="rounded-full border-2 border-[#20211d] px-4 py-1 text-sm font-semibold">
            Grupo VIP
          </div>
          <span className="rounded-full border-2 border-[#20211d] px-3 py-1 text-xs font-semibold text-[#4d8e94]">
            {platformName} • navegador interno
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Abra no seu navegador
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#5b5c55]">
            O navegador interno do aplicativo limita alguns recursos. Toque no
            botão abaixo para abrir o Telegram no navegador real.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpenInBrowser}
          className="mt-7 h-14 w-full rounded-2xl border-2 border-[#20211d] bg-[#5aa0a5] text-lg font-bold text-white shadow-[0_4px_0_#20211d] hover:bg-[#4d8e94] active:translate-y-1 active:shadow-none"
        >
          <ExternalLink className="h-5 w-5" />
          Abrir no navegador
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleCopyLink}
          className="mt-4 h-14 w-full rounded-2xl border-2 border-[#20211d] bg-[#fffef8] text-lg font-bold text-[#20211d] shadow-[0_4px_0_#20211d] hover:bg-[#f3f1e8] active:translate-y-1 active:shadow-none"
        >
          {copyState === "copied" ? (
            <>
              <Check className="h-5 w-5" /> Copiado!
            </>
          ) : copyState === "error" ? (
            "Não foi possível copiar"
          ) : (
            <>
              <Clipboard className="h-5 w-5" /> Copiar link
            </>
          )}
        </Button>

        <section className="mt-8 rounded-2xl border-2 border-[#20211d] p-5">
          <h2 className="text-lg font-extrabold uppercase tracking-wide">
            Se continuar nesta tela
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4b4c47]">
            <li className="flex gap-3">
              <MoreVertical className="mt-0.5 h-5 w-5 shrink-0 text-[#4d8e94]" />
              <span>
                Toque nos <strong>três pontinhos</strong> no canto superior
                direito e escolha <strong>“Abrir no Chrome”</strong> ou
                <strong> “Abrir no navegador”</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <Clipboard className="mt-0.5 h-5 w-5 shrink-0 text-[#4d8e94]" />
              <span>
                Ou toque em <strong>“Copiar link”</strong> e cole o endereço no
                seu navegador.
              </span>
            </li>
          </ul>
          <p className="mt-5 break-all rounded-xl border-2 border-[#a9aaa1] bg-[#faf9f2] px-4 py-3 font-mono text-sm">
            {link.telegramWebUrl}
          </p>
        </section>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#6f7068]">
          <Send className="h-4 w-4" />
          <Shield className="h-4 w-4" />
          <span>Link oficial e seguro do Telegram</span>
        </div>
      </main>
    </div>
  );
}
