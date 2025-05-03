import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** Defines the payload to configure the issue layout item for a project. */
export interface IssueLayoutItemPayload {
  itemKey?: ProjectCreateResourceIdentifier;
  /** The item section type */
  sectionType?: 'content' | 'primaryContext' | 'secondaryContext' | string;
  /** The item type. Currently only support FIELD */
  type?: 'FIELD' | string;
}
