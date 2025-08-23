import { z } from 'zod';

export const GetAllUserDataClassificationLevelsParametersSchema = z.object({
  /** Optional set of statuses to filter by. */
  status: z.array(z.enum(['PUBLISHED', 'ARCHIVED', 'DRAFT'])).optional(),
  /** Ordering of the results by a given field. If not provided, values will not be sorted. */
  orderBy: z.enum(['rank', '-rank', '+rank']).optional(),
});

export type GetAllUserDataClassificationLevelsParameters = z.infer<
  typeof GetAllUserDataClassificationLevelsParametersSchema
>;
