import { z } from 'zod';
import { apiObject } from '#/core';
import { QueryVariantsSchema, type QueryVariants } from './queryVariants';

export interface NorOperator {
  nor?: QueryVariants[];
}
/**
 * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes this
 * operator no-op.*
 */

export const NorOperatorSchema: z.ZodType<NorOperator> = apiObject({
  /**
   * Returns workspaces excluding those that match any of the nested query variants. Absence of nested variants makes
   * this operator no-op
   */
  nor: z.array(z.lazy(() => QueryVariantsSchema)).optional(),
});
