// tilt.jsx — reusable 3D mouse-tracking tilt with glare/glow/particle overlays.
// Apply to a card by attaching the ref returned from useTilt(),
// and rendering <TiltOverlay /> as the card's first child.
//
// The card element MUST have:
//   position: relative
//   overflow: hidden       (so overlays clip to the card)
//   transformStyle: preserve-3d  (set by the hook)
//   willChange: transform        (set by the hook)

const useTilt = ({ max = 12, scale = 1.04, perspective = 800 } = {}) => {
  const ref = React.useRef(null);
  const rafRef = React.useRef(0);
  const baseTransformRef = React.useRef("");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    // Capture whatever transform the card already has — we'll compose with it.
    baseTransformRef.current = getComputedStyle(el).transform === "none"
      ? "" : getComputedStyle(el).transform;

    const onMove = (e) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -max;
        const ry = ((x - cx) / cx) * max;

        el.style.transition = "transform 100ms ease";
        el.style.transform =
          `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale},${scale},${scale})`;

        const glare = el.querySelector(".tilt-glare");
        if (glare) {
          const gx = (x / rect.width) * 100;
          const gy = (y / rect.height) * 100;
          glare.style.background =
            `radial-gradient(circle at ${gx}% ${gy}%, rgba(201,160,80,0.16) 0%, rgba(201,160,80,0.04) 35%, transparent 60%)`;
          glare.style.opacity = "1";
        }
        el.querySelectorAll(".tilt-glow").forEach((g) => { g.style.opacity = "1"; });
        el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "1"; });
        el.querySelectorAll(".tilt-corners span, .tilt-cyber span").forEach((s) => { s.style.opacity = "1"; });
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(rafRef.current);
      el.style.transition = "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)";
      el.style.transform = `perspective(${perspective}px) rotateX(0) rotateY(0) scale3d(1,1,1)`;
      el.querySelectorAll(".tilt-glare").forEach((g) => { g.style.opacity = "0"; });
      el.querySelectorAll(".tilt-glow").forEach((g) => { g.style.opacity = "0"; });
      el.querySelectorAll(".tilt-particles span").forEach((p) => { p.style.opacity = "0"; });
      el.querySelectorAll(".tilt-corners span, .tilt-cyber span").forEach((s) => { s.style.opacity = ""; });
    };

    const onEnter = () => {
      el.style.transition = "transform 100ms ease";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [max, scale, perspective]);

  return ref;
};

/* Decorative overlay layers — must be inside a position:relative card.
   Pointer-events: none so the parent still receives mouse events. */
const TiltOverlay = ({ scanLine = true, particles = true, corners = true, cyber = true }) => (
  <>
    {/* Mouse-tracking glare */}
    <div className="tilt-glare" style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      opacity: 0, transition: "opacity 250ms ease",
      mixBlendMode: "screen",
      zIndex: 6,
    }} />

    {/* Soft gold glows */}
    <div className="tilt-glow" style={{
      position: "absolute", top: "-30%", left: "-20%",
      width: "55%", height: "60%",
      background: "radial-gradient(circle, rgba(201,160,80,0.18), transparent 65%)",
      pointerEvents: "none", opacity: 0, transition: "opacity 400ms ease",
      filter: "blur(20px)", zIndex: 1,
    }} />
    <div className="tilt-glow" style={{
      position: "absolute", bottom: "-30%", right: "-20%",
      width: "55%", height: "60%",
      background: "radial-gradient(circle, rgba(201,160,80,0.14), transparent 65%)",
      pointerEvents: "none", opacity: 0, transition: "opacity 400ms ease 80ms",
      filter: "blur(22px)", zIndex: 1,
    }} />

    {/* Particles — small gold sparkles */}
    {particles && (
      <div className="tilt-particles" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4,
      }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const left = [12, 28, 46, 62, 78, 90][i];
          const top = [22, 78, 14, 64, 32, 70][i];
          const delay = i * 220;
          return (
            <span key={i} style={{
              position: "absolute",
              left: `${left}%`, top: `${top}%`,
              width: 3, height: 3, borderRadius: "50%",
              background: "#C9A050",
              boxShadow: "0 0 8px rgba(201,160,80,0.9)",
              opacity: 0,
              animation: `tilt-particle-float 3.4s ease-in-out ${delay}ms infinite`,
              transition: "opacity 350ms ease",
            }} />
          );
        })}
      </div>
    )}

    {/* Corner brackets */}
    {corners && (
      <div className="tilt-corners" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
      }}>
        {[
          { top: 8, left: 8, borderTop: 1, borderLeft: 1 },
          { top: 8, right: 8, borderTop: 1, borderRight: 1 },
          { bottom: 8, left: 8, borderBottom: 1, borderLeft: 1 },
          { bottom: 8, right: 8, borderBottom: 1, borderRight: 1 },
        ].map((p, i) => (
          <span key={i} style={{
            position: "absolute",
            width: 14, height: 14,
            borderColor: "rgba(201,160,80,0.45)",
            borderStyle: "solid",
            borderWidth: 0,
            borderTopWidth: p.borderTop ? 1 : 0,
            borderLeftWidth: p.borderLeft ? 1 : 0,
            borderRightWidth: p.borderRight ? 1 : 0,
            borderBottomWidth: p.borderBottom ? 1 : 0,
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            opacity: 0.6,
            transition: "opacity 300ms ease",
          }} />
        ))}
      </div>
    )}

    {/* Cyber lines — thin gold edge accents */}
    {cyber && (
      <div className="tilt-cyber" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
      }}>
        <span style={{
          position: "absolute", left: 0, top: "30%",
          height: 1, width: "100%",
          background: "linear-gradient(90deg, transparent, rgba(201,160,80,0.22), transparent)",
          opacity: 0, transition: "opacity 400ms ease",
        }} />
        <span style={{
          position: "absolute", left: 0, bottom: "30%",
          height: 1, width: "100%",
          background: "linear-gradient(90deg, transparent, rgba(201,160,80,0.18), transparent)",
          opacity: 0, transition: "opacity 400ms ease 80ms",
        }} />
      </div>
    )}

    {/* Scan line */}
    {scanLine && (
      <div className="tilt-scan" aria-hidden="true" style={{
        position: "absolute", left: 0, right: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent, rgba(201,160,80,0.2), transparent)",
        pointerEvents: "none", zIndex: 2,
        animation: "tilt-scan 4s linear infinite",
      }} />
    )}
  </>
);

window.useTilt = useTilt;
window.TiltOverlay = TiltOverlay;
