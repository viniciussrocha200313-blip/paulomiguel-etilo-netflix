# CLAUDE.md — Cérebro do Projeto: Maleta do Advogado

> Leia este documento COMPLETO antes de qualquer tarefa.
> Ao concluir qualquer tarefa, atualize a seção correspondente.

---

## IDENTIDADE DO PROJETO

- **Nome:** Maleta do Advogado
- **Mentor:** Paulo Miguel — Estrategista Jurídico | Alta Performance
- **Conceito:** Plataforma de cursos premium para advogados, estilo Netflix, com acesso vitalício após compra única
- **Status atual:** Frontend exportado do Claude Design, em processo de implementação real

---

## CONTAS E SERVIÇOS — NUNCA ALTERAR

### GitHub
- **Conta:** viniciussrocha200313-blip
- **Regra:** Sempre usar ESTA conta. Nunca criar novo repositório sem confirmação explícita do Vinicius.
- **Branch principal:** main

### Vercel
- **Conta:** Vinicius Souza (conectada via GitHub acima)
- **Regra:** Sempre usar ESTA conta para deploy. Nunca criar novo projeto Vercel sem confirmação.
- **Deploy:** Automático via push no GitHub (main)

### Supabase
- **Conta:** A ser definida pelo Vinicius
- **Regra:** NUNCA criar projeto Supabase novo. Usar SOMENTE o projeto que Vinicius indicar explicitamente.
- **Status:** Pendente de configuração

### Stripe
- **Conta:** A ser definida pelo Vinicius
- **Regra:** NUNCA configurar chaves sem o Vinicius fornecer.
- **Status:** Pendente de configuração

---

## STACK TÉCNICO

- **Frontend:** React 18 + Vite + TypeScript
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Pagamentos:** Stripe
- **Deploy:** Vercel (auto-deploy via GitHub)
- **Fontes:** Playfair Display + Cormorant Garamond + Manrope

---

## DESIGN SYSTEM — NUNCA ALTERAR ESSES VALORES

```
Cores:
  Background:  #080808
  Card:        #111111
  Elevated:    #1a1a1a
  Gold:        #C9A050
  Gold hover:  #E8B85A
  Text:        #F5F0E8
  Muted:       #6B6560
  Border:      rgba(201,160,80,0.15)

Fontes:
  Headlines:   Playfair Display
  Subheadings: Cormorant Garamond
  Body/UI:     Manrope
```

---

## ESTRUTURA DA PLATAFORMA

### Telas implementadas no Claude Design:
- [ ] Home (pós-login) — hero, carrosséis, módulos 3D
- [ ] Módulos — lista completa com cards grandes
- [ ] Player de aula — vídeo + sidebar de navegação
- [ ] Meu Progresso — dashboard do aluno
- [ ] Landing Page — página de vendas (pré-login)

### Módulos do curso:
1. Fundamentos da Mentalidade Estratégica — 8 aulas
2. Posicionamento e Autoridade no Mercado Jurídico — 8 aulas
3. Captação de Clientes de Alto Valor — 9 aulas
4. Estruturação de Honorários Premium — 7 aulas
5. Gestão de Banca e Operação — 8 aulas
6. Escala e Legado Profissional — 6 aulas

---

## REGRAS DE COMPORTAMENTO — SEGUIR SEMPRE

1. **Ler este documento antes de qualquer tarefa**
2. **Uma tarefa por vez** — nunca fazer múltiplas alterações sem aprovação do Vinicius entre elas
3. **Sempre commitar antes de mudanças grandes:**
   `git add . && git commit -m "descrição clara"`
4. **Nunca alterar design system** — cores, fontes e espaçamentos definidos acima são fixos
5. **Nunca instalar dependências desnecessárias** — perguntar antes de adicionar qualquer pacote novo
6. **Nunca fazer deploy manual** — o Vercel faz auto-deploy via GitHub. Apenas fazer push no main.
7. **Sempre preservar o visual do Claude Design** — o backend deve se adaptar ao frontend, nunca o contrário
8. **Em caso de dúvida, perguntar** — nunca assumir

---

## HISTÓRICO DE TAREFAS

### ✅ Concluídas
- Projeto criado e exportado do Claude Design
- Repositório conectado ao GitHub (viniciussrocha200313-blip)
- Vercel conectado e configurado para auto-deploy
- **Auto-deploy GitHub → Vercel funcionando** (push em `main` dispara build automático)

### ✅ Tela de login premium (Screen 01) — 2026-04-30
- Substituído `src/screen-landing.jsx` (antiga página de vendas) por tela de login 50/50
- Lado esquerdo: foto Paulo Miguel (mantido `MentorPortrait side="right"`, mesmo gradiente), wordmark + tagline "Estratégias jurídicas de alto valor", copyright bottom-left
- Lado direito (`#0d0d0d`): painel de login com brand, divisor, headline "Acessar minha conta", inputs E-mail/Senha (toggle de visibilidade), "Esqueceu sua senha?", botão dourado "ENTRAR NA MALETA", divisor "ou", botão ghost "Entrar em modo demonstração →" (bypass beta → vai pra Home), badges 🔒/✦
- Atualizado `src/topbar.jsx`: retorna `null` em `route === "landing"` (login fullscreen sem topbar), removido bloco "Já sou aluno"/"Quero a Maleta", adicionado botão ghost "Sair da conta" no canto direito (navega pra `landing`)
- Design system 100% preservado, demais telas (02-05) intocadas
- Commit: `9bb7658` · branch `main`
- Deploy: https://paulomiguel-etilo-netflix.vercel.app

