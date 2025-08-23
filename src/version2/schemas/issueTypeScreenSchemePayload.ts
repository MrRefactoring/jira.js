import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the issue type screen schemes. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/#api-rest-api-3-issuetypescreenscheme-post
 */
export const IssueTypeScreenSchemePayloadSchema = z.object({
  defaultScreenScheme: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the issue type screen scheme */
  description: z.string().optional(),
  /**
   * The IDs of the screen schemes for the issue type IDs and default. A default entry is required to create an issue
   * type screen scheme, it defines the mapping for all issue types without a screen scheme.
   */
  explicitMappings: z.object({}).optional(),
  /** The name of the issue type screen scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type IssueTypeScreenSchemePayload = z.infer<typeof IssueTypeScreenSchemePayloadSchema>;
