import type { IssueLinkType } from '../models/index.js';

export interface UpdateIssueLinkType extends IssueLinkType {
  /** The ID of the issue link type. */
  issueLinkTypeId: string;
}
