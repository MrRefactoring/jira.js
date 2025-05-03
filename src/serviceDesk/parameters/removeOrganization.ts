import type { OrganizationServiceDeskUpdate } from '../models';

export interface RemoveOrganization extends OrganizationServiceDeskUpdate {
  /**
   * The ID of the service desk from which the organization will be removed. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
