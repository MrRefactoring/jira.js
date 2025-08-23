import { z } from 'zod';

export const GetWorkflowSchemeParametersSchema = z.object({
  /**
   * The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the
   * URL as `schemeId`. For example, _schemeId=10301_.
   */
  id: z.number().int(),
  /**
   * Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have
   * a draft, then the workflow scheme is returned.
   */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetWorkflowSchemeParameters = z.infer<typeof GetWorkflowSchemeParametersSchema>;
