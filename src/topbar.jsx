// topbar.jsx — fixed top navigation (with mobile drawer @ <=900px)

const Topbar = ({ route, onNavigate }) => {
  const [search, setSearch] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close drawer when route changes
  React.useEffect(() => { setMenuOpen(false); }, [route]);

  // Lock body scroll + ESC handler while drawer is open
  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (route === "landing") return null;

  const navItems = [
    { id: "home",     label: "Início" },
    { id: "modules",  label: "Módulos" },
    { id: "progress", label: "Meu Progresso" },
  ];

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        height: 64,
        borderBottom: "1px solid var(--border)",
        background: "rgba(8, 8, 8, 0.78)",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}>
        <div className="page" style={{ height: "100%", display: "flex", alignItems: "center", gap: 32 }}>
          {/* Wordmark — always visible */}
          <button onClick={() => onNavigate("home")}
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

          {/* Nav links — desktop only */}
          <nav className="tb-desktop-only" style={{ display: "flex", gap: 4, marginLeft: 8 }}>
            {navItems.map(n => (
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

          {/* Search — desktop only */}
          <div className="tb-desktop-only" style={{
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

          {/* Right cluster — desktop only */}
          <div className="tb-desktop-only" style={{ display: "flex", alignItems: "center", gap: 14 }}>
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

            {/* Sair da conta */}
            <button onClick={() => onNavigate("landing")}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "8px 14px",
                fontFamily: "var(--f-sans)", fontWeight: 600, fontSize: 12,
                letterSpacing: "0.04em",
                color: "var(--text-1)",
                cursor: "pointer",
                transition: "all 180ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-line)"; e.currentTarget.style.color = "var(--gold-hover)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-1)"; }}
            >
              Sair da conta
            </button>
          </div>

          {/* Hamburger — mobile only (<=900px) */}
          <button
            type="button"
            className="tb-hamburger"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Drawer overlay + panel — only when open */}
      {menuOpen && (
        <div className="tb-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div
            className="tb-drawer"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Menu de navegação"
          >
            <button
              type="button"
              className="tb-drawer-close"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            <ul className="tb-drawer-list">
              {navItems.map(n => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={`tb-drawer-item${route === n.id ? " is-active" : ""}`}
                    onClick={() => { onNavigate(n.id); setMenuOpen(false); }}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
              <li><div className="tb-drawer-divider" /></li>
              <li>
                <button
                  type="button"
                  className="tb-drawer-item"
                  onClick={() => { onNavigate("landing"); setMenuOpen(false); }}
                >
                  Sair da conta
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

window.Topbar = Topbar;
