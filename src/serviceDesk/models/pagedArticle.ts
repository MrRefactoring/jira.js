import { pageSchema, type Page } from './page';
import { ArticleSchema, type Article } from './article';

export const PagedArticleSchema = pageSchema(ArticleSchema);

/** @deprecated Use `Page<Article>`, which describes the same shape. This alias is removed in the next major version. */
export type PagedArticle = Page<Article>;
