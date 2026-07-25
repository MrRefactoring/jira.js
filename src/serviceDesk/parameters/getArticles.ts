import { z } from 'zod';

export const GetArticlesSchema = z.object({
  /** The string used to filter the articles (required). */
  query: z.string(),
  /**
   * If set to true matching query term in the title and excerpt will be highlighted using the `@@@hl@@@term@@@endhl@@@`
   * syntax. Default: false.
   */
  highlight: z.boolean(),
  /** (Deprecated) The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
  /** Pointer to a set of search results, returned as part of the next or prev URL from the previous search call. */
  cursor: z.string().optional(),
  /**
   * Should navigate to the previous page. Defaulted to false. Set to true as part of prev URL from the previous search
   * call.
   */
  prev: z.boolean().optional(),
});

export type GetArticles = z.input<typeof GetArticlesSchema>;