### ✅ Correção da foto Paulo Miguel na tela de login — 2026-04-30
- Foto não estava aparecendo no painel esquerdo do login porque o componente `MentorPortrait mode="full" side="right"` usa `width: 70%` ancorado à direita + gradiente "to right" que escurecia 45% da imagem com `#080808`. Dentro do painel de 50% da tela, a foto ficava espremida no canto e o gradiente cobria quase tudo.
- Em `src/screen-landing.jsx` substituído `<MentorPortrait>` por `<img src="assets/paulo-miguel.png">` direto, com `position: absolute, inset: 0, width/height: 100%, object-fit: cover, object-position: center top` (rosto visível no topo)
- Adicionados dois overlays sutis (gradiente escuro topo + rodapé) só pra preservar legibilidade do wordmark e copyright sobre a foto
- Nenhuma outra alteração — `MentorPortrait` continua existindo em `atoms.jsx` e é usado pelas outras telas
- Commit: `7ba6f4a` · Deploy: https://paulomiguel-etilo-netflix.vercel.app

### ✅ Landing page de curso ao clicar em "Mais Cursos" — 2026-04-30
- **Criado** `src/screen-course-landing.jsx` (placeholder genérico — textos serão trocados pelo cliente). Recebe props `{ course, onNavigate }`.
  - **HERO 100vh:** background `paulo-miguel.png` + gradientes `to right #080808 45%` e `to top 50%`; breadcrumb top-left; botão "✕ Voltar" top-right (ghost gold) → volta pra `home`; conteúdo bottom-left com badge categoria, H1 Playfair 56, subtítulo Cormorant italic gold, descrição muted, stats (12h · 8 módulos · ♾ Vitalício · Certificado), price box (DE R$ 1.997 → R$ 997 + 12× de R$ 97) com botão "QUERO ESTE CURSO →" que dispara `alert("Em breve — integração Stripe")`
  - **Seção "Você vai aprender":** grid 2 colunas, 8 tópicos (`→` gold + título 15px bold + desc 13px muted)
  - **Seção Currículo:** accordion 8 módulos (state local `openIdx`); aberto recebe `border-left: 3px solid var(--gold)` + animação de altura/opacidade
  - **Seção Para quem é:** 3 cards (.card) lado a lado com ícone + título + descrição
  - **Seção Depoimentos:** 3 cards escuros, aspas Cormorant 72px gold, texto + avatar com iniciais + nome + OAB + ★★★★★
  - **Seção Mentor:** `<MentorPortrait side="left" mode="full" />` à esquerda + bio 540px + grid 4 stats (Advogados formados / Anos / Honorários / Recomendam) à direita
  - **Seção CTA Final:** repete price box + selo `IconGuarantee` "Garantia incondicional de 7 dias"
- **Wiring (`src/screen-home.jsx` — só onClick + propagação de prop, zero mudança visual):**
  - `ScreenHome` aceita `onOpenCourse`
  - `<MoreCoursesCarousel onOpenCourse={onOpenCourse} />`
  - `MoreCoursesCarousel` aceita `onOpenCourse` e passa pra cada `<MoreCourseCard onOpenCourse={...} />`
  - `MoreCourseCard`: trocado `const open = () => window.open("#landing-page", "_blank")` por `() => onOpenCourse?.(course)`
- **Roteamento (`src/app.jsx`):**
  - Novo state `courseData` (objeto do curso clicado, persistido em `localStorage["mal_course"]`)
  - Novo handler `openCourse(course)` que faz `setCourseData + setRoute("course-landing")`
  - Nova rota `route === "course-landing" && <ScreenCourseLanding course={courseData} onNavigate={navigate} />`
  - `ScreenHome` recebe `onOpenCourse={openCourse}`
- **`index.html`:** adicionado `<script type="text/babel" src="src/screen-course-landing.jsx">` antes de `app.jsx`
- **Não toquei** em design system, atoms, data, styles, telas 02-05, topbar (topbar continua visível em `course-landing` — close button do hero é apenas affordance adicional)
- Componentes reaproveitados: `IconStar`, `IconArrow`, `IconClock`, `IconBriefcase`, `IconCertificate`, `IconCheck`, `IconChevron`, `IconGuarantee`, `MentorPortrait`, classes `.btn`, `.btn-gold`, `.btn-lg`, `.glow-gold`, `.badge-gold`, `.card`, `.page`, `.f-display`, `.f-serif`, `.fade-in`
- Commit: `48be5cc` · branch `main`
- Deploy: https://paulomiguel-etilo-netflix.vercel.app (auto-deploy via push)

