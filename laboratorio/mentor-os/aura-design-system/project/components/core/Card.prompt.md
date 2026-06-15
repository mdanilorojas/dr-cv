Card is the primary surface container in Aura — a hairline border and a soft shadow on an elevated surface. Compose it from CardHeader + CardBody, or pass `pad` for a single padded block.

```jsx
<Card>
  <CardHeader title="Market value" sub="Banked over 90 days" trailing={<Badge mono>USD</Badge>} />
  <CardBody>…</CardBody>
</Card>
```

For AI-authored content use the `.ai-surface` class (accent-ringed) instead of a plain Card.
