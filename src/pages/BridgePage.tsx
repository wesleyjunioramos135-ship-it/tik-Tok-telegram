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
  telegramDeepLink: string;
  telegramWebUrl: string;
  chromeIntentLink: string;
  chromeIosLink: string;
  isActive: boolean;
}

const TELEGRAM_DOMAIN = "agiuavipp";
const TELEGRAM_DEEP_LINK = `tg://resolve?domain=${TELEGRAM_DOMAIN}`;
const TELEGRAM_WEB_URL = `https://t.me/${TELEGRAM_DOMAIN}`;
const CHROME_ANDROID_INTENT =
  `intent://t.me/${TELEGRAM_DOMAIN}` +
  "#Intent;scheme=https;package=com.android.chrome;end;";
const CHROME_IOS_LINK = `googlechrome://navigate?url=${encodeURIComponent(TELEGRAM_WEB_URL)}`;

// Dados de exemplo - em produção, isso viria de uma API
const BRIDGE_LINKS: Record<string, BridgeLink> = {
  default: {
    slug: "default",
    title: "Grupo VIP Exclusivo",
    description:
      "Acesse nosso grupo exclusivo no Telegram com conteúdo premium, dicas diárias e suporte direto.",
    telegramDeepLink: TELEGRAM_DEEP_LINK,
    telegramWebUrl: TELEGRAM_WEB_URL,
    chromeIntentLink: CHROME_ANDROID_INTENT,
    chromeIosLink: CHROME_IOS_LINK,
    isActive: true,
  },
  exemplo: {
    slug: "exemplo",
    title: "Grupo VIP Exclusivo",
    description:
      "Acesse nosso grupo exclusivo no Telegram com conteúdo premium, dicas diárias e suporte direto.",
    telegramDeepLink: TELEGRAM_DEEP_LINK,
    telegramWebUrl: TELEGRAM_WEB_URL,
    chromeIntentLink: CHROME_ANDROID_INTENT,
    chromeIosLink: CHROME_IOS_LINK,
    isActive: true,
  },
  youtubevip: {
    slug: "youtubevip",
    title: "Canal YouTube VIP",
    description:
      "Membros do Telegram recebem acesso exclusivo a vídeos, tutoriais e lives privadas.",
    telegramDeepLink: TELEGRAM_DEEP_LINK,
    telegramWebUrl: TELEGRAM_WEB_URL,
    chromeIntentLink: CHROME_ANDROID_INTENT,
    chromeIosLink: CHROME_IOS_LINK,
    isActive: true,
  },
  comunidade: {
    slug: "comunidade",
    title: "Comunidade Premium",
    description:
      "Junte-se à nossa comunidade de mais de 10 mil membros ativos no Telegram.",
    telegramDeepLink: TELEGRAM_DEEP_LINK,
    telegramWebUrl: TELEGRAM_WEB_URL,
    chromeIntentLink: CHROME_ANDROID_INTENT,
    chromeIosLink: CHROME_IOS_LINK,
    isActive: true,
  },
};

function openTelegram(link: BridgeLink) {
  // O deep link é disparado para abrir o app nativo sem passar por t.me.
  window.location.href = link.telegramDeepLink;
}

function openInChrome(link: BridgeLink) {
  const userAgent = navigator.userAgent;
  const isAndroid = /Android/i.test(userAgent);
  const isIos = /iPhone|iPad|iPod/i.test(userAgent);

  // Essa navegação só ocorre após o clique do usuário, permitindo que o Android
  // entregue o link ao Chrome em vez de tentar abrir o Telegram dentro do TikTok.
  window.location.href = isAndroid
    ? link.chromeIntentLink
    : isIos
      ? link.chromeIosLink
      : link.telegramWebUrl;
}

export default function BridgePage({ slug }: BridgePageProps) {
  const link = BRIDGE_LINKS[slug];

  useEffect(() => {
    if (!link || !link.isActive) {
      return;
    }

    // Atualizar metatags dinamicamente sem criar redirecionamento HTTP para o Telegram.
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

    // O atraso permite que o WebView renderize a página e mantém os CTAs disponíveis
    // caso a chamada automática seja bloqueada.
    const autoOpenTimer = window.setTimeout(() => {
      openTelegram(link);
    }, 500);

    return () => window.clearTimeout(autoOpenTimer);
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
        {/* Card Principal */}
        <div className="rounded-2xl border border-[#24A1DE]/20 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#24A1DE] to-[#1a7aa8] flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{link.title}</h1>
            <p className="text-gray-400">{link.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-5 h-5 text-[#24A1DE]" />
              <span>Acesso instantâneo ao grupo</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-[#24A1DE]" />
              <span>100% seguro e confiável</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Send className="w-5 h-5 text-[#24A1DE]" />
              <span>Sem redirecionamentos ocultos</span>
            </div>
          </div>

          {/* CTA principal: deep link do Telegram. */}
          <Button
            asChild
            className="w-full bg-[#24A1DE] hover:bg-[#1a7aa8] text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#24A1DE]/50"
          >
            <a
              href={link.telegramDeepLink}
              onClick={event => {
                event.preventDefault();
                openTelegram(link);
              }}
              aria-label="Abrir o canal no Telegram"
            >
              ✈️ Acessar Canal VIP
            </a>
          </Button>

          {/* Ação manual para sair do navegador interno do TikTok. */}
          <Button
            asChild
            variant="outline"
            className="w-full mt-3 border-[#24A1DE]/50 text-[#24A1DE] hover:bg-[#24A1DE]/10 font-semibold py-5 text-base rounded-lg"
          >
            <a
              href={link.chromeIntentLink}
              onClick={event => {
                event.preventDefault();
                openInChrome(link);
              }}
              aria-label="Abrir o link do Telegram no Google Chrome"
            >
              <ExternalLink className="w-5 h-5" /> Abrir no Google Chrome
            </a>
          </Button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Se o app não abrir dentro do TikTok, use “Abrir no Google Chrome”.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>🔒 Conexão segura | ⚡ Carregamento rápido | ✅ Verificado</p>
        </div>
      </div>
    </div>
  );
}
