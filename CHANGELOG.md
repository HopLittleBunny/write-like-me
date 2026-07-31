# Write Like Me changelog

## 1.0.0-rc.6

This release candidate improves first-use writing quality and prepares safe local-agent distribution.

- Expanded implicit activation to personal emails, replies, bios, social posts, essays, and other prose that goes out under the user's name.
- Made ordinary drafting and rewriting paste-ready by default, without routine answer wrappers or revision offers.
- Added an evidence-backed language-variety contract that preserves supported dialect, regional English, and code-switching without manufacturing identity-based mannerisms.
- Added a scoped cross-agent npm installer for Claude Code, Codex, Cursor, and Gemini CLI.
- Added dry-run, explicit targeting, safe uninstall, timestamped backups, restore support, modified-file protection, path validation, and installer regression tests.
- Kept raw writing samples out of installer state and retained `MY_WRITING_PATTERN.md` as the user-controlled continuity artifact.
- Qualified the public brand as Write Like Me by HopLittleBunny and linked the plugin manifest to the GitHub Pages site.

## 1.0.0-rc.5

This release candidate aligns the OpenAI plugin package with the live directory uploader contract.

- Added explicit `interface.composerIcon` and `interface.logo` manifest fields.
- Packaged both required square 512×512 PNG assets under `.codex-plugin/assets/`.
- Added archive validation that fails when either asset or manifest reference is missing.
- Added package-contract tests for PNG validity, square dimensions, minimum size, and exact manifest paths.

## 1.0.0-rc.4

This release candidate incorporates independent end-to-end review of the documented onboarding and rewrite-verification paths.

- Fixed onboarding so answers typed or dictated in the current conversation retain confirmed user authorship instead of producing an empty portable profile.
- Made the friendly report and portable profile agree when provenance is unknown.
- Surfaced prompt-injection risk flags in the report and portable evidence summary.
- Prevented `Observed` feature claims below the `Emerging` evidence floor.
- Normalised contractions and compared modality classes, allowing faithful changes such as `cannot` to `can't` and `might` to `may`.
- Demoted polarity-marker count changes to named-sentence warnings that require manual review instead of blocking faithful paraphrases.
- Expanded obvious invented-experience detection and protected conservative single-token named entities.
- Replaced every documented `python` command with `python3`.
- Centralised long-dash authority and confidence thresholds to reduce policy drift.
- Corrected validation language to distinguish deterministic CI from human-recorded model scenarios.
- Made release ZIP metadata deterministic so local and CI checksums match.
- Expanded the automated suite from 50 to 56 tests.

## 1.0.0-rc.3

This release candidate makes the project ready for transparent public review.

- Added an MIT licence and a standalone open-source repository structure.
- Added a public product explanation and detailed architecture document.
- Expanded the privacy policy and terms with explicit data-flow, host-processing, retention, user-control, and limitation language.
- Filled repository, homepage, licence, author, discovery, website, privacy, terms, and brand-colour manifest fields.
- Added privacy-safe defaults for generated personal writing files in `.gitignore`.
- Added contribution and security guidance.
- Added public launch copy that credits Peter Yang without implying endorsement.

## 1.0.0-rc.2

This release candidate incorporates lessons from Peter Yang's No AI Slop while retaining contextual judgement and avoiding blanket bans.

- Added a detect-only Pattern audit route that quotes evidence without rewriting, scoring, or guessing AI authorship.
- Added a temporary 3 to 5 signal voice snapshot for preserving cadence, bluntness, humour, uncertainty, digression, fragments, and polish during one-off cleaning.
- Made minimum-effective-edit behaviour explicit and required strong human sentences to remain untouched.
- Added named contextual risks for colon reveals, trailing pseudo-analysis, importance inflation, vague authority, inflated verb phrases, precision theatre, synonym rotation, negative ladders, dramatic fragment stacks, mechanical symmetry, manufactured profundity, and recap endings.
- Added deterministic diagnostics for five named risks plus negative ladders and dramatic fragment stacks.
- Added explicit attribution to Peter Yang's MIT-licensed work and documented where Write Like Me extends the category.
- Added packaged privacy, terms, and acknowledgements documents.
- Added audit activation and end-to-end scenario coverage.

## 1.0.0-rc.1

This release candidate keeps the product plugin-only and strengthens the parts that matter inside a portable skill.

- Corrected punctuation evidence so cross-sample contradiction is retained instead of assuming every sample supports one aggregate.
- Added Unicode-aware word and contraction measurement.
- Corrected false directive classification for declarative uses such as “Make is a useful tool.”
- Made diagnostic JSON private by default by replacing source text with hashes and counts.
- Added bounded input and manifest limits.
- Made dictated-answer rhetorical units consistent across analysis and evidence support.
- Added instruction-risk flags and an explicit untrusted-sample boundary.
- Made long-dash handling evidence-aware: current instruction, confirmed preference, Observed reliable evidence, exact-source preservation, then default avoidance.
- Rendered compact portable profiles at every confidence level.
- Added source-close and voice-forward internal candidate comparison.
- Added deterministic rewrite checks for values, URLs, emails, quotes, modality, polarity, entities, autobiography, and sample phrase leakage.
- Added user-confirmed correction persistence with bounded rules, draft fingerprints, and non-content diff summaries.
- Expanded the automated suite from 35 to 49 tests and the end-to-end scenario contract from 8 to 11 cases.

This release does not add a database, server retrieval, account memory, tabs, or an app shell. Continuity remains the portable `MY_WRITING_PATTERN.md` file.
