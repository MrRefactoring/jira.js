import { z } from 'zod';

export const GetReportsForBoardSchema = z.object({
  reports: z.array(z.record(z.string(), z.any())).optional(),
});

export type GetReportsForBoard = z.infer<typeof GetReportsForBoardSchema>;
