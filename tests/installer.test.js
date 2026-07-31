"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

const ROOT = path.resolve(__dirname, "..");
const INSTALLER = path.join(ROOT, "bin", "install.js");
const NPM = process.platform === "win32" ? "npm.cmd" : "npm";

function tempHome(t) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "write-like-me-installer-"));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  return home;
}

function run(home, args = []) {
  return spawnSync(process.execPath, [INSTALLER, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, WRITE_LIKE_ME_INSTALL_HOME: home },
  });
}

function readManifest(home) {
  return JSON.parse(
    fs.readFileSync(path.join(home, ".write-like-me", "install-manifest.json"), "utf8"),
  );
}

test("dry run reports an explicit Codex install without writing", (t) => {
  const home = tempHome(t);
  const result = run(home, ["--agent=codex", "--dry-run"]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /would write:/);
  assert.equal(fs.existsSync(path.join(home, ".agents")), false);
  assert.equal(fs.existsSync(path.join(home, ".write-like-me")), false);
});

test("Codex install uses the documented user skill path and stores no samples", (t) => {
  const home = tempHome(t);
  fs.mkdirSync(path.join(home, ".codex"));
  const result = run(home);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    fs.existsSync(path.join(home, ".agents", "skills", "write-like-me", "SKILL.md")),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(home, ".agents", "skills", "write-like-me", "agents", "openai.yaml")),
    true,
  );
  assert.equal(fs.existsSync(path.join(home, ".write-like-me", "voice-samples.md")), false);
  assert.equal(fs.existsSync(path.join(home, ".write-like-me", "MY_WRITING_PATTERN.md")), false);
  assert.equal(readManifest(home).targets[0].agent, "codex");
});

test("install backs up a pre-existing skill and restore returns it", (t) => {
  const home = tempHome(t);
  const skillPath = path.join(home, ".claude", "skills", "write-like-me", "SKILL.md");
  fs.mkdirSync(path.dirname(skillPath), { recursive: true });
  fs.writeFileSync(skillPath, "original personal skill\n");

  const installed = run(home, ["--agent=claude"]);
  assert.equal(installed.status, 0, installed.stderr);
  assert.notEqual(fs.readFileSync(skillPath, "utf8"), "original personal skill\n");
  const record = readManifest(home).targets[0].files.find((file) => file.relativePath === "SKILL.md");
  assert.ok(record.backupPath);
  assert.equal(fs.readFileSync(record.backupPath, "utf8"), "original personal skill\n");

  const restored = run(home, ["--restore"]);
  assert.equal(restored.status, 0, restored.stderr);
  assert.equal(fs.readFileSync(skillPath, "utf8"), "original personal skill\n");
});

test("uninstall preserves files modified after installation", (t) => {
  const home = tempHome(t);
  const installed = run(home, ["--agent=cursor"]);
  assert.equal(installed.status, 0, installed.stderr);
  const skillPath = path.join(home, ".cursor", "skills", "write-like-me", "SKILL.md");
  fs.appendFileSync(skillPath, "\nlocal change\n");

  const removed = run(home, ["--uninstall"]);
  assert.equal(removed.status, 0, removed.stderr);
  assert.match(removed.stdout, /kept modified:/);
  assert.equal(fs.existsSync(skillPath), true);
  assert.match(fs.readFileSync(skillPath, "utf8"), /local change/);
});

test("automatic mode aborts when no supported agent is detected", (t) => {
  const home = tempHome(t);
  const result = run(home);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /No supported local agents were detected/);
  assert.equal(fs.existsSync(path.join(home, ".write-like-me")), false);
});

test("Gemini install creates an extension manifest and nested agent skill", (t) => {
  const home = tempHome(t);
  const result = run(home, ["--agent=gemini"]);
  assert.equal(result.status, 0, result.stderr);
  const root = path.join(home, ".gemini", "extensions", "write-like-me");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "gemini-extension.json"), "utf8"));
  assert.equal(manifest.name, "write-like-me");
  assert.equal(
    fs.existsSync(path.join(root, "skills", "write-like-me", "SKILL.md")),
    true,
  );
});

test("uninstall rejects a manifest path outside the known target root", (t) => {
  const home = tempHome(t);
  const installed = run(home, ["--agent=codex"]);
  assert.equal(installed.status, 0, installed.stderr);
  const manifestPath = path.join(home, ".write-like-me", "install-manifest.json");
  const manifest = readManifest(home);
  const sentinel = path.join(home, "outside.txt");
  fs.writeFileSync(sentinel, "keep me\n");
  manifest.targets[0].files[0].path = sentinel;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const result = run(home, ["--uninstall"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Refusing unsafe manifest install path/);
  assert.equal(fs.readFileSync(sentinel, "utf8"), "keep me\n");
});

test("npm package keeps the occupied name out and ships only runtime files", (t) => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  assert.equal(packageJson.name, "@hoplittlebunny/write-like-me");
  assert.equal(packageJson.bin["write-like-me"], "bin/install.js");

  const npmCache = fs.mkdtempSync(path.join(os.tmpdir(), "write-like-me-npm-cache-"));
  t.after(() => fs.rmSync(npmCache, { recursive: true, force: true }));

  const result = spawnSync(NPM, ["pack", "--dry-run", "--json"], {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: npmCache },
  });
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout)[0];
  const files = new Set(report.files.map((file) => file.path));
  assert.equal(files.has("bin/install.js"), true);
  assert.equal(files.has("skills/write-like-me/SKILL.md"), true);
  assert.equal(files.has("skills/write-like-me/references/language-variety-contract.md"), true);
  assert.equal(files.has("skills/write-like-me/tests/test_package_contract.py"), false);
  assert.equal(files.has("website/app/page.tsx"), false);
});
