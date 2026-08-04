import { z } from 'zod';

export const SubmitWorkspacesSchema = z.object({
  /**
   * The IDs of Security Workspaces to link to this Jira site. These must follow this regex pattern:
   * `[a-zA-Z0-9\\-_.~@:{}=]+(\/[a-zA-Z0-9\\-_.~@:{}=]+)*`
   */
  workspaceIds: z.array(z.string()),
});

export type SubmitWorkspaces = z.input<typeof SubmitWorkspacesSchema>;
