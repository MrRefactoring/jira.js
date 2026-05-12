import { ApiError } from '@jira.js/base';

function formatUnknown(value: unknown): string {
  if (value instanceof Error) {
    return value.message;
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function buildPreparationFailure(operation: string, attempts: number, lastError: unknown): Error {
  if (lastError instanceof ApiError) {
    const body = lastError.body == null ? '' : ` body=${formatUnknown(lastError.body)}`;
    return new Error(
      `Unable to prepare board for ${operation} after ${attempts} attempts. Last error: ApiError ${lastError.status} ${lastError.statusText}${body}`,
    );
  }

  return new Error(
    `Unable to prepare board for ${operation} after ${attempts} attempts. Last error: ${formatUnknown(lastError)}`,
  );
}
