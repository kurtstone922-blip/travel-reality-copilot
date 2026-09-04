#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.argv[2] || path.join(import.meta.dirname, ".."));
const failures = [];
const passes = [];

function check(condition, label, detail = "") {
  if (condition) passes.push(label);
  else failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

function walk(value, visit) {
  visit(value);
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => walk(item, visit));
}

const manifest = readJson(".codex-plugin/plugin.json");
check(manifest.name === path.basename(root), "Manifest name matches plugin root");
check(/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(manifest.version), "Manifest uses semantic version");
check(manifest.skills === "./skills/", "Manifest declares the skills directory");
check(Boolean(manifest.author?.name), "Manifest declares an author");
check(Boolean(manifest.interface?.displayName && manifest.interface?.shortDescription && manifest.interface?.longDescription), "Manifest includes required interface copy");
check((manifest.interface?.defaultPrompt || []).length > 0 && manifest.interface.defaultPrompt.length <= 3, "Manifest includes 1–3 starter prompts");

const skillRoot = path.join(root, "skills");
const skillDirectories = fs.readdirSync(skillRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
check(skillDirectories.length === 8, "Capability pack contains eight skills", `found ${skillDirectories.length}`);

const expectedSkills = new Set([
  "travel-copilot-orchestrator",
  "travel-route-skeleton",
  "travel-place-discovery",
  "travel-stay-strategy",
  "travel-dining-strategy",
  "travel-itinerary-arranger",
  "travel-route-validator"
  ,"travel-roadbook-export"
]);

for (const directory of skillDirectories) {
  const skillFile = path.join(skillRoot, directory.name, "SKILL.md");
  check(fs.existsSync(skillFile), `${directory.name} has SKILL.md`);
  if (!fs.existsSync(skillFile)) continue;
  const text = fs.readFileSync(skillFile, "utf8");
  const name = text.match(/^---\s*[\s\S]*?^name:\s*([^\n]+)$/m)?.[1]?.trim();
  const description = text.match(/^---\s*[\s\S]*?^description:\s*([^\n]+)$/m)?.[1]?.trim();
  check(name === directory.name, `${directory.name} frontmatter name matches folder`, `found ${name || "missing"}`);
  check(Boolean(description), `${directory.name} has a discovery description`);
  expectedSkills.delete(directory.name);

  const referencedPaths = [...text.matchAll(/`((?:\.\.\/)+[^`]+\.(?:md|json))`/g)].map((match) => match[1]);
  for (const referencedPath of referencedPaths) {
    check(fs.existsSync(path.resolve(path.dirname(skillFile), referencedPath)), `${directory.name} reference resolves: ${referencedPath}`);
  }
}
check(expectedSkills.size === 0, "All expected skills are present", [...expectedSkills].join(", "));

const schema = readJson("core/trip-state.schema.json");
const fullExample = readJson("core/trip-state.example.json");
const liteExample = readJson("core/trip-state-lite.example.json");
check(schema.$schema?.includes("2020-12"), "Trip State uses JSON Schema 2020-12");
check(fullExample.schema_version === schema.properties.schema_version.const, "Full example matches schema version");
check(schema.required.every((key) => Object.hasOwn(fullExample, key)), "Full example contains every required top-level field");
check(!Object.hasOwn(fullExample, "messages") && !Object.hasOwn(fullExample, "recent_messages"), "Canonical Trip State excludes conversation transcript");
check(Boolean(liteExample.active_scope && liteExample.current_phase), "Lite State contains routing scope and phase");
check(!Object.hasOwn(liteExample, "place_discovery") && !Object.hasOwn(liteExample, "validation"), "Lite State is a scoped projection, not a full-state copy");

const definitions = new Set(Object.keys(schema.$defs || {}));
const missingDefinitions = new Set();
walk(schema, (node) => {
  if (node && typeof node === "object" && typeof node.$ref === "string" && node.$ref.startsWith("#/$defs/")) {
    const name = node.$ref.slice("#/$defs/".length);
    if (!definitions.has(name)) missingDefinitions.add(name);
  }
});
check(missingDefinitions.size === 0, "Every local JSON Schema reference resolves", [...missingDefinitions].join(", "));

const corePrompt = read("core/core-prompt-v0.1.md");
const orchestrator = read("skills/travel-copilot-orchestrator/SKILL.md");
const routing = read("skills/travel-copilot-orchestrator/references/routing.md");
const contract = read("skills/travel-copilot-orchestrator/references/input-output-contract.md");
const stateGuide = read("core/STATE.md");
const conversationProtocol = read("skills/travel-copilot-orchestrator/references/conversation-protocol.md");
const universalPrompt = read("Travel-Reality-Copilot-Universal-Prompt-v0.1.2.md");
const arranger = read("skills/travel-itinerary-arranger/SKILL.md");
const dining = read("skills/travel-dining-strategy/SKILL.md");
const roadbook = read("skills/travel-roadbook-export/SKILL.md");

const behavioralChecks = [
  [corePrompt.includes("Never choose the mode for the traveler"), "Generation mode remains traveler-chosen"],
  [corePrompt.includes("At a decision point, stop and wait"), "Core Prompt stops at decision points"],
  [orchestrator.includes("Do not preload every child Skill"), "Orchestrator uses progressive Skill loading"],
  [orchestrator.includes("one primary Skill"), "Orchestrator selects one primary Skill"],
  [orchestrator.includes("resume point"), "Orchestrator preserves interruption resume points"],
  [conversationProtocol.includes("pending_confirmation"), "Conversation protocol persists pending confirmation"],
  [conversationProtocol.includes("unanswered"), "Conversation protocol distinguishes unanswered fields"],
  [conversationProtocol.includes("Actionable endings"), "Conversation protocol requires actionable endings"],
  [routing.includes("One visible decision topic"), "Routing permits grouped questions within one decision topic"],
  [routing.includes("Restaurant plus route feasibility"), "Routing covers dining plus feasibility"],
  [routing.includes("City-day compression"), "Routing covers structural compression"],
  [contract.includes('"wait_for_user": false'), "Structured output exposes wait state"],
  [contract.includes("must not be applied yet"), "Decision patches remain unapplied"],
  [stateGuide.includes("Do not store the full conversation transcript"), "State contract excludes full transcripts"],
  [stateGuide.includes("External reservation status never changes"), "State contract separates external reservations"],
  [stateGuide.includes('"pending_confirmation"'), "Runtime Session stores open confirmation"],
  [universalPrompt.includes("Gemini、DeepSeek、Kimi"), "Universal Prompt declares general-model use"],
  [universalPrompt.includes("插入问题解决后"), "Universal Prompt restores interrupted decisions"]
  ,[arranger.includes("D. 自定义安排"), "Day by Day offers custom arrangement"]
  ,[arranger.includes("transport_batch"), "Arranger supports batch transport refinement"]
  ,[dining.includes("Postponement is not omission"), "Deferred dining is explicitly resurfaced"]
  ,[stateGuide.includes("Completion ledger"), "State contract defines trip completion ledger"]
  ,[roadbook.includes("render-roadbook.mjs"), "Roadbook Skill uses deterministic HTML renderer"]
  ,[universalPrompt.includes("一键细化全部日期"), "Universal Prompt exposes transport refinement modes"]
  ,[universalPrompt.includes("HTML 应是无框架"), "Universal Prompt includes low-token local HTML behavior"]
];
for (const [condition, label] of behavioralChecks) check(condition, label);

const evalFiles = fs.readdirSync(path.join(root, "evals")).filter((name) => name.endsWith("-cases-v0.1.md"));
check(evalFiles.length === 8, "Every Skill has an evaluation case file", `found ${evalFiles.length}`);
for (const evalFile of evalFiles) {
  const caseCount = [...read(`evals/${evalFile}`).matchAll(/^##\s+(?:Case\s+)?\d+(?:\.|｜)/gm)].length;
  check(caseCount >= 5, `${evalFile} contains at least five cases`, `found ${caseCount}`);
}

for (const label of passes) console.log(`PASS  ${label}`);
for (const failure of failures) console.error(`FAIL  ${failure}`);
console.log(`\n${passes.length} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
