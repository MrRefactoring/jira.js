import { z } from 'zod';
import { apiObject } from '#/core';
import { AdditionalCommentSchema } from './additionalComment';

export const CSATFeedbackFullSchema = apiObject({
  comment: AdditionalCommentSchema.optional(),
  /** A numeric representation of the rating, this must be an integer value between 1 and 5. */
  rating: z.number().optional(),
  /** Indicates the type of feedback, supported values: `csat`. */
  type: z.string().optional(),
});

export type CSATFeedbackFull = z.infer<typeof CSATFeedbackFullSchema>;
