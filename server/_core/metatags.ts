import type { Express } from "express";
import { getBridgeLinkBySlug } from "../db";

/**
 * Middleware para injetar metatags dinâmicas para slugs de bridge links
 * Permite que crawlers (TikTok, OG, etc.) vejam as metatags corretas
 */
export function registerMetatagsMiddleware(app: Express) {
  // Middleware para interceptar requisições de slugs e injetar metatags
  app.use(async (req, res, next) => {
    // Apenas processar requisições GET
    if (req.method !== "GET") {
      return next();
    }

    // Verificar se é uma requisição de um slug (não é /admin, /api, etc.)
    const path = req.path;
    if (
      path === "/" ||
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.startsWith("/__") ||
      path.includes(".")
    ) {
      return next();
    }

    // Extrair slug da URL
    const slug = path.slice(1).split("/")[0];

    if (!slug) {
      return next();
    }

    try {
      // Buscar o link no banco de dados
      const link = await getBridgeLinkBySlug(slug);

      if (link && link.isActive) {
        // Armazenar os dados do link na requisição para uso posterior
        (req as any).bridgeLink = link;
      }
    } catch (error) {
      console.error("[Metatags] Error fetching bridge link:", error);
    }

    next();
  });
}

/**
 * Gera HTML com metatags dinâmicas para um bridge link
 */
export function generateMetatagsHTML(
  baseHTML: string,
  bridgeLink: {
    slug: string;
    title: string;
    description: string | null;
  },
  baseUrl: string
): string {
  const linkUrl = `${baseUrl}/${bridgeLink.slug}`;
  const title = bridgeLink.title;
  const description =
    bridgeLink.description || "Acesse nosso grupo exclusivo no Telegram";

  // Metatags a serem injetadas
  const metatags = `
    <title>${escapeHTML(title)}</title>
    <meta name="description" content="${escapeHTML(description)}" />
    <meta property="og:title" content="${escapeHTML(title)}" />
    <meta property="og:description" content="${escapeHTML(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHTML(linkUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(title)}" />
    <meta name="twitter:description" content="${escapeHTML(description)}" />
  `;

  // Injetar metatags no head
  return baseHTML.replace(
    /<\/head>/i,
    `${metatags}</head>`
  );
}

/**
 * Escapa caracteres especiais HTML para segurança
 */
function escapeHTML(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Versão segura de escape para uso em servidor (sem DOM)
export function escapeHTMLServer(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateMetatagsHTMLServer(
  baseHTML: string,
  bridgeLink: {
    slug: string;
    title: string;
    description: string | null;
  },
  baseUrl: string
): string {
  const linkUrl = `${baseUrl}/${bridgeLink.slug}`;
  const title = bridgeLink.title;
  const description =
    bridgeLink.description || "Acesse nosso grupo exclusivo no Telegram";

  // Metatags a serem injetadas
  const metatags = `
    <title>${escapeHTMLServer(title)}</title>
    <meta name="description" content="${escapeHTMLServer(description)}" />
    <meta property="og:title" content="${escapeHTMLServer(title)}" />
    <meta property="og:description" content="${escapeHTMLServer(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHTMLServer(linkUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTMLServer(title)}" />
    <meta name="twitter:description" content="${escapeHTMLServer(description)}" />
  `;

  // Injetar metatags no head
  return baseHTML.replace(
    /<\/head>/i,
    `${metatags}</head>`
  );
}
