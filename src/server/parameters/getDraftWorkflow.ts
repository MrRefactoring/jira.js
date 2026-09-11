import { z } from 'zod';

export const GetDraftWorkflowSchema = z.object({
  /** The workflow mapping to return. Null can be passed to return all mappings. Must be a valid workflow name. */
  workflowName: z.string().optional(),
  /** The id of the parent scheme. */
  id: z.number(),
});

export type GetDraftWorkflow = z.input<typeof GetDraftWorkflowSchema>;
