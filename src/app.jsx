// app.jsx — root, screen routing

const { useState, useEffect } = React;

const App = () => {
  // route can be: "landing" | "home" | "modules" | "module" | "player" | "progress" | "course-landing"
  const [route, setRoute] = useState(() => {
    try { return localStorage.getItem("mal_route") || "landing"; } catch { return "landing"; }
  });
  const [moduleId, setModuleId] = useState(() => {
    try { return parseInt(localStorage.getItem("mal_mid") || "2", 10); } catch { return 2; }
  });
  const [lessonN, setLessonN] = useState(() => {
    try { return parseInt(localStorage.getItem("mal_ln") || "4", 10); } catch { return 4; }
  });
  const [courseData, setCourseData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mal_course") || "null"); } catch { return null; }
  });

  useEffect(() => { try { localStorage.setItem("mal_route", route); } catch {} }, [route]);
  useEffect(() => { try { localStorage.setItem("mal_mid", String(moduleId)); } catch {} }, [moduleId]);
  useEffect(() => { try { localStorage.setItem("mal_ln", String(lessonN)); } catch {} }, [lessonN]);
  useEffect(() => { try { localStorage.setItem("mal_course", JSON.stringify(courseData)); } catch {} }, [courseData]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route, moduleId, lessonN]);

  const navigate = (r) => setRoute(r);
  const openModule = (id) => { setModuleId(id); setRoute("module"); };
  const openLesson = (mid, ln) => { setModuleId(mid); setLessonN(ln); setRoute("player"); };
  const openCourse = (course) => { setCourseData(course); setRoute("course-landing"); };

  // Hidden quick-jump bar — small bottom-left switcher to nav between all 5 screens
  const SwitcherChip = ({ id, label }) => (
    <button onClick={() => setRoute(id)}
      style={{
        background: route === id ? "var(--gold)" : "transparent",
        color: route === id ? "#1a1308" : "var(--text-1)",
        border: `1px solid ${route === id ? "var(--gold)" : "var(--border)"}`,
        padding: "6px 12px",
        borderRadius: 2,
        fontFamily: "var(--f-sans)",
        fontWeight: 700,
        fontSize: 10.5,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 180ms ease",
      }}>{label}</button>
  );

  return (
    <div className="app" data-route={route} data-screen-label={route}>
      <Topbar route={route} onNavigate={navigate} />

      <main>
        {route === "landing"        && <ScreenLanding       onNavigate={navigate} />}
        {route === "home"           && <ScreenHome          onNavigate={navigate} onOpenModule={openModule} onOpenLesson={openLesson} onOpenCourse={openCourse} />}
        {route === "modules"        && <ScreenModules       onNavigate={navigate} onOpenModule={openModule} onOpenLesson={openLesson} />}
        {route === "module"         && <ScreenModule        moduleId={moduleId}  onNavigate={navigate} onOpenLesson={openLesson} />}
        {route === "player"         && <ScreenPlayer        moduleId={moduleId}  lessonN={lessonN} onNavigate={navigate} onOpenModule={openModule} onOpenLesson={openLesson} />}
        {route === "progress"       && <ScreenProgress      onNavigate={navigate} onOpenModule={openModule} />}
        {route === "course-landing" && <ScreenCourseLanding course={courseData} onNavigate={navigate} />}
      </main>

      {/* Floating screen switcher (prototype helper) */}
      <div style={{
        position: "fixed", bottom: 20, left: 20, zIndex: 100,
        display: "flex", flexDirection: "column", gap: 10,
        padding: "12px 14px",
        background: "rgba(10, 10, 10, 0.92)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        backdropFilter: "blur(14px)",
        boxShadow: "var(--shadow-card)",
      }}>
        <span style={{
          fontFamily: "var(--f-sans)", fontWeight: 700, fontSize: 9,
          letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-2)",
        }}>
          ✦ Protótipo · Telas
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 360 }}>
          <SwitcherChip id="landing" label="01 Vendas" />
          <SwitcherChip id="home" label="02 Início" />
          <SwitcherChip id="module" label="03 Módulo" />
          <SwitcherChip id="player" label="04 Aula" />
          <SwitcherChip id="progress" label="05 Progresso" />
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
