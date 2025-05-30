import type { Content } from './content';
import type { Source } from './source';

export interface Article {
  /** Title of the article. */
  title?: string;
  /** Excerpt of the article which matches the given query string. */
  excerpt?: string;
  source?: Source;
  content?: Content;
}
