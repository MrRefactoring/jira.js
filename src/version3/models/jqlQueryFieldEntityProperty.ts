/**
 * Details of an entity property. */
export interface JqlQueryFieldEntityProperty {
  /** The object on which the property is set. */
  entity: string;
  /** The key of the property. */
  key: string;
  /** The path in the property value to query. */
  path: string;
  /** The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module. */
  type?: string;
}
