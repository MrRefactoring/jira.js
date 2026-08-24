import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkflowSchema = apiObject({
  name: z.string().optional(),
  description: z.string().optional(),
  /** The number of steps in the workflow. */
  steps: z.number().optional(),
  isDefault: z.boolean().optional(),
  default: z.boolean().optional(),
  lastModifiedDate: z.string().optional(),
  lastModifiedUser: z.string().optional(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;
