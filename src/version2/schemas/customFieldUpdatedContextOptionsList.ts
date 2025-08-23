import { z } from 'zod';
import { CustomFieldOptionUpdateSchema } from './customFieldOptionUpdate';

/** A list of custom field options for a context. */
export const CustomFieldUpdatedContextOptionsListSchema = z.object({
  /** The updated custom field options. */
  options: z.array(CustomFieldOptionUpdateSchema).optional(),
});

export type CustomFieldUpdatedContextOptionsList = z.infer<typeof CustomFieldUpdatedContextOptionsListSchema>;
