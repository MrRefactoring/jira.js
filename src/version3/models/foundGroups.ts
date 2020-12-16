import { FoundGroup } from './foundGroup';

/**
 * The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched groups. */
export interface FoundGroups {
  /** Header text indicating the number of groups in the response and the total number of groups found in the search. */
  header?: string;
  /** The total number of groups found in the search. */
  total?: number;
  groups?: FoundGroup[];
}
