// Skill graph screen — mastery map across clusters with a donut + bars.
(function(){
const { Card, CardHeader, CardBody, Badge, Mastery, Tabs, Segmented } = window.AuraDesignSystem_58f91b;

function Donut({ segments }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const R = 52, C = 2 * Math.PI * R;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={R} fill="none" stroke="var(--surface-hover)" strokeWidth="16" />
      {segments.map((s, i) => {
        const len = (s.v / total) * C;
        const el = <circle key={i} cx="70" cy="70" r={R} fill="none" stroke={s.color} strokeWidth="16"
          strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} transform="rotate(-90 70 70)" strokeLinecap="butt" />;
        acc += len;
        return el;
      })}
      <text x="70" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fontWeight="600" fill="var(--text-primary)">64%</text>
      <text x="70" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--text-muted)">MASTERED</text>
    </svg>
  );
}

function Bar({ label, level, pct, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-4)', padding: '8px 0' }}>
      <div style={{ width: 150, fontSize: 'var(--fs-base)', color: 'var(--text-secondary)' }}>{label}</div>
      <div style={{ flex: 1, height: 8, background: 'var(--surface-hover)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 'inherit' }} />
      </div>
      <div style={{ width: 96, textAlign: 'right' }}><Mastery level={level} /></div>
    </div>
  );
}

function SkillGraphScreen() {
  const [tab, setTab] = React.useState('all');
  return (
    <div className="content" style={{ flex: 1 }}>
      <div className="page-header">
        <div className="eyebrow" style={{ marginBottom: 8 }}>skill graph</div>
        <div className="page-title">Mastery map</div>
        <div className="page-desc">Fourteen clusters, one number. Color is the sacred mastery scale.</div>
      </div>
      <div style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={tab} onChange={setTab} items={[{id:'all',label:'All clusters'},{id:'gaps',label:'Gaps'},{id:'mastered',label:'Mastered'}]} />
          <Segmented items={['Map','List']} value="List" onChange={()=>{}} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 'var(--s-5)', alignItems: 'start' }}>
          <Card>
            <CardHeader title="Distribution" />
            <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s-4)' }}>
              <Donut segments={[
                { v: 9, color: 'var(--m-mastered)' },
                { v: 2, color: 'var(--m-proficient)' },
                { v: 2, color: 'var(--m-developing)' },
                { v: 1, color: 'var(--m-gap)' },
              ]} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                <Mastery level="mastered">9</Mastery>
                <Mastery level="proficient">2</Mastery>
                <Mastery level="developing">2</Mastery>
                <Mastery level="gap">1</Mastery>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Clusters by market value" trailing={<Badge mono>USD weighted</Badge>} />
            <CardBody>
              <Bar label="Prototyping & craft" level="mastered" pct={96} color="var(--m-mastered)" />
              <Bar label="Visual systems" level="mastered" pct={88} color="var(--m-mastered)" />
              <Bar label="Research synthesis" level="proficient" pct={64} color="var(--m-proficient)" />
              <Bar label="Systems thinking" level="developing" pct={48} color="var(--m-developing)" />
              <Bar label="Facilitation" level="developing" pct={40} color="var(--m-developing)" />
              <Bar label="Stakeholder craft" level="gap" pct={12} color="var(--m-gap)" />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
window.SkillGraphScreen = SkillGraphScreen;
})();
