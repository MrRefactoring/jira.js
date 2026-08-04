import { z } from 'zod';
import { openEnum } from '#/core';

export const CreateBoardSchema = z.object({
  filterId: z.number().optional(),
  location: z
    .object({
      projectKeyOrId: z.string().optional(),
      type: openEnum(['project', 'user']).optional(),
    })
    .optional(),
  name: z.string().optional(),
  type: openEnum(['kanban', 'scrum', 'agility']).optional(),
});

export type CreateBoard = z.input<typeof CreateBoardSchema>;
