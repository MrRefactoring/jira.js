import { z } from 'zod';

export const BoardCreateSchema = z.object({
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

export type BoardCreate = z.infer<typeof BoardCreateSchema>;
