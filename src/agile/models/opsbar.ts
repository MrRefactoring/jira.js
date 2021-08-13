import { LinkGroup } from './linkGroup';

/** @deprecated Use Opsbar instead. */
export type OpsbarBean = Opsbar;

export interface Opsbar {
  /** Details of the link groups defining issue operations. */
  linkGroups?: LinkGroup[];
}
