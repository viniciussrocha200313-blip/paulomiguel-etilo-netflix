// topbar.jsx — fixed top navigation

const Topbar = ({ route, onNavigate }) => {
  const [search, setSearch] = React.useState("");
  const isLanding = route === "landing";

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      height: 64,
      borderBottom: "1px solid var(--border)",
      background: "rgba(8, 8, 8, 0.78)",
      backdropFilter: "blur(18px) saturate(140%)",
      WebkitBackdropFilter: "blur(18px) saturate(140%)",
    }}>
      <div className="page" style={{ height: "100%", display: "flex", alignItems: "center", gap: 32 }}>
        {/* Wordmark */}
        <button onClick={() => onNavigate(isLanding ? "landing" : "home")}
          style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: 0, cursor: "pointer", padding: 0 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 4,
            background: "linear-gradient(160deg, #E8B85A, #8a6d34)",
            display: "grid", placeItems: "center",
            color: "#1a1308",
            boxShadow: "0 2px 8px rgba(201,160,80,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}>
            <IconBriefcase size={18} color="#1a1308" />
          </span>
          <span style={{
            fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 20,
            color: "var(--text-0)", letterSpacing: "-0.01em",
          }}>
            Maleta <span style={{ color: "var(--gold-hover)", fontStyle: "italic", fontWeight: 500 }}>do Advogado</span>
          </span>
        </button>

        {!isLanding && (
          <>
            {/* Nav links */}
            <nav style={{ display: "flex", gap: 4, marginLeft: 8 }}>
              {[
                { id: "home", label: "Início" },
                { id: "modules", label: "Módulos" },
                { id: "progress", label: "Meu Progresso" },
              ].map(n => (
                <button key={n.id} onClick={() => onNavigate(n.id)}
                  style={{
                    background: "none", border: 0, cursor: "pointer",
                    padding: "8px 14px",
                    fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 13,
                    letterSpacing: "0.04em",
                    color: route === n.id ? "var(--gold-hover)" : "var(--text-1)",
                    borderBottom: route === n.id ? "1px solid var(--gold)" : "1px solid transparent",
                    transition: "color 180ms ease",
                  }}>
                  {n.label}
                </button>
              ))}
            </nav>

            {/* Search */}
            <div style={{
              flex: 1, maxWidth: 420, marginLeft: "auto",
              display: "flex", alignItems: "center", gap: 10,
              padding: "0 14px",
              height: 40,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: 4,
            }}>
              <span style={{ color: "var(--text-2)" }}><IconSearch size={14} /></span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar na maleta..."
                style={{
                  flex: 1, background: "none", border: 0, outline: 0,
                  color: "var(--text-0)",
                  fontFamily: "var(--f-sans)", fontSize: 13,
                }} />
              <span className="f-badge" style={{ color: "var(--text-3)", fontSize: 9 }}>⌘K</span>
            </div>

            {/* Right cluster */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button style={{
                width: 40, height: 40, borderRadius: 4,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
                display: "grid", placeItems: "center",
                color: "var(--text-1)", cursor: "pointer",
                position: "relative",
              }}>
                <IconBell size={16} />
                <span style={{
                  position: "absolute", top: 8, right: 9,
                  width: 7, height: 7, borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 0 2px var(--bg-0)",
                }} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 12, borderLeft: "1px solid var(--border)" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #2a2218, #14100a)",
                  border: "1px solid var(--border-strong)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--f-display)", fontSize: 14, color: "var(--gold-hover)",
                }}>JC</div>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Dr. João Castro</span>
                  <span style={{ fontSize: 10.5, color: "var(--text-2)", letterSpacing: "0.05em" }}>OAB/SP 312.498</span>
                </div>
                <span style={{ color: "var(--text-2)", marginLeft: 4 }}><IconChevron size={11} /></span>
              </div>
            </div>
          </>
        )}

        {isLanding && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => onNavigate("home")}
              style={{
                background: "none", border: 0, cursor: "pointer",
                fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 13,
                color: "var(--text-1)", padding: "8px 14px",
              }}>
              Já sou aluno
            </button>
            <button className="btn btn-gold btn-sm" onClick={() => onNavigate("home")}>
              Quero a Maleta
              <IconArrow size={12} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

window.Topbar = Topbar;
