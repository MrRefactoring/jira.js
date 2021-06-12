import { SimpleLink } from './simpleLink';

/** Details a link group, which defines issue operations. */
export interface LinkGroup {
  id?: string;
  styleClass?: string;
  header?: SimpleLink;
  weight?: number;
  links?: SimpleLink[];
  groups?: LinkGroup[];
}
