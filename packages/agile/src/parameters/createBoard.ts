import { z } from 'zod';

export const CreateBoardSchema = z.object({
  filterId: z.number().optional(),
  location: z
    .object({
      projectKeyOrId: z.string().optional(),
      type: z.enum(['project', 'user']).optional(),
    })
    .optional(),
  name: z.string().optional(),
  type: z.enum(['kanban', 'scrum', 'agility']).optional(),
});

export type CreateBoard = z.input<typeof CreateBoardSchema>;
