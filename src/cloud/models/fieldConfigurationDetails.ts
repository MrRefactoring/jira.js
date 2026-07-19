import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a field configuration. */

export const FieldConfigurationDetailsSchema = apiObject({
  /** The description of the field configuration. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The name of the field configuration. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters'),
});

export type FieldConfigurationDetails = z.infer<typeof FieldConfigurationDetailsSchema>;
