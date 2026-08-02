# Bridge Page Telegram - TODO

## Fase 1: Banco de Dados e Backend
- [x] Criar tabela `bridgeLinks` no schema com campos: id, slug, title, description, telegramUrl, isActive, createdAt, updatedAt
- [x] Implementar query helpers em `server/db.ts` para CRUD de links
- [x] Criar procedures tRPC para: listar links, obter link por slug, criar link, atualizar link, deletar link, ativar/desativar link
- [x] Adicionar proteção de acesso (admin-only) nos procedures de escrita
- [x] Implementar validação de slug único no banco de dados

## Fase 2: Página de Destino Pública (Bridge Page)
- [x] Criar componente `BridgePage.tsx` com design dark premium mobile-first
- [x] Implementar roteamento dinâmico por slug em `App.tsx`
- [x] Criar card de conversão com avatar/ícone, título, descrição e botão CTA
- [x] Implementar botão CTA com cor #24A1DE, animação de brilho/pulso e abertura direta do link Telegram
- [x] Criar página 404 personalizada para slugs inexistentes ou links desativados
- [x] Implementar metatags dinâmicas (Open Graph, title, description) por slug
- [x] Otimizar para visualização em browser interno do TikTok

## Fase 3: Painel Administrativo
- [x] Criar layout do Admin Dashboard com proteção de acesso
- [x] Implementar listagem de todos os links com status ativo/inativo
- [x] Criar formulário de cadastro de novo link (slug, título, descrição, URL Telegram)
- [x] Implementar edição de links existentes
- [x] Implementar switch de ativação/desativação de links
- [x] Implementar exclusão de links
- [x] Adicionar proteção de acesso (apenas owner/admin)
- [x] Implementar feedback visual (toasts) para ações de CRUD

## Fase 4: Otimizações e Ajustes Finais
- [x] Otimizar performance e cache de metatags
- [x] Testar roteamento dinâmico e validações
- [x] Testar compatibilidade mobile e responsividade
- [x] Escrever testes vitest para procedures tRPC
- [x] Revisar design dark premium e animações
- [x] Verificar compatibilidade com browser interno do TikTok

## Fase 5: Entrega
- [x] Criar checkpoint final
- [x] Preparar instruções de deploy na Vercel (DEPLOY.md)
- [x] Preparar instruções de exportação para GitHub (DEPLOY.md)
- [x] Documentar variáveis de ambiente necessárias (README.md e DEPLOY.md)
