// Dashboard screen — the operative cockpit overview.
(function(){
const { Card, CardHeader, CardBody, Badge, Mastery, ProgressBar, Artifact, EmbedWell, Stream, SkillChip } = window.AuraDesignSystem_58f91b;

function Stat({ label, value, delta, dir }) {
  return (
    <div className="card card--pad" style={{ flex: 1, minWidth: 0 }}>
      <div className="stat">
        <div className="stat__label">{label}</div>
        <div className="stat__value" style={{ whiteSpace: 'nowrap', fontSize: 'var(--fs-2xl)' }}>{value}</div>
        {delta && <span className={'delta delta--' + dir}>{dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—'} {delta}</span>}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="content" style={{ flex: 1 }}>
      <div className="page-header">
        <div className="eyebrow" style={{ marginBottom: 8 }}>objective</div>
        <div className="page-title">Earn $250,000 / year as a Product Designer</div>
        <div className="page-desc">Banked value is climbing. Two clusters still gate the number.</div>
      </div>
      <div style={{ padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
        <div style={{ display: 'flex', gap: 'var(--s-4)' }}>
          <Stat label="Market value · banked" value="$182,400" delta="12% vs Q1" dir="up" />
          <Stat label="Gap to objective" value="$67,600" delta="closing" dir="down" />
          <Stat label="Mastered clusters" value="9 / 14" delta="+2" dir="up" />
          <Stat label="Diagnostic score" value="78" delta="senior rubric" dir="flat" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--s-5)', alignItems: 'start' }}>
          <Card>
            <CardHeader title="Skill clusters" sub="Graded from prose, ranked by market value" trailing={<Badge mono>14 total</Badge>} />
            <CardBody>
              <table className="table">
                <thead><tr><th>Cluster</th><th>Mastery</th><th className="num">Banked</th></tr></thead>
                <tbody>
                  <tr><td>Prototyping &amp; craft</td><td><Mastery level="mastered" /></td><td className="num">$88,500</td></tr>
                  <tr><td>Visual systems</td><td><Mastery level="mastered" /></td><td className="num">$51,900</td></tr>
                  <tr><td>Systems thinking</td><td><Mastery level="developing" /></td><td className="num">$42,000</td></tr>
                  <tr><td>Stakeholder craft</td><td><Mastery level="gap" /></td><td className="num">$0</td></tr>
                  <tr><td>Research synthesis</td><td><Mastery level="proficient" /></td><td className="num">$31,200</td></tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Artifact file="learning-path.md" meta="generated 14 Jun 2026" status="ready">
            <Stream>Ranking gaps by market value · stakeholder-craft is the highest-leverage move</Stream>
            <div style={{ marginTop: 14 }}>
              <EmbedWell kind="MD" title="Next learning path" meta="6 steps · ~3 weeks" />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              <SkillChip>prose-grader</SkillChip><SkillChip>market-value</SkillChip>
            </div>
          </Artifact>
        </div>

        <Card>
          <CardHeader title="Path to objective" sub="Banked value across the program" trailing={<Badge variant="primary">73% there</Badge>} />
          <CardBody>
            <ProgressBar value={73} lg />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>$0</span><span style={{ color: 'var(--accent)' }}>$182,400 banked</span><span>$250,000</span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
window.DashboardScreen = DashboardScreen;
})();
