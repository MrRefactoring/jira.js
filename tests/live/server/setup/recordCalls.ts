/**
 * Records which Data Center endpoints a run actually called.
 *
 * The suites drive the surface through the generated functions, and there is no way from the outside to tell which of
 * the four hundred and thirty-five were reached — so a domain that quietly stops being exercised looks exactly like
 * one that passes. Wrapping `fetch` is what makes the difference visible: every request the client sends leaves a
 * line, and `scripts/serverCoverage.ts` matches those lines back against the endpoints the library ships.
 *
 * `fetch` rather than the client, because `src/core` ships to browsers and cannot reach the filesystem, and because a
 * request that never goes out is not coverage regardless of which function was called.
 *
 * Appended rather than rewritten, from both sides of the run: vitest isolates each test file, so this module is
 * evaluated once per file, and the fixtures run in the main process where none of that applies. Duplicate lines cost
 * nothing to collapse.
 */
import { appendFileSync } from 'node:fs';

const OUTPUT = process.env.SERVER_COVERAGE_OUTPUT;

const calls: string[] = [];

if (OUTPUT) {
  const original = globalThis.fetch;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();

    try {
      calls.push(`${method} ${new URL(url).pathname}`);
    } catch {
      // A request whose URL will not parse is not one of ours, and losing it from the ledger is better than ending
      // the run over it.
    }

    return original(input, init);
  };
}

/** Appends what has been recorded so far. Called from the worker after each file, and from the global setup. */
export function flushRecordedCalls(): void {
  if (!OUTPUT || calls.length === 0) return;

  appendFileSync(OUTPUT, `${calls.join('\n')}\n`, 'utf8');
  calls.length = 0;
}
