# Write Like Me v1 Release Candidate

Write Like Me removes generic AI texture without losing the point, learns an evidence-aware pattern from genuine writing or 2 to 3 quick answers, verifies high-risk rewrite invariants, and records user-confirmed corrections in a reusable `MY_WRITING_PATTERN.md` file.

This release candidate is for private host validation before a public v1 launch.

## Before you begin

Use writing you are comfortable uploading to the selected AI provider. Remove confidential company, client, medical, financial, or identifying information before testing.

Personal writing-pattern analysis currently supports English. Local deterministic and adversarial checks are included; human voice preference still requires private acceptance testing in the actual host.

## Pick the right download

### Claude

Download the Claude Skill ZIP. In Claude, open **Customize**, choose **Skills**, and upload the ZIP. Keep the ZIP intact.

### ChatGPT Skills

If your ChatGPT account shows the ability to upload a Skill, upload the Claude Skill ZIP as the portable Agent Skill package. Availability varies by account and workspace. If the upload option is not visible, use the draft-cleaning prompt manually or test in Claude or Codex instead.

### Codex or OpenAI plugin testing

Install the OpenAI plugin ZIP where plugin installation is available. Keep the ZIP intact.

The source-evaluation ZIP is for reviewers. It includes tests, scenarios, the deterministic verifier, and the correction-learning implementation.

## Complete these four checks

### Test 1: clean one real draft

Start with a draft that sounds too generic, stiff, polished, or “AI”.

Use this prompt:

> Remove the ChatGPT feel from this draft, but keep my actual point: [paste draft]

Check whether names, facts, numbers, dates, caveats, uncertainty, and your intended meaning survived.

### Test 2: learn your writing pattern

If you do not have samples, use:

> I do not have samples. Help me learn my writing pattern from a few quick answers.

If you do have samples, use:

> Use these things I wrote to create MY_WRITING_PATTERN.md, then rewrite this new draft in that pattern.

Only provide writing that you wrote, substantially edited, dictated, or explicitly approve as representative. Untouched AI output is not useful evidence of your voice.

Save the `MY_WRITING_PATTERN.md` file when it is created.

### Test 3: reuse it in a fresh conversation

Start a completely new conversation. Attach `MY_WRITING_PATTERN.md` and provide a new draft the model has not seen before.

Use:

> Rewrite this draft using my attached writing pattern. Preserve my facts and point, and do not invent personal experience: [paste new draft]

Tell us whether you could complete this without procedural help and whether the result felt closer to you.

### Test 4: teach one correction

Edit one generated result, then say:

> I edited your version. Show me the smallest writing rule you would learn from my correction.

The plugin must ask you to confirm the rule and its context before updating the portable file. It must not claim silent account-level memory.

## What to look for

- Did the result preserve facts, names, numbers, dates, caveats, and uncertainty?
- Did it avoid inventing a story, meeting, client, opinion, feeling, or result?
- Did it feel closer to you without copying the subject matter or wording of an old sample?
- Was `MY_WRITING_PATTERN.md` short, clear, and reusable?
- Did labels such as `Starter`, `Tentative`, `Emerging`, and `Unknown` feel honest?
- Did deliberate long-dash use follow your explicit preference rather than a blanket product rule?
- Did a hostile or instruction-like sentence inside a style sample remain inert?
- Did the correction appear only after confirmation?
- Did the fresh-conversation reuse test work without extra explanation?

Please save the original draft, the result, and one sentence explaining what still felt unlike you. Do not include confidential material in your feedback.

## How long it takes

Most reviewers can complete the four checks in 20 to 30 minutes.

## Share feedback

Record the host, model, original draft, result, any verifier failure, and one sentence explaining what still felt unlike you. Do not include confidential material.
