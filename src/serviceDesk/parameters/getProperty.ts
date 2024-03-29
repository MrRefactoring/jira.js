export interface GetProperty {
  /**
   * The ID of the service desk which contains the request type. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the request type from which the property will be retrieved. */
  requestTypeId: number;
  /** The key of the property to return. */
  propertyKey: string;
}
