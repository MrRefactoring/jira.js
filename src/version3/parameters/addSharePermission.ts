import { SharePermissionInputBean } from '../models';

export interface AddSharePermission extends SharePermissionInputBean {
  /** The ID of the filter. */
  id: number;
}
