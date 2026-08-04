import { z } from 'zod';

export const DeletePropertySchema = z.object({
  /** The ID of the sprint from which the property will be removed. */
  sprintId: z.string(),
  /** The key of the property to remove. */
  propertyKey: z.string(),
});

export type DeleteProperty = z.input<typeof DeletePropertySchema>;
