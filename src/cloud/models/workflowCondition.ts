import type { z } from 'zod';
import { apiObject } from '#/core';
/** The workflow transition rule conditions tree. */

export const WorkflowConditionSchema = apiObject({});

export type WorkflowCondition = z.infer<typeof WorkflowConditionSchema>;
