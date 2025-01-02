import { SharePermissionInput } from '../models/index.mjs';

export interface AddSharePermission extends SharePermissionInput {
  /** The ID of the filter. */
  id: number;
}
