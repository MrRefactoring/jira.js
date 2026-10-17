import { ApiError } from './errors/apiError.js';
import { SchemaMismatchError } from './errors/schemaMismatchError.js';

export async function parseAvatarUploadResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  const json = /<textarea\b[^>]*>([\s\S]*?)<\/textarea>/i.exec(text)?.[1] ?? text;
  let data: unknown;

  try {
    data = JSON.parse(json);
  } catch {
    throw new SchemaMismatchError('The avatar upload response did not contain valid JSON', {
      endpoint: response.url || 'avatar upload',
      issues: [{ path: '', expected: 'JSON in a textarea', received: 'malformed response' }],
    });
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) return data;

  const result = { ...data } as Record<string, unknown>;

  if (
    (Array.isArray(result.errorMessages) && result.errorMessages.length > 0) ||
    (typeof result.errors === 'object' && result.errors !== null && Object.keys(result.errors).length > 0)
  ) {
    throw new ApiError('The avatar upload was rejected', response.status, response.statusText, result);
  }

  for (const key of ['cropperWidth', 'cropperOffsetX', 'cropperOffsetY']) {
    const value = result[key];

    if (typeof value === 'string' && /^-?\d+$/.test(value)) result[key] = Number(value);
  }

  if (Object.hasOwn(result, 'isCroppingNeeded')) {
    const value = result.isCroppingNeeded;

    result.needsCropping = value;

    if (value === 'true' || value === 'false') result.needsCropping = value === 'true';
    delete result.isCroppingNeeded;
  }

  return result;
}
