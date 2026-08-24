import { z } from 'zod';

export const LoadSchemaSchema = z.object({
  /** The object schema id */
  id: z.string(),
});

export type LoadSchema = z.input<typeof LoadSchemaSchema>;
