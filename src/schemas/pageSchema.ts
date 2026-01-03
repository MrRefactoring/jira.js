import { z } from 'zod';

export const PageSchema = <T extends z.ZodSchema | z.ZodType>(valueSchema: T) =>
  z.strictObject({
    values: valueSchema.array(),
    /** The index of the first item returned. */
    startAt: z.int(),
    /** The maximum number of items that could be returned. */
    maxResults: z.int(),
    /** The number of items returned. */
    total: z.int(),
    /** Whether this is the last page. */
    isLast: z.boolean(),
    self: z.url(),
  });

export type Page<T extends z.ZodType> = z.infer<ReturnType<typeof PageSchema<T>>>;
