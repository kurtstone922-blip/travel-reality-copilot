# Installation and usage

This Alpha can be used in three ways. Capability availability differs by host.

## Option A｜Install the Skills in Codex

This is the most direct Alpha-testing route.

1. Download or clone this repository.
2. Copy the seven folders inside `skills/` into your Codex Skills directory:

```text
~/.codex/skills/
```

3. Start a new Codex task so the newly installed Skills can be discovered.
4. Invoke the orchestrator explicitly for the first test:

```text
$travel-copilot-orchestrator 我想去日本 10 天，请一步步和我规划。
```

Codex can also install Skills from a GitHub repository path. After this repository has a final GitHub URL, each Skill can be installed from its corresponding `skills/<skill-name>` path.

## Option B｜Use as a Codex Plugin Alpha

The repository root already contains:

```text
.codex-plugin/plugin.json
```

and passes the Codex local Plugin Validator. During local development, add the repository through a local Codex marketplace or the Codex plugin-development interface available in your installed version, then start a new task after installation or update.

The exact marketplace command is intentionally not hard-coded here because the local marketplace name and repository location belong to the user's machine. The validated plugin identifier is:

```text
travel-copilot-kit-v0.1
```

## Option C｜Use in a general conversational model

Models without Skill discovery cannot automatically load this folder as a Codex Plugin.

For a manual test:

1. provide `core/core-prompt-v0.1.md` as the main instruction;
2. provide a new or existing Trip State;
3. provide only the relevant Skill for the current task;
4. after each confirmed decision, update the Trip State and remove unnecessary old conversation turns.

For example:

- route planning → Core Prompt + Route Skeleton;
- hotel decision → Core Prompt + Stay Strategy;
- day validation → Core Prompt + Route Validator.

Sending every Skill and every reference on every turn defeats the context-saving design.

## Host capability differences

The capability pack does not bundle paid APIs. Detect and record what the host can actually use:

```json
{
  "web_search": true,
  "maps": "native",
  "live_transport": false,
  "images": true,
  "file_export": ["markdown", "html", "pdf", "json"]
}
```

- Native map/search host: the Skill may use those tools and attach evidence.
- Link-only host: generate Google Maps or Amap search/route links when possible.
- No live transport: use estimates, mark them unverified and create a verification task.
- No images: omit images without blocking discovery.

## Update behavior

When replacing a local plugin version, reinstall it and begin the behavioral test in a new Codex task so the updated Skills are loaded. Trip State files can be exported before a major revision and loaded into the new task without carrying the entire old conversation.

## Uninstall

For a Skills-only installation, remove only the seven matching `travel-*` Skill folders that were installed from this repository. Do not remove the entire Codex Skills directory.

For a plugin installation, use the plugin removal flow provided by the installed Codex version.
