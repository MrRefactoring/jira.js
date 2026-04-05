import { z } from 'zod';
import { JqlQueryOrderByClauseSchema } from '#/models/jqlQueryOrderByClause';
import { JqlQueryClauseSchema } from '#/models/jqlQueryClause';

/** A parsed JQL query. */
export const JqlQuerySchema = z.object({
  orderBy: JqlQueryOrderByClauseSchema.optional(),
  where: JqlQueryClauseSchema.optional(),
});

export type JqlQuery = z.infer<typeof JqlQuerySchema>;
