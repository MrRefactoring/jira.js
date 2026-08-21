import { z } from 'zod';
import { httpMethodSchema } from './httpMethod.js';

export const sendRequestOptionsSchema = z.object({
  url: z.string(),
  method: httpMethodSchema.optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.unknown().optional(),
  searchParams: z.record(z.string(), z.unknown()).optional(),
  /**
   * The media type to send the body as, for the endpoints that do not take JSON.
   *
   * Generated onto the handful that declare `text/plain` or a form encoding. A `Blob` or `FormData` body needs none:
   * both carry their own type, and naming one here would fight the boundary `fetch` sets for multipart.
   */
  contentType: z.string().optional(),
});

export type SendRequestOptions<T = unknown> = z.infer<typeof sendRequestOptionsSchema> & {
  schema?: z.ZodType<T>;
};
