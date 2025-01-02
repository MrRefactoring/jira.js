export interface GetProjectProperty {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /**
   * The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to
   * get a list of all project property keys.
   */
  propertyKey: string;
}
