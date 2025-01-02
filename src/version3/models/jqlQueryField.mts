import { JqlQueryFieldEntityProperty } from './jqlQueryFieldEntityProperty.mjs';

/**
 * A field used in a Jql query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ)
 * for more information about fields in Jql queries.
 */
export interface JqlQueryField {
  /** The name of the field. */
  name: string;
  /** When the field refers to a value in an entity property, details of the entity property value. */
  property?: JqlQueryFieldEntityProperty[];
}
