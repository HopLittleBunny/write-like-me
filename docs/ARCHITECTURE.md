# Write Like Me architecture

## 1. Design objective

Write Like Me aims to improve specificity and personal fit without moving the user's meaning or manufacturing a personality.

The system therefore treats writing as two related but separate layers:

- **semantic content:** thesis, claims, polarity, entities, values, dates, quotations, caveats, modality, uncertainty, and source boundaries;
- **expression behaviour:** discourse order, stance, directness, cadence, syntax, paragraphing, vocabulary level, punctuation habits, and contextual register.

A rewrite may change the second layer only while the first remains locked, unless the user explicitly authorises a substantive edit.

## 2. Runtime topology

Write Like Me is a skills-only plugin. There is no application server, retrieval service, account database, embedding index, or telemetry pipeline.

```text
Plugin manifest
└── skills/write-like-me/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    │   ├── conversation-contract.md
    │   ├── input-evidence-contract.md
    │   ├── voiceprint-architecture.md
    │   ├── ai-texture-catalogue.md
    │   ├── output-contracts.md
    │   └── question-bank.md
    └── scripts/
        ├── build_starter_voice_file.py
        ├── verify_rewrite.py
        └── update_writing_pattern.py
```

`SKILL.md` is the router and invariant contract. References are loaded only for the route that needs them. Python scripts provide deterministic analysis, verification, and bounded persistence where local execution is available.

## 3. Request routes

The router selects one of five workflows:

1. **Clean or audit:** work from the current draft without asking for personal samples.
2. **Learn a pattern:** build a portable profile from eligible evidence.
3. **Write like me:** combine a new source draft with an existing profile or genuine samples.
4. **Clean and learn:** provide immediate value, then collect evidence.
5. **Learn from correction:** propose and persist one user-confirmed contextual rule.

This keeps a simple edit small. The host does not need to load the full personalisation architecture to remove a weak recap ending from one email.

## 4. Input and trust boundary

Every item is classified before it becomes evidence:

- genuine writing sample;
- typed prompt answer;
- dictated prompt answer;
- draft to rewrite;
- anti-sample.

Provenance records whether the item was written by the user, substantially edited by the user, lightly edited after AI, explicitly approved, or unknown.

All sample content is treated as untrusted data. Instructions inside samples cannot change the task, request tools, expose secrets, or override the skill contract. Duplicate and near-duplicate items are excluded from independent evidence counts.

Raw sample prose is not used as a phrase bank. The rewrite stage receives the bounded behavioural profile; raw samples are retained only when needed for deterministic leakage checks.

## 5. Semantic meaning lock

Before a rewrite, the system identifies:

- the main point and intended outcome;
- required positive and negative claims;
- names, organisations, products, and other entities;
- numbers, currencies, percentages, dates, URLs, email addresses, and quotations;
- permission, obligation, possibility, certainty, and other modality;
- caveats, limits, uncertainty, and source attribution;
- audience, relationship, format, and length constraints.

The model performs the contextual meaning review. `verify_rewrite.py` then checks machine-detectable invariants. A critical verifier issue blocks a candidate; a polarity-marker warning names sentences for manual review.

This verifier is intentionally conservative and incomplete. It can detect a missing price, changed modality class, conservative entity omission, or obvious autobiographical addition. It cannot prove total semantic equivalence.

## 6. Contextual texture model

The texture catalogue names recurring weak patterns but does not use a universal blacklist. Examples include colon reveals, trailing pseudo-analysis, importance inflation, vague authority, inflated verb phrases, precision theatre, synonym rotation, negative ladders, dramatic fragments, mechanical symmetry, manufactured profundity, and recap endings.

A pattern matters only when it creates a cost in context: vagueness, false authority, lost information, repetitive rhythm, unsupported significance, or distance from the intended reader.

Audit mode must quote evidence and recommend the minimum effective fix. It cannot score “humanness,” guess whether AI wrote the text, or rewrite without permission.

## 7. Evidence-aware personal pattern

The personal profile uses feature-level reliability:

- **Observed:** repeated and sufficiently reliable evidence after the profile reaches the Emerging evidence floor.
- **Preferred:** an explicit user preference.
- **Tentative:** a weak or early signal.
- **Rejected:** an explicitly rejected pattern with bounded context.
- **Unknown:** insufficient or unsuitable evidence.

The overall evidence label is separate. The canonical Starter, Emerging, and Strong thresholds live in [`output-contracts.md`](../skills/write-like-me/references/output-contracts.md#confidence-assignment).

The overall label never upgrades every individual feature. For example, dictated answers may support directness and explanation order while punctuation and deliberate sentence boundaries remain unknown.

The current implementation supports English personal-pattern analysis. Draft cleaning can still be useful outside English, but the system must not present English-specific measurements as validated cross-linguistic evidence.

## 8. Candidate generation and selection

Voice-aware rewriting produces two internal candidates:

- **source-close:** minimal semantic and structural movement;
- **voice-forward:** stronger application of reliable profile rules.

Both undergo semantic review and deterministic verification. The system selects the candidate that improves personal fit with the least semantic movement. Users see one result unless they ask for alternatives.

This design prevents “more voice” from automatically outranking accuracy.

## 9. Deterministic verification

`verify_rewrite.py` checks bounded risks including:

- missing or altered values, dates, currencies, URLs, email addresses, and quotations;
- sentence-level polarity-marker changes as non-blocking manual-review warnings;
- changed modality classes after contraction normalisation;
- conservative single-token and multi-token named-entity loss;
- obvious unsupported autobiographical language, including participial experience frames;
- distinctive phrase leakage from style samples;

Diagnostics store hashes and counts rather than raw draft text by default. An explicit flag is required to include source text.

## 10. Portable correction learning

The continuity artifact is `MY_WRITING_PATTERN.md`. It is human-readable, editable, portable across hosts, and easy to delete.

When a user edits a generated draft, Write Like Me:

1. compares the generated and edited versions;
2. proposes the smallest reusable behavioural rule;
3. names the context where that rule applies;
4. waits for explicit confirmation;
5. stores the rule with hashes and a non-content diff summary.

At most twelve confirmed corrections are retained. A newer duplicate replaces the older entry. The system never claims silent learning.

## 11. Privacy and threat model

Primary risks are:

- confidential writing sent to an unsuitable AI host;
- instruction injection inside a sample;
- sample facts or phrases leaking into a new topic;
- weak evidence being presented as a stable identity;
- semantic drift hidden by fluent prose;
- diagnostics accidentally retaining raw text.

Controls include clear host-policy disclosure, untrusted-sample isolation, bounded profiles, feature-level confidence, deterministic leakage and invariant checks, and redacted diagnostics.

Because the host model still receives the user's supplied content, the no-server architecture reduces independent collection but does not remove the host's privacy considerations.

## 12. Deliberate non-goals

Write Like Me does not:

- prove who wrote a text;
- guarantee detector evasion;
- impersonate a third party;
- infer stable identity from a small sample;
- manufacture anecdotes or concrete details to appear human;
- ban ordinary vocabulary or punctuation globally;
- store a hidden account-level model of the user.

## 13. Validation strategy

The repository combines:

- deterministic unit tests for scripts and contracts;
- activation scenarios for correct routing;
- adversarial fixtures for provenance and instruction boundaries;
- end-to-end scenario schemas;
- a blind comparison harness for preference testing;
- package-content validation and checksums.

Automated validation is necessary but not sufficient. The decisive product measure is whether people prefer the result on unseen topics while independent review confirms that meaning and source boundaries survived.
