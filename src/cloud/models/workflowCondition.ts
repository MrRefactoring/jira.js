import { z } from 'zod';
import { WorkflowSimpleConditionSchema, type WorkflowSimpleCondition } from './workflowSimpleCondition';
import { WorkflowCompoundConditionSchema, type WorkflowCompoundCondition } from './workflowCompoundCondition';

export type WorkflowCondition = WorkflowSimpleCondition | WorkflowCompoundCondition;
/** The workflow transition rule conditions tree. */

export const WorkflowConditionSchema: z.ZodType<WorkflowCondition> = z.union([
  WorkflowSimpleConditionSchema,
  z.lazy(() => WorkflowCompoundConditionSchema),
]);
