import { describe, expect, it } from 'vitest';
import { ApiError } from '../../src/apiError';

describe('ApiError', () => {
  it('is an instance of Error and ApiError', () => {
    const err = new ApiError('boom', 500, 'Internal Server Error', null);

    expect(err).toBeInstanceOf(ApiError);
    expect(err).toBeInstanceOf(Error);
  });

  it('sets name to "ApiError"', () => {
    const err = new ApiError('boom', 500, 'Internal Server Error', null);

    expect(err.name).toBe('ApiError');
  });

  it('exposes status, statusText, body, and message from the constructor', () => {
    const body = { errorMessages: ['bad request'] };
    const err = new ApiError('Request failed: 400 Bad Request', 400, 'Bad Request', body);

    expect(err.message).toBe('Request failed: 400 Bad Request');
    expect(err.status).toBe(400);
    expect(err.statusText).toBe('Bad Request');
    expect(err.body).toBe(body);
  });

  it('accepts undefined body', () => {
    const err = new ApiError('msg', 404, 'Not Found', undefined);

    expect(err.body).toBeUndefined();
  });

  it('accepts string body', () => {
    const err = new ApiError('msg', 502, 'Bad Gateway', 'upstream failure');

    expect(err.body).toBe('upstream failure');
  });

  it('includes a stack trace', () => {
    const err = new ApiError('msg', 500, 'X', null);

    expect(err.stack).toBeDefined();
    expect(err.stack).toContain('ApiError');
  });

  it('preserves the prototype chain so instanceof survives re-throw', () => {
    try {
      throw new ApiError('x', 500, 'X', null);
    } catch (caught) {
      expect(caught).toBeInstanceOf(ApiError);
    }
  });
});
