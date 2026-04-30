// screen-player.jsx — lesson player with sidebar

const ScreenPlayer = ({ moduleId, lessonN, onNavigate, onOpenModule, onOpenLesson }) => {
  const { MODULES, LESSONS_M2 } = window.MalData;
  const m = MODULES.find(x => x.id === moduleId) || MODULES[1];
  const lessons = LESSONS_M2;
  const idx = Math.max(0, Math.min(lessons.length - 1, (lessonN || 4) - 1));
  const l = lessons[idx];
  const [tab, setTab] = React.useState("descricao");
  const [playing, setPlaying] = React.useState(false);
  const [scrub, setScrub] = React.useState(34); // %

  const goPrev = () => idx > 0 && onOpenLesson(moduleId, idx);
  const goNext = () => idx < lessons.length - 1 && onOpenLesson(moduleId, idx + 2);

  return (
    <div className="fade-in">
      <div className="page" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 40, padding: "32px 64px 56px" }}>

        {/* ============ LEFT — PLAYER ============ */}
        <div>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            <button onClick={() => onNavigate("home")} style={{ background: "none", border: 0, color: "var(--text-2)", cursor: "pointer", padding: 0, font: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>Maleta</button>
            <span style={{ color: "var(--text-3)" }}>/</span>
            <button onClick={() => onOpenModule(moduleId)} style={{ background: "none", border: 0, color: "var(--text-2)", cursor: "pointer", padding: 0, font: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>Módulo {m.num} — {m.short}</button>
            <span style={{ color: "var(--text-3)" }}>/</span>
            <span style={{ color: "var(--gold-hover)" }}>Aula {l.n}</span>
          </div>

          {/* Player */}
          <div style={{
            position: "relative", width: "100%", aspectRatio: "16/9",
            borderRadius: 6, overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#000",
            boxShadow: "var(--shadow-elev)",
          }}>
            <img src={window.officeImg(2)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0,
              background: "radial-gradient(60% 50% at 30% 50%, rgba(0,0,0,0.55), rgba(0,0,0,0.78))" }} />

            {/* Big play button overlay */}
            <button onClick={() => setPlaying(p => !p)}
              style={{
                position: "absolute", inset: 0,
                background: "transparent", border: 0, cursor: "pointer",
                display: "grid", placeItems: "center",
              }}>
              {!playing && (
                <div style={{
                  width: 88, height: 88, borderRadius: "50%",
                  background: "linear-gradient(180deg, var(--gold-hover), var(--gold))",
                  display: "grid", placeItems: "center",
                  color: "#1a1308",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(201,160,80,0.35)",
                }}>
                  <span style={{
                    width: 0, height: 0,
                    borderLeft: "24px solid #1a1308",
                    borderTop: "16px solid transparent",
                    borderBottom: "16px solid transparent",
                    marginLeft: 8,
                  }} />
                </div>
              )}
            </button>

            {/* Title overlay */}
            <div style={{
              position: "absolute", left: 32, top: 28, right: 100,
              pointerEvents: "none",
            }}>
              <div className="badge-gold" style={{ marginBottom: 14 }}>
                <IconStar size={9} /> Módulo {m.num} · Aula {l.n}
              </div>
              <div className="f-display" style={{
                fontSize: 32, lineHeight: 1.15, color: "var(--text-0)",
                letterSpacing: "-0.01em", maxWidth: 520,
                textShadow: "0 2px 20px rgba(0,0,0,0.7)",
              }}>{l.title}</div>
            </div>

            {/* Controls bar */}
            <div style={{
              position: "absolute", left: 0, right: 0, bottom: 0,
              padding: "14px 20px",
              background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
            }}>
              {/* Scrubber */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <div style={{ height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2, position: "relative", overflow: "visible" }}>
                  <div style={{ width: `${scrub}%`, height: "100%",
                    background: "linear-gradient(to right, var(--gold), var(--gold-hover))",
                    boxShadow: "0 0 10px rgba(201,160,80,0.5)",
                    borderRadius: 2 }} />
                  {/* Chapter markers */}
                  {[15, 32, 58, 78].map(p => (
                    <div key={p} style={{
                      position: "absolute", top: -2, left: `${p}%`,
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--gold)", border: "1.5px solid var(--bg-0)",
                      transform: "translateX(-4px)",
                    }} />
                  ))}
                  {/* Thumb */}
                  <div style={{
                    position: "absolute", top: -5, left: `${scrub}%`,
                    width: 14, height: 14, borderRadius: "50%",
                    background: "var(--gold-hover)",
                    border: "2px solid #1a1308",
                    transform: "translateX(-7px)",
                    boxShadow: "0 0 12px rgba(201,160,80,0.6)",
                  }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text-1)", fontSize: 12 }}>
                <button onClick={() => setPlaying(p => !p)}
                  style={{ background: "none", border: 0, color: "var(--text-0)", cursor: "pointer", padding: 4, display: "grid", placeItems: "center" }}>
                  {playing
                    ? <span style={{ display: "inline-flex", gap: 3 }}>
                        <span style={{ width: 4, height: 14, background: "currentColor" }} />
                        <span style={{ width: 4, height: 14, background: "currentColor" }} />
                      </span>
                    : <span className="icon-play" style={{ borderLeftWidth: 12, borderTopWidth: 8, borderBottomWidth: 8 }} />
                  }
                </button>
                <button style={{ background: "none", border: 0, color: "var(--text-1)", cursor: "pointer", padding: 4 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11a4 4 0 0 1 4-4h2l5-4v18l-5-4H7a4 4 0 0 1-4-4Z" />
                    <path d="M16 9a4 4 0 0 1 0 6" />
                  </svg>
                </button>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>08:54 / 26:12</span>
                <div style={{ flex: 1 }} />
                <span className="badge-outline" style={{ fontSize: 10 }}>1.0×</span>
                <span className="badge-outline" style={{ fontSize: 10 }}>HD</span>
                <button style={{ background: "none", border: 0, color: "var(--text-1)", cursor: "pointer", padding: 4 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Below player */}
          <div style={{ marginTop: 32 }}>
            <h1 className="f-display" style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 12px", letterSpacing: "-0.01em" }}>
              {l.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 18, color: "var(--text-2)", fontSize: 13, marginBottom: 24 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconClock size={13} /> {l.duration}</span>
              <span>·</span>
              <span>4 capítulos</span>
              <span>·</span>
              <span>Material complementar disponível</span>
            </div>

            {/* Tabs */}
            <div className="tabs">
              {[
                { id: "descricao", label: "Descrição" },
                { id: "materiais", label: "Materiais" },
                { id: "anotacoes", label: "Anotações" },
                { id: "duvidas", label: "Dúvidas" },
              ].map(t => (
                <button key={t.id} className={`tab ${tab === t.id ? "is-active" : ""}`} onClick={() => setTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "28px 0", minHeight: 220 }}>
              {tab === "descricao" && (
                <div className="fade-in">
                  <p className="f-serif" style={{ fontSize: 19, lineHeight: 1.5, color: "var(--text-1)", margin: "0 0 20px", fontStyle: "italic", maxWidth: 720 }}>
                    Toda marca pessoal forte é uma narrativa coerente. Nesta aula, Paulo destrincha o framework dos quatro arcos — origem, posição, prova e promessa — e como aplicá-los na sua comunicação sem soar performático ou ferir a ética da OAB.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-1)", margin: 0, maxWidth: 720 }}>
                    Você verá exemplos reais de advogados que reposicionaram suas bancas usando esse método e os erros mais comuns ao construir presença pública. Ao final, você terá um roteiro pronto para revisar sua bio, seu site e a forma como se apresenta em redes profissionais.
                  </p>
                  <div style={{ marginTop: 32 }}>
                    <span className="f-badge" style={{ color: "var(--text-2)" }}>Capítulos</span>
                    <div style={{ marginTop: 14, display: "grid", gap: 8, maxWidth: 720 }}>
                      {[
                        { t: "00:00", title: "O problema do advogado invisível" },
                        { t: "04:18", title: "Os quatro arcos da narrativa profissional" },
                        { t: "09:32", title: "Origem: contar sem se vitimizar" },
                        { t: "15:08", title: "Posição: o que você defende — e o que recusa" },
                        { t: "20:44", title: "Prova e promessa: ancorar autoridade" },
                      ].map((c, i) => (
                        <div key={i} style={{ display: "flex", gap: 16, padding: "10px 12px", borderRadius: 4,
                          background: i === 1 ? "rgba(201,160,80,0.06)" : "transparent",
                          border: i === 1 ? "1px solid var(--border)" : "1px solid transparent",
                          cursor: "pointer", fontSize: 14 }}>
                          <span style={{ color: "var(--gold-hover)", fontVariantNumeric: "tabular-nums", fontWeight: 600, width: 50 }}>{c.t}</span>
                          <span style={{ color: i === 1 ? "var(--text-0)" : "var(--text-1)" }}>{c.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "materiais" && (
                <div className="fade-in" style={{ display: "grid", gap: 10, maxWidth: 720 }}>
                  {window.MalData.MATERIALS.slice(0, 3).map((mat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", border: "1px solid var(--border)", borderRadius: 4, background: "var(--bg-1)" }}>
                      <span className="badge-gold">{mat.kind}</span>
                      <span style={{ flex: 1, fontSize: 14, color: "var(--text-0)" }}>{mat.title}</span>
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>{mat.size}</span>
                      <button className="btn btn-ghost btn-sm"><IconDownload size={11} /> Baixar</button>
                    </div>
                  ))}
                </div>
              )}

              {tab === "anotacoes" && (
                <div className="fade-in" style={{ maxWidth: 720 }}>
                  <textarea placeholder="Suas anotações desta aula aparecem aqui..."
                    style={{
                      width: "100%", minHeight: 180,
                      background: "var(--bg-1)", border: "1px solid var(--border)",
                      borderRadius: 4, padding: 18,
                      color: "var(--text-0)", fontFamily: "var(--f-serif)",
                      fontSize: 16, lineHeight: 1.5, fontStyle: "italic",
                      outline: "none", resize: "vertical",
                    }} />
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                    <button className="btn btn-gold btn-sm">Salvar Anotação</button>
                  </div>
                </div>
              )}

              {tab === "duvidas" && (
                <div className="fade-in" style={{ maxWidth: 720, color: "var(--text-2)", fontSize: 14, fontStyle: "italic", fontFamily: "var(--f-serif)" }}>
                  Nenhuma dúvida ainda. Seja o primeiro a perguntar — Paulo responde pessoalmente às quartas-feiras.
                </div>
              )}
            </div>

            {/* Mark complete + nav */}
            <div className="hairline" style={{ margin: "8px 0 24px" }} />
            <button className="btn btn-gold" style={{ width: "100%", height: 56, justifyContent: "center" }}>
              <IconCheck size={14} /> Marcar como Concluída
            </button>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
              <button className="btn btn-ghost" onClick={goPrev} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.4 : 1 }}>
                <IconArrow size={12} dir="left" /> Aula Anterior
              </button>
              <span style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                Aula <span style={{ color: "var(--gold-hover)" }}>{l.n}</span> de {lessons.length}
              </span>
              <button className="btn btn-gold" onClick={goNext} disabled={idx === lessons.length - 1} style={{ opacity: idx === lessons.length - 1 ? 0.4 : 1 }}>
                Próxima Aula <IconArrow size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ============ RIGHT — SIDEBAR ============ */}
        <aside style={{ position: "sticky", top: 88, alignSelf: "flex-start", maxHeight: "calc(100vh - 110px)", display: "flex", flexDirection: "column" }}>
          <div style={{
            background: "var(--bg-1)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            maxHeight: "calc(100vh - 110px)",
          }}>
            <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
              <div className="f-badge" style={{ color: "var(--text-2)", marginBottom: 6 }}>Conteúdo do Módulo</div>
              <div className="f-display" style={{ fontSize: 18, lineHeight: 1.25, color: "var(--text-0)" }}>
                {m.short}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                <span style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.08em" }}>3 de 8 concluídas</span>
                <span style={{ fontSize: 11, color: "var(--gold-hover)", fontWeight: 700 }}>{m.progress}%</span>
              </div>
              <div className="progress" style={{ marginTop: 8 }}><i style={{ width: `${m.progress}%` }} /></div>
            </div>

            <div style={{ overflowY: "auto", flex: 1 }}>
              {lessons.map((ll, i) => {
                const isActive = i === idx;
                return (
                  <div key={i} onClick={() => onOpenLesson(moduleId, ll.n)}
                    style={{
                      display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 12,
                      alignItems: "center",
                      padding: "14px 22px",
                      cursor: "pointer",
                      borderLeft: isActive ? "3px solid var(--gold)" : "3px solid transparent",
                      background: isActive ? "rgba(201,160,80,0.08)" : "transparent",
                      borderBottom: "1px solid rgba(201,160,80,0.06)",
                      transition: "background 180ms ease",
                    }}
                    onMouseEnter={e => !isActive && (e.currentTarget.style.background = "rgba(201,160,80,0.04)")}
                    onMouseLeave={e => !isActive && (e.currentTarget.style.background = "transparent")}
                  >
                    <div className="f-serif" style={{
                      fontSize: 16, fontStyle: "italic",
                      color: ll.status === "done" ? "var(--gold-deep)" : "var(--gold-hover)",
                      fontWeight: 600,
                    }}>{String(ll.n).padStart(2, "0")}</div>
                    <div>
                      <div style={{
                        fontSize: 13.5, lineHeight: 1.3, fontWeight: 500,
                        color: isActive ? "var(--text-0)" : "var(--text-1)",
                        opacity: ll.status === "done" ? 0.75 : 1,
                      }}>{ll.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 4, letterSpacing: "0.04em" }}>
                        {ll.duration}
                      </div>
                    </div>
                    <StatusIcon status={isActive ? "current" : ll.status} />
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

      </div>

      <MalFooter />
    </div>
  );
};

window.ScreenPlayer = ScreenPlayer;
