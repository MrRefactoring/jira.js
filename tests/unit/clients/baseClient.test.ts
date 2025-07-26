import { describe, test } from 'vitest';
import { BaseClient } from '@jirajs';

describe('BaseClient', () => {
  test('shouldn\'t display error message for correct host urls', () => {
    new BaseClient({
      host: 'http://localhost',
    });

    new BaseClient({ host: 'https://localhost/' });
  });

  test('should display error message for incorrect host url', ({ expect }) => {
    const errorMessage = 'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?';

    expect(() => new BaseClient({ host: '' })).toThrowError(errorMessage);
    expect(() => new BaseClient({ host: 'localhost' })).toThrowError(errorMessage);
    expect(() => new BaseClient({ host: 'example.com' })).toThrowError(errorMessage);
  });
});
