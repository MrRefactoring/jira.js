import { z } from 'zod';
import { FieldAssociationItemPayloadSchema } from '#/models/fieldAssociationItemPayload';
import { ProjectCreateResourceIdentifierSchema } from '#/models/projectCreateResourceIdentifier';

/**
 * Defines the payload to configure the field scheme for a project. See [Field
 * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes).
 */
export const FieldSchemePayloadSchema = z.object({
  /** The description of the field scheme */
  description: z.string().optional(),
  /** The field association items for this field scheme. */
  items: z.array(FieldAssociationItemPayloadSchema).optional(),
  /** The name of the field scheme */
  name: z.string().optional(),
  /**
   * The strategy to use when there is a conflict with an existing field scheme. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type FieldSchemePayload = z.infer<typeof FieldSchemePayloadSchema>;
