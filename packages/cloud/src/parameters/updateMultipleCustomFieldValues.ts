import { z } from 'zod';
import { MultipleCustomFieldValuesUpdateDetailsSchema } from '../models';

export const UpdateMultipleCustomFieldValuesSchema = z
  .object({
    /** Whether to generate a changelog for this update. */
    generateChangelog: z.boolean().optional(),
  })
  .extend(MultipleCustomFieldValuesUpdateDetailsSchema.shape);

export type UpdateMultipleCustomFieldValues = z.input<typeof UpdateMultipleCustomFieldValuesSchema>;
