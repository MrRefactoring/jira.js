import { z } from 'zod';

/** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
export const FieldsSchemeItemWorkTypeParameterSchema = z.object({
  /** The custom description for the field for this work type, null to use default or preserve current */
  description: z.string().optional(),
  /** Whether the field is required for this work type, null to use default or preserve current */
  isRequired: z.boolean().optional(),
  /** The ID of the work type (issue type) for which these parameters apply */
  workTypeId: z.number().optional(),
});

export type FieldsSchemeItemWorkTypeParameter = z.infer<typeof FieldsSchemeItemWorkTypeParameterSchema>;
