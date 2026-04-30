// screen-course-landing.jsx — landing page de curso (placeholder genérico — textos serão trocados pelo cliente)

const ScreenCourseLanding = ({ course, onNavigate }) => {
  const c = course || { cat: "ADVOCACIA", title: "Carro do Advogado", desc: "Transforme seu escritório em uma máquina de resultados" };
  const [openIdx, setOpenIdx] = React.useState(0);

  const learn = [
    { title: "Mindset estratégico de alto valor",      desc: "Como pensar como um advogado de elite antes de qualquer técnica." },
    { title: "Posicionamento de marca jurídica",        desc: "Construa autoridade que comanda honorários premium." },
    { title: "Captação de clientes qualificados",       desc: "Sistema completo para atrair os clientes certos — sem prospecção fria." },
    { title: "Honorários por valor entregue",           desc: "A precificação que separa o advogado comum do estrategista." },
    { title: "Negociação consultiva",                   desc: "A conversa do valor — sem desconto, sem perder o cliente." },
    { title: "Gestão de banca de alta performance",     desc: "Processos, equipe e tecnologia para escalar com tranquilidade." },
    { title: "Marketing jurídico ético",                desc: "Presença digital dentro do que a OAB permite — e que converte." },
    { title: "Estudo de caso real",                     desc: "Da banca solo à referência regional em 18 meses." },
  ];

  const curriculum = [
    { num: "I",    title: "Fundamentos da Mentalidade",   duration: "1h 45min", lessons: ["O advogado vs o estrategista jurídico", "Os pilares do posicionamento de autoridade", "Decisões sob pressão"] },
    { num: "II",   title: "Posicionamento de Mercado",    duration: "2h 15min", lessons: ["Marca pessoal jurídica do zero", "Nicho que paga bem (e não te aprisiona)", "Narrativa profissional que vende sem vender"] },
    { num: "III",  title: "Captação de Clientes Premium", duration: "2h 30min", lessons: ["Funil jurídico de alto valor", "Indicações estruturadas", "Networking estratégico real"] },
    { num: "IV",   title: "Honorários e Precificação",    duration: "1h 50min", lessons: ["Precificação por valor", "Contratos de êxito modernos", "Negociação de honorários sob pressão"] },
    { num: "V",    title: "Gestão da Banca",              duration: "1h 30min", lessons: ["Processos jurídicos enxutos", "Equipe pequena de alto rendimento", "Stack tecnológica do advogado"] },
    { num: "VI",   title: "Marketing Jurídico Ético",     duration: "1h 10min", lessons: ["Presença digital que respeita a OAB", "Conteúdo que constrói autoridade", "Mídia paga para advogados"] },
    { num: "VII",  title: "Escala e Diversificação",      duration: "55 min",   lessons: ["Quando contratar o segundo advogado", "Linhas de receita complementares", "Investimentos do advogado"] },
    { num: "VIII", title: "Estudo de Caso Comentado",     duration: "1h 05min", lessons: ["Da banca solo à referência regional", "Os erros que custaram caro", "O que faria diferente hoje"] },
  ];

  const audience = [
    { icon: <IconBriefcase size={22} />, title: "Advogados em transição",            desc: "Você fez o caminho técnico, agora quer construir uma carreira que paga o que ela vale." },
    { icon: <IconStar      size={16} />, title: "Bancas em crescimento",             desc: "Sua banca cresce mas o caixa não acompanha. Falta sistema, não esforço." },
    { icon: <IconCertificate size={22} />, title: "Profissionais em estágio premium", desc: "Você já cobra bem, mas quer estruturar legado, equipe e diversificação." },
  ];

  const testimonials = [
    { name: "Dra. Marina Vasconcellos", oab: "OAB/SP 312.498", text: "Em oito meses passei de honorários por hora para contratos de êxito que multiplicaram meu faturamento. Não é um curso — é um sistema operacional para a carreira." },
    { name: "Dr. Rafael Coutinho",      oab: "OAB/MG 187.234", text: "O módulo de posicionamento mudou como o mercado me enxerga. Hoje recuso clientes que antes eu suplicava. Entrega o que outros mentores só prometem." },
    { name: "Dra. Letícia Andrade",     oab: "OAB/PR 098.451", text: "Saí de banca solo afogada em prazos para um escritório boutique de quatro pessoas. A diferença foi tratar a advocacia como negócio — exatamente o que ensina aqui." },
  ];

  const mentorStats = [
    { num: "2.400+", label: "Advogados formados" },
    { num: "12 anos", label: "De experiência" },
    { num: "R$ 50M+", label: "Em honorários estruturados" },
    { num: "98%",    label: "Recomendam o método" },
  ];

  const PriceBox = ({ size = "md" }) => (
    <div style={{
      display: "inline-flex", flexDirection: "column",
      padding: size === "lg" ? "28px 32px" : "24px 28px",
      background: "rgba(17,17,17,0.85)",
      border: "1px solid var(--border-strong)",
      borderRadius: 6,
      backdropFilter: "blur(8px)",
      minWidth: 480,
    }}>
      <span style={{ fontSize: 12, textDecoration: "line-through", color: "var(--text-3)", letterSpacing: "0.06em" }}>
        DE R$ 1.997
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
        <span className="f-display" style={{
          fontSize: size === "lg" ? 56 : 48,
          color: "var(--gold)", fontWeight: 800,
          letterSpacing: "-0.025em", lineHeight: 1,
        }}>R$&nbsp;997</span>
        <span style={{ fontSize: 13, color: "var(--text-2)" }}>à vista</span>
      </div>
      <span style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6, letterSpacing: "0.04em" }}>
        ou 12× de R$ 97,00 · acesso vitalício
      </span>
      <button
        className="btn btn-gold btn-lg glow-gold"
        style={{ marginTop: 22, alignSelf: "flex-start", height: 60, padding: "0 30px", fontSize: 13 }}
        onClick={() => alert("Em breve — integração Stripe")}
      >
        QUERO ESTE CURSO <IconArrow size={14} />
      </button>
    </div>
  );

  return (
    <div className="fade-in">

      {/* ============ HERO (100vh) ============ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#080808",
      }}>
        {/* Background photo */}
        <img
          src="assets/paulo-miguel.png"
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            pointerEvents: "none",
          }}
        />

        {/* Spec gradients — fade left + fade bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #080808 45%, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, #080808 0%, transparent 50%)",
          pointerEvents: "none",
        }} />

        {/* Breadcrumb (top-left) */}
        <div style={{
          position: "absolute", top: 28, left: 64, zIndex: 5,
          fontFamily: "var(--f-sans)", fontSize: 11,
          color: "#6B6560", letterSpacing: "0.06em",
        }}>
          Início
          <span style={{ color: "var(--text-3)", margin: "0 10px" }}>›</span>
          Mais Cursos
          <span style={{ color: "var(--text-3)", margin: "0 10px" }}>›</span>
          <span style={{ color: "var(--gold-hover)" }}>{c.title}</span>
        </div>

        {/* Close button (top-right) */}
        <button
          onClick={() => onNavigate("home")}
          style={{
            position: "absolute", top: 22, right: 64, zIndex: 5,
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px",
            background: "rgba(8,8,8,0.7)",
            border: "1px solid var(--gold-line)",
            borderRadius: 4,
            color: "var(--gold)",
            fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 12,
            letterSpacing: "0.08em", textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 200ms ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,160,80,0.12)"; e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold-hover)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(8,8,8,0.7)"; e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.color = "var(--gold)"; }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>✕</span> Voltar
        </button>

        {/* Bottom-left content */}
        <div className="page" style={{
          position: "absolute", left: 0, right: 0, bottom: 64,
          zIndex: 4,
        }}>
          <div style={{ maxWidth: 720 }}>
            <span className="badge-gold" style={{ marginBottom: 22, display: "inline-flex" }}>
              <IconStar size={10} /> {c.cat}
            </span>

            <h1 className="f-display" style={{
              fontSize: 56, lineHeight: 1.05, fontWeight: 800,
              letterSpacing: "-0.025em", margin: "0 0 14px",
            }}>
              {c.title}
            </h1>

            <p className="f-serif" style={{
              fontSize: 22, fontStyle: "italic",
              color: "var(--gold-hover)", margin: "0 0 18px", lineHeight: 1.35,
            }}>
              {c.desc}
            </p>

            <p style={{
              fontFamily: "var(--f-sans)", fontSize: 16, lineHeight: 1.6,
              color: "#8A8070", margin: "0 0 28px", maxWidth: 600,
            }}>
              Um sistema completo, prático e direto ao ponto — pensado para o advogado pronto
              para operar em outro patamar de honorários, autoridade e crescimento sustentável.
              Aqui você encontra o método aplicado de Paulo Miguel, sem teoria vazia.
            </p>

            {/* Stats inline */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 28, marginBottom: 32,
              fontFamily: "var(--f-sans)", fontSize: 13, color: "var(--text-1)",
              letterSpacing: "0.04em",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconClock size={14} /> 12 horas
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconBriefcase size={14} /> 8 módulos
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold-hover)" }}>
                ♾ Acesso vitalício
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconCertificate size={14} /> Certificado de conclusão
              </span>
            </div>

            <PriceBox size="lg" />
          </div>
        </div>
      </section>

      {/* ============ SEÇÃO 1 — VOCÊ VAI APRENDER ============ */}
      <section className="page" style={{ padding: "96px 64px", background: "#080808" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> O que você vai aprender
          </span>
          <h2 className="f-display" style={{
            fontSize: 46, lineHeight: 1.1, margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}>
            Tudo que separa o advogado <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>comum</em> do estrategista.
          </h2>
          <p className="f-serif" style={{
            fontSize: 19, fontStyle: "italic", lineHeight: 1.45,
            color: "var(--text-1)", margin: 0,
          }}>
            Oito frentes de trabalho, cada uma com aplicação direta no dia a dia da banca.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px 64px" }}>
          {learn.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: 8 }}>
              <span style={{
                color: "var(--gold)", fontFamily: "var(--f-display)",
                fontSize: 20, fontWeight: 700, lineHeight: 1.2,
                flexShrink: 0, marginTop: 1,
              }}>→</span>
              <div>
                <div style={{
                  fontFamily: "var(--f-sans)", fontSize: 15, fontWeight: 700,
                  color: "var(--text-0)", marginBottom: 4, lineHeight: 1.35,
                }}>{item.title}</div>
                <div style={{
                  fontFamily: "var(--f-sans)", fontSize: 13, color: "var(--text-2)",
                  lineHeight: 1.55,
                }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SEÇÃO 2 — CURRÍCULO (accordion) ============ */}
      <section className="page" style={{ padding: "96px 64px", background: "#080808", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> Currículo completo
          </span>
          <h2 className="f-display" style={{ fontSize: 46, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Oito módulos, <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>uma única jornada.</em>
          </h2>
          <p className="f-serif" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.45, color: "var(--text-1)", margin: 0 }}>
            Sequência pensada para o avanço progressivo — cada módulo prepara o seguinte.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {curriculum.map((m, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{
                background: isOpen ? "var(--bg-1)" : "rgba(17,17,17,0.5)",
                border: "1px solid var(--border)",
                borderLeft: isOpen ? "3px solid var(--gold)" : "1px solid var(--border)",
                borderRadius: 4,
                overflow: "hidden",
                transition: "all 240ms ease",
              }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  style={{
                    width: "100%", textAlign: "left",
                    display: "flex", alignItems: "center", gap: 20,
                    padding: "20px 24px",
                    background: "transparent", border: 0, cursor: "pointer",
                    fontFamily: "var(--f-sans)",
                  }}
                >
                  <span className="f-serif" style={{
                    fontSize: 26, fontStyle: "italic", fontWeight: 500,
                    color: "var(--gold-hover)", letterSpacing: "-0.02em",
                    minWidth: 56, lineHeight: 1,
                  }}>{m.num}</span>
                  <span className="f-display" style={{ flex: 1, fontSize: 18, color: "var(--text-0)", letterSpacing: "-0.005em" }}>
                    {m.title}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.04em", flexShrink: 0 }}>
                    <IconClock size={12} /> {m.duration}
                  </span>
                  <span style={{
                    color: "var(--gold)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 240ms ease",
                    flexShrink: 0,
                  }}>
                    <IconChevron size={14} />
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 400 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 320ms ease, opacity 240ms ease",
                }}>
                  <ul style={{
                    listStyle: "none", padding: "0 24px 22px 92px", margin: 0,
                    display: "grid", gap: 10,
                  }}>
                    {m.lessons.map((lt, li) => (
                      <li key={li} style={{
                        display: "flex", alignItems: "flex-start", gap: 12,
                        fontFamily: "var(--f-sans)", fontSize: 14, color: "var(--text-1)",
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: "var(--gold)", marginTop: 4, flexShrink: 0 }}>
                          <IconCheck size={11} />
                        </span>
                        {lt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ SEÇÃO 3 — PARA QUEM É ============ */}
      <section className="page" style={{ padding: "96px 64px", background: "#080808", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> Para quem é este curso
          </span>
          <h2 className="f-display" style={{ fontSize: 46, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Não é para qualquer advogado — <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>é para o seu.</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {audience.map((a, i) => (
            <div key={i} className="card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 6,
                background: "var(--gold-subtle)",
                border: "1px solid var(--gold-line)",
                color: "var(--gold-hover)",
                display: "grid", placeItems: "center",
              }}>{a.icon}</div>
              <div className="f-display" style={{ fontSize: 20, color: "var(--text-0)", letterSpacing: "-0.005em", lineHeight: 1.25 }}>
                {a.title}
              </div>
              <p style={{ fontFamily: "var(--f-sans)", fontSize: 14, lineHeight: 1.55, color: "var(--text-2)", margin: 0 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SEÇÃO 4 — DEPOIMENTOS ============ */}
      <section className="page" style={{ padding: "96px 64px", background: "#080808", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> Resultados reais
          </span>
          <h2 className="f-display" style={{ fontSize: 46, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Quem já aplicou — <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>e o que mudou.</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              position: "relative",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "32px 28px 26px",
              display: "flex", flexDirection: "column",
              minHeight: 300,
            }}>
              <div className="f-display" style={{
                fontSize: 72, lineHeight: 0.6,
                color: "var(--gold)", fontStyle: "italic", fontWeight: 700,
                marginBottom: 10,
                fontFamily: "var(--f-serif)",
              }}>"</div>

              <p className="f-serif" style={{
                fontSize: 17, lineHeight: 1.5, fontStyle: "italic",
                color: "var(--text-1)", margin: "0 0 24px", flex: 1,
              }}>
                {t.text}
              </p>

              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                paddingTop: 16, borderTop: "1px solid var(--border)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, #2a2218, #14100a)",
                  border: "1px solid var(--gold-line)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--f-display)", fontSize: 16, color: "var(--gold-hover)",
                }}>{t.name.split(" ").slice(-2).map(s => s[0]).join("")}</div>

                <div style={{ flex: 1 }}>
                  <div className="f-display" style={{ fontSize: 14, color: "var(--text-0)" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.06em", marginTop: 2 }}>{t.oab}</div>
                </div>

                <div style={{ color: "var(--gold-hover)", fontSize: 13, letterSpacing: "0.1em" }}>★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SEÇÃO 5 — MENTOR ============ */}
      <section style={{
        position: "relative", overflow: "hidden",
        borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        background: "#080808",
      }}>
        <MentorPortrait side="left" mode="full" />

        <div className="page" style={{
          position: "relative", zIndex: 2,
          padding: "96px 64px",
          display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64,
        }}>
          <div />
          <div>
            <span className="badge-gold" style={{ marginBottom: 22, display: "inline-flex" }}>
              <IconStar size={10} /> Quem é o mentor
            </span>
            <h2 className="f-display" style={{
              fontSize: 50, lineHeight: 1.05, margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}>
              Paulo <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Miguel</em>
            </h2>
            <p className="f-serif" style={{
              fontSize: 21, fontStyle: "italic",
              color: "var(--text-1)", margin: "0 0 28px",
            }}>
              Estrategista Jurídico <span style={{ color: "var(--gold)" }}>·</span> Alta Performance
            </p>
            <p style={{
              fontSize: 16, lineHeight: 1.65, color: "var(--text-1)",
              margin: "0 0 32px", maxWidth: 540,
            }}>
              Por mais de uma década, Paulo trabalhou nos bastidores de bancas que faturam de seis
              a sete dígitos mensais. O método é a primeira vez que ele estrutura essa metodologia
              inteira em um único curso — sem reservar a "parte boa" para clientes privados.
            </p>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24,
              padding: "24px 0",
              borderTop: "1px solid var(--gold-line)",
              borderBottom: "1px solid var(--gold-line)",
              maxWidth: 520,
            }}>
              {mentorStats.map((s, i) => (
                <div key={i}>
                  <div className="f-display" style={{
                    fontSize: 32, color: "var(--gold-hover)", fontWeight: 800,
                    lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6,
                  }}>{s.num}</div>
                  <div style={{
                    fontSize: 11, color: "var(--text-2)",
                    letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEÇÃO 6 — CTA FINAL ============ */}
      <section className="page" style={{ padding: "112px 64px", background: "#080808", textAlign: "center" }}>
        <span className="badge-gold" style={{ marginBottom: 22, display: "inline-flex" }}>
          <IconStar size={10} /> Última chance — Edição 2026
        </span>
        <h2 className="f-display" style={{
          fontSize: 52, lineHeight: 1.05, margin: "0 auto 22px",
          letterSpacing: "-0.02em", maxWidth: 720,
        }}>
          A maleta está aberta. <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Por enquanto.</em>
        </h2>
        <p className="f-serif" style={{
          fontSize: 20, fontStyle: "italic", color: "var(--text-1)",
          margin: "0 auto 44px", lineHeight: 1.5, maxWidth: 640,
        }}>
          Você pode passar mais cinco anos cobrando o que cabe — ou começar hoje a estruturar
          uma carreira que vale o que ela realmente entrega.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PriceBox size="lg" />
        </div>

        {/* Garantia */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 16,
          marginTop: 44, padding: "16px 22px",
          border: "1px solid var(--border)",
          borderRadius: 6,
          background: "rgba(17,17,17,0.5)",
          maxWidth: 520,
          textAlign: "left",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            border: "2px solid var(--gold)",
            display: "grid", placeItems: "center",
            color: "var(--gold-hover)", flexShrink: 0,
          }}>
            <IconGuarantee size={26} />
          </div>
          <div>
            <div className="f-display" style={{ fontSize: 15, color: "var(--text-0)", marginBottom: 4 }}>
              ↩ Garantia incondicional de 7 dias
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>
              Se o curso não for tudo que você esperava, devolvemos 100% do investido. Sem perguntas.
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

window.ScreenCourseLanding = ScreenCourseLanding;
