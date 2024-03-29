export interface DeleteProperty {
  /**
   * The ID of the service desk which contains the request type. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the request type for which the property will be removed. */
  requestTypeId: number;
  /** The key of the property to remove. */
  propertyKey: string;
}
