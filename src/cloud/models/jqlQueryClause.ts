import { z } from 'zod';
import { CompoundClauseSchema, type CompoundClause, type CompoundClauseInput } from './compoundClause';
import { FieldValueClauseSchema, type FieldValueClause } from './fieldValueClause';
import { FieldWasClauseSchema, type FieldWasClause } from './fieldWasClause';
import { FieldChangedClauseSchema, type FieldChangedClause } from './fieldChangedClause';

export type JqlQueryClause = CompoundClause | FieldValueClause | FieldWasClause | FieldChangedClause;

export type JqlQueryClauseInput =
  | CompoundClauseInput
  | z.input<typeof FieldValueClauseSchema>
  | z.input<typeof FieldWasClauseSchema>
  | z.input<typeof FieldChangedClauseSchema>;

/** A JQL query clause. */
export const JqlQueryClauseSchema: z.ZodType<JqlQueryClause, JqlQueryClauseInput> = z.union([
  z.lazy(() => CompoundClauseSchema),
  FieldValueClauseSchema,
  FieldWasClauseSchema,
  FieldChangedClauseSchema,
]);
