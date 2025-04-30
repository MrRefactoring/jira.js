import type { GroupLabel } from './groupLabel';

/** A group found in a search. */
export interface FoundGroup {
  /** The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.` */
  name?: string;
  /** The group name with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  labels?: GroupLabel[];
  /**
   * The ID of the group, which uniquely identifies the group across all Atlassian products. For example,
   * _952d12c3-5b5b-4d04-bb32-44d383afc4b2_.
   */
  groupId?: string;
}
