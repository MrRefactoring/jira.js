import { describe, expect, it } from 'vitest';
import { z } from 'zod';

// Documents how Zod behaves under upstream API evolution scenarios.
// These tests are NOT about catching bugs in the SDK — they document the
// schema evolution posture so that changes in behavior are detected immediately.
//
// Test naming convention:
//   "BREAKS:"   — current behavior throws ZodError when upstream evolves
//   "SILENT:"   — current behavior produces incorrect data without throwing
//   "SAFE:"     — current behavior handles evolution gracefully

describe('schema drift — unknown field handling (Zod strip mode)', () => {
  const PersonSchema = z.object({
    id: z.string(),
    name: z.string(),
  });

  it('SAFE: silently strips unknown fields when upstream API adds new fields', () => {
    const result = PersonSchema.parse({ id: '1', name: 'Alice', newUpstreamField: 'value' });

    expect(result).toEqual({ id: '1', name: 'Alice' });
    expect('newUpstreamField' in result).toBe(false);
  });

  it('SAFE: does not throw when upstream adds multiple new fields', () => {
    expect(() =>
      PersonSchema.parse({ id: '1', name: 'Alice', futureField: true, anotherNew: 42 }),
    ).not.toThrow();
  });

  it('SAFE: strips unknown fields on nested objects recursively', () => {
    const NestedSchema = z.object({ outer: z.object({ a: z.string() }) });

    const result = NestedSchema.parse({ outer: { a: 'x', newNested: 'ignored' } });

    expect(result.outer).toEqual({ a: 'x' });
    expect('newNested' in result.outer).toBe(false);
  });

  it('SAFE: strips unknown fields inside array items', () => {
    const ListSchema = z.object({ items: z.array(z.object({ id: z.string() })) });

    const result = ListSchema.parse({ items: [{ id: '1', extra: 'ignored' }] });

    expect(result.items[0]).toEqual({ id: '1' });
  });

  it('SAFE: new field added to array items does not break iteration', () => {
    const ListSchema = z.object({ items: z.array(z.object({ id: z.string() })) });

    const result = ListSchema.parse({
      items: [
        { id: '1', newField: 'a' },
        { id: '2', newField: 'b' },
      ],
    });

    expect(result.items.map(i => i.id)).toEqual(['1', '2']);
  });
});

