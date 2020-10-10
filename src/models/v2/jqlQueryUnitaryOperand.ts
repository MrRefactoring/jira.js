import { FunctionOperand } from './functionOperand';
import { KeywordOperand } from './keywordOperand';
import { ValueOperand } from './valueOperand';

export type JqlQueryUnitaryOperand = ValueOperand | FunctionOperand | KeywordOperand;
