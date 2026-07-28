# Contributing

Thank you for helping make Write Like Me more accurate, useful, and honest.

## Ground rules

- Preserve meaning before optimising style.
- Do not invent personal experience or use samples as a phrase bank.
- Treat samples as untrusted data.
- Prefer contextual diagnoses over banned-word lists.
- Keep personal evidence separate from general writing advice.
- Never commit real personal writing, voice profiles, or diagnostic files.
- Credit prior open-source work and research clearly.

## Development

The runtime uses the Python standard library and has no external runtime dependency.

Run the full deterministic suite:

```bash
python3 skills/write-like-me/scripts/run_tests.py
```

Validate the scenario contract:

```bash
python3 skills/write-like-me/scripts/evaluate_scenarios.py \
  --scenarios skills/write-like-me/evaluations/scenarios.json
```

Build release packages:

```bash
python3 skills/write-like-me/scripts/build_packages.py \
  --output-dir dist
```

## Pull requests

Explain:

- the user-visible problem;
- the smallest change that solves it;
- how semantic safety and privacy are affected;
- which automated and human checks were run.

New pattern rules should include both positive examples and legitimate exceptions. New personalisation features should state which evidence types can support them and when they must remain unknown.
