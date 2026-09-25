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
export const JqlQueryClauseSchema = z.union([
  z.lazy((): z.ZodType<CompoundClause, CompoundClauseInput> => CompoundClauseSchema) as z.ZodType<
    CompoundClause,
    CompoundClauseInput
  >,
  FieldValueClauseSchema,
  FieldWasClauseSchema,
  FieldChangedClauseSchema,
]) satisfies z.ZodType<JqlQueryClause, JqlQueryClauseInput>;
