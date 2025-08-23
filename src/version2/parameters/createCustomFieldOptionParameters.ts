import { z } from 'zod';
import { CustomFieldOptionCreateSchema } from './customFieldOptionCreate';

export const CreateCustomFieldOptionParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** Details of options to create. */
  options: z.array(CustomFieldOptionCreateSchema).optional(),
});

export type CreateCustomFieldOptionParameters = z.infer<typeof CreateCustomFieldOptionParametersSchema>;
