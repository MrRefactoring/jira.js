import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * The default parameters to apply to the field across all work types in the specified schemes, may be null if only work
 * type-specific updates are needed
 */

export const FieldsSchemeItemParameterSchema = apiObject({
  /** The custom description for the field, null to preserve current description */
  description: z.string().optional(),
  /** Whether the field is required, null to preserve current requirement setting */
  isRequired: z.boolean().optional(),
  /** The renderer type for the field, null to preserve current renderer type */
  rendererType: openEnum(['jira-text-renderer', 'atlassian-wiki-renderer']).optional(),
});

export type FieldsSchemeItemParameter = z.infer<typeof FieldsSchemeItemParameterSchema>;
