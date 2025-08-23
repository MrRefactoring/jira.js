import { z } from 'zod';

export const GetFieldAutoCompleteForQueryStringParametersSchema = z.object({
  /** The name of the field. */
  fieldName: z.string().optional(),
  /** The partial field item name entered by the user. */
  fieldValue: z.string().optional(),
  /**
   * The name of the [ CHANGED operator
   * predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which
   * the suggestions are generated. The valid predicate operators are _by_, _from_, and _to_.
   */
  predicateName: z.string().optional(),
  /** The partial predicate item name entered by the user. */
  predicateValue: z.string().optional(),
});

export type GetFieldAutoCompleteForQueryStringParameters = z.infer<
  typeof GetFieldAutoCompleteForQueryStringParametersSchema
>;
