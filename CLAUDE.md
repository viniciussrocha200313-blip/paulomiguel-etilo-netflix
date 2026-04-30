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

*Última atualização: 2026-04-30 — após deploy da tela de login*
*Atualizado por: Claude Code*
