# Write Like Me Free Beta

Write Like Me helps you remove generic AI texture without losing your point. It can also learn a cautious writing pattern from your own samples or from 2 to 3 quick answers, then create a reusable `MY_WRITING_PATTERN.md` file.

This free beta includes the complete testing experience described below.

## Before you begin

Use writing you are comfortable uploading to the selected AI provider. Remove confidential company, client, medical, financial, or identifying information before testing.

Personal writing-pattern analysis currently supports English and has been tested against the included evidence and safety cases. Human preference validation is part of this beta.

## Pick the right download

### Claude

Download the Claude Skill ZIP. In Claude, open **Customize**, choose **Skills**, and upload the ZIP. Keep the ZIP intact.

### ChatGPT Skills

If your ChatGPT account shows the ability to upload a Skill, upload the Claude Skill ZIP as the portable Agent Skill package. Availability varies by account and workspace. If the upload option is not visible, use the draft-cleaning prompt manually or test in Claude or Codex instead.

### Codex or OpenAI plugin testing

Install the OpenAI plugin ZIP where plugin installation is available. Keep the ZIP intact.

The source-evaluation ZIP is for internal reviewers only. Ordinary testers do not need it.

## Complete these three tests

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

## What to look for

- Did the result preserve facts, names, numbers, dates, caveats, and uncertainty?
- Did it avoid inventing a story, meeting, client, opinion, feeling, or result?
- Did it feel closer to you without copying the subject matter or wording of an old sample?
- Was `MY_WRITING_PATTERN.md` short, clear, and reusable?
- Did labels such as `Starter`, `Tentative`, `Emerging`, and `Unknown` feel honest?
- Did the fresh-conversation reuse test work without extra explanation?

Please save the original draft, the result, and one sentence explaining what still felt unlike you. Do not include confidential material in your feedback.

## How long it takes

Most testers can complete the three tests in 15 to 25 minutes. You can also do one test now and return later.

## Share feedback

Use the feedback form on the Write Like Me tester site. It accepts anonymous feedback. Contact details are not required.
