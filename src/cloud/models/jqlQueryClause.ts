import { z } from 'zod';
import { CompoundClauseSchema, type CompoundClause } from './compoundClause';
import { FieldValueClauseSchema, type FieldValueClause } from './fieldValueClause';
import { FieldWasClauseSchema, type FieldWasClause } from './fieldWasClause';
import { FieldChangedClauseSchema, type FieldChangedClause } from './fieldChangedClause';

export type JqlQueryClause = CompoundClause | FieldValueClause | FieldWasClause | FieldChangedClause;
/** A JQL query clause. */

export const JqlQueryClauseSchema: z.ZodType<JqlQueryClause> = z.union([
  z.lazy(() => CompoundClauseSchema),
  FieldValueClauseSchema,
  FieldWasClauseSchema,
  FieldChangedClauseSchema,
]);
