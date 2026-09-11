import { appendFileSync } from 'node:fs';

const OUTPUT = process.env.LIVE_COVERAGE_OUTPUT;

const calls: string[] = [];

if (OUTPUT) {
  const original = globalThis.fetch;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();

    try {
      calls.push(`${method} ${new URL(url).pathname}`);
    } catch {
    }

    return original(input, init);
  };
}

export function flushRecordedCalls(): void {
  if (!OUTPUT || calls.length === 0) return;

  appendFileSync(OUTPUT, `${calls.join('\n')}\n`, 'utf8');
  calls.length = 0;
}
