import type { PermissionGrantDTO } from './permissionGrantDTO';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload to create a permission scheme */
export interface PermissionPayload {
  /** Configuration to generate addon role. Default is false if null */
  addAddonRole?: boolean;
  /** The description of the permission scheme */
  description?: string;
  /** List of permission grants */
  grants?: PermissionGrantDTO[];
  /** The name of the permission scheme */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing permission scheme. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters; NEW - If the entity exist, try
   * and create a new one with a different name
   */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
}
