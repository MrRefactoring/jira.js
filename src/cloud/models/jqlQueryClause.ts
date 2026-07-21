import { z } from 'zod';
import { apiObject } from '#/core';
/** A JQL query clause. */

export const JqlQueryClauseSchema = apiObject({
  clauses: z.array(z.unknown()).optional(),
  field: z.record(z.string(), z.any()).optional(),
  operand: z.record(z.string(), z.any()).optional(),
  operator: z.string().optional(),
  predicates: z.array(z.unknown()).optional(),
});

export type JqlQueryClause = z.infer<typeof JqlQueryClauseSchema>;
