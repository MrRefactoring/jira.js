import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

function markerPath(repoRoot: string): string {
  return join(repoRoot, 'node_modules', '.cache', 'jsm-servicedesk-licensed');
}

export function recordServiceDeskLicence(repoRoot: string, licensed: boolean): void {
  const path = markerPath(repoRoot);

  if (!licensed) {
    rmSync(path, { force: true });

    return;
  }

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, '', 'utf8');
}

export function serviceDeskWasLicensed(repoRoot: string): boolean {
  return existsSync(markerPath(repoRoot));
}
