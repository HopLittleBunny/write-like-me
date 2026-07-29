import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { withBasePath } from "../lib/paths";
import { FeedbackForm } from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Quick start and tester guide",
  description:
    "Try Write Like Me in two minutes, then complete the full portable-pattern test if you want to go deeper.",
};

const claudeDownload = withBasePath(
  "/downloads/write-like-me-claude-skill-1.0.0-rc.3+codex.20260729073728.zip",
);
const openaiDownload = withBasePath(
  "/downloads/write-like-me-openai-plugin-1.0.0-rc.3+codex.20260729073728.zip",
);

export default function TesterGuide() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="guide-hero">
          <div className="shell guide-hero-grid">
            <div>
              <div className="eyebrow">
                <span className="status-dot" />
                Quick start + full validation
              </div>
              <h1>Feel the difference in two minutes. Test it properly when ready.</h1>
              <p>
                Start with one real draft. If the result earns your attention,
                build a portable writing pattern and test it in a completely
                fresh conversation.
              </p>
            </div>
            <aside className="time-card">
              <span>Quick start</span>
              <strong>2 min</strong>
              <p>The full three-part validation takes about 15–25 minutes.</p>
            </aside>
          </div>
        </section>

        <section className="guide-body section">
          <div className="shell guide-layout">
            <aside className="guide-nav">
              <span>On this page</span>
              <a href="#quick-start">1. Quick start</a>
              <a href="#prepare">2. Prepare</a>
              <a href="#install">3. Install</a>
              <a href="#test-one">4. Clean a draft</a>
              <a href="#test-two">5. Learn your pattern</a>
              <a href="#test-three">6. Fresh-chat reuse</a>
              <a href="#feedback">7. Share feedback</a>
            </aside>

            <div className="guide-content">
              <section className="guide-section quick-start-section" id="quick-start">
                <span className="guide-step">Two-minute quick start</span>
                <h2>Install it. Paste one draft. See if the texture changes.</h2>
                <div className="quick-start-grid">
                  <div>
                    <strong>1</strong>
                    <p>Choose the ZIP for your platform from the install section.</p>
                  </div>
                  <div>
                    <strong>2</strong>
                    <p>Upload it intact and begin a new conversation.</p>
                  </div>
                  <div>
                    <strong>3</strong>
                    <p>Paste one draft that sounds stiff, generic or obviously AI.</p>
                  </div>
                </div>
                <div className="prompt-card prompt-dark">
                  <span>Copy this prompt</span>
                  <p>
                    Remove the AI slop from this draft without changing what I
                    mean: [paste draft]
                  </p>
                </div>
                <p>
                  If the result is clearly better, continue through the full
                  test below. That is where Write Like Me learns and reuses your
                  actual writing pattern.
                </p>
              </section>

              <section className="guide-section" id="prepare">
                <span className="guide-step">Before you begin</span>
                <h2>Use writing you are comfortable uploading.</h2>
                <div className="privacy-callout">
                  <span aria-hidden="true">!</span>
                  <p>
                    Remove confidential company, client, medical, financial,
                    or identifying information before testing. Do not include it
                    in the feedback form either.
                  </p>
                </div>
                <p>
                  Personal writing-pattern analysis currently supports English
                  and has been tested against the included evidence and safety
                  cases. Human preference validation is part of this beta.
                </p>
              </section>

              <section className="guide-section" id="install">
                <span className="guide-step">Step 1</span>
                <h2>Install the right package</h2>
                <div className="install-options">
                  <article>
                    <div className="install-title">
                      <span className="platform-mark claude-mark">C</span>
                      <div>
                        <strong>Claude</strong>
                        <small>Recommended tester route</small>
                      </div>
                    </div>
                    <ol>
                      <li>Download the Claude Skill ZIP below.</li>
                      <li>Open Claude, then go to Customize and Skills.</li>
                      <li>Upload the ZIP without unzipping it.</li>
                      <li>Start a new conversation and use Test 1 below.</li>
                    </ol>
                    <a className="button button-dark" href={claudeDownload} download>
                      Download Claude Skill ↓
                    </a>
                  </article>
                  <article>
                    <div className="install-title">
                      <span className="platform-mark openai-mark">O</span>
                      <div>
                        <strong>ChatGPT Skills</strong>
                        <small>When Skill upload is visible</small>
                      </div>
                    </div>
                    <ol>
                      <li>Download the Claude Skill ZIP below.</li>
                      <li>Open your ChatGPT Skills upload area.</li>
                      <li>Upload the ZIP without unzipping it.</li>
                      <li>If upload is unavailable, use Claude or Codex.</li>
                    </ol>
                    <a className="button button-outline" href={claudeDownload} download>
                      Download Agent Skill ↓
                    </a>
                  </article>
                  <article>
                    <div className="install-title">
                      <span className="platform-mark codex-mark">X</span>
                      <div>
                        <strong>Codex / OpenAI plugin</strong>
                        <small>Where plugin install is available</small>
                      </div>
                    </div>
                    <ol>
                      <li>Download the OpenAI plugin ZIP below.</li>
                      <li>Install it in the relevant plugin surface.</li>
                      <li>Keep the ZIP intact during installation.</li>
                      <li>Start a fresh task and use Test 1.</li>
                    </ol>
                    <a className="button button-outline" href={openaiDownload} download>
                      Download OpenAI Plugin ↓
                    </a>
                  </article>
                </div>
                <p className="fine-print">
                  Platform availability can vary by account, region, role, and
                  workspace settings. The source-evaluation ZIP is intentionally
                  not offered here; it is for internal reviewers.
                </p>
              </section>

              <section className="guide-section test-section" id="test-one">
                <div className="test-heading">
                  <span className="test-count">01</span>
                  <div>
                    <span className="guide-step">Test one</span>
                    <h2>Clean one real draft</h2>
                  </div>
                </div>
                <p>
                  Choose a draft that sounds generic, stiff, polished, or
                  obviously AI. Keep a copy of the original.
                </p>
                <div className="prompt-card">
                  <span>Copy this prompt</span>
                  <p>
                    Remove the ChatGPT feel from this draft, but keep my actual
                    point: [paste draft]
                  </p>
                </div>
                <div className="check-list">
                  <p>Check that:</p>
                  <ul>
                    <li>facts, names, numbers, dates, and caveats survived;</li>
                    <li>the position and uncertainty did not flip;</li>
                    <li>no meeting, client, opinion, feeling, or result was invented.</li>
                  </ul>
                </div>
              </section>

              <section className="guide-section test-section" id="test-two">
                <div className="test-heading">
                  <span className="test-count">02</span>
                  <div>
                    <span className="guide-step">Test two</span>
                    <h2>Learn your writing pattern</h2>
                  </div>
                </div>
                <p>
                  If you have no samples, let the skill ask 2–3 warm questions.
                  Short, imperfect answers are useful.
                </p>
                <div className="prompt-card">
                  <span>No samples? Copy this</span>
                  <p>
                    I do not have samples. Help me learn my writing pattern from
                    a few quick answers.
                  </p>
                </div>
                <p>
                  If you do have samples, only use writing you authored,
                  substantially edited, dictated, or explicitly approve as
                  representative. Untouched AI output is not evidence of your
                  voice.
                </p>
                <div className="prompt-card">
                  <span>Have samples? Copy this</span>
                  <p>
                    Use these things I wrote to create MY_WRITING_PATTERN.md,
                    then rewrite this new draft in that pattern.
                  </p>
                </div>
                <p>
                  Save the resulting <code>MY_WRITING_PATTERN.md</code> file.
                  Notice whether labels such as Starter, Tentative, Emerging,
                  and Unknown feel honest.
                </p>
              </section>

              <section className="guide-section test-section" id="test-three">
                <div className="test-heading">
                  <span className="test-count">03</span>
                  <div>
                    <span className="guide-step">Required reuse test</span>
                    <h2>Start a completely fresh conversation</h2>
                  </div>
                </div>
                <p>
                  Attach <code>MY_WRITING_PATTERN.md</code>. Give the model a new
                  draft it has never seen. This tests whether the portable file,
                  not the old conversation, carries the useful pattern.
                </p>
                <div className="prompt-card prompt-dark">
                  <span>Copy this prompt</span>
                  <p>
                    Rewrite this draft using my attached writing pattern.
                    Preserve my facts and point, and do not invent personal
                    experience: [paste new draft]
                  </p>
                </div>
                <p>
                  Record whether you could do this without procedural help and
                  whether the result felt closer to you than a normal AI rewrite.
                </p>
              </section>

              <section className="guide-section feedback-section" id="feedback">
                <span className="guide-step">Final step</span>
                <h2>Share anonymous feedback</h2>
                <p>
                  Specific disappointment is valuable. Tell us what worked, what
                  felt unlike you, and whether the fresh-chat file actually
                  carried your pattern. Contact details are not collected.
                </p>
                <FeedbackForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
