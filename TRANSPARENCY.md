# Transparency

Effective date: 31 August 2026

## What is open

The public repository contains the complete Write Like Me skill distributed by
HopLittleBunny: its instructions, supporting references, local scripts,
evaluation fixtures, packaging logic, website source and tests. There is no
separate closed-source Write Like Me model or rewriting API behind the package.

Write Like Me is licensed under the [MIT License](LICENSE). The licence permits
use, copying, modification, distribution, sublicensing and sale subject to the
licence notice and warranty disclaimer.

## Data flow

The skill processes only material the user intentionally provides to the AI
host or local workflow. The selected host—such as ChatGPT, Codex or Claude—has
its own data, retention, model-training and workspace policies. Write Like Me
does not override those policies.

The package does not contain a publisher API key, account system, analytics
SDK, advertising SDK, remote writing database or publisher-operated inference
server. Portable writing patterns and diagnostics are files controlled by the
user. Raw source text is omitted from diagnostic JSON by default.

The public website has an optional feedback form. Its bounded fields and
storage behaviour are described in [PRIVACY.md](PRIVACY.md); it is separate
from the installable skill and is not a memory service for writing samples.

## Claims and limits

- The project does not determine whether text was written by a human or AI.
- It does not promise detector evasion or manufacture irregularity to appear
  human.
- Automated semantic checks cover defined regression classes; they do not
  prove that every rewrite is correct or preferred.
- Voice observations are evidence-labelled behavioural patterns, not identity
  biometrics.
- Host-model behaviour can vary, so human review remains the final acceptance
  test.

## Security and secrets

Credentials and personal writing artefacts are excluded by repository rules.
The project uses GitHub's private vulnerability-reporting route when available
and asks users not to publish private drafts, profiles, tokens or diagnostics
in issues. See [SECURITY.md](SECURITY.md).

Repository-history and current-tree secret checks are part of storefront and
release review. A zero-alert check means no matching alert was open at the time
of review; it is not a guarantee that future commits are safe.

On 31 August 2026, a high-confidence credential-pattern scan found no matches
in the tracked tree or Git history, and GitHub's secret-scanning API reported
zero open alerts. GitHub secret scanning, push protection and Dependabot
security updates were enabled. Broader non-provider and validity checks were
not reported as enabled by GitHub for this repository.

The same review found 22 open Dependabot alerts against the default branch,
all in the website dependency tree. The storefront branch updates Next.js from
16.2.6 to 16.3.3 and refreshes affected transitive packages. After the update,
`npm audit` reported zero known vulnerabilities and the lint, production build
and static-export tests passed. GitHub will close matching alerts only after
the change reaches the default branch and its advisory data is reprocessed.

## Changes

Material product, privacy and security changes are recorded in Git history and
release notes. The exact installed or tested version should be included in any
public comparison.
