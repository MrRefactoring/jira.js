import { z } from 'zod';
import { apiObject } from '#/core';

export const SoftwareNavigationInfoSchema = apiObject({
  boardId: z.number().optional(),
  boardName: z.string().optional(),
  simpleBoard: z.boolean().optional(),
  totalBoardsInProject: z.number().optional(),
});

export type SoftwareNavigationInfo = z.infer<typeof SoftwareNavigationInfoSchema>;
