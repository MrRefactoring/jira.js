import { z } from 'zod';
import { apiObject } from '#/core';

export const AdditionalCommentSchema = apiObject({
  /** Content of the comment. */
  body: z.string().optional(),
});

export type AdditionalComment = z.infer<typeof AdditionalCommentSchema>;
