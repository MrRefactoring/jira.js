import type { SharePermissionInput } from '../models/index.js';

export interface AddSharePermission extends SharePermissionInput {
  /** The ID of the filter. */
  id: number;
}
