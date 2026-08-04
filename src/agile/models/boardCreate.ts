import { z } from 'zod';
import { apiObject } from '#/core';

export const BoardCreateSchema = apiObject({
  filterId: z.number().optional(),
  location: apiObject({
    projectKeyOrId: z.string().optional(),
    type: z.enum(['project', 'user']).optional(),
  }).optional(),
  name: z.string().optional(),
  type: z.enum(['kanban', 'scrum', 'agility']).optional(),
});

export type BoardCreate = z.infer<typeof BoardCreateSchema>;
