import { z } from 'zod';

export const GetDefaultWorkflowParametersSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number().int(),
  /**
   * Set to `true` to return the default workflow for the workflow scheme's draft rather than scheme itself. If the
   * workflow scheme does not have a draft, then the default workflow for the workflow scheme is returned.
   */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetDefaultWorkflowParameters = z.infer<typeof GetDefaultWorkflowParametersSchema>;