### 🔄 Responsividade mobile — em camadas (B) — 2026-04-30
Plano: 6 etapas em commits separados, cada uma aprovada antes de avançar. Breakpoints adotados: **480 / 768 / 1024 / 1280**.

#### ✅ Etapa 1 — `styles.css` foundation
- Adicionadas 2 media queries (`<= 768px` e `<= 480px`) ao final de `styles.css`
- `.page` e `.page-narrow` padding lateral: `64px` (default) → `32px` (<=768) → `16px` (<=480)
- `.btn-lg` em mobile: `letter-spacing: 0.1em` (<=768), `height: 52px / font-size: 11.5px / padding: 0 18px` (<=480)
- `.btn` em mobile (<=480): `letter-spacing: 0.08em`
- `.tabs` em mobile (<=768): `overflow-x: auto`, scrollbar oculta, `flex-shrink: 0` nos `.tab`
- `.lesson-row`:
  - <=768: grid `48px 100px 1fr auto` (4 cols), gap menor; `nth-child(5)` (chevron final) escondido
  - <=480: grid `28px 1fr auto` (3 cols); `nth-child(2)` (thumb) e `nth-child(5)` (chevron) escondidos
- Design system 100% intacto (zero alteração em cores, fontes ou tokens)
- JSX intocado — apenas CSS
- Commit: `3c1aea8`

#### ✅ Etapa 2 — Topbar mobile (hambúrguer + drawer)
- Em `styles.css`: novo bloco "Layer 2 — Topbar mobile" com classes `.tb-hamburger`, `.tb-desktop-only`, `.tb-drawer-overlay`, `.tb-drawer`, `.tb-drawer-close`, `.tb-drawer-list`, `.tb-drawer-item`, `.tb-drawer-divider`. Media query `@ <=900px` esconde `.tb-desktop-only` (com `!important` pra vencer estilos inline) e mostra `.tb-hamburger`
- Em `src/topbar.jsx`:
  - State `menuOpen`; effect que fecha o drawer ao trocar de rota; effect que trava `body.overflow` e listener de `Escape` enquanto aberto
  - Wordmark agora é o único item sempre visível
  - `<nav>`, search, e cluster direito (bell + avatar + Sair da conta) recebem classe `tb-desktop-only` (escondidos em <=900)
  - Novo `<button class="tb-hamburger">` (44×44, 3 linhas gold de 20×2px) renderizado depois do cluster, visível só em <=900
  - Drawer renderizado fora do `<header>` (fragment): overlay `rgba(0,0,0,0.6)` com animação `tb-overlay-in 200ms`; painel `#0d0d0d` com `border-bottom 1px var(--border)`, `slideDown 300ms`. Itens em `<ul>` (Início / Módulos / Meu Progresso / divisor / Sair da conta), Playfair 18px 600, padding 16px 24px, hover `bg rgba(201,160,80,0.06)` + `border-left 3px gold`. Item ativo recebe `.is-active`. Botão `✕` close 44×44 no canto superior direito.
  - Fechar drawer: clicar fora (overlay), no botão `✕`, ou tecla `Esc`. Auto-fecha ao navegar.
- Desktop (>=901px) idêntico ao anterior — zero mudança visual
- Commit: pendente

#### ⏸️ Etapas 3-6 (aguardando aprovação): login → home → player → módulos+progresso+course landing

### ⚠️ Atenção — limpeza pendente
- O `git add .` do commit `7ba6f4a` acidentalmente pegou três arquivos MP4 soltos na raiz do projeto que NÃO fazem parte do código: `222222222.mp4`, `7.mp4`, `9.mp4`. Foram pushed pro GitHub público.
- Há ainda `333333333333.mp4` na raiz (untracked) que entraria no próximo `git add .` se não for tratado.
- Pendente decisão do Vinicius: remover do repo (`git rm --cached *.mp4` + adicionar `*.mp4` ao `.gitignore`) ou reescrever histórico (`git reset --soft HEAD~1` + force push) caso os vídeos sejam confidenciais.

### 🔄 Em andamento
- Plataforma rodando como protótipo HTML estático com React via CDN

### 📋 Próximas tarefas (em ordem)
1. Configurar Supabase (aguardando Vinicius indicar projeto)
2. Implementar autenticação real (login/logout) conectando inputs ao Supabase Auth
3. Criar banco de dados (módulos, aulas, progresso do aluno)
4. Conectar vídeos reais aos players
5. Implementar controle de progresso por aluno
6. Integrar Stripe para pagamentos
7. Configurar webhook Stripe → liberar acesso após compra
8. Testes completos
9. Deploy final em produção

---

## COMO ATUALIZAR ESTE DOCUMENTO

Ao concluir qualquer tarefa, adicione em "Histórico de Tarefas":

```
### ✅ [Nome da tarefa] — [data]
- O que foi feito
- Arquivos criados/modificados
- Decisões técnicas tomadas
- Problemas encontrados e como foram resolvidos
```

---

*Última atualização: 2026-04-30 — após deploy da landing page de curso*
*Atualizado por: Claude Code*
