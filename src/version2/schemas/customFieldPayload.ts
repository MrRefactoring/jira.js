import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the custom field definitions. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
 */
export const CustomFieldPayloadSchema = z.object({
  /** The type of the custom field */
  cfType: z.string().optional(),
  /** The description of the custom field */
  description: z.string().optional(),
  /** The name of the custom field */
  name: z.string().optional(),
  /**
   * The strategy to use when there is a conflict with an existing custom field. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The searcher key of the custom field */
  searcherKey: z.string().optional(),
});

export type CustomFieldPayload = z.infer<typeof CustomFieldPayloadSchema>;
