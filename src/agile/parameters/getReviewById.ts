import { z } from 'zod';

export const GetReviewByIdSchema = z.object({
  /** The ID of the Review to fetch. */
  reviewId: z.string().max(255, 'reviewId must be at most 255 characters'),
});

export type GetReviewById = z.input<typeof GetReviewByIdSchema>;
