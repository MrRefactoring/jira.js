import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentSchema } from './content';
import { SourceSchema } from './source';

export const ArticleSchema = apiObject({
  content: ContentSchema.optional(),
  /** Excerpt of the article which matches the given query string. */
  excerpt: z.string().optional(),
  source: SourceSchema.optional(),
  /** Title of the article. */
  title: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;
