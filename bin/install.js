#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const PACKAGE_ROOT = path.resolve(__dirname, "..");
const PACKAGE_JSON = JSON.parse(
  fs.readFileSync(path.join(PACKAGE_ROOT, "package.json"), "utf8"),
);
const SKILL_SOURCE = path.join(PACKAGE_ROOT, "skills", "write-like-me");
const SKILL_NAME = "write-like-me";
const RUNTIME_SCRIPTS = new Set([
  "build_starter_voice_file.py",
  "update_writing_pattern.py",
  "verify_rewrite.py",
]);

function fail(message, code = 1) {
  const error = new Error(message);
  error.exitCode = code;
  throw error;
}

function parseArgs(argv) {
  const options = {
    action: "install",
    agents: new Set(),
    all: false,
    dryRun: false,
    force: false,
    help: false,
    list: false,
  };
  let actionCount = 0;

  for (const arg of argv) {
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--force") options.force = true;
    else if (arg === "--all") options.all = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--list") options.list = true;
    else if (arg === "--uninstall" || arg === "--restore") {
      options.action = arg.slice(2);
      actionCount += 1;
    } else if (arg.startsWith("--agent=")) {
      for (const agent of arg.slice("--agent=".length).split(",")) {
        if (agent.trim()) options.agents.add(agent.trim());
      }
    } else {
      fail(`Unknown option: ${arg}\nRun with --help to see supported options.`, 2);
    }
  }

  if (actionCount > 1) fail("Choose only one of --uninstall or --restore.", 2);
  if (options.all && options.agents.size > 0) {
    fail("Use either --all or --agent, not both.", 2);
  }
  return options;
}

