// Diagnostic screen — prose grader + visible thinking + plan-before-build.
(function(){
const { Card, CardHeader, CardBody, Badge, Button, Mastery, Alert, PlanSteps, DiffReview, Stream, SkillChip, Artifact } = window.AuraDesignSystem_58f91b;

function DiagnosticScreen() {
  return (
    <div className="content" style={{ flex: 1 }}>
      <div className="page-header">
        <div className="eyebrow" style={{ marginBottom: 8 }}>diagnostic</div>
        <div className="page-title">Prose grader · systems thinking</div>
        <div className="page-desc">Write, don't pick. Your prose is graded against the senior rubric.</div>
      </div>
      <div style={{ padding: 'var(--s-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-5)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-5)' }}>
          <Card>
            <CardHeader title="Your response" trailing={<Badge mono>318 words</Badge>} />
            <CardBody>
              <div className="field">
                <textarea className="textarea" style={{ minHeight: 150 }} defaultValue={"When a flow breaks under load, I trace it to the system boundary — where ownership and data contracts blur. The fix is rarely the screen; it's the model behind it…"} />
              </div>
              <div style={{ display: 'flex', gap: 'var(--s-3)', marginTop: 'var(--s-4)' }}>
                <Button variant="primary">Grade response</Button>
                <Button variant="ghost">Save draft</Button>
              </div>
            </CardBody>
          </Card>
          <Alert variant="info" title="How grading works">
            Each cluster is scored on evidence, tradeoffs and second-order thinking — never on keywords.
          </Alert>
        </div>

        <Artifact file="grade.run" meta="streaming" status="thinking">
          <Stream>Reading for system boundaries… found 2 strong tradeoffs, 1 missing second-order effect</Stream>
          <div style={{ marginTop: 16 }}>
            <PlanSteps steps={[
              { label: 'Parse response for evidence', done: true },
              { label: 'Score against senior rubric', done: true },
              { label: 'Locate the highest-leverage gap', done: false },
            ]} />
          </div>
          <div style={{ marginTop: 16 }}>
            <DiffReview rows={[
              { type: 'add', text: 'mastery: developing → proficient' },
              { type: 'add', text: 'banked_value += 18,000' },
              { type: 'del', text: 'note: name the second-order effect' },
            ]} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <Mastery level="proficient" />
            <SkillChip>prose-grader</SkillChip>
          </div>
        </Artifact>
      </div>
    </div>
  );
}
window.DiagnosticScreen = DiagnosticScreen;
})();
