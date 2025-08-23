import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/**
 * Defines the payload for the tabs of the screen. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
 */
export const TabPayloadSchema = z.object({
  /**
   * The list of resource identifier of the field associated to the tab. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  fields: z.array(ProjectCreateResourceIdentifierSchema).optional(),
  /** The name of the tab */
  name: z.string().optional(),
});

export type TabPayload = z.infer<typeof TabPayloadSchema>;
