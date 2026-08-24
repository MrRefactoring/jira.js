import { z } from 'zod';
import { apiObject } from '#/core';

export const AdditionalCommentSchema = apiObject({
  body: z.string().optional(),
});

export type AdditionalComment = z.infer<typeof AdditionalCommentSchema>;
