import { z } from 'zod';

export const DeleteSprintPropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The id of the sprint from which the property will be removed. */
  sprintId: z.number(),
});

export type DeleteSprintProperty = z.input<typeof DeleteSprintPropertySchema>;
