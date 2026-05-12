import { z } from 'zod';

/** The workflow transition rule conditions tree. */
export const WorkflowConditionSchema = z.object({});

export type WorkflowCondition = z.infer<typeof WorkflowConditionSchema>;
