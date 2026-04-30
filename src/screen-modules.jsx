// screen-modules.jsx — full listing of all modules (Módulos tab)

const ScreenModules = ({ onOpenModule, onOpenLesson }) => {
  const { MODULES } = window.MalData;
  const [filter, setFilter] = React.useState("all");

  // Aggregate stats
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons, 0);
  const completedLessons = MODULES.reduce((s, m) => s + Math.round((m.progress / 100) * m.lessons), 0);
  const totalMin = MODULES.reduce((s, m) => s + m.durationMin, 0);
  const totalH = Math.floor(totalMin / 60);
  const totalRem = totalMin % 60;
  const overallPct = Math.round((completedLessons / totalLessons) * 100);

  // Filter
  const visible = MODULES.filter(m => {
    if (filter === "all") return true;
    if (filter === "in-progress") return m.status === "current";
    if (filter === "done") return m.status === "done";
    if (filter === "not-started") return m.status === "locked" || (m.progress === 0 && m.status !== "done");
    return true;
  });

  return (
    <div className="fade-in" style={{ background: "#080808", minHeight: "100vh" }}>
      {/* ============ HEADER ============ */}
      <section className="page" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div className="f-badge" style={{
          color: "var(--gold)", marginBottom: 14,
          letterSpacing: "0.18em", fontSize: 11,
        }}>✦ Currículo Completo</div>

        <h1 className="f-display" style={{
          fontSize: 56, lineHeight: 1.05, fontWeight: 700, color: "#F5F0E8",
          letterSpacing: "-0.02em", margin: "0 0 14px",
        }}>
          Todos os Módulos
        </h1>
        <p style={{
          margin: "0 0 32px",
          fontFamily: "var(--f-sans)", fontSize: 14, color: "#6B6560",
          letterSpacing: "0.02em",
        }}>
          6 módulos · {totalLessons} aulas · {totalH}h {String(totalRem).padStart(2, "0")}min de conteúdo estratégico
        </p>

        {/* Overall progress */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: 10,
          }}>
            <span style={{
              fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)",
            }}>Progresso geral</span>
            <span style={{
              fontFamily: "var(--f-sans)", fontSize: 12, color: "#6B6560",
              letterSpacing: "0.06em",
            }}>{overallPct}% concluído — {completedLessons} de {totalLessons} aulas</span>
          </div>
          <div style={{
            width: "100%", height: 6, background: "rgba(255,255,255,0.06)",
            borderRadius: 3, overflow: "hidden",
            border: "1px solid rgba(201,160,80,0.1)",
          }}>
            <div style={{
              height: "100%", width: `${overallPct}%`,
              background: "linear-gradient(90deg, var(--gold-deep), var(--gold-hover))",
              boxShadow: "0 0 16px rgba(201,160,80,0.5)",
              transition: "width 600ms ease",
            }} />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{
        height: 1, background: "rgba(201,160,80,0.1)",
        margin: 0,
      }} />

      {/* ============ FILTER BAR ============ */}
      <section className="page" style={{ paddingTop: 28, paddingBottom: 24 }}>
        <div style={{ display: "flex", gap: 32, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 0 }}>
          {[
            { id: "all", label: "Todos" },
            { id: "in-progress", label: "Em andamento" },
            { id: "done", label: "Concluídos" },
            { id: "not-started", label: "Não iniciados" },
          ].map(f => {
            const isActive = filter === f.id;
            return (
              <button key={f.id} onClick={() => setFilter(f.id)}
                style={{
                  background: "none", border: "none",
                  padding: "10px 0 14px",
                  fontFamily: "var(--f-sans)",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: isActive ? "#F5F0E8" : "#6B6560",
                  cursor: "pointer",
                  position: "relative",
                  transition: "color 200ms ease",
                }}>
                {f.label}
                <span style={{
                  position: "absolute", left: 0, right: 0, bottom: -1,
                  height: 2,
                  background: isActive ? "var(--gold)" : "transparent",
                  transition: "background-color 200ms ease",
                }} />
              </button>
            );
          })}
          <span style={{
            marginLeft: "auto", alignSelf: "center",
            fontFamily: "var(--f-sans)", fontSize: 11, color: "#6B6560",
            letterSpacing: "0.14em", textTransform: "uppercase",
          }}>{visible.length} {visible.length === 1 ? "módulo" : "módulos"}</span>
        </div>
      </section>

      {/* ============ MODULES LIST ============ */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {visible.map((m, i) => (
            <ModuleListRow key={m.id} m={m} idx={i}
              bg={i % 2 === 0 ? "#080808" : "#0a0a0a"}
              onOpen={() => onOpenModule(m.id)}
              onContinue={() => onOpenLesson(m.id, 1)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="page" style={{
            padding: "80px 0", textAlign: "center",
            fontFamily: "var(--f-sans)", color: "#6B6560",
          }}>
            <div className="f-serif" style={{
              fontSize: 28, fontStyle: "italic", color: "var(--text-1)", marginBottom: 8,
            }}>Nenhum módulo encontrado</div>
            Tente outro filtro.
          </div>
        )}
      </section>
    </div>
  );
};

/* -------- One module row, 280px tall, full width -------- */
const ModuleListRow = ({ m, idx = 0, bg, onOpen, onContinue }) => {
  const [hover, setHover] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);
  const rowRef = React.useRef(null);

  // Scroll-reveal via IntersectionObserver
  React.useEffect(() => {
    if (!rowRef.current) return;
    const el = rowRef.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.2) {
          setRevealed(true);
          io.disconnect();
        }
      });
    }, { threshold: [0, 0.2, 0.4] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isLocked = m.status === "locked";
  const isDone = m.status === "done";
  const isCurrent = m.status === "current";
  const completedAulas = Math.round((m.progress / 100) * m.lessons);
  const currentAula = isCurrent ? completedAulas + 1 : 1;

  const lockedAfter = m.id === 5 ? "Disponível após concluir Módulo IV"
    : m.id === 6 ? "Disponível após concluir Módulo V"
    : "Complete o módulo anterior para desbloquear";

  // Photo cropping — Paulo's face is upper-right of the source.
  // For a 45%-wide letterboxed crop, anchor near top-right so face stays in frame.
  const objectPosition = "70% 28%";

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        height: 280,
        background: hover
          ? `radial-gradient(ellipse at 20% 50%, rgba(201,160,80,0.06) 0%, transparent 60%), #0d0d0d`
          : `radial-gradient(ellipse at 20% 50%, rgba(201,160,80,0.04) 0%, transparent 60%), ${bg}`,
        borderTop: "1px solid rgba(201,160,80,0.08)",
        transition: "background 400ms ease",
        overflow: "hidden",
        cursor: isLocked ? "default" : "pointer",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(30px)",
        transitionProperty: "background, opacity, transform",
        transitionDuration: "400ms, 700ms, 700ms",
        transitionTimingFunction: "ease, ease-out, ease-out",
        transitionDelay: `0ms, ${idx * 80}ms, ${idx * 80}ms`,
        filter: isLocked ? `grayscale(${hover ? 0.2 : 0.4}) brightness(${hover ? 0.75 : 0.6})` : "none",
      }}
      onClick={() => { if (!isLocked) onOpen(); }}
    >
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "45% 55%",
        alignItems: "stretch",
      }}>
        {/* LEFT — IMAGE */}
        <div style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid",
          borderColor: hover && !isLocked ? "rgba(201,160,80,0.6)" : "rgba(255,255,255,0.04)",
          transition: "border-color 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>
          <img src="assets/paulo-miguel.png" alt="Paulo Miguel"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition,
              filter: hover && !isLocked ? "brightness(1.1)" : "brightness(1)",
              transform: hover && !isLocked ? "scale(1.04)" : "scale(1)",
              transition: "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 400ms ease",
            }} />

          {/* Inner shadow on image edges — cinematic */}
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 60px rgba(0,0,0,0.7), inset 0 0 14px rgba(0,0,0,0.4)",
            pointerEvents: "none",
          }} />

          {/* Gold shimmer sweep */}
          <div className="mod-shimmer" style={{
            animationDelay: `${idx * 0.8}s`,
          }} />

          {/* Watermark numeral */}
          <div className="f-serif mod-numeral-reveal" style={{
            position: "absolute", inset: 0,
            display: "grid", placeItems: "center",
            fontSize: 180, lineHeight: 1,
            color: "rgba(201,160,80,0.14)",
            fontStyle: "italic", fontWeight: 600,
            letterSpacing: "-0.04em",
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            pointerEvents: "none",
            animationDelay: `${idx * 100}ms`,
          }}>{m.num}</div>

          {/* Right-edge fade into content */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent 50%, rgba(8,8,8,0.55) 78%, #080808 100%)",
            pointerEvents: "none",
          }} />

          {/* Top-left module badge */}
          <div className={isDone ? "mod-badge-glow" : ""} style={{
            position: "absolute", top: 24, left: 24,
            padding: "6px 12px",
            background: isLocked ? "rgba(40,38,34,0.85)" : "var(--gold)",
            color: isLocked ? "var(--text-2)" : "#0a0a0a",
            borderRadius: 999,
            fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: isLocked ? "none" : "0 4px 14px rgba(0,0,0,0.5)",
          }}>Módulo {m.num}</div>

          {/* Done — top-right corner badge */}
          {isDone && (
            <div className="mod-badge-glow" style={{
              position: "absolute", top: 22, right: 36,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px 6px 10px",
              background: "rgba(8,8,8,0.7)",
              border: "1px solid var(--gold)",
              borderRadius: 999,
              backdropFilter: "blur(8px)",
              fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--gold)",
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: "50%",
                background: "var(--gold)", color: "#0a0a0a",
                display: "grid", placeItems: "center",
              }}>
                <IconCheck size={9} />
              </span>
              Concluído
            </div>
          )}

          {/* Done gold vignette */}
          {isDone && (
            <div style={{
              position: "absolute", inset: 0,
              boxShadow: "inset 0 0 80px rgba(201,160,80,0.18)",
              pointerEvents: "none",
            }} />
          )}

          {/* Lock icon for locked rows */}
          {isLocked && (
            <div className="mod-lock-pulse" style={{
              position: "absolute", left: 24, bottom: 24,
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(8,8,8,0.7)",
              border: "1px solid rgba(201,160,80,0.4)",
              display: "grid", placeItems: "center",
              color: "var(--gold)",
              backdropFilter: "blur(8px)",
              transform: hover ? "scale(1.1)" : "scale(1)",
              transition: "transform 300ms ease",
            }}>
              <IconLock size={22} />
            </div>
          )}
        </div>

        {/* RIGHT — CONTENT */}
        <div style={{
          position: "relative",
          padding: "32px 40px 32px 24px",
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: 14,
          background: hover ? "rgba(201,160,80,0.06)" : "rgba(201,160,80,0.03)",
          transition: "background-color 400ms ease",
        }}>
          {/* Gold accent line — animates 0→100% on hover */}
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 3, background: "var(--gold)",
            transform: `scaleY(${hover && !isLocked ? 1 : 0})`,
            transformOrigin: "top",
            transition: "transform 400ms ease",
            boxShadow: hover && !isLocked ? "0 0 14px rgba(201,160,80,0.5)" : "none",
          }} />

          {/* Watermark numeral behind content — slides in on hover */}
          <div className="f-serif" aria-hidden="true" style={{
            position: "absolute",
            right: hover && !isLocked ? 24 : 4,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 200, lineHeight: 1,
            color: "rgba(201,160,80,0.05)",
            fontStyle: "italic", fontWeight: 600,
            letterSpacing: "-0.04em",
            opacity: hover && !isLocked ? 1 : 0,
            pointerEvents: "none",
            transition: "right 400ms ease, opacity 400ms ease",
            zIndex: 0,
          }}>{m.num}</div>

          {/* Identifier + title */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 6 }}>
              <span className="f-serif" style={{
                fontSize: 22, fontStyle: "italic", color: "var(--gold)",
                fontWeight: 500, lineHeight: 1,
              }}>{m.num} ·</span>
              <span style={{
                fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6560",
              }}>{m.short}</span>
            </div>
            <h3 className="f-display" style={{
              margin: 0,
              fontSize: 26, lineHeight: 1.2, fontWeight: 700,
              color: hover && !isLocked ? "#FFFFFF" : "#F5F0E8",
              letterSpacing: "-0.01em",
              textWrap: "pretty",
              transition: "color 300ms ease",
            }}>{m.title}</h3>
          </div>

          {/* Description */}
          <p style={{
            position: "relative", zIndex: 1,
            margin: 0,
            fontFamily: "var(--f-sans)", fontSize: 14, color: "#8A8070",
            lineHeight: 1.65, maxWidth: 620,
            display: "-webkit-box",
            WebkitLineClamp: hover && !isLocked ? 3 : 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
            transition: "color 300ms ease",
          }}>{m.desc}</p>

          {/* Topics */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
            {m.topics.map((t, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--f-sans)", fontSize: 12, color: "#8A8070",
                letterSpacing: "0.02em",
              }}>
                <span style={{ color: "var(--gold)", fontFamily: "var(--f-display)", fontSize: 14, lineHeight: 1 }}>→</span>
                {t}
              </span>
            ))}
          </div>

          {/* Stats + progress combined */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 22, marginTop: 2 }}>
            <span style={{
              fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6560",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              {m.lessons} Aulas
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold)" }} />
              {Math.floor(m.durationMin/60)}H {String(m.durationMin%60).padStart(2,"0")}MIN
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold)" }} />
              Certificado
            </span>
            <span style={{
              marginLeft: "auto",
              fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: isDone ? "var(--gold)" : isCurrent ? "var(--gold-hover)" : "#6B6560",
            }}>
              {isDone ? "100% Concluído" :
               isLocked ? "Bloqueado" :
               m.progress > 0 ? `${m.progress}% Concluído` :
               "Não iniciado"}
            </span>
          </div>

          {/* Progress bar */}
          {!isLocked && (
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                width: "100%", height: 4, background: "rgba(255,255,255,0.06)",
                borderRadius: 2, overflow: "hidden",
              }}>
                <div className={hover ? "mod-pulse-bar" : ""} style={{
                  height: "100%", width: `${m.progress}%`,
                  background: "linear-gradient(90deg, var(--gold-deep), var(--gold-hover))",
                  boxShadow: m.progress > 0 ? "0 0 10px rgba(201,160,80,0.4)" : "none",
                  transition: "width 600ms ease",
                }} />
              </div>
              <div style={{
                marginTop: 6,
                fontFamily: "var(--f-sans)", fontSize: 11, color: "#6B6560",
                letterSpacing: "0.04em",
              }}>
                {isDone
                  ? `Todas as ${m.lessons} aulas concluídas`
                  : m.progress > 0
                    ? `${completedAulas} de ${m.lessons} aulas concluídas`
                    : `${m.lessons} aulas · pronto para começar`}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            {isDone && (
              <>
                <button onClick={(e) => { e.stopPropagation(); onOpen(); }}
                  style={ctaGhostStyle(hover)}>
                  <IconCheck size={12} /> Módulo Concluído
                </button>
                <button onClick={(e) => { e.stopPropagation(); /* certificate */ }}
                  style={ctaGhostStyle(hover)}>
                  <IconDownload size={12} /> Certificado
                </button>
              </>
            )}

            {isCurrent && (
              <button onClick={(e) => { e.stopPropagation(); onContinue(); }}
                style={{
                  ...ctaFilledStyle(hover),
                  width: 240,
                }}>
                <span style={{ display: "inline-block", width: 0, height: 0,
                  borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
                  borderLeft: "7px solid currentColor" }} />
                Continuar — Aula {currentAula}
              </button>
            )}

            {!isDone && !isCurrent && !isLocked && (
              <button onClick={(e) => { e.stopPropagation(); onOpen(); }}
                style={ctaGhostStyle(hover)}>
                <span style={{ display: "inline-block", width: 0, height: 0,
                  borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
                  borderLeft: "7px solid currentColor" }} />
                Iniciar Módulo
              </button>
            )}

            {isLocked && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button disabled
                  style={{
                    height: 44, padding: "0 22px",
                    background: "rgba(255,255,255,0.03)",
                    color: "#4a4540",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 3,
                    fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    display: "inline-flex", alignItems: "center", gap: 10,
                    cursor: "not-allowed",
                  }}>
                  <IconLock size={11} /> Bloqueado
                </button>
                <span style={{
                  fontFamily: "var(--f-sans)", fontSize: 11, color: "#6B6560",
                  letterSpacing: "0.04em",
                }}>{lockedAfter}</span>
              </div>
            )}

            <span style={{ flex: 1 }} />

            {!isLocked && (
              <span style={{
                fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: hover ? "var(--gold)" : "#6B6560",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "color 200ms ease",
              }}>
                Ver detalhes <IconArrow size={11} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ctaFilledStyle = (hover) => ({
  height: 44, padding: "0 24px",
  background: "var(--gold)", color: "#0a0a0a",
  border: "none", borderRadius: 3,
  fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.16em", textTransform: "uppercase",
  cursor: "pointer",
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
  boxShadow: hover ? "0 10px 28px rgba(201,160,80,0.55), 0 0 0 1px rgba(201,160,80,0.4)" : "0 6px 18px rgba(201,160,80,0.3)",
  transition: "box-shadow 250ms ease, transform 200ms ease",
  transform: hover ? "translateY(-1px)" : "none",
});

const ctaGhostStyle = (hover) => ({
  height: 44, padding: "0 22px",
  background: hover ? "rgba(201,160,80,0.06)" : "transparent",
  color: "var(--gold)",
  border: "1px solid rgba(201,160,80,0.45)",
  borderRadius: 3,
  fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.16em", textTransform: "uppercase",
  cursor: "pointer",
  display: "inline-flex", alignItems: "center", gap: 10,
  transition: "all 200ms ease",
});
