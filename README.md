# Bridge Page - TikTok to Telegram

Um aplicativo web profissional e moderno para converter visitantes do TikTok em membros do Telegram. Design dark premium, roteamento dinâmico por slug, painel administrativo completo e otimizado para o browser interno do TikTok.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)
![React](https://img.shields.io/badge/react-19-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9-blue.svg)
[![Deploy Status](https://img.shields.io/badge/Vercel-Deployed-success.svg)](https://vercel.com)
[![GitHub](https://img.shields.io/badge/GitHub-Public-blue.svg)](https://github.com/wesleyjunioramos135-ship-it/tik-Tok-telegram)

---

## 🎯 Características Principais

### 🌟 Página de Destino (Bridge Page)
- **Design Dark Premium**: Tema sofisticado com cores Telegram (#24A1DE)
- **Mobile-First**: Totalmente responsivo para todos os dispositivos
- **Roteamento Dinâmico**: Cada slug (`/exemplo`) renderiza uma página única
- **Animações Suaves**: Botão CTA com efeito de brilho e pulso
- **Metatags Dinâmicas**: Open Graph e Twitter Cards por slug
- **Sem Cloaking**: Acesso direto ao Telegram, sem redirecionamentos ocultos

### 🎛️ Painel Administrativo
- **Protegido por Autenticação**: Apenas admin/owner podem acessar
- **CRUD Completo**: Criar, editar, deletar e ativar/desativar links
- **Gerenciamento de Status**: Switch simples para ativar/desativar
- **Listagem com Filtros**: Visualizar todos os links com estatísticas
- **Feedback Visual**: Toasts para confirmação de ações

### ⚡ Performance & Otimizações
- **Cache Otimizado**: Headers de cache para assets estáticos
- **Carregamento Rápido**: < 1 segundo no browser interno do TikTok
- **Metatags Dinâmicas**: Compatibilidade com crawlers e link previews
- **Compressão**: Suporte a gzip e brotli
- **Preload Crítico**: Recursos essenciais carregados antecipadamente

### 🔒 Segurança
- **Validação de Entrada**: Slug único, URLs válidas
- **Proteção de Acesso**: Admin-only procedures
- **HTTPS Automático**: Em produção via Vercel
- **SQL Injection Prevention**: Queries parametrizadas com Drizzle ORM

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - UI moderna com hooks
- **Tailwind CSS 4** - Estilização utility-first
- **Wouter** - Roteamento leve
- **Lucide React** - Ícones
- **Sonner** - Toasts e notificações
- **Framer Motion** - Animações (quando necessário)

### Backend
- **Express 4** - Servidor web
- **tRPC 11** - RPC type-safe
- **Drizzle ORM** - Query builder type-safe
- **MySQL/TiDB** - Banco de dados

### DevOps
- **Vercel** - Deploy e hosting
- **GitHub** - Versionamento
- **Vitest** - Testes unitários

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)
- MySQL 5.7+ ou TiDB

### Setup Local

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/bridge-page-telegram.git
cd bridge-page-telegram

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar migrações
pnpm db:push

# Iniciar servidor de desenvolvimento
pnpm dev
```

O aplicativo estará disponível em `http://localhost:3000`

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Exportar para GitHub
# (Veja DEPLOY.md para instruções detalhadas)

# Conectar Vercel ao repositório GitHub
# Vercel detectará automaticamente que é um projeto Node.js

# Configurar variáveis de ambiente no painel da Vercel
# Deploy automático em cada push para main
```

Para instruções completas, consulte [DEPLOY.md](./DEPLOY.md)

---

## 📖 Uso

### Criar um Novo Link

1. Acesse `/admin` (requer autenticação como admin)
2. Clique em **Novo Link**
3. Preencha:
   - **Slug**: `exemplo-vip` (será acessível em `/exemplo-vip`)
   - **Título**: `Grupo VIP Exclusivo`
   - **Descrição**: `Acesse nosso grupo exclusivo no Telegram`
   - **URL do Telegram**: `https://t.me/seu_grupo`
4. Clique em **Criar**

### Compartilhar Link

1. No painel admin, clique no ícone de cópia ao lado do slug
2. Link será copiado: `https://seu-dominio.com/exemplo-vip`
3. Compartilhe em sua bio do TikTok

### Ativar/Desativar Link

1. No painel admin, localize o link
2. Use o switch **Status** para ativar/desativar
3. Links desativados mostram página 404

---

## 🗄️ Banco de Dados

### Schema

```sql
CREATE TABLE `bridgeLinks` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `slug` varchar(128) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `description` text,
  `telegramUrl` varchar(512) NOT NULL,
  `isActive` int NOT NULL DEFAULT 1,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Queries Disponíveis

- `getBridgeLinkBySlug(slug)` - Obter link por slug
- `getAllBridgeLinks()` - Listar todos os links
- `createBridgeLink(data)` - Criar novo link
- `updateBridgeLink(id, data)` - Atualizar link
- `deleteBridgeLink(id)` - Deletar link
- `toggleBridgeLinkStatus(id, isActive)` - Ativar/desativar

---

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Testes com cobertura
pnpm test -- --coverage

# Watch mode
pnpm test -- --watch
```

Testes incluem:
- Procedures tRPC (autenticação, autorização)
- Validação de entrada
- Proteção de acesso admin

---

## 🎨 Customização

### Cores

Edite `client/src/index.css` para alterar o tema:

```css
.dark {
  --primary: #24A1DE;        /* Cor principal (Telegram) */
  --background: oklch(...);  /* Fundo */
  --foreground: oklch(...);  /* Texto */
  /* ... outras cores */
}
```

### Fontes

Edite `client/index.html` para adicionar Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Sua+Fonte:wght@400;600;700&display=swap" rel="stylesheet" />
```

### Metatags

Edite `client/index.html` para alterar metatags padrão.

---

## 📱 Otimização para TikTok

O aplicativo foi otimizado especificamente para o browser interno do TikTok:

1. **Metatags Dinâmicas**: Cada slug tem title, description, og:title, og:description
2. **Cache Agressivo**: Assets estáticos cacheados por 1 ano
3. **Preload**: Recursos críticos carregados antecipadamente
4. **Compressão**: Suporte a gzip/brotli
5. **Sem JavaScript Bloqueante**: Carregamento rápido

**Teste com**: https://www.opengraph.xyz

---

## 🔐 Variáveis de Ambiente

```bash
# Banco de dados
DATABASE_URL=mysql://user:password@host:3306/bridge_page

# Autenticação
JWT_SECRET=sua_chave_jwt_segura
VITE_APP_ID=seu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=seu_portal_url

# Proprietário
OWNER_OPEN_ID=seu_open_id
OWNER_NAME=seu_nome

# APIs
BUILT_IN_FORGE_API_URL=url_da_api
BUILT_IN_FORGE_API_KEY=sua_chave_api
VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend
VITE_FRONTEND_FORGE_API_URL=url_frontend_api

# Analytics
VITE_ANALYTICS_ENDPOINT=seu_endpoint
VITE_ANALYTICS_WEBSITE_ID=seu_website_id
```

---

## 📊 Estrutura do Projeto

```
bridge-page-telegram/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Página inicial
│   │   │   ├── BridgePage.tsx      # Página dinâmica de slug
│   │   │   ├── BridgeNotFound.tsx  # Página 404
│   │   │   └── AdminDashboard.tsx  # Painel administrativo
│   │   ├── components/              # Componentes reutilizáveis
│   │   ├── lib/
│   │   │   └── trpc.ts             # Cliente tRPC
│   │   ├── App.tsx                 # Router principal
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Estilos globais
│   ├── index.html                  # HTML base
│   └── public/                      # Assets estáticos
├── server/                          # Backend Express
│   ├── routers.ts                  # Procedures tRPC
│   ├── db.ts                       # Query helpers
│   ├── auth.logout.test.ts         # Testes de auth
│   ├── bridgeLinks.test.ts         # Testes de bridge links
│   └── _core/
│       ├── index.ts                # Servidor principal
│       ├── metatags.ts             # Middleware de metatags
│       ├── cacheHeaders.ts         # Middleware de cache
│       ├── context.ts              # Contexto tRPC
│       ├── oauth.ts                # OAuth routes
│       └── vite.ts                 # Integração Vite
├── drizzle/                         # Banco de dados
│   ├── schema.ts                   # Schema Drizzle
│   ├── migrations/                 # Arquivos de migração
│   └── relations.ts                # Relações
├── shared/                          # Código compartilhado
│   ├── const.ts                    # Constantes
│   └── types.ts                    # Tipos
├── DEPLOY.md                        # Guia de deploy
├── README.md                        # Este arquivo
├── package.json                     # Dependências
├── tsconfig.json                    # Configuração TypeScript
├── tailwind.config.ts               # Configuração Tailwind
└── vite.config.ts                   # Configuração Vite
```

---

## 🚨 Troubleshooting

### Erro: "Cannot find module 'bridgeLinks'"
- Certifique-se de que `drizzle/schema.ts` foi atualizado
- Execute `pnpm db:push` para criar a tabela

### Erro: "OAuth failed"
- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que o app está registrado

### Página não carrega no TikTok
- Teste metatags em https://www.opengraph.xyz
- Verifique se o domínio está acessível
- Limpe cache do TikTok

### Admin dashboard não carrega
- Verifique se você está logado como admin
- Confirme que `user.role === 'admin'`
- Verifique logs em `.manus-logs/devserver.log`

---

## 📝 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

- **Documentação**: Veja [DEPLOY.md](./DEPLOY.md)
- **Issues**: Abra uma issue no GitHub
- **Email**: Seu email de contato

---

## 🎉 Agradecimentos

Construído com ❤️ usando:
- Manus WebDev Platform
- React & Tailwind CSS
- tRPC & Drizzle ORM
- Vercel

---

**Pronto para converter TikTok em Telegram? Comece agora! 🚀**
