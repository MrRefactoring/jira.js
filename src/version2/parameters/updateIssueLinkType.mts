import { IssueLinkType } from '../models/index.mjs';

export interface UpdateIssueLinkType extends IssueLinkType {
  /** The ID of the issue link type. */
  issueLinkTypeId: string;
}
