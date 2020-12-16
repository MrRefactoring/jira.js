export interface SetProperty {
  /** the ID of the sprint on which the property will be set. */
  sprintId: string;
  /** the key of the sprint's property. The maximum length of the key is 255 bytes. */
  propertyKey: string;
}
