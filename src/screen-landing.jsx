// screen-landing.jsx — premium login screen (Screen 01)

const ScreenLanding = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const inputBase = {
    width: "100%", height: 48, padding: "0 14px",
    background: "#111111",
    border: "1px solid rgba(201,160,80,0.2)",
    borderRadius: 4,
    color: "var(--text-0)",
    fontFamily: "var(--f-sans)", fontSize: 14,
    outline: "none",
    transition: "border-color 200ms ease",
  };
  const labelStyle = {
    fontFamily: "var(--f-sans)", fontSize: 12,
    textTransform: "uppercase", letterSpacing: "0.08em",
    color: "#6B6560",
    display: "block", marginBottom: 8,
  };

  return (
    <div className="fade-in" style={{
      display: "flex", minHeight: "100vh", background: "#080808",
    }}>

      {/* ============ LEFT (50%) — mentor photo + brand ============ */}
      <div style={{
        flex: 1, position: "relative", overflow: "hidden",
        background: "#080808",
      }}>
        <img
          src="assets/paulo-miguel.png"
          alt="Paulo Miguel"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            pointerEvents: "none",
          }}
        />
        {/* Top shade for wordmark legibility */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 240,
          background: "linear-gradient(to bottom, rgba(8,8,8,0.78), rgba(8,8,8,0.25) 60%, transparent)",
          pointerEvents: "none", zIndex: 1,
        }} />
        {/* Bottom shade for copyright legibility */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
          background: "linear-gradient(to top, rgba(8,8,8,0.78), transparent)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Wordmark + tagline (top-left) */}
        <div style={{
          position: "absolute", top: 36, left: 40, zIndex: 2,
          display: "flex", flexDirection: "column", gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 36, height: 36, borderRadius: 4,
              background: "linear-gradient(160deg, #E8B85A, #8a6d34)",
              display: "grid", placeItems: "center",
              boxShadow: "0 2px 8px rgba(201,160,80,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}>
              <IconBriefcase size={18} color="#1a1308" />
            </span>
            <span style={{
              fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 22,
              color: "var(--text-0)", letterSpacing: "-0.01em",
            }}>
              Maleta <span style={{ color: "var(--gold-hover)", fontStyle: "italic", fontWeight: 500 }}>do Advogado</span>
            </span>
          </div>
          <span className="f-serif" style={{
            fontSize: 18, fontStyle: "italic",
            color: "#6B6560", marginLeft: 48,
          }}>
            Estratégias jurídicas de alto valor
          </span>
        </div>

        {/* Copyright (bottom-left) */}
        <div style={{
          position: "absolute", bottom: 24, left: 40, zIndex: 2,
          fontFamily: "var(--f-sans)", fontSize: 11, color: "#4A4540",
          letterSpacing: "0.04em",
        }}>
          © 2026 Paulo Miguel · Maleta do Advogado
        </div>
      </div>

      {/* ============ RIGHT (50%) — login panel ============ */}
      <div style={{
        flex: 1, position: "relative", overflow: "hidden",
        background: "#0d0d0d",
        borderLeft: "1px solid rgba(201,160,80,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 32px",
      }}>
        {/* Radial gradient backdrop */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,160,80,0.04) 0%, transparent 60%)",
        }} />

        {/* Decorative star top-right */}
        <span style={{
          position: "absolute", top: 28, right: 36,
          fontFamily: "var(--f-serif)", fontSize: 48,
          color: "rgba(201,160,80,0.06)", lineHeight: 1,
          pointerEvents: "none",
        }}>✦</span>

        <div style={{
          width: "100%", maxWidth: 420, position: "relative", zIndex: 2,
        }}>

          {/* 1. Brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ color: "#C9A050", display: "inline-grid", placeItems: "center" }}>
              <IconBriefcase size={32} color="#C9A050" />
            </span>
            <span className="f-display" style={{
              fontSize: 24, fontWeight: 700, color: "var(--text-0)",
              letterSpacing: "-0.01em",
            }}>
              Maleta do Advogado
            </span>
          </div>

          {/* 2. Divider */}
          <div style={{
            height: 1, width: "100%",
            background: "rgba(201,160,80,0.1)",
            marginBottom: 36,
          }} />

          {/* 3. Heading */}
          <h1 className="f-display" style={{
            fontSize: 32, fontWeight: 700, color: "var(--text-0)",
            margin: "0 0 12px", lineHeight: 1.1, letterSpacing: "-0.015em",
          }}>
            Acessar minha conta
          </h1>

          {/* 4. Subheading */}
          <p style={{
            fontFamily: "var(--f-sans)", fontSize: 14,
            color: "#6B6560", margin: "0 0 32px", lineHeight: 1.5,
          }}>
            Entre com suas credenciais para acessar o conteúdo
          </p>

          {/* 5. Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={inputBase}
              onFocus={e => e.target.style.borderColor = "#C9A050"}
              onBlur={e => e.target.style.borderColor = "rgba(201,160,80,0.2)"}
            />
          </div>

          {/* 6. Password */}
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputBase, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = "#C9A050"}
                onBlur={e => e.target.style.borderColor = "rgba(201,160,80,0.2)"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                style={{
                  position: "absolute", right: 8, top: "50%",
                  transform: "translateY(-50%)",
                  width: 32, height: 32,
                  background: "none", border: 0, cursor: "pointer",
                  color: "#6B6560",
                  display: "grid", placeItems: "center",
                  transition: "color 180ms ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#C9A050"}
                onMouseLeave={e => e.currentTarget.style.color = "#6B6560"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17.8 17.8 0 0 1-3.2 4.4" />
                    <path d="M6.6 6.6A17.7 17.7 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.5-1" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 7. Forgot password */}
          <div style={{ textAlign: "right", marginBottom: 28 }}>
            <a
              href="#"
              onClick={e => e.preventDefault()}
              style={{
                fontFamily: "var(--f-sans)", fontSize: 12,
                color: "#6B6560", textDecoration: "none",
                transition: "color 180ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C9A050"; e.currentTarget.style.textDecoration = "underline"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#6B6560"; e.currentTarget.style.textDecoration = "none"; }}
            >
              Esqueceu sua senha?
            </a>
          </div>

          {/* 8. Login button */}
          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{
              width: "100%", height: 52,
              background: "#C9A050",
              color: "#080808",
              border: 0, borderRadius: 4,
              fontFamily: "var(--f-sans)", fontSize: 13, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "background 200ms ease, box-shadow 200ms ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#E8B85A";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(201,160,80,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#C9A050";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ENTRAR NA MALETA
          </button>

          {/* 9. Beta bypass */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            margin: "22px 0",
          }}>
            <div style={{ flex: 1, height: 1, background: "rgba(201,160,80,0.1)" }} />
            <span style={{
              fontFamily: "var(--f-sans)", fontSize: 11, color: "#6B6560",
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>ou</span>
            <div style={{ flex: 1, height: 1, background: "rgba(201,160,80,0.1)" }} />
          </div>

          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{
              width: "100%", height: 44,
              background: "transparent",
              border: "1px solid rgba(201,160,80,0.2)",
              borderRadius: 4,
              color: "#C9A050",
              fontFamily: "var(--f-sans)", fontSize: 13,
              cursor: "pointer",
              transition: "background 200ms ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(201,160,80,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            Entrar em modo demonstração →
          </button>

          {/* 10. Trust badges */}
          <div style={{
            marginTop: 32, textAlign: "center",
            fontFamily: "var(--f-sans)", fontSize: 11, color: "#4A4540",
            letterSpacing: "0.04em",
          }}>
            🔒 Acesso seguro · ✦ Dados protegidos
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScreenLanding = ScreenLanding;
