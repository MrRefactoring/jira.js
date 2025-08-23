import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the screen schemes. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-rest-api-3-screenscheme-post
 */
export const ScreenSchemePayloadSchema = z.object({
  defaultScreen: ProjectCreateResourceIdentifierSchema.optional(),
  /** The description of the screen scheme */
  description: z.string().optional(),
  /** The name of the screen scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /**
   * Similar to the field layout scheme those mappings allow users to set different screens for different operations:
   * default - always there, applied to all operations that don't have an explicit mapping `create`, `view`, `edit` -
   * specific operations that are available and users can assign a different screen for each one of them
   * https://support.atlassian.com/jira-cloud-administration/docs/manage-screen-schemes/#Associating-a-screen-with-an-issue-operation
   */
  screens: z.object({}).optional(),
});

export type ScreenSchemePayload = z.infer<typeof ScreenSchemePayloadSchema>;
