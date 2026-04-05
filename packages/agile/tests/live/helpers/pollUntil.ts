export interface PollUntilOptions {
  maxAttempts?: number;
  intervalMs?: number;
  context?: string;
}

export async function pollUntil<T>(
  fn: () => Promise<T>,
  predicate: (val: T) => boolean,
  { maxAttempts = 8, intervalMs = 1500, context }: PollUntilOptions = {},
): Promise<T> {
  const startedAt = Date.now();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const value = await fn();

    if (predicate(value)) return value;

    if (attempt < maxAttempts - 1) {
      await new Promise<void>(resolve => setTimeout(resolve, intervalMs));
    }
  }

  const elapsedMs = Date.now() - startedAt;
  const tag = context ? ` [${context}]` : '';
  throw new Error(
    `pollUntil${tag}: condition not met after ${maxAttempts} attempts (${elapsedMs}ms elapsed, intervalMs=${intervalMs})`,
  );
}
