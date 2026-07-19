import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `projectTypes` API (`getAllProjectTypes`, `getAllAccessibleProjectTypes`, `getProjectTypeByKey`,
 * `getAccessibleProjectTypeByKey`).
 *
 * Read-only. The interesting part is the pair of "all" and "accessible" variants: they look interchangeable in the
 * types and are not — one lists what Jira defines, the other what this site is licensed for. Asserting that the
 * accessible set is a subset is the only way that distinction stays visible.
 */
describe('Jira Cloud — projectTypes (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists every project type Jira defines, each fully typed', async () => {
    const types = await client.projectTypes.getAllProjectTypes();

    expect(types.length).toBeGreaterThan(0);

    for (const type of types) {
      expect(typeof type.key).toBe('string');
      expect(type.key).toBeTruthy();
      expect(typeof type.formattedKey).toBe('string');
      expect(typeof type.descriptionI18nKey).toBe('string');
    }

    expect(types.map(type => type.key)).toContain('software');
  });

  it('reports accessible types as a subset of all types', async () => {
    const all = await client.projectTypes.getAllProjectTypes();
    const accessible = await client.projectTypes.getAllAccessibleProjectTypes();

    const allKeys = new Set(all.map(type => type.key));

    expect(accessible.length).toBeGreaterThan(0);
    // Licensing narrows the list; it never invents a type that is not defined.
    expect(accessible.every(type => allKeys.has(type.key))).toBe(true);
  });

  it('resolves a single type by key through both variants', async () => {
    const byKey = await client.projectTypes.getProjectTypeByKey({ projectTypeKey: 'software' });
    const accessible = await client.projectTypes.getAccessibleProjectTypeByKey({ projectTypeKey: 'software' });

    expect(byKey.key).toBe('software');
    expect(accessible.key).toBe('software');
    expect(accessible.formattedKey).toBe(byKey.formattedKey);
  });

  it('rejects a key outside the enum with a typed error', async () => {
    // The parameter is a `z.enum`, so this can only be reached by casting — which
    // is exactly what a JavaScript caller without types would do.
    const error = await client.projectTypes
      .getProjectTypeByKey({ projectTypeKey: 'no_such_type' as 'software' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
