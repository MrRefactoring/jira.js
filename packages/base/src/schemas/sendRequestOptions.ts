import { z } from 'zod';
import { httpMethodSchema } from './httpMethod';

export const sendRequestOptionsSchema = z.object({
  url: z.string(),
  method: httpMethodSchema.optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.unknown().optional(),
  searchParams: z.record(z.string(), z.unknown()).optional(),
});

export type SendRequestOptions<T = unknown> = z.infer<typeof sendRequestOptionsSchema> & {
  schema?: z.ZodType<T>;
};
