import { Content } from './content.mjs';
import { Source } from './source.mjs';

export interface Article {
  /** Title of the article. */
  title?: string;
  /** Excerpt of the article which matches the given query string. */
  excerpt?: string;
  source?: Source;
  content?: Content;
}
