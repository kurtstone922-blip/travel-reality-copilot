# Changelog

## 0.1.0-alpha — 2026-09-03

Initial GitHub Alpha candidate.

### Added

- Core Orchestrator and compact Core Prompt.
- Canonical Trip State schema, full example and Lite State example.
- Route Skeleton Skill.
- Place Discovery Skill.
- Stay Strategy Skill.
- Dining Strategy Skill.
- Itinerary Arranger Skill with opt-in Plan B.
- Route Validator Skill.
- Scoped patch, revision and confirmation-boundary rules.
- Codex Plugin manifest.
- Evaluation cases for all seven Skills.
- Repeatable contract test with 75 passing checks.
- Locally installed Codex Plugin verification.
- Fresh-task black-box behavior suite with 5 passing interaction cases.
- Personal Evaluation License for private, non-commercial testing only.

### Known limitations

- Model behavior varies across hosts.
- Live maps, transport, images and file export depend on host capabilities.
- No bundled booking, map or hotel API.
- Structured patch enforcement is prompt-level unless the host adds a deterministic runtime.
- Broader cross-host and regression testing is required before a stable release.
