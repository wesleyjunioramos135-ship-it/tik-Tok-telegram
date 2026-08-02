import type { Express } from "express";

/**
 * Middleware para configurar headers de cache otimizados para performance
 * e compatibilidade com browser interno do TikTok
 */
export function registerCacheHeadersMiddleware(app: Express) {
  // Cache agressivo para assets estáticos (JS, CSS, imagens)
  app.use((req, res, next) => {
    // Assets estáticos: cache por 1 ano
    if (
      req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i)
    ) {
      res.set("Cache-Control", "public, max-age=31536000, immutable");
      res.set("ETag", "");
      return next();
    }

    // HTML e documentos: cache curto + revalidação
    if (req.path.endsWith(".html") || req.path === "/" || req.path.match(/^\/[a-z0-9-]+$/i)) {
      res.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=86400");
      res.set("X-Content-Type-Options", "nosniff");
      return next();
    }

    // API: sem cache
    if (req.path.startsWith("/api")) {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");
      return next();
    }

    next();
  });
}

/**
 * Middleware para otimizar headers para TikTok browser
 */
export function registerTikTokOptimizationMiddleware(app: Express) {
  app.use((req, res, next) => {
    // Adicionar headers de segurança e performance
    res.set("X-UA-Compatible", "IE=edge");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("X-Frame-Options", "SAMEORIGIN");
    res.set("X-XSS-Protection", "1; mode=block");
    
    // Permitir compressão
    res.set("Vary", "Accept-Encoding");

    // Preload crítico para melhor performance
    if (req.path === "/" || req.path.match(/^\/[a-z0-9-]+$/i)) {
      res.set(
        "Link",
        '</src/main.tsx>; rel=preload; as=script, </src/index.css>; rel=preload; as=style'
      );
    }

    next();
  });
}
