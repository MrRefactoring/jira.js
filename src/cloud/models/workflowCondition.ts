import { z } from 'zod';
import { WorkflowSimpleConditionSchema, type WorkflowSimpleCondition } from './workflowSimpleCondition';
import {
  WorkflowCompoundConditionSchema,
  type WorkflowCompoundCondition,
  type WorkflowCompoundConditionInput,
} from './workflowCompoundCondition';

export type WorkflowCondition = WorkflowSimpleCondition | WorkflowCompoundCondition;

export type WorkflowConditionInput = z.input<typeof WorkflowSimpleConditionSchema> | WorkflowCompoundConditionInput;

/** The workflow transition rule conditions tree. */
export const WorkflowConditionSchema = z.union([
  WorkflowSimpleConditionSchema,
  z.lazy(
    (): z.ZodType<WorkflowCompoundCondition, WorkflowCompoundConditionInput> => WorkflowCompoundConditionSchema,
  ) as z.ZodType<WorkflowCompoundCondition, WorkflowCompoundConditionInput>,
]) satisfies z.ZodType<WorkflowCondition, WorkflowConditionInput>;
