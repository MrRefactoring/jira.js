import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for creating an issue type */
export const IssueTypePayloadSchema = z.object({
  /**
   * The avatar ID of the issue type. Go to
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-avatar-type-system-get
   * to choose an avatarId existing in Jira
   */
  avatarId: z.number().int().optional(),
  /** The description of the issue type */
  description: z.string().optional(),
  /** The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for subtasks */
  hierarchyLevel: z.number().int().optional(),
  /** The name of the issue type */
  name: z.string().optional(),
  /**
   * The conflict strategy to use when the issue type already exists. FAIL - Fail execution, this always needs to be
   * unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type IssueTypePayload = z.infer<typeof IssueTypePayloadSchema>;
