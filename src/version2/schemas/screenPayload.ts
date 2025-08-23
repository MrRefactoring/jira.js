import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
import { TabPayloadSchema } from './tabPayload';

/**
 * Defines the payload for the field screens. See
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
 */
export const ScreenPayloadSchema = z.object({
  /** The description of the screen */
  description: z.string().optional(),
  /** The name of the screen */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /**
   * The tabs of the screen. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-rest-api-3-screens-screenid-tabs-tabid-fields-post
   */
  tabs: z.array(TabPayloadSchema).optional(),
});

export type ScreenPayload = z.infer<typeof ScreenPayloadSchema>;
