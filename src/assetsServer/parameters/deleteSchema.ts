import { z } from 'zod';

export const DeleteSchemaSchema = z.object({
  /** The ID of the object schema to delete */
  id: z.string(),
});

export type DeleteSchema = z.input<typeof DeleteSchemaSchema>;
