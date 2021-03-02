import { IssueLinkType } from '../models';

export interface UpdateIssueLinkType extends IssueLinkType {
  /** The ID of the issue link type. */
  issueLinkTypeId: string;
}
