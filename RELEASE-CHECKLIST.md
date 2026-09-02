# GitHub Alpha Release Checklist

Last reviewed: 2026-09-03

## Package integrity

- [x] Plugin root and manifest name match.
- [x] Manifest uses semantic version `0.1.0`.
- [x] Orchestrator and six business Skills are discoverable.
- [x] Skill frontmatter and referenced files validate.
- [x] JSON files parse successfully.
- [x] Local JSON Schema references resolve.
- [x] Markdown links resolve.
- [x] Automated contract test passes: 75/75.
- [x] Codex local Plugin Validator passes.

## Publication hygiene

- [x] Security, privacy and rights review recorded in `SECURITY-PRIVACY-REVIEW.md`.
- [x] No API keys, secrets, passwords or access Tokens detected.
- [x] No personal absolute filesystem paths detected.
- [x] No `.DS_Store`, temporary, backup or editor files remain.
- [x] No unresolved TODO/FIXME/TBD markers detected.
- [x] Schema identifier does not depend on an unpublished URL.
- [x] Package size is suitable for a source repository: approximately 316 KB.
- [x] `.gitignore` excludes local Trip State and generated exports.
- [x] `.gitignore` excludes common environment, certificate, key-store and credential files.

## Product and documentation

- [x] English is the primary README language.
- [x] Chinese summary is available.
- [x] Product problem and participatory-planning strategy are explained.
- [x] Web Demo and capability-pack roles are distinguished.
- [x] Architecture and state diagrams are included.
- [x] Installation paths and host capability differences are documented.
- [x] Example conversations cover core interaction patterns.
- [x] Alpha limitations are visible.

## Rights and licensing

- [x] Previous permissive/open-source license references removed.
- [x] Personal Evaluation License included.
- [x] Plugin manifest uses `LicenseRef-Personal-Evaluation-Only`.
- [x] Personal, non-commercial evaluation is permitted.
- [x] Redistribution, modified publication, commercial use and product integration require written permission.

## Required before publishing

- [x] Install the Plugin or Skills locally in Codex (`travel-copilot-kit-v0-1@personal`).
- [x] Run model-level tests in a fresh Codex task.
- [x] Record actual outputs for five critical interaction cases: 5/5 passed.
- [ ] Decide whether the GitHub repository is private or public.
- [ ] Choose the final repository name.
- [ ] Add the final repository URL to the manifest after creation.
- [ ] Review the custom License with qualified legal counsel if legal enforceability is important.

Note: the local Plugin scaffolder normalized the source folder name `travel-copilot-kit-v0.1` to the Plugin ID `travel-copilot-kit-v0-1`. Choose one final naming convention before publishing.

## Recommended first release

Use a private GitHub repository for the first Alpha. Share access only with selected reviewers or interviewers. A public repository allows anyone to view and technically copy the files even when the License prohibits redistribution or reuse.
