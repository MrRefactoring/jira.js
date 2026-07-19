import { z } from 'zod';
import { apiObject } from '#/core';
/** Associated field configuration scheme and project. */

export const FieldConfigurationSchemeProjectAssociationSchema = apiObject({
  /**
   * The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the
   * default field configuration scheme.
   */
  fieldConfigurationSchemeId: z.string().optional(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type FieldConfigurationSchemeProjectAssociation = z.infer<
  typeof FieldConfigurationSchemeProjectAssociationSchema
>;
