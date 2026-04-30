// screen-home.jsx — post-login dashboard

const ScreenHome = ({ onNavigate, onOpenModule, onOpenLesson }) => {
  const { MODULES, CONTINUE, MATERIALS, STATS } = window.MalData;

  return (
    <div className="fade-in">

      {/* ============ HERO ============ */}
      <section style={{
        position: "relative",
        height: 580,
        marginBottom: 56,
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
        background: "#080808",
      }}>
        <MentorPortrait side="right" mode="full" />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 120,
          background: "linear-gradient(to bottom, transparent, var(--bg-0))",
        }} />

        <div className="page" style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          maxWidth: 680, paddingTop: 32,
        }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <span className="badge-gold"><IconStar size={10} /> Acesso Vitalício</span>
            <span className="badge-outline">Edição 2026</span>
          </div>

          <h1 className="f-display" style={{
            fontSize: 64, lineHeight: 1.04, margin: "0 0 20px",
            color: "var(--text-0)", letterSpacing: "-0.02em",
            maxWidth: 560,
          }}>
            Bem-vindo à <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>sua Maleta</em>,<br/>
            Dr. João.
          </h1>

          <p className="f-serif" style={{
            fontSize: 22, lineHeight: 1.4, color: "var(--text-1)",
            margin: "0 0 36px", maxWidth: 560, fontStyle: "italic",
          }}>
            Seis módulos estratégicos com tudo que Paulo Miguel usa para estruturar carreiras jurídicas de alto valor.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn-gold btn-lg" onClick={() => onOpenLesson(2, 4)}>
              <span className="icon-play" />
              Continuar Assistindo
            </button>
            <button className="btn btn-ghost btn-lg">
              <IconPlus size={12} /> Adicionar à Lista
            </button>
            <div style={{ marginLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="f-badge" style={{ color: "var(--text-2)" }}>Próxima aula</span>
              <span style={{ fontSize: 13, color: "var(--text-1)" }}>
                Módulo II · Aula 4 — <em className="f-serif" style={{ color: "var(--gold-hover)" }}>"Construindo a narrativa profissional"</em>
              </span>
            </div>
          </div>
        </div>

        {/* Decorative lower meta strip */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 28,
          zIndex: 2,
        }}>
          <div className="page" style={{ display: "flex", gap: 40, color: "var(--text-2)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
            <span><IconStar size={9} /> &nbsp; 6 Módulos</span>
            <span><IconStar size={9} /> &nbsp; 48 Aulas</span>
            <span><IconStar size={9} /> &nbsp; 18h 30min de conteúdo</span>
            <span><IconStar size={9} /> &nbsp; Certificado incluído</span>
            <span style={{ marginLeft: "auto", color: "var(--gold-hover)" }}>29% concluído ⟶</span>
          </div>
        </div>
      </section>

      {/* ============ CONTINUE WATCHING — 3D perspective carousel ============ */}
      <ContinueCarousel
        items={CONTINUE}
        onOpenLesson={onOpenLesson}
      />

      {/* ============ MODULES — 3D portrait carousel (full-bleed) ============ */}
      <ModulesCarousel modules={MODULES} onOpenModule={onOpenModule} />


      {/* ============ MATERIALS ============ */}
      <section className="page" style={{ marginBottom: 80 }}>
        <h2 className="section-label">Guias e Materiais <IconStar /></h2>
        <div className="row-scroll">
          {MATERIALS.map((m, i) => <MaterialCard key={i} mat={m} />)}
          <div style={{ minWidth: 40 }} />
        </div>
      </section>

      {/* ============ MAIS CURSOS DO MENTOR ============ */}
      <MoreCoursesCarousel />

      <Footer />
    </div>
  );
};

/* Wrapper for Continue carousel cards — adds tilt + overlay only on center card.
   Composes tilt with the carousel transform set by parent. */
const ContinueTiltCard = ({ isCenter, style, onClick, children }) => {
  const ref = React.useRef(null);
  const baseTransformRef = React.useRef(style.transform);
  const rafRef = React.useRef(0);
  const isHoveringRef = React.useRef(false);

  React.useLayoutEffect(() => {
    baseTransformRef.current = style.transform;
    const el = ref.current;
    // Don't clobber tilt while hovering
    if (el && !isHoveringRef.current) el.style.transform = style.transform;
  }, [style.transform]);

  React.useEffect(() => {
    if (!isCenter) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -10;
        const ry = ((x - cx) / cx) * 10;
        el.style.transition = "transform 80ms ease, box-shadow 400ms ease, border-color 400ms ease";
        el.style.transform =
          `${baseTransformRef.current} perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.04,1.04,1.04)`;

        const glare = el.querySelector(".tilt-glare");
        if (glare) {
          const gx = (x / rect.width) * 100;
          const gy = (y / rect.height) * 100;
          glare.style.background =
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(201,160,80,0.22) 0%, rgba(201,160,80,0.06) 35%, transparent 60%)`;
          glare.style.opacity = "1";
        }
        el.querySelectorAll(".tilt-glow").forEach((g) => { g.style.opacity = "1"; });
        el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "1"; });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafRef.current);
      isHoveringRef.current = false;
      el.style.transition = "transform 500ms cubic-bezier(0.23,1,0.32,1), box-shadow 400ms ease, border-color 400ms ease";
      el.style.transform = baseTransformRef.current;
      el.querySelectorAll(".tilt-glare, .tilt-glow").forEach((g) => { g.style.opacity = "0"; });
      el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "0"; });
    };
    const onEnter = () => {
      isHoveringRef.current = true;
      el.style.transition = "transform 80ms ease";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(rafRef.current);
      isHoveringRef.current = false;
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [isCenter]);

  // Strip transform from inline style — useEffect manages it imperatively.
  const { transform: _t, ...styleWithoutTransform } = style;
  return (
    <div ref={ref} onClick={onClick} style={{ ...styleWithoutTransform, willChange: "transform" }}>
      {isCenter && <window.TiltOverlay scanLine={false} corners={false} cyber={false} />}
      {children}
    </div>
  );
};

/* -------- Continue Watching CAROUSEL — 3D perspective, finchflix-style -------- */
const ContinueCarousel = ({ items, onOpenLesson }) => {
  const [active, setActive] = React.useState(0);
  const N = items.length;
  const wrap = (i) => ((i % N) + N) % N;
  const moduleToId = (m) => (m === "I" ? 1 : m === "II" ? 2 : m === "III" ? 3 : m === "IV" ? 4 : m === "V" ? 5 : 6);

  const go = (dir) => setActive((a) => wrap(a + dir));

  // For each item compute its "offset" relative to active: -2,-1,0,1,2
  const slotFor = (i) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  const styleFor = (offset) => {
    // -2 / 2 = far side, -1/1 = side, 0 = center
    const abs = Math.abs(offset);
    if (offset === 0) {
      return { tx: 0, rot: 0, scale: 1, op: 1, z: 5, blur: 0 };
    }
    if (abs === 1) {
      return { tx: offset * 280, rot: -offset * 25, scale: 0.7, op: 0.6, z: 3, blur: 1 };
    }
    if (abs === 2) {
      return { tx: offset * 460, rot: -offset * 32, scale: 0.4, op: 0.25, z: 1, blur: 2 };
    }
    return { tx: offset * 700, rot: -offset * 40, scale: 0.3, op: 0, z: 0, blur: 4 };
  };

  const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const activeItem = items[active];
  const activeMid = moduleToId(activeItem.module);

  return (
    <section className="page" style={{ marginBottom: 56 }}>
      <h2 className="section-label">Continue de onde parou <IconStar /></h2>

      {/* Stage */}
      <div style={{
        position: "relative",
        height: 320,
        perspective: "1000px",
        margin: "20px 0 8px",
      }}>
        {/* Left arrow */}
        <button onClick={() => go(-1)} aria-label="Anterior"
          style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(8,8,8,0.8)",
            border: "1px solid rgba(201,160,80,0.3)",
            color: "var(--gold-hover)",
            display: "grid", placeItems: "center",
            cursor: "pointer", zIndex: 20,
            transition: "all 200ms ease",
            backdropFilter: "blur(8px)",
            fontFamily: "var(--f-display)", fontSize: 26, fontWeight: 600, lineHeight: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(201,160,80,0.15)";
            e.currentTarget.style.borderColor = "rgba(201,160,80,0.8)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(8,8,8,0.8)";
            e.currentTarget.style.borderColor = "rgba(201,160,80,0.3)";
          }}>‹</button>

        {/* Right arrow */}
        <button onClick={() => go(1)} aria-label="Próxima"
          style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(8,8,8,0.8)",
            border: "1px solid rgba(201,160,80,0.3)",
            color: "var(--gold-hover)",
            display: "grid", placeItems: "center",
            cursor: "pointer", zIndex: 20,
            transition: "all 200ms ease",
            backdropFilter: "blur(8px)",
            fontFamily: "var(--f-display)", fontSize: 26, fontWeight: 600, lineHeight: 1,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(201,160,80,0.15)";
            e.currentTarget.style.borderColor = "rgba(201,160,80,0.8)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(8,8,8,0.8)";
            e.currentTarget.style.borderColor = "rgba(201,160,80,0.3)";
          }}>›</button>

        {/* Cards */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transformStyle: "preserve-3d",
          overflow: "hidden",
        }}>
          {items.map((it, i) => {
            const offset = slotFor(i);
            const s = styleFor(offset);
            const isCenter = offset === 0;
            const mid = moduleToId(it.module);
            return (
              <ContinueTiltCard key={i}
                isCenter={isCenter}
                style={{
                  position: "absolute",
                  width: 420, height: 236,
                  borderRadius: 6, overflow: "hidden",
                  border: isCenter ? "1px solid rgba(201,160,80,0.5)" : "1px solid rgba(201,160,80,0.2)",
                  background: "#0a0a0a",
                  boxShadow: isCenter
                    ? "0 32px 80px rgba(0,0,0,0.8)"
                    : "0 16px 40px rgba(0,0,0,0.5)",
                  transform: `translateX(${s.tx}px) rotateY(${s.rot}deg) scale(${s.scale})`,
                  opacity: s.op,
                  zIndex: s.z,
                  transition: `transform 400ms ${ease}, opacity 400ms ${ease}, box-shadow 400ms ${ease}, border-color 400ms ${ease}`,
                  cursor: "pointer",
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (isCenter) onOpenLesson(mid, it.lessonN);
                  else setActive(i);
                }}
              >
                {/* Bg image */}
                <img src={window.officeImg(i)} alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {/* Bottom gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)",
                }} />
                {/* Module pill top-left */}
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  padding: "5px 11px",
                  background: "var(--gold)",
                  color: "#0a0a0a",
                  borderRadius: 999,
                  fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                }}>Módulo {it.module}</div>

                {/* Watermark lesson number */}
                <div className="f-serif" style={{
                  position: "absolute", inset: 0,
                  display: "grid", placeItems: "center",
                  fontSize: 96, lineHeight: 1,
                  color: "rgba(201,160,80,0.25)",
                  fontStyle: "italic", fontWeight: 600,
                  letterSpacing: "-0.04em",
                  pointerEvents: "none",
                }}>{it.lessonN}</div>

                {/* Title (small, only on side cards) */}
                {!isCenter && (
                  <div style={{
                    position: "absolute", left: 14, right: 14, bottom: 14,
                    fontFamily: "var(--f-display)", fontSize: 14, lineHeight: 1.25,
                    color: "var(--text-0)", fontWeight: 600,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{it.title}</div>
                )}

                {/* Gold progress bar */}
                <div style={{
                  position: "absolute", left: 0, right: 0, bottom: 0,
                  height: 4, background: "rgba(0,0,0,0.5)",
                }}>
                  <div style={{
                    height: "100%", width: `${it.progress}%`,
                    background: "linear-gradient(90deg, var(--gold-deep), var(--gold-hover))",
                    boxShadow: "0 0 12px rgba(201,160,80,0.5)",
                  }} />
                </div>
              </ContinueTiltCard>
            );
          })}
        </div>
      </div>

      {/* Below center card: title + meta + CTA */}
      <div style={{
        textAlign: "center", marginTop: 4, marginBottom: 18,
        minHeight: 130,
      }}>
        <div className="f-display" style={{
          fontSize: 18, fontWeight: 700, color: "#F5F0E8",
          letterSpacing: "-0.005em", marginBottom: 8,
          maxWidth: 560, margin: "0 auto 8px",
        }}>{activeItem.title}</div>
        <div style={{
          fontFamily: "var(--f-sans)", fontSize: 12, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6560",
          marginBottom: 18,
        }}>{activeItem.at}</div>
        <button onClick={() => onOpenLesson(activeMid, activeItem.lessonN)}
          style={{
            height: 44, width: 260,
            background: "var(--gold)", color: "#0a0a0a",
            border: "none", borderRadius: 3,
            fontFamily: "var(--f-sans)", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 8px 24px rgba(201,160,80,0.35)",
            transition: "transform 180ms ease, box-shadow 180ms ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(201,160,80,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,160,80,0.35)"; }}>
          <span style={{ display: "inline-block", width: 0, height: 0,
            borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
            borderLeft: "8px solid currentColor" }} />
          Continuar assistindo
        </button>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 4 }}>
        {items.map((_, i) => {
          const isActive = i === active;
          return (
            <button key={i} onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: 4, width: isActive ? 24 : 8,
                background: isActive ? "var(--gold)" : "rgba(201,160,80,0.3)",
                border: "none", borderRadius: 2,
                cursor: "pointer", padding: 0,
                transition: `width 400ms ${ease}, background-color 200ms ease`,
              }} />
          );
        })}
      </div>
    </section>
  );
};

/* -------- Continue Watching card -------- */
const ContinueCard = ({ item, onClick, idx = 0 }) => (
  <div className="lesson-card" onClick={onClick}
    style={{
      minWidth: 320, width: 320, cursor: "pointer",
      transition: "transform 200ms ease",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "none"}
  >
    <div className="thumb" style={{ height: 180, position: "relative" }}>
      <img src={window.officeImg(idx)} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85))" }} />
      <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
        <span className="badge-solid">Módulo {item.module}</span>
      </div>
      {/* Big lesson number — nod to Tubelix */}
      <div className="f-display" style={{
        position: "absolute", right: 12, top: 8,
        fontSize: 96, lineHeight: 1, color: "transparent",
        WebkitTextStroke: "1px rgba(201,160,80,0.5)",
        fontWeight: 800,
      }}>{item.lessonN}</div>
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
        <div className="progress" style={{ marginBottom: 10 }}>
          <i style={{ width: `${item.progress}%` }} />
        </div>
      </div>
      <div className="play-fab"><div><span className="icon-play" /></div></div>
    </div>
    <div style={{ padding: "14px 4px 4px" }}>
      <div className="f-serif" style={{ fontSize: 16, lineHeight: 1.3, color: "var(--text-0)", marginBottom: 6, fontWeight: 600 }}>
        {item.title}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--text-2)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
        {item.at}
      </div>
    </div>
  </div>
);

/* -------- MODULES CAROUSEL — 3D portrait, finchflix style -------- */
const ModulesCarousel = ({ modules, onOpenModule }) => {
  const [active, setActive] = React.useState(1); // start on II (in-progress)
  const N = modules.length;
  const wrap = (i) => ((i % N) + N) % N;
  const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

  // Compute -3..3 offset wrap-around
  const slotFor = (i) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  // Slot styles
  const styleFor = (offset) => {
    const abs = Math.abs(offset);
    if (offset === 0) {
      return { tx: 0, tz: 0, rot: 0, scale: 1, op: 1, z: 10, sat: 1, bright: 1 };
    }
    if (abs === 1) {
      return { tx: offset * 320, tz: -120, rot: -offset * 18, scale: 0.85, op: 0.65, z: 5, sat: 0.6, bright: 0.85 };
    }
    if (abs === 2) {
      return { tx: offset * 560, tz: -250, rot: -offset * 30, scale: 0.7, op: 0.3, z: 1, sat: 0.4, bright: 0.7 };
    }
    return { tx: offset * 800, tz: -400, rot: -offset * 38, scale: 0.5, op: 0, z: 0, sat: 0.3, bright: 0.5 };
  };

  return (
    <section style={{ marginBottom: 64, paddingTop: 32, position: "relative", background: "#080808" }}>
      {/* Header */}
      <div className="page" style={{ marginBottom: 24 }}>
        <h2 className="section-label" style={{ marginBottom: 6 }}>
          Módulos da Maleta <IconStar />
        </h2>
        <p style={{
          margin: 0,
          fontFamily: "var(--f-sans)", fontSize: 14, color: "#6B6560",
          letterSpacing: "0.02em",
        }}>
          6 módulos · 48 aulas · 18h 30min de conteúdo estratégico
        </p>
      </div>

      {/* Carousel stage — full-bleed */}
      <div style={{
        position: "relative",
        width: "100%",
        height: 520,
        perspective: "1200px",
        overflow: "hidden",
        background: "#080808",
      }}>
        {/* Left arrow */}
        <CarouselArrow dir="left" onClick={() => setActive(a => wrap(a - 1))} />
        {/* Right arrow */}
        <CarouselArrow dir="right" onClick={() => setActive(a => wrap(a + 1))} />

        {/* Cards */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transformStyle: "preserve-3d",
        }}>
          {modules.map((m, i) => {
            const offset = slotFor(i);
            const s = styleFor(offset);
            const isCenter = offset === 0;
            const isLocked = m.status === "locked";
            return (
              <ModuleCarouselCard key={m.id}
                m={m}
                offset={offset}
                style={s}
                ease={ease}
                isCenter={isCenter}
                isLocked={isLocked}
                onClick={() => {
                  if (isCenter) {
                    if (!isLocked) onOpenModule(m.id);
                  } else {
                    setActive(i);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
        {modules.map((_, i) => {
          const isActive = i === active;
          return (
            <button key={i} onClick={() => setActive(i)} aria-label={`Módulo ${i + 1}`}
              style={{
                height: isActive ? 4 : 6,
                width: isActive ? 28 : 6,
                background: isActive ? "var(--gold)" : "rgba(201,160,80,0.25)",
                border: "none", borderRadius: isActive ? 2 : "50%",
                cursor: "pointer", padding: 0,
                transition: `width 500ms ${ease}, height 500ms ${ease}, border-radius 500ms ${ease}, background-color 200ms ease`,
              }} />
          );
        })}
      </div>
    </section>
  );
};

/* Arrow */
const CarouselArrow = ({ dir, onClick }) => (
  <button onClick={onClick} aria-label={dir === "left" ? "Anterior" : "Próximo"}
    style={{
      position: "absolute",
      [dir]: 32, top: "50%", transform: "translateY(-50%)",
      width: 52, height: 52, borderRadius: "50%",
      background: "rgba(8,8,8,0.7)",
      border: "1px solid rgba(201,160,80,0.3)",
      color: "var(--gold-hover)",
      display: "grid", placeItems: "center",
      cursor: "pointer", zIndex: 30,
      backdropFilter: "blur(8px)",
      transition: "all 200ms ease",
      fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 600, lineHeight: 1,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(201,160,80,0.12)";
      e.currentTarget.style.borderColor = "rgba(201,160,80,1)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "rgba(8,8,8,0.7)";
      e.currentTarget.style.borderColor = "rgba(201,160,80,0.3)";
    }}
    onMouseDown={e => { e.currentTarget.style.transform = "translateY(-50%) scale(0.95)"; }}
    onMouseUp={e => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}>
    {dir === "left" ? "‹" : "›"}
  </button>
);

/* Single carousel card (portrait 280×380) */
const ModuleCarouselCard = ({ m, offset, style: s, ease, isCenter, isLocked, onClick }) => {
  const [hover, setHover] = React.useState(false);
  const isDone = m.status === "done";
  const ref = React.useRef(null);
  const baseTransformRef = React.useRef("");
  const rafRef = React.useRef(0);
  const isHoveringRef = React.useRef(false);

  // Compose carousel base transform
  const baseTransform = `translateX(${s.tx}px) translateZ(${s.tz}px) rotateY(${s.rot}deg) scale(${s.scale})`;
  React.useLayoutEffect(() => {
    baseTransformRef.current = baseTransform;
    const el = ref.current;
    // Don't clobber the tilt transform while user is hovering the center card
    if (el && !isHoveringRef.current) el.style.transform = baseTransform;
  }, [baseTransform]);

  React.useEffect(() => {
    if (!isCenter || isLocked) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -10;
        const ry = ((x - cx) / cx) * 10;
        el.style.transition = "transform 80ms ease, box-shadow 500ms ease, border-color 500ms ease";
        el.style.transform =
          `${baseTransformRef.current} perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.04,1.04,1.04)`;

        const glare = el.querySelector(".tilt-glare");
        if (glare) {
          const gx = (x / rect.width) * 100;
          const gy = (y / rect.height) * 100;
          glare.style.background =
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(201,160,80,0.22) 0%, rgba(201,160,80,0.06) 35%, transparent 60%)`;
          glare.style.opacity = "1";
        }
        el.querySelectorAll(".tilt-glow").forEach((g) => { g.style.opacity = "1"; });
        el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "1"; });
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafRef.current);
      isHoveringRef.current = false;
      el.style.transition = `transform 500ms cubic-bezier(0.23,1,0.32,1), box-shadow 500ms ease, border-color 500ms ease`;
      el.style.transform = baseTransformRef.current;
      el.querySelectorAll(".tilt-glare, .tilt-glow").forEach((g) => { g.style.opacity = "0"; });
      el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "0"; });
    };
    const onEnter = () => {
      isHoveringRef.current = true;
      el.style.transition = "transform 80ms ease";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(rafRef.current);
      isHoveringRef.current = false;
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [isCenter, isLocked]);

  // Locked subtitle copy
  const lockedAfter = m.id === 5 ? "Disponível após Módulo IV" : m.id === 6 ? "Disponível após Módulo V" : "Bloqueado";

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "absolute",
        width: 280, height: 380,
        borderRadius: 12,
        overflow: "hidden",
        background: "#0f0f0f",
        border: isCenter ? "1px solid rgba(201,160,80,0.5)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isCenter
          ? "0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(201,160,80,0.15)"
          : "0 16px 40px rgba(0,0,0,0.7)",
        // transform managed imperatively via useEffect — DO NOT set inline (React would clobber tilt on every render)
        opacity: s.op,
        zIndex: s.z,
        transition: `transform 500ms ${ease}, opacity 500ms ${ease}, box-shadow 500ms ${ease}, border-color 500ms ${ease}`,
        cursor: isCenter ? (isLocked ? "default" : "pointer") : "pointer",
        transformStyle: "preserve-3d",
        willChange: "transform",
        display: "flex", flexDirection: "column",
      }}>
      {isCenter && !isLocked && <window.TiltOverlay scanLine={false} corners={false} cyber={false} />}

      {/* TOP 65% — IMAGE */}
      <div style={{ position: "relative", flex: "0 0 65%", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
        <img src={window.officeImg(m.id - 1)} alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            filter: `saturate(${s.sat}) brightness(${s.bright})`,
            transition: `filter 500ms ${ease}`,
          }} />

        {/* Roman numeral watermark */}
        <div className="f-serif" style={{
          position: "absolute", inset: 0,
          display: "grid", placeItems: "center",
          fontSize: 120, lineHeight: 1,
          color: "rgba(201,160,80,0.2)",
          fontStyle: "italic", fontWeight: 600,
          letterSpacing: "-0.03em",
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}>{m.num}</div>

        {/* Center card gold rim light */}
        {isCenter && !isLocked && (
          <div style={{
            position: "absolute", inset: 0,
            boxShadow: "inset 0 0 30px rgba(201,160,80,0.1)",
            pointerEvents: "none",
          }} />
        )}

        {/* Module pill top-left */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          padding: "5px 11px",
          background: isLocked ? "rgba(40,38,34,0.85)" : "var(--gold)",
          color: isLocked ? "var(--text-2)" : "#0a0a0a",
          borderRadius: 999,
          fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.16em", textTransform: "uppercase",
          boxShadow: isLocked ? "none" : "0 2px 10px rgba(0,0,0,0.4)",
        }}>Módulo {m.num}</div>

        {/* Progress ring top-right (skip for locked) */}
        {!isLocked && (
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <ProgressRing value={m.progress} size={32} stroke={2.5} />
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
            <div style={{
              position: "absolute", inset: 0,
              display: "grid", placeItems: "center",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(8,8,8,0.7)",
                border: "1px solid rgba(201,160,80,0.4)",
                display: "grid", placeItems: "center",
                color: "var(--gold)",
                backdropFilter: "blur(6px)",
              }}>
                <IconLock size={26} />
              </div>
            </div>
          </>
        )}

        {/* Done check */}
        {isDone && (
          <div style={{
            position: "absolute", top: 50, right: 14,
            width: 22, height: 22, borderRadius: "50%",
            background: "var(--gold)", color: "#0a0a0a",
            display: "grid", placeItems: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            <IconCheck size={12} />
          </div>
        )}
      </div>

      {/* BOTTOM 35% — INFO */}
      <div style={{
        position: "relative", flex: "1 1 auto",
        background: "linear-gradient(to bottom, rgba(8,8,8,0) 0%, #0f0f0f 30%, #0f0f0f 100%)",
        padding: 16,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div className="f-display" style={{
            fontSize: 16, lineHeight: 1.25, fontWeight: 700, color: "#F5F0E8",
            letterSpacing: "-0.005em",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            marginBottom: 8,
          }}>{m.title}</div>

          {isLocked ? (
            <div style={{
              fontFamily: "var(--f-sans)", fontSize: 10.5, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--gold)",
            }}>{lockedAfter}</div>
          ) : (
            <div style={{
              fontFamily: "var(--f-sans)", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6560",
            }}>
              {m.lessons} Aulas · {Math.floor(m.durationMin/60)}h {String(m.durationMin%60).padStart(2,"0")}min
            </div>
          )}
        </div>

        {/* Center-card hover panel — expand */}
        {isCenter && !isLocked && (
          <div style={{
            overflow: "hidden",
            maxHeight: hover ? 90 : 0,
            opacity: hover ? 1 : 0,
            transition: `max-height 300ms ${ease}, opacity 250ms ease`,
          }}>
            <p style={{
              fontFamily: "var(--f-sans)", fontSize: 12, lineHeight: 1.5,
              color: "#8A8070", margin: "10px 0 8px",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>{m.desc}</p>
            <button
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              style={{
                width: "100%", height: 36,
                background: "var(--gold)", color: "#0a0a0a",
                border: "none", borderRadius: 3,
                fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 6px 18px rgba(201,160,80,0.35)",
              }}>
              <span style={{ display: "inline-block", width: 0, height: 0,
                borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
                borderLeft: "7px solid currentColor" }} />
              Acessar módulo
            </button>
          </div>
        )}
      </div>

      {/* Gold progress fill on bottom edge */}
      {!isLocked && (
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: 3,
          background: "rgba(0,0,0,0.5)",
        }}>
          <div style={{
            height: "100%", width: `${m.progress}%`,
            background: "linear-gradient(90deg, var(--gold-deep), var(--gold-hover))",
            boxShadow: m.progress > 0 ? "0 0 12px rgba(201,160,80,0.5)" : "none",
            transition: `width 500ms ${ease}`,
          }} />
        </div>
      )}
    </div>
  );
};

/* -------- Module ROW (Netflix Stranger Things style — alternating L/R) -------- */
const ModuleRow = ({ m, idx, onOpen }) => {
  const isLocked = m.status === "locked";
  const isDone = m.status === "done";
  const isCurrent = m.status === "current";
  const imageRight = idx % 2 === 0; // I, III, V → image right; II, IV, VI → image left
  const [hover, setHover] = React.useState(false);
  const [tab, setTab] = React.useState("inicio");

  // Determine current lesson number for "AULA X" copy
  const currentLessonN = isCurrent ? Math.max(1, Math.round((m.progress / 100) * m.lessons)) : 0;

  // Tab content
  const tabContent = {
    inicio: m.desc,
    sinopse: `Aprenda como ${m.short.toLowerCase()} se conecta aos demais módulos da Maleta. ${m.topics ? "Tópicos centrais: " + m.topics.join(" · ") : ""}`,
    materiais: `${Math.max(1, Math.floor(m.lessons / 3))} guias práticos, planilhas estratégicas e templates editáveis · PDFs vitalícios.`,
  };

  // Status badge (image overlay)
  const statusBadge = (() => {
    if (isDone)    return { label: "Concluído ✓", color: "var(--gold)", text: "#0a0a0a" };
    if (isCurrent) return { label: "Em andamento", color: "rgba(201,160,80,0.92)", text: "#0a0a0a" };
    if (isLocked)  return { label: "Bloqueado", color: "rgba(40,38,34,0.85)", text: "var(--text-2)" };
    return { label: "Não iniciado", color: "rgba(40,38,34,0.85)", text: "var(--text-2)" };
  })();

  const ctaLabel = isDone
    ? <>✓&nbsp;&nbsp;Revisitar módulo</>
    : isCurrent
      ? <><span style={{ display: "inline-block", width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid currentColor", marginRight: 8, verticalAlign: "1px" }} />Continuar — Aula {currentLessonN}</>
      : isLocked
        ? <>Bloqueado</>
        : <><span style={{ display: "inline-block", width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "7px solid currentColor", marginRight: 8, verticalAlign: "1px" }} />Iniciar módulo</>;

  const ctaStyle = isCurrent
    ? { background: "var(--gold)", color: "#0a0a0a", border: "1px solid var(--gold)" }
    : isLocked
      ? { background: "transparent", color: "var(--text-3)", border: "1px solid var(--border)", cursor: "not-allowed" }
      : { background: "transparent", color: "var(--gold-hover)", border: "1px solid var(--gold-line)" };

  // The two cells, in source order — we just swap their rendered order based on imageRight.
  const TextCell = (
    <div style={{
      flex: "0 0 45%", padding: "8px 0",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--gold)",
        marginBottom: 2,
      }}>Módulo</div>

      <div className="f-serif" style={{
        fontSize: 96, lineHeight: 0.95, color: "#C9A050",
        fontStyle: "italic", fontWeight: 700, letterSpacing: "-0.04em",
        marginBottom: 14,
      }}>{String(m.id).padStart(2, "0")}</div>

      <div className="f-display" style={{
        fontSize: 22, lineHeight: 1.25, fontWeight: 700,
        color: "var(--text-0)", letterSpacing: "-0.005em",
        marginBottom: 12,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{m.title}</div>

      <p style={{
        fontFamily: "var(--f-sans)", fontSize: 14, lineHeight: 1.7,
        color: "#6B6560", margin: "0 0 18px",
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        maxWidth: 460,
      }}>
        {tab === "inicio" ? m.desc : tabContent[tab]}
      </p>

      <div style={{
        fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--text-2)",
        display: "flex", gap: 10, alignItems: "center",
        marginBottom: 18,
      }}>
        <span>{m.lessons} Aulas</span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold)" }} />
        <span>{Math.floor(m.durationMin/60)}h {String(m.durationMin%60).padStart(2,"0")}min</span>
      </div>

      <div style={{ marginBottom: 14 }}>
        <button
          onClick={isLocked ? undefined : onOpen}
          disabled={isLocked}
          style={{
            ...ctaStyle,
            height: 40, padding: "0 22px",
            fontFamily: "var(--f-sans)", fontSize: 11.5, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            borderRadius: 3,
            display: "inline-flex", alignItems: "center",
            opacity: hover || isCurrent ? 1 : 0.92,
            transition: "all 200ms ease",
            cursor: isLocked ? "not-allowed" : "pointer",
          }}>
          {ctaLabel}
        </button>
      </div>

      {/* Tabs (Netflix style: Beginning / Synopsis / Trailer) */}
      <div style={{ display: "flex", gap: 26, borderBottom: "1px solid rgba(201,160,80,0.08)", paddingBottom: 0 }}>
        {[
          { id: "inicio", label: "Início" },
          { id: "sinopse", label: "Sinopse" },
          { id: "materiais", label: "Materiais" },
        ].map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id}
              onClick={(e) => { e.stopPropagation(); setTab(t.id); }}
              style={{
                background: "none", border: 0, padding: "8px 0",
                fontFamily: "var(--f-sans)", fontSize: 12, fontWeight: 600,
                letterSpacing: "0.06em",
                color: active ? "var(--text-0)" : "var(--text-2)",
                cursor: "pointer",
                position: "relative",
                transition: "color 180ms ease",
              }}>
              {t.label}
              {active && (
                <span style={{
                  position: "absolute", left: 0, right: 0, bottom: -1, height: 2,
                  background: "var(--gold)",
                  borderRadius: 1,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const ImageCell = (
    <div style={{
      flex: "1 1 55%", height: "100%",
      position: "relative",
      borderRadius: 8, overflow: "hidden",
      border: hover && !isLocked
        ? "1px solid rgba(201,160,80,0.6)"
        : "1px solid rgba(201,160,80,0.2)",
      transition: "border-color 220ms ease",
      boxShadow: isDone ? "0 0 0 1px rgba(201,160,80,0.3), 0 0 32px rgba(201,160,80,0.18)" : "none",
      cursor: isLocked ? "default" : "pointer",
    }}
    onClick={isLocked ? undefined : onOpen}
    >
      <img src={window.officeImg(m.id - 1)} alt=""
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          filter: isLocked ? "saturate(0.4) brightness(0.6)" : "none",
          transform: hover && !isLocked ? "scale(1.02)" : "scale(1)",
          transition: "transform 280ms ease",
        }} />
      {/* Subtle vignette so badges + progress bar always read */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5) 100%)",
        pointerEvents: "none",
      }} />

      {/* Top-left: Module pill badge */}
      <div style={{
        position: "absolute", top: 14, left: 14,
        padding: "6px 12px",
        background: "rgba(8,8,8,0.7)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(201,160,80,0.4)",
        borderRadius: 999,
        fontFamily: "var(--f-sans)", fontSize: 10.5, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "var(--gold-hover)",
      }}>Módulo {m.num}</div>

      {/* Top-right: status badge */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        padding: "6px 12px",
        background: statusBadge.color,
        color: statusBadge.text,
        border: isDone || isCurrent ? "none" : "1px solid var(--border)",
        borderRadius: 999,
        fontFamily: "var(--f-sans)", fontSize: 10.5, fontWeight: 700,
        letterSpacing: "0.14em", textTransform: "uppercase",
        boxShadow: isDone ? "0 4px 14px rgba(201,160,80,0.35)" : "none",
      }}>{statusBadge.label}</div>

      {/* Lock overlay — center icon */}
      {isLocked && (
        <div style={{
          position: "absolute", inset: 0,
          display: "grid", placeItems: "center",
          color: "rgba(245,240,232,0.5)",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(8,8,8,0.7)",
            border: "1px solid rgba(201,160,80,0.3)",
            display: "grid", placeItems: "center",
            backdropFilter: "blur(6px)",
          }}>
            <IconLock size={22} />
          </div>
        </div>
      )}

      {/* Bottom: progress bar */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: 4, background: "rgba(0,0,0,0.55)",
      }}>
        <div style={{
          height: "100%",
          width: `${m.progress}%`,
          background: "linear-gradient(90deg, var(--gold-deep), var(--gold-hover))",
          boxShadow: m.progress > 0 ? "0 0 12px rgba(201,160,80,0.5)" : "none",
          transition: "width 400ms ease",
        }} />
      </div>
    </div>
  );

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        gap: 48,
        alignItems: "stretch",
        height: 280,
        padding: "32px 0",
        borderBottom: "1px solid rgba(201,160,80,0.1)",
        background: hover ? "#0d0d0d" : "transparent",
        margin: hover ? "0 -24px" : "0",
        paddingLeft: hover ? 24 : 0,
        paddingRight: hover ? 24 : 0,
        transition: "background-color 220ms ease, margin 220ms ease, padding 220ms ease",
        borderRadius: hover ? 6 : 0,
      }}>
      {imageRight ? <>{TextCell}{ImageCell}</> : <>{ImageCell}{TextCell}</>}
    </div>
  );
};