describe('schema drift — CRITICAL: enum expansion breaks SDK', () => {
  const StatusSchema = z.object({
    status: z.enum(['PENDING', 'RUNNING', 'DONE']),
  });

  const OptionalEnumSchema = z.object({
    type: z.enum(['a', 'b']).optional(),
  });

  it('accepts all known enum values', () => {
    for (const status of ['PENDING', 'RUNNING', 'DONE']) {
      expect(() => StatusSchema.parse({ status })).not.toThrow();
    }
  });

  it('BREAKS: throws ZodError when upstream adds a new required enum value', () => {
    // If Atlassian adds 'PAUSED' to the status enum:
    // — the SDK throws ZodError on every response with that new status
    // — consumers get an uncaught error instead of a result
    expect(() => StatusSchema.parse({ status: 'PAUSED' })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when upstream adds a new OPTIONAL enum value', () => {
    // Optional enums are equally brittle on enum expansion.
    expect(() => OptionalEnumSchema.parse({ type: 'c' })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError for new enum value in nested required enum', () => {
    const NestedEnumSchema = z.object({
      transition: z.object({ type: z.enum(['global', 'initial', 'directed']) }),
    });

    expect(() =>
      NestedEnumSchema.parse({ transition: { type: 'automatic' } }),
    ).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError for new enum value in array items', () => {
    const ArrayEnumSchema = z.array(z.enum(['A', 'B']));

    expect(() => ArrayEnumSchema.parse(['A', 'C'])).toThrow(z.ZodError);
  });
});

describe('schema drift — CRITICAL: required field removal breaks SDK', () => {
  const RequiredSchema = z.object({
    id: z.string(),
    name: z.string(),
    optional: z.string().optional(),
  });

  it('accepts a complete valid response', () => {
    expect(() => RequiredSchema.parse({ id: '1', name: 'x' })).not.toThrow();
  });

  it('SAFE: absent optional field does not break parsing', () => {
    expect(() => RequiredSchema.parse({ id: '1', name: 'x' })).not.toThrow();
  });

  it('BREAKS: throws ZodError when a required string field is missing', () => {
    // If Atlassian removes a field the SDK marks as required:
    // — ZodError thrown for every response
    expect(() => RequiredSchema.parse({ id: '1' })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when a required field is null', () => {
    expect(() => RequiredSchema.parse({ id: null, name: 'x' })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required string becomes a number', () => {
    expect(() => RequiredSchema.parse({ id: 123, name: 'x' })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required number becomes a string', () => {
    const NumSchema = z.object({ count: z.number() });

    expect(() => NumSchema.parse({ count: '42' })).toThrow(z.ZodError);
  });
});

describe('schema drift — SILENT: date transform produces Invalid Date without throwing', () => {
  const DateSchema = z.object({
    createdDate: z
      .string()
      .transform(s => new Date(s))
      .optional(),
    requiredDate: z.string().transform(s => new Date(s)),
  });

  it('valid ISO datetime string produces a valid Date', () => {
    const result = DateSchema.parse({
      createdDate: '2026-01-01T10:00:00.000Z',
      requiredDate: '2026-01-01T10:00:00.000Z',
    });

    expect(result.createdDate).toBeInstanceOf(Date);
    expect(Number.isNaN(result.createdDate!.getTime())).toBe(false);
    expect(Number.isNaN(result.requiredDate.getTime())).toBe(false);
  });

  it('SILENT CORRUPTION: unrecognized date string produces Invalid Date without throwing', () => {
    // If Atlassian changes date format to a non-parseable string:
    // — new Date() returns an Invalid Date object
    // — Zod does NOT validate transform output — no ZodError is thrown
    // — Consumers calling .getTime() get NaN; .toISOString() throws RangeError
    const result = DateSchema.parse({ createdDate: 'not-a-date', requiredDate: 'also-bad' });

    expect(result.createdDate).toBeInstanceOf(Date);
    expect(Number.isNaN(result.createdDate!.getTime())).toBe(true);
    expect(Number.isNaN(result.requiredDate.getTime())).toBe(true);
  });

  it('BREAKS: throws ZodError when required date field changes to a number (unix ms)', () => {
    // If Atlassian switches from ISO string to unix timestamp (number):
    // — z.string() rejects the number type → ZodError (visible failure, not silent)
    expect(() => DateSchema.parse({ requiredDate: 1735689600000 })).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required date field is null', () => {
    expect(() => DateSchema.parse({ requiredDate: null })).toThrow(z.ZodError);
  });

  it('SAFE: optional date field absent does not throw', () => {
    expect(() => DateSchema.parse({ requiredDate: '2026-01-01T00:00:00.000Z' })).not.toThrow();
  });
});

describe('schema drift — z.url() validation strictness', () => {
  const UrlSchema = z.object({
    self: z.url().optional(),
    requiredSelf: z.url(),
  });

  it('accepts absolute HTTPS URLs', () => {
    expect(() =>
      UrlSchema.parse({
        self: 'https://example.atlassian.net/rest/api/3/issue/123',
        requiredSelf: 'https://example.atlassian.net',
      }),
    ).not.toThrow();
  });

  it('absent optional URL field does not throw', () => {
    expect(() => UrlSchema.parse({ requiredSelf: 'https://example.com' })).not.toThrow();
  });

  it('POTENTIAL BREAKAGE: relative URL fails z.url() validation', () => {
    // If Atlassian ever returns relative paths (e.g. /rest/api/3/issue/123),
    // z.url() rejects them — ZodError thrown.
    expect(() => UrlSchema.parse({ requiredSelf: '/rest/api/3/issue/123' })).toThrow(z.ZodError);
  });

  it('POTENTIAL BREAKAGE: plain string without protocol fails z.url() validation', () => {
    expect(() => UrlSchema.parse({ requiredSelf: 'not a url' })).toThrow(z.ZodError);
  });
});

describe('schema drift — nullable drift', () => {
  const Schema = z.object({
    name: z.string(),
    nullableName: z.string().nullable(),
    optionalName: z.string().optional(),
  });

  it('SAFE: nullable field accepts null', () => {
    expect(() => Schema.parse({ name: 'x', nullableName: null })).not.toThrow();
  });

  it('SAFE: optional field accepts absent value', () => {
    expect(() => Schema.parse({ name: 'x', nullableName: 'y' })).not.toThrow();
  });

  it('BREAKS: non-nullable required string does not accept null', () => {
    expect(() => Schema.parse({ name: null, nullableName: null })).toThrow(z.ZodError);
  });

  it('BREAKS: non-nullable required string does not accept undefined', () => {
    expect(() => Schema.parse({ name: undefined, nullableName: null })).toThrow(z.ZodError);
  });
});
