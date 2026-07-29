import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { withBasePath } from "./lib/paths";

const claudeDownload = withBasePath(
  "/downloads/write-like-me-claude-skill-1.0.0-rc.4+codex.20260729151118.zip",
);
const openaiDownload = withBasePath(
  "/downloads/write-like-me-openai-plugin-1.0.0-rc.4+codex.20260729151118.zip",
);
const VIDEO_URL =
  "https://videos.pexels.com/video-files/6798789/6798789-hd_1920_1080_24fps.mp4";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={withBasePath("/og-write-like-me.png")}
            aria-hidden="true"
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                Open source · MIT licensed
              </div>
              <h1>
                AI can write.
                <br />
                Now make it
                <br />
                <em>write like you.</em>
              </h1>
              <p className="hero-lede">
                Write Like Me does three jobs separately: locks what you mean,
                removes the generic AI patterns weakening the draft, and learns
                the patterns that make your writing yours.
              </p>
              <div className="hero-actions">
                <a className="button button-coral" href="#downloads">
                  Download Write Like Me <span aria-hidden="true">↓</span>
                </a>
                <Link className="text-link" href="/test#quick-start">
                  Try it in two minutes <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <p className="microcopy">
                Portable Markdown · No Write Like Me account or product backend.
              </p>
            </div>

            <div className="hero-visual" aria-label="Before and after example">
              <div className="paper-card paper-before">
                <div className="paper-label">
                  <span className="paper-dot muted" /> Before
                </div>
                <p>
                  “In today&apos;s rapidly evolving landscape, it is important
                  to leverage innovative solutions that unlock meaningful
                  outcomes…”
                </p>
                <div className="strike strike-one" />
                <div className="strike strike-two" />
              </div>
              <div className="paper-card paper-after">
                <div className="paper-label">
                  <span className="paper-dot" /> After
                </div>
                <p>
                  “The useful version is simpler: say what changed, what it
                  means, and what we should do next.”
                </p>
                <div className="hand-note">meaning locked ✓</div>
              </div>
              <div className="voice-file">
                <span className="file-icon">M↓</span>
                <div>
                  <strong>MY_WRITING_PATTERN.md</strong>
                  <small>Portable. Inspectable. Yours to keep.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Project facts">
          <div className="shell trust-grid">
            <div>
              <strong>Open</strong>
              <span>architecture and source on GitHub</span>
            </div>
            <div>
              <strong>MIT</strong>
              <span>use, modify and distribute it</span>
            </div>
            <div>
              <strong>Portable</strong>
              <span>your pattern stays plain Markdown</span>
            </div>
            <div>
              <strong>Private</strong>
              <span>no Write Like Me account or silent memory</span>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <span className="kicker">How it works</span>
                <h2>Three different jobs. One result that feels more like you.</h2>
              </div>
              <p>
                Surface-level humanizers mix these jobs together. Write Like Me
                keeps them separate so style can move without your point moving
                with it.
              </p>
            </div>
            <div className="steps-grid">
              <article className="step-card">
                <span className="step-number">01</span>
                <div className="step-icon">M</div>
                <h3>Lock what you mean</h3>
                <p>
                  Protect the thesis, facts, polarity, names, numbers, caveats
                  and uncertainty before any stylistic rewrite begins.
                </p>
              </article>
              <article className="step-card featured">
                <span className="step-number">02</span>
                <div className="step-icon">A</div>
                <h3>Remove the AI slop</h3>
                <p>
                  Diagnose the generic patterns weakening this draft, then make
                  the smallest useful edits instead of banning ordinary words
                  and punctuation.
                </p>
              </article>
              <article className="step-card">
                <span className="step-number">03</span>
                <div className="step-icon">V</div>
                <h3>Learn how you write</h3>
                <p>
                  Build <code>MY_WRITING_PATTERN.md</code> from genuine evidence,
                  then attach it to a fresh conversation and use it on entirely
                  new subjects.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-ink">
          <div className="shell safeguard-grid">
            <div>
              <span className="kicker kicker-light">The architecture</span>
              <h2>Not a banned-word list. A writing system.</h2>
              <p className="ink-lede">
                The larger problem is rooted in semantics and linguistics.
                Write Like Me protects meaning, diagnoses texture in context and
                learns voice only from evidence the writer actually supports.
              </p>
            </div>
            <div className="safeguards">
              <div>
                <span>1</span>
                <p>
                  <strong>Semantic lock</strong>
                  Keeps facts, stance and uncertainty stable while the language
                  changes.
                </p>
              </div>
              <div>
                <span>2</span>
                <p>
                  <strong>Contextual diagnosis</strong>
                  Detects the patterns weakening this particular draft instead
                  of treating every em dash or common word as a crime.
                </p>
              </div>
              <div>
                <span>3</span>
                <p>
                  <strong>Evidence-led voice</strong>
                  Separates polished samples, dictated answers, preferences and
                  corrections instead of averaging them into a fake personality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section downloads-section" id="downloads">
          <div className="shell">
            <div className="section-heading">
              <span className="kicker">Choose your platform</span>
              <h2>Download Write Like Me</h2>
              <p>
                Keep the ZIP intact. ChatGPT Skills and Claude use the portable
                Agent Skill package. Codex uses the OpenAI plugin package.
              </p>
            </div>
            <div className="download-grid">
              <article className="download-card">
                <div className="platform-mark claude-mark">C</div>
                <div>
                  <span className="platform-tag">Claude</span>
                  <h3>Claude Skill</h3>
                  <p>
                    Upload the portable Agent Skill ZIP through Claude&apos;s
                    Skills area, without unzipping it first.
                  </p>
                </div>
                <a className="button button-dark" href={claudeDownload} download>
                  Download Claude Skill <span aria-hidden="true">↓</span>
                </a>
                <small>ZIP · v1.0.0-rc.4</small>
              </article>
              <article className="download-card">
                <div className="platform-mark openai-mark">O</div>
                <div>
                  <span className="platform-tag">ChatGPT Skills</span>
                  <h3>ChatGPT Agent Skill</h3>
                  <p>
                    Use the same portable Agent Skill ZIP where ChatGPT Skill
                    upload is available on your account or workspace.
                  </p>
                </div>
                <a className="button button-outline" href={claudeDownload} download>
                  Download Agent Skill <span aria-hidden="true">↓</span>
                </a>
                <small>ZIP · v1.0.0-rc.4</small>
              </article>
              <article className="download-card">
                <div className="platform-mark codex-mark">X</div>
                <div>
                  <span className="platform-tag">Codex</span>
                  <h3>OpenAI Plugin</h3>
                  <p>
                    Install the plugin ZIP where Codex or another compatible
                    OpenAI plugin surface supports plugin installation.
                  </p>
                </div>
                <a className="button button-outline" href={openaiDownload} download>
                  Download OpenAI Plugin <span aria-hidden="true">↓</span>
                </a>
                <small>ZIP · v1.0.0-rc.4</small>
              </article>
            </div>
            <div className="guide-callout">
              <div>
                <span className="guide-icon">?</span>
                <p>
                  <strong>Want the fastest possible start?</strong>
                  Install the right ZIP, paste one draft and feel the difference
                  before deciding whether to run the full voice test.
                </p>
              </div>
              <Link className="text-link" href="/test#quick-start">
                Two-minute quick start →
              </Link>
            </div>
          </div>
        </section>

        <section className="section beta-cta">
          <div className="shell beta-cta-inner">
            <div>
              <span className="kicker">Prove the portable pattern</span>
              <h2>Use it on a new subject in a fresh conversation.</h2>
              <p>
                That is the real test: not whether it can imitate an old sample,
                but whether a small inspectable file carries something useful
                about how you write.
              </p>
            </div>
            <Link className="button button-coral" href="/test">
              Run the full test <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
