#!/usr/bin/env python3
"""Select and run validation commands from changed files."""

from __future__ import annotations

import argparse
import shlex
import subprocess
import sys
from pathlib import Path
from typing import Callable

try:
    import tomllib
except ModuleNotFoundError:  # pragma: no cover - compatibility for Python < 3.11.
    tomllib = None  # type: ignore[assignment]


ROOT = Path.cwd()
Command = list[str]
Predicate = Callable[[list[str]], bool]
CommandFactory = Callable[[list[str]], list[Command]]


def git(args: list[str]) -> list[str]:
    result = subprocess.run(["git", *args], cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, check=False)
    if result.returncode != 0:
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def changed_files(all_changes: bool) -> list[str]:
    staged = git(["diff", "--cached", "--name-only"])
    if staged and not all_changes:
        return staged
    paths = set(staged)
    paths.update(git(["diff", "--name-only"]))
    paths.update(git(["ls-files", "--others", "--exclude-standard"]))
    return sorted(paths)


def existing(path: str) -> bool:
    return (ROOT / path).exists()


def touches_shell(paths: list[str]) -> bool:
    return any(path.endswith(".sh") for path in paths)


def shell_syntax_commands(paths: list[str]) -> list[Command]:
    return [["sh", "-n", path] for path in paths if path.endswith(".sh") and existing(path)]


def python_compile_commands(paths: list[str]) -> list[Command]:
    py_files = [path for path in paths if path.endswith(".py") and existing(path)]
    if not py_files:
        return []
    return [["python3", "-m", "py_compile", *py_files]]


def touches_plan_or_scripts(paths: list[str]) -> bool:
    return any(path.startswith("docs/plan/") or path.startswith("scripts/") for path in paths)


def touches_plan(paths: list[str]) -> bool:
    return any(path.startswith("docs/plan/") for path in paths)


def touches_github_or_scripts(paths: list[str]) -> bool:
    return any(path.startswith(".github/") or path.startswith("scripts/") for path in paths)


def touches_agent_docs(paths: list[str]) -> bool:
    return any(path in {"AGENTS.md", "docs/agent/spec-index.yaml"} or path.startswith("docs/agent/") for path in paths)


VALIDATION_RULES: tuple[tuple[Predicate, str, CommandFactory], ...] = (
    (touches_shell, "", shell_syntax_commands),
    (lambda paths: bool(python_compile_commands(paths)), "", python_compile_commands),
    (
        touches_plan_or_scripts,
        "scripts/lint-plan-docs.py",
        lambda paths: [["python3", "scripts/lint-plan-docs.py"]],
    ),
    (
        touches_plan,
        "scripts/format-plan-docs.py",
        lambda paths: [["python3", "scripts/format-plan-docs.py", "--check"]],
    ),
    (
        touches_github_or_scripts,
        "scripts/security-static-check.py",
        lambda paths: [["python3", "scripts/security-static-check.py"]],
    ),
    (
        touches_agent_docs,
        "scripts/structure-map.py",
        lambda paths: [["python3", "scripts/structure-map.py", "--check"]],
    ),
)


def select_commands(paths: list[str]) -> list[Command]:
    commands: list[Command] = [["git", "diff", "--check"]]
    for predicate, required_path, factory in VALIDATION_RULES:
        if required_path and not existing(required_path):
            continue
        if predicate(paths):
            commands.extend(factory(paths))
    return commands


def validate_toml(paths: list[str]) -> int:
    toml_paths = [ROOT / path for path in paths if path.endswith(".toml") and existing(path)]
    if toml_paths and tomllib is None:
        print("TOML parse skipped: Python tomllib is unavailable", file=sys.stderr)
        return 0
    failed = 0
    for path in toml_paths:
        try:
            tomllib.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"TOML parse failed: {path.relative_to(ROOT)}: {exc}", file=sys.stderr)
            failed = 1
    return failed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--print-only", action="store_true")
    args = parser.parse_args()
    paths = changed_files(args.all)
    commands = select_commands(paths)
    for command in commands:
        print(shlex.join(command))
    if args.print_only:
        return 0
    for command in commands:
        result = subprocess.run(command, cwd=ROOT, check=False)
        if result.returncode != 0:
            return result.returncode
    toml_result = validate_toml(paths)
    if toml_result != 0:
        return toml_result
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
