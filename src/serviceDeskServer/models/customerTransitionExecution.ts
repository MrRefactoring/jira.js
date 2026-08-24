import { z } from 'zod';
import { apiObject } from '#/core';
import { AdditionalCommentSchema } from './additionalComment';

export const CustomerTransitionExecutionSchema = apiObject({
  id: z.string().optional(),
  additionalComment: AdditionalCommentSchema.optional(),
});

export type CustomerTransitionExecution = z.infer<typeof CustomerTransitionExecutionSchema>;
