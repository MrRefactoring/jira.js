import { JqlQueryFieldEntityProperty } from './jqlQueryFieldEntityProperty';

/**
 * A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries. */
export interface JqlQueryField {
  /** The name of the field. */
  name: string;
  /** When the field refers to a value in an entity property, details of the entity property value. */
  property?: JqlQueryFieldEntityProperty[];
}
