export interface GetRequestTypeById {
  /**
   * The ID of the service desk whose customer request type is to be returned. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
  /** The ID of the customer request type to be returned. */
  requestTypeId: number;
  expand?: string[];
}