/* -------- (legacy) ModuleCard kept only if referenced elsewhere -------- */
const ModuleCard = ({ m, onClick }) => {
  const isLocked = m.status === "locked";
  const isDone = m.status === "done";
  const [hover, setHover] = React.useState(false);

  // Status pill (top-center)
  const statusPill = (() => {
    if (isDone) return { label: "Concluído", solid: true };
    if (m.status === "current") return { label: "Em andamento", solid: true };
    if (isLocked) return null;
    return { label: "Iniciar", solid: false };
  })();

  const ctaLabel = isDone ? "Revisar" : (m.progress > 0 ? "Continuar" : "Iniciar");

  return (
    <div onClick={isLocked ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        minWidth: 320, width: 320, height: 200,
        position: "relative", borderRadius: 6, overflow: "hidden",
        border: hover && !isLocked ? "1px solid rgba(201,160,80,0.4)" : "1px solid var(--border)",
        background: "var(--bg-1)",
        cursor: isLocked ? "default" : "pointer",
        transition: "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
        transform: hover && !isLocked ? "scale(1.06)" : "scale(1)",
        boxShadow: hover && !isLocked ? "0 20px 60px rgba(0,0,0,0.8)" : "none",
        zIndex: hover ? 5 : 1,
      }}
    >
      {/* Bg image */}
      <img src={window.officeImg(m.id - 1)} alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        filter: isLocked ? "saturate(0.5) brightness(0.7)" : "none",
      }} />
      {/* Gradient: darkest at bottom for text readability */}
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.1) 100%)" }} />
      {/* Locked overlay */}
      {isLocked && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      )}

      {/* TOP-LEFT: Roman numeral */}
      <div className="f-serif" style={{
        position: "absolute", top: 4, left: 16,
        fontSize: 52, lineHeight: 1,
        color: "rgba(201,160,80,0.9)",
        fontStyle: "italic", fontWeight: 500,
        textShadow: "0 4px 24px rgba(0,0,0,0.6)",
      }}>{m.num}</div>

      {/* TOP-CENTER: status pill */}
      {statusPill && !isLocked && (
        <div style={{
          position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
          padding: "4px 10px", borderRadius: 999,
          background: statusPill.solid ? "var(--gold)" : "rgba(8,8,8,0.7)",
          color: statusPill.solid ? "#0a0a0a" : "var(--gold-hover)",
          border: statusPill.solid ? "none" : "1px solid var(--gold-line)",
          fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>{statusPill.label}</div>
      )}

      {/* TOP-RIGHT: progress ring or lock */}
      <div style={{ position: "absolute", top: 12, right: 12 }}>
        {isLocked
          ? <div style={{ width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "1px solid var(--gold-line)",
              display: "grid", placeItems: "center", color: "var(--gold)" }}>
              <IconLock size={14} />
            </div>
          : <ProgressRing value={m.progress} size={36} stroke={2.5} />
        }
      </div>

      {/* Done check overlay (subtle) */}
      {isDone && !hover && (
        <div style={{
          position: "absolute", top: 56, right: 14,
          width: 22, height: 22, borderRadius: "50%",
          background: "var(--gold)", color: "#0a0a0a",
          display: "grid", placeItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          <IconCheck size={12} />
        </div>
      )}

      {/* BOTTOM: title + stats */}
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14,
        opacity: hover ? 0 : 1, transition: "opacity 180ms ease",
        pointerEvents: "none",
      }}>
        <div className="f-display" style={{
          fontSize: 16, lineHeight: 1.25, color: "var(--text-0)",
          fontWeight: 700,
          letterSpacing: "-0.005em",
          marginBottom: 6,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {m.short}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8,
          fontSize: 11, color: "#6B6560", letterSpacing: "0.1em",
          textTransform: "uppercase", fontWeight: 600,
        }}>
          <span>{m.lessons} aulas</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold)" }} />
          <span>{Math.floor(m.durationMin/60)}h {String(m.durationMin%60).padStart(2,"0")}min</span>
        </div>
      </div>

      {/* HOVER PANEL: slides up from bottom, ~45% height */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: "55%",
        background: "rgba(8,8,8,0.96)",
        borderTop: "1px solid rgba(201,160,80,0.3)",
        transform: hover ? "translateY(0)" : "translateY(100%)",
        transition: "transform 220ms ease",
        padding: "14px 16px 14px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <div className="f-display" style={{
            fontSize: 15, lineHeight: 1.25, color: "var(--text-0)",
            fontWeight: 700,
            marginBottom: 6,
            display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{m.short}</div>
          <div style={{
            fontSize: 12, lineHeight: 1.45, color: "var(--text-2)",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{m.desc}</div>
        </div>
        {isLocked ? (
          <div style={{
            height: 32, display: "grid", placeItems: "center",
            border: "1px solid var(--border)", borderRadius: 4,
            color: "var(--text-2)", fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", fontWeight: 600,
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <IconLock size={11} /> Complete os módulos anteriores
            </span>
          </div>
        ) : (
          <button className="btn btn-gold btn-sm" style={{ width: "100%", height: 34, justifyContent: "center" }}
            onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
            <span style={{ display: "inline-block", width: 0, height: 0,
              borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
              borderLeft: "7px solid currentColor" }} /> {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
};

/* -------- Material card -------- */
const MaterialCard = ({ mat }) => {
  const tiltRef = window.useTilt({ max: 10, scale: 1.04 });
  return (
    <div ref={tiltRef} style={{
      minWidth: 380, width: 380, height: 200,
      position: "relative", display: "flex",
      background: "linear-gradient(135deg, #111111, #1a1a1a)",
      border: "1px solid rgba(201,160,80,0.2)",
      borderRadius: 6, overflow: "hidden",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
    }}>
      <window.TiltOverlay />

      {/* Gold accent line on left */}
      <div style={{ width: 4, background: "linear-gradient(180deg, var(--gold-hover), var(--gold-deep))", position: "relative", zIndex: 7 }} />

      <div style={{ flex: 1, padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", zIndex: 7 }}>
        <div>
          <span className="badge-gold">{mat.kind}</span>
          <div className="f-display" style={{
            fontSize: 21, lineHeight: 1.25, color: "var(--text-0)",
            margin: "16px 0 8px",
          }}>{mat.title}</div>
          <div className="f-serif" style={{ fontSize: 15, color: "var(--text-2)", fontStyle: "italic" }}>
            {mat.pages} · {mat.size}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
            Material complementar
          </span>
          <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>
            <IconDownload size={12} /> Baixar
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------- Mais Cursos do Mentor — horizontal scroll carousel -------- */
const MORE_COURSES = [
  {
    cat: "CONTRATOS",
    title: "Carro do Advogado",
    desc: "Transforme seu escritório em uma máquina de resultados",
    posterTop: "CARRO",
    posterBottom: "do Advogado",
    imgIdx: 1,
  },
  {
    cat: "CAPTAÇÃO",
    title: "Funil Jurídico Premium",
    desc: "O sistema completo de atração de clientes de alto valor",
    posterTop: "FUNIL",
    posterBottom: "Jurídico",
    imgIdx: 3,
  },
  {
    cat: "POSICIONAMENTO",
    title: "Autoridade Digital Jurídica",
    desc: "Como construir presença online que gera honorários",
    posterTop: "AUTORIDADE",
    posterBottom: "Digital",
    imgIdx: 4,
  },
  {
    cat: "GESTÃO",
    title: "Banca de Alta Performance",
    desc: "Gestão estratégica para escritórios que faturam mais",
    posterTop: "BANCA",
    posterBottom: "Premium",
    imgIdx: 5,
  },
  {
    cat: "MENTALIDADE",
    title: "Estrategista Jurídico",
    desc: "O método completo de Paulo Miguel em um único curso",
    posterTop: "ESTRATEGISTA",
    posterBottom: "Jurídico",
    imgIdx: 2,
  },
];

const MoreCoursesCarousel = () => {
  const scrollRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const CARD_W = 380;
  const GAP = 20;
  const STEP = CARD_W + GAP;

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * STEP, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / STEP);
    if (idx !== active) setActive(Math.max(0, Math.min(MORE_COURSES.length - 1, idx)));
  };

  return (
    <section style={{
      position: "relative",
      borderTop: "1px solid rgba(201,160,80,0.08)",
      padding: "80px 0 96px",
      background: "#080808",
    }}>
      {/* Header */}
      <div className="page" style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32 }}>
        <div>
          <span className="badge-gold" style={{ marginBottom: 18, display: "inline-flex" }}>
            <IconStar size={10} /> Paulo Miguel
          </span>
          <h2 className="f-display" style={{
            fontSize: 32, fontWeight: 700, color: "#F5F0E8",
            letterSpacing: "-0.015em", margin: "0 0 8px",
            lineHeight: 1.15,
          }}>
            Mais cursos para dominar o mercado jurídico
          </h2>
          <p style={{
            fontFamily: "var(--f-sans)", fontSize: 14, color: "#6B6560",
            margin: 0, letterSpacing: "0.005em",
          }}>
            Clique em qualquer curso para conhecer
          </p>
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          {[-1, 1].map((dir) => (
            <button key={dir} onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? "Anterior" : "Próximo"}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(8,8,8,0.8)",
                border: "1px solid rgba(201,160,80,0.3)",
                color: "var(--gold)", cursor: "pointer",
                fontSize: 22, lineHeight: 1, fontWeight: 300,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 200ms ease, border-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,160,80,0.15)";
                e.currentTarget.style.borderColor = "rgba(201,160,80,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(8,8,8,0.8)";
                e.currentTarget.style.borderColor = "rgba(201,160,80,0.3)";
              }}>
              {dir < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>

      {/* Cards row */}
      <div ref={scrollRef} onScroll={onScroll} style={{
        display: "flex", gap: GAP,
        padding: "0 64px 24px",
        overflowX: "auto", overflowY: "hidden",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        perspective: "1200px",
      }}
      onWheel={(e) => {
        // Convert vertical wheel to horizontal scroll within carousel
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.currentTarget.scrollLeft += e.deltaY;
        }
      }}>
        <style>{`.more-courses-row::-webkit-scrollbar{display:none}`}</style>
        {MORE_COURSES.map((c, i) => (
          <MoreCourseCard key={i} course={c} index={i} total={MORE_COURSES.length} active={active} />
        ))}
        <div style={{ minWidth: 40, flexShrink: 0 }} />
      </div>

      {/* Dots */}
      <div className="page" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
        {MORE_COURSES.map((_, i) => {
          const isActive = i === active;
          return (
            <button key={i} onClick={() => {
              const el = scrollRef.current;
              if (el) el.scrollTo({ left: i * STEP, behavior: "smooth" });
            }}
              aria-label={`Curso ${i + 1}`}
              style={{
                height: 4, width: isActive ? 24 : 8,
                background: isActive ? "var(--gold)" : "rgba(201,160,80,0.3)",
                border: "none", borderRadius: 2,
                cursor: "pointer", padding: 0,
                transition: "all 300ms ease",
              }} />
          );
        })}
      </div>
    </section>
  );
};

const MoreCourseCard = ({ course, index, total, active }) => {
  const [hover, setHover] = React.useState(false);
  const distFromActive = index - active;
  const rotY = distFromActive < -1 ? 2 : distFromActive > 1 ? -2 : 0;

  const open = () => window.open("#landing-page", "_blank");

  return (
    <div onClick={open}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flexShrink: 0,
        scrollSnapAlign: "start",
        position: "relative",
        width: 300, height: 440,
        borderRadius: 4, overflow: "hidden",
        cursor: "pointer",
        background: "#0a0a0a",
        border: hover ? "1px solid rgba(201,160,80,0.55)" : "1px solid rgba(201,160,80,0.12)",
        boxShadow: hover
          ? "0 28px 70px rgba(0,0,0,0.85), 0 0 40px rgba(201,160,80,0.12)"
          : "0 12px 32px rgba(0,0,0,0.6)",
        transform: `perspective(1000px) rotateY(${rotY}deg) scale(${hover ? 1.04 : 1})`,
        transformOrigin: "center center",
        transition: "transform 380ms ease, border-color 300ms ease, box-shadow 380ms ease",
        transformStyle: "preserve-3d",
      }}>

      {/* Cover image — fills card */}
      <img src={window.officeImg(course.imgIdx)} alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: hover ? "saturate(1.15) brightness(0.9) contrast(1.05)" : "saturate(0.7) brightness(0.6) contrast(1.05)",
          transition: "filter 500ms ease, transform 600ms ease",
          transform: hover ? "scale(1.05)" : "scale(1)",
        }} />

      {/* Sepia/warm wash for atmosphere */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(60,40,20,0.25) 0%, rgba(20,12,6,0.15) 40%, transparent 70%)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }} />

      {/* Top gradient (subtle, for badge legibility) */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 100,
        background: "linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Bottom gradient — heavy, hosts the poster title */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.92) 22%, rgba(8,8,8,0.55) 45%, rgba(8,8,8,0.15) 70%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Top — category badge + ver curso */}
      <div style={{
        position: "absolute", top: 16, left: 16, right: 16,
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        zIndex: 4,
      }}>
        <span style={{
          padding: "5px 11px",
          border: "1px solid rgba(201,160,80,0.5)",
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(8px)",
          color: "var(--gold)",
          borderRadius: 999,
          fontFamily: "var(--f-sans)", fontSize: 9.5, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
        }}>{course.cat}</span>

        <span style={{
          fontFamily: "var(--f-sans)", fontSize: 9.5, fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--gold)",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 250ms ease, transform 250ms ease",
        }}>Ver curso →</span>
      </div>

      {/* POSTER TITLE — bottom block, editorial */}
      <div style={{
        position: "absolute", left: 22, right: 22, bottom: 78,
        zIndex: 4,
        textAlign: "center",
      }}>
        {/* Top word — caps serif, all-caps, letterpress feel */}
        <div className="f-display" style={{
          fontSize: course.posterTop.length > 10 ? 28 : 36,
          fontWeight: 800,
          color: "#F5F0E8",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          lineHeight: 0.95,
          marginBottom: 4,
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}>{course.posterTop}</div>

        {/* Hairline rule */}
        <div style={{
          width: 36, height: 1,
          background: "rgba(201,160,80,0.6)",
          margin: "8px auto",
        }} />

        {/* Bottom word — italic cursive script */}
        <div className="f-serif" style={{
          fontSize: 30,
          fontStyle: "italic",
          fontWeight: 500,
          color: "var(--gold-hover)",
          letterSpacing: "-0.005em",
          lineHeight: 1,
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}>{course.posterBottom}</div>
      </div>

      {/* Bottom strip — author + arrow */}
      <div style={{
        position: "absolute", left: 22, right: 22, bottom: 18,
        zIndex: 4,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: 14,
        borderTop: "1px solid rgba(201,160,80,0.18)",
      }}>
        <span style={{
          fontFamily: "var(--f-sans)", fontSize: 10,
          color: "#8A8070", letterSpacing: "0.14em",
          textTransform: "uppercase", fontWeight: 600,
        }}>Paulo Miguel</span>

        <button aria-label="Ver curso"
          onClick={(e) => { e.stopPropagation(); open(); }}
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: hover ? "var(--gold)" : "rgba(201,160,80,0.12)",
            border: hover ? "1px solid var(--gold)" : "1px solid rgba(201,160,80,0.4)",
            color: hover ? "#080808" : "var(--gold)",
            cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700,
            transition: "all 250ms ease",
          }}>→</button>
      </div>

      {/* Hover description — slides up from bottom */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "20px 22px 64px",
        background: "linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.92) 60%, transparent 100%)",
        zIndex: 3,
        opacity: hover ? 1 : 0,
        transform: hover ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 320ms ease, transform 320ms ease",
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--f-sans)", fontSize: 12.5,
          color: "#A89F90", lineHeight: 1.45,
          margin: 0, textAlign: "center",
          fontStyle: "italic",
        }}>{course.desc}</p>
      </div>
    </div>
  );
};

