// screen-module.jsx — module detail page

const ScreenModule = ({ moduleId, onNavigate, onOpenLesson }) => {
  const { MODULES, LESSONS_M2, MATERIALS } = window.MalData;
  const m = MODULES.find(x => x.id === moduleId) || MODULES[1];
  const [tab, setTab] = React.useState("aulas");

  const lessons = LESSONS_M2; // simplified: same lesson list for any module

  return (
    <div className="fade-in">
      {/* ============ HERO ============ */}
      <section style={{
        position: "relative", height: 360,
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "#080808",
      }}>
        <MentorPortrait mode="bg" />
        <div style={{ position: "absolute", inset: 0,
          background: "linear-gradient(to right, var(--bg-0) 0%, rgba(8,8,8,0.85) 45%, rgba(8,8,8,0.55) 75%, rgba(8,8,8,0.4) 100%)" }} />
        {/* Giant module roman numeral */}
        <div className="f-serif" style={{
          position: "absolute", right: 80, top: -28,
          fontSize: 320, lineHeight: 1, fontStyle: "italic", fontWeight: 500,
          color: "rgba(201, 160, 80, 0.18)",
          letterSpacing: "-0.04em",
        }}>{m.num}</div>

        <div className="page" style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          maxWidth: 820,
        }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button onClick={() => onNavigate("home")}
              style={{ background: "none", border: 0, color: "var(--text-2)",
                cursor: "pointer", padding: 0, fontSize: 12, letterSpacing: "0.1em",
                textTransform: "uppercase", fontWeight: 600,
                fontFamily: "var(--f-sans)", display: "flex", alignItems: "center", gap: 6 }}>
              <IconArrow size={11} dir="left" /> Maleta
            </button>
            <span style={{ color: "var(--text-3)" }}>/</span>
            <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, color: "var(--gold-hover)" }}>
              Módulo {m.num}
            </span>
          </div>

          <h1 className="f-display" style={{
            fontSize: 44, lineHeight: 1.05, margin: "0 0 14px",
            letterSpacing: "-0.015em", maxWidth: 780,
          }}>
            {m.title}
          </h1>
          <p className="f-serif" style={{
            fontSize: 18, fontStyle: "italic", color: "var(--text-1)",
            margin: "0 0 28px", lineHeight: 1.45, maxWidth: 680,
          }}>
            {m.desc}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 28, color: "var(--text-1)", fontSize: 13, letterSpacing: "0.06em" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconStar size={10} /> {m.lessons} aulas
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconClock size={13} /> {Math.floor(m.durationMin/60)}h {m.durationMin%60}min
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconCertificate size={14} /> Certificado incluído
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button className="btn btn-gold btn-lg" onClick={() => onOpenLesson(m.id, 4)}>
              <span className="icon-play" />
              {m.progress > 0 ? `Continuar: Aula 4` : `Começar Módulo`}
            </button>
            <div style={{ flex: 1, maxWidth: 320 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Progresso</span>
                <span style={{ fontSize: 11, color: "var(--gold-hover)", fontWeight: 700 }}>{m.progress}%</span>
              </div>
              <div className="progress tall"><i style={{ width: `${m.progress}%` }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TABS ============ */}
      <div className="page" style={{ paddingTop: 40 }}>
        <div className="tabs">
          {[
            { id: "aulas", label: `Aulas · ${lessons.length}` },
            { id: "materiais", label: `Materiais · ${MATERIALS.length}` },
            { id: "sobre", label: "Sobre o módulo" },
          ].map(t => (
            <button key={t.id}
              className={`tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ============ TAB CONTENT ============ */}
        <div style={{ padding: "32px 0 96px" }}>
          {tab === "aulas" && (
            <div className="fade-in" style={{ display: "grid", gap: 4, maxWidth: 1100 }}>
              {lessons.map((l, i) => (
                <div key={i}
                  className={`lesson-row ${l.status === "current" ? "is-current" : ""} ${l.status === "done" ? "is-done" : ""}`}
                  onClick={() => onOpenLesson(m.id, l.n)}
                >
                  <div className="f-serif" style={{
                    fontSize: 28, color: l.status === "done" ? "var(--gold-deep)" : "var(--gold-hover)",
                    fontStyle: "italic", fontWeight: 500,
                  }}>
                    {String(l.n).padStart(2, "0")}
                  </div>
                  <div className="thumb" style={{ width: 132, height: 76, position: "relative" }}>
                    <img src={window.officeImg(i)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6))" }} />
                    <div className="f-display" style={{
                      position: "absolute", bottom: 4, right: 8,
                      fontSize: 32, lineHeight: 1,
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(201,160,80,0.55)",
                      fontWeight: 800,
                    }}>{l.n}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 15.5, fontWeight: 500, color: "var(--text-0)", marginBottom: 4, lineHeight: 1.3 }}>
                      {l.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.06em" }}>
                      <IconClock size={11} /> &nbsp;{l.duration}
                      {l.status === "current" && <span style={{ color: "var(--gold-hover)", marginLeft: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>· Em andamento</span>}
                      {l.status === "done" && <span style={{ color: "var(--success)", marginLeft: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>· Concluída</span>}
                    </div>
                  </div>
                  <div style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                    {l.status === "done" ? "Revisar" : l.status === "current" ? "Continuar" : "Iniciar"}
                  </div>
                  <StatusIcon status={l.status} />
                </div>
              ))}
            </div>
          )}

          {tab === "materiais" && (
            <div className="fade-in" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1100,
            }}>
              {MATERIALS.map((mat, i) => (
                <div key={i} style={{
                  display: "flex", gap: 20, padding: "24px 24px",
                  background: "var(--bg-1)",
                  border: "1px solid var(--border)", borderRadius: 6,
                  cursor: "pointer", transition: "all 200ms ease",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold-line)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                >
                  {/* File icon */}
                  <div style={{
                    width: 56, height: 70, position: "relative",
                    background: "linear-gradient(160deg, #2a2218, #14100a)",
                    border: "1px solid var(--gold-line)", borderRadius: 3,
                    display: "grid", placeItems: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ position: "absolute", top: 0, right: 0,
                      borderStyle: "solid", borderWidth: "0 14px 14px 0",
                      borderColor: "transparent var(--bg-0) transparent transparent" }} />
                    <span className="f-badge" style={{ fontSize: 9, color: "var(--gold-hover)" }}>{mat.kind}</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div className="f-display" style={{ fontSize: 17, lineHeight: 1.3, marginBottom: 6, color: "var(--text-0)" }}>{mat.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.04em" }}>{mat.pages} · {mat.size}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                      <button className="btn btn-ghost btn-sm">
                        <IconDownload size={12} /> Baixar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "sobre" && (
            <div className="fade-in" style={{ maxWidth: 760 }}>
              <h3 className="f-display" style={{ fontSize: 28, marginTop: 0, marginBottom: 18 }}>O que você vai dominar</h3>
              <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
                {m.topics.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: 16, lineHeight: 1.5, color: "var(--text-1)" }}>
                    <span style={{ color: "var(--gold)", marginTop: 4 }}><IconCheck size={14} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="hairline" style={{ margin: "40px 0" }} />
              <h3 className="f-display" style={{ fontSize: 24, margin: "0 0 16px" }}>Para quem é este módulo</h3>
              <p className="f-serif" style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.5, color: "var(--text-1)" }}>
                Advogados que já passaram do estágio inicial e querem deixar de competir por preço para começar a ser escolhidos por valor — independentemente da área de atuação.
              </p>
            </div>
          )}
        </div>
      </div>

      <MalFooter />
    </div>
  );
};

window.ScreenModule = ScreenModule;
