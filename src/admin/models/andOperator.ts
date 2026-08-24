import { z } from 'zod';
import { apiObject } from '#/core';
import { QueryVariantsSchema, type QueryVariants } from './queryVariants';

export interface AndOperator {
  and?: QueryVariants[];
}
/** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op.* */

export const AndOperatorSchema: z.ZodType<AndOperator> = apiObject({
  /** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op. */
  and: z.array(z.lazy(() => QueryVariantsSchema)).optional(),
});
