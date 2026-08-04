import { z } from 'zod';
import { apiObject } from '#/core';

export const GetReportsForBoardSchema = apiObject({
  reports: z.array(z.record(z.string(), z.any())).optional(),
});

export type GetReportsForBoard = z.infer<typeof GetReportsForBoardSchema>;
