export interface SetProperty {
  /**
   * The ID of the service desk which contains the request type. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the request type on which the property will be set. */
  requestTypeId: number;
  /** The key of the request type property. The maximum length of the key is 255 bytes. */
  propertyKey: string;
}
