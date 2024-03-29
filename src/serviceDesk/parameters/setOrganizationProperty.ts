export interface SetOrganizationProperty {
  /** The ID of the organization on which the property will be set. */
  organizationId: string;
  /** The key of the organization's property. The maximum length of the key is 255 bytes. */
  propertyKey: string;
}
