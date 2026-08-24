import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * Returns workspaces where a specified event field has one of the specified values. Absent of values makes this
 * operator no-op.*
 */

export const FieldOperandSchema = apiObject({
  /**
   * Returns workspaces where a specified event field has one of the specified values.Absent of values makes this
   * operator no-op.
   */
  field: apiObject({
    name: z.string().optional(),
    values: z.array(z.string()).optional(),
  }).optional(),
});

export type FieldOperand = z.infer<typeof FieldOperandSchema>;
