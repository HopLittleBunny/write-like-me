import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("exports the homepage, tester guide and both release packages", async () => {
  const [home, guide] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/test/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(home, /AI can write/);
  assert.match(home, /Open source/);
  assert.match(home, /Download Claude Skill/);
  assert.match(home, /Download Agent Skill/);
  assert.match(home, /Download OpenAI Plugin/);
  assert.match(guide, /Two-minute quick start/);
  assert.match(guide, /Share anonymous feedback/);

  await Promise.all([
    access(
      new URL(
        "../out/downloads/write-like-me-claude-skill-1.0.0-rc.6+codex.20260731100340.zip",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../out/downloads/write-like-me-openai-plugin-1.0.0-rc.6+codex.20260731100340.zip",
        import.meta.url,
      ),
    ),
  ]);
});

test("points the static feedback form at the existing anonymous backend", async () => {
  const form = await readFile(
    new URL("../app/test/FeedbackForm.tsx", import.meta.url),
    "utf8",
  );
  const paths = await readFile(
    new URL("../app/lib/paths.ts", import.meta.url),
    "utf8",
  );

  assert.match(form, /feedbackEndpoint/);
  assert.match(paths, /NEXT_PUBLIC_FEEDBACK_ENDPOINT/);
  assert.doesNotMatch(form, /name="email"|name="name"/);
});

test("uses the public GitHub Pages identity rather than the retired beta host", async () => {
  const homepage = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(homepage, /Write Like Me by HopLittleBunny/);
  assert.doesNotMatch(homepage, /write-like-me-beta\.amitt7274\.chatgpt\.site/);
});
