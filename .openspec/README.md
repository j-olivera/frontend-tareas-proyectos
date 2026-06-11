# OpenSpec SDD Artifacts

This directory contains the Spec-Driven Development (SDD) artifacts for the `frontend-tareas-proyectos` project.

## Structure

- `config.yaml`: SDD configuration and project context.
- `specs/`: Main specifications (source of truth).
- `changes/`: Active and archived changes.
  - `archive/`: Completed changes moved here after merging.

## Workflow

1. `/sdd-new <change>`: Starts a new change in `changes/{change-name}/`.
2. `/sdd-ff <change>`: Fast-forwards planning.
3. `/sdd-apply`: Implements the tasks.
4. `/sdd-verify`: Validates the implementation.
5. `/sdd-archive`: Merges deltas and moves the change to `archive/`.

For more details, see the shared `openspec-convention.md`.
