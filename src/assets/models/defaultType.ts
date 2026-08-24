import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * | Id | Description |*
 * | -- | ----------- |*
 * | -1 | None |*
 * | 0 | Text |*
 * | 1 | Integer |*
 * | 2 | Boolean |*
 * | 3 | Double |*
 * | 4 | Date |*
 * | 5 | Time |*
 * | 6 | DateTime |*
 * | 7 | Url |*
 * | 8 | Email |*
 * | 9 | Textarea |*
 * | 10 | Select |*
 * | 11 | IP Address |*
 */

export const DefaultTypeSchema = apiObject({
  id: z.number(),
  name: z.string(),
});

export type DefaultType = z.infer<typeof DefaultTypeSchema>;
