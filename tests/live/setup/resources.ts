/**
 * LIFO cleanup stack for live-test resources.
 *
 * Suites register teardown closures with {@link ResourceTracker.defer} as they
 * create resources, then call {@link ResourceTracker.cleanup} in `afterAll`.
 * Cleanup runs in reverse creation order (children before parents) and retries
 * each closure a few times — Jira Cloud deletes are frequently async and a
 * just-created resource can briefly 404/409 on delete.
 */
type CleanupFn = () => Promise<void>;

const CLEANUP_ATTEMPTS = 4;

export class ResourceTracker {
  private readonly stack: CleanupFn[] = [];

  /** Register a teardown closure; runs before everything deferred before it. */
  defer(fn: CleanupFn): void {
    this.stack.push(fn);
  }

  /** Run every deferred closure in reverse order, retrying transient failures. */
  async cleanup(): Promise<void> {
    const fns = this.stack.splice(0).reverse();

    for (const fn of fns) {
      for (let attempt = 0; attempt < CLEANUP_ATTEMPTS; attempt++) {
        try {
          await fn();
          break;
        } catch {
          if (attempt < CLEANUP_ATTEMPTS - 1) {
            await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
          }
        }
      }
    }
  }
}
