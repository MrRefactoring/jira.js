import { LinkGroup } from './linkGroup.mjs';

/** Details of the operations that can be performed on the issue. */
export interface Operations {
  /** Details of the link groups defining issue operations. */
  linkGroups?: LinkGroup[];
}
