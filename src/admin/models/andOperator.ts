import { z } from 'zod';
import { apiObject } from '#/core';
import { QueryVariantsSchema, type QueryVariants, type QueryVariantsInput } from './queryVariants';

export interface AndOperator {
  /** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op. */
  and?: QueryVariants[];
  [key: string]: unknown;
}

export interface AndOperatorInput {
  /** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op. */
  and?: QueryVariantsInput[];
}

/** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op. */
export const AndOperatorSchema: z.ZodType<AndOperator, AndOperatorInput> = apiObject({
  /** Returns workspaces matching all of the nested query variants. Absence of nested variants makes this operator no-op. */
  and: z.array(z.lazy(() => QueryVariantsSchema)).optional(),
});
