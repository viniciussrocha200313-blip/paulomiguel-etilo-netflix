// atoms.jsx — primitive components, icons, and visual helpers

const { useState, useEffect, useRef, useMemo } = React;

/* ===================== ICONS ===================== */

const IconBriefcase = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="13" rx="1.5" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M3 12h18" />
    <path d="M11 12v2h2v-2" />
  </svg>
);

const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const IconBell = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 1 12 0c0 3.5.8 5 2 6H4c1.2-1 2-2.5 2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

const IconPlus = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12 4.5 4.5L20 6" />
  </svg>
);

const IconLock = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="11" rx="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const IconArrow = ({ size = 14, dir = "right" }) => {
  const rot = { right: 0, left: 180, up: -90, down: 90 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
};

const IconDownload = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v11" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 20h14" />
  </svg>
);

const IconClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconStar = ({ size = 12 }) => (
  <span className="star" style={{ fontSize: size }}>✦</span>
);

const IconChevron = ({ size = 12, dir = "down" }) => {
  const rot = { down: 0, up: 180, right: -90, left: 90 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

const IconCertificate = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13.5 7 21l5-3 5 3-2-7.5" />
  </svg>
);

const IconGuarantee = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/* ===================== ATMOSPHERIC IMAGE ===================== */
// CSS-painted "law office" backgrounds — leather, lamp light, books

const AtmosphereBg = ({ tone = "atmosphere", intensity = 1, vignette = true, children }) => {
  return (
    <div className={tone} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Sub-layers: bookshelf-y verticals + warm lamp glow + grain */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(90deg,
          rgba(60,40,20,${0.18 * intensity}) 0px,
          rgba(60,40,20,${0.18 * intensity}) 2px,
          transparent 2px, transparent 14px)`,
        opacity: 0.35,
        mixBlendMode: "overlay",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(40% 60% at 75% 25%, rgba(232, 184, 90, ${0.22 * intensity}), transparent 70%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        opacity: 0.18,
        mixBlendMode: "multiply",
      }} />
      {vignette && <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(120% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
      }} />}
      {children}
    </div>
  );
};

// Cinematic Paulo Miguel portrait — real photo (subject right of frame),
// blended into #080808 via gradient overlay.
// `mode`: "full" (hero, ~62% width, faces visible right), "strip" (mentor strip,
//          head+shoulders, slightly overflowing top), "bg" (module hero, full-width darkened).
const MENTOR_SRC = "assets/paulo-miguel.png";
const OFFICE_IMGS = ["assets/office-1.png", "assets/office-2.png", "assets/office-3.png"];
window.OFFICE_IMGS = OFFICE_IMGS;
const officeImg = (i) => OFFICE_IMGS[((i % OFFICE_IMGS.length) + OFFICE_IMGS.length) % OFFICE_IMGS.length];
window.officeImg = officeImg;

const MentorPortrait = ({ side = "right", mode = "full", scale = 1 }) => {
  if (mode === "bg") {
    // Module page hero — full-width darkened background
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <img src={MENTOR_SRC} alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "right center",
          }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8, 8, 8, 0.75)" }} />
      </div>
    );
  }

  if (mode === "strip") {
    // Mentor spotlight strip — head & shoulders, overflows top by ~20px
    return (
      <div style={{
        position: "absolute", right: 0, top: -20, bottom: 0,
        width: "62%", pointerEvents: "none", overflow: "visible",
      }}>
        <img src={MENTOR_SRC} alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "calc(100% + 20px)",
            objectFit: "cover", objectPosition: "60% 30%",
            transform: `scale(${scale})`,
            transformOrigin: "right top",
          }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #080808 0%, rgba(8,8,8,0.6) 35%, rgba(8,8,8,0.1) 75%, transparent 100%)",
        }} />
      </div>
    );
  }

  // mode === "full" — hero banner: full-bleed photo, faces revealed on right
  const align = side === "right" ? "right" : "left";
  return (
    <div style={{
      position: "absolute",
      [align]: 0,
      top: 0, bottom: 0,
      width: "70%",
      pointerEvents: "none",
      overflow: "hidden",
    }}>
      <img src={MENTOR_SRC} alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: side === "right" ? "right center" : "left center",
          transform: `scale(${scale}) ${side === "left" ? "scaleX(-1)" : ""}`,
          transformOrigin: "center",
        }} />
      {/* Per-spec gradient: pure black at left, photo revealed on right */}
      <div style={{
        position: "absolute", inset: 0,
        background: side === "right"
          ? "linear-gradient(to right, #080808 45%, rgba(8,8,8,0.6) 65%, rgba(8,8,8,0.1) 100%)"
          : "linear-gradient(to left,  #080808 45%, rgba(8,8,8,0.6) 65%, rgba(8,8,8,0.1) 100%)",
      }} />
    </div>
  );
};

/* ===================== PROGRESS RING ===================== */

const ProgressRing = ({ value = 0, size = 56, stroke = 4, label }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(201,160,80,0.15)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: "stroke-dasharray 600ms ease" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8B85A" />
            <stop offset="100%" stopColor="#C9A050" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: "absolute",
        fontFamily: "var(--f-sans)", fontWeight: 700,
        fontSize: size > 70 ? 16 : 12,
        color: "var(--gold-hover)",
      }}>{label != null ? label : `${value}%`}</div>
    </div>
  );
};

/* ===================== STATUS DOT ===================== */

const StatusIcon = ({ status }) => {
  if (status === "done") {
    return <span style={{
      width: 24, height: 24, borderRadius: "50%",
      background: "var(--gold)", color: "#1a1308",
      display: "inline-grid", placeItems: "center",
    }}><IconCheck size={12} /></span>;
  }
  if (status === "current") {
    return <span style={{
      width: 24, height: 24, borderRadius: "50%",
      background: "var(--gold-subtle)", color: "var(--gold-hover)",
      display: "inline-grid", placeItems: "center",
      border: "1px solid var(--border-strong)",
      animation: "pulseGold 1.6s ease-in-out infinite",
    }}><span className="icon-play" /></span>;
  }
  if (status === "next") {
    return <span style={{
      width: 24, height: 24, borderRadius: "50%",
      border: "1px solid rgba(201,160,80,0.25)",
      color: "var(--text-2)",
      display: "inline-grid", placeItems: "center",
    }}><span className="icon-play" style={{ borderLeftColor: "currentColor" }} /></span>;
  }
  return <span style={{
    width: 24, height: 24, borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    color: "var(--text-3)",
    display: "inline-grid", placeItems: "center",
  }}><IconLock size={11} /></span>;
};

/* ===================== KEYFRAMES (injected once) ===================== */
(() => {
  if (document.getElementById("__mal-kf")) return;
  const s = document.createElement("style");
  s.id = "__mal-kf";
  s.textContent = `
    @keyframes pulseGold {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201, 160, 80, 0.6); }
      50%      { box-shadow: 0 0 0 6px rgba(201, 160, 80, 0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes floatY {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(s);
})();

/* ===================== EXPORTS ===================== */
Object.assign(window, {
  IconBriefcase, IconSearch, IconBell, IconPlus, IconCheck, IconLock,
  IconArrow, IconDownload, IconClock, IconStar, IconChevron,
  IconCertificate, IconGuarantee,
  AtmosphereBg, MentorPortrait, ProgressRing, StatusIcon,
});
