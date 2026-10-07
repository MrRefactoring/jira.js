import { z } from 'zod';
import { CustomFieldContextDefaultValuesUpdateSchema } from '../models';

export const SetContextDefaultValuesSchema = z.object(CustomFieldContextDefaultValuesUpdateSchema.shape).extend({
  /** The ID of the custom field, for example `customfield\_10000`. */
  fieldId: z.string(),
});

export type SetContextDefaultValues = z.input<typeof SetContextDefaultValuesSchema>;
