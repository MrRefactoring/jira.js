import { z } from 'zod';

export const DeleteSchemaSchema = z.object({
  /** The object schema id */
  id: z.string(),
});

export type DeleteSchema = z.input<typeof DeleteSchemaSchema>;
