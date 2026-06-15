// AppShell — sidebar + topbar chrome for the Career Training OS.
(function(){
const { Avatar, Badge, Input } = window.AuraDesignSystem_58f91b;

const ICONS = {
  dashboard: 'M3 12 12 3l9 9M5 10v10h14V10',
  diagnostic: 'M9 11l3 3 8-8M21 12a9 9 0 1 1-6-8.5',
  graph: 'M5 19V9M12 19V5M19 19v-7',
  journey: 'M5 12h14M13 6l6 6-6 6',
  mentor: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0',
  projects: 'M3 7h18v12H3zM3 7l2-3h6l2 3',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 2h-5l-.4 2.4a7 7 0 0 0-1.7 1l-2.3-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 2.4h5l.4-2.4a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z',
};
function Icon({ d, size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
}

const NAV = [
  { group: 'Workspace', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'diagnostic', label: 'Diagnostic', icon: 'diagnostic' },
    { id: 'graph', label: 'Skill graph', icon: 'graph' },
  ]},
  { group: 'Program', items: [
    { id: 'journey', label: 'Learning path', icon: 'journey' },
    { id: 'mentor', label: 'AI mentor', icon: 'mentor' },
    { id: 'projects', label: 'Projects', icon: 'projects' },
  ]},
];

function AppShell({ active, onNavigate, children }) {
  return (
    <div className="shell" style={{ height: '100%' }}>
      <aside className="sidebar">
        <div className="sidebar__brand">
          <img src="../../assets/dr-monogram.svg" width="30" height="30" alt="" />
          <div>
            <div style={{ fontWeight: 600, letterSpacing: '-.02em', fontSize: 14, color: 'var(--text-primary)' }}>Career OS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>danilorojas.design</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
          {NAV.map(g => (
            <div className="sidebar__group" key={g.group}>
              <div className="sidebar__group-label">{g.group}</div>
              {g.items.map(it => (
                <div key={it.id} className={'nav-item' + (active === it.id ? ' nav-item--active' : '')} onClick={() => onNavigate(it.id)}>
                  <Icon d={ICONS[it.icon]} /> {it.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sidebar__group" style={{ borderTop: '1px solid var(--border)', paddingTop: 12, paddingBottom: 12 }}>
          <div className={'nav-item' + (active === 'settings' ? ' nav-item--active' : '')} onClick={() => onNavigate('settings')}>
            <Icon d={ICONS.settings} /> Settings
          </div>
        </div>
      </aside>
      <main style={{ display: 'flex', flexDirection: 'column', minWidth: 0, background: 'var(--bg)' }}>
        {children}
      </main>
    </div>
  );
}

function Topbar({ title, onToggleTheme, theme }) {
  return (
    <div className="topbar">
      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', letterSpacing: '-.01em' }}>{title}</div>
      <div className="search" style={{ width: 280, marginLeft: 12 }}>
        <svg className="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input className="input" placeholder="Search · ⌘K" />
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Badge variant="success" dot>on track</Badge>
        <button className="btn btn--ghost btn--icon" onClick={onToggleTheme} title="Toggle theme">
          {theme === 'dark'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>}
        </button>
        <Avatar src="../../assets/photo/danilo.jpg" alt="Danilo Rojas" />
      </div>
    </div>
  );
}

window.AppShell = AppShell;
window.Topbar = Topbar;
window.AppIcon = Icon;
window.APP_ICONS = ICONS;
})();
