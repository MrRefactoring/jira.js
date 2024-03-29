export interface GetPropertiesKeys {
  /** The ID of the request type for which keys will be retrieved. */
  requestTypeId: number;
  /**
   * The ID of the service desk which contains the request type. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
