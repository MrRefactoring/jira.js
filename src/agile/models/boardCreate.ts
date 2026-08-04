import { z } from 'zod';
import { apiObject } from '#/core';
import { LocationSchema } from './location';

export const BoardCreateSchema = apiObject({
  filterId: z.number().optional(),
  location: LocationSchema.optional(),
  name: z.string().optional(),
  type: z.enum(['kanban', 'scrum', 'agility']).optional(),
});

export type BoardCreate = z.infer<typeof BoardCreateSchema>;
