import { ApiError, AuthError } from '#/core';

export async function touch<T>(run: () => Promise<T>): Promise<T | undefined> {
  try {
    return await run();
  } catch (error) {
    if (error instanceof ApiError && !(error instanceof AuthError) && error.status !== 405 && error.status < 500) {
      return undefined;
    }

    throw error;
  }
}
