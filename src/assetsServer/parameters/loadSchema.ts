import { z } from 'zod';

export const LoadSchemaSchema = z.object({
  /** The ID of the object schema to retrieve */
  id: z.string(),
});

export type LoadSchema = z.input<typeof LoadSchemaSchema>;
