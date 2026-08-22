import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusCategoryJsonSchema } from './statusCategoryJson';

export const StatusJsonSchema = apiObject({
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  statusCategory: StatusCategoryJsonSchema.optional(),
  statusColor: z.string().optional(),
});

export type StatusJson = z.infer<typeof StatusJsonSchema>;
