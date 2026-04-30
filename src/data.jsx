// data.jsx — content for the prototype

const MODULES = [
  {
    id: 1, num: "I",
    title: "Fundamentos da Mentalidade Estratégica",
    short: "Mentalidade Estratégica",
    desc: "Como pensar como um estrategista jurídico de alto valor — antes de qualquer técnica, a postura.",
    lessons: 8, durationMin: 168, progress: 100, status: "done",
    tone: "atmosphere",
    topics: ["Mindset de alta performance", "Posicionamento de autoridade", "Decisões sob pressão"],
  },
  {
    id: 2, num: "II",
    title: "Posicionamento e Autoridade no Mercado Jurídico",
    short: "Posicionamento & Autoridade",
    desc: "Construa uma marca pessoal que comanda respeito — e honorários — sem parecer um anúncio ambulante.",
    lessons: 8, durationMin: 195, progress: 62, status: "current",
    tone: "atmosphere-warm",
    topics: ["Marca pessoal jurídica", "Nicho de alto valor", "Presença digital ética"],
  },
  {
    id: 3, num: "III",
    title: "Captação de Clientes de Alto Valor",
    short: "Captação Estratégica",
    desc: "O sistema completo para atrair os clientes certos — sem prospecção fria e sem perder dignidade.",
    lessons: 9, durationMin: 224, progress: 22, status: "current",
    tone: "atmosphere-deep",
    topics: ["Funil jurídico premium", "Indicações estruturadas", "Networking estratégico"],
  },
  {
    id: 4, num: "IV",
    title: "Estruturação de Honorários Premium",
    short: "Honorários Premium",
    desc: "A precificação que separa o advogado comum do estrategista. Modelos, contratos e a conversa do valor.",
    lessons: 7, durationMin: 152, progress: 0, status: "locked",
    tone: "atmosphere",
    topics: ["Precificação por valor", "Contratos de êxito", "Negociação de honorários"],
  },
  {
    id: 5, num: "V",
    title: "Gestão de Banca e Operação",
    short: "Gestão da Banca",
    desc: "Da banca solo ao escritório boutique: processos, equipe e tecnologia que sustentam crescimento.",
    lessons: 8, durationMin: 188, progress: 0, status: "locked",
    tone: "atmosphere-warm",
    topics: ["Processos jurídicos", "Equipe enxuta", "Stack tecnológica"],
  },
  {
    id: 6, num: "VI",
    title: "Escala e Legado Profissional",
    short: "Escala & Legado",
    desc: "O caminho do advogado para empresário jurídico — sem perder a essência do ofício.",
    lessons: 8, durationMin: 210, progress: 0, status: "locked",
    tone: "atmosphere-deep",
    topics: ["Diversificação de receita", "Sucessão e legado", "Investimentos do advogado"],
  },
];

// Lessons for the active module (II) — used by Module page and Player
const LESSONS_M2 = [
  { n: 1, title: "A diferença entre advogado e estrategista jurídico", duration: "22 min", status: "done" },
  { n: 2, title: "Os três pilares do posicionamento de autoridade", duration: "28 min", status: "done" },
  { n: 3, title: "Como escolher um nicho que paga bem (e não te aprisiona)", duration: "31 min", status: "done" },
  { n: 4, title: "Construindo a narrativa profissional que vende sem vender", duration: "26 min", status: "current" },
  { n: 5, title: "Presença digital para advogados — o que a OAB permite e o que converte", duration: "24 min", status: "next" },
  { n: 6, title: "O escritório como extensão da marca pessoal", duration: "19 min", status: "next" },
  { n: 7, title: "Ativos de autoridade: livro, podcast, palestras", duration: "23 min", status: "next" },
  { n: 8, title: "Estudo de caso: de banca solo a referência em 18 meses", duration: "32 min", status: "next" },
];

// Continue watching items — pulled from across modules
const CONTINUE = [
  { module: "II", lessonN: 4, title: "Construindo a narrativa profissional que vende sem vender", at: "Aula 4 de 8 · 12 min restantes", progress: 56, tone: "atmosphere-warm" },
  { module: "III", lessonN: 2, title: "O funil jurídico premium em 5 etapas", at: "Aula 2 de 9 · 18 min restantes", progress: 28, tone: "atmosphere-deep" },
  { module: "II", lessonN: 3, title: "Como escolher um nicho que paga bem", at: "Concluída · revisar", progress: 100, tone: "atmosphere" },
  { module: "I", lessonN: 7, title: "Decisões sob pressão: o protocolo do estrategista", at: "Aula 7 de 8 · 4 min restantes", progress: 88, tone: "atmosphere-warm" },
];

const MATERIALS = [
  { kind: "PDF", title: "Guia de Posicionamento Jurídico", size: "4.2 MB", pages: "32 páginas" },
  { kind: "TEMPLATE", title: "Modelo de Proposta Premium", size: "180 KB", pages: "Editável .docx" },
  { kind: "CHECKLIST", title: "Auditoria de Marca Pessoal", size: "240 KB", pages: "18 itens" },
  { kind: "PLANILHA", title: "Calculadora de Honorários por Valor", size: "320 KB", pages: ".xlsx" },
  { kind: "PDF", title: "Roteiros de Negociação de Honorários", size: "2.8 MB", pages: "12 cenários" },
  { kind: "CHECKLIST", title: "Protocolo de Onboarding de Cliente", size: "190 KB", pages: "24 itens" },
];

const TESTIMONIALS = [
  {
    name: "Dra. Marina Vasconcellos",
    role: "Direito Empresarial · São Paulo",
    text: "Em oito meses passei de honorários por hora para contratos de êxito que multiplicaram meu faturamento. A Maleta não é um curso — é um sistema operacional para a carreira.",
  },
  {
    name: "Dr. Rafael Coutinho",
    role: "Tributarista · Belo Horizonte",
    text: "O módulo de posicionamento mudou como o mercado me enxerga. Hoje recuso clientes que antes eu suplicava. O Paulo entrega o que outros mentores só prometem.",
  },
  {
    name: "Dra. Letícia Andrade",
    role: "Direito de Família · Curitiba",
    text: "Saí de uma banca solo afogada em prazos para um escritório boutique de quatro pessoas. A diferença foi tratar a advocacia como negócio — exatamente o que a Maleta ensina.",
  },
];

const STATS = {
  alunos: "2.400+",
  experiencia: "12 anos",
  estruturados: "R$ 50M+",
};

window.MalData = { MODULES, LESSONS_M2, CONTINUE, MATERIALS, TESTIMONIALS, STATS };
