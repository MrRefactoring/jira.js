import { ApiError } from '@jira.js/base';
import { describe, expect, it } from 'vitest';
import { buildPreparationFailure } from '../../live/helpers/boardPreparationError';

describe('buildPreparationFailure', () => {
  it('includes last ApiError status and body details', () => {
    const lastError = new ApiError('Request failed with status 404', 404, 'Not Found', {
      errorMessages: ['Board does not exist'],
    });

    const result = buildPreparationFailure('moveIssuesToBoard', 3, lastError);

    expect(result.message).toContain('Unable to prepare board for moveIssuesToBoard after 3 attempts');
    expect(result.message).toContain('Last error: ApiError 404 Not Found');
    expect(result.message).toContain('Board does not exist');
  });

  it('includes generic message for non-Error values', () => {
    const result = buildPreparationFailure('toggleFeatures', 2, 'tenant unavailable');

    expect(result.message).toContain('Unable to prepare board for toggleFeatures after 2 attempts');
    expect(result.message).toContain('Last error: tenant unavailable');
  });
});
