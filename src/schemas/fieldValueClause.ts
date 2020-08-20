import { JqlQueryClauseOperand } from './jqlQueryClauseOperand';
import { JqlQueryField } from './jqlQueryField';

export interface FieldValueClause {
    field: JqlQueryField[];
    operator: string;
    operand: JqlQueryClauseOperand[];
}
