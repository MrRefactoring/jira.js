import { z } from 'zod';

export const GetSprintPropertySchema = z.object({
  /** The key of the property to return. */
  propertyKey: z.string(),
  /** The id of the sprint from which the property will be returned. */
  sprintId: z.number(),
});

export type GetSprintProperty = z.input<typeof GetSprintPropertySchema>;
