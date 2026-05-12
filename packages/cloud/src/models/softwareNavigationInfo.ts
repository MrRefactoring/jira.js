import { z } from 'zod';

export const SoftwareNavigationInfoSchema = z.object({
  boardId: z.number().optional(),
  boardName: z.string().optional(),
  simpleBoard: z.boolean().optional(),
  totalBoardsInProject: z.number().optional(),
});

export type SoftwareNavigationInfo = z.infer<typeof SoftwareNavigationInfoSchema>;
