import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { WorkflowConditionSchema, type WorkflowCondition, type WorkflowConditionInput } from './workflowCondition';

export interface WorkflowCompoundCondition {
  /** The list of workflow conditions. */
  conditions: WorkflowCondition[];
  nodeType: 'compound';
  /** The compound condition operator. */
  operator: 'AND' | 'OR' | (string & {});
  [key: string]: unknown;
}

export interface WorkflowCompoundConditionInput {
  /** The list of workflow conditions. */
  conditions: WorkflowConditionInput[];
  nodeType: 'compound';
  /** The compound condition operator. */
  operator: 'AND' | 'OR' | (string & {});
}

/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */
export const WorkflowCompoundConditionSchema = apiObject({
  /** The list of workflow conditions. */
  conditions: z.array(
    z.lazy((): z.ZodType<WorkflowCondition, WorkflowConditionInput> => WorkflowConditionSchema) as z.ZodType<
      WorkflowCondition,
      WorkflowConditionInput
    >,
  ),
  nodeType: z.enum(['compound']),
  /** The compound condition operator. */
  operator: openEnum(['AND', 'OR']),
}) satisfies z.ZodType<WorkflowCompoundCondition, WorkflowCompoundConditionInput>;
