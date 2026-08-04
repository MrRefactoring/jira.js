import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { createClient } from '#/core/createClient';
import { apiObject } from '#/core/apiObject';
import { getCollectedSchemaDrift, type SchemaDrift } from '#/core/schemaAudit';
import { resetSchemaMismatchReporting } from '#/core/schemaMismatch';

const HOST = 'https://example.atlassian.net';

function mockFetch(body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }),
    ),
  );
}

function collected(): SchemaDrift[] {
  return [...getCollectedSchemaDrift()];
}

/**
 * The audit is what holds the schemas to the letter of the specification, so these run with it on. Findings live on a
 * process-wide store keyed by a well-known symbol; the tests read the tail rather than clearing it, so one case cannot
 * hide another's.
 */
describe('the schema audit', () => {
  let before = 0;

  beforeEach(() => {
    process.env.AUDIT_SCHEMAS = 'true';
    before = collected().length;
    resetSchemaMismatchReporting();
  });

  afterEach(() => {
    delete process.env.AUDIT_SCHEMAS;
    vi.unstubAllGlobals();
  });

  async function read(schema: z.ZodType, body: unknown) {
    const result = await createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema });

    return { result, drift: collected().slice(before) };
  }

  it('records a value outside the documented set as drift, not as breakage', async () => {
    mockFetch({ projectTypeKey: 'product_discovery' });

    const { result, drift } = await read(apiObject({ projectTypeKey: z.enum(['software', 'business']) }), {
      projectTypeKey: 'product_discovery',
    });

    expect(drift).toEqual([
      {
        kind: 'value',
        endpoint: 'GET /x',
        path: 'projectTypeKey',
        value: 'product_discovery',
        documented: ['software', 'business'],
      },
    ]);

    expect(result).toEqual({ projectTypeKey: 'product_discovery' });
  });

  it('keeps the array index, so the report can point at an element', async () => {
    const body = { values: [{ type: 'known' }, { type: 'grown' }] };

    mockFetch(body);

    const { drift } = await read(apiObject({ values: z.array(apiObject({ type: z.enum(['known']) })) }), body);

    expect(drift.map(entry => entry.path)).toEqual(['values.1.type']);
  });

  it('still records an undocumented key the way it always did', async () => {
    const body = { id: '1', undocumented: 7 };

    mockFetch(body);

    const { drift } = await read(apiObject({ id: z.string() }), body);

    expect(drift).toEqual([
      { kind: 'keys', endpoint: 'GET /x', path: '', keys: ['undocumented'], types: { undocumented: 'number' } },
    ]);
  });

  it('reports both kinds from one response', async () => {
    const body = { status: 'archived', undocumented: 'x' };

    mockFetch(body);

    const { drift } = await read(apiObject({ status: z.enum(['active']) }), body);

    expect(drift.map(entry => entry.kind).sort()).toEqual(['keys', 'value']);
  });

  it('still calls a changed type breakage', async () => {
    mockFetch({ id: 42 });

    await expect(
      createClient({ host: HOST }).sendRequest({ url: '/x', method: 'GET', schema: apiObject({ id: z.string() }) }),
    ).rejects.toThrow();

    expect(collected().slice(before)).toEqual([]);
  });

  it('does not read a union branch mismatch as a grown enum', async () => {
    const body = { kind: 'b', b: 'value', undocumented: 1 };

    mockFetch(body);

    const { drift } = await read(
      z.union([
        apiObject({ kind: z.literal('a'), a: z.string() }),
        apiObject({ kind: z.literal('b'), b: z.string() }),
      ]),
      body,
    );

    expect(drift.every(entry => entry.kind === 'keys')).toBe(true);
    expect(drift.map(entry => (entry.kind === 'keys' ? entry.keys : []))).toEqual([['undocumented']]);
  });
});
