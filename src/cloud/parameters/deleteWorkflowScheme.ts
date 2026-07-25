import { z } from 'zod';

export const DeleteWorkflowSchemeSchema = z.object({
  /**
   * The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the
   * URL as `schemeId`. For example, _schemeId=10301_.
   */
  id: z.number(),
});

export type DeleteWorkflowScheme = z.input<typeof DeleteWorkflowSchemeSchema>;
