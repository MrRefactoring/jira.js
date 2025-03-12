import type { SharePermissionInput } from '../models';

export interface AddSharePermission extends SharePermissionInput {
  /** The ID of the filter. */
  id: number;
}
