import { z } from 'zod';

export const UpdateCustomFieldContextParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** The description of the custom field context. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the custom field context. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type UpdateCustomFieldContextParameters = z.infer<typeof UpdateCustomFieldContextParametersSchema>;
