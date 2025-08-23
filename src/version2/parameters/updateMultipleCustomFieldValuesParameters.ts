import { z } from 'zod';
import { MultipleCustomFieldValuesUpdateSchema } from './multipleCustomFieldValuesUpdate';

export const UpdateMultipleCustomFieldValuesParametersSchema = z.object({
  /** Whether to generate a changelog for this update. */
  generateChangelog: z.boolean().optional(),
  updates: z.array(MultipleCustomFieldValuesUpdateSchema).optional(),
});

export type UpdateMultipleCustomFieldValuesParameters = z.infer<typeof UpdateMultipleCustomFieldValuesParametersSchema>;
