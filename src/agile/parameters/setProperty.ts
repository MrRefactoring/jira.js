import { z } from 'zod';

export const SetPropertySchema = z.object({
  /** The ID of the sprint on which the property will be set. */
  sprintId: z.string(),
  /** The key of the sprint's property. The maximum length of the key is 255 bytes. */
  propertyKey: z.string(),
  propertyValue: z.record(z.string(), z.any()),
});

export type SetProperty = z.input<typeof SetPropertySchema>;
