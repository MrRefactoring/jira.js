import { SimpleLink, SimpleLink } from './simpleLink';
import { LinkGroup } from './linkGroup';

/**
 * Details a link group, which defines issue operations. */
export interface LinkGroup {
  id?: string;
  styleClass?: string;
  header?: SimpleLink;
  weight?: number;
  links?: SimpleLink[];
  groups?: LinkGroup[];
}
