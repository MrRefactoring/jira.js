/**
 * Associated field configuration scheme and project. */
export interface FieldConfigurationSchemeProjectAssociation {
  /** The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme. */
  fieldConfigurationSchemeId?: string;
  /** The ID of the project. */
  projectId: string;
}
