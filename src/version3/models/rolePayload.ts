import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/**
 * The payload used to create a project role. It is optional for CMP projects, as a default role actor will be provided.
 * TMP will add new role actors to the table.
 */
export interface RolePayload {
  /** The default actors for the role. By adding default actors, the role will be added to any future projects created */
  defaultActors?: ProjectCreateResourceIdentifier[];
  /** The description of the role */
  description?: string;
  /** The name of the role */
  name?: string;
  /**
   * The strategy to use when there is a conflict with an existing project role. FAIL - Fail execution, this always
   * needs to be unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict?: 'FAIL' | 'USE' | 'NEW' | string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The type of the role. Only used by project-scoped project */
  type?: 'HIDDEN' | 'VIEWABLE' | 'EDITABLE' | string;
}
