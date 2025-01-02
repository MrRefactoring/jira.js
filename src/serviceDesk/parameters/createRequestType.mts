import { RequestTypeCreate } from '../models/index.mjs';

export interface CreateRequestType extends RequestTypeCreate {
  /**
   * The ID of the service desk where the customer request type is to be created. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
