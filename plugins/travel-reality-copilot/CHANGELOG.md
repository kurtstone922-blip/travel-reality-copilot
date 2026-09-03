# Changelog

## 0.1.1-alpha — 2026-09-03

### Changed

- Added durable conversational open-loop handling for pending confirmations, deferred questions, resume points and next actions.
- Side questions now return to the interrupted Day by Day confirmation.
- Replaced “one visible question” with one decision topic containing up to four related numbered questions.
- Missing answers are no longer treated as an implicit skip.
- Added proactive lodging and dining checkpoints for each relevant city/stay block.
- Every active conversation now ends with an explicit continuation or action menu.
- Added a portable single-file Universal Prompt for Gemini, DeepSeek, Kimi and similar models.

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
