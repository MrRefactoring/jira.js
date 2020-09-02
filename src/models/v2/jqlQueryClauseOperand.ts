import { FunctionOperand } from "./functionOperand";
import { KeywordOperand } from "./keywordOperand";
import { ListOperand } from "./listOperand";
import { ValueOperand } from "./valueOperand";

export type JqlQueryClauseOperand = ListOperand | ValueOperand | FunctionOperand | KeywordOperand;