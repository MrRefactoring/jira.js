import { z } from 'zod';

export const DeleteReviewByIdSchema = z.object({
  /** The ID of the Review to delete. */
  reviewId: z.string().max(255, 'reviewId must be at most 255 characters'),
});

export type DeleteReviewById = z.input<typeof DeleteReviewByIdSchema>;
