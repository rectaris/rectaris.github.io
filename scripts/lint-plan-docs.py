#!/usr/bin/env python3
"""Lint generic plan files and allocate plan ids."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import planlib


def fail(message: str) -> None:
    print(f"plan lint failed: {message}", file=sys.stderr)
    raise SystemExit(1)


def plan_ids() -> set[int]:
    return planlib.plan_ids()


def next_id() -> str:
    return planlib.next_id()


def lint_plan_index() -> None:
    for error in planlib.validate_active_index():
        fail(error)


def lint_checked_index() -> None:
    for error in planlib.validate_checked_index():
        fail(error)


def lint_manifest(path: Path) -> None:
    for error in planlib.validate_manifest(path):
        fail(error)


def lint_manifests() -> None:
    for path in planlib.active_plan_paths():
        lint_manifest(path)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--next-id", action="store_true", help="print the next available plan id")
    parser.add_argument("--print-context", metavar="PLAN", help="print shell context for a plan manifest")
    parser.add_argument("--add-active", nargs=2, metavar=("ID", "PATH"), help="add or replace an active index row")
    parser.add_argument("--remove-active", metavar="ID", help="remove an active index row")
    parser.add_argument("--append-checked", nargs=2, metavar=("ID", "PATH"), help="append a checked index row")
    args = parser.parse_args()
    if args.next_id:
        print(next_id())
        return 0
    if args.print_context:
        try:
            print("\n".join(planlib.context_lines(Path(args.print_context))))
        except planlib.PlanError as exc:
            print(str(exc), file=sys.stderr)
            return 1
        return 0
    if args.add_active:
        planlib.add_active(args.add_active[0], args.add_active[1])
        return 0
    if args.remove_active:
        planlib.remove_active(args.remove_active)
        return 0
    if args.append_checked:
        planlib.append_checked(args.append_checked[0], args.append_checked[1])
        return 0
    lint_plan_index()
    lint_checked_index()
    lint_manifests()
    print("plan docs lint passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
