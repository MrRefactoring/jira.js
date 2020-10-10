import { CompoundClause } from './compoundClause';
import { FieldChangedClause } from './fieldChangedClause';
import { FieldValueClause } from './fieldValueClause';
import { FieldWasClause } from './fieldWasClause';

export type JqlQueryClause = CompoundClause | FieldValueClause | FieldWasClause | FieldChangedClause;
