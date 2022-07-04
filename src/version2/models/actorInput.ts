/** @deprecated Use {@link ActorInput} instead. */
export type ActorInputBean = ActorInput;

export interface ActorInput {
  /**
   * The account IDs of the users to add as default actors. This parameter accepts a comma-separated list. For example,
   * `"user":["5b10a2844c20165700ede21g", "5b109f2e9729b51b54dc274d"]`.
   */
  user?: string[];
  /**
   * The ID of the group to add as a default actor. This parameter cannot be used with the `group` parameter This
   * parameter accepts a comma-separated list. For example, `"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8",
   * "0c011f85-69ed-49c4-a801-3b18d0f771bc"]`.
   */
  groupId?: string[];
  /**
   * The name of the group to add as a default actor. This parameter cannot be used with the `groupId` parameter. As a
   * group's name can change,use of `groupId` is recommended. This parameter accepts a comma-separated list. For
   * example, `"group":["project-admin", "jira-developers"]`.
   */
  group?: string[];
}
