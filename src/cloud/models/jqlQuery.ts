import type { z } from 'zod';
import { apiObject } from '#/core';
import { JqlQueryOrderByClauseSchema } from './jqlQueryOrderByClause';
import { JqlQueryClauseSchema, type JqlQueryClause, type JqlQueryClauseInput } from './jqlQueryClause';

/** A parsed JQL query. */
export const JqlQuerySchema = apiObject({
  orderBy: JqlQueryOrderByClauseSchema.optional(),
  where: (JqlQueryClauseSchema as z.ZodType<JqlQueryClause, JqlQueryClauseInput>).optional(),
});

export type JqlQuery = z.infer<typeof JqlQuerySchema>;
