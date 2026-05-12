import { z } from 'zod';

export const BufferSchema = z.custom<ArrayBufferView | ArrayBuffer>(val => {
  if (val instanceof ArrayBuffer) return true;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(val)) return true;

  return false;
});

export type Buffer = z.infer<typeof BufferSchema>;
