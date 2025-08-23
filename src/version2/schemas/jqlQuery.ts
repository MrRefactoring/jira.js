import { z } from 'zod';
import { JqlQueryOrderByClauseSchema } from './jqlQueryOrderByClause';
import { JqlQueryClauseSchema } from './jqlQueryClause';

/** A parsed JQL query. */
export const JqlQuerySchema = z.object({
  orderBy: JqlQueryOrderByClauseSchema.optional(),
  where: JqlQueryClauseSchema.optional(),
});

export type JqlQuery = z.infer<typeof JqlQuerySchema>;
