import { UpdatePrioritySchemeRequestBean } from '../models';

export interface UpdatePriorityScheme extends UpdatePrioritySchemeRequestBean {
  /** The ID of the priority scheme. */
  schemeId: number;
}
