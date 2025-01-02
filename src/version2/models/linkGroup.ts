import type { SimpleLink } from './simpleLink.js';

/** Details a link group, which defines issue operations. */
export interface LinkGroup {
  groups?: LinkGroup[];
  header?: SimpleLink;
  id?: string;
  links?: SimpleLink[];
  styleClass?: string;
  weight?: number;
}
