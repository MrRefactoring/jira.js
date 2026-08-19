import { z } from 'zod';
import { apiObject } from '#/core';
import { CreateProjectDetailsSchema } from '../models';

export const CreateProjectRequestSchema = apiObject(CreateProjectDetailsSchema.shape).extend({
  leadAccountId: z.string(),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;