function helpText() {
  return `Write Like Me by HopLittleBunny ${PACKAGE_JSON.version}

Usage:
  npx @hoplittlebunny/write-like-me [options]

Options:
  --agent=claude,codex  Target one or more supported agents
  --all                 Target Claude, Codex, Cursor, and Gemini
  --list                Show detected agents and install destinations
  --dry-run             Print planned changes without writing files
  --uninstall           Remove unchanged files installed by this package
  --restore             Restore the latest recorded pre-install files
  --force               Back up and replace a locally modified installed file
  --help, -h            Show this help

Without --agent or --all, the installer targets supported agents detected on
this computer. It aborts if none are detected. Raw writing samples are never
created or stored by the installer.`;
}

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Cannot read installer manifest ${filePath}: ${error.message}`);
  }
}

function assertWithin(candidate, root, label) {
  const resolvedCandidate = path.resolve(candidate);
  const resolvedRoot = path.resolve(root);
  const relative = path.relative(resolvedRoot, resolvedCandidate);
  if (relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative))) {
    return resolvedCandidate;
  }
  fail(`Refusing unsafe ${label} outside ${resolvedRoot}: ${resolvedCandidate}`);
}

function assertWritableFileTarget(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stat = fs.lstatSync(filePath);
  if (stat.isSymbolicLink()) fail(`Refusing to replace symbolic link: ${filePath}`);
  if (!stat.isFile()) fail(`Refusing to replace non-file path: ${filePath}`);
}

function atomicWrite(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  assertWritableFileTarget(filePath);
  const tempPath = `${filePath}.tmp-${process.pid}-${crypto.randomBytes(4).toString("hex")}`;
  fs.writeFileSync(tempPath, content, { mode: 0o644 });
  try {
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    throw error;
  }
}

function removeEmptyParents(start, stop) {
  let current = path.resolve(start);
  const boundary = path.resolve(stop);
  while (current === boundary || current.startsWith(`${boundary}${path.sep}`)) {
    try {
      fs.rmdirSync(current);
    } catch {
      break;
    }
    if (current === boundary) break;
    current = path.dirname(current);
  }
}

function listReferenceFiles() {
  const root = path.join(SKILL_SOURCE, "references");
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join("references", entry.name))
    .sort();
}

function runtimeSkillFiles({ includeOpenAiMetadata }) {
  const relativePaths = [
    "SKILL.md",
    ...listReferenceFiles(),
    ...[...RUNTIME_SCRIPTS].sort().map((name) => path.join("scripts", name)),
  ];
  if (includeOpenAiMetadata) relativePaths.push(path.join("agents", "openai.yaml"));
  return relativePaths.map((relativePath) => ({
    relativePath,
    content: fs.readFileSync(path.join(SKILL_SOURCE, relativePath)),
  }));
}

function targetDefinitions(home) {
  const codexDetect = [path.join(home, ".codex"), path.join(home, ".agents")];
  return {
    claude: {
      id: "claude",
      label: "Claude Code",
      detected: fs.existsSync(path.join(home, ".claude")),
      root: path.join(home, ".claude", "skills", SKILL_NAME),
      files() {
        return runtimeSkillFiles({ includeOpenAiMetadata: false });
      },
    },
    codex: {
      id: "codex",
      label: "Codex",
      detected: codexDetect.some((candidate) => fs.existsSync(candidate)),
      root: path.join(home, ".agents", "skills", SKILL_NAME),
      files() {
        return runtimeSkillFiles({ includeOpenAiMetadata: true });
      },
    },
    cursor: {
      id: "cursor",
      label: "Cursor",
      detected: fs.existsSync(path.join(home, ".cursor")),
      root: path.join(home, ".cursor", "skills", SKILL_NAME),
      files() {
        return runtimeSkillFiles({ includeOpenAiMetadata: false });
      },
    },
    gemini: {
      id: "gemini",
      label: "Gemini CLI",
      detected: fs.existsSync(path.join(home, ".gemini")),
      root: path.join(home, ".gemini", "extensions", SKILL_NAME),
      files() {
        const manifest = Buffer.from(
          `${JSON.stringify(
            {
              name: SKILL_NAME,
              version: PACKAGE_JSON.version,
              description: PACKAGE_JSON.description,
            },
            null,
            2,
          )}\n`,
        );
        return [
          { relativePath: "gemini-extension.json", content: manifest },
          ...runtimeSkillFiles({ includeOpenAiMetadata: false }).map((file) => ({
            relativePath: path.join("skills", SKILL_NAME, file.relativePath),
            content: file.content,
          })),
        ];
      },
    },
  };
}

function selectTargets(options, definitions) {
  const supported = new Set(Object.keys(definitions));
  for (const agent of options.agents) {
    if (!supported.has(agent)) {
      fail(`Unsupported agent "${agent}". Choose claude, codex, cursor, or gemini.`, 2);
    }
  }

  if (options.all) return Object.values(definitions);
  if (options.agents.size > 0) {
    return [...options.agents].map((agent) => definitions[agent]);
  }
  return Object.values(definitions).filter((target) => target.detected);
}

function flattenPreviousFiles(manifest) {
  const records = new Map();
  if (!manifest || !Array.isArray(manifest.targets)) return records;
  for (const target of manifest.targets) {
    if (!Array.isArray(target.files)) continue;
    for (const file of target.files) records.set(path.resolve(file.path), file);
  }
  return records;
}

function backupStamp() {
  return new Date().toISOString().replace(/[-:.TZ]/g, "");
}

function preflightInstall(targets, previous, stateRoot, options) {
  const previousFiles = flattenPreviousFiles(previous);
  const stamp = backupStamp();
  const plan = [];

  for (const target of targets) {
    for (const source of target.files()) {
      const destination = assertWithin(
        path.join(target.root, source.relativePath),
        target.root,
        "install path",
      );
      assertWritableFileTarget(destination);
      const installedSha = sha256(source.content);
      const previousRecord = previousFiles.get(destination);
      let currentSha = null;
      let backupPath = previousRecord?.backupPath || null;

      if (fs.existsSync(destination)) {
        currentSha = sha256(fs.readFileSync(destination));
        const modifiedInstalledFile =
          previousRecord &&
          currentSha !== previousRecord.sha256 &&
          currentSha !== installedSha;
        if (modifiedInstalledFile && !options.force) {
          fail(
            `Local changes detected in ${destination}. Re-run with --force to back them up and install, or keep the current file.`,
          );
        }

        const needsFreshBackup = !previousRecord || modifiedInstalledFile;
        if (needsFreshBackup) {
          backupPath = assertWithin(
            path.join(stateRoot, "backups", stamp, target.id, source.relativePath),
            path.join(stateRoot, "backups"),
            "backup path",
          );
        }
      }

      plan.push({
        agent: target.id,
        targetRoot: target.root,
        relativePath: source.relativePath,
        destination,
        content: source.content,
        sha256: installedSha,
        currentSha,
        backupPath,
        createBackup: Boolean(backupPath && (!previousRecord || currentSha !== previousRecord.sha256)),
      });
    }
  }
  return plan;
}

function install(targets, manifestPath, stateRoot, options) {
  const previous = readJson(manifestPath);
  const plan = preflightInstall(targets, previous, stateRoot, options);

  for (const file of plan) {
    const state = file.currentSha === file.sha256 ? "unchanged" : "write";
    console.log(`${options.dryRun ? "would " : ""}${state}: ${file.destination}`);
    if (options.dryRun) continue;
    if (file.createBackup && fs.existsSync(file.destination)) {
      fs.mkdirSync(path.dirname(file.backupPath), { recursive: true });
      fs.copyFileSync(file.destination, file.backupPath);
      console.log(`backup: ${file.backupPath}`);
    }
    if (file.currentSha !== file.sha256) atomicWrite(file.destination, file.content);
  }

  if (options.dryRun) return;
  const manifest = {
    schemaVersion: 1,
    packageName: PACKAGE_JSON.name,
    version: PACKAGE_JSON.version,
    installedAt: new Date().toISOString(),
    status: "installed",
    targets: targets.map((target) => ({
      agent: target.id,
      root: target.root,
      files: plan
        .filter((file) => file.agent === target.id)
        .map((file) => ({
          path: file.destination,
          relativePath: file.relativePath,
          sha256: file.sha256,
          backupPath: file.backupPath,
        })),
    })),
  };
  atomicWrite(manifestPath, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  console.log(`manifest: ${manifestPath}`);
}

function validatedManifestRecords(manifest, definitions, stateRoot) {
  if (!manifest || manifest.schemaVersion !== 1 || !Array.isArray(manifest.targets)) {
    fail("No valid Write Like Me installation manifest was found.");
  }
  const records = [];
  for (const targetRecord of manifest.targets) {
    const definition = definitions[targetRecord.agent];
    if (!definition) fail(`Manifest contains unsupported agent: ${targetRecord.agent}`);
    if (path.resolve(targetRecord.root) !== path.resolve(definition.root)) {
      fail(`Manifest target root does not match the current home directory for ${targetRecord.agent}.`);
    }
    for (const file of targetRecord.files || []) {
      const filePath = assertWithin(file.path, definition.root, "manifest install path");
      let backupPath = null;
      if (file.backupPath) {
        backupPath = assertWithin(
          file.backupPath,
          path.join(stateRoot, "backups"),
          "manifest backup path",
        );
      }
      records.push({ ...file, path: filePath, backupPath, targetRoot: definition.root });
    }
  }
  return records;
}

function uninstall(manifest, manifestPath, definitions, stateRoot, options) {
  const records = validatedManifestRecords(manifest, definitions, stateRoot);
  for (const file of records) {
    if (!fs.existsSync(file.path)) {
      console.log(`missing: ${file.path}`);
      continue;
    }
    assertWritableFileTarget(file.path);
    const currentSha = sha256(fs.readFileSync(file.path));
    if (currentSha !== file.sha256) {
      console.log(`kept modified: ${file.path}`);
      continue;
    }
    console.log(`${options.dryRun ? "would remove" : "remove"}: ${file.path}`);
    if (!options.dryRun) {
      fs.unlinkSync(file.path);
      removeEmptyParents(path.dirname(file.path), file.targetRoot);
    }
  }
  if (!options.dryRun) {
    manifest.status = "uninstalled";
    manifest.updatedAt = new Date().toISOString();
    atomicWrite(manifestPath, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  }
}

function restore(manifest, manifestPath, definitions, stateRoot, options) {
  const records = validatedManifestRecords(manifest, definitions, stateRoot);
  for (const file of records) {
    if (file.backupPath && fs.existsSync(file.backupPath)) {
      if (fs.existsSync(file.path)) {
        assertWritableFileTarget(file.path);
        const currentSha = sha256(fs.readFileSync(file.path));
        if (currentSha !== file.sha256 && !options.force) {
          console.log(`kept modified: ${file.path}`);
          continue;
        }
      }
      console.log(`${options.dryRun ? "would restore" : "restore"}: ${file.path}`);
      if (!options.dryRun) atomicWrite(file.path, fs.readFileSync(file.backupPath));
      continue;
    }

    if (!fs.existsSync(file.path)) continue;
    assertWritableFileTarget(file.path);
    const currentSha = sha256(fs.readFileSync(file.path));
    if (currentSha === file.sha256) {
      console.log(`${options.dryRun ? "would remove" : "remove"}: ${file.path}`);
      if (!options.dryRun) {
        fs.unlinkSync(file.path);
        removeEmptyParents(path.dirname(file.path), file.targetRoot);
      }
    } else {
      console.log(`kept modified: ${file.path}`);
    }
  }
  if (!options.dryRun) {
    manifest.status = "restored";
    manifest.updatedAt = new Date().toISOString();
    atomicWrite(manifestPath, Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(helpText());
    return;
  }

  const home = path.resolve(process.env.WRITE_LIKE_ME_INSTALL_HOME || os.homedir());
  const stateRoot = path.join(home, ".write-like-me");
  const manifestPath = path.join(stateRoot, "install-manifest.json");
  const definitions = targetDefinitions(home);

  if (options.list) {
    for (const target of Object.values(definitions)) {
      console.log(`${target.detected ? "detected" : "not detected"}: ${target.label} -> ${target.root}`);
    }
    return;
  }

  if (options.action === "install") {
    const targets = selectTargets(options, definitions);
    if (targets.length === 0) {
      fail("No supported local agents were detected. Use --agent=<name> or --all to choose an explicit target.", 2);
    }
    install(targets, manifestPath, stateRoot, options);
    return;
  }

  const manifest = readJson(manifestPath);
  if (options.action === "uninstall") {
    uninstall(manifest, manifestPath, definitions, stateRoot, options);
  } else {
    restore(manifest, manifestPath, definitions, stateRoot, options);
  }
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = error.exitCode || 1;
}
