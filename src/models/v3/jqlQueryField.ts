import { JqlQueryFieldEntityProperty } from './jqlQueryFieldEntityProperty';

export interface JqlQueryField {
  name: string;
  property?: JqlQueryFieldEntityProperty[];
}
