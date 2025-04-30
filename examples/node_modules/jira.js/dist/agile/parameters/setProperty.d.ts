export interface SetProperty {
    /** The ID of the sprint on which the property will be set. */
    sprintId: string;
    /** The key of the sprint's property. The maximum length of the key is 255 bytes. */
    propertyKey: string;
}
