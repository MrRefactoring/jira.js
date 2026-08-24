import { z } from 'zod';
import { AndOperatorSchema, type AndOperator } from './andOperator';
import { NorOperatorSchema, type NorOperator } from './norOperator';
import { FieldOperandSchema, type FieldOperand } from './fieldOperand';
import { SearchWorkspacesOperandSchema, type SearchWorkspacesOperand } from './searchWorkspacesOperand';
import { FeatureFilterSchema, type FeatureFilter } from './featureFilter';
import { PolicyFilterSchema, type PolicyFilter } from './policyFilter';

export type QueryVariants =
  AndOperator | NorOperator | FieldOperand | SearchWorkspacesOperand | FeatureFilter | PolicyFilter;
/** Possible operators/operand in the event query. */

export const QueryVariantsSchema: z.ZodType<QueryVariants> = z.union([
  z.lazy(() => AndOperatorSchema),
  z.lazy(() => NorOperatorSchema),
  FieldOperandSchema,
  SearchWorkspacesOperandSchema,
  FeatureFilterSchema,
  PolicyFilterSchema,
]);
