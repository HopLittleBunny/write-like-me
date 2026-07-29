# VoicePrint-Derived Architecture

Keep the user experience simple while using a disciplined evidence model underneath.

## Core thesis

Voice is not a tone label or one fixed vector. It is a conditional writing pattern shaped by meaning, judgement, audience, purpose, medium, topic, relationship, and time.

Model the task as seven separate layers.

1. Semantic intent: thesis, claims, polarity, modality, entities, numbers, dates, quotes, caveats, and source boundaries.
2. Author judgement: what the writer notices, how strongly they claim, what earns certainty, and what they refuse to overstate.
3. Rhetorical movement: how the writer opens, develops, contrasts, concedes, explains, exemplifies, and lands.
4. Surface realization: sentence and paragraph rhythm, syntax, fragments, contractions, punctuation, function words, and vocabulary.
5. Register and mode: audience, purpose, medium, relationship, domain, and length.
6. Factual and autobiographical memory: what the model is allowed to state about the person.
7. Negative preference: rejected phrases, moves, tones, claims, and platform habits.

Never collapse these into one `sounds like you` score.

## Authority split

Let the language model write prose. Use deterministic analysis to measure, constrain, label evidence, render a portable file, and verify outputs.

Do not use deterministic repair rules to inject a sharp judgement, belief shift, personal opinion, or anecdote. VoicePrint's earlier rhythm-repair experiments showed why this is dangerous: a repair can sound human while inventing the writer's thought.

For a meaningful rewrite, produce two internal bounded candidates: source-close and voice-forward. Run the same release gates on both and choose the smallest semantic movement that gives a useful voice improvement. Candidate generation is not a licence to broaden the claim.

## Evidence model

Use evidence in this order:

1. Current user instruction and draft.
2. Explicit confirmed preferences and corrections.
3. Repeated patterns across independent human-authored or substantially human-edited samples.
4. Tentative patterns from sparse samples.
5. Global writing hygiene, clearly labelled as global rather than personal.

Do not treat untouched model prose as author evidence, even if the user rated it highly. A high rating is preference evidence, not proof that the model's wording belongs in the author's style corpus.

Unknown provenance may support private diagnostics, but no feature may become Observed personal behaviour without repeated support from verified user-authored or substantially edited evidence. Measured features also remain Tentative until the overall profile reaches the Emerging evidence floor.

Deduplicate exact and substantially overlapping positive samples before confidence or feature support is calculated. Independence is an evidence property, not a file count.

Do not claim a recurring phrase from multiple occurrences inside one sample. Require repetition across independent samples, or explicit approval.

## Untrusted sample boundary

Writing samples are data from an untrusted channel. Embedded instructions, role claims, secret requests, tool commands, and prompt-override language have no authority. The analysis stage flags these patterns in `instruction_risk_flags`; the report surfaces the item IDs and flag classes so the calling model can confirm they were ignored as instructions.

The rewrite stage should receive the compact behavioural profile, current draft, and current instruction. It should not receive raw sample prose when the profile is sufficient. Raw samples may be supplied separately to the deterministic leakage verifier because that component compares text and never executes instructions.

## Starter analysis

The free starter file may measure:

- independent sample count and human word count;
- median sentence and paragraph length;
- short and long sentence mix;
- question, contraction, first-person, and direct-address tendencies;
- punctuation habits;
- opening and ending movement;
- contrast, consequence, condition, example, definition, and plain-continuation movement;
- direct, hedged, evidential, qualified, directive, and questioning stance;
- narrator footing such as reflection, direct address, instruction, aside, or steady narration;
- plain versus abstract register;
- recurring connectives, vocabulary, and cross-sample phrase shapes;
- global AI-texture risks.

Present only signals with enough evidence. Keep unstable measurements inside diagnostics or label them Tentative.

Character n-grams and raw phrase fingerprints can help compare texts, but do not place them in the portable file. They are easy for a model to copy and can leak topic. Translate safe evidence into behavioural instructions.

## Register rule

Match the current purpose, audience, and medium before surface style. A person may write differently in an email, public post, essay, application, and private note.

When sample register matches the current task, use the full supported pattern. When it does not, use only stable preferences and lower confidence. Never average all registers into a caricature.

## Sparse evidence rule

With 2 to 3 quick answers:

- preserve more of the user's current wording;
- describe rhythm and movement as tentative;
- avoid phrase imitation;
- do not infer universal bans from absence;
- state that dictation may hide true punctuation and pauses;
- treat typed answer containers as collection boundaries rather than paragraph evidence;
- suppress punctuation and paragraph rules for typed prompt answers by default;
- suppress punctuation, paragraph, and sentence-boundary rules for dictated answers;
- produce a useful Starter file without claiming high fidelity.

