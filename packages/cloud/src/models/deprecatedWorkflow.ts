import { z } from 'zod';
import { ScopeSchema } from '#/models/scope';

/** Details about a workflow. */
export const DeprecatedWorkflowSchema = z.object({
  default: z.boolean().optional(),
  /** The description of the workflow. */
  description: z.string().optional(),
  /** The datetime the workflow was last modified. */
  lastModifiedDate: z.string().optional(),
  /** The account ID of the user that last modified the workflow. */
  lastModifiedUserAccountId: z.string().optional(),
  /** The name of the workflow. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
  /** The number of steps included in the workflow. */
  steps: z.number().optional(),
});

export type DeprecatedWorkflow = z.infer<typeof DeprecatedWorkflowSchema>;
