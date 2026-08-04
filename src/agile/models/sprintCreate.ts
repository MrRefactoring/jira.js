import { z } from 'zod';
import { apiObject } from '#/core';

export const SprintCreateSchema = apiObject({
  endDate: z.string().optional(),
  goal: z.string().optional(),
  name: z.string().optional(),
  originBoardId: z.number().optional(),
  startDate: z.string().optional(),
});

export type SprintCreate = z.infer<typeof SprintCreateSchema>;
