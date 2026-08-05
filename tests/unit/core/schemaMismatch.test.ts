import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { describeIssues, resetSchemaMismatchReporting, warnOnce } from '#/core/schemaMismatch';

function issuesFor(schema: z.ZodType, body: unknown) {
  const parsed = schema.safeParse(body);

  if (parsed.success) throw new Error('expected the body to fail the schema');

  return describeIssues(parsed.error.issues, body);
}

describe('describeIssues', () => {
  it('names the allowed values and the one that arrived, rather than the error code', () => {
    const schema = z.object({ projectTypeKey: z.enum(['software', 'service_desk', 'business']) });

    expect(issuesFor(schema, { projectTypeKey: 'product_discovery' })).toEqual([
      {
        path: 'projectTypeKey',
        expected: "one of 'software' | 'service_desk' | 'business'",
        received: '"product_discovery"',
      },
    ]);
  });

  it('drops the "one of" when the schema allows a single value', () => {
    const schema = z.object({ nodeType: z.literal('compound') });

    expect(issuesFor(schema, { nodeType: 'simple' })[0].expected).toBe("'compound'");
  });

  it('cuts a long value rather than pasting the response into the log', () => {
    const schema = z.object({ key: z.enum(['a']) });
    const [issue] = issuesFor(schema, { key: 'x'.repeat(200) });

    expect(issue.received.length).toBeLessThan(50);
    expect(issue.received).toMatch(/…"$/);
  });

  it('falls back to the type when what arrived is not a primitive', () => {
    const schema = z.object({ key: z.enum(['a']) });

    expect(issuesFor(schema, { key: { nested: true } })[0].received).toBe('object');
  });

  it('leaves invalid_type alone — it already says what it expected', () => {
    expect(issuesFor(z.object({ id: z.string() }), { id: 42 })).toEqual([
      { path: 'id', expected: 'string', received: 'number' },
    ]);
  });

  it('spends the fields the other zod codes carry instead of printing their code', () => {
    const cases: Array<[z.ZodType, unknown, string]> = [
      [z.object({ name: z.string().max(3) }), { name: 'toolong' }, 'at most 3 characters'],
      [z.object({ items: z.array(z.string()).min(2) }), { items: ['one'] }, 'at least 2 items'],
      [z.object({ total: z.number().min(1) }), { total: 0 }, 'at least 1'],
      [z.object({ self: z.url() }), { self: 'not a url' }, 'a valid url'],
      [z.object({ count: z.number().multipleOf(5) }), { count: 7 }, 'a multiple of 5'],
    ];

    for (const [schema, body, expected] of cases) {
      expect(issuesFor(schema, body)[0].expected).toBe(expected);
    }
  });

  it('reports the field a union failed on rather than the union itself', () => {
    const schema = z.object({ value: z.union([z.object({ a: z.enum(['x']) }), z.object({ b: z.number() })]) });
    const described = issuesFor(schema, { value: { a: 'y' } });

    expect(described.some(issue => issue.path === 'value.a' && issue.expected === "'x'")).toBe(true);
  });

  it('does not quote the value for anything but a closed set', () => {
    const schema = z.object({ summary: z.string().max(3) });

    expect(issuesFor(schema, { summary: 'a secret customer name' })[0].received).toBe('string');
  });
});

describe('warnOnce', () => {
  beforeEach(() => resetSchemaMismatchReporting());

  it('reports one bad field once, however many array elements carry it', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const issues = [8, 26, 46, 48].map(index => ({
      path: `values.${index}.projectTypeKey`,
      expected: "one of 'software' | 'service_desk' | 'business'",
      received: '"product_discovery"',
    }));

    warnOnce({ endpoint: 'GET /rest/api/3/project/search', issues });

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('values.8.projectTypeKey');
    expect(warn.mock.calls[0][0]).toContain('"product_discovery"');

    warn.mockRestore();
  });

  it('still tells two different fields apart', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    warnOnce({
      endpoint: 'GET /x',
      issues: [
        { path: 'values.0.projectTypeKey', expected: "'a'", received: '"b"' },
        { path: 'values.0.style', expected: "'classic'", received: '"other"' },
      ],
    });

    expect(warn).toHaveBeenCalledTimes(2);

    warn.mockRestore();
  });

  it('tells the same field apart across endpoints', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const issues = [{ path: 'values.0.type', expected: "'a'", received: '"b"' }];

    warnOnce({ endpoint: 'GET /x', issues });
    warnOnce({ endpoint: 'GET /y', issues });

    expect(warn).toHaveBeenCalledTimes(2);

    warn.mockRestore();
  });
});
