import { z } from 'zod';

export const GetWorkflowSchema = z.object({
  /** The workflow mapping to return. Null can be passed to return all mappings. Must be a valid workflow name. */
  workflowName: z.string().optional(),
  /** The id of the scheme. */
  id: z.number(),
  /** When true indicates that a scheme's draft, if it exists, should be queried instead of the scheme itself. */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetWorkflow = z.input<typeof GetWorkflowSchema>;
