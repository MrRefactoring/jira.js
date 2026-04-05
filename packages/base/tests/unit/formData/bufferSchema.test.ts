import { describe, expect, it } from 'vitest';
import { BufferSchema } from '../../../src/formData/bufferSchema';

describe('BufferSchema', () => {
  it('accepts Uint8Array', () => {
    const u8 = new Uint8Array([1, 2]);
    expect(BufferSchema.parse(u8)).toBe(u8);
  });

  it('accepts ArrayBuffer', () => {
    const ab = new ArrayBuffer(4);
    expect(BufferSchema.parse(ab)).toBe(ab);
  });

  it('rejects strings', () => {
    expect(BufferSchema.safeParse('x').success).toBe(false);
  });
});
