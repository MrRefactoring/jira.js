import { z } from 'zod';

export const SoftwareNavigationInfoSchema = z.object({
  boardId: z.number().int().optional(),
  boardName: z.string().optional(),
  simpleBoard: z.boolean().optional(),
  totalBoardsInProject: z.number().int().optional(),
});

export type SoftwareNavigationInfo = z.infer<typeof SoftwareNavigationInfoSchema>;
