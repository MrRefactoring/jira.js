import { z } from 'zod';

export const GetProgressForCategoryAndResourceIdSchema = z.object({
  /** Specifies the id of the ongoing task. */
  resourceid: z.string(),
  /**
   * Specifies the type of ongoing task. Possible values include: `imports, insight-reindex, freetext-reindex,
   * cache-query, async-task`
   */
  category: z.string(),
});

export type GetProgressForCategoryAndResourceId = z.input<typeof GetProgressForCategoryAndResourceIdSchema>;
