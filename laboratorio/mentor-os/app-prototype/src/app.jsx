/* MentorOS — App root. Routing, theme, global keyboard. */
const { useState: useStateA, useEffect: useEffectA } = React;

function Placeholder({ title }) {
  return (
    <div className="page">
      <div className="page-head"><h1 className="page-title">{title}</h1></div>
      <Card pad><EmptyState icon={I.layers} title="Screen under construction">This view is being built next.</EmptyState></Card>
    </div>
  );
}

const SCREENS = {
  today: (p) => (window.Today ? <Today {...p} /> : <Placeholder title="Today" />),
  coach: (p) => (window.Coach ? <Coach {...p} /> : <Placeholder title="Coach" />),
  dashboard: (p) => <Dashboard {...p} />,
  diagnostic: (p) => (window.Diagnostic ? <Diagnostic {...p} /> : <Placeholder title="Diagnostic" />),
  journey: (p) => (window.Journey ? <Journey {...p} /> : <Placeholder title="Learning Journey" />),
  mentor: (p) => (window.Mentor ? <Mentor {...p} /> : <Placeholder title="AI Mentor" />),
  graph: (p) => (window.SkillGraph ? <SkillGraph {...p} /> : <Placeholder title="Skill Graph" />),
  projects: (p) => (window.Projects ? <Projects {...p} /> : <Placeholder title="Projects" />),
  analytics: (p) => (window.Analytics ? <Analytics {...p} /> : <Placeholder title="Analytics" />),
  settings: (p) => (window.Settings ? <Settings {...p} /> : <Placeholder title="Settings" />),
  process: (p) => (window.DesignProcess ? <DesignProcess {...p} /> : <Placeholder title="Design Process" />),
};

function App() {
  const [route, setRoute] = useStateA(() => (location.hash || "#today").slice(1).split("/")[0] || "today");
  const [theme, setThemeState] = useStateA(() => localStorage.getItem("mentoros-theme") || "light");
  const [collapsed, setCollapsed] = useStateA(() => localStorage.getItem("mentoros-collapsed") === "1");
  const [cmdOpen, setCmdOpen] = useStateA(false);
  const [notifsOpen, setNotifsOpen] = useStateA(false);
  const contentRef = React.useRef(null);

  const setTheme = (t) => { setThemeState(t); localStorage.setItem("mentoros-theme", t); };
  useEffectA(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffectA(() => { localStorage.setItem("mentoros-collapsed", collapsed ? "1" : "0"); }, [collapsed]);

  const navigate = (to, sub) => {
    setRoute(to);
    location.hash = to + (sub ? "/" + sub : "");
    setNotifsOpen(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  useEffectA(() => {
    const onHash = () => setRoute((location.hash || "#today").slice(1).split("/")[0] || "today");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffectA(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen((o) => !o); }
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); setCmdOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const screen = SCREENS[route] || SCREENS.dashboard;
  const props = { navigate, theme, setTheme, openProcess: () => navigate("process") };

  return (
    <div className={["shell", collapsed && "collapsed"].filter(Boolean).join(" ")}>
      <Sidebar route={route} navigate={navigate} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main">
        <Topbar route={route} navigate={navigate} theme={theme} setTheme={setTheme} openCmd={() => setCmdOpen(true)} notifsOpen={notifsOpen} setNotifsOpen={setNotifsOpen} />
        <div className="content" ref={contentRef}>
          <div key={route}>{screen(props)}</div>
        </div>
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} navigate={navigate} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
