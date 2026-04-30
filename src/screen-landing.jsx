// screen-landing.jsx — public sales page

const ScreenLanding = ({ onNavigate }) => {
  const { MODULES, TESTIMONIALS } = window.MalData;

  return (
    <div className="fade-in">

      {/* ============ HERO ============ */}
      <section style={{
        position: "relative", minHeight: "calc(100vh - 64px)",
        overflow: "hidden", borderBottom: "1px solid var(--border)",
        background: "#080808",
      }}>
        <MentorPortrait side="right" mode="full" scale={1.05} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 140,
          background: "linear-gradient(to bottom, transparent, var(--bg-0))" }} />

        <div className="page" style={{ position: "relative", zIndex: 2, paddingTop: 80, paddingBottom: 80, maxWidth: 720 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <span className="badge-gold"><IconStar size={10} /> Acesso Exclusivo</span>
            <span className="badge-outline">Edição 2026 · Vagas limitadas</span>
          </div>

          <h1 className="f-display" style={{
            fontSize: 60, lineHeight: 1.05, margin: "0 0 26px",
            letterSpacing: "-0.025em", maxWidth: 600,
          }}>
            A <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Maleta</em> que faltava<br/>na sua carreira jurídica.
          </h1>

          <p className="f-serif" style={{
            fontSize: 21, lineHeight: 1.4, fontStyle: "italic",
            color: "var(--text-1)", margin: "0 0 44px", maxWidth: 540,
          }}>
            Seis módulos estratégicos com tudo que Paulo Miguel usa para estruturar carreiras de alto valor — sem fórmulas mágicas, sem teoria vazia.
          </p>

          {/* Price block */}
          <div style={{
            display: "inline-flex", flexDirection: "column",
            padding: "24px 30px",
            background: "rgba(17, 17, 17, 0.6)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            marginBottom: 28,
            backdropFilter: "blur(8px)",
            minWidth: 480,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "nowrap", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 13, textDecoration: "line-through", color: "var(--text-3)", letterSpacing: "0.04em", flexShrink: 0 }}>De R$ 1.997</span>
              <span className="badge-solid" style={{ fontSize: 9, flexShrink: 0 }}>−75% Lançamento</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6, whiteSpace: "nowrap" }}>
              <span className="f-display" style={{ fontSize: 56, lineHeight: 1, color: "var(--gold-hover)", letterSpacing: "-0.03em", fontWeight: 800, flexShrink: 0 }}>
                R$&nbsp;497
              </span>
              <span style={{ fontSize: 13, color: "var(--text-1)", flexShrink: 0 }}>à vista</span>
            </div>
            <span style={{ fontSize: 12, color: "var(--text-2)", marginTop: 6, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
              ou 12× de R$ 49,70 · acesso vitalício
            </span>
          </div>

          <div>
            <button className="btn btn-gold btn-lg glow-gold" style={{ height: 64, padding: "0 36px", fontSize: 13 }}
              onClick={() => onNavigate("home")}>
              Quero minha Maleta agora <IconArrow size={14} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 32, marginTop: 28, color: "var(--text-2)", fontSize: 12.5, letterSpacing: "0.04em" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconGuarantee size={14} /> Pagamento Seguro
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconStar size={11} /> Acesso Imediato
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconArrow size={11} dir="left" /> 7 dias de garantia
            </span>
          </div>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE ============ */}
      <section className="page" style={{ padding: "96px 64px" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> O que está na maleta
          </span>
          <h2 className="f-display" style={{ fontSize: 52, lineHeight: 1.05, margin: "0 0 18px", letterSpacing: "-0.02em" }}>
            Tudo que você precisa <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>está aqui dentro.</em>
          </h2>
          <p className="f-serif" style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.45, color: "var(--text-1)", margin: 0 }}>
            Seis módulos sequenciais. 48 aulas. 18h 30min de conteúdo prático — direto ao ponto, sem enrolação.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MODULES.map(m => (
            <div key={m.id} style={{
              position: "relative", overflow: "hidden",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "28px 28px 24px",
              minHeight: 280,
              display: "flex", flexDirection: "column",
              transition: "all 220ms ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, opacity: 0.18 }}>
                <AtmosphereBg tone={m.tone} vignette={false} intensity={0.6} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, transparent, var(--bg-1) 70%)" }} />
              </div>

              <div className="f-serif" style={{
                fontSize: 64, lineHeight: 1, fontStyle: "italic", fontWeight: 500,
                color: "var(--gold-hover)", letterSpacing: "-0.04em",
                marginBottom: 14,
              }}>{m.num}</div>

              <div className="f-display" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.005em" }}>
                {m.title}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 8, flex: 1 }}>
                {m.topics.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "var(--text-1)", lineHeight: 1.4 }}>
                    <span style={{ color: "var(--gold)", marginTop: 4, flexShrink: 0 }}><IconCheck size={11} /></span>
                    {t}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                <span className="badge-outline">{m.lessons} aulas</span>
                <span style={{ fontSize: 12, color: "var(--text-2)" }}>{Math.floor(m.durationMin/60)}h {m.durationMin%60}min</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ MENTOR ============ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "#080808" }}>
        <MentorPortrait side="left" mode="full" />

        <div className="page" style={{ position: "relative", zIndex: 2, padding: "96px 64px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64 }}>
          <div />
          <div>
            <span className="badge-gold" style={{ marginBottom: 22, display: "inline-flex" }}><IconStar size={10} /> Quem é o mentor</span>
            <h2 className="f-display" style={{ fontSize: 56, lineHeight: 1.05, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
              Paulo <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Miguel</em>
            </h2>
            <p className="f-serif" style={{ fontSize: 22, fontStyle: "italic", color: "var(--text-1)", margin: "0 0 32px" }}>
              Estrategista Jurídico <span style={{ color: "var(--gold)" }}>·</span> Alta Performance
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-1)", margin: "0 0 24px", maxWidth: 540 }}>
              Por mais de uma década, Paulo trabalhou nos bastidores de bancas que faturam de seis a sete dígitos mensais. A Maleta é a primeira vez que ele estrutura essa metodologia inteira em um único lugar — sem reservar a "parte boa" para clientes privados.
            </p>
            <p className="f-serif" style={{ fontSize: 17, fontStyle: "italic", color: "var(--gold-hover)", margin: 0, maxWidth: 540, lineHeight: 1.5 }}>
              "Não ensino o que funciona em teoria. Ensino exatamente o que aplico — porque eu mesmo construí a banca antes de ensinar a construí-la."
            </p>
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="page" style={{ padding: "96px 64px" }}>
        <div style={{ display: "flex", gap: 56, marginBottom: 64, padding: "32px 0", borderTop: "1px solid var(--gold-line)", borderBottom: "1px solid var(--gold-line)" }}>
          {[
            { num: "2.400+", label: "Advogados" },
            { num: "4.9★", label: "Avaliação média" },
            { num: "98%", label: "Recomendam" },
            { num: "R$ 50M+", label: "Estruturados em honorários" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div className="f-display" style={{ fontSize: 38, color: "var(--gold-hover)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-2)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="section-label">Quem já está na maleta <IconStar /></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              position: "relative",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "32px 28px 26px",
              display: "flex", flexDirection: "column",
              minHeight: 280,
            }}>
              <div className="f-display" style={{
                fontSize: 72, lineHeight: 0.6, color: "var(--gold)",
                marginBottom: 8, fontStyle: "italic", fontWeight: 700,
              }}>"</div>
              <p className="f-serif" style={{ fontSize: 17, lineHeight: 1.5, fontStyle: "italic", color: "var(--text-1)", margin: "0 0 24px", flex: 1 }}>
                {t.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--border)" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, #2a2218, #14100a)",
                  border: "1px solid var(--gold-line)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--f-display)", fontSize: 16, color: "var(--gold-hover)",
                }}>{t.name.split(" ").slice(-2).map(s => s[0]).join("")}</div>
                <div>
                  <div className="f-display" style={{ fontSize: 14, color: "var(--text-0)" }}>{t.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-2)", letterSpacing: "0.06em" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)", background: "#080808" }}>
        <MentorPortrait side="right" mode="full" />

        <div className="page" style={{ position: "relative", zIndex: 2, padding: "112px 64px", maxWidth: 720 }}>
          <span className="badge-gold" style={{ marginBottom: 22, display: "inline-flex" }}>
            <IconStar size={10} /> Última chance — Edição 2026
          </span>
          <h2 className="f-display" style={{ fontSize: 52, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: "-0.02em", maxWidth: 560 }}>
            A maleta está aberta. <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Por enquanto.</em>
          </h2>
          <p className="f-serif" style={{ fontSize: 20, fontStyle: "italic", color: "var(--text-1)", margin: "0 0 40px", lineHeight: 1.5 }}>
            Você pode passar mais cinco anos cobrando o que cabe — ou começar hoje a estruturar uma carreira que vale o que ela realmente entrega.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 28 }}>
            <span className="f-display" style={{ fontSize: 56, lineHeight: 1, color: "var(--gold-hover)", letterSpacing: "-0.03em", fontWeight: 800 }}>R$ 497</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13, textDecoration: "line-through", color: "var(--text-3)" }}>De R$ 1.997</span>
              <span style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.06em" }}>pagamento único · vitalício</span>
            </div>
          </div>

          <button className="btn btn-gold btn-lg glow-gold" style={{ height: 64, padding: "0 36px", fontSize: 13 }} onClick={() => onNavigate("home")}>
            Quero minha Maleta agora <IconArrow size={14} />
          </button>

          {/* Guarantee seal */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, padding: "16px 22px", border: "1px solid var(--border)", borderRadius: 6, background: "rgba(17,17,17,0.5)", maxWidth: 480 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "2px solid var(--gold)",
              display: "grid", placeItems: "center",
              color: "var(--gold-hover)", flexShrink: 0,
            }}>
              <IconGuarantee size={26} />
            </div>
            <div>
              <div className="f-display" style={{ fontSize: 15, color: "var(--text-0)", marginBottom: 4 }}>Garantia incondicional de 7 dias</div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                Se a Maleta não for tudo que você esperava, devolvemos 100% do investido. Sem perguntas.
              </div>
            </div>
          </div>
        </div>
      </section>

      <MalFooter />
    </div>
  );
};

window.ScreenLanding = ScreenLanding;
