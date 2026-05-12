import { z } from 'zod';

export const SetCommentPropertySchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetCommentProperty = z.input<typeof SetCommentPropertySchema>;
