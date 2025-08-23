import { z } from 'zod';
import { CustomFieldContextOptionSchema } from './customFieldContextOption';

/** A list of custom field options for a context. */
export const CustomFieldCreatedContextOptionsListSchema = z.object({
  /** The created custom field options. */
  options: z.array(CustomFieldContextOptionSchema).optional(),
});

export type CustomFieldCreatedContextOptionsList = z.infer<typeof CustomFieldCreatedContextOptionsListSchema>;
