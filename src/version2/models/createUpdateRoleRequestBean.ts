export interface CreateUpdateRoleRequestBean {
  /**
   * The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255
   * characters. Required when creating a project role. Optional when partially updating a project role.
   */
  name?: string;
  /**
   * A description of the project role. Required when fully updating a project role. Optional when creating or partially
   * updating a project role.
   */
  description?: string;
}
