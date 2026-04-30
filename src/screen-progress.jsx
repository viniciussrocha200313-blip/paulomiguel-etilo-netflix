// screen-progress.jsx — my progress dashboard

const ScreenProgress = ({ onNavigate, onOpenModule }) => {
  const { MODULES } = window.MalData;

  const lessonsCompleted = 14;
  const lessonsTotal = 48;
  const modulesDone = MODULES.filter(m => m.status === "done").length;
  const studyTime = "6h 32min";

  return (
    <div className="fade-in">
      {/* Header */}
      <section style={{
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid var(--border)",
        padding: "56px 0 48px",
      }}>
        <AtmosphereBg tone="atmosphere" intensity={0.5} vignette={false} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.7), var(--bg-0))" }} />

        <div className="page" style={{ position: "relative", zIndex: 2 }}>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconBriefcase size={11} /> Minha Maleta
          </span>
          <h1 className="f-display" style={{ fontSize: 56, lineHeight: 1.05, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            Seu progresso, <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Dr. João</em>
          </h1>
          <p className="f-serif" style={{ fontSize: 20, fontStyle: "italic", color: "var(--text-1)", margin: 0, maxWidth: 600 }}>
            Acompanhamento da sua jornada na metodologia de Paulo Miguel.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="page" style={{ paddingTop: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          <StatCard
            label="Aulas Concluídas"
            value={`${lessonsCompleted}`}
            unit={`/ ${lessonsTotal}`}
            ring={Math.round(lessonsCompleted / lessonsTotal * 100)}
          />
          <StatCard
            label="Tempo de Estudo"
            value={studyTime}
            icon={<IconClock size={28} />}
            sub="esta semana: 1h 48min"
          />
          <StatCard
            label="Módulos Completos"
            value={`${modulesDone}`}
            unit={`/ ${MODULES.length}`}
            icon={<IconBriefcase size={28} />}
            sub="Próximo a concluir: Módulo II"
          />
          <StatCard
            label="Certificados"
            value="1"
            unit="disponível"
            icon={<IconCertificate size={28} />}
            sub="Módulo I — emitido"
          />
        </div>
      </section>

      {/* Modules grid */}
      <section className="page" style={{ paddingTop: 64 }}>
        <h2 className="section-label">Progresso por Módulo <IconStar /></h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {MODULES.map(m => (
            <div key={m.id}
              style={{
                position: "relative", overflow: "hidden",
                background: "var(--bg-1)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "26px 28px",
                cursor: "pointer",
                transition: "all 200ms ease",
                minHeight: 180,
              }}
              onClick={() => onOpenModule(m.id)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
            >
              {/* Subtle atmosphere on right */}
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 200, opacity: 0.25 }}>
                <AtmosphereBg tone={m.tone} vignette={false} intensity={0.5} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--bg-1), transparent 60%)" }} />
              </div>

              <div style={{ position: "relative", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center" }}>
                <div className="f-serif" style={{
                  fontSize: 64, lineHeight: 1, fontStyle: "italic", fontWeight: 500,
                  color: "var(--gold-hover)", width: 70, textAlign: "center",
                  letterSpacing: "-0.04em",
                }}>{m.num}</div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span className="f-badge" style={{ color: "var(--text-2)" }}>Módulo {m.num}</span>
                    <StatusBadge status={m.status} />
                  </div>
                  <div className="f-display" style={{ fontSize: 19, lineHeight: 1.25, marginBottom: 10, letterSpacing: "-0.005em" }}>
                    {m.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.06em", marginBottom: 14 }}>
                    {m.lessons} aulas · {Math.floor(m.durationMin/60)}h {m.durationMin%60}min
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div className="progress tall" style={{ flex: 1, maxWidth: 320 }}>
                      <i style={{ width: `${m.progress}%` }} />
                    </div>
                    <span style={{ fontSize: 12, color: m.progress > 0 ? "var(--gold-hover)" : "var(--text-3)", fontWeight: 700, minWidth: 36, textAlign: "right" }}>
                      {m.progress}%
                    </span>
                  </div>
                </div>

                <button className={m.status === "locked" ? "btn btn-ghost btn-sm" : "btn btn-gold btn-sm"}
                  style={{ alignSelf: "center" }} onClick={e => { e.stopPropagation(); onOpenModule(m.id); }}>
                  {m.status === "done" && <>Revisar <IconArrow size={11} /></>}
                  {m.status === "current" && <>Continuar <IconArrow size={11} /></>}
                  {m.status === "locked" && <><IconLock size={11} /> Bloqueado</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="page" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <h2 className="section-label">Certificados <IconStar /></h2>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
          {/* Available certificate */}
          <div style={{
            position: "relative",
            background: "var(--bg-1)",
            border: "1px solid var(--border-strong)",
            borderRadius: 6,
            padding: 32,
            display: "flex", gap: 32,
            boxShadow: "0 0 0 1px rgba(201,160,80,0.05) inset, var(--shadow-card)",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.25 }}>
              <AtmosphereBg tone="atmosphere-warm" vignette={false} intensity={0.5} />
            </div>
            {/* Certificate preview */}
            <div style={{
              position: "relative", width: 240, height: 170,
              background: "linear-gradient(160deg, #1a1410, #0a0805)",
              border: "1px solid var(--gold-line)",
              borderRadius: 4,
              padding: 18,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              {/* Corner ornament */}
              <div style={{ position: "absolute", top: 6, left: 6, right: 6, bottom: 6, border: "1px solid rgba(201,160,80,0.2)" }} />
              <div style={{ position: "relative", textAlign: "center" }}>
                <IconStar size={11} />
                <div className="f-display" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold-hover)", marginTop: 6 }}>Certificado</div>
              </div>
              <div style={{ position: "relative", textAlign: "center" }}>
                <div className="f-serif" style={{ fontSize: 13, fontStyle: "italic", color: "var(--text-1)" }}>Conferido a</div>
                <div className="f-display" style={{ fontSize: 16, color: "var(--text-0)", marginTop: 2 }}>Dr. João Castro</div>
              </div>
              <div style={{ position: "relative", textAlign: "center", fontSize: 9, color: "var(--text-2)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>
                Módulo I · Mentalidade Estratégica
              </div>
            </div>

            <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="badge-gold" style={{ alignSelf: "flex-start", marginBottom: 14 }}>Disponível</span>
              <div className="f-display" style={{ fontSize: 24, lineHeight: 1.2, marginBottom: 8 }}>
                Fundamentos da Mentalidade Estratégica
              </div>
              <div className="f-serif" style={{ fontSize: 16, fontStyle: "italic", color: "var(--text-2)", marginBottom: 20 }}>
                Concluído em 14 de abril de 2026
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-gold btn-sm">
                  <IconDownload size={12} /> Baixar Certificado
                </button>
                <button className="btn btn-ghost btn-sm">
                  Compartilhar
                </button>
              </div>
            </div>
          </div>

          {/* Locked certificates */}
          <div style={{
            background: "var(--bg-1)",
            border: "1px dashed var(--border)",
            borderRadius: 6,
            padding: 32,
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text-2)", marginBottom: 14 }}>
              <IconLock size={14} />
              <span className="f-badge">5 Certificados Restantes</span>
            </div>
            <p className="f-serif" style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.5, color: "var(--text-1)", margin: "0 0 16px" }}>
              Conclua todos os módulos para emitir o certificado mestre — "Estrategista Jurídico Maleta do Advogado", assinado por Paulo Miguel.
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {MODULES.slice(1).map(m => (
                <span key={m.id} style={{
                  padding: "4px 10px", borderRadius: 2,
                  border: "1px solid var(--border)",
                  fontSize: 10.5, color: m.progress > 0 ? "var(--gold-hover)" : "var(--text-2)",
                  letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
                }}>{m.num} {m.progress > 0 ? `· ${m.progress}%` : ""}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MalFooter />
    </div>
  );
};

const StatCard = ({ label, value, unit, ring, icon, sub }) => (
  <div style={{
    background: "var(--bg-1)",
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "24px 24px 22px",
    display: "flex", flexDirection: "column", gap: 14,
    minHeight: 168,
    position: "relative", overflow: "hidden",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <span className="f-badge" style={{ color: "var(--text-2)" }}>{label}</span>
      {ring != null
        ? <ProgressRing value={ring} size={48} stroke={3} label={`${ring}%`} />
        : <span style={{ color: "var(--gold)", opacity: 0.6 }}>{icon}</span>
      }
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <div className="f-display" style={{ fontSize: 44, lineHeight: 1, color: "var(--gold-hover)", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 14, color: "var(--text-2)", fontWeight: 500 }}>{unit}</div>
    </div>
    {sub && <div style={{ fontSize: 12, color: "var(--text-2)", letterSpacing: "0.04em" }}>{sub}</div>}
  </div>
);

const StatusBadge = ({ status }) => {
  if (status === "done") return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--success)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}><IconCheck size={11} /> Concluído</span>;
  if (status === "current") return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--gold-hover)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>● Em andamento</span>;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}><IconLock size={10} /> Não iniciado</span>;
};

window.ScreenProgress = ScreenProgress;