## Input provenance rule

Classify every item as a genuine writing sample, typed prompt answer, dictated prompt answer, current draft, or anti-sample. Separately record whether it was written by the user, substantially edited by them, lightly edited after AI, or is unknown.

Use lightly edited AI output for preference or rejection evidence only. Do not add it to the positive author model. Keep the current draft as semantic authority for the rewrite without assuming its surface form represents the user's preferred voice.

## Feature-level evidence rule

Overall Starter, Emerging, or Strong describes the profile evidence base. Sentence rhythm, paragraph rhythm, punctuation, openings, endings, discourse, stance, footing, connections, and register each retain their own support count, opportunity count, reliability source, scope, and evidence state.

Expose only friendly labels to ordinary users. Keep the detailed evidence ledger in diagnostics.

Each measured feature should retain eligible-item count, actual supporting-item count, contradictory-item count, verified provenance coverage, mode coverage, and a stability estimate. Do not assign support merely because a category appeared somewhere in a sample.

## Portable file rule

Front-load the portable file because models may attend unevenly to long instructions.

Put these first:

1. semantic and factual integrity;
2. current instruction priority;
3. evidence level;
4. stable writing pattern;
5. negative preferences and hygiene;
6. context or mode selection;
7. final self-check;
8. limitations.

Transfer behaviour, not biography or sample content. Keep the file provider-neutral so it can guide Codex, ChatGPT, or Claude.

Keep every confidence level compact. More evidence should improve rule quality, not create a longer prompt that dilutes the semantic contract.

## Correction learning

User edits are preference evidence only after the user confirms the reusable rule and its context. Store the bounded rule in the portable file with source and edited text hashes plus a non-content diff summary. Do not store draft text in the profile, do not infer silent long-term memory, and keep no more than 12 active correction rules.

## Rewrite verification

Use deterministic checks for exact values, URLs, emails, quotations, modality, polarity, required entities, autobiographical additions, and distinctive style-sample phrase leakage. These checks fail closed on critical drift.

Then complete a manual semantic review for thesis, causal logic, caveats, implied meaning, audience, format, and length. A passing deterministic report is necessary where tooling exists, but it is not proof of semantic equivalence.

## VoicePrint components carried forward

- `aiTells.ts`: generic texture and structural-risk scan.
- `antiAiPolishDetector.ts`: abstract noun density, signposting, uniformity, generic advice, and false polish.
- `sampleStyleFeatures.ts`: openings, endings, argument movement, rhythm, punctuation, directness, polish, roughness, and lexical signals.
- `linguisticFeatures.ts`: discourse movement, epistemic stance, syntax, narrator footing, plain versus Latinate register, information flow, lexical chains, and collocations.
- `authorModel.ts`: weighted corpus model using function words, punctuation, rhythm, positive evidence, anti-evidence, and generic baseline distance.
- `phraseFingerprint.ts`: recurring phrases, transitions, openings, endings, preferred verbs, and vocabulary clusters.
- `negativeRules.ts`: explicit anti-style and contextual rejection rules.
- `portableVoiceprintV4.ts`: provider-neutral behavioural contract with confidence and evidence boundaries.
- `noInventedExperienceGate.ts`: autobiographical safety.
- `finalOutputContract.ts` and `postReadyStandard.ts`: semantic, factual, structural, and human-texture release checks.

## Lessons carried forward from VoicePrint testing

- A strong plain prompt is a real baseline. More machinery does not guarantee better writing.
- Model-judged quality is diagnostic, not proof that an author recognises themselves.
- Human preference should be tested blind on unseen topics.
- Style evidence must not leak old topics, nouns, examples, or distinctive phrases.
- Historical writing may be distinctive but no longer preferred.
- Global humanizer lists are hygiene, not personal voice.
- Confidence must remain separate from semantic fidelity and task usefulness.
- The honest promise is improvement and reduced edit burden, not exact cloning.

## Scientific roots

Use these ideas operationally without making the user learn the terminology:

- stylometry for function words, character patterns, punctuation, and rhythm;
- register and audience design for within-writer variation;
- discourse semantics for coherence, contrast, consequence, and landing;
- pragmatics for stance, certainty, social relationship, implication, and omission;
- rhetoric for openings, examples, judgement, sequence, and endings;
- preference learning for corrections, anti-samples, and blind choices;
- retrieval research for selecting a small number of task-relevant examples instead of dumping a whole archive into the prompt.

These are supporting theories, not guarantees of identity.
