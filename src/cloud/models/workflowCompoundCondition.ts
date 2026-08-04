import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowConditionSchema, type WorkflowCondition } from './workflowCondition';

export type WorkflowCompoundCondition = {
  conditions: WorkflowCondition[];
  nodeType: 'compound';
  operator: 'AND' | 'OR';
};
/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */

export const WorkflowCompoundConditionSchema: z.ZodType<WorkflowCompoundCondition> = apiObject({
  /** The list of workflow conditions. */
  conditions: z.array(z.lazy(() => WorkflowConditionSchema)),
  nodeType: z.enum(['compound']),
  /** The compound condition operator. */
  operator: z.enum(['AND', 'OR']),
});
