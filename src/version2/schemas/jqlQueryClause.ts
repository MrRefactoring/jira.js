import { z } from 'zod';

/** A JQL query clause. */
export const JqlQueryClauseSchema = z.object({});

export type JqlQueryClause = z.infer<typeof JqlQueryClauseSchema>;
