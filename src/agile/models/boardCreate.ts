import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const BoardCreateSchema = apiObject({
  filterId: z.number().optional(),
  location: apiObject({
    projectKeyOrId: z.string().optional(),
    type: openEnum(['project', 'user']).optional(),
  }).optional(),
  name: z.string().optional(),
  type: openEnum(['kanban', 'scrum', 'agility']).optional(),
});

export type BoardCreate = z.infer<typeof BoardCreateSchema>;
