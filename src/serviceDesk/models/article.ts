import { Source } from './source';
import { Content } from './content';

export interface Article {
  /** Title of the article. */
  title?: string;
  /** Excerpt of the article which matches the given query string. */
  excerpt?: string;
  source?: Source;
  content?: Content;
}
