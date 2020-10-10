import { JqlQueryField } from './jqlQueryField';

export interface JqlQueryOrderByClauseElement {
  field: JqlQueryField[];
  direction: string;
}
