import { z } from 'zod';
import { JqlQueryOrderByClauseElementSchema } from './jqlQueryOrderByClauseElement';

/** Details of the order-by JQL clause. */
export const JqlQueryOrderByClauseSchema = z.object({
  /** The list of order-by clause fields and their ordering directives. */
  fields: z.array(JqlQueryOrderByClauseElementSchema),
});

export type JqlQueryOrderByClause = z.infer<typeof JqlQueryOrderByClauseSchema>;
