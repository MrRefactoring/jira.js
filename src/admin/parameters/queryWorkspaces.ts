import { z } from 'zod';
import { SearchWorkspacesRequestV2Schema } from '../models';

export const QueryWorkspacesSchema = z.object(SearchWorkspacesRequestV2Schema.shape).extend({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
});

export type QueryWorkspaces = z.input<typeof QueryWorkspacesSchema>;
