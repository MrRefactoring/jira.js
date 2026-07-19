import { z } from 'zod';

export const ViewArticleSchema = z.object({
  pageId: z.number(),
});

export type ViewArticle = z.input<typeof ViewArticleSchema>;
