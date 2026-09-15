import { z } from 'zod';
import { apiObject } from '#/core';
import { QueryVariantsSchema, type QueryVariants, type QueryVariantsInput } from './queryVariants';

export interface NorOperator {
  /**
   * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes
   * this operator no-op
   */
  nor?: QueryVariants[];
  [key: string]: unknown;
}

export interface NorOperatorInput {
  /**
   * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes
   * this operator no-op
   */
  nor?: QueryVariantsInput[];
}

/**
 * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes this
 * operator no-op.
 */
export const NorOperatorSchema: z.ZodType<NorOperator, NorOperatorInput> = apiObject({
  /**
   * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes
   * this operator no-op
   */
  nor: z.array(z.lazy(() => QueryVariantsSchema)).optional(),
});
