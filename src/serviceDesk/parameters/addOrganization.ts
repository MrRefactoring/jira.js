import { OrganizationServiceDeskUpdate } from '../models';

export interface AddOrganization extends OrganizationServiceDeskUpdate {
  /**
   * The ID of the service desk to which the organization will be added. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
