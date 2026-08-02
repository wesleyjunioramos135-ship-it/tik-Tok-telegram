# Guia de Deploy - Bridge Page Telegram

## 📋 Pré-requisitos

- Conta na Vercel (https://vercel.com)
- Conta no GitHub (https://github.com)
- Node.js 18+ instalado localmente
- Git instalado

---

## 🚀 Deploy na Vercel

### Passo 1: Exportar para GitHub

1. Abra o painel de gerenciamento do projeto Manus
2. Clique em **More** (⋯) → **GitHub**
3. Selecione o proprietário (seu usuário ou organização)
4. Digite o nome do repositório: `bridge-page-telegram`
5. Clique em **Export**

O código será enviado para um novo repositório no GitHub.

### Passo 2: Conectar Vercel ao GitHub

1. Acesse https://vercel.com/new
2. Clique em **Import Git Repository**
3. Procure por `bridge-page-telegram` e selecione
4. Clique em **Import**

### Passo 3: Configurar Variáveis de Ambiente

Na tela de configuração do Vercel, adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=<sua_string_de_conexão_mysql>
JWT_SECRET=<sua_chave_jwt_segura>
VITE_APP_ID=<seu_app_id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=<seu_portal_url>
OWNER_OPEN_ID=<seu_open_id>
OWNER_NAME=<seu_nome>
BUILT_IN_FORGE_API_URL=<url_da_api>
BUILT_IN_FORGE_API_KEY=<sua_chave_api>
VITE_FRONTEND_FORGE_API_KEY=<sua_chave_frontend>
VITE_FRONTEND_FORGE_API_URL=<url_frontend_api>
VITE_ANALYTICS_ENDPOINT=<seu_endpoint_analytics>
VITE_ANALYTICS_WEBSITE_ID=<seu_website_id>
```

### Passo 4: Configurar Domínio Personalizado

1. No painel da Vercel, vá para **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite seu domínio: `links-vip.company`
4. Siga as instruções para configurar os registros DNS

### Passo 5: Deploy

Clique em **Deploy** e aguarde a conclusão. Seu site estará disponível em:
- URL padrão Vercel: `bridge-page-telegram.vercel.app`
- Domínio personalizado: `links-vip.company`

---

## 🔧 Configuração do Banco de Dados

### Criar Banco de Dados MySQL

Se você ainda não tem um banco de dados, considere usar:
- **PlanetScale** (MySQL serverless): https://planetscale.com
- **Render** (MySQL): https://render.com
- **AWS RDS**: https://aws.amazon.com/rds

### Executar Migrações

Após configurar a `DATABASE_URL`, execute as migrações:

```bash
pnpm db:push
```

Isso criará a tabela `bridgeLinks` automaticamente.

---

## 🌐 Configurar Domínio Personalizado

### Opção 1: Usar Domínio Existente

1. Acesse seu provedor de DNS (GoDaddy, Namecheap, etc.)
2. Crie um registro CNAME apontando para Vercel
3. Siga as instruções no painel da Vercel

### Opção 2: Comprar Domínio via Vercel

1. No painel da Vercel, vá para **Settings** → **Domains**
2. Clique em **Add Domain**
3. Selecione **Purchase Domain**
4. Siga o processo de compra

---

## 📱 Otimização para TikTok

O aplicativo foi otimizado para o browser interno do TikTok com:

- **Metatags dinâmicas** por slug (Open Graph, Twitter Cards)
- **Cache otimizado** para carregamento rápido
- **Design mobile-first** responsivo
- **Headers de performance** (preload, compression)
- **Sem redirecionamentos ocultos** (acesso direto ao Telegram)

---

## 🔐 Segurança

### Variáveis de Ambiente Críticas

Nunca compartilhe publicamente:
- `JWT_SECRET`
- `DATABASE_URL`
- `BUILT_IN_FORGE_API_KEY`
- Qualquer chave de API

### HTTPS Automático

Vercel fornece HTTPS automático para todos os domínios.

---

## 📊 Monitoramento

### Logs em Tempo Real

```bash
vercel logs
```

### Analytics

O projeto inclui integração com Umami Analytics. Configure `VITE_ANALYTICS_ENDPOINT` e `VITE_ANALYTICS_WEBSITE_ID` para rastrear visitantes.

---

## 🛠️ Desenvolvimento Local

### Instalação

```bash
git clone https://github.com/seu-usuario/bridge-page-telegram.git
cd bridge-page-telegram
pnpm install
```

### Variáveis de Ambiente Local

Crie um arquivo `.env.local`:

```
DATABASE_URL=mysql://user:password@localhost:3306/bridge_page
JWT_SECRET=seu_secret_local
VITE_APP_ID=seu_app_id
# ... outras variáveis
```

### Executar Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### Testes

```bash
pnpm test
```

---

## 📝 Estrutura de Pastas

```
bridge-page-telegram/
├── client/               # Frontend React
│   ├── src/
│   │   ├── pages/       # Páginas (Home, BridgePage, AdminDashboard)
│   │   ├── components/  # Componentes reutilizáveis
│   │   └── lib/         # Utilitários (tRPC client)
│   └── index.html       # HTML base com metatags
├── server/              # Backend Express
│   ├── routers.ts       # Procedures tRPC
│   ├── db.ts            # Query helpers
│   └── _core/           # Middleware e configurações
├── drizzle/             # Schema e migrações
├── shared/              # Código compartilhado
└── package.json
```

---

## 🚨 Troubleshooting

### Erro: "Database connection failed"

- Verifique se `DATABASE_URL` está correto
- Certifique-se de que o banco de dados está acessível
- Teste a conexão: `pnpm db:push`

### Erro: "OAuth failed"

- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que o app está registrado no Manus

### Página não carrega no TikTok

- Verifique as metatags: abra DevTools e procure por `og:` tags
- Teste com https://www.opengraph.xyz
- Certifique-se de que o domínio está acessível

---

## 📞 Suporte

Para problemas com:
- **Vercel**: https://vercel.com/support
- **Banco de dados**: Consulte a documentação do seu provedor
- **Manus**: Acesse https://help.manus.im

---

## ✅ Checklist de Deploy

- [ ] Banco de dados criado e configurado
- [ ] Variáveis de ambiente adicionadas
- [ ] Migrações executadas (`pnpm db:push`)
- [ ] Repositório GitHub criado
- [ ] Vercel conectado ao GitHub
- [ ] Deploy realizado com sucesso
- [ ] Domínio personalizado configurado
- [ ] Metatags testadas (https://www.opengraph.xyz)
- [ ] Primeiro link criado no admin dashboard
- [ ] Link testado no TikTok

---

**Parabéns! Seu Bridge Page está pronto para converter visitantes do TikTok em membros do Telegram! 🎉**
