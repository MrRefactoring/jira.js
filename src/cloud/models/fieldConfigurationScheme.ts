import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a field configuration scheme. */

export const FieldConfigurationSchemeSchema = apiObject({
  /** The description of the field configuration scheme. */
  description: z.string().optional(),
  /** The ID of the field configuration scheme. */
  id: z.string(),
  /** The name of the field configuration scheme. */
  name: z.string(),
});

export type FieldConfigurationScheme = z.infer<typeof FieldConfigurationSchemeSchema>;