/* -------- Mentor Spotlight (legacy, kept but no longer rendered) -------- */
const MentorSpotlight = () => {
  const { STATS } = window.MalData;
  return (
    <section style={{
      position: "relative",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      <AtmosphereBg tone="atmosphere-warm" intensity={0.7} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to right, var(--bg-0) 30%, rgba(8,8,8,0.5) 55%, transparent 80%)" }} />
      <MentorPortrait side="right" mode="strip" />

      <div className="page" style={{
        position: "relative", zIndex: 2,
        padding: "96px 64px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
      }}>
        <div>
          <span className="badge-gold" style={{ marginBottom: 28, display: "inline-flex" }}>
            <IconStar size={10} /> Sobre o Mentor
          </span>
          <h2 className="f-display" style={{
            fontSize: 56, lineHeight: 1.05, margin: "0 0 14px",
            letterSpacing: "-0.02em",
          }}>
            Paulo <em style={{ fontStyle: "italic", color: "var(--gold-hover)", fontWeight: 600 }}>Miguel</em>
          </h2>
          <p className="f-serif" style={{
            fontSize: 22, fontStyle: "italic", color: "var(--text-1)",
            margin: "0 0 40px", lineHeight: 1.4,
          }}>
            Estrategista Jurídico <span style={{ color: "var(--gold)" }}>·</span> Alta Performance
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-1)", maxWidth: 480, marginBottom: 40 }}>
            Em 12 anos de atuação, ajudou a estruturar bancas que faturam de R$ 80 mil a R$ 2 milhões mensais — sem comprometer a essência do ofício. A Maleta é o destilado dessa metodologia.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 540 }}>
            {[
              { num: STATS.alunos, label: "Advogados formados" },
              { num: STATS.experiencia, label: "De experiência" },
              { num: STATS.estruturados, label: "Estruturados em honorários" },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--gold-line)", paddingTop: 16 }}>
                <div className="f-display" style={{
                  fontSize: 36, color: "var(--gold-hover)", lineHeight: 1,
                  letterSpacing: "-0.02em", marginBottom: 8,
                }}>{s.num}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-2)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column intentionally empty — portrait fills it from absolute layer */}
        <div />
      </div>
    </section>
  );
};

/* -------- Footer -------- */
const Footer = () => (
  <footer style={{
    padding: "48px 0 64px",
    borderTop: "1px solid var(--border)",
    marginTop: 0,
  }}>
    <div className="page" style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      color: "var(--text-2)", fontSize: 12, letterSpacing: "0.08em",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <IconBriefcase size={16} color="var(--gold)" />
        <span className="f-display" style={{ color: "var(--text-1)", fontSize: 14 }}>Maleta do Advogado</span>
        <span style={{ color: "var(--text-3)" }}>·</span>
        <span>© 2026 Paulo Miguel Mentoria Ltda.</span>
      </div>
      <div style={{ display: "flex", gap: 28, textTransform: "uppercase", fontWeight: 600 }}>
        <span style={{ cursor: "pointer" }}>Suporte</span>
        <span style={{ cursor: "pointer" }}>Termos</span>
        <span style={{ cursor: "pointer" }}>Privacidade</span>
      </div>
    </div>
  </footer>
);

window.ScreenHome = ScreenHome;
window.MalFooter = Footer;
