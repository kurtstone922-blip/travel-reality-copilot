# Architecture

## System view

```mermaid
flowchart TD
    U[Traveler input<br/>voice, text, selections] --> O[Core Orchestrator]
    O --> L[Build scoped Lite State]
    L --> R{Select primary Skill}
    R --> RS[Route Skeleton]
    R --> PD[Place Discovery]
    R --> SS[Stay Strategy]
    R --> DS[Dining Strategy]
    R --> IA[Itinerary Arranger]
    R --> RV[Route Validator]
    R --> RE[Roadbook Export]

    RS --> P[Scoped patch proposal]
    PD --> P
    SS --> P
    DS --> P
    IA --> P
    RV --> P
    RE --> P

    P --> D{Decision boundary?}
    D -- Yes --> C[Present one decision<br/>and wait for traveler]
    C --> U
    D -- No --> M[Apply patch and<br/>increment revision]
    M --> T[(Canonical Trip State)]
    T --> O
    T --> CL[Completion Ledger]
    CL --> O
    T --> E[Roadbook export<br/>Markdown / HTML / PDF / JSON]
```

## Why an Orchestrator

The Orchestrator keeps the product from becoming one giant Prompt that must be reread on every turn. It decides which Skill owns the current output, passes only relevant state and combines supporting checks into one traveler-facing interaction.

## State model

```mermaid
flowchart LR
    S[(Full Trip State)] --> V[Scope projector]
    V --> LS[Lite State]
    LS --> K[Selected Skill]
    K --> PP[Patch proposal]
    PP --> G{Traveler decision needed?}
    G -- Yes --> W[Wait]
    G -- No --> A[Apply]
    W --> A
    A --> S2[(Trip State revision + 1)]
```

The full Trip State is durable. Lite State is disposable and must not become a second source of truth. Runtime conversation state is stored separately.

## Ownership and handoffs

```text
Route Skeleton
  └─ confirmed corridor and allocation
       ├─ Place Discovery → selected experience IDs
       ├─ Stay Strategy → lodging anchors
       ├─ Dining Strategy → meal anchors
       └─ Itinerary Arranger → proposed days and route legs
                              └─ Route Validator → issues/evidence
                                                     └─ traveler decision
```

The handoff is state-based rather than transcript-based. Skills exchange IDs, scoped fields and patches instead of passing entire conversations.

## Evidence model

Time-sensitive facts can be:

- `not_checked`
- `unverified`
- `partially_verified`
- `verified`
- `source_conflict`

A map link is a navigation affordance, not proof that a timetable or opening time is correct. Precise services require a live or source-backed capability.

## Confirmation boundary

The Agent can apply non-destructive annotations and calculations. It must wait before changing traveler-owned route structure, personal-priority items, lodging, reservations or accepted risk.

This boundary is both a UX rule and a state rule: a pending decision contains proposed operations, while the canonical state remains unchanged until confirmation.
