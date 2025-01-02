import type { OrganizationServiceDeskUpdate } from '../models/index.js';

export interface AddOrganization extends OrganizationServiceDeskUpdate {
  /**
   * The ID of the service desk to which the organization will be added. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
