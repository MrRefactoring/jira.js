import { z } from 'zod';
import { AndOperatorSchema, type AndOperator, type AndOperatorInput } from './andOperator';
import { NorOperatorSchema, type NorOperator, type NorOperatorInput } from './norOperator';
import { FieldOperandSchema, type FieldOperand } from './fieldOperand';
import { SearchWorkspacesOperandSchema, type SearchWorkspacesOperand } from './searchWorkspacesOperand';
import { FeatureFilterSchema, type FeatureFilter } from './featureFilter';
import { PolicyFilterSchema, type PolicyFilter } from './policyFilter';

export type QueryVariants =
  AndOperator | NorOperator | FieldOperand | SearchWorkspacesOperand | FeatureFilter | PolicyFilter;

export type QueryVariantsInput =
  | AndOperatorInput
  | NorOperatorInput
  | z.input<typeof FieldOperandSchema>
  | z.input<typeof SearchWorkspacesOperandSchema>
  | z.input<typeof FeatureFilterSchema>
  | z.input<typeof PolicyFilterSchema>;

/** Possible operators/operand in the event query. */
export const QueryVariantsSchema: z.ZodType<QueryVariants, QueryVariantsInput> = z.union([
  z.lazy(() => AndOperatorSchema),
  z.lazy(() => NorOperatorSchema),
  FieldOperandSchema,
  SearchWorkspacesOperandSchema,
  FeatureFilterSchema,
  PolicyFilterSchema,
]);
