/**
 * Calls an endpoint for what its response proves, not for whether Jira agrees to do the thing.
 *
 * Parts of this surface are administrative in a way a single throwaway node cannot satisfy: a cluster it is not part
 * of, an upgrade it does not need, an anonymisation of the only administrator. Those endpoints still have request
 * bodies that must serialise and responses that must match their schemas, and that is what a call proves. Jira
 * answering 400 or 403 proves the request reached it in a shape it recognised.
 *
 * A schema mismatch is not swallowed — `SchemaMismatchError` does not descend from `ApiError` — so the one thing
 * these calls exist to catch still fails the test.
 */
import { ApiError } from '#/core';

export async function touch<T>(run: () => Promise<T>): Promise<T | undefined> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof ApiError) return undefined;

    throw error;
  }
}
