import { z } from 'zod';

export const SetSprintPropertySchema = z.object({
  /** The key of the sprint's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  /** The id of the sprint on which the property will be set. */
  sprintId: z.number(),
  body: z.record(z.string(), z.any()),
});

export type SetSprintProperty = z.input<typeof SetSprintPropertySchema>;
