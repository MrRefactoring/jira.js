import { z } from 'zod';
import { apiObject } from '#/core';
import { AdditionalCommentSchema } from './additionalComment';

export const CustomerTransitionExecutionSchema = apiObject({
  additionalComment: AdditionalCommentSchema.optional(),
  /** ID of the transition to be performed. */
  id: z.string().optional(),
});

export type CustomerTransitionExecution = z.infer<typeof CustomerTransitionExecutionSchema>;
