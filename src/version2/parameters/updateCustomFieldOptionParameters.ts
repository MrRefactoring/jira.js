import { z } from 'zod';
import { CustomFieldOptionUpdateSchema } from './customFieldOptionUpdate';

export const UpdateCustomFieldOptionParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** Details of the options to update. */
  options: z.array(CustomFieldOptionUpdateSchema).optional(),
});

export type UpdateCustomFieldOptionParameters = z.infer<typeof UpdateCustomFieldOptionParametersSchema>;
